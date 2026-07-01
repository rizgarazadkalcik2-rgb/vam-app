// Basit, bellek-içi (in-memory) hız sınırlama.
// Not: Serverless ortamda her instance kendi belleğini tutar, bu yüzden bu
// mükemmel/kesin bir koruma değildir — ama sıcak (warm) instance'larda hızlı,
// otomatik saldırı denemelerini ciddi şekilde yavaşlatır. Kalıcı/garantili bir
// çözüm için ileride Vercel KV veya Upstash Redis eklenmesi önerilir.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Eski kovaları periyodik olarak temizle (bellek şişmesini önlemek için)
function cleanup(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

/**
 * @param key Genelde IP adresi + işlem adı (örn. "login:1.2.3.4")
 * @param limit İzin verilen maksimum istek sayısı
 * @param windowMs Zaman penceresi (ms)
 * @returns true = izin verildi, false = limit aşıldı
 */
export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remainingMs: number } {
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

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}
