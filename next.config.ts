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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      "img-src 'self' data: blob: https:; " +
      "connect-src 'self' https:; " +
      "frame-ancestors 'none';",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/platform", destination: "/static-pages/platform/index.html" },
      { source: "/experiences", destination: "/static-pages/experiences/index.html" },
      { source: "/about", destination: "/static-pages/about/index.html" },
    ];
  },
};

export default nextConfig;
