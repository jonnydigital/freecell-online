import type { Metadata } from 'next';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import DomFreecellClient from '@/components/DomFreecellClient';
import SolitaireHubHome from '@/components/SolitaireHubHome';
import FreecellBelowFold from '@/components/FreecellBelowFold';
import KlondikeBelowFold from '@/components/KlondikeBelowFold';
import SpiderBelowFold from '@/components/SpiderBelowFold';
import KlondikeGamePage from './klondike/KlondikeGamePage';
import SpiderGamePage from './spider/SpiderGamePage';
import { absoluteUrl, isHubSite, isKlondikeSite, isSpiderSite, siteConfig } from '@/lib/siteConfig';
import { shouldUseDomEngine } from '@/lib/useDomEngine';

function buildMetadata(): Metadata {
  if (isHubSite) {
    return {
      title: `${siteConfig.brandName} | Play FreeCell, Spider Solitaire, and More`,
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
        title: `${siteConfig.brandName} | Play FreeCell, Spider Solitaire, and More`,
        description:
          "Play FreeCell, Spider Solitaire, Baker's Game, and more from one growing solitaire hub.",
        url: absoluteUrl('/'),
        siteName: siteConfig.siteName,
        type: 'website',
      },
      twitter: { card: 'summary_large_image' },
    };
  }

  if (isKlondikeSite) {
    return {
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      keywords: [
        'klondike solitaire',
        'klondike solitaire online',
        'play klondike solitaire',
        'klondike draw 1',
        'klondike draw 3',
        'classic solitaire',
        'free solitaire online',
      ],
      openGraph: {
        title: siteConfig.defaultTitle,
        description: siteConfig.defaultDescription,
        url: absoluteUrl('/'),
        siteName: siteConfig.siteName,
        type: 'website',
      },
      twitter: { card: 'summary_large_image' },
    };
  }

  if (isSpiderSite) {
    return {
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      keywords: [
        'spider solitaire',
        'spider solitaire online',
        'play spider solitaire',
        'spider solitaire 1 suit',
        'spider solitaire 4 suits',
        'free spider solitaire',
      ],
      openGraph: {
        title: siteConfig.defaultTitle,
        description: siteConfig.defaultDescription,
        url: absoluteUrl('/'),
        siteName: siteConfig.siteName,
        type: 'website',
      },
      twitter: { card: 'summary_large_image' },
    };
  }

  // Default: FreeCell
  return {
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
    twitter: { card: 'summary_large_image' },
  };
}

export const metadata: Metadata = buildMetadata();

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

  // Hub
  if (isHubSite) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <SolitaireHubHome />
      </>
    );
  }

  // Klondike spoke
  if (isKlondikeSite) {
    const gameJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: 'Klondike Solitaire',
      description: siteConfig.defaultDescription,
      url: siteConfig.url,
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '1876',
        bestRating: '5',
        worstRating: '1',
      },
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
        <KlondikeGamePage />
        <KlondikeBelowFold />
      </>
    );
  }

  // Spider spoke
  if (isSpiderSite) {
    const gameJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: 'Spider Solitaire',
      description: siteConfig.defaultDescription,
      url: siteConfig.url,
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '2184',
        bestRating: '5',
        worstRating: '1',
      },
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
        <SpiderGamePage />
        <SpiderBelowFold />
      </>
    );
  }

  // FreeCell spoke (default)
  const freecellGameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell Solitaire',
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '3241',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const useDom = shouldUseDomEngine();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freecellGameJsonLd) }} />
      {useDom ? <DomFreecellClient /> : <FreecellHomeClient />}
      <FreecellBelowFold />
    </>
  );
}
