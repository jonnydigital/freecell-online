import type { Metadata } from 'next';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import SolitaireHubHome from '@/components/SolitaireHubHome';
import { absoluteUrl, isHubSite, siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = isHubSite
  ? {
      title: 'Solitaire Stack | Play FreeCell, Spider Solitaire, and More',
      description:
        'A growing solitaire hub with live FreeCell, Spider Solitaire, open-information variants, and strategy content built to support the portfolio.',
      keywords: [
        'solitaire games online',
        'play solitaire online',
        'freecell',
        'spider solitaire',
        'solitaire hub',
        'solitaire strategy',
      ],
      openGraph: {
        title: 'Solitaire Stack | Play FreeCell, Spider Solitaire, and More',
        description:
          "Play FreeCell, Spider Solitaire, Baker's Game, and more from one growing solitaire hub.",
        url: absoluteUrl('/'),
        siteName: siteConfig.siteName,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
      },
    }
  : {
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      keywords: [
        'freecell',
        'freecell online',
        'play freecell',
        'freecell solitaire',
        'free card game',
      ],
      openGraph: {
        title: siteConfig.defaultTitle,
        description: siteConfig.defaultDescription,
        url: absoluteUrl('/'),
        siteName: siteConfig.siteName,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
      },
    };

export default function Home() {
  return isHubSite ? <SolitaireHubHome /> : <FreecellHomeClient />;
}
