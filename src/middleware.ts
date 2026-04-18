import { NextRequest, NextResponse } from 'next/server';
import { ownerOf, SITE_DOMAINS, type RouteOwnership } from '@/lib/routeOwnership';
import type { SiteKey } from '@/lib/siteConfig';

/**
 * Map each production host to its SiteKey. Used by the wrong-host redirect
 * below. Keep in sync with SITE_DOMAINS in routeOwnership.ts.
 */
const HOST_TO_SITEKEY: Record<string, SiteKey> = {
  'solitairestack.com': 'solitairestack',
  'playfreecellonline.com': 'playfreecellonline',
  'playklondikeonline.com': 'playklondikeonline',
  'playspidersolitaireonline.com': 'playspidersolitaireonline',
};

/**
 * Paths whose ownership gating we intentionally skip. Dynamic game pages
 * are gated differently (served on every host for share-link continuity).
 */
function shouldSkipOwnershipCheck(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname.startsWith('/game/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/embed') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/lab/')
  );
}

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

  // Wrong-host redirect: if this host is a known production host AND the path
  // is owned by a different site, 301 to the primary owner's domain. This
  // consolidates Google's index onto canonical URLs — particularly important
  // for FreeCell content that was inadvertently indexed on
  // playspidersolitaireonline.com (see docs/analytics/daily-metrics.json
  // gsc_performance_live.playspidersolitaireonline.anomaly).
  const siteKey = HOST_TO_SITEKEY[host];
  const pathname = request.nextUrl.pathname;

  if (siteKey && !shouldSkipOwnershipCheck(pathname)) {
    let ownership: RouteOwnership;
    try {
      ownership = ownerOf(pathname);
    } catch {
      return NextResponse.next();
    }

    if (!ownership.owners.includes(siteKey)) {
      const canonicalHost = SITE_DOMAINS[ownership.primaryOwner].replace(
        /^https?:\/\//,
        '',
      );
      const url = request.nextUrl.clone();
      url.host = canonicalHost;
      url.protocol = 'https';
      return NextResponse.redirect(url, 301);
    }
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
