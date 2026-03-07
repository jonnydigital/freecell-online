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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Puzzle Storm', item: absoluteUrl('/storm') },
            ],
          }),
        }}
      />
      <StormPage />
    </>
  );
}
