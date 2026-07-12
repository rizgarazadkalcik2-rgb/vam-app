import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    // Statik sayfalar tarayıcı-içi Babel/JSX dönüşümü kullandığı için
    // 'unsafe-inline' ve 'unsafe-eval' script-src'de gerekli — bunlar
    // kaldırılırsa site bozulur. frame-ancestors clickjacking'i ayrıca engeller.
    value:
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "font-src 'self' data:; " +
      "img-src 'self' data: blob: https:; " +
      "connect-src 'self' https:; " +
      "worker-src 'self' blob:; " +
      "frame-ancestors 'none';",
  },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["iyzipay"],
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
        source: "/",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/experiences",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/about",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
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
