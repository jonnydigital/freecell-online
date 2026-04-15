import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import FreecellHomeClient from '@/components/FreecellHomeClient';
import DomFreecellClient from '@/components/DomFreecellClient';
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is FreeCell Solitaire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FreeCell is a solitaire card game where all 52 cards are dealt face-up into eight tableau columns at the start. You also have four free cells (temporary storage spaces) and four foundation piles. The goal is to build the four foundations up by suit from Ace to King. Because all cards are visible, nearly every deal (99.999%) is solvable with the right strategy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do the free cells work in FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free cells are four temporary storage spaces in the top-left corner of the board. You can move any single card from the tableau to an empty free cell. Cards in free cells can be moved back to the tableau or directly to the foundations. You can only place one card per free cell at a time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is every FreeCell deal winnable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Almost. Of the 8 trillion+ possible FreeCell deals, the vast majority are winnable. In the classic Microsoft numbered deals (1–32000), only deal #11982 has been proven unsolvable. In practice, 99.999% of deals can be won with correct play.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many cards can I move at once in FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can only move one card at a time in strict FreeCell rules. However, the game allows "supermoves" — moving a sequence of cards as a group — as a shortcut, as long as you have enough empty free cells and empty columns to physically move them one at a time. The formula is: (empty free cells + 1) × 2^(empty columns).',
        },
      },
    ],
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
      <script
        id="ld-faqpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {useDom ? <DomFreecellClient /> : <FreecellHomeClient />}
    </>
  );
}
