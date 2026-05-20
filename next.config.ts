import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/sitemap-page',
        destination: '/sitemap',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Mirror of the vercel.json /ads.txt rewrite — vercel.json wins in
        // production (where Vercel's CDN applies it before edge redirects),
        // but vercel.json is not consulted by `next dev`, so this rewrite
        // is the local-dev equivalent.
        source: '/ads.txt',
        destination: '/api/ads-txt',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/embed/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
    ];
  },
};

export default nextConfig;
