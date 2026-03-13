import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { beginnerDeals } from '@/lib/curatedDeals';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

export const metadata: Metadata = {
  title: 'Easy FreeCell Games: How To Find Beginner-Friendly Deals',
  description:
    'Learn what makes a FreeCell deal feel easy, how to spot beginner-friendly positions early, and where to practice smoother games on this site.',
  keywords: [
    'easy freecell games',
    'beginner freecell deals',
    'how to find easy freecell deals',
    'easy freecell strategy',
    'freecell for beginners',
  ],
  openGraph: {
    title: 'Easy FreeCell Games: How To Find Beginner-Friendly Deals',
    description:
      'A practical guide to the board patterns that make FreeCell easier and the best ways to practice lower-pressure deals.',
    url: absoluteUrl('/easy-freecell-games'),
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
    question: 'What makes a FreeCell game easy?',
    answer:
      'Easy deals usually expose aces early, let you clear space quickly, and avoid trapping many low cards under long mixed stacks. They give you room to recover from minor mistakes.',
  },
  {
    question: 'Are easy FreeCell games guaranteed wins?',
    answer:
      'No. Easy deals are more forgiving, not automatic. You can still lose them by filling every free cell too early or by delaying obvious foundation progress.',
  },
  {
    question: 'Where should beginners practice easier FreeCell games?',
    answer:
      'Start with beginner-focused guides, winning-deal collections, and normal games where you allow yourself to use undo and hints while learning.',
  },
  {
    question: 'Do easy games help you improve?',
    answer:
      'Yes. Easier games help you build pattern recognition, confidence, and board-reading habits before you move into narrower and more tactical deals.',
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
    <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        className="text-2xl sm:text-3xl font-bold text-white scroll-mt-6"
      >
        {children}
      </h2>
      <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
    </div>
  );
}

export default function EasyFreecellGamesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Easy FreeCell Games: How To Find Beginner-Friendly Deals',
      description:
        'A guide to the board patterns that make FreeCell games easier, plus the best ways to practice low-pressure deals.',
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
        '@id': absoluteUrl('/easy-freecell-games'),
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
          name: 'Easy FreeCell Games',
          item: absoluteUrl('/easy-freecell-games'),
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
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Beginner-Friendly Practice
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                Easy FreeCell Games
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                An easy FreeCell game is not just one you happen to win. It is a deal that gives
                you room to think, room to recover, and early clues that point toward a clean
                solution. Those are the best games for learning the right habits.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr,0.85fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    The quick definition
                  </div>
                  <p className="text-white leading-7">
                    Easy deals usually expose aces and twos early, let you free a column without
                    heroic surgery, and do not force you to spend all your free cells just to make
                    basic progress.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Easy games expose low cards fast.</li>
                    <li>They create empty columns earlier and more naturally.</li>
                    <li>They forgive one or two inefficient moves.</li>
                    <li>They are the best place to train board-reading skills.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD}>
            <SectionHeading sub="Spot Them Early">What Easy FreeCell Games Usually Have In Common</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Early access to aces and twos</h3>
                <p className="text-white/70 text-sm leading-7">
                  When the foundations can start quickly, the board loosens up. That gives you more
                  legal moves and removes dead weight from the tableau.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">A fast empty column</h3>
                <p className="text-white/70 text-sm leading-7">
                  If one column can be cleared without a long chain of temporary storage, the deal
                  usually becomes much more forgiving. Space is the easiest form of power in FreeCell.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Shorter trapped sequences</h3>
                <p className="text-white/70 text-sm leading-7">
                  Easy deals do not bury every useful low card under long mixed-color walls. You can
                  usually expose what matters without rebuilding half the board.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Recovery margin</h3>
                <p className="text-white/70 text-sm leading-7">
                  If you can waste one free cell or make one ugly move and still recover, the deal is
                  probably on the easier side. Brutal deals punish mistakes immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        <section>
          <div className={CARD}>
            <SectionHeading sub="Use The Right Training Loop">Best Ways To Practice Easier Games On This Site</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
              <p>
                If your goal is improvement, easier deals are not a shortcut. They are a training
                environment. They let you practice clean sequencing, foundation timing, and space
                management before harder deals start punishing every mistake.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/freecell-for-beginners" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Start with the beginner guide</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Build the basic rules and board-reading habits before you worry about high-pressure deals.
                  </p>
                </Link>
                <Link href="/winning-deals" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Use winning-deal routes</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    If you want smoother practice reps, start with collections that bias toward solvable, playable boards.
                  </p>
                </Link>
                <Link href="/tips" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Pair games with tips</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Play a short session, read two or three tips, then replay with a clearer plan.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD}>
            <SectionHeading sub="Hand-Picked For Practice">Try These Beginner-Friendly Deals</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {beginnerDeals.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.05] p-5 hover:border-[#D4AF37]/50 transition-colors text-center"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 mb-3">
                      Easy
                    </span>
                    <div className="text-2xl font-bold text-white mb-1">#{deal.number}</div>
                    <div className="text-sm text-white/60">{deal.label}</div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <Link href="/famous-freecell-deals" className="text-[#D4AF37] hover:underline text-sm font-medium">
                  See all famous deals &rarr;
                </Link>
                <Link href="/deals" className="text-[#D4AF37] hover:underline text-sm font-medium">
                  Browse all deals &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD}>
            <SectionHeading sub="A Simple Checklist">How To Tell If A Deal Is Beginner-Friendly</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <ol className="space-y-3 text-white/70 leading-7 list-decimal list-inside">
                  <li>Can you play at least one ace to the foundations almost immediately?</li>
                  <li>Can you free a column without filling every free cell?</li>
                  <li>Are the twos, threes, and fours reasonably close to the surface?</li>
                  <li>Do you have more than one promising opening line?</li>
                  <li>Can you undo a bad move without the whole board collapsing?</li>
                </ol>
              </div>
              <p className="mt-5 text-white/70 leading-8">
                The more yes answers you get, the more likely you are looking at an easy or at
                least forgiving FreeCell game. This is also why easier deals are perfect for
                building confidence before you move into{" "}
                <Link href="/hard-freecell-games" className="text-[#D4AF37] hover:underline">
                  harder positions
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className={CARD}>
            <SectionHeading sub="Related Reading">Where To Go After You Outgrow Easy Deals</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-2">
              <Link href="/is-every-freecell-game-winnable" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Is Every FreeCell Game Winnable?</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Learn why almost every deal is solvable and why some positions only look impossible.
                </p>
              </Link>
              <Link href="/hard-freecell-games" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Hard FreeCell Games</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  See which board patterns narrow your options and demand much cleaner play.
                </p>
              </Link>
              <Link href="/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Full Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Move from forgiving practice boards into serious decision-making and deeper planning.
                </p>
              </Link>
              <Link href="/famous-freecell-deals" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Famous FreeCell Deals</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Explore the most iconic games in FreeCell history, from the easiest wins to the impossible.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className={CARD}>
            <SectionHeading sub="Common Questions">Easy FreeCell Games FAQ</SectionHeading>
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
                Start With A Cleaner Board
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                Use easier games to rehearse the fundamentals. Then move up to harder deals once
                good habits start to feel automatic.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/easy-freecell"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play Easy FreeCell
                </Link>
                <Link
                  href="/freecell-for-beginners"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Read The Beginner Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
