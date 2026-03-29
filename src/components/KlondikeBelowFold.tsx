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
    q: 'What is the difference between Draw 1 and Draw 3?',
    a: 'In Draw 1 Klondike, you flip one card at a time from the stock pile, giving you access to every card in order. In Draw 3, you flip three cards at a time and can only play the top card of each group. Draw 1 is significantly easier — roughly 80% of deals are winnable versus about 30% for Draw 3. Most beginners should start with Draw 1.',
  },
  {
    q: 'What percentage of Klondike Solitaire games are winnable?',
    a: 'Studies and computer simulations suggest around 79–82% of Draw 1 games are winnable with perfect play, while only about 30–35% of Draw 3 games can be won. In practice, experienced players win about 40–50% of Draw 1 games and 10–15% of Draw 3 games. Your win rate will improve as you learn the strategy.',
  },
  {
    q: 'How is Klondike different from FreeCell?',
    a: 'Klondike deals many cards face-down, so luck plays a role — some deals are simply unwinnable. FreeCell deals all 52 cards face-up, making it a pure logic puzzle where nearly every deal can be solved. Klondike has a stock pile for drawing cards; FreeCell uses four temporary "free cells" for storage instead.',
  },
  {
    q: 'How does scoring work in Klondike Solitaire?',
    a: 'Our scoring system awards 10 points for each card moved to a foundation pile, 5 points for revealing a face-down card, and bonus points based on completion time. A perfect game (all cards to foundations quickly) scores well over 700 points. Your best scores are tracked in your local statistics.',
  },
  {
    q: 'Does Klondike Solitaire work on my phone?',
    a: 'Yes. The game is fully responsive and touch-optimized. Tap a card to auto-move it to the best available position, or drag and drop for precise placement. The layout adapts to portrait and landscape orientations on any screen size.',
  },
  {
    q: 'Do I need to create an account to play?',
    a: 'No account required. Your statistics, win streaks, preferences, and game history are saved automatically in your browser. No email, no signup, no ads gating your progress. Your data stays on your device.',
  },
];

const featureCards = [
  {
    title: 'Draw 1 & Draw 3 Modes',
    desc: 'Switch between Draw 1 (beginner-friendly) and Draw 3 (classic challenge) at any time. Both modes track separate statistics.',
  },
  {
    title: 'Daily Challenge',
    desc: 'A new hand every day, identical for all players. Compare your time against the global leaderboard and build your streak.',
  },
  {
    title: 'Unlimited Undo',
    desc: 'Step back through your entire move history to try different approaches. Learn from mistakes without restarting the game.',
  },
  {
    title: 'Smart Hints',
    desc: 'Stuck? Tap the lightbulb for a suggested move. The hint engine highlights the strongest available play to keep you moving forward.',
  },
  {
    title: 'Statistics Dashboard',
    desc: 'Track your win rate, average time, best scores, current streak, and longest streak across both draw modes.',
  },
  {
    title: 'Works Everywhere',
    desc: 'Desktop, tablet, or phone — no download needed. Open the page and start playing instantly in any modern browser.',
  },
];

const popularPages = [
  { href: '/klondike/how-to-play', title: 'How to Play Klondike', desc: 'Complete rules, setup, and gameplay walkthrough.' },
  { href: '/klondike/tips', title: 'Tips & Tricks', desc: 'Quick tips to improve your win rate immediately.' },
  { href: '/klondike/strategy', title: 'Strategy Guide', desc: 'Advanced tactics for consistent wins.' },
  { href: '/klondike/draw-1-vs-draw-3', title: 'Draw 1 vs Draw 3', desc: 'Which mode is right for your skill level?' },
  { href: '/klondike/winning-strategies', title: 'Winning Strategies', desc: 'Proven approaches to beat tough deals.' },
  { href: '/klondike/faq', title: 'Klondike FAQ', desc: 'Answers to the most common questions.' },
  { href: '/blog/klondike-solitaire-complete-guide', title: 'Complete Klondike Guide', desc: 'Everything about Klondike in one deep-dive.' },
  { href: '/blog/best-free-solitaire-games-online', title: 'Best Free Solitaire Games', desc: 'Our picks for the top solitaire games online.' },
];

const relatedGames = [
  { href: '/freecell', title: 'FreeCell', desc: 'All cards face-up — pure skill, no luck involved.' },
  { href: '/spider', title: 'Spider Solitaire', desc: 'Two decks, ten columns, three difficulty levels.' },
  { href: '/bakers-game', title: "Baker's Game", desc: 'Build by suit in this FreeCell cousin.' },
  { href: '/pyramid', title: 'Pyramid Solitaire', desc: 'Pair cards that add up to 13 to clear the pyramid.' },
  { href: '/tripeaks', title: 'TriPeaks', desc: 'Clear three peaks by building up or down from the waste.' },
  { href: '/games', title: 'All Solitaire Games', desc: 'Browse 25+ solitaire variants in one place.' },
];

export default function KlondikeBelowFold() {
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

      <div className="felt-bg relative z-10" data-scroll-role="klondike-below-fold">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* ── H1 Hero ── */}
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play Klondike Solitaire Online — Free, No Download
          </h1>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-white/70">
            <p>
              Klondike is the classic solitaire game most people picture when they hear the
              word &ldquo;solitaire.&rdquo; Deal seven columns of cards, flip through the stock
              pile, and build four foundation piles from Ace to King. With both Draw 1 and
              Draw 3 modes, every player can find the right level of challenge.
            </p>
            <p>
              Play unlimited free games with no signup required. Track your win rate and
              streaks, use hints when you need a nudge, and undo as many moves as you like.
              Your progress saves automatically in your browser — pick up right where you
              left off on any device.
            </p>
          </div>

          {/* ── Star Rating ── */}
          <div className="mt-6 flex justify-center">
            <StarRatingWidget />
          </div>

          {/* ── Ad between hero and how-to-play ── */}
          <AdUnit className="my-8" />

          {/* ── How to Play Klondike ── */}
          <section className="mt-12">
            <h2
              className="text-2xl font-bold text-[#D4AF37] sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Play Klondike Solitaire
            </h2>
            <div className="card-panel mt-6">
              <div className="relative z-[11] px-8 sm:px-10 md:px-12 py-8">
                <ul className="space-y-3 text-sm leading-7 text-neutral-700">
                  <li>
                    <strong>Goal:</strong> Move all 52 cards to the four foundation piles, building
                    each suit from Ace up to King.
                  </li>
                  <li>
                    <strong>Tableau:</strong> Seven columns are dealt with 1–7 cards each. Only the
                    top card of each column is face-up. Build columns downward in alternating colors
                    (e.g., black 9 on red 10).
                  </li>
                  <li>
                    <strong>Stock Pile:</strong> The remaining 24 cards form the stock. Flip cards
                    from the stock to the waste pile — in Draw 1 mode one at a time, in Draw 3 mode
                    three at a time.
                  </li>
                  <li>
                    <strong>Moving Cards:</strong> Ordered sequences of alternating colors can be
                    moved between columns as a group. Only Kings can be placed in empty columns.
                  </li>
                  <li>
                    <strong>Winning Tip:</strong> Always play Aces and Twos to foundations immediately.
                    Prioritize revealing face-down cards and try to empty a column early for flexibility.
                  </li>
                </ul>
                <p className="mt-5 text-sm text-neutral-500">
                  Want the full walkthrough?{' '}
                  <Link href="/klondike/how-to-play" className="font-semibold text-[#8B6914] hover:text-[#D4AF37]">
                    Read the complete Klondike guide &rarr;
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
          <PlayerTestimonials />

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
              Love Klondike? Explore these other solitaire classics in our collection.
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
