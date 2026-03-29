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
    gaMeasurementId: 'G-988ZBJSKVJ',
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
    gaMeasurementId: 'G-988ZBJSKVJ',
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
    gaMeasurementId: 'G-988ZBJSKVJ',
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
