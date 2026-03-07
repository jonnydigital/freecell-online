import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '../../components/AdUnit';
import ContentLayout from '../../components/ContentLayout';

export const metadata: Metadata = {
  title: 'Hard FreeCell Games: What Makes A Deal Difficult?',
  description:
    'Learn what makes a FreeCell game hard, how to recognize narrow tactical positions early, and how to play difficult deals without burning all your space.',
  keywords: [
    'hard freecell games',
    'difficult freecell deals',
    'why is freecell hard',
    'hard freecell strategy',
    'freecell difficult positions',
  ],
  openGraph: {
    title: 'Hard FreeCell Games: What Makes A Deal Difficult?',
    description:
      'A practical guide to the board patterns that make FreeCell hard and the tactics that keep difficult deals alive.',
    url: absoluteUrl('/hard-freecell-games'),
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
    question: 'What makes a FreeCell game hard?',
    answer:
      'Hard deals usually bury low cards, restrict empty columns, and create positions where one wrong opening sequence can close off the winning line.',
  },
  {
    question: 'Does hard mean unsolvable?',
    answer:
      'No. Most hard FreeCell deals are still solvable. They simply leave less margin for error and require more careful space management.',
  },
  {
    question: 'How should I approach a difficult FreeCell game?',
    answer:
      'Start with a slower scan, protect empty columns, avoid filling every free cell, and think about mobility before beauty. Difficult deals reward patience more than speed.',
  },
  {
    question: 'What is the most famous impossible FreeCell deal?',
    answer:
      'The most famous one is Microsoft FreeCell deal #11982. It is a useful reference point because it reminds players that truly impossible deals are rare.',
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

export default function HardFreecellGamesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Hard FreeCell Games: What Makes A Deal Difficult?',
      description:
        'A guide to the patterns that make FreeCell deals difficult, plus tactics for surviving narrow positions.',
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
        '@id': absoluteUrl('/hard-freecell-games'),
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
          name: 'Hard FreeCell Games',
          item: absoluteUrl('/hard-freecell-games'),
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
                Advanced FreeCell
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-[#2a2522] leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Hard FreeCell Games
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#444444] max-w-3xl">
                Difficult FreeCell deals are not hard because the rules change. They are hard
                because the board gives you less room, fewer forgiving lines, and more chances to
                mistake motion for progress.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                <div className="card-inset rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-3">
                    The core idea
                  </div>
                  <p className="text-[#2a2522] leading-7">
                    Hard deals restrict mobility. The more the board forces you to spend free cells
                    and delay low-card progress, the narrower the winning line becomes.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Buried aces and twos make deals harder fast.</li>
                    <li>Empty columns matter more than tidy-looking stacks.</li>
                    <li>Hard games punish wasteful free-cell usage immediately.</li>
                    <li>Most hard deals are still solvable with cleaner sequencing.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="The Patterns">What Makes A FreeCell Deal Difficult</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Buried low cards</h3>
                <p className="text-[#444444] text-sm leading-7">
                  If aces, twos, and threes are trapped under long mixed stacks, the foundations
                  stall and the whole board stays heavier for longer.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">No easy empty column</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Difficult deals often deny you a clean column. Without that space, every rebuild
                  becomes more expensive and every mistake costs more.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Conflicting color ladders</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Hard games create stacks that look useful but block the exact color alternation
                  you need for a clean release later.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5e0d8] p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">False-choice openings</h3>
                <p className="text-[#444444] text-sm leading-7">
                  The opening move is not always obviously wrong. Hard deals often give you several
                  plausible starts, but only one preserves the board's future flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Do Not Confuse Them">Hard Versus Impossible</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                A hard deal gives you a narrow path. An impossible deal gives you none. That
                distinction matters because players routinely label a deal "impossible" after
                wasting all their space and getting stuck in a damaged position.
              </p>
              <p>
                The famous{" "}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                  Game #11982
                </Link>{" "}
                is useful precisely because it is so unusual. It is the reminder that impossible
                deals exist, but they are rare enough that your default assumption should still be:
                there is probably a line here if I manage space better.
              </p>
              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">A better question to ask mid-game</h3>
                <p className="text-sm leading-7">
                  Instead of asking "Is this deal impossible?" ask "What resource did I lose?" Most
                  hard positions get ugly because you lost an empty column, buried a critical low
                  card again, or spent a free cell to make a move that looked active but reduced mobility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Practical Tactics">How To Attack Hard Deals</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-2">
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Scan longer before move one</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Hard deals reward patience at the start. Locate every ace, low card, and nearly
                  clear column before you commit to a sequence.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Protect free cells</h3>
                <p className="text-[#444444] text-sm leading-7">
                  In tough positions, free cells are not for decoration. They are tactical reserve.
                  Spend them only when they open something more valuable.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Value mobility over beauty</h3>
                <p className="text-[#444444] text-sm leading-7">
                  A pretty descending stack can be a trap. Favor lines that create room and expose
                  low cards, even if the tableau looks less elegant in the short term.
                </p>
              </div>
              <div className="card-inset rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Study failed positions</h3>
                <p className="text-[#444444] text-sm leading-7">
                  Use undo, hints, and the{" "}
                  <Link href="/solver" className="text-[#D4AF37] hover:underline">
                    solver
                  </Link>{" "}
                  to find the first move where your space management went wrong. That is where the
                  learning lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Read Next">Build The Full Difficulty Cluster</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-3">
              <Link href="/easy-freecell-games" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Easy FreeCell Games</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Learn what a forgiving deal looks like and why easier boards are ideal for practice.
                </p>
              </Link>
              <Link href="/is-every-freecell-game-winnable" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Is Every Game Winnable?</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Separate truly impossible deals from solvable boards that only look dead.
                </p>
              </Link>
              <Link href="/tips" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Tips and Tricks</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Pair this page with a quicker tactical checklist you can use during live play.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions">Hard FreeCell Games FAQ</SectionHeading>
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
                Try A Deal That Makes You Think
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Tough FreeCell games are where discipline shows up. Play one, lose with purpose,
                and use the position to sharpen your next opening scan.
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
                  Study Full Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
