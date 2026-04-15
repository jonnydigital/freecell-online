import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import StatsPage from './StatsPage';

export const metadata: Metadata = {
  title: 'Statistics — FreeCell Online',
  description:
    'Track your FreeCell game statistics, win rates, streaks, and performance over time with interactive charts and a daily activity heatmap.',
  keywords: [
    'freecell statistics',
    'freecell stats',
    'freecell win rate',
    'freecell streak',
    'card game stats',
  ],
  openGraph: {
    title: 'Statistics — FreeCell Online',
    description:
      'Track your FreeCell performance with charts, streaks, and detailed statistics.',
    url: absoluteUrl('/stats'),
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
        id="ld-breadcrumblist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Statistics', item: absoluteUrl('/stats') },
            ],
          }),
        }}
      />
      <StatsPage />
    </>
  );
}
