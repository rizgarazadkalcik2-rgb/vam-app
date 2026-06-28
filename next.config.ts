import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/platform", destination: "/static-pages/platform/index.html" },
      { source: "/destinations", destination: "/static-pages/destinations/index.html" },
      { source: "/destinations/:slug", destination: "/static-pages/destinations/:slug/index.html" },
      { source: "/bundles", destination: "/static-pages/bundles/index.html" },
      { source: "/bundles/:slug", destination: "/static-pages/bundles/:slug/index.html" },
      { source: "/experiences", destination: "/static-pages/experiences/index.html" },
      { source: "/about", destination: "/static-pages/about/index.html" },
    ];
  },
};

export default nextConfig;
