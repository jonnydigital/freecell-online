'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import ScrollUnlock from '@/components/ScrollUnlock';
import { absoluteUrl } from '@/lib/siteConfig';

const faqItems = [
  {
    q: 'Is every FreeCell game winnable?',
    a: 'Nearly. Of the standard 1,000,000 numbered deals, only one — Deal #11982 — has been proven unsolvable. That means 99.999% of deals can be won with perfect play. If you are stuck, it is almost certainly the strategy, not the deal.',
  },
  {
    q: 'How many FreeCell deals are there?',
    a: 'The classic Microsoft numbering covers deals 1 through 1,000,000. Our game engine supports all of them plus an extended range of over 8 billion unique deals generated from 32-bit seeds. You will never run out of new games.',
  },
  {
    q: "What's a good move count?",
    a: 'An average winning game takes roughly 80 to 120 moves. Expert players can finish many deals in under 60 moves. The theoretical minimum depends on the specific deal, but anything below 80 moves is strong play.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. Everything — your statistics, win streaks, achievements, and settings — saves automatically in your browser. No account, no email, no signup. Your data stays on your device and is never sent to a server.',
  },
  {
    q: 'Does FreeCell work on mobile?',
    a: 'Yes. The game is fully responsive and works on phones and tablets. Touch to move cards with tap-to-place or drag-and-drop. The board layout adapts to your screen size automatically.',
  },
  {
    q: 'What is the difference between FreeCell and regular Solitaire?',
    a: 'Classic Solitaire (Klondike) deals many cards face-down, so luck is a major factor. FreeCell deals all 52 cards face-up from the start, making every game a pure logic puzzle. Skill, not luck, determines whether you win.',
  },
];

const featureCards = [
  {
    title: 'Numbered Deals',
    desc: 'Every deal has a unique number. Replay any game or share it with a friend to compare strategies on the exact same layout.',
  },
  {
    title: 'Daily Challenge',
    desc: 'A fresh puzzle every day, the same for all players. Compete for your best time and track your daily streak.',
  },
  {
    title: 'Statistics & Achievements',
    desc: 'Win rate, average time, move counts, and 20+ achievements tracked locally. Watch your skill grow over time.',
  },
  {
    title: 'Hint System',
    desc: 'Press H or tap the lightbulb for a smart move suggestion. Learn why certain plays are stronger without looking up a guide.',
  },
  {
    title: 'Unlimited Undo & Redo',
    desc: 'Step backward and forward through your entire move history. Experiment freely and learn from mistakes.',
  },
  {
    title: 'Works Everywhere',
    desc: 'Desktop, tablet, or phone. Mouse or touch. No download, no install — just open the page and play.',
  },
];

const popularPages = [
  { href: '/strategy', title: 'Strategy Guide', desc: 'Advanced tactics for winning more games.' },
  { href: '/tips', title: 'Tips & Tricks', desc: '25 quick tips to improve your win rate.' },
  { href: '/how-to-play', title: 'How to Play', desc: 'Complete rules and step-by-step setup.' },
  { href: '/freecell-rules', title: 'FreeCell Rules', desc: 'Official rules reference card.' },
  { href: '/freecell-cheat-sheet', title: 'Cheat Sheet', desc: 'One-page printable strategy reference.' },
  { href: '/freecell-probability', title: 'Probability & Math', desc: 'The mathematics behind FreeCell deals.' },
  { href: '/history', title: 'History of FreeCell', desc: 'From Paul Alfille to Windows to the web.' },
  { href: '/daily-freecell', title: 'Daily Challenge', desc: 'Today\u2019s deal — same for every player.' },
  { href: '/hard-freecell-games', title: 'Hard Games', desc: 'The toughest numbered deals to test your skill.' },
  { href: '/easy-freecell-games', title: 'Easy Games', desc: 'Beginner-friendly deals to build confidence.' },
  { href: '/famous-freecell-deals', title: 'Famous Deals', desc: 'Legendary deals every player should try.' },
  { href: '/glossary', title: 'Glossary', desc: 'Definitions for tableau, cascade, foundation, and more.' },
];

const variantGames = [
  { href: '/bakers-game', title: "Baker's Game", desc: 'Build by suit instead of alternating colors.' },
  { href: '/eight-off', title: 'Eight Off', desc: 'Eight reserve cells for a different tactical feel.' },
  { href: '/easy-freecell', title: 'Easy FreeCell', desc: 'Aces start on foundations for a gentler game.' },
  { href: '/spider', title: 'Spider Solitaire', desc: 'Two decks, ten columns, three difficulty levels.' },
  { href: '/freecell/1-cell', title: '1-Cell FreeCell', desc: 'Only one free cell — an extreme challenge.' },
  { href: '/freecell/2-cell', title: '2-Cell FreeCell', desc: 'Two free cells for a harder variation.' },
  { href: '/freecell/3-cell', title: '3-Cell FreeCell', desc: 'Three free cells — tighter than standard.' },
];

export default function FreecellBelowFold() {
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

      <div className="felt-bg relative z-10" data-scroll-role="freecell-below-fold">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* ── H1 Hero ── */}
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play FreeCell Online — Free, No Download
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-white/70">
            <p>
              FreeCell is the solitaire game where skill decides every hand. All 52 cards are
              dealt face-up, so there are no hidden cards and no lucky draws — just you,
              the layout, and pure logic. Nearly every deal is winnable if you find the
              right sequence of moves.
            </p>
            <p>
              Play any of over one million numbered deals, track your statistics and win
              streaks, earn achievements, and use the built-in hint system when you get
              stuck. No account needed — your progress saves automatically in your browser.
              Works on desktop, tablet, and mobile.
            </p>
          </div>

          {/* ── Ad between hero and how-to-play ── */}
          <AdUnit className="my-8" />

          {/* ── How to Play FreeCell ── */}
          <section className="mt-12">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Play FreeCell
            </h2>
            <div className="card-panel mt-6">
              <div className="relative z-[11] px-8 sm:px-10 md:px-12 py-8">
                <ul className="space-y-3 text-sm leading-7 text-neutral-700">
                  <li>
                    <strong>Goal:</strong> Move all 52 cards to the four foundation piles, building
                    each suit from Ace up to King.
                  </li>
                  <li>
                    <strong>Cascades:</strong> Eight columns of face-up cards form the tableau.
                    Build columns downward in alternating colors (e.g., black 6 on red 7).
                  </li>
                  <li>
                    <strong>Free Cells:</strong> Four temporary storage slots in the top-left. Each
                    holds one card at a time — keep them open as long as possible.
                  </li>
                  <li>
                    <strong>Moving Groups:</strong> You can move a sequence of cards if enough empty
                    free cells and empty columns are available to support the move.
                  </li>
                  <li>
                    <strong>Winning Tip:</strong> Empty columns are extremely valuable. Prioritize
                    uncovering Aces and low cards early, and plan several moves ahead.
                  </li>
                </ul>
                <p className="mt-5 text-sm text-neutral-500">
                  Want the full walkthrough?{' '}
                  <Link href="/how-to-play" className="font-semibold text-[#8B6914] hover:text-[#D4AF37]">
                    Read the complete FreeCell guide &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* ── Why Play Here? ── */}
          <section className="mt-16">
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

          {/* ── FAQ ── */}
          <section className="mt-16" itemScope itemType="https://schema.org/FAQPage">
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

          {/* ── Ad between FAQ and variants ── */}
          <AdUnit className="my-8" />

          {/* ── Variant Games ── */}
          <section className="mt-12">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              FreeCell Variants &amp; Related Games
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Ready for a different challenge? Try these variations on the classic FreeCell formula.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {variantGames.map((game) => (
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
          </section>
        </div>
      </div>
    </>
  );
}
