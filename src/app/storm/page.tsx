import type { Metadata } from 'next';
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
    url: 'https://playfreecellonline.com/storm',
    siteName: 'PlayFreeCellOnline.com',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <StormPage />;
}
