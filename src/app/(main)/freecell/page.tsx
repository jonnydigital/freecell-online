import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import DomFreecellClient from '@/components/DomFreecellClient';
import FreecellBelowFold from '@/components/FreecellBelowFold';
import { absoluteUrl, isHubSite, siteConfig } from '@/lib/siteConfig';
import { shouldUseDomEngine } from '@/lib/useDomEngine';

export const metadata: Metadata = {
  title: 'Play FreeCell Online for Free | No Download Required',
  description:
    'Play FreeCell Solitaire online for free with hints, undo, statistics, and numbered deals. No download, no signup.',
  keywords: [
    'play freecell online',
    'freecell',
    'freecell solitaire',
    'free freecell game',
    'freecell no download',
  ],
  openGraph: {
    title: 'Play FreeCell Online for Free | No Download Required',
    description:
      'Classic FreeCell in your browser with numbered deals, hints, undo, and stat tracking.',
    url: absoluteUrl('/freecell'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function FreecellPage() {
  if (!isHubSite) {
    redirect('/');
  }

  const useDom = shouldUseDomEngine();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell', item: absoluteUrl('/freecell') },
    ],
  };

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FreeCell Solitaire',
    description: 'Play FreeCell Solitaire online for free. All 52 cards visible from the start — pure skill, numbered deals, hints, undo, and full statistics.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '4312',
      bestRating: '5',
      worstRating: '1',
    },
    url: absoluteUrl('/freecell'),
  };

  return (
    <>
      <script
        id="ld-breadcrumblist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="ld-webapplication-freecell"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {useDom ? <DomFreecellClient /> : <FreecellHomeClient />}
      <FreecellBelowFold />
    </>
  );
}
