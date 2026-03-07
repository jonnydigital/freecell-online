import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '../../components/AdUnit';
import ContentLayout from '../../components/ContentLayout';

export const metadata: Metadata = {
  title: 'Is Every FreeCell Game Winnable? The Real Answer',
  description:
    'Is every FreeCell deal solvable? Learn why almost all FreeCell games are winnable, why Deal #11982 matters, and what to do when a game feels impossible.',
  keywords: [
    'is every freecell game winnable',
    'is every freecell deal solvable',
    'freecell impossible deal',
    'freecell 11982',
    'freecell solvable',
    'freecell win rate',
  ],
  openGraph: {
    title: 'Is Every FreeCell Game Winnable? The Real Answer',
    description:
      'Almost every FreeCell deal is solvable. This guide explains the famous exception, the difference between hard and impossible, and how to recover when a deal looks dead.',
    url: absoluteUrl('/is-every-freecell-game-winnable'),
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
    question: 'Is every FreeCell game winnable?',
    answer:
      'No, but almost every FreeCell game is. FreeCell is famous because nearly all deals can be solved with perfect play. The best-known exception in the original Microsoft 32,000 numbered deals is Game #11982.',
  },
  {
    question: 'Why is FreeCell so much more winnable than Klondike?',
    answer:
      'Because all 52 cards are visible from the start. There is no hidden stock and no draw-pile luck. That makes FreeCell a planning game rather than a guessing game.',
  },
  {
    question: 'Does a hard deal mean the game is impossible?',
    answer:
      'Not at all. Many deals feel impossible because the winning line is narrow and one bad move can lock the board. Hard and impossible are not the same thing.',
  },
  {
    question: 'What should I do when a deal feels unwinnable?',
    answer:
      'Slow down, create space, revisit earlier choices with undo, and look for buried low cards. If you are still stuck, use the solver or compare your position to a fresh restart of the same deal.',
  },
  {
    question: 'What is special about FreeCell deal 11982?',
    answer:
      'Game #11982 is the famous deal most players know as the classic unsolvable Microsoft FreeCell game. It matters because it proves FreeCell is not literally 100% solvable, even though it is very close.',
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
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522] scroll-mt-6"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function IsEveryFreecellGameWinnablePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Is Every FreeCell Game Winnable? The Real Answer',
      description:
        'A practical explanation of why almost every FreeCell game is solvable, why Deal #11982 matters, and how to think about hard versus impossible deals.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-07',
      dateModified: '2026-03-07',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/is-every-freecell-game-winnable'),
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
          name: 'Is Every FreeCell Game Winnable?',
          item: absoluteUrl('/is-every-freecell-game-winnable'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        <section>
          <div className={CARD}>
            <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 block mb-3">
                FreeCell Solvability
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-[#2a2522] leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Is Every FreeCell Game Winnable?
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#444444] max-w-3xl">
                Almost every FreeCell game is solvable, which is one reason the game feels so
                different from Klondike. But "almost every" is not the same as "every." The real
                skill is learning the difference between a genuinely impossible deal and a solvable
                board that you have made messy.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <div className="card-inset rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-3">
                    Short answer
                  </div>
                  <p className="text-[#2a2522] leading-7">
                    <strong>FreeCell is not literally 100% winnable.</strong> The classic
                    Microsoft deal{" "}
                    <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                      #11982
                    </Link>{" "}
                    is the famous counterexample. But nearly every other deal is solvable with
                    perfect play, which makes FreeCell one of the most skill-driven solitaire
                    games ever made.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Most deals are solvable because every card starts face-up.</li>
                    <li>Hard deals often look dead long before they truly are.</li>
                    <li>Bad space management creates many fake "impossible" positions.</li>
                    <li>The solver is most useful as a learning tool, not just a rescue button.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-freecell-is-so-solvable" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Why It Feels Different">Why FreeCell Is So Solvable</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-6 lg:grid-cols-3">
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">All cards are visible</h3>
                <p className="text-[#444444] leading-7 text-sm">
                  You can see the entire puzzle from move one. That removes luck and replaces it
                  with planning. You do not have to guess what is under a stack or hope a stock
                  card appears at the right moment.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Free cells create flexibility</h3>
                <p className="text-[#444444] leading-7 text-sm">
                  Temporary storage lets you re-order the board, expose buried low cards, and
                  create empty columns. A single open free cell can be the difference between a
                  locked position and a winning line.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Space multiplies options</h3>
                <p className="text-[#444444] leading-7 text-sm">
                  Empty columns make supermoves possible. That is why expert play is really about
                  preserving maneuvering room, not just "making moves." Space is the fuel that
                  keeps difficult deals alive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        <section id="hard-vs-impossible" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="The Real Distinction">Hard Does Not Mean Impossible</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                Most players only ask whether a deal is winnable after they have already spent
                themselves into a corner. That matters. A solvable deal can become practically
                lost if you burn all four free cells, fail to expose aces, and let critical low
                cards stay trapped in long mixed stacks.
              </p>
              <p>
                That is why strong players think in two layers. First, <strong>is the original
                deal solvable?</strong> Second, <strong>is my current position still healthy?</strong>
                Those are different questions. A restart may reveal that the deal was fine and the
                issue was your line of play.
              </p>
              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">Three signs you may be misreading the position</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li>You are using free cells to store random high cards instead of unlocking low cards.</li>
                  <li>You have not checked whether an early undo restores one or two empty columns.</li>
                  <li>You are trying to finish a stack before improving board mobility.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="what-to-do-when-stuck" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Practical Recovery">What To Do When a Deal Feels Impossible</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">1. Reopen the board</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Your first job is not to finish a sequence. It is to create room. Recover free
                  cells, expose an ace or two, and look for the fastest path to an empty column.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">2. Audit the low cards</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Check every ace, two, three, and four. If several are buried under long mixed
                  stacks, that is the real source of difficulty. Solve that before chasing pretty runs.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">3. Use undo with purpose</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Undo is not a crutch. It is a diagnostic tool. Walk back to the moment the board
                  lost flexibility and test a more patient line.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">4. Use the solver to learn</h3>
                <p className="text-[#444444] text-sm leading-7">
                  If you truly cannot see a path, compare your thinking to the{" "}
                  <Link href="/solver" className="text-[#D4AF37] hover:underline">
                    solver
                  </Link>
                  . The goal is not just to finish the deal. It is to understand what move you
                  were undervaluing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="related-guides" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Read Next">Related FreeCell Guides</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-3">
              <Link href="/easy-freecell-games" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Easy FreeCell Games</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Learn what makes a beginner-friendly deal and where to practice lower-pressure games.
                </p>
              </Link>
              <Link href="/hard-freecell-games" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Hard FreeCell Games</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  See the board patterns that turn a clean puzzle into a narrow tactical fight.
                </p>
              </Link>
              <Link href="/strategy" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Go deeper on free cells, empty columns, supermoves, and disciplined board management.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions">FreeCell Winnability FAQ</SectionHeading>
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
                Test the Theory on a Real Deal
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Play a fresh game, keep your free cells clean, and see how often a deal that first
                looked hopeless opens up once you create space.
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
                  href="/solver"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Open the Solver
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
