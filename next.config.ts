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
        // Serve ads.txt from the API route — the App Router route at
        // /ads.txt gets intercepted by Vercel's CDN redirect on spoke
        // domains, but /api/ads-txt works. This rewrite bridges the gap.
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
