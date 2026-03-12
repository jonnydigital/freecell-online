import type { MetadataRoute } from 'next';
import { isHubSite, siteConfig } from '@/lib/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  const startUrl = isHubSite ? '/freecell' : '/';

  return {
    name: siteConfig.defaultTitle,
    short_name: siteConfig.appleWebAppTitle,
    description: siteConfig.defaultDescription,
    start_url: startUrl,
    display: 'standalone',
    orientation: 'any',
    background_color: '#0a3d0a',
    theme_color: '#0a3d0a',
    categories: ['games', 'entertainment'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
