/**
 * API route for ads.txt — rewritten from /ads.txt via vercel.json.
 * Vercel's CDN rewrites run before domain-level redirects, so this
 * bypasses the redirect-to-primary-domain behavior that breaks
 * AdSense verification on spoke domains.
 */
export function GET() {
  return new Response(
    'google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0\n',
    {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    },
  );
}
