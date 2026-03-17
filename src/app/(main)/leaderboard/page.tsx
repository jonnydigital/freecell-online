import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteConfig';
import ContentLayout from '@/components/ContentLayout';
import { ContentHero, JsonLd, CardSection, SectionHeading, ContentBody, ContentLinkCard } from '@/components/content';
import LeaderboardFullView from './LeaderboardFullView';

export const metadata: Metadata = {
  title: 'FreeCell Leaderboard | Daily & All-Time Rankings',
  description:
    'See who tops the FreeCell leaderboard. Daily challenge rankings and all-time best scores. Compete with players worldwide.',
  keywords: ['freecell leaderboard', 'freecell rankings', 'freecell high scores', 'freecell daily challenge'],
};

export default function LeaderboardPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Leaderboard', item: absoluteUrl('/leaderboard') },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Leaderboard"
        subtitle="Compete with players around the world. Win the daily challenge to claim your rank."
      />

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <LeaderboardFullView />
      </main>

      {/* ── Related Guides ── */}
      <CardSection variant="dark">
        <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
        <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
          <ContentLinkCard href="/achievements" title="Achievements" description="Unlock badges and milestones as you master FreeCell." />
          <ContentLinkCard href="/statistics" title="Statistics" description="Win rates, solvability data, and mathematical analysis." />
          <ContentLinkCard href="/streak" title="Winning Streaks" description="Track your daily streak and compete for the longest run." />
        </ContentBody>
      </CardSection>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <Link href="/" className="text-white/30 hover:text-white text-sm transition-colors">
          &larr; Back to game
        </Link>
      </footer>
    </ContentLayout>
  );
}
