import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'FreeCell Rules — Quick Reference Guide',
  description:
    'Concise FreeCell rules reference: game setup, legal moves, the supermove formula, win conditions, and quick FAQ. Everything you need on one page.',
  keywords: [
    'freecell rules',
    'freecell card game rules',
    'freecell solitaire rules',
    'freecell move rules',
    'freecell supermove rule',
    'freecell game rules quick reference',
    'how does freecell work',
    'freecell legal moves',
  ],
  openGraph: {
    title: 'FreeCell Rules — Quick Reference Guide',
    description:
      'A compact reference for FreeCell Solitaire rules. Game setup, legal moves, the supermove formula, and win conditions — all on one page.',
    url: absoluteUrl('/freecell-rules'),
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
    question: 'How many cards can I move at once in FreeCell?',
    answer:
      'The number of cards you can move as a group depends on your empty spaces. The formula is (1 + empty free cells) \u00d7 2^(empty cascades). With all four free cells empty and one empty cascade, you can move up to 10 cards at once. This is called a supermove.',
  },
  {
    question: 'Can I move a King to an empty cascade?',
    answer:
      'Yes. Any card or properly ordered sequence can be placed in an empty cascade, including Kings. However, once a King occupies an empty cascade, only a Queen of the opposite color can be placed on top of it. Use empty cascades for Kings strategically.',
  },
  {
    question: 'Is FreeCell different from Klondike Solitaire?',
    answer:
      'Yes, significantly. In FreeCell, all 52 cards are dealt face-up from the start, making it a game of pure strategy with no hidden information. Klondike has face-down cards and a draw pile, introducing a luck element. FreeCell also has four temporary storage cells (free cells) instead of a stock pile.',
  },
  {
    question: 'Do I have to move Aces to the foundation immediately?',
    answer:
      'You are never forced to move any card, but you should always move Aces and Twos to the foundations as soon as they are available. There is no strategic reason to keep an Ace in the tableau since no card can be placed on top of an Ace in a cascade.',
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

export default function FreecellRulesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Rules — Quick Reference Guide',
      description:
        'A compact reference covering FreeCell Solitaire game setup, legal moves, the supermove formula, and win conditions.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-12',
      dateModified: '2026-03-12',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-rules'),
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
          name: 'FreeCell Rules',
          item: absoluteUrl('/freecell-rules'),
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
                Quick Reference
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                FreeCell Rules
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Everything you need to know about FreeCell Solitaire in one concise reference.
                No fluff, no lengthy tutorial &mdash; just the rules. Looking for a full
                walkthrough? See our{' '}
                <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
                  How to Play guide
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Game Setup */}
        <section id="setup" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="The Deal" id="setup-heading">Game Setup</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                FreeCell uses a single standard 52-card deck. All cards are dealt face-up into
                eight columns (called cascades). The first four cascades receive 7 cards each
                and the last four receive 6 cards each. There are no hidden cards and no stock
                pile.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-white">4</div>
                  <div className="text-sm text-white/50 mt-1">Free Cells</div>
                  <p className="text-xs text-white/40 mt-2">Temporary storage. Each holds exactly one card.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-white">4</div>
                  <div className="text-sm text-white/50 mt-1">Foundations</div>
                  <p className="text-xs text-white/40 mt-2">Goal piles. Build each suit A through K.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-white">8</div>
                  <div className="text-sm text-white/50 mt-1">Cascades</div>
                  <p className="text-xs text-white/40 mt-2">The main play area. All 52 cards start here.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Legal Moves */}
        <section id="legal-moves" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="What Goes Where" id="legal-moves-heading">Legal Moves</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5">
              <div className="space-y-4">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Cascade to Cascade</h3>
                  <p className="text-white/70 text-sm leading-7">
                    Move a card onto another card that is <strong className="text-white">one rank higher</strong> and
                    the <strong className="text-white">opposite color</strong>. A black 7 goes on a red 8. A red
                    Queen goes on a black King. Any card or valid sequence can be placed on an empty cascade.
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Cascade to Foundation</h3>
                  <p className="text-white/70 text-sm leading-7">
                    Move a card to the foundation that matches its <strong className="text-white">suit</strong> and
                    is <strong className="text-white">one rank higher</strong> than the current top card. Aces start
                    each foundation pile. Build upward: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Cascade to Free Cell</h3>
                  <p className="text-white/70 text-sm leading-7">
                    Move any single card from the bottom of a cascade to an empty free cell. Each free cell
                    holds exactly one card. You can move a card from a free cell back to a cascade or to a
                    foundation at any time, following normal placement rules.
                  </p>
                </div>

                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Free Cell to Cascade or Foundation</h3>
                  <p className="text-white/70 text-sm leading-7">
                    A card in a free cell can be moved to a cascade (following the alternating-color,
                    descending-rank rule) or to a foundation (following the same-suit, ascending-rank rule)
                    at any time. Cards in free cells are always available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Supermove */}
        <section id="supermove" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Moving Multiple Cards" id="supermove-heading">The Supermove Rule</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                Strictly, FreeCell only allows moving one card at a time. However, digital
                implementations allow you to move an entire properly-ordered sequence in a
                single action. This is called a <strong className="text-white">supermove</strong>.
                The game calculates whether the move could be accomplished one card at a time
                using empty free cells and empty cascades as temporary storage.
              </p>

              <div className="bg-[#072907] rounded-xl p-6 text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-4">
                  Maximum Cards You Can Move
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-4">
                  (1 + empty free cells) &times; 2<sup>empty cascades</sup>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-6">
                  <div className="bg-white/[0.05] rounded-lg p-3">
                    <div className="text-lg font-bold text-white">5</div>
                    <div className="text-white/50 text-xs">4 free cells, 0 empty cols</div>
                  </div>
                  <div className="bg-white/[0.05] rounded-lg p-3">
                    <div className="text-lg font-bold text-white">10</div>
                    <div className="text-white/50 text-xs">4 free cells, 1 empty col</div>
                  </div>
                  <div className="bg-white/[0.05] rounded-lg p-3">
                    <div className="text-lg font-bold text-white">8</div>
                    <div className="text-white/50 text-xs">3 free cells, 1 empty col</div>
                  </div>
                  <div className="bg-white/[0.05] rounded-lg p-3">
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-white/50 text-xs">2 free cells, 2 empty cols</div>
                  </div>
                </div>
              </div>

              <p>
                Empty cascades are exponentially more valuable than empty free cells because
                they double the supermove capacity. This is why experienced players prioritize
                creating empty cascades over keeping free cells available.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Win Condition */}
        <section id="win-condition" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Objective" id="win-condition-heading">Win Condition</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                You win when all 52 cards are moved to the four foundation piles, each built
                from Ace to King in a single suit. Most digital versions trigger an
                auto-complete once every remaining card in the tableau is in proper descending
                order, finishing the game for you.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Solvability</h3>
                <p className="text-sm leading-7">
                  Approximately 99.999% of FreeCell deals are solvable with perfect play. Out of the
                  original 32,000 Microsoft deals, only{' '}
                  <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                    deal #11982
                  </Link>{' '}
                  has been proven unsolvable. There is no time limit and no penalty for using undo.
                  If you lose, it is almost always because of a strategic misstep, not the deal itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary Table */}
        <section id="summary" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="At a Glance" id="summary-heading">Rules Summary</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Rule</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Deck</td>
                      <td className="py-3 px-4">Standard 52-card deck, all dealt face-up</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Cascade stacking</td>
                      <td className="py-3 px-4">Descending rank, alternating colors</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Foundation building</td>
                      <td className="py-3 px-4">Ascending rank, same suit (A to K)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Free cells</td>
                      <td className="py-3 px-4">4 cells, each holds 1 card</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Empty cascades</td>
                      <td className="py-3 px-4">Any card or valid sequence can be placed</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Supermove limit</td>
                      <td className="py-3 px-4">(1 + free cells) &times; 2^(empty cascades)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/70 font-medium">Win condition</td>
                      <td className="py-3 px-4">All 52 cards on foundations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Common Questions" id="faq-heading">FreeCell Rules FAQ</SectionHeading>
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

        {/* Related Pages */}
        <section id="related" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Learn More">Related Guides</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-3">
              <Link href="/how-to-play" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">How to Play FreeCell</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Full tutorial with diagrams, step-by-step walkthrough, and beginner tips.
                </p>
              </Link>
              <Link href="/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Beginner to expert tactics for improving your FreeCell win rate.
                </p>
              </Link>
              <Link href="/freecell-cheat-sheet" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Cheat Sheet</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Move priorities, keyboard shortcuts, and what to avoid on one page.
                </p>
              </Link>
              <Link href="/glossary" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Glossary</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Definitions for every FreeCell term, from cascade to supermove.
                </p>
              </Link>
              <Link href="/" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Play FreeCell</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Play online for free with undo, hints, and thousands of deals.
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
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                Ready to Play?
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                You know the rules. Put them into practice with a free game of FreeCell.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Full Tutorial
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
