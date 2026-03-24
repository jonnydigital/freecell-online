export type SiteKey = 'playfreecellonline' | 'solitairestack';

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
};

function resolveSiteKey(rawSiteKey: string | undefined): SiteKey {
  if (rawSiteKey === 'solitairestack') return 'solitairestack';
  return 'playfreecellonline';
}

export const siteConfig = SITE_CONFIGS[
  resolveSiteKey(process.env.NEXT_PUBLIC_SITE_KEY ?? process.env.SITE_KEY)
];

export const isHubSite = siteConfig.key === 'solitairestack';

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.url).toString();
}
