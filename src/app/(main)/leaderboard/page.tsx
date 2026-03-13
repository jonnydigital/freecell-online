import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteConfig';
import LeaderboardFullView from './LeaderboardFullView';

export const metadata: Metadata = {
  title: 'FreeCell Leaderboard | Daily & All-Time Rankings',
  description:
    'See who tops the FreeCell leaderboard. Daily challenge rankings and all-time best scores. Compete with players worldwide.',
  keywords: ['freecell leaderboard', 'freecell rankings', 'freecell high scores', 'freecell daily challenge'],
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#072907] text-white selection:bg-[#D4AF37] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Leaderboard', item: absoluteUrl('/leaderboard') },
            ],
          }),
        }}
      />
      {/* Header */}
      <header className="py-16 px-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <Link
            href="/"
            className="text-xl font-black uppercase tracking-tighter mb-10 hover:opacity-80 transition-opacity"
          >
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Leaderboard
          </h1>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            Compete with players around the world. Win the daily challenge to claim your rank.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <LeaderboardFullView />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <Link href="/" className="text-white/30 hover:text-white text-sm transition-colors">
          &larr; Back to game
        </Link>
      </footer>
    </div>
  );
}
