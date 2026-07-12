// Hız sınırlama (rate limiting).
//
// UPSTASH_REDIS_REST_URL ve UPSTASH_REDIS_REST_TOKEN env değişkenleri
// mevcutsa Upstash Redis kullanılır — tüm serverless instance'lar arasında
// paylaşılan, kalıcı bir sayaç sağlar. Bu iki değişken yoksa (örn. local
// geliştirme) bellek-içi (in-memory) bir yedek devreye girer; bu yedek
// serverless ortamda instance'lar arası paylaşılmaz, sadece sıcak (warm) bir
// instance'ta hızlı otomatik denemeleri yavaşlatır.
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const upstashConfigured = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = upstashConfigured ? Redis.fromEnv() : null;

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

  const { success, reset } = await getLimiter(limit, windowMs).limit(key);
  return { allowed: success, remainingMs: success ? 0 : Math.max(0, reset - Date.now()) };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}
