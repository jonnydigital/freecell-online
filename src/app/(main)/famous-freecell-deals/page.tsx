import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { famousDeals, unsolvableDeals, expertDeals, beginnerDeals } from '@/lib/curatedDeals';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'Famous FreeCell Deals: Iconic Games Worth Playing',
  description:
    'Explore the most famous FreeCell deals ever catalogued, from the very first Microsoft deal to proven-impossible boards and the hardest solvable challenges.',
  keywords: [
    'famous freecell deals',
    'iconic freecell games',
    'freecell deal 11982',
    'freecell deal 617',
    'hardest freecell deals',
    'impossible freecell games',
    'microsoft freecell deals',
    'freecell game numbers',
  ],
  openGraph: {
    title: 'Famous FreeCell Deals: Iconic Games Worth Playing',
    description:
      'A guide to the most famous FreeCell deal numbers, including impossible boards, expert challenges, and the deals that defined the game.',
    url: absoluteUrl('/famous-freecell-deals'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};


/** Substantive descriptions for each famous deal */
const famousDealDescriptions: Record<number, string> = {
  1: 'The very first deal in Microsoft FreeCell. It opens cleanly with accessible aces and has become the default starting point for millions of first-time players since Windows 3.1.',
  617: 'The default game that loaded when you opened Microsoft FreeCell without picking a number. For many players, this was their introduction to the game and remains one of the most-played deals in history.',
  11982: 'The most famous impossible FreeCell deal. It was the first game in the original 32,000-deal Microsoft set proven to have no solution, making it a touchstone for the entire solvability debate.',
  146692: 'One of eight confirmed impossible deals in the extended 1,000,000-deal set. Its unsolvability was verified by exhaustive computer search, confirming that the board has no legal winning path.',
  186216: 'A confirmed impossible deal discovered during large-scale solver analysis. Like #11982, no legal sequence of moves can untangle this particular arrangement of cards.',
  455889: 'An impossible deal in the mid-range of the million-deal set. It demonstrates that unsolvable positions are scattered unpredictably across the deal space, not clustered in any obvious pattern.',
  495505: 'Another confirmed impossible deal verified through exhaustive search. Its position helped researchers estimate the overall solvability rate for FreeCell at roughly 99.999%.',
  512118: 'Proven impossible through exhaustive computational analysis. Its position near the midpoint of the million-deal range adds data to the census of unsolvable FreeCell positions.',
  517776: 'Proven impossible through exhaustive search. Like the other unsolvable deals, it traps essential low cards in configurations where no sequence of legal moves can free them.',
  781948: 'The highest-numbered confirmed impossible deal in the standard million-deal set. It sits near the top of the range and helped complete the census of unsolvable FreeCell positions.',
};

/** Substantive descriptions for each expert deal */
const expertDealDescriptions: Record<number, string> = {
  169: 'One of the most notoriously difficult solvable deals. It buries critical low cards under conflicting color ladders, forcing players to find an extremely narrow extraction sequence to win.',
  178: 'An expert-level challenge that demands precise free-cell management from the very first move. One wasted temporary slot early on can close off the only winning line.',
  258: 'A deal where all four aces are buried deep in the tableau. Reaching them requires a long chain of intermediate moves that tests your ability to plan several steps ahead.',
  454: 'Known for its razor-thin margins. Nearly every move must serve double duty, simultaneously clearing space and positioning cards for future foundation plays.',
  1689: 'Features a complex extraction puzzle where important cards are tangled in multiple columns at once. Solving it requires coordinating moves across the entire board.',
  3148: 'A deal that punishes shallow thinking. The opening looks straightforward, but only deep multi-step planning reveals the single viable path to the foundations.',
  7107: 'Considered an advanced-only deal by the FreeCell community. Its difficulty comes from a combination of buried aces, long mixed stacks, and very few natural sequences.',
  10613: 'Often described as near-impossible, though it does have a solution. The winning line requires almost perfect play with virtually no room for wasted moves or idle free cells.',
};


export default function FamousFreecellDealsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Famous FreeCell Deals: Iconic Games Worth Playing',
      description:
        'A guide to the most famous FreeCell deal numbers, from impossible boards to expert challenges and the deals that defined the game.',
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
        '@id': absoluteUrl('/famous-freecell-deals'),
      },
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
          name: 'Famous FreeCell Deals',
          item: absoluteUrl('/famous-freecell-deals'),
        },
      ],
    },
  ];

  const impossibleDeals = famousDeals.filter(
    (d) => d.difficulty === 'Impossible',
  );
  const nonImpossibleFamous = famousDeals.filter(
    (d) => d.difficulty !== 'Impossible',
  );

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* ── Hero ── */}
        <CardSection variant="dark">
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Iconic Games
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                Famous FreeCell Deals
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Some FreeCell deal numbers have earned a reputation that goes far beyond the
                game board. They are reference points for difficulty, solvability research,
                and community lore. This page collects the deals worth knowing by number,
                explains what makes each one notable, and links you straight to the board.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr,0.85fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    Why these deals matter
                  </div>
                  <p className="text-white leading-7">
                    Every FreeCell deal number maps to a specific card layout generated by the
                    original Microsoft algorithm. Some of those layouts became famous because
                    they defined the boundaries of the game: the easiest starting points, the
                    hardest solvable puzzles, and the handful of boards that no one can beat.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    At a glance
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>{famousDeals.length} famous deals catalogued on this page.</li>
                    <li>{unsolvableDeals.length} confirmed impossible deals in the million-deal set.</li>
                    <li>{expertDeals.length} expert-level solvable challenges to test yourself.</li>
                    <li>{beginnerDeals.length} beginner-friendly deals for warm-up practice.</li>
                  </ul>
                </div>
              </div>
            </div>
        </CardSection>

        {/* ── Iconic / Non-impossible Famous Deals ── */}
        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Where It All Started">The Iconic Deals</SectionHeading>
            <ContentBody variant="dark" className="space-y-4">
              <p className="text-white/70 leading-8">
                These are the deal numbers that most FreeCell players recognize on sight.
                They shaped the game&rsquo;s early history and remain the most commonly
                referenced starting positions in the community.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {nonImpossibleFamous.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-[#D4AF37]">#{deal.number}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {deal.label}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-7">
                      {famousDealDescriptions[deal.number]}
                    </p>
                  </Link>
                ))}
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Unsolvable Deals ── */}
        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Mathematically Proven">The Impossible Deals</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Out of the first 1,000,000 Microsoft FreeCell deals, only {unsolvableDeals.length} have been
                confirmed impossible through exhaustive computer analysis. No legal sequence
                of moves can solve them. They are not merely hard or obscure; they are
                mathematically proven dead ends. That means roughly 99.999% of all FreeCell
                deals are solvable, which is part of what makes the game so compelling.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {impossibleDeals.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="rounded-xl border border-red-500/20 bg-red-950/10 p-5 hover:border-red-500/40 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-red-400">#{deal.number}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-red-400/50">
                        Impossible
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-7">
                      {famousDealDescriptions[deal.number]}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">The full list of confirmed impossible deals</h3>
                <p className="text-sm leading-7">
                  The complete set of unsolvable deals in the standard million-deal range is:{' '}
                  {unsolvableDeals.map((num, i) => (
                    <span key={num}>
                      <Link href={`/game/${num}`} className="text-[#D4AF37] hover:underline">
                        #{num}
                      </Link>
                      {i < unsolvableDeals.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  . Every other deal in that range has at least one known solution.
                </p>
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Expert Challenge Deals ── */}
        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Test Your Limits">The Hardest Solvable Deals</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                These deals are solvable, but just barely. They represent the upper edge of
                FreeCell difficulty: boards where the winning line is so narrow that most
                players will need multiple attempts, careful free-cell conservation, and
                deep multi-step planning to find it. If you can solve even a few of these,
                you are playing at an expert level.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {expertDeals.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-[#D4AF37]">#{deal.number}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {deal.label}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-7">
                      {expertDealDescriptions[deal.number]}
                    </p>
                  </Link>
                ))}
              </div>
            </ContentBody>
        </CardSection>

        {/* ── Beginner Warm-Ups ── */}
        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Start Here">Beginner-Friendly Famous Deals</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Not every notable deal is a grueling test. These beginner-friendly boards
                are well-known because they offer clean openings, accessible aces, and
                forgiving layouts. They are ideal for warming up before harder challenges
                or for learning the fundamentals without constant frustration.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {beginnerDeals.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="rounded-xl border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors text-center"
                  >
                    <span className="text-xl font-bold text-[#D4AF37] block">#{deal.number}</span>
                    <span className="text-xs text-white/50 mt-1 block">{deal.label}</span>
                  </Link>
                ))}
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Related Guides ── */}
        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Keep Exploring">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/strategy" title="Full Strategy Guide" description="Master the decision-making framework that separates intermediate players from experts." />
              <ContentLinkCard href="/tips" title="Tips and Tricks" description="Quick tactical advice you can apply mid-game to improve your win rate immediately." />
              <ContentLinkCard href="/easy-freecell-games" title="Easy FreeCell Games" description="Learn what makes a deal forgiving and find the best boards for building confidence." />
              <ContentLinkCard href="/hard-freecell-games" title="Hard FreeCell Games" description="Understand the board patterns that narrow your options and demand cleaner play." />
              <ContentLinkCard href="/is-every-freecell-game-winnable" title="Is Every Game Winnable?" description="The full story on FreeCell solvability, from the original 32K set to the million-deal census." />
            </ContentBody>
        </CardSection>        <CtaSection
          heading="Pick A Famous Deal And Play It"
          body="Whether you want a gentle warm-up, an expert-level gauntlet, or the strange satisfaction of confirming an impossible board, every deal on this page is one click away."
          primaryLabel="Try The Impossible #11982"
          primaryHref="/game/11982"
          secondaryLabel="Challenge #169"
          secondaryHref="/game/169"
        />
      </main>
    </ContentLayout>
  );
}
