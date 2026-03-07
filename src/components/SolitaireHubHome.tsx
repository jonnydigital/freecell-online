'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import GameErrorBoundary from './GameErrorBoundary';

const GameShell = dynamic(() => import('./GameShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">&#127183;</div>
        <p className="text-white/60 text-lg">Loading FreeCell...</p>
      </div>
    </div>
  ),
});

const featuredGames = [
  {
    href: '/freecell',
    label: 'FreeCell',
    description: 'All 52 cards visible. Pure skill, numbered deals, hints, and stat tracking.',
  },
  {
    href: '/spider',
    label: 'Spider Solitaire',
    description: 'Three difficulty levels with two-deck play and a deeper challenge curve.',
  },
  {
    href: '/bakers-game',
    label: "Baker's Game",
    description: 'Build by suit instead of alternating colors. Stricter and more tactical.',
  },
  {
    href: '/eight-off',
    label: 'Eight Off',
    description: 'Eight reserve cells and a different rhythm for sequence building.',
  },
];

const learnLinks = [
  { href: '/how-to-play', label: 'How to Play FreeCell' },
  { href: '/spider/how-to-play', label: 'How to Play Spider' },
  { href: '/freecell-for-beginners', label: 'FreeCell for Beginners' },
  { href: '/strategy', label: 'FreeCell Strategy' },
  { href: '/spider/strategy', label: 'Spider Strategy' },
  { href: '/freecell-vs-klondike', label: 'FreeCell vs Klondike' },
  { href: '/freecell-vs-spider', label: 'FreeCell vs Spider' },
  { href: '/solitaire-types', label: 'All Solitaire Types' },
];

export default function SolitaireHubHome() {
  // Override the global overflow:hidden on html/body so the page can scroll
  // past the game to reach SEO content below. Cleanup restores original behavior.
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: absoluteUrl('/'),
    description: siteConfig.defaultDescription,
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured solitaire games',
    itemListElement: featuredGames.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: game.label,
      url: absoluteUrl(game.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Game above the fold — mirrors competitor pattern.
          The wrapper clips GameShell (which is h-dvh internally) so
          the page body scroll can reach the SEO content below. */}
      <div className="h-dvh overflow-hidden relative">
        <GameErrorBoundary>
          <GameShell />
        </GameErrorBoundary>
      </div>

      {/* SEO content below the fold */}
      <div className="felt-bg relative z-10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play Solitaire Online for Free
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-white/70">
            Solitaire Stack is a growing collection of free solitaire games you can play right in
            your browser. Start with FreeCell above, or pick another game below. No download, no
            signup, no ads during gameplay.
          </p>

          {/* Game cards */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-[#d4af37] sm:text-2xl">More Games</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featuredGames.map((game) => (
                <Link
                  key={game.label}
                  href={game.href}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-[#d4af37]/30 hover:bg-white/[0.07]"
                >
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f5df97]">
                    {game.label}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/60">{game.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Learn & strategy links */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-[#d4af37] sm:text-2xl">
              Guides &amp; Strategy
            </h2>
            <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
              {learnLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          {/* About blurb for SEO */}
          <section className="mt-12 rounded-xl border border-white/8 bg-white/[0.03] p-6">
            <h2 className="text-lg font-bold text-white">About Solitaire Stack</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Solitaire Stack brings together FreeCell, Spider Solitaire, Baker&apos;s Game, Eight
              Off, and more under one roof. Every game is free, runs in your browser, and tracks your
              stats locally. We also publish strategy guides, rules explainers, and comparison articles
              to help you improve. Whether you&apos;re a beginner or chasing a win streak, there&apos;s
              something here for you.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
