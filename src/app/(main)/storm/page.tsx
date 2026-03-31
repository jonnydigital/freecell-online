import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import StormPage from './StormPage';

export const metadata: Metadata = {
  title: 'Puzzle Storm — Solve FreeCell Against the Clock',
  description:
    'Race against time in Puzzle Storm mode. Solve as many FreeCell games as possible in 3 minutes. Earn bonus time for fast solves. Free, no download.',
  keywords: [
    'freecell storm',
    'freecell puzzle storm',
    'freecell timed challenge',
    'freecell speed run',
    'freecell online',
    'card game timer',
  ],
  openGraph: {
    title: 'Puzzle Storm — FreeCell Online',
    description:
      'How many FreeCell games can you solve in 3 minutes? Test your speed in Puzzle Storm mode.',
    url: absoluteUrl('/storm'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Puzzle Storm — FreeCell',
    description:
      'Race against time in Puzzle Storm mode. Solve as many FreeCell games as possible in 3 minutes. Earn bonus time for fast solves.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: absoluteUrl('/storm'),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '523',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Puzzle Storm in FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puzzle Storm is a timed FreeCell challenge mode where you solve as many FreeCell games as possible within 3 minutes. Each time you complete a game, bonus seconds are added to your clock. The goal is to chain wins together and keep the timer alive as long as possible.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you earn bonus time in Puzzle Storm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each time you successfully complete a FreeCell game in Puzzle Storm mode, bonus seconds are added to your remaining time. Solving games quickly and efficiently keeps your timer running and allows you to attempt more games before time runs out.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a good score in FreeCell Puzzle Storm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A good Puzzle Storm score depends on your FreeCell experience. Beginners might complete 2–3 games, intermediate players 5–8 games, and advanced players can push for 10 or more. The key is solving games efficiently without getting stuck on a single deal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I practice before playing Puzzle Storm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Before playing Puzzle Storm, practice standard FreeCell games to build speed and pattern recognition. The games in Puzzle Storm are randomly selected standard FreeCell deals, so improving your regular FreeCell game directly improves your Storm performance.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Puzzle Storm', item: absoluteUrl('/storm') },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StormPage />
    </>
  );
}
