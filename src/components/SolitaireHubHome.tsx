'use client';

import { useEffect, useRef } from 'react';
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
    description: 'All 52 cards visible from the start. Pure skill, numbered deals, hints, undo, and full stat tracking.',
  },
  {
    href: '/spider',
    label: 'Spider Solitaire',
    description: 'Choose 1-suit, 2-suit, or 4-suit difficulty. Two decks, ten columns, and a deeper challenge curve.',
  },
  {
    href: '/bakers-game',
    label: "Baker's Game",
    description: "FreeCell's stricter ancestor. Build tableau columns by suit instead of alternating colors.",
  },
  {
    href: '/eight-off',
    label: 'Eight Off',
    description: 'Eight reserve cells instead of four. More storage, different tactics, same open-information style.',
  },
  {
    href: '/easy-freecell',
    label: 'Easy FreeCell',
    description: 'Aces and 2s start on the foundations. A gentler on-ramp for beginners learning FreeCell strategy.',
  },
];

const faqItems = [
  {
    q: 'Is Solitaire Stack really free?',
    a: 'Yes. Every game on Solitaire Stack is free to play in your browser with no download, no signup, and no paywall. We keep the lights on with non-intrusive ads that never appear during active gameplay.',
  },
  {
    q: 'What is the difference between FreeCell and regular Solitaire?',
    a: 'Classic Solitaire (Klondike) deals cards face-down, so luck plays a big role. FreeCell deals all 52 cards face-up, which means every game is a pure logic puzzle. About 99.999% of FreeCell deals are solvable with the right strategy.',
  },
  {
    q: 'How many FreeCell deals are there?',
    a: 'The standard Microsoft numbering system covers deals 1 through 1,000,000. Of those, only one deal — #11982 — has been proven unsolvable. Every other numbered deal can be won with perfect play.',
  },
  {
    q: 'What is Spider Solitaire?',
    a: 'Spider Solitaire uses two decks (104 cards) dealt across ten tableau columns. The goal is to build complete runs of 13 cards in the same suit from King down to Ace. It comes in three difficulty levels: 1-suit (beginner), 2-suit (intermediate), and 4-suit (expert).',
  },
  {
    q: 'Do you save my progress?',
    a: 'Yes. Your game statistics, win streaks, achievements, and settings are saved in your browser automatically. No account needed. Your data stays on your device and is never sent to a server.',
  },
  {
    q: 'Can I play on my phone?',
    a: 'Yes. All games on Solitaire Stack are fully responsive and work on phones and tablets. The interface adapts to touch input with tap-to-move and drag-and-drop support.',
  },
  {
    q: "What is Baker's Game?",
    a: "Baker's Game is the historical ancestor of FreeCell. The rules are nearly identical, with one key difference: tableau columns must be built by suit (spades on spades) instead of alternating colors. This single change makes the game significantly harder.",
  },
  {
    q: 'How do hints work?',
    a: 'Press H or tap the lightbulb icon during any game to get a move suggestion. The hint system analyzes the current board state and highlights the best available move. You can use hints as many times as you want — they are free and unlimited.',
  },
];

export default function SolitaireHubHome() {
  const gameWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Override global overflow:hidden so the page can scroll past the game
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';

    // Intercept wheel events on the game wrapper: if user scrolls down
    // while at the bottom of the game area, let the page scroll instead
    const wrapper = gameWrapperRef.current;
    const handleWheel = (e: WheelEvent) => {
      // Always allow page-level scrolling — don't let the game canvas trap it
      if (e.deltaY > 0) {
        // Scrolling down — let it bubble to the page
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      } else if (window.scrollY > 0) {
        // Scrolling up while page is scrolled — scroll the page back up
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
      if (wrapper) {
        wrapper.removeEventListener('wheel', handleWheel);
      }
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Game above the fold */}
      <div ref={gameWrapperRef} className="h-dvh overflow-hidden relative">
        <GameErrorBoundary>
          <GameShell />
        </GameErrorBoundary>
      </div>

      {/* SEO content below the fold */}
      <div className="felt-bg relative z-10">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* ── Intro + personal story ── */}
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play Solitaire Online for Free
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-white/70">
            <p>
              Solitaire Stack is a growing collection of free solitaire card games you can play
              right in your browser. Start with FreeCell above — every card is visible from the
              first deal, so every game is a fair puzzle you can solve with the right moves.
            </p>
            <p>
              We built this because the best solitaire sites are either buried in ads or stuck in
              2005. Solitaire Stack is fast, clean, and works on any device. All your stats, streaks,
              and achievements save automatically in your browser — no account required.
            </p>
            <p>
              Beyond FreeCell, you can play <Link href="/spider" className="text-[#d4af37] hover:text-[#f5df97]">Spider Solitaire</Link> in
              three difficulty levels, <Link href="/bakers-game" className="text-[#d4af37] hover:text-[#f5df97]">Baker&apos;s Game</Link> for
              a stricter challenge, and <Link href="/eight-off" className="text-[#d4af37] hover:text-[#f5df97]">Eight Off</Link> for
              a different tactical feel. More games are on the way.
            </p>
            <p>
              Whether you&apos;re killing five minutes or chasing a personal best, there&apos;s
              something here for you. More than{' '}
              <Link href="/solitaire-types" className="text-[#d4af37] hover:text-[#f5df97]">20 solitaire variants</Link>{' '}
              are documented in our catalog, with new playable games and{' '}
              <Link href="/strategy" className="text-[#d4af37] hover:text-[#f5df97]">strategy guides</Link>{' '}
              shipping regularly.
            </p>
          </div>

          {/* ── Featured games ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Games You Can Play Right Now
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredGames.map((game) => (
                <Link
                  key={game.label}
                  href={game.href}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#d4af37]/30 hover:bg-white/[0.07]"
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f5df97]">
                    {game.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{game.description}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[#d4af37] group-hover:text-white">
                    Play now &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── How to play (condensed) ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Play FreeCell
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/65">
              <p>
                FreeCell is a solitaire card game played with a single 52-card deck. All cards are
                dealt face-up into eight tableau columns, so you can see everything from the start.
                Your goal is to move all 52 cards to four foundation piles, one per suit, building
                each from Ace up to King.
              </p>
              <p>
                You have four free cells (top-left) that act as temporary storage — each holds one
                card at a time. On the tableau, you build columns in descending order with alternating
                colors (a black 6 goes on a red 7). Only the top card of each column is movable,
                though you can move sequences of cards if enough free cells and empty columns are
                available to support the move.
              </p>
              <p>
                The key strategic principles: keep free cells open as long as possible, build long
                descending sequences before moving to foundations, and plan several moves ahead.
                Empty columns are extremely valuable — treat them like extra free cells.
              </p>
              <p>
                For a complete walkthrough with illustrations, see our{' '}
                <Link href="/how-to-play" className="text-[#d4af37] hover:text-[#f5df97]">full FreeCell rules guide</Link>.
                New to the game? Start with our{' '}
                <Link href="/freecell-for-beginners" className="text-[#d4af37] hover:text-[#f5df97]">beginner&apos;s guide</Link>{' '}
                or try an{' '}
                <Link href="/easy-freecell-games" className="text-[#d4af37] hover:text-[#f5df97]">easy deal</Link>{' '}
                to build confidence.
              </p>
            </div>
          </section>

          {/* ── Features ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Features
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Unlimited Undo & Redo', desc: 'Step backward and forward through your entire move history. Experiment freely.' },
                { title: 'Smart Hints', desc: 'Press H anytime for an AI-suggested move. Learn why certain plays are stronger.' },
                { title: 'Numbered Deals', desc: 'Every game has a number. Share it with friends and compare strategies on the same layout.' },
                { title: 'Daily Challenge', desc: 'A new deal every day, the same for all players. Compete on the global leaderboard.' },
                { title: 'Streak Tracking', desc: 'Track consecutive wins across sessions. How high can you go?' },
                { title: 'Full Statistics', desc: 'Win rate, average time, move counts, and more — all tracked locally and privately.' },
                { title: 'Achievements', desc: 'Unlock milestones for speed, streaks, and skill. 20+ achievements to earn.' },
                { title: 'Ghost Mode', desc: 'Watch the solver play your current deal. Study optimal play in real time.' },
                { title: 'Works Everywhere', desc: 'Desktop, tablet, phone. Touch or mouse. No download needed.' },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/55">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  <summary className="cursor-pointer px-5 py-4 text-base font-semibold text-white hover:text-[#f5df97] [&::-webkit-details-marker]:hidden list-none">
                    <span className="flex items-center justify-between">
                      {item.q}
                      <span className="ml-3 text-white/40 transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-7 text-white/60">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Guides & Strategy links ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Guides &amp; Strategy
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Deep-dive articles to help you win more games and understand how solitaire works.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: '/how-to-play', title: 'How to Play FreeCell', desc: 'Complete rules, card mechanics, and step-by-step setup guide.' },
                { href: '/strategy', title: 'FreeCell Strategy', desc: 'Advanced tactics: column management, free cell discipline, and move sequencing.' },
                { href: '/freecell-for-beginners', title: 'FreeCell for Beginners', desc: 'A gentler introduction for first-time players.' },
                { href: '/spider/how-to-play', title: 'How to Play Spider', desc: 'Rules for 1-suit, 2-suit, and 4-suit Spider Solitaire.' },
                { href: '/spider/strategy', title: 'Spider Strategy', desc: 'Stock management, column building, and suit completion tactics.' },
                { href: '/tips', title: '25 Quick Tips', desc: 'Bite-sized advice to improve your win rate immediately.' },
                { href: '/freecell-vs-klondike', title: 'FreeCell vs Klondike', desc: 'How these two solitaire classics differ in rules, luck, and skill.' },
                { href: '/freecell-vs-spider', title: 'FreeCell vs Spider', desc: 'Comparing difficulty, strategy, and why players prefer one over the other.' },
                { href: '/spider/1-suit-vs-2-suit-vs-4-suit', title: 'Spider Difficulty Levels', desc: 'Which Spider variant should you play? A breakdown by difficulty.' },
                { href: '/freecell-hints-explained', title: 'Hints Explained', desc: 'How the hint system works and how to use it to learn, not lean on it.' },
                { href: '/is-every-freecell-game-winnable', title: 'Is Every Deal Winnable?', desc: 'The story of Deal #11982 and what we know about solvability.' },
                { href: '/solitaire-types', title: 'All Solitaire Types', desc: 'A catalog of 20+ solitaire variants with rules and history.' },
                { href: '/glossary', title: 'Solitaire Glossary', desc: 'Definitions for tableau, foundation, stock, cascade, and more.' },
                { href: '/history', title: 'History of FreeCell', desc: 'From Paul Alfille to Microsoft Windows to the modern web.' },
                { href: '/freecell-world-records', title: 'World Records', desc: 'The fastest times, longest streaks, and competitive FreeCell milestones.' },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#d4af37]/25 hover:bg-white/[0.06]"
                >
                  <h3 className="font-bold text-white group-hover:text-[#f5df97]">{card.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/50">{card.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── About ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              About Solitaire Stack
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/60">
              <p>
                Solitaire Stack is an independent project built because we wanted a better place to
                play solitaire online. No bloat, no pop-ups, no account walls — just well-made card
                games that run fast in your browser.
              </p>
              <p>
                The site currently features four playable games — FreeCell, Spider Solitaire,
                Baker&apos;s Game, and Eight Off — with more on the way. Each game includes hints,
                unlimited undo, numbered deals for replay, and automatic stat tracking that stores
                everything locally on your device.
              </p>
              <p>
                We also publish a growing library of strategy guides, comparison articles, and
                explainer pages to help players of all levels. From{' '}
                <Link href="/freecell-for-beginners" className="text-[#d4af37] hover:text-[#f5df97]">absolute beginners</Link>{' '}
                learning the rules to experienced players studying{' '}
                <Link href="/hard-freecell-games" className="text-[#d4af37] hover:text-[#f5df97]">difficult deals</Link>,
                there&apos;s content here for every skill level.
              </p>
              <p>
                Solitaire Stack is part of a network that includes{' '}
                <strong className="text-white/80">playfreecellonline.com</strong> for dedicated
                FreeCell players, with more specialist domains launching as the game catalog grows.
                Learn more on our{' '}
                <Link href="/about" className="text-[#d4af37] hover:text-[#f5df97]">about page</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
