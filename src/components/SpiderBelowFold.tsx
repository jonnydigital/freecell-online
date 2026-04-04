'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import ScrollUnlock from '@/components/ScrollUnlock';
import { absoluteUrl } from '@/lib/siteConfig';
import StarRatingWidget from '@/components/StarRatingWidget';
import PlayerTestimonials from '@/components/PlayerTestimonials';

const faqItems = [
  {
    q: 'What is the difference between 1-suit, 2-suit, and 4-suit Spider?',
    a: '1-suit Spider uses only Spades, making it the easiest version — you never have to worry about matching suits. 2-suit Spider uses Spades and Hearts, adding moderate complexity. 4-suit Spider uses all four suits and is extremely challenging, with win rates below 10% for most players. Each level uses two full decks (104 cards).',
  },
  {
    q: 'What percentage of Spider Solitaire games are winnable?',
    a: 'For 1-suit Spider, nearly all deals are winnable with perfect play — estimates range from 98–99%. For 2-suit Spider, roughly 20–30% of deals can be solved. For 4-suit Spider, the win rate drops to around 5–10% even for experienced players. The key is building complete same-suit sequences from King down to Ace.',
  },
  {
    q: 'How is Spider Solitaire different from regular Solitaire?',
    a: 'Spider uses two decks (104 cards) instead of one, has ten tableau columns instead of seven, and has no foundation piles visible on the board. You remove completed King-to-Ace sequences of the same suit automatically. There is also no stock-to-waste flipping — instead, you deal ten new cards (one per column) from the stock when you are stuck.',
  },
  {
    q: 'How do suits work in Spider Solitaire?',
    a: 'You can stack any card on a card one rank higher regardless of suit, but only same-suit sequences can be moved as a group. A complete run of King through Ace in one suit is automatically removed from the board. The goal is to build and remove all eight same-suit sequences.',
  },
  {
    q: 'Does Spider Solitaire work on mobile?',
    a: 'Yes. The game adapts to any screen size with touch-optimized controls. Tap a card to auto-move it, or drag and drop for manual placement. Ten-column layouts compress smartly on smaller screens so every card remains visible and playable.',
  },
  {
    q: 'Do I need an account to play?',
    a: 'No. All your statistics, streaks, settings, and game progress save automatically in your browser. No registration, no email, no personal data collected. Pick up where you left off any time — your data stays on your device.',
  },
];

const featureCards = [
  {
    title: '3 Difficulty Levels',
    desc: 'Choose 1-suit (easy), 2-suit (medium), or 4-suit (expert). Separate statistics tracked for each level.',
  },
  {
    title: 'Daily Challenge',
    desc: 'A fresh Spider deal every day, the same for all players. Race for the best time and grow your daily streak.',
  },
  {
    title: 'Unlimited Undo',
    desc: 'Rewind through your entire move history to test different paths. Experiment without consequence.',
  },
  {
    title: 'Smart Hints',
    desc: 'Tap the lightbulb when you are stuck. The hint engine suggests the strongest available move to keep your game alive.',
  },
  {
    title: 'Detailed Statistics',
    desc: 'Win rate, average time, move counts, and streaks tracked per difficulty level. Watch your progress over weeks and months.',
  },
  {
    title: 'Works Everywhere',
    desc: 'Desktop, tablet, or phone — no app to install. Open the browser and start playing immediately.',
  },
];

const popularPages = [
  { href: '/spider/how-to-play', title: 'How to Play Spider', desc: 'Full rules, setup, and step-by-step walkthrough.' },
  { href: '/spider/tips', title: 'Tips & Tricks', desc: 'Practical tips to boost your Spider win rate.' },
  { href: '/spider/strategy', title: 'Strategy Guide', desc: 'Advanced Spider tactics and sequencing moves.' },
  { href: '/spider/1-suit-vs-2-suit-vs-4-suit', title: '1-Suit vs 2-Suit vs 4-Suit', desc: 'Which difficulty is right for you?' },
  { href: '/spider/is-spider-solitaire-winnable', title: 'Is Spider Winnable?', desc: 'The math behind Spider deal solvability.' },
  { href: '/blog/spider-solitaire-difficulty-guide', title: 'Difficulty Deep-Dive', desc: 'A detailed look at what makes each level harder.' },
  { href: '/blog/best-free-solitaire-games-online', title: 'Best Free Solitaire Games', desc: 'Our picks for the top solitaire games online.' },
];

const relatedGames = [
  { href: '/freecell', title: 'FreeCell', desc: 'All cards face-up — pure strategy, every deal solvable.' },
  { href: '/klondike', title: 'Klondike Solitaire', desc: 'The classic solitaire game with Draw 1 and Draw 3 modes.' },
  { href: '/bakers-game', title: "Baker's Game", desc: 'Build by suit in this FreeCell relative.' },
  { href: '/eight-off', title: 'Eight Off', desc: 'Eight reserve cells for a tactical open-information game.' },
  { href: '/easy-freecell', title: 'Easy FreeCell', desc: 'A gentler FreeCell variant with Aces pre-placed.' },
  { href: '/games', title: 'All Solitaire Games', desc: 'Browse 25+ solitaire variants in one place.' },
];

export default function SpiderBelowFold() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <ScrollUnlock />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="felt-bg relative z-10" data-scroll-role="spider-below-fold">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* ── H1 Hero ── */}
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play Spider Solitaire Online — Free, No Download
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-white/70">
            <p>
              Spider Solitaire is the two-deck card game that rewards patience, planning,
              and long-range thinking. Arrange 104 cards across ten columns, build complete
              King-to-Ace sequences in the same suit, and clear the entire board. With three
              difficulty levels — 1-suit, 2-suit, and 4-suit — there is a challenge for
              every skill level.
            </p>
            <p>
              Play as many games as you want with no signup and no fees. Your statistics,
              streaks, and preferences save automatically in your browser. Use hints when
              you get stuck, undo freely to test ideas, and tackle the daily challenge to
              measure yourself against other players worldwide.
            </p>
          </div>

          {/* ── Star Rating ── */}
          <div className="mt-6 flex justify-center">
            <StarRatingWidget storageKey="spider-star-rating-v1" baseCount={2184} baseAvg={4.7} />
          </div>

          {/* ── Ad between hero and how-to-play ── */}
          <AdUnit className="my-8" />

          {/* ── How to Play Spider ── */}
          <section className="mt-12">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Play Spider Solitaire
            </h2>
            <div className="card-panel mt-6">
              <div className="relative z-[11] px-8 sm:px-10 md:px-12 py-8">
                <ul className="space-y-3 text-sm leading-7 text-neutral-700">
                  <li>
                    <strong>Goal:</strong> Build eight complete sequences of King down to Ace
                    in the same suit. Completed sequences are removed from the board automatically.
                  </li>
                  <li>
                    <strong>Tableau:</strong> Ten columns are dealt from two shuffled decks (104
                    cards). The first four columns receive six cards each; the remaining six columns
                    receive five cards each. Only the top card of each column starts face-up.
                  </li>
                  <li>
                    <strong>Building:</strong> Stack any card on a card one rank higher, regardless
                    of suit. However, only cards in a same-suit descending run can be moved together
                    as a group.
                  </li>
                  <li>
                    <strong>Dealing:</strong> When no more moves appeal, deal a new row of ten
                    cards from the stock (one per column). All columns must contain at least one
                    card before dealing.
                  </li>
                  <li>
                    <strong>Winning Tip:</strong> Focus on building same-suit sequences whenever
                    possible. Try to empty a column to create workspace, and avoid dealing from the
                    stock until you have exhausted your options.
                  </li>
                </ul>
                <p className="mt-5 text-sm text-neutral-500">
                  Want the full walkthrough?{' '}
                  <Link href="/spider/how-to-play" className="font-semibold text-[#8B6914] hover:text-[#D4AF37]">
                    Read the complete Spider Solitaire guide &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* ── Why Play Here? ── */}
          <section className="mt-10">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Why Play Here?
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
                >
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/55">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Ad between features and popular pages ── */}
          <AdUnit className="my-8" />

          {/* ── Popular Pages ── */}
          <section className="mt-12">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Popular Pages
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#d4af37]/25 hover:bg-white/[0.06]"
                >
                  <h3 className="font-bold text-white group-hover:text-[#f5df97]">{page.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/50">{page.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Player Testimonials ── */}
          <PlayerTestimonials game="spider" />

          {/* ── FAQ ── */}
          <section className="mt-10" itemScope itemType="https://schema.org/FAQPage">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-white/10 bg-white/[0.03]"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    className="w-full cursor-pointer px-5 py-4 text-left text-base font-semibold text-white hover:text-[#f5df97]"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span className="flex items-center justify-between">
                      <span itemProp="name">{item.q}</span>
                      <span
                        className={`ml-3 text-white/40 transition-transform ${openFaq === index ? 'rotate-45' : ''}`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="grid transition-[grid-template-rows] duration-300"
                    style={{ gridTemplateRows: openFaq === index ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-4 text-sm leading-7 text-white/60">
                        <p itemProp="text">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Ad between FAQ and related games ── */}
          <AdUnit className="my-8" />

          {/* ── Related Games ── */}
          <section className="mt-10">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Related Solitaire Games
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Enjoy Spider? Try these other solitaire favorites from our collection.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGames.map((game) => (
                <Link
                  key={game.href}
                  href={game.href}
                  className="group rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#d4af37]/25 hover:bg-white/[0.06]"
                >
                  <h3 className="font-bold text-white group-hover:text-[#f5df97]">{game.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/50">{game.desc}</p>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-white/40">
              <Link href="/games" className="font-semibold text-[#8B6914] hover:text-[#D4AF37]">
                Browse all 25+ solitaire games &rarr;
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
