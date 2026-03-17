import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // www → non-www redirect (production only)
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '');
    const url = request.nextUrl.clone();
    url.host = nonWwwHost;
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap, robots
     * - api routes
     * - static assets
     */
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap|robots\\.txt|api/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)).*)',
  ],
};
