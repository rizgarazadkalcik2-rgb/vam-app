import type { NextConfig } from "next";

// GÜVENLİK: 'unsafe-eval' sadece 3 statik bundler sayfasının (/, /about,
// /experiences) tarayıcı-içi Babel Standalone JSX derlemesi için gerekli —
// bu sayfalar eval()/Function() kullanarak JSX'i çalışma zamanında derliyor.
// Next.js'in kendi derlenmiş bundle'ları (admin paneli, giriş, rezervasyon
// formu, API route'ları dahil TÜM diğer sayfalar) asla eval() çağırmaz.
// Önceden bu direktif SİTE GENELİNDE açıktı — en yüksek değerli saldırı
// yüzeyi olan admin/giriş sayfalarını gereksiz yere zayıflatıyordu (bir XSS
// enjeksiyon noktası bulunursa 'unsafe-eval', sınırlı bir string enjeksiyonunu
// tam kod çalıştırmaya çevirebilir). Aşağıda genel politika 'unsafe-eval'
// OLMADAN tanımlanıyor; sadece 3 statik sayfa için ayrı, daha gevşek bir
// politika ekleniyor (bkz. headers() içindeki route'a özel girdiler) —
// Next.js aynı header anahtarı için örtüşen path'lerde SONRAKİ eşleşmeyi
// kullanır (üzerine yazar, birleştirmez); bu, npm run build + npm start ile
// doğrudan HTTP başlıkları okunarak doğrulandı.
//
// 'unsafe-inline' script-src'de site genelinde kalıyor — Next.js App
// Router'ın kendi hydration/streaming script'leri nonce olmadan buna
// ihtiyaç duyuyor; bunu kaldırmak nonce altyapısı kurulmadan tüm siteyi
// (admin paneli dahil) bozar. style-src'deki 'unsafe-inline' de aynı
// nedenle kalıyor — kod tabanı her yerde React inline style={{}} kullanıyor.
const STRICT_CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' blob:; " +
  "style-src 'self' 'unsafe-inline'; " +
  "font-src 'self' data:; " +
  "img-src 'self' data: blob: https:; " +
  "connect-src 'self' https:; " +
  "worker-src 'self' blob:; " +
  "frame-ancestors 'none';";

const STATIC_PAGE_CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; " +
  "style-src 'self' 'unsafe-inline'; " +
  "font-src 'self' data:; " +
  "img-src 'self' data: blob: https:; " +
  "connect-src 'self' https:; " +
  "worker-src 'self' blob:; " +
  "frame-ancestors 'none';";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: STRICT_CSP },
];

const nextConfig: NextConfig = {
  images: {
    // Sadece Vercel Blob'dan gelen görseller optimize edilir — admin'in
    // serbest girdiği dış URL'ler next/image'ın domain-allowlist kontrolüne
    // takılmasın diye SmartImage bunları düz <img> olarak render eder.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Bu sayfalar (statik bundler mimarisi) deploy sonrası CDN'de eski
        // halleriyle takılı kalabiliyordu — "no-cache, must-revalidate" her
        // istekte orijin sunucuyla doğrulama yapılmasını zorunlu kılar,
        // böylece bir önceki deploy'un bozuk sürümü asla takılı kalmaz.
        //
        // Content-Security-Policy burada da tekrar tanımlanıyor (yukarıdaki
        // /:path* girdisinden SONRA geldiği için üzerine yazıyor) — sadece bu
        // 3 sayfanın Babel Standalone çalışma zamanı JSX derlemesi için
        // gereken 'unsafe-eval'i içeriyor, bkz. STATIC_PAGE_CSP tanımı.
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Content-Security-Policy", value: STATIC_PAGE_CSP },
        ],
      },
      {
        source: "/experiences",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Content-Security-Policy", value: STATIC_PAGE_CSP },
        ],
      },
      {
        source: "/about",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Content-Security-Policy", value: STATIC_PAGE_CSP },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Eski /platform URL'i kaldırıldı — içerik artık kök domain'de (/).
      // Kalıcı (308) yönlendirme, mevcut backlink/bookmark/Google indeksi
      // SEO değerini korur.
      { source: "/platform", destination: "/", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/", destination: "/static-pages/platform/index.html" },
      { source: "/experiences", destination: "/static-pages/experiences/index.html" },
      { source: "/about", destination: "/static-pages/about/index.html" },
    ];
  },
};

export default nextConfig;
