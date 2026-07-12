// Hız sınırlama (rate limiting).
//
// KV_REST_API_URL ve KV_REST_API_TOKEN env değişkenleri mevcutsa Upstash
// Redis kullanılır — tüm serverless instance'lar arasında paylaşılan, kalıcı
// bir sayaç sağlar. Bu iki değişken yoksa (örn. local geliştirme) bellek-içi
// (in-memory) bir yedek devreye girer; bu yedek serverless ortamda
// instance'lar arası paylaşılmaz, sadece sıcak (warm) bir instance'ta hızlı
// otomatik denemeleri yavaşlatır.
//
// Not: KV_REST_API_URL/TOKEN, Vercel'in Upstash for Redis marketplace
// entegrasyonunun otomatik oluşturduğu isimler (Storage → Marketplace →
// Upstash). Eskiden manuel kopyala-yapıştırla girilen UPSTASH_REDIS_REST_URL/
// TOKEN değişkenleri hiçbir zaman doğru çalışmadı (Upstash konsolunda 0
// komut) — bu yüzden artık Redis.fromEnv() yerine doğrudan bu değişkenler
// okunuyor.
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Env değişkenleri hatalı/bozuksa Redis kurucusu burada fırlatabilir — bu
// modül import edilir edilmez çalıştığı için, sarmalanmazsa TÜM rate-limit'li
// endpoint'leri (login, rezervasyon) anında 500'e düşürür. Böyle bir durumda
// Upstash'i "yapılandırılmamış" say ve bellek-içi yedeğe düş — rate limiting
// bir tek-nokta-hatası olmamalı.
let redis: Redis | null = null;
try {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    redis = new Redis({ url, token });
  }
} catch (err) {
  console.error("[rateLimit] Redis kurulumu başarısız, bellek-içi yedeğe düşülüyor:", err);
}
const upstashConfigured = !!redis;

// Aynı (limit, windowMs) çifti için tek bir Ratelimit örneği yeniden kullanılır.
const limiters = new Map<string, Ratelimit>();

function getLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      prefix: "vam-ratelimit",
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

// --- Bellek-içi yedek (Upstash yapılandırılmamışsa) ---

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function cleanup(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

function rateLimitInMemory(key: string, limit: number, windowMs: number): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  if (buckets.size > 5000) cleanup(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remainingMs: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remainingMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true, remainingMs: 0 };
}

/**
 * @param key Genelde işlem adı + IP adresi (örn. "login:1.2.3.4")
 * @param limit İzin verilen maksimum istek sayısı
 * @param windowMs Zaman penceresi (ms)
 * @returns allowed: izin verildi mi, remainingMs: reddedildiyse pencerenin kapanmasına kalan süre
 */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean; remainingMs: number }> {
  if (!upstashConfigured) {
    return rateLimitInMemory(key, limit, windowMs);
  }

  try {
    const { success, reset } = await getLimiter(limit, windowMs).limit(key);
    return { allowed: success, remainingMs: success ? 0 : Math.max(0, reset - Date.now()) };
  } catch (err) {
    // Upstash isteği başarısız oldu (ağ, kimlik doğrulama, vb.) — login/rezervasyon
    // gibi kritik akışları çökertmek yerine bu istek için bellek-içi yedeğe düş.
    console.error("[rateLimit] Upstash isteği başarısız, bellek-içi yedeğe düşülüyor:", err);
    return rateLimitInMemory(key, limit, windowMs);
  }
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}
