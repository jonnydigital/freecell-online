/**
 * Serve ads.txt as a dynamic route handler so it responds from every
 * domain in the multi-site network (not just the Vercel primary domain).
 * Static files in /public/ redirect to the primary domain, which breaks
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
