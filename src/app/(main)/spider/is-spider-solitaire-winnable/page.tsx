import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Is Spider Solitaire Winnable? Win Rates by Suit Count',
  description:
    'Can you win every Spider Solitaire game? 1-suit is nearly always solvable, but 4-suit Spider defeats most players. See real win rates, solvability stats, and tips to win more games.',
  keywords: [
    'is spider solitaire winnable',
    'spider solitaire win rate',
    '4 suit spider solitaire solvable',
    'spider solitaire impossible',
    'can you win every spider solitaire game',
    'spider solitaire difficulty',
    '1 suit spider solitaire winnable',
  ],
  openGraph: {
    title: 'Is Spider Solitaire Winnable? Win Rates by Suit Count',
    description:
      '1-suit Spider is nearly always winnable. 4-suit Spider? Under 10% for most players. This guide breaks down solvability by variant with real numbers.',
    url: absoluteUrl('/spider/is-spider-solitaire-winnable'),
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
    question: 'Can you win every Spider Solitaire game?',
    answer:
      'No. Unlike FreeCell, where nearly every deal is solvable, many Spider Solitaire deals are mathematically impossible to win. The percentage of winnable deals depends heavily on the number of suits: 1-suit is almost always solvable, while 4-suit has a theoretical solvability rate of only about 30-40%.',
  },
  {
    question: 'What is the win rate for 4-suit Spider Solitaire?',
    answer:
      'Most players win fewer than 10% of 4-suit Spider games. Even with perfect play, researchers estimate only about 30-40% of random 4-suit deals are theoretically solvable. The combination of hidden cards, four suits, and stock pile draws creates too many unsolvable configurations.',
  },
  {
    question: 'Is 1-suit Spider Solitaire always winnable?',
    answer:
      'Nearly always, but not quite 100%. About 99% of 1-suit Spider deals are solvable with perfect play. Because every card is the same suit, you never get blocked by suit restrictions. The rare unwinnable deals usually involve deeply unfavorable card distributions in the stock pile.',
  },
  {
    question: 'Why is Spider Solitaire harder than FreeCell?',
    answer:
      'Spider has hidden cards in the tableau and a stock pile that deals random cards you cannot preview. FreeCell shows all 52 cards from the start, making it a pure planning puzzle. Spider introduces genuine luck, which means even skilled players will lose deals that are mathematically impossible.',
  },
  {
    question: 'Is there a famous unsolvable Spider Solitaire deal like FreeCell #11982?',
    answer:
      'No. FreeCell has a small, fixed set of numbered deals where specific games like #11982 have been proven unsolvable. Spider does not have an equivalent famous deal because its unsolvability is spread across variants and suit counts rather than concentrated in a single well-known game number.',
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

export default function IsSpiderSolitaireWinnablePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Is Spider Solitaire Winnable? Win Rates by Suit Count',
      description:
        'A detailed breakdown of Spider Solitaire solvability by variant — 1-suit, 2-suit, and 4-suit — with real win rates, the role of hidden cards, and tips to win more games.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-14',
      dateModified: '2026-03-14',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/spider/is-spider-solitaire-winnable'),
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
          name: 'Spider Solitaire',
          item: absoluteUrl('/spider'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Is Spider Solitaire Winnable?',
          item: absoluteUrl('/spider/is-spider-solitaire-winnable'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero / Short Answer */}
        <section>
          <div className={CARD}>
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Spider Solitaire Solvability
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                Is Spider Solitaire Winnable?
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Yes, but it depends entirely on the number of suits you play. A 1-suit Spider game
                is almost always solvable. A 4-suit game? Most deals will beat even experienced players.
                Unlike{' '}
                <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>
                , where nearly every deal has a solution, Spider&apos;s difficulty swings
                dramatically based on variant.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    Short answer
                  </div>
                  <p className="text-white leading-7">
                    <strong>It depends on the variant.</strong> 1-suit Spider is nearly always
                    winnable (~99% solvable). 2-suit Spider has a theoretical solvability above
                    85% but most players win 20-30% of games. 4-suit Spider is the hardest — under
                    10% win rate for average players, with only ~30-40% of deals theoretically
                    solvable.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Suit count is the single biggest factor in difficulty.</li>
                    <li>Hidden cards make Spider fundamentally luck-dependent.</li>
                    <li>The stock pile adds unpredictable complexity FreeCell lacks.</li>
                    <li>No single famous unsolvable deal — unsolvability varies by variant.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1-Suit Spider */}
        <section id="1-suit-spider" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Beginner Friendly">1-Suit Spider: Nearly Always Winnable</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                1-suit Spider uses only spades, which means every card can stack on every other card
                regardless of suit. This removes the biggest obstacle in Spider Solitaire: suit
                conflicts. With perfect play, roughly <strong className="text-white">99% of
                1-suit deals are solvable</strong>.
              </p>
              <p>
                Because suit restrictions do not apply, the game becomes a pure sequencing puzzle.
                You still need to manage hidden cards and stock draws carefully, but the margin for
                error is enormous compared to multi-suit variants. If you are new to Spider, 1-suit
                is the place to start — and to build confidence that most games really are beatable.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <div className="text-sm font-semibold text-white mb-2">Why the rare loss happens</div>
                <p className="text-sm leading-7">
                  Even in 1-suit, a small fraction of deals create stock-pile sequences that lock the
                  board no matter what you do. These are rare enough that most players never notice
                  — if you are losing 1-suit games, the deal probably was solvable and the issue was
                  move order.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Suit Spider */}
        <section id="2-suit-spider" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="The Sweet Spot">2-Suit Spider: Challenging but Fair</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                2-suit Spider uses hearts and spades (or two suits of your choice). This is where
                Spider gets interesting. You can stack any card on any other of the next higher
                rank, but <strong className="text-white">only same-suit sequences can be moved as a group
                or sent to the foundation</strong>. That one rule changes everything.
              </p>
              <p>
                Most players win about <strong className="text-white">20-30% of 2-suit games</strong>,
                but theoretical solvability is estimated at <strong className="text-white">85% or
                higher</strong> with perfect play. The gap between those numbers tells you something
                important: 2-suit Spider rewards skill more than most players realize. The difference
                between a 20% and a 40% win rate is better planning, not better luck.
              </p>
              <p>
                This is why many experienced players consider 2-suit the ideal variant. It is hard
                enough to be genuinely engaging, but solvable enough that improvement feels tangible.
                See our{' '}
                <Link href="/spider/1-suit-vs-2-suit-vs-4-suit" className="text-[#D4AF37] hover:underline">
                  suit comparison guide
                </Link>{' '}
                for a deeper breakdown.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* 4-Suit Spider */}
        <section id="4-suit-spider" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Expert Territory">4-Suit Spider: The Ultimate Challenge</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                4-suit Spider is the full, uncompromising version of the game. All four suits are in
                play, and only perfectly suited runs of King through Ace can be cleared to the
                foundation. The average player wins <strong className="text-white">fewer than 10%
                of 4-suit games</strong>.
              </p>
              <p>
                Even with theoretically perfect play, researchers estimate only about{' '}
                <strong className="text-white">30-40% of random 4-suit deals are solvable</strong>.
                That means the majority of deals you sit down to play are genuinely unwinnable
                before you make your first move. This is a stark contrast to FreeCell, where you
                can reasonably expect to solve almost every deal.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <div className="text-2xl font-bold text-white mb-1">~99%</div>
                  <div className="text-sm text-white/50">1-suit solvable</div>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <div className="text-2xl font-bold text-white mb-1">~85%+</div>
                  <div className="text-sm text-white/50">2-suit solvable (perfect play)</div>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <div className="text-2xl font-bold text-white mb-1">~30-40%</div>
                  <div className="text-sm text-white/50">4-suit solvable (perfect play)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Spider Is Harder Than FreeCell */}
        <section id="spider-vs-freecell-difficulty" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Structural Differences">Why Spider Is Harder to Solve Than FreeCell</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-6 lg:grid-cols-3">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Hidden cards</h3>
                <p className="text-white/70 leading-7 text-sm">
                  In{' '}
                  <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                    FreeCell
                  </Link>
                  , all 52 cards are visible from the start. In Spider, face-down cards in the
                  tableau mean you are making decisions with incomplete information. You cannot plan
                  a full solution when you do not know what is hidden.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">The stock pile</h3>
                <p className="text-white/70 leading-7 text-sm">
                  Each stock draw places a card on every tableau column simultaneously. You cannot
                  preview these cards or choose where they go. A single stock deal can destroy
                  a carefully built position, and you have five stock draws in a standard game.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Suit restrictions</h3>
                <p className="text-white/70 leading-7 text-sm">
                  You can stack any card on a higher card regardless of suit, but only same-suit
                  sequences move as a unit. This creates a constant tension between building
                  convenient mixed stacks and building the suited runs you actually need.
                  The{' '}
                  <Link href="/freecell-vs-spider" className="text-[#D4AF37] hover:underline">
                    FreeCell vs Spider comparison
                  </Link>{' '}
                  explores this in detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Winning More */}
        <section id="tips-for-winning" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Practical Advice">Tips for Winning More Spider Games</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">1. Uncover hidden cards first</h3>
                <p className="text-white/70 text-sm leading-7">
                  Every face-down card is information you do not have. Prioritize moves that reveal
                  hidden cards over moves that build pretty sequences. Information wins games.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">2. Keep columns empty</h3>
                <p className="text-white/70 text-sm leading-7">
                  Empty columns are your most valuable resource — more important than any partial
                  sequence. Use them to rearrange cards and absorb bad stock draws. Our{' '}
                  <Link href="/spider/strategy" className="text-[#D4AF37] hover:underline">
                    strategy guide
                  </Link>{' '}
                  covers this in depth.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">3. Build in-suit when possible</h3>
                <p className="text-white/70 text-sm leading-7">
                  Mixed-suit stacks are convenient but expensive. They cannot be moved as a group
                  and they do not count toward clearing a suit. Whenever you have a choice, prefer
                  the same-suit stack.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">4. Delay stock draws</h3>
                <p className="text-white/70 text-sm leading-7">
                  Do not draw from the stock until you have exhausted all useful tableau moves.
                  Each draw adds ten cards and fills every column, so you want maximum flexibility
                  before that happens. See more in our{' '}
                  <Link href="/spider/tips" className="text-[#D4AF37] hover:underline">
                    tips guide
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">5. Start with fewer suits</h3>
                <p className="text-white/70 text-sm leading-7">
                  If you are frustrated with 4-suit, drop to 2-suit. If 2-suit feels impossible,
                  try 1-suit. Building pattern recognition at lower difficulty transfers directly
                  to harder variants.{' '}
                  <Link href="/spider/how-to-play" className="text-[#D4AF37] hover:underline">
                    Learn the basics
                  </Link>{' '}
                  if you are just getting started.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">6. Accept unwinnable deals</h3>
                <p className="text-white/70 text-sm leading-7">
                  Unlike FreeCell, some Spider deals are genuinely impossible. Recognizing an
                  unwinnable position early saves time and frustration. If a 4-suit game is truly
                  locked after two stock draws, it may be time for a new deal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Common Questions">Spider Solitaire Winnability FAQ</SectionHeading>
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

        {/* Related guides */}
        <section id="related-guides" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Read Next">Related Spider Guides</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-2">
              <Link href="/spider" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Play Spider Solitaire</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Put the theory to the test — play 1-suit, 2-suit, or 4-suit Spider online for free.
                </p>
              </Link>
              <Link href="/spider/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Spider Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Deep-dive into column management, suit building, and stock-draw timing.
                </p>
              </Link>
              <Link href="/spider/tips" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Spider Tips & Tricks</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Quick tactical advice to immediately improve your win rate.
                </p>
              </Link>
              <Link href="/spider/how-to-play" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">How to Play Spider</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Complete rules and setup guide for all Spider Solitaire variants.
                </p>
              </Link>
              <Link href="/freecell-vs-spider" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">FreeCell vs Spider</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  How these two classics differ in difficulty, strategy, and the role of luck.
                </p>
              </Link>
              <Link href="/is-every-freecell-game-winnable" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Is Every FreeCell Game Winnable?</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  The companion article — see how FreeCell solvability compares to Spider.
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
                Ready to Test Your Skills?
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                Start with 1-suit to build confidence, then work your way up to 4-suit.
                Every variant teaches you something different about card sequencing and risk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/spider"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play Spider Solitaire
                </Link>
                <Link
                  href="/spider/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Read the Strategy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
