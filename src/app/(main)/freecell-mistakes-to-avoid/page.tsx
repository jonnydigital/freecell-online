import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'FreeCell Mistakes to Avoid: 8 Errors That Cost You Games',
  description:
    'Stop losing FreeCell games to the same mistakes. Learn the 8 most common errors — from filling free cells too early to ignoring empty columns — and how to fix them.',
  keywords: [
    'freecell mistakes',
    'common freecell mistakes',
    'why do I keep losing freecell',
    'freecell strategy errors',
    'freecell beginner mistakes',
    'freecell tips',
  ],
  openGraph: {
    title: 'FreeCell Mistakes to Avoid: 8 Errors That Cost You Games',
    description:
      'The 8 most common FreeCell mistakes and how to fix them. Practical advice from thousands of games played.',
    url: absoluteUrl('/freecell-mistakes-to-avoid'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const CARD = 'card-panel';
const CARD_TOP: React.CSSProperties = {
  borderTop: '1px solid rgba(184, 134, 11, 0.08)',
};

const faqs = [
  {
    question: 'What is the most common mistake in FreeCell?',
    answer:
      'Filling free cells too quickly. Every occupied free cell reduces the number of cards you can move in a single supermove, and once all four are full, you lose the flexibility needed to rearrange the tableau effectively.',
  },
  {
    question: 'Why do I keep losing at FreeCell?',
    answer:
      'Most losses come from a small set of repeated habits: rushing cards to free cells, ignoring the value of empty columns, not scanning the board before the first move, and giving up on deals that are still solvable. Fixing even one of these habits will noticeably improve your win rate.',
  },
  {
    question: 'Should I always move aces to the foundation immediately?',
    answer:
      'Not always. Aces and twos are almost always safe to send up. But threes and above sometimes serve as stepping stones for building tableau sequences. Before moving a card to the foundation, check whether you need it as an intermediate landing spot.',
  },
  {
    question: 'How important are empty columns in FreeCell?',
    answer:
      'Extremely important. An empty column doubles the number of cards you can move in a supermove. With 4 free cells and 1 empty column you can move 10 cards at once. With 4 free cells and no empty columns, only 5. Protecting empty columns is one of the highest-leverage habits you can build.',
  },
  {
    question: 'Is it possible to win every FreeCell game?',
    answer:
      'Nearly. Of the original 32,000 Microsoft FreeCell deals, only one — deal #11982 — has been proven impossible. Statistically, around 99.999% of random deals are solvable. If you are stuck, the deal is almost certainly winnable with a different approach.',
  },
];

function SectionHeading({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        className="text-2xl sm:text-3xl font-bold text-[#2a2522] scroll-mt-6"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function FreecellMistakesToAvoidPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Mistakes to Avoid: 8 Errors That Cost You Games',
      description:
        'The 8 most common FreeCell mistakes and practical fixes for each one.',
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
        '@id': absoluteUrl('/freecell-mistakes-to-avoid'),
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
          name: 'FreeCell Mistakes to Avoid',
          item: absoluteUrl('/freecell-mistakes-to-avoid'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* ── Hero ── */}
        <section>
          <div className={CARD}>
            <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 block mb-3">
                FreeCell Strategy
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-[#2a2522] leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                FreeCell Mistakes to Avoid
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#444444] max-w-3xl">
                Around 99.999% of FreeCell deals are solvable. That means almost every loss is a
                player error, not bad luck. The good news is that most players lose to the same
                small set of mistakes, and once you see them clearly, they are surprisingly easy
                to stop making.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                <div className="card-inset rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-3">
                    The core idea
                  </div>
                  <p className="text-[#2a2522] leading-7">
                    FreeCell losses are almost never about the deal. They are about spending
                    resources you cannot get back — free cells, empty columns, and tempo — on
                    moves that feel productive but actually shrink your options.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Free cells are finite — fill them only when the payoff is clear.</li>
                    <li>Empty columns are worth more than free cells; protect them.</li>
                    <li>Scan the entire board before your first move.</li>
                    <li>Activity is not progress — every move should open something.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mistakes 1-2 (2-col grid) ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #1">Moving Aces to Foundations Too Early</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">The instinct</h3>
                <p className="text-[#444444] text-sm leading-7">
                  An ace appears and you send it straight to the foundation. Then the two follows.
                  Then the three. It feels like progress because the foundation pile is growing.
                  But sometimes those low cards were doing useful work right where they were.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">The real cost</h3>
                <p className="text-[#444444] text-sm leading-7">
                  A 3 sitting on the tableau can serve as a landing spot for a 2 of the opposite
                  color. Once it is on the foundation, that option vanishes. Aces and twos are
                  almost always safe to send up. Threes and above need a second look — check
                  whether the card is still needed as a stepping stone before you promote it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #2">Filling Free Cells Too Quickly</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                This is the single most common mistake in FreeCell and the one that ends the most
                games. New players treat free cells like extra storage. Experienced players treat
                them like oxygen — precious, limited, and not to be wasted.
              </p>
              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">The supermove math</h3>
                <p className="text-sm leading-7">
                  The number of cards you can move as a group equals <strong>(N + 1) × 2<sup>M</sup></strong>,
                  where N is the number of empty free cells and M is the number of empty columns.
                  With 4 free cells and 0 empty columns, you can move <strong>5 cards</strong>.
                  With 4 free cells and 1 empty column, that jumps to <strong>10 cards</strong>.
                  But fill just two free cells and you drop to <strong>3 cards</strong> with no
                  empty columns — barely enough to rearrange anything meaningful.
                </p>
              </div>
              <p>
                Every card you park in a free cell makes the rest of the game harder. Before
                placing a card there, ask: what am I unlocking, and is it worth the permanent
                loss of flexibility? If the answer is vague, the answer is no.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Mistakes 3-4 (2-col grid) ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #3">Ignoring Empty Columns</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Worth more than a free cell</h3>
                <p className="text-[#444444] text-sm leading-7">
                  An empty column doubles your supermove capacity. That is a bigger multiplier
                  than a free cell provides. Yet players routinely toss a card into an open column
                  just to build a longer descending sequence somewhere else — trading a strategic
                  asset for something cosmetic.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">When to fill one</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Only fill an empty column when it directly uncovers a buried ace or low card,
                  or when you can see a concrete path to emptying another column in the next few
                  moves. "It tidies up the board" is not a good enough reason. Think of empty
                  columns as runway — you need them for the big moves later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #4">Not Planning Ahead</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                The most reliable habit that separates players who win 70% of their games from
                players who win 40% is a simple one: scan the full board before move one. Where
                are the aces? Which columns are closest to clearing? Which low cards are buried
                deepest? What does the opening sequence need to accomplish?
              </p>
              <p>
                Most losing games go wrong in the first five moves, not the last five. If you are
                guessing at the start, you are building on a shaky foundation. Thirty seconds of
                scanning saves ten minutes of undo-spamming later. Check the{' '}
                <Link href="/strategy" className="text-[#D4AF37] hover:underline">
                  strategy guide
                </Link>{' '}
                for a pre-move checklist you can use on every deal.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mistakes 5-6 (2-col grid) ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #5">Focusing on One Column</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">The tunnel-vision trap</h3>
                <p className="text-[#444444] text-sm leading-7">
                  You spot a column with a buried ace and decide that clearing it is the priority.
                  You spend free cells and fill empty columns to dig it out. By the time the ace
                  is free, the rest of the board is locked. The ace goes to the foundation, but
                  now nothing else can move.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Work the whole board</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Good FreeCell play is distributed. You should be making progress in multiple
                  columns simultaneously, looking for moves that accomplish two things at once —
                  uncovering a card while also building a useful sequence. If you catch yourself
                  pouring all your resources into one column, stop and look around.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #6">Not Uncovering Aces and Low Cards</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                Foundations drive the endgame. If aces and twos stay buried, the board never gets
                lighter. Every card that stays on the tableau is a card competing for limited
                space. Foundation progress is what eventually makes the game easy — but it starts
                with excavation, not decoration.
              </p>
              <p>
                When you scan the board before move one, identify where the aces and twos are.
                Then ask: what is the shortest path to uncovering each one? That question should
                shape your entire opening sequence. A beautiful descending stack is worthless if
                the ace of hearts is sitting at the bottom of a column you never touched.
              </p>
              <p>
                For a deeper look at using the{' '}
                <Link href="/freecell-hints-explained" className="text-[#D4AF37] hover:underline">
                  hint system
                </Link>{' '}
                to find buried cards quickly, see the hints guide.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Mistakes 7-8 (2-col grid) ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #7">Moving Cards Just Because You Can</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Activity is not progress</h3>
                <p className="text-[#444444] text-sm leading-7">
                  A legal move is not necessarily a good move. FreeCell rewards restraint. Every
                  move that does not uncover a useful card, create space, or advance the
                  foundations is a move that spends tempo for nothing. Worse, it might block
                  something you will need in three moves.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">The one-move test</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Before every move, ask: what does this open? If you cannot name a specific card,
                  column, or foundation play that this move enables, it is probably not worth
                  making. Pass on it and look for something with a concrete payoff. The{' '}
                  <Link href="/tips" className="text-[#D4AF37] hover:underline">
                    tips page
                  </Link>{' '}
                  has more on recognizing productive versus empty moves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Mistake #8">Giving Up Too Soon</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                Out of the original 32,000 Microsoft FreeCell deals, exactly one —{' '}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                  deal #11982
                </Link>{' '}
                — has been proven impossible. Every other deal has at least one winning line.
                Broader analysis of random shuffles puts the solvability rate at roughly 99.999%.
                The deal you are about to abandon is almost certainly winnable.
              </p>
              <p>
                When a board looks dead, use undo to go back five or ten moves. Look for the
                point where you lost a critical resource — usually the move where you filled the
                last free cell or gave up an empty column. Try a different line from there. If
                you are still stuck, the{' '}
                <Link href="/solver" className="text-[#D4AF37] hover:underline">
                  solver
                </Link>{' '}
                can confirm whether a position is actually solvable and show you the path. You
                can also check your{' '}
                <Link href="/statistics" className="text-[#D4AF37] hover:underline">
                  win-rate statistics
                </Link>{' '}
                to track how your persistence pays off over time.
              </p>
              <p>
                Read more about the math behind FreeCell solvability on the{' '}
                <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                  Is Every FreeCell Game Winnable?
                </Link>{' '}
                page.
              </p>
            </div>
          </div>
        </section>

        {/* ── Expert Quote ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Expert Advice">Words From a FreeCell Pioneer</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8">
              <blockquote className="card-inset rounded-xl p-6 border-l-4 border-[#D4AF37]/40">
                <p className="text-[#2a2522] leading-8 italic">
                  &ldquo;Don&apos;t dive into posting aces immediately. Try to empty at least one
                  column. Never leave less than two open spaces unless you can see your way out.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-[#444444]">
                  — Adrian Ettlinger, early FreeCell solver developer and analyst
                </footer>
              </blockquote>
              <p className="mt-6 text-[#444444] leading-8">
                Ettlinger&apos;s advice captures all eight mistakes in three sentences. Resist the
                urge to send cards to the foundation on autopilot. Prioritize empty columns above
                all else. And always maintain enough open space to maneuver — because the moment
                you run out, the game stops being about strategy and starts being about luck.
              </p>
            </div>
          </div>
        </section>

        {/* ── Read Next ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Read Next">Keep Improving Your Game</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-3">
              <Link href="/strategy" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  The complete strategic framework — opening principles, midgame tactics, and endgame technique.
                </p>
              </Link>
              <Link href="/tips" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Tips & Tricks</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Quick tactical patterns you can apply during live play without pausing to think.
                </p>
              </Link>
              <Link href="/freecell-for-beginners" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">FreeCell for Beginners</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Start from the basics — rules, interface walkthrough, and your first winning strategy.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions">FreeCell Mistakes FAQ</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">{faq.question}</h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {index < faqs.length - 1 && <div className="mt-6 border-b border-[#e5e0d8]" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background: 'linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)',
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Put These Lessons Into Practice
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Knowing the mistakes is the first step. The second step is loading a deal and
                playing it with fresh eyes — watching for each habit as it tries to sneak back in.
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
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Strategy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
