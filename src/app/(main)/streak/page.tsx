import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import StreakPage from './StreakPage';

export const metadata: Metadata = {
  title: 'Puzzle Streak — How Many FreeCell Games Can You Win in a Row?',
  description:
    'Challenge yourself with Puzzle Streak mode. Solve consecutive FreeCell deals without losing. Track your best streak and share your score. Free, no download.',
  keywords: [
    'freecell streak',
    'freecell puzzle streak',
    'freecell challenge',
    'freecell consecutive wins',
    'freecell online',
    'card game streak',
  ],
  openGraph: {
    title: 'Puzzle Streak — FreeCell Online',
    description:
      'How many FreeCell games can you win in a row? Test your skill in Puzzle Streak mode.',
    url: absoluteUrl('/streak'),
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
              { '@type': 'ListItem', position: 2, name: 'Puzzle Streak', item: absoluteUrl('/streak') },
            ],
          }),
        }}
      />
      <StreakPage />
    </>
  );
}
