export type SiteKey = 'playfreecellonline' | 'solitairestack' | 'playklondikeonline' | 'playspidersolitaireonline';

export interface SiteConfig {
  key: SiteKey;
  domain: string;
  url: string;
  siteName: string;
  brandName: string;
  footerWordmark: string;
  primaryGamePath: string;
  defaultTitle: string;
  defaultDescription: string;
  privacyEmail: string;
  appleWebAppTitle: string;
  gaMeasurementId: string;
}

const SITE_CONFIGS: Record<SiteKey, SiteConfig> = {
  playfreecellonline: {
    key: 'playfreecellonline',
    domain: 'playfreecellonline.com',
    url: 'https://playfreecellonline.com',
    siteName: 'PlayFreeCellOnline.com',
    brandName: 'FreeCell Online',
    footerWordmark: 'Freecell',
    primaryGamePath: '/',
    defaultTitle: 'Play FreeCell Online for Free | No Download Required',
    defaultDescription:
      'Play FreeCell Solitaire online for free. No download, no signup. Classic Microsoft FreeCell deals, hints, undo, and more. Works on desktop and mobile.',
    privacyEmail: 'privacy@playfreecellonline.com',
    appleWebAppTitle: 'FreeCell',
    gaMeasurementId: 'G-8N85JJPLED',
  },
  solitairestack: {
    key: 'solitairestack',
    domain: 'solitairestack.com',
    url: 'https://solitairestack.com',
    siteName: 'SolitaireStack.com',
    brandName: 'Solitaire Stack',
    footerWordmark: 'SolitaireStack',
    primaryGamePath: '/freecell',
    defaultTitle: 'Solitaire Stack | Play Solitaire Games Online',
    defaultDescription:
      'Play solitaire games online for free. FreeCell, Spider Solitaire, and more with no download required.',
    privacyEmail: 'privacy@solitairestack.com',
    appleWebAppTitle: 'Solitaire',
    gaMeasurementId: 'G-988ZBJSKVJ',
  },
  playklondikeonline: {
    key: 'playklondikeonline',
    domain: 'playklondikeonline.com',
    url: 'https://playklondikeonline.com',
    siteName: 'PlayKlondikeOnline.com',
    brandName: 'Klondike Online',
    footerWordmark: 'Klondike',
    primaryGamePath: '/',
    defaultTitle: 'Play Klondike Solitaire Online Free — Draw 1 & Draw 3',
    defaultDescription:
      'Play Klondike Solitaire online for free. The classic card game everyone calls Solitaire. Choose Draw 1 or Draw 3 mode. Undo, hints, statistics. No download required.',
    privacyEmail: 'privacy@playklondikeonline.com',
    appleWebAppTitle: 'Klondike',
    gaMeasurementId: 'G-9MJ1PYWNRR',
  },
  playspidersolitaireonline: {
    key: 'playspidersolitaireonline',
    domain: 'playspidersolitaireonline.com',
    url: 'https://playspidersolitaireonline.com',
    siteName: 'PlaySpiderSolitaireOnline.com',
    brandName: 'Spider Solitaire Online',
    footerWordmark: 'Spider',
    primaryGamePath: '/',
    defaultTitle: 'Play Spider Solitaire Online Free — 1, 2 & 4 Suit',
    defaultDescription:
      'Play Spider Solitaire online for free. Choose 1-suit, 2-suit, or 4-suit difficulty. The classic 2-deck card game with undo, hints, and statistics. No download required.',
    privacyEmail: 'privacy@playspidersolitaireonline.com',
    appleWebAppTitle: 'Spider',
    gaMeasurementId: 'G-WZX8LMFDP8',
  },
};

function resolveSiteKey(rawSiteKey: string | undefined): SiteKey {
  if (rawSiteKey === 'solitairestack') return 'solitairestack';
  if (rawSiteKey === 'playklondikeonline') return 'playklondikeonline';
  if (rawSiteKey === 'playspidersolitaireonline') return 'playspidersolitaireonline';
  return 'playfreecellonline';
}

export const siteConfig = SITE_CONFIGS[
  resolveSiteKey(process.env.NEXT_PUBLIC_SITE_KEY ?? process.env.SITE_KEY)
];

export const isHubSite = siteConfig.key === 'solitairestack';
export const isKlondikeSite = siteConfig.key === 'playklondikeonline';
export const isSpiderSite = siteConfig.key === 'playspidersolitaireonline';

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Maps a game path to the correct spoke domain URL for cross-site navigation.
 * On the hub, returns relative paths (hub owns all game routes).
 * On spoke sites, returns absolute URLs to the correct spoke domain.
 *
 * Examples:
 *   gameUrl('/spider')   → 'https://playspidersolitaireonline.com/'
 *   gameUrl('/freecell')  → 'https://playfreecellonline.com/'
 *   gameUrl('/klondike')  → 'https://playklondikeonline.com/'
 *   gameUrl('/bakers-game') → 'https://playfreecellonline.com/bakers-game'
 */
const GAME_DOMAIN_MAP: Record<string, SiteKey> = {
  '/freecell': 'playfreecellonline',
  '/bakers-game': 'playfreecellonline',
  '/eight-off': 'playfreecellonline',
  '/easy-freecell': 'playfreecellonline',
  '/freecell/1-cell': 'playfreecellonline',
  '/freecell/2-cell': 'playfreecellonline',
  '/freecell/3-cell': 'playfreecellonline',
  '/storm': 'playfreecellonline',
  '/spider': 'playspidersolitaireonline',
  '/scorpion': 'playspidersolitaireonline',
  '/klondike': 'playklondikeonline',
  '/yukon': 'playklondikeonline',
  '/canfield': 'playklondikeonline',
};

export function gameUrl(path: string): string {
  // Hub owns all routes — use relative paths
  if (isHubSite) return path;

  const ownerKey = GAME_DOMAIN_MAP[path];
  if (!ownerKey) {
    // Unknown game path — fall back to hub
    return `${SITE_CONFIGS.solitairestack.url}${path}`;
  }

  const ownerConfig = SITE_CONFIGS[ownerKey];
  // If we're already on the owning domain, use the spoke's primaryGamePath or relative path
  if (ownerKey === siteConfig.key) {
    return ownerConfig.primaryGamePath === '/' && path === `/${ownerConfig.footerWordmark.toLowerCase()}`
      ? '/'
      : path;
  }

  // Cross-site: use absolute URL to the correct spoke domain's homepage
  // Spoke games live at / (primaryGamePath), not /freecell or /spider
  if (ownerConfig.primaryGamePath === '/') {
    // The game IS the homepage on that spoke
    const gameName = path.split('/')[1]; // e.g., 'spider' from '/spider'
    const spokeGameNames = Object.entries(GAME_DOMAIN_MAP)
      .filter(([, key]) => key === ownerKey)
      .map(([p]) => p);
    // If this is the primary game for that spoke, link to their homepage
    if (spokeGameNames[0] === path) {
      return ownerConfig.url;
    }
    // Otherwise link to the subpath on that domain
    return `${ownerConfig.url}${path}`;
  }

  return `${ownerConfig.url}${path}`;
}
