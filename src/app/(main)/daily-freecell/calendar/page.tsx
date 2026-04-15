import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import ContentLayout from '@/components/ContentLayout';
import DailyChallengeCalendar from './DailyChallengeCalendar';

export const metadata: Metadata = {
  title: 'Daily Challenge Calendar | FreeCell Online',
  description:
    'Track your FreeCell daily challenge history with an interactive calendar. View your streak, completion stats, and replay past daily puzzles.',
  keywords: [
    'freecell daily challenge calendar',
    'freecell streak tracker',
    'daily freecell history',
    'freecell challenge log',
    'freecell daily puzzle calendar',
  ],
  openGraph: {
    title: 'Daily Challenge Calendar | FreeCell Online',
    description:
      'Interactive calendar showing your daily FreeCell challenge history, streaks, and stats.',
    url: absoluteUrl('/daily-freecell/calendar'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function DailyCalendarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Daily FreeCell',
        item: absoluteUrl('/daily-freecell'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Calendar',
        item: absoluteUrl('/daily-freecell/calendar'),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <script
        id="ld-breadcrumblist-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pt-6 pb-8 sm:pt-8 sm:pb-10 px-6 text-center">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#D4AF37] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Daily Challenge Calendar
        </h1>
        <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
          Your daily FreeCell journey at a glance. Track streaks, revisit past
          challenges, and see how far you&apos;ve come.
        </p>
      </header>

      <DailyChallengeCalendar />
    </ContentLayout>
  );
}
