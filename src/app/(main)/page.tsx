import type { Metadata } from 'next';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import DomFreecellClient from '@/components/DomFreecellClient';
import SolitaireHubHome from '@/components/SolitaireHubHome';
import FreecellBelowFold from '@/components/FreecellBelowFold';
import { absoluteUrl, isHubSite, siteConfig } from '@/lib/siteConfig';
import { shouldUseDomEngine } from '@/lib/useDomEngine';

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
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/game/{game_number}`,
      'query-input': 'required name=game_number',
    },
  };

  const gameJsonLd = !isHubSite ? {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell Solitaire',
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '3241',
      bestRating: '5',
      worstRating: '1',
    },
  } : null;

  if (isHubSite) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <SolitaireHubHome />
      </>
    );
  }

  const useDom = shouldUseDomEngine();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      {gameJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />}
      {useDom ? <DomFreecellClient /> : <FreecellHomeClient />}
      <FreecellBelowFold />
    </>
  );
}
