/**
 * API route for ads.txt — rewritten from /ads.txt via vercel.json.
 * Vercel's CDN rewrites run before domain-level redirects, so this
 * bypasses the redirect-to-primary-domain behavior that breaks
 * AdSense verification on spoke domains.
 *
 * Each deployment serves one site (NEXT_PUBLIC_SITE_KEY is build-time
 * inlined into siteConfig), so the route returns the ads.txt for
 * whichever site this deployment represents. Per-site network lines
 * (Mediavine, Adsterra, etc.) can be added below as those accounts
 * come online; the AdSense line is shared across the publisher account.
 */

import type { SiteKey } from '@/lib/siteConfig';
import { siteConfig } from '@/lib/siteConfig';

const ADSENSE_PUBLISHER_ID = 'pub-3083538874906149';

function getAdsTxtLines(siteKey: SiteKey): string[] {
  const lines: string[] = [];

  lines.push(`google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`);

  const mediavineId = process.env.NEXT_PUBLIC_MEDIAVINE_GROW_ID;
  if (mediavineId) {
    lines.push(`mediavine.com, ${mediavineId}, DIRECT`);
  }

  const adsterraId = process.env.NEXT_PUBLIC_ADSTERRA_PUBLISHER_ID;
  if (adsterraId) {
    lines.push(`adsterra.com, ${adsterraId}, DIRECT`);
  }

  void siteKey;
  return lines;
}

export function GET() {
  const body = getAdsTxtLines(siteConfig.key).join('\n') + '\n';
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
