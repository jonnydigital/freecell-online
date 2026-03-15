import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'FreeCell Probability & Mathematics — The Numbers Behind the Game',
  description:
    'The mathematics of FreeCell Solitaire: how deals are generated, why 99.999% are solvable, the role of free cells in the move space, and why player win rates differ from theoretical solvability.',
  keywords: [
    'freecell probability',
    'freecell mathematics',
    'freecell solvability',
    'freecell statistics',
    'freecell win rate',
    'freecell deal generation',
    'freecell math',
    'freecell perfect information game',
    'freecell 11982 probability',
    'freecell how many deals solvable',
  ],
  openGraph: {
    title: 'FreeCell Probability & Mathematics — The Numbers Behind the Game',
    description:
      'How FreeCell deals are generated, why near-universal solvability exists, the supermove formula, and why player win rates lag far behind theoretical solvability.',
    url: absoluteUrl('/freecell-probability'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function FreecellProbabilityPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Probability & Mathematics — The Numbers Behind the Game',
      description:
        'A detailed look at the mathematics of FreeCell Solitaire: deal generation, solvability rates, the supermove formula, and the gap between theoretical and practical win rates.',
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
        '@id': absoluteUrl('/freecell-probability'),
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
          name: 'FreeCell Probability',
          item: absoluteUrl('/freecell-probability'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <CardSection variant="dark">
          <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Mathematics
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                FreeCell Probability &amp; Mathematics
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                FreeCell is one of the most mathematically interesting card games ever created.
                Behind the simple interface lies a deterministic puzzle with near-universal
                solvability, a precise formula governing movement, and a fascinating gap between
                what is theoretically possible and what most players actually achieve.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">52!</div>
                  <div className="text-sm text-white/50 mt-1">Possible Deals</div>
                  <p className="text-xs text-white/40 mt-2">8.07 &times; 10<sup>67</sup> arrangements</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">99.999%</div>
                  <div className="text-sm text-white/50 mt-1">Solvable</div>
                  <p className="text-xs text-white/40 mt-2">With perfect play</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">75-85%</div>
                  <div className="text-sm text-white/50 mt-1">Typical Win Rate</div>
                  <p className="text-xs text-white/40 mt-2">For experienced players</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-white/50 mt-1">Known Unsolvable</div>
                  <p className="text-xs text-white/40 mt-2">In the first 1,000,000 deals</p>
                </div>
              </div>
            </div>
        </CardSection>

        {/* Deterministic Deals */}
        <CardSection id="deal-generation" variant="dark">
          <SectionHeading variant="dark" sub="How Deals Work" id="deal-generation-heading">The 52-Card Deterministic Deal</SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
              <p>
                Every FreeCell deal is generated from a seed number using a pseudorandom number
                generator (PRNG). The original Microsoft FreeCell used a simple 32-bit linear
                congruential generator: given the same seed, you always get the same card layout.
                Deal #1 is always the same. Deal #30000 is always the same. This determinism is
                what makes FreeCell a shared puzzle &mdash; two players on opposite sides of the
                world can play the exact same deal by entering the same number.
              </p>
              <p>
                A standard 52-card deck has 52! (52 factorial) possible arrangements &mdash;
                approximately 8.07 &times; 10<sup>67</sup>. That is a number with 68 digits.
                The original Microsoft PRNG, with its 32-bit seed, could only generate about
                2.1 billion (2<sup>31</sup>) distinct deals, which is a vanishingly small
                fraction of all possible deals. Modern implementations use larger seed spaces,
                but the fundamental principle remains: every seed maps to exactly one layout,
                and every layout is fully determined before the first move.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Why determinism matters</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li><strong className="text-white">Reproducibility:</strong> You can replay the same deal to try a different strategy. The cards never change.</li>
                  <li><strong className="text-white">Shared challenges:</strong> Daily challenges work because every player gets the same layout from the same seed.</li>
                  <li><strong className="text-white">Solvability research:</strong> Researchers can systematically test every deal in a range, proving which are solvable and which are not.</li>
                </ul>
              </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Solvability */}
        <CardSection id="solvability" variant="dark">
            <SectionHeading variant="dark" sub="The Big Number" id="solvability-heading">Near-Universal Solvability</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                FreeCell&apos;s solvability rate is extraordinary. In the original Microsoft set
                of 32,000 numbered deals, only one &mdash;{' '}
                <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                  deal #11982
                </Link>{' '}
                &mdash; has been proven unsolvable through exhaustive computer search. Every other
                deal in the set can be won with the right sequence of moves.
              </p>
              <p>
                When researchers extended the analysis to the first one million deal numbers,
                they found a total of eight unsolvable deals. That gives an insolvability rate
                of approximately 0.0008%, or equivalently, a solvability rate of roughly 99.999%.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    The original 32,000 deals
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">31,999</div>
                      <div className="text-xs text-white/50 mt-1">Solvable</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">1</div>
                      <div className="text-xs text-white/50 mt-1">Unsolvable (#11982)</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    The first 1,000,000 deals
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">999,992</div>
                      <div className="text-xs text-white/50 mt-1">Solvable</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">8</div>
                      <div className="text-xs text-white/50 mt-1">Unsolvable</div>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                Why is solvability so high? Three factors combine. First, all 52 cards are
                visible, eliminating the information barriers that make many Klondike deals
                unsolvable. Second, four free cells provide enough temporary storage to
                rearrange almost any configuration. Third, the ability to place any card in
                an empty cascade gives the player enormous flexibility. Together, these
                mechanics create a game where the solution space is vast enough to accommodate
                almost any starting arrangement.
              </p>
          </ContentBody>
        </CardSection>

        {/* Deal 11982 */}
        <CardSection id="deal-11982" variant="dark">
            <SectionHeading variant="dark" sub="The Exception" id="deal-11982-heading">Deal #11982: The Famous Outlier</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Deal #11982 holds a unique place in FreeCell history. It is the only deal in
                the original Microsoft set that no human and no computer algorithm has ever
                solved &mdash; not because nobody has tried, but because exhaustive search has
                proven no solution exists. Every legal sequence of moves from the starting
                position terminates in a dead end.
              </p>
              <p>
                The Internet FreeCell Project, a distributed community effort in the late 1990s,
                confirmed solutions for 31,999 of the original 32,000 deals. Only #11982
                remained. When solver programs later verified the result algorithmically, the
                deal&apos;s status shifted from &quot;unsolved&quot; to &quot;proven
                unsolvable.&quot;
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <p className="text-sm leading-7">
                  The other seven unsolvable deals in the first million (146692, 186216, 455889,
                  495505, 512118, 517776, 781948) were found through similar exhaustive searches.
                  Together, these eight deals demonstrate that FreeCell&apos;s near-perfect
                  solvability is not literally perfect &mdash; a fact that makes the game more
                  interesting, not less.{' '}
                  <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                    Read the full story of deal #11982.
                  </Link>
                </p>
              </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Player Win Rate vs Theoretical */}
        <CardSection id="win-rate-gap" variant="dark">
            <SectionHeading variant="dark" sub="Theory vs Practice" id="win-rate-heading">Player Win Rate vs Theoretical Solvability</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                If 99.999% of deals are solvable, why do most players win only 75&ndash;85% of
                their games? The gap between theoretical solvability and practical win rate is
                one of the most interesting aspects of FreeCell&apos;s mathematics.
              </p>
              <p>
                A deal being &quot;solvable&quot; means there exists at least one sequence of
                legal moves that leads to a win. It does not mean that sequence is easy to find.
                Many solvable deals have a very narrow winning path &mdash; perhaps only a few
                valid opening moves out of dozens of options lead to a solution. One wrong
                choice early in the game can close off the winning line entirely.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Player Level</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Typical Win Rate</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Key Limiting Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Casual</td>
                      <td className="py-3 px-4">40&ndash;60%</td>
                      <td className="py-3 px-4">Moves made without forward planning</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Intermediate</td>
                      <td className="py-3 px-4">65&ndash;80%</td>
                      <td className="py-3 px-4">Fills free cells too early, misses narrow paths</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70 font-medium">Advanced</td>
                      <td className="py-3 px-4">82&ndash;92%</td>
                      <td className="py-3 px-4">Occasional mid-game misjudgments</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/70 font-medium">Expert (with undo)</td>
                      <td className="py-3 px-4">95&ndash;99%</td>
                      <td className="py-3 px-4">Only the most deceptively narrow deals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The gap narrows dramatically with undo. A player who uses undo to explore
                multiple lines of play can approach the theoretical limit because they are
                effectively testing many possible paths rather than committing to a single one.
                This is why FreeCell&apos;s undo feature is so important &mdash; it transforms
                the game from a single-shot attempt into a systematic search.
              </p>
          </ContentBody>
        </CardSection>

        {/* Free Cells and Move Space */}
        <CardSection id="move-space" variant="dark">
            <SectionHeading variant="dark" sub="The Formula" id="move-space-heading">Free Cells and the Move Space</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                The four free cells and the supermove mechanic are the mathematical heart of
                FreeCell. The maximum number of cards you can move in a single sequence is
                governed by a precise formula:
              </p>

              <div className="bg-[#072907] rounded-xl p-6 text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-4">
                  Supermove Formula
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-4">
                  (1 + <em>e</em>) &times; 2<sup><em>c</em></sup>
                </div>
                <p className="text-white/50 text-sm max-w-md mx-auto">
                  Where <em>e</em> = number of empty free cells and <em>c</em> = number of empty cascades
                </p>
              </div>

              <p>
                Notice the asymmetry. Empty free cells contribute <em>linearly</em> (addition),
                while empty cascades contribute <em>exponentially</em> (doubling). This
                mathematical structure is why experienced players treat empty cascades as far
                more valuable than free cells.
              </p>

              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Why the formula works this way</h3>
                <p className="text-sm leading-7">
                  Free cells hold one card each, so each empty free cell adds one unit to your
                  movement capacity. Empty cascades, however, can hold an entire ordered
                  sequence. When you move a large group of cards, you temporarily stash partial
                  sequences in empty cascades, execute the core move, then reassemble. Each
                  additional empty cascade lets you perform this split-and-reassemble at a deeper
                  level, doubling the total number of cards you can relocate.
                </p>
              </div>

              <p>
                With the maximum configuration (4 empty free cells and 4 empty cascades), you
                could theoretically move (1 + 4) &times; 2<sup>4</sup> = 80 cards at once. In
                practice, you never have 4 empty cascades because the cards have to be somewhere.
                But even one empty cascade makes a dramatic difference: it doubles your capacity
                compared to having none.
              </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Perfect Information */}
        <CardSection id="perfect-information" variant="dark">
            <SectionHeading variant="dark" sub="Game Theory" id="perfect-info-heading">Perfect Information and Planning Depth</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                In game theory, FreeCell is classified as a{' '}
                <strong className="text-white">perfect information</strong> game. All 52 cards
                are visible to the player from the first move. There are no hidden cards, no
                random events during play, and no opponent making secret decisions. This puts
                FreeCell in the same mathematical category as chess and Go, rather than with
                games like poker or Klondike that involve hidden information.
              </p>
              <p>
                Perfect information means that, in theory, you could calculate the optimal move
                at every decision point by analyzing the entire game tree. In practice, the game
                tree is far too large for a human to analyze completely (the number of possible
                game states is astronomical), but the principle matters: every piece of
                information you need to make the best possible decision is right in front of
                you.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">FreeCell (Perfect Information)</h3>
                  <ul className="space-y-2 text-sm leading-7">
                    <li>All 52 cards visible from the start</li>
                    <li>No random events during play</li>
                    <li>Outcomes determined entirely by player decisions</li>
                    <li>99.999% solvability with perfect play</li>
                  </ul>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Klondike (Imperfect Information)</h3>
                  <ul className="space-y-2 text-sm leading-7">
                    <li>Face-down cards hide critical information</li>
                    <li>Stock pile introduces randomness</li>
                    <li>Luck plays a significant role in outcomes</li>
                    <li>~30&ndash;40% solvability even with optimal play</li>
                  </ul>
                </div>
              </div>
              <p>
                This is the fundamental reason FreeCell feels so different from other solitaire
                games. When you lose a FreeCell game, it is almost always because you made a
                suboptimal decision somewhere &mdash; not because the cards were against you.
                That accountability is what makes FreeCell endlessly compelling for players who
                enjoy strategic depth.
              </p>
          </ContentBody>
        </CardSection>

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
          <SectionHeading variant="dark" sub="Read More">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/is-every-freecell-game-winnable" title="Is Every Game Winnable?" description="The practical answer to FreeCell's most common question, with advice for stuck positions." />
            <ContentLinkCard href="/freecell-game-11982" title="Deal #11982" description="The full history of the only proven unsolvable deal in the original Microsoft set." />
            <ContentLinkCard href="/deals" title="Browse Deals" description="Play specific numbered deals and track which ones you have solved." />
            <ContentLinkCard href="/strategy" title="Strategy Guide" description="Turn mathematical understanding into practical tactics for winning more games." />
            <ContentLinkCard href="/statistics" title="Statistics" description="Track your personal win rate and see how it compares to the theoretical maximum." />
            <ContentLinkCard href="/" title="Play FreeCell" description="Put the theory into practice with a free game." />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="See the Numbers in Action"
          body="Play a game of FreeCell and watch your win rate build over time. Track your statistics and see how close you can get to the theoretical limit."
          secondaryLabel="Try Deal #11982"
          secondaryHref="/freecell-game-11982"
        />
      </main>
    </ContentLayout>
  );
}
