import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADS_TXT_CONTENT = 'google.com, pub-3083538874906149, DIRECT, f08c47fec0942fa0\n';

export function middleware(request: NextRequest) {
  // Serve ads.txt directly from every domain — bypass Vercel's
  // domain redirect that sends spoke domains to the hub.
  if (request.nextUrl.pathname === '/ads.txt') {
    return new NextResponse(ADS_TXT_CONTENT, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ads.txt'],
};
