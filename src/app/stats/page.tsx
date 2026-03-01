import type { Metadata } from 'next';
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
    url: 'https://playfreecellonline.com/stats',
    siteName: 'PlayFreeCellOnline.com',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <StatsPage />;
}
