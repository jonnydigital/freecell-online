import { ROUTE_OWNERSHIP, ownerOf } from './routeOwnership';
import type { SiteKey } from './siteConfig';

const VARIANT_DETAIL_SEGMENTS = new Set(['how-to-play', 'strategy', 'tips']);

function normalisePath(path: string): string {
  let p = path.trim();
  if (!p.startsWith('/')) p = '/' + p;
  const qIdx = p.indexOf('?');
  if (qIdx !== -1) p = p.slice(0, qIdx);
  const hIdx = p.indexOf('#');
  if (hIdx !== -1) p = p.slice(0, hIdx);
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/**
 * AdSense recovery guard: the hub has many obscure solitaire variant
 * /how-to-play, /strategy, and /tips pages that are useful as internal help
 * pages, but together create a scaled-content footprint. Keep them crawlable
 * for link discovery, but remove them from search indexing until each cluster
 * has enough distinctive editorial value to justify standalone indexed URLs.
 */
export function isScaledHubVariantDetailPage(path: string): boolean {
  const normalised = normalisePath(path);
  const segments = normalised.split('/').filter(Boolean);

  if (segments.length !== 2 || !VARIANT_DETAIL_SEGMENTS.has(segments[1])) {
    return false;
  }

  if (!ROUTE_OWNERSHIP[normalised]) {
    return false;
  }

  const ownership = ownerOf(normalised);
  return ownership.primaryOwner === 'solitairestack' && ownership.owners.length === 1;
}

export function shouldIndexPath(path: string, siteKey: SiteKey): boolean {
  if (siteKey === 'solitairestack' && isScaledHubVariantDetailPage(path)) {
    return false;
  }

  return true;
}

export function robotsHeaderForPath(path: string, siteKey: SiteKey): string | null {
  return shouldIndexPath(path, siteKey) ? null : 'noindex, follow';
}
