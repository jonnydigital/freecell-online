import type { Metadata } from 'next';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import DomFreecellClient from '@/components/DomFreecellClient';
import SolitaireHubHome from '@/components/SolitaireHubHome';
import { featuredGames, faqItems } from '@/lib/hubContent';
import FreecellBelowFold from '@/components/FreecellBelowFold';
import KlondikeBelowFold from '@/components/KlondikeBelowFold';
import SpiderBelowFold from '@/components/SpiderBelowFold';
import KlondikeGamePage from './klondike/KlondikeGamePage';
import SpiderGamePage from './spider/SpiderGamePage';
import { absoluteUrl, isHubSite, isKlondikeSite, isSpiderSite, siteConfig } from '@/lib/siteConfig';
import { canonicalUrlFor } from '@/lib/routeOwnership';
import { shouldUseDomEngine } from '@/lib/useDomEngine';

function buildMetadata(): Metadata {
  if (isHubSite) {
    return {
      title: `${siteConfig.brandName} | Play FreeCell, Spider Solitaire, and More`,
      description:
        'Play FreeCell, Spider Solitaire, Klondike, and 25+ solitaire card games online for free. No download, no signup — just classic card games with strategy guides, daily challenges, and leaderboards.',
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
      alternates: {
        canonical: canonicalUrlFor('/'),
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
      alternates: {
        canonical: canonicalUrlFor('/'),
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
      alternates: {
        canonical: canonicalUrlFor('/'),
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
    alternates: {
      canonical: canonicalUrlFor('/'),
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

  // Hub — JSON-LD emitted here (server component) to avoid client hydration duplication
  if (isHubSite) {
    const HUB_DESCRIPTION =
      'Play FreeCell, Spider Solitaire, Klondike, and 25+ solitaire card games online for free. No download, no signup — just classic card games with strategy guides, daily challenges, and leaderboards.';
    const hubWebSiteJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.brandName,
      url: absoluteUrl('/'),
      description: HUB_DESCRIPTION,
    };
    const hubWebAppJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: siteConfig.brandName,
      url: absoluteUrl('/'),
      description: HUB_DESCRIPTION,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
    const hubCollectionJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Featured solitaire games',
      itemListElement: featuredGames.map((game, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: game.label,
        url: absoluteUrl(game.href),
      })),
    };
    const hubFaqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
    return (
      <>
        <script id="ld-website-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubWebSiteJsonLd) }} />
        <script id="ld-webapplication-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubWebAppJsonLd) }} />
        <script id="ld-itemlist-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubCollectionJsonLd) }} />
        <script id="ld-faqpage-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubFaqJsonLd) }} />
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
    };
    return (
      <>
        <script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script id="ld-game-klondike-solitaire" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
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
    };
    return (
      <>
        <script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
        <script id="ld-game-spider-solitaire" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
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
  };

  const useDom = shouldUseDomEngine();
  return (
    <>
      <script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script id="ld-game-freecell-solitaire" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(freecellGameJsonLd) }} />
      {useDom ? <DomFreecellClient /> : <FreecellHomeClient />}
      <FreecellBelowFold />
    </>
  );
}
