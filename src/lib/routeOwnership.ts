/**
 * routeOwnership.ts — Wave 1-B of the multi-site solitaire network refactor.
 *
 * Single source of truth for which sites own which routes across the 4-domain
 * network (hub: solitairestack.com; spokes: playfreecellonline.com,
 * playklondikeonline.com, playspidersolitaireonline.com).
 *
 * Used by sitemap generation, canonical URL resolution, and 404 gating so that
 * each domain only serves the routes it is the primary owner (or co-owner) of.
 * This exists to prevent AdSense "low value content" rejections caused by the
 * hub rendering near-duplicate pages from its spokes.
 *
 * NOTE: We deliberately do NOT import from ./siteConfig to avoid circular
 * import issues — the SiteKey type is imported type-only, and domains are
 * hardcoded in SITE_DOMAINS below.
 */

import type { SiteKey } from './siteConfig';

export type RouteOwnership = {
  /** Which sites should SERVE this route (return 200 OK). */
  owners: SiteKey[];
  /** Which site's URL is the canonical (for rel=canonical link tags). */
  primaryOwner: SiteKey;
};

export const SITE_DOMAINS: Record<SiteKey, string> = {
  solitairestack: 'https://solitairestack.com',
  playfreecellonline: 'https://playfreecellonline.com',
  playklondikeonline: 'https://playklondikeonline.com',
  playspidersolitaireonline: 'https://playspidersolitaireonline.com',
};

// Re-usable ownership records so we don't spray literals everywhere.
const HUB_ONLY: RouteOwnership = {
  owners: ['solitairestack'],
  primaryOwner: 'solitairestack',
};
const FREECELL_ONLY: RouteOwnership = {
  owners: ['playfreecellonline'],
  primaryOwner: 'playfreecellonline',
};
const KLONDIKE_ONLY: RouteOwnership = {
  owners: ['playklondikeonline'],
  primaryOwner: 'playklondikeonline',
};
const SPIDER_ONLY: RouteOwnership = {
  owners: ['playspidersolitaireonline'],
  primaryOwner: 'playspidersolitaireonline',
};

export const ROUTE_OWNERSHIP: Record<string, RouteOwnership> = {
  // ==========================================================================
  // HUB (solitairestack.com) — network-level content
  // ==========================================================================

  // Hub homepage and hub FreeCell landing
  '/': HUB_ONLY,
  '/freecell': HUB_ONLY,

  // Comparison pages (all hub-owned)
  '/freecell-vs-spider': HUB_ONLY,
  '/freecell-vs-klondike': HUB_ONLY,
  '/freecell-vs-bakers-game': HUB_ONLY,
  '/freecell-vs-eight-off': HUB_ONLY,
  '/spider-vs-scorpion': HUB_ONLY,
  '/klondike-vs-pyramid': HUB_ONLY,
  '/spider/klondike-vs-spider': HUB_ONLY,

  // Network-level taxonomy / directory
  '/games': HUB_ONLY,
  '/solitaire-types': HUB_ONLY,
  '/solitaire-difficulty-ranking': HUB_ONLY,
  '/solitaire-for-beginners': HUB_ONLY,
  '/solitaire-rules-by-country': HUB_ONLY,
  '/patience-solitaire': HUB_ONLY,

  // Hub pillar pages (Wave 8-HUB)
  '/solitaire-games-guide': HUB_ONLY,
  '/solitaire-strategy': HUB_ONLY,
  '/solitaire-history': HUB_ONLY,
  '/solitaire-for-every-mood': HUB_ONLY,

  // Hub long-form research (Wave 10-F)
  '/how-solitaire-changed-windows': HUB_ONLY,

  // Hub striking-distance target (Wave 8-STR) — GSC shows hub surfacing at pos 35-41
  // for "freecell download no ads" / "original freecell game free download no ads".
  '/freecell-no-ads': HUB_ONLY,

  // Hub editorial / reference
  '/history': HUB_ONLY,
  '/glossary': HUB_ONLY,
  '/how-to-play': HUB_ONLY,
  '/strategy': HUB_ONLY,
  '/tips': HUB_ONLY,
  '/faq': HUB_ONLY,

  // Editorial masthead / author profile pages (hub-only)
  '/authors': HUB_ONLY,
  '/authors/[slug]': HUB_ONLY,

  // Methodology and testing pages (hub-only, E-E-A-T signals)
  '/how-we-test-solitaire-games': HUB_ONLY,
  '/our-solitaire-methodology': HUB_ONLY,
  '/editorial-standards': HUB_ONLY,
  '/solitaire-win-rates': HUB_ONLY,

  // Hub linkbait / interactive tools
  '/popular-solitaire-by-state': HUB_ONLY,
  '/solitaire-game-finder': HUB_ONLY,

  // Corporate / legal pages (all hub-owned)
  '/about': HUB_ONLY,
  '/contact': HUB_ONLY,
  '/privacy': HUB_ONLY,
  '/terms': HUB_ONLY,
  '/sitemap': HUB_ONLY,

  // Blog — shared across sites but hub is canonical
  '/blog': {
    owners: ['solitairestack', 'playfreecellonline', 'playklondikeonline', 'playspidersolitaireonline'],
    primaryOwner: 'solitairestack',
  },
  '/blog/[slug]': {
    owners: ['solitairestack', 'playfreecellonline', 'playklondikeonline', 'playspidersolitaireonline'],
    primaryOwner: 'solitairestack',
  },

  // Hub-owned individual game pages (non-FreeCell/Klondike/Spider family)
  '/accordion': HUB_ONLY,
  '/accordion/how-to-play': HUB_ONLY,
  '/accordion/strategy': HUB_ONLY,
  '/accordion/tips': HUB_ONLY,
  '/aces-up': HUB_ONLY,
  '/aces-up/how-to-play': HUB_ONLY,
  '/aces-up/strategy': HUB_ONLY,
  '/aces-up/tips': HUB_ONLY,
  '/bakers-dozen': HUB_ONLY,
  '/bakers-dozen/how-to-play': HUB_ONLY,
  '/bakers-dozen/strategy': HUB_ONLY,
  '/bakers-dozen/tips': HUB_ONLY,
  '/beleaguered-castle': HUB_ONLY,
  '/beleaguered-castle/how-to-play': HUB_ONLY,
  '/beleaguered-castle/strategy': HUB_ONLY,
  '/beleaguered-castle/tips': HUB_ONLY,
  '/bisley': HUB_ONLY,
  '/bisley/how-to-play': HUB_ONLY,
  '/bisley/strategy': HUB_ONLY,
  '/bisley/tips': HUB_ONLY,
  '/bristol': HUB_ONLY,
  '/bristol/how-to-play': HUB_ONLY,
  '/bristol/strategy': HUB_ONLY,
  '/bristol/tips': HUB_ONLY,
  '/calculation': HUB_ONLY,
  '/calculation/how-to-play': HUB_ONLY,
  '/calculation/strategy': HUB_ONLY,
  '/calculation/tips': HUB_ONLY,
  '/clock': HUB_ONLY,
  '/clock/how-to-play': HUB_ONLY,
  '/clock/strategy': HUB_ONLY,
  '/clock/tips': HUB_ONLY,
  '/cruel': HUB_ONLY,
  '/cruel/how-to-play': HUB_ONLY,
  '/cruel/strategy': HUB_ONLY,
  '/cruel/tips': HUB_ONLY,
  '/flower-garden': HUB_ONLY,
  '/flower-garden/how-to-play': HUB_ONLY,
  '/flower-garden/strategy': HUB_ONLY,
  '/flower-garden/tips': HUB_ONLY,
  '/forty-thieves': HUB_ONLY,
  '/forty-thieves/how-to-play': HUB_ONLY,
  '/forty-thieves/strategy': HUB_ONLY,
  '/forty-thieves/tips': HUB_ONLY,
  '/gaps': HUB_ONLY,
  '/gaps/how-to-play': HUB_ONLY,
  '/gaps/strategy': HUB_ONLY,
  '/gaps/tips': HUB_ONLY,
  '/golf': HUB_ONLY,
  '/golf/how-to-play': HUB_ONLY,
  '/golf/strategy': HUB_ONLY,
  '/golf/tips': HUB_ONLY,
  '/la-belle-lucie': HUB_ONLY,
  '/la-belle-lucie/how-to-play': HUB_ONLY,
  '/la-belle-lucie/strategy': HUB_ONLY,
  '/la-belle-lucie/tips': HUB_ONLY,
  '/monte-carlo': HUB_ONLY,
  '/monte-carlo/how-to-play': HUB_ONLY,
  '/monte-carlo/strategy': HUB_ONLY,
  '/monte-carlo/tips': HUB_ONLY,
  '/pyramid': HUB_ONLY,
  '/pyramid/how-to-play': HUB_ONLY,
  '/pyramid/strategy': HUB_ONLY,
  '/pyramid/tips': HUB_ONLY,
  '/tripeaks': HUB_ONLY,
  '/tripeaks/how-to-play': HUB_ONLY,
  '/tripeaks/strategy': HUB_ONLY,
  '/tripeaks/tips': HUB_ONLY,

  // ==========================================================================
  // FREECELL SPOKE (playfreecellonline.com)
  // ==========================================================================

  // FreeCell-specific tools
  '/achievements': FREECELL_ONLY,
  '/streak': FREECELL_ONLY,
  '/storm': FREECELL_ONLY,
  '/embed': FREECELL_ONLY,
  '/embed-generator': FREECELL_ONLY,
  '/large-cards': FREECELL_ONLY,
  '/deals': FREECELL_ONLY,
  '/solver': FREECELL_ONLY,
  '/download': FREECELL_ONLY,
  '/leaderboard': FREECELL_ONLY,
  '/statistics': FREECELL_ONLY,
  '/stats': FREECELL_ONLY,
  '/winning-deals': FREECELL_ONLY,
  '/game/[number]': FREECELL_ONLY,
  '/lab/dom-freecell': FREECELL_ONLY,

  // FreeCell-specific editorial
  '/microsoft-freecell': FREECELL_ONLY,
  '/famous-freecell-deals': FREECELL_ONLY,
  '/famous-freecell-game-numbers': FREECELL_ONLY,
  '/freecell-endgame-strategy': FREECELL_ONLY,
  '/freecell-mastery': FREECELL_ONLY,
  '/freecell-opening-strategy': FREECELL_ONLY,
  '/freecell-solvability': FREECELL_ONLY,
  '/freecell-hints-explained': FREECELL_ONLY,
  '/freecell-world-records': FREECELL_ONLY,
  '/freecell-variants': FREECELL_ONLY,
  '/freecell-game-11982': FREECELL_ONLY,
  '/freecell-for-beginners': FREECELL_ONLY,
  '/freecell-for-seniors': FREECELL_ONLY,
  '/freecell-rules': FREECELL_ONLY,
  '/freecell-cheat-sheet': FREECELL_ONLY,
  '/freecell-probability': FREECELL_ONLY,
  '/freecell-mistakes-to-avoid': FREECELL_ONLY,
  '/best-freecell-apps': FREECELL_ONLY,
  '/easy-freecell': FREECELL_ONLY,
  '/easy-freecell-games': FREECELL_ONLY,
  '/hard-freecell-games': FREECELL_ONLY,
  '/how-freecell-supermoves-work': FREECELL_ONLY,
  '/why-freecell-is-almost-always-solvable': FREECELL_ONLY,
  '/is-every-freecell-game-winnable': FREECELL_ONLY,
  '/unsolvable-freecell-deals': FREECELL_ONLY,

  // FreeCell gameplay sub-pages (hub owns /freecell itself but spoke owns the sub-content)
  '/freecell/1-cell': FREECELL_ONLY,
  '/freecell/2-cell': FREECELL_ONLY,
  '/freecell/3-cell': FREECELL_ONLY,
  '/freecell/how-to-play': FREECELL_ONLY,
  '/freecell/tips': FREECELL_ONLY,
  '/freecell/strategy': FREECELL_ONLY,

  // FreeCell-family variants
  '/bakers-game': FREECELL_ONLY,
  '/bakers-game/how-to-play': FREECELL_ONLY,
  '/bakers-game/strategy': FREECELL_ONLY,
  '/bakers-game/tips': FREECELL_ONLY,
  '/eight-off': FREECELL_ONLY,
  '/eight-off/how-to-play': FREECELL_ONLY,
  '/eight-off/strategy': FREECELL_ONLY,
  '/eight-off/tips': FREECELL_ONLY,
  '/seahaven': FREECELL_ONLY,
  '/seahaven/how-to-play': FREECELL_ONLY,
  '/seahaven/strategy': FREECELL_ONLY,
  '/seahaven/tips': FREECELL_ONLY,
  '/penguin': FREECELL_ONLY,
  '/penguin/how-to-play': FREECELL_ONLY,
  '/penguin/strategy': FREECELL_ONLY,
  '/penguin/tips': FREECELL_ONLY,

  // Daily challenges (FreeCell-specific)
  '/daily-freecell': FREECELL_ONLY,
  '/daily-freecell/calendar': FREECELL_ONLY,
  '/daily-freecell/share/[date]': FREECELL_ONLY,

  // ==========================================================================
  // KLONDIKE SPOKE (playklondikeonline.com)
  // ==========================================================================

  '/klondike': KLONDIKE_ONLY,
  '/klondike/how-to-play': KLONDIKE_ONLY,
  '/klondike/tips': KLONDIKE_ONLY,
  '/klondike/strategy': KLONDIKE_ONLY,
  '/klondike/faq': KLONDIKE_ONLY,
  '/klondike/winning-strategies': KLONDIKE_ONLY,
  '/klondike/draw-1-vs-draw-3': KLONDIKE_ONLY,
  '/klondike/vegas-scoring': KLONDIKE_ONLY,

  // Klondike spoke pillar pages (Wave 8-KL)
  '/klondike-mastery': KLONDIKE_ONLY,
  '/klondike-vegas-scoring': KLONDIKE_ONLY,
  '/klondike-probability': KLONDIKE_ONLY,
  '/klondike-variants': KLONDIKE_ONLY,
  '/klondike-cheat-sheet': KLONDIKE_ONLY,
  '/klondike-for-beginners': KLONDIKE_ONLY,
  '/klondike-for-seniors': KLONDIKE_ONLY,
  '/klondike-mistakes-to-avoid': KLONDIKE_ONLY,

  // Klondike striking-distance target (Wave 8-STR) — GSC shows spoke surfacing at
  // pos 43-54 for "least moves to win solitaire" / "quickest game of solitaire".
  '/klondike-fewest-moves': KLONDIKE_ONLY,

  // Klondike-family variants
  '/canfield': KLONDIKE_ONLY,
  '/canfield/how-to-play': KLONDIKE_ONLY,
  '/canfield/strategy': KLONDIKE_ONLY,
  '/canfield/tips': KLONDIKE_ONLY,
  '/yukon': KLONDIKE_ONLY,
  '/yukon/how-to-play': KLONDIKE_ONLY,
  '/yukon/strategy': KLONDIKE_ONLY,
  '/yukon/tips': KLONDIKE_ONLY,

  // ==========================================================================
  // SPIDER SPOKE (playspidersolitaireonline.com)
  // ==========================================================================

  '/spider': SPIDER_ONLY,
  '/spider/how-to-play': SPIDER_ONLY,
  '/spider/tips': SPIDER_ONLY,
  '/spider/strategy': SPIDER_ONLY,
  '/spider/faq': SPIDER_ONLY,
  '/spider/1-suit-vs-2-suit-vs-4-suit': SPIDER_ONLY,
  '/spider/is-spider-solitaire-winnable': SPIDER_ONLY,
  '/spider/how-to-empty-a-column': SPIDER_ONLY,

  // Spider spoke pillar pages (Wave 8-SP)
  '/spider-mastery': SPIDER_ONLY,
  '/spider-suit-strategy': SPIDER_ONLY,
  '/spider-column-tactics': SPIDER_ONLY,
  '/spider-winnability': SPIDER_ONLY,
  '/spider-variants': SPIDER_ONLY,
  '/spider-for-beginners': SPIDER_ONLY,
  '/spider-for-seniors': SPIDER_ONLY,
  '/spider-mistakes-to-avoid': SPIDER_ONLY,
  '/spider-cheat-sheet': SPIDER_ONLY,

  // Spider-family variants
  '/scorpion': SPIDER_ONLY,
  '/scorpion/how-to-play': SPIDER_ONLY,
  '/scorpion/strategy': SPIDER_ONLY,
  '/scorpion/tips': SPIDER_ONLY,
};

const DEFAULT_OWNERSHIP: RouteOwnership = HUB_ONLY;

/**
 * Normalises a path for lookup: strips trailing slash (except for "/"),
 * removes query string, removes hash, and ensures leading slash.
 */
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
 * Converts a pattern like "/blog/[slug]" or "/daily-freecell/share/[date]"
 * into a RegExp that matches concrete paths. Returns null for non-dynamic
 * patterns.
 */
function patternToRegex(pattern: string): RegExp | null {
  if (!pattern.includes('[')) return null;
  const escaped = pattern
    .split('/')
    .map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        return '[^/]+';
      }
      // Escape regex metacharacters in literal segments.
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return new RegExp('^' + escaped + '$');
}

// Pre-compile dynamic patterns once at module load.
const DYNAMIC_PATTERNS: Array<{ pattern: string; regex: RegExp; ownership: RouteOwnership }> =
  Object.entries(ROUTE_OWNERSHIP)
    .map(([pattern, ownership]) => {
      const regex = patternToRegex(pattern);
      return regex ? { pattern, regex, ownership } : null;
    })
    .filter((entry): entry is { pattern: string; regex: RegExp; ownership: RouteOwnership } =>
      entry !== null
    );

/**
 * Returns ownership for a path. If not explicitly listed, defaults to hub-only.
 * Handles dynamic segments: /blog/[slug] matches any /blog/<value> path.
 */
export function ownerOf(path: string): RouteOwnership {
  const normalised = normalisePath(path);

  // Exact match first.
  const exact = ROUTE_OWNERSHIP[normalised];
  if (exact) return exact;

  // Fall through to dynamic pattern match.
  for (const { regex, ownership } of DYNAMIC_PATTERNS) {
    if (regex.test(normalised)) return ownership;
  }

  return DEFAULT_OWNERSHIP;
}

/**
 * Returns true if siteKey is in owners[] for the path.
 */
export function isOwnedBy(path: string, siteKey: SiteKey): boolean {
  return ownerOf(path).owners.includes(siteKey);
}

/**
 * Returns the absolute canonical URL for a path
 * (e.g. "https://solitairestack.com/freecell-vs-spider").
 */
export function canonicalUrlFor(path: string): string {
  const ownership = ownerOf(path);
  const domain = SITE_DOMAINS[ownership.primaryOwner];
  const normalised = normalisePath(path);
  return domain + normalised;
}

/**
 * Returns all route paths that siteKey should serve.
 * Used by sitemap generation and 404 gating.
 */
export function getAllRoutesForSite(siteKey: SiteKey): string[] {
  return Object.entries(ROUTE_OWNERSHIP)
    .filter(([, ownership]) => ownership.owners.includes(siteKey))
    .map(([path]) => path);
}
