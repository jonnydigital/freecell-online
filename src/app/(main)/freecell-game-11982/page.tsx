import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'FreeCell Game #11982 — The Only Proven Unsolvable Deal',
  description:
    'Deal #11982 is the most famous unsolvable FreeCell game in history. Learn why it cannot be won, how it was discovered, and why thousands of players still try it anyway.',
  keywords: [
    'freecell 11982',
    'freecell game 11982',
    'unsolvable freecell',
    'impossible freecell deal',
    'freecell deal 11982',
    'microsoft freecell 11982',
    'freecell unsolvable deals',
    'hardest freecell game',
  ],
  openGraph: {
    title: 'FreeCell Game #11982 — The Only Proven Unsolvable Deal',
    description:
      'The definitive guide to FreeCell deal #11982: the one game out of 32,000 that no human or computer has ever solved. Its history, its proof, and why players keep trying.',
    url: absoluteUrl('/freecell-game-11982'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const CARD = 'rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden';

const faqs = [
  {
    question: 'Has anyone ever solved FreeCell deal #11982?',
    answer:
      'No. Deal #11982 has been proven unsolvable through exhaustive computer search. Every possible sequence of legal moves has been tested and none leads to a completed game. It is not a matter of skill or patience — the deal simply has no winning path.',
  },
  {
    question: 'How many FreeCell deals are unsolvable?',
    answer:
      'In the original Microsoft FreeCell set of 32,000 deals, only one — #11982 — is proven unsolvable. When researchers extended the analysis to one million deals, they found eight unsolvable games. That means roughly 99.999% of all FreeCell deals can be won with perfect play.',
  },
  {
    question: 'Why is FreeCell deal #11982 so famous?',
    answer:
      'It is famous because it is the lone exception in a game built on near-perfect solvability. Microsoft FreeCell shipped with 32,000 numbered deals, and for years players assumed every one was winnable. Deal #11982 became legendary as the community gradually confirmed it was the only one that could not be beaten.',
  },
  {
    question: 'Can I still play deal #11982 even though it is unsolvable?',
    answer:
      'Absolutely. Many players treat it as a rite of passage — a chance to see an impossible position firsthand and understand what makes it different from merely difficult deals. You can play it right now at /game/11982.',
  },
];

function SectionHeading({
  children,
  id,
  sub,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
}) {
  return (
    <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-white scroll-mt-6"
      >
        {children}
      </h2>
      <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
    </div>
  );
}

export default function FreecellGame11982Page() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Game #11982 — The Only Proven Unsolvable Deal',
      description:
        'The definitive guide to FreeCell deal #11982: how it was discovered, why it cannot be solved, and why it remains the most famous deal in FreeCell history.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-11',
      dateModified: '2026-03-11',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-game-11982'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
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
          name: 'FreeCell Game #11982',
          item: absoluteUrl('/freecell-game-11982'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <section>
          <div className={CARD}>
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                The Impossible Deal
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                FreeCell Game #11982
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Out of 32,000 numbered deals shipped with Microsoft FreeCell, exactly one cannot be
                won. Deal #11982 is the most famous hand in solitaire history &mdash; a puzzle that
                has defeated every human player, every algorithm, and every brute-force search ever
                thrown at it. It is the game that proved FreeCell is not quite perfect.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    What you need to know
                  </div>
                  <p className="text-white leading-7">
                    <strong>Deal #11982 is mathematically unsolvable.</strong> This is not a matter
                    of skill or strategy. Every possible sequence of legal moves has been exhaustively
                    tested by computer. None of them leads to a completed game. It is the only deal
                    in the original Microsoft set with this distinction.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    By the numbers
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li><strong className="text-white">32,000</strong> deals in the original Microsoft set</li>
                    <li><strong className="text-white">1</strong> proven unsolvable (#11982)</li>
                    <li><strong className="text-white">99.997%</strong> win rate with perfect play</li>
                    <li><strong className="text-white">8</strong> unsolvable deals in the first million</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section id="why-it-matters" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading id="why-it-matters-heading" sub="Context">Why Deal #11982 Matters</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                FreeCell is one of the most solvable card games ever designed. Because all 52 cards
                are visible from the first move, there is no hidden information and no draw-pile
                luck. Skilled players win well over 99% of their games. That near-perfect solvability
                is what makes the game so satisfying &mdash; and it is exactly why deal #11982 matters.
              </p>
              <p>
                If every deal were winnable, FreeCell would be a solved game in the trivial sense.
                Deal #11982 proves that it is not. Even in a game with complete information and
                generous mechanics, the initial card arrangement can create a position where no
                sequence of legal moves reaches the goal. That single exception transforms FreeCell
                from a puzzle with a guaranteed solution into a genuine challenge with real stakes.
              </p>
              <p>
                For the community, #11982 became a cultural touchstone. It is the deal people
                mention when debating solvability. It is the benchmark for solver software. And it is
                the reason every FreeCell player eventually asks the question:{' '}
                <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                  is every FreeCell game winnable?
                </Link>
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* The History */}
        <section id="history" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading id="history-heading" sub="How It Was Found">The History of Deal #11982</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Microsoft FreeCell debuted as part of the Win32 SDK in 1991 and became a standard
                inclusion in Windows starting with Windows 95. The game shipped with 32,000 numbered
                deals, each generated by a simple linear congruential random number generator seeded
                with the deal number. Players could pick any number between 1 and 32,000 and always
                get the same layout &mdash; a feature that turned FreeCell into a shared puzzle.
              </p>
              <p>
                As the internet grew in the mid-1990s, FreeCell enthusiasts began systematically
                working through every deal. Online communities tracked which numbers had been solved
                and which remained open. One by one the holdouts fell &mdash; until only deal #11982
                remained. No one could crack it.
              </p>
              <p>
                The question shifted from &quot;can a human solve it?&quot; to &quot;can any computer
                solve it?&quot; Researchers wrote solvers that explored the full game tree, testing
                every legal move sequence from the starting position. The result was conclusive: deal
                #11982 has no solution. Every branch of the search tree terminates in a dead end.
                The proof was not a conjecture or a statistical estimate &mdash; it was an exhaustive
                enumeration.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">The Internet FreeCell Project</h3>
                <p className="text-sm leading-7">
                  The most famous effort was the &quot;Internet FreeCell Project,&quot; a distributed
                  collaboration where players reported results for each deal number. By the late
                  1990s, the project had confirmed solutions for 31,999 of the 32,000 deals. Only
                  #11982 stood alone. When solver programs later confirmed the result algorithmically,
                  the deal&apos;s status shifted from &quot;unsolved&quot; to &quot;unsolvable.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Can You Play It? */}
        <section id="play-it" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading id="play-it-heading" sub="The Challenge">Can You Play Deal #11982?</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-5 text-white/70 leading-8">
                <p>
                  Yes &mdash; and you should. Knowing a deal is unsolvable does not remove the value
                  of playing it. In fact, deal #11982 is one of the most instructive positions in
                  FreeCell because it forces you to confront what &quot;impossible&quot; actually
                  looks like at the board level.
                </p>
                <p>
                  Most players who try it report the same experience: the deal does not feel
                  obviously broken. You can make moves. You can build partial sequences. You can
                  clear a card or two to the foundations. But every promising line eventually hits a
                  wall. The board tightens. Free cells fill. Columns lock. And then you realize there
                  is nowhere left to go.
                </p>
                <p>
                  That experience is valuable because it sharpens your instinct for the difference
                  between a genuinely dead position and a{' '}
                  <Link href="/hard-freecell-games" className="text-[#D4AF37] hover:underline">
                    hard but solvable one
                  </Link>
                  . After playing #11982, difficult deals feel different. You start to recognize the
                  subtle signs of a board that still has life in it.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Why people still try
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>To see an impossible deal firsthand</li>
                    <li>To test their own read of a dead board</li>
                    <li>To calibrate hard versus impossible</li>
                    <li>Because it is a rite of passage</li>
                  </ul>
                </div>
                <Link
                  href="/game/11982"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play Deal #11982
                </Link>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Other Unsolvable Deals */}
        <section id="other-unsolvable-deals" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading id="other-unsolvable-heading" sub="Beyond 32,000">Other Unsolvable FreeCell Deals</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Deal #11982 is the only unsolvable game in the original Microsoft set of 32,000, but
                it is not the only unsolvable FreeCell deal that exists. When researchers extended
                the same exhaustive analysis to the first one million deal numbers, they found a
                small handful of additional impossible positions.
              </p>
              <p>
                The confirmed unsolvable deals in the extended million-deal range are:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { deal: '11982', note: 'The original' },
                  { deal: '146692', note: 'Extended set' },
                  { deal: '186216', note: 'Extended set' },
                  { deal: '455889', note: 'Extended set' },
                  { deal: '495505', note: 'Extended set' },
                  { deal: '512118', note: 'Extended set' },
                  { deal: '517776', note: 'Extended set' },
                  { deal: '781948', note: 'Extended set' },
                ].map((item) => (
                  <div
                    key={item.deal}
                    className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-4 text-center"
                  >
                    <div className="text-xl font-bold text-white">#{item.deal}</div>
                    <div className="text-xs text-white/50 mt-1">{item.note}</div>
                  </div>
                ))}
              </div>
              <p>
                Eight unsolvable deals out of one million gives an insolvability rate of roughly
                0.0008%. Put another way, if you play a random FreeCell deal, there is about a one
                in 125,000 chance it literally cannot be won. Those are extraordinary odds &mdash;
                and they explain why FreeCell feels so different from games like Klondike, where
                roughly 20% of deals are unwinnable regardless of play.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What the unsolvable deals share</h3>
                <p className="text-sm leading-7">
                  There is no single obvious visual pattern that marks an unsolvable deal. They do
                  not all look the same. What they share is a structural property: no matter how you
                  sequence your moves, you cannot create enough space to unbury the cards that need
                  to reach the foundations. The blockage is deep and systemic, not just a surface-level
                  tangle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading id="faq-heading" sub="Common Questions">Deal #11982 FAQ</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <h3 className="font-medium text-white text-lg mb-2">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  {index < faqs.length - 1 && <div className="mt-6 border-b border-white/[0.07]" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section id="related-guides" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Read Next">Related FreeCell Guides</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-3">
              <Link href="/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Master free cell management, supermoves, and the board-reading skills that win 99% of deals.
                </p>
              </Link>
              <Link href="/tips" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Tips and Tricks</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Quick tactical advice you can apply during live play to avoid dead-end positions.
                </p>
              </Link>
              <Link href="/hard-freecell-games" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Hard FreeCell Games</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Learn what makes a deal difficult and how to attack narrow positions without burning space.
                </p>
              </Link>
              <Link href="/is-every-freecell-game-winnable" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Is Every Game Winnable?</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  The full answer to FreeCell&apos;s most common question, with practical advice for stuck positions.
                </p>
              </Link>
              <Link href="/winning-deals" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Winning Deals</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Browse deals with known solutions and study the move sequences that crack them open.
                </p>
              </Link>
              <Link href="/freecell-probability" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Probability &amp; Math</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  The combinatorics behind FreeCell solvability and what makes Deal #11982 mathematically unique.
                </p>
              </Link>
              <Link href="/statistics" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Statistics</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Track your win rate, streaks, and performance across different deal difficulties.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div
            className={CARD}
            style={{
              background: 'linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)',
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
              >
                Face the Impossible Deal
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                Thousands of players have tried deal #11982 knowing it cannot be won. Play it
                yourself and see what an unsolvable FreeCell board actually feels like.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/game/11982"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play Deal #11982
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Play a Random Deal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
