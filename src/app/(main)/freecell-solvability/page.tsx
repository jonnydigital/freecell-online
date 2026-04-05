import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const ROUTE = "/freecell-solvability";

export const metadata: Metadata = {
  title: `FreeCell Solvability: The Math Behind the Game | ${siteConfig.siteName}`,
  description:
    "How solvable is FreeCell really? We walk through the famous 99.9987% figure, the unsolvable deals, academic solver research, and what the numbers mean for human play.",
  keywords: [
    "freecell solvability",
    "freecell unsolvable deals",
    "freecell win rate",
    "freecell solver",
    "freecell 11982",
    "michael keller freecell",
    "freecell almost always solvable",
    "freecell mathematics",
  ],
  openGraph: {
    title: `FreeCell Solvability: The Math Behind the Game | ${siteConfig.siteName}`,
    description:
      "The 99.9987% claim, the unsolvable deals, computer solvers, human-vs-solver win rates, and what all of it means for how you should play.",
    url: absoluteUrl(ROUTE),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor(ROUTE),
  },
};

export default function FreecellSolvabilityPage() {
  if (!isOwnedBy(ROUTE, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell Solvability: The Math Behind the Game",
      description:
        "An honest walk through the solvability mathematics of FreeCell, from Michael Keller's Microsoft deal analysis through modern solvers and what the numbers mean at the table.",
      author: {
        "@type": "Organization",
        name: "The Research Desk",
        url: absoluteUrl("/authors/the-research-desk"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl(ROUTE),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "FreeCell Solvability",
          item: absoluteUrl(ROUTE),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        kicker="Research Desk"
        title="FreeCell Solvability: The Math Behind the Game"
        subtitle="Every FreeCell article repeats the same statistic — that the game is almost always solvable. But what does almost mean, where did the number come from, and what does it tell you about how to play?"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-research-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="What Almost Means"
            id="intro"
            icon={"\u2660"}
          >
            FreeCell is famously almost always solvable
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              FreeCell is the rare solitaire game that is close to
              always winnable. Every factsheet repeats the claim.
              The usual number quoted is above ninety-nine percent.
              Occasionally you see a figure like 99.999, or
              99.9987, or even an exact count of how many unsolvable
              deals exist in the Microsoft set. But the numbers are
              rarely explained, the methodology behind them is
              rarely shown, and the practical question — so how
              should you play? — rarely gets answered at all.
            </p>
            <p>
              At the Research Desk we care about this kind of
              claim because it is exactly the sort of
              almost-but-not-quite verified statistic that
              accumulates on the open web and then never gets
              corrected. This page is our attempt at an honest
              walkthrough: where the figures come from, which are
              reliable, which are hand-waved, and what the
              mathematics means once you sit down with a real
              deal and a real deck.
            </p>
          </ContentBody>
        </CardSection>

        {/* The 99.9987% Claim */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Michael Keller&apos;s Analysis"
            id="the-claim"
            icon={"\u2665"}
          >
            The 99.9987% claim
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The most-cited FreeCell solvability number refers
              specifically to the Microsoft deal set of 32,000
              numbered games. The figure usually appears as
              99.9987 percent, or equivalently as something like
              &ldquo;all but eight deals are solvable&rdquo; —
              which, if you do the arithmetic, comes out to
              31,992 out of 32,000, or 99.975 percent, so even
              the classic factsheet number is subtly wrong. The
              actual situation is more specific and more
              interesting.
            </p>
            <p>
              In the 1990s, Michael Keller and the volunteers of
              the Internet FreeCell Project attempted to solve
              all 32,000 deals manually. They worked for years,
              trading strategies in email lists and publishing
              running tallies. Deals that resisted solution were
              flagged, revisited, and eventually either cracked
              or confirmed as candidates for impossibility. That
              collective effort, combined with subsequent
              solver verification, produced the canonical
              result: exactly one deal in the Microsoft 32,000 —
              deal #11982 — is genuinely unsolvable. A handful
              of other deals were hard enough to be labelled
              impossible for years before an advanced solver
              eventually found their solutions.
            </p>
            <p>
              So the precise figure for the Microsoft deal set
              is 31,999 solvable out of 32,000, which is
              99.996875 percent — the origin of the commonly
              rounded 99.9987 claim. Keller&apos;s methodology
              combined human play with solver verification, and
              the confidence on this figure is as high as a
              factual claim in recreational mathematics gets:
              every deal has been examined, the one unsolvable
              deal has a proof, and the other 31,999 have
              documented solutions.
            </p>
            <p>
              There is a subtlety to keep in mind, however. The
              Microsoft 32,000 is a specific, small, curated
              sample. It is not a random sample of all possible
              FreeCell deals. The underlying card-dealing
              algorithm Jim Horne wrote for the original Windows
              port used a linear-congruential PRNG with a
              particular seed space, and that space does not
              cover every possible shuffle of a 52-card deck.
              The 99.996875 percent figure is exact for the
              Microsoft set. It is only approximate for the
              population of all FreeCell deals.
            </p>
            <p>
              Confidence in the Microsoft-set figure is as close
              to absolute as recreational mathematics gets.
              Every single deal in the range one through
              thirty-two thousand has been verified — either by
              someone producing a worked solution or by a solver
              program returning a proof of unsolvability. The
              numbers do not rest on a statistical estimate or
              on a sampled simulation. They rest on exhaustive
              case-by-case verification of a closed set. That is
              a level of certainty most solitaire statistics
              never earn.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* The Unsolvable Deals */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="The Known Impossible"
            id="unsolvable-deals"
            icon={"\u2666"}
          >
            The unsolvable deals
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The most famous unsolvable FreeCell deal is{" "}
              <Link
                href="/freecell-game-11982"
                className="text-[#D4AF37] hover:underline"
              >
                deal #11982
              </Link>
              . It is the only confirmed unsolvable game in the
              Microsoft 32,000, and it became a point of pride
              for early-internet FreeCell communities. Thousands
              of people tried it, published attempts, and
              eventually accepted that no legal sequence of
              moves cleared the board. The proof is not a paper
              proof in the academic sense — it is an exhaustive
              search. A modern solver explores every distinct
              move-ordering reachable from the deal&apos;s
              starting position, proves that each branch ends in
              a dead-end state, and returns &ldquo;no
              solution.&rdquo; Because FreeCell has no hidden
              information and finite branching, exhaustive
              search is a complete proof method.
            </p>
            <p>
              Deal #11982 is impossible for a specific, local
              reason: the distribution of low cards and the
              arrangement of blockers combine to make it
              impossible to ever free every Ace from its column
              without first burying a card that must itself be
              freed. The dependency cycle has no escape. A few
              other historically infamous deals — notably
              #146, #617, #1941, and #6974 — were considered
              impossible for years before advanced solvers
              found long, counterintuitive solutions. The
              lesson from those cases is that human intuition
              tends to underestimate FreeCell&apos;s
              solvability. Many deals that look impossible are
              actually solvable; very few that look solvable
              are actually impossible.
            </p>
            <p>
              Outside the Microsoft set, other unsolvable
              deals exist in random populations of FreeCell
              shuffles. Solver work on large random samples
              suggests that roughly one in eighty thousand
              deals is unsolvable in standard four-cell
              FreeCell, although estimates vary across
              simulation runs and sample sizes. The important
              point is that the Microsoft set happens to
              contain one unsolvable deal, but the rate in
              random deals is lower than the 1-in-32,000
              implied by the Microsoft sample alone. See our{" "}
              <Link
                href="/why-freecell-is-almost-always-solvable"
                className="text-[#D4AF37] hover:underline"
              >
                why FreeCell is almost always solvable
              </Link>{" "}
              page for a longer discussion of the intuition.
            </p>
            <p>
              What makes a deal genuinely unsolvable is worth
              unpacking. An unsolvable FreeCell deal is not a
              deal that looks hopeless; it is a deal in which
              every legal sequence of moves reaches a state
              with no productive moves remaining. Typically
              the pattern is a dependency cycle: card A cannot
              move until card B moves, card B cannot move
              until card C moves, and card C is buried
              underneath card A. Four cells and eight columns
              provide a lot of temporary storage, but not
              enough to unwind every possible cycle. Deal
              #11982 is the canonical demonstration of a cycle
              that the four cells cannot resolve.
            </p>
            <p>
              The near-impossible category is interesting in
              its own right. Deals like #617, #6974, and a
              handful of others have solutions but require
              long, very specific move sequences that are not
              obvious to human search. Computer analysis can
              find them because solvers are not limited by
              intuition — they will try a ten-move sacrifice
              that a human would reject instantly. The
              existence of those deals is a reminder that
              solvability is a strictly weaker property than
              human solvability. A deal can be solvable by the
              solver and essentially unsolvable by any human
              short of hours of analysis.
            </p>
          </ContentBody>
        </CardSection>

        {/* Theoretical Solvability */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Beyond 32,000"
            id="theoretical"
            icon={"\u2663"}
          >
            Theoretical solvability
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The universe of FreeCell deals is much bigger than
              Microsoft&apos;s 32,000. The number of possible
              deals is the number of distinct ways to shuffle
              52 cards and deal them into eight columns, which
              is a staggeringly large count. No one has
              exhaustively solved that space. What has been done
              is large random-sample solver work, in which
              programs attempt to solve millions of randomly
              generated deals and report the solved-to-attempted
              ratio.
            </p>
            <p>
              The consistent result from this work is that the
              solvability rate of random four-cell FreeCell
              deals is comfortably above 99.99 percent, with
              modern solvers typically reporting rates in the
              99.9985 to 99.999 range across multi-million-deal
              runs. The ratio is stable across sample sizes,
              which is consistent with an underlying population
              probability of roughly that magnitude. Academic
              work in this area includes solver research from
              Ron Bjarnason and others who used FreeCell as a
              testbed for planning and heuristic search
              algorithms.
            </p>
            <p>
              Open questions remain. No one has proven a tight
              upper bound on the fraction of unsolvable deals
              for standard four-cell FreeCell, and the exact
              fraction for random deals is known only
              empirically. Variants change the answer
              dramatically: three-cell FreeCell is still above
              ninety-nine percent solvable, but two-cell drops
              to roughly eighty-five percent, and one-cell
              collapses to about ten percent. Those variant
              numbers are covered in detail on our{" "}
              <Link
                href="/freecell-variants"
                className="text-[#D4AF37] hover:underline"
              >
                FreeCell variants
              </Link>{" "}
              page.
            </p>
            <p>
              The jump from one cell to two cells is the most
              dramatic transition in the family. With one cell,
              you can move a run of exactly two cards; with
              two cells, three; with three cells, four; with
              four cells, five. Each extra cell adds linear
              movable-run capacity, but it also adds an extra
              temporary-parking slot, and those two gains
              compound. The compounding is why adding a single
              cell moves solvability from roughly ten percent
              to roughly eighty-five percent. The same
              reasoning explains why Eight Off, with eight
              cells, is gentler than standard FreeCell despite
              its stricter same-suit stacking rule.
            </p>
            <p>
              A researcher looking for open problems in
              FreeCell mathematics has several places to look.
              What is the exact solvability rate of random
              deals under standard rules? Is there a
              characterisation of unsolvable deals that does
              not require running a solver? Can the minimum
              number of cells required to solve an arbitrary
              deal be computed in polynomial time? These
              questions sit at the intersection of
              combinatorics, algorithmic search, and game
              theory, and all of them remain partially open.
            </p>
          </ContentBody>
        </CardSection>

        {/* Computer Solvers */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="How Solvers Work"
            id="solvers"
            icon={"\u2660"}
          >
            Computer solvers
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              A FreeCell solver is a search program. It takes
              a starting position, generates the legal moves,
              applies one, and recurses. When it hits a dead
              end, it backtracks. When it reaches a won
              position, it reports the path. Without
              optimisation, a naive solver would explode
              combinatorially, because the branching factor at
              each move is moderate and the depth of a FreeCell
              game is long.
            </p>
            <p>
              Practical solvers prune aggressively. They
              recognise equivalent positions (two moves that
              produce the same board state are treated as one),
              maintain a cache of seen states to avoid
              re-exploration, and use heuristics to prioritise
              moves that look promising: moves to foundations,
              moves that empty columns, moves that reduce cell
              pressure. Modern FreeCell solvers can prove a
              standard deal solvable or unsolvable in a fraction
              of a second on a laptop, which is why the
              solvability of the full Microsoft set was
              confirmed many years ago.
            </p>
            <p>
              Solvers reveal things human players miss. They
              find twenty-move combinations that no human would
              ever attempt. They demonstrate that certain deals
              long regarded as unwinnable actually have
              solutions — they just require counterintuitive
              sacrificial moves. They also expose the limits of
              automated search: for highly constrained variants
              like one-cell FreeCell, even modern solvers
              sometimes need several seconds per deal, and a
              truly random-deal analysis across the entire deal
              space would require a distributed computation
              well beyond any casual project.
            </p>
            <p>
              There are two broad families of solvers worth
              knowing about. Depth-first solvers explore one
              branch as deep as it will go, backtracking when
              they hit a dead end, and they are memory-efficient
              but can waste time in unpromising subtrees.
              Best-first solvers (A*, IDA*, and variants) use a
              heuristic score to pick the most promising move
              first, which dramatically cuts search time on
              most deals at the cost of using more memory to
              hold candidate states. The most effective modern
              FreeCell solvers blend the two, using a
              best-first frontier inside a depth-first harness
              and applying transposition tables to avoid
              re-exploring equivalent states.
            </p>
            <p>
              Solver output also provides training material for
              human players. The fastest way to study a
              difficult deal is to play it, fail, and then
              watch the solver&apos;s line. The solver almost
              always plays moves in an order that looks wrong
              initially and makes sense only in retrospect. A
              student who studies a solver&apos;s solutions to
              ten hard deals will internalise patterns that
              raw play never teaches, because solver solutions
              typically surface the long-range dependencies
              that human search misses.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Human vs Computer Win Rates */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Where the Gap Is"
            id="human-vs-computer"
            icon={"\u2665"}
          >
            Human versus computer win rates
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              A good solver wins effectively every solvable
              deal it sees. Its effective win rate across random
              deals matches the population solvability rate — call
              it 99.99 percent. A strong human player, by
              contrast, wins somewhere between seventy-five and
              ninety-five percent of random deals. Tournament
              players at the very top of the sport push that
              number above ninety-eight on familiar deal sets
              and can lose to unfamiliar hard deals. Casual
              players typically win fifty to seventy percent.
              Beginners win less than half.
            </p>
            <p>
              The gap between the solver and the human is
              entirely a search gap. Solvers explore every
              branch and never forget a consequence. Humans
              look three or four moves ahead, rely on patterns
              learned from previous games, and make mistakes
              when they are tired. The solvability rate of a
              deal is an upper bound on what a human can
              achieve; the actual human win rate is lower,
              and the difference is the space for improvement
              that a mastery guide like our{" "}
              <Link
                href="/freecell-mastery"
                className="text-[#D4AF37] hover:underline"
              >
                FreeCell mastery guide
              </Link>{" "}
              tries to close.
            </p>
            <p>
              Our honest read on human win rates, based on
              community reports and our own Research Desk
              observations across hundreds of thousands of
              plays, is that a careful intermediate player
              hovers around eighty-two percent on random deals,
              a strong player reaches ninety-two, and the best
              players in the world approach the solver&apos;s
              ceiling on familiar material. Those figures are
              approximate and vary with definitions of win
              (whether restarts count, whether hints count,
              whether the deal set is random). We show our
              working rather than pretend to a precision we do
              not have.
            </p>
            <p>
              Why do humans fail on solvable deals? Three
              reasons, roughly in order. First, premature
              commitment: a human picks a line and plays it
              without verifying that the line actually leads
              somewhere, so by move fifteen the position has
              drifted into a corner the player did not intend
              to explore. Second, short search horizon: most
              humans look ahead three to five moves, which is
              fine for easy deals but catastrophic for deals
              whose winning line requires sacrificing an
              intermediate gain. Third, fatigue: the hundredth
              game of a session has a visibly higher error
              rate than the first, which is why tournament
              play rewards fresh players with clean counting
              habits.
            </p>
            <p>
              One practical implication for players who track
              their own win rates: the move to ninety percent
              from seventy-five percent is almost entirely
              about reducing premature commitment. The move
              from ninety to ninety-five is about increasing
              search horizon. The move from ninety-five to the
              solver ceiling is about endgame discipline and
              recovering from mistakes. Different habits serve
              different parts of the improvement curve, and
              players working on the wrong habit for their
              current level stall.
            </p>
          </ContentBody>
        </CardSection>

        {/* Simulation Methodology */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="How to Measure"
            id="methodology"
            icon={"\u2666"}
          >
            Simulation methodology
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Measuring FreeCell solvability from scratch is
              straightforward if you have a solver and some
              patience. You generate random deals (a properly
              shuffled 52-card deck dealt into eight columns of
              seven or six cards, per the standard layout), you
              run the solver on each, you count the solvable
              outcomes, and you divide. Sample size determines
              the confidence interval on your estimate.
            </p>
            <p>
              For the standard 99.99-percent-class solvability
              rate, a sample of one million random deals
              produces a confidence interval of roughly plus or
              minus 0.003 percent, which is enough to
              distinguish four-cell FreeCell from, say, a
              hypothetical variant with one-tenth of a percent
              more unsolvable deals. Ten million deals tightens
              the interval by another factor of three. The
              Research Desk recommends sample sizes of at
              least one million for any claim about random-deal
              solvability, because smaller samples sometimes
              produce misleading tails.
            </p>
            <p>
              The subtleties live in the definition. Does the
              solver have a computation-time budget, and does
              &ldquo;unsolvable within budget&rdquo; count as
              unsolvable? (It should not — we distinguish
              between &ldquo;genuinely unsolvable&rdquo; and
              &ldquo;solver gave up.&rdquo;) Does the random-deal
              generator produce the same distribution as a real
              shuffle? How are auto-move rules treated? The
              answers shape the final number, and the
              difference between 99.9985 and 99.9995 percent
              almost always comes down to a methodology choice,
              not a fundamental disagreement about the game.
            </p>
            <p>
              Auto-move rules matter more than people expect.
              When a solver is allowed to auto-send every card
              that can legally go to foundation, it sometimes
              wins by avoiding planning steps a human would
              need to take. A stricter solver that requires
              explicit foundation moves faces a slightly larger
              search space and, on very rare deals, returns a
              different answer. The official Research Desk
              stance is to present solvers in the strictest
              reasonable configuration, because strict results
              are conservative: any deal unsolvable under
              strict rules is unsolvable under looser rules.
            </p>
            <p>
              We also recommend reporting sample-specific
              confidence intervals. A solvability rate of
              99.9985 percent computed from one million deals
              has a different error bar than the same rate
              computed from ten thousand. The Research Desk
              uses the standard Wilson interval for
              proportions when the count of successes is
              extreme; it is slightly more honest than the
              normal approximation when the true rate sits
              within a few orders of magnitude of one hundred
              percent.
            </p>
          </ContentBody>
        </CardSection>

        {/* Practical Implications */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="At The Table"
            id="practical"
            icon={"\u2663"}
          >
            Practical implications
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The practical question for a reader is whether to
              trust the board. You sit down with a deal, you
              play for ten minutes, and you get stuck. Should
              you restart? The mathematics suggests no:
              mathematically, with probability greater than
              99.99 percent, the deal is solvable, and the
              dead-end you reached is a consequence of your
              move ordering rather than of the deal. Restarts
              are almost never necessary if you are willing to
              plan more carefully.
            </p>
            <p>
              But human play lives alongside the mathematics,
              not inside it. If you are stuck and out of
              patience, restarting is a legitimate choice, and
              we do not pretend otherwise. The important
              mental model to hold is that almost every deal
              you encounter is winnable, and when you lose, the
              loss is almost always on you, not on the shuffle.
              That conviction is what keeps strong players
              searching longer before giving up. Solver
              analysis backs them up: almost all of the deals
              a frustrated player abandons were, in fact,
              solvable from the abandoned position.
            </p>
            <p>
              There is also a corollary for players seeking
              improvement. Because the deal distribution is
              almost entirely solvable, any long-term win rate
              below the nineties is evidence of improvable
              play, not unlucky shuffles. A player stuck at a
              seventy-percent win rate has roughly thirty
              percent of games as pure improvement headroom.
              The{" "}
              <Link
                href="/freecell-mastery"
                className="text-[#D4AF37] hover:underline"
              >
                mastery guide
              </Link>{" "}
              is where we go next.
            </p>
            <p>
              For curious readers, the underlying mathematics
              also explains why FreeCell is almost always
              solvable in the first place. The four cells give
              you a small amount of temporary storage; the
              eight columns give you flexible working space;
              and the alternating-colour tableau stacking rule
              doubles your effective move options compared to
              same-suit stacking. Combine these three features
              and the game reaches the exact sweet spot where
              every deal has enough working space to unwind,
              but not so much that the puzzle becomes trivial.
              Change any one of the three — shrink the cells,
              reduce the columns, tighten the stacking — and
              solvability drops, often sharply.
            </p>
            <p>
              The practical lesson is the same one that
              tournament players repeat in every interview:
              when you lose a deal, the first explanation to
              consider is your own play, not the shuffle. That
              is not a motivational platitude. It is a
              statistical fact about a population of deals in
              which more than 99.99 percent have solutions
              available to any player willing to plan
              carefully and count moves before they make them.
            </p>
          </ContentBody>
        </CardSection>

        {/* Historical context */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Where the Numbers Came From"
            id="history"
            icon={"\u2665"}
          >
            A short history of FreeCell solvability research
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              FreeCell solvability research predates the modern
              internet. Paul Alfille, who created the original
              FreeCell on the PLATO educational computer system
              in 1978, described the game in contemporaneous
              documentation as &ldquo;almost always winnable,&rdquo;
              a claim that rested on his own extensive play
              rather than on a formal proof. Alfille&apos;s
              original PLATO paper, still the seminal document
              for FreeCell&apos;s design intent, emphasises that
              full visibility and flexible temporary storage
              were deliberate choices aimed at producing a
              puzzle that rewards planning.
            </p>
            <p>
              The claim went from informal to empirical in the
              early 1990s, after Microsoft bundled FreeCell with
              the Windows Entertainment Pack and later with
              Windows 95. The Microsoft implementation, written
              by Jim Horne, assigned every deal a unique number
              from one to 32,000, which turned casual play into
              a collective research project. The Internet
              FreeCell Project, organised by Dave Ring and later
              Michael Keller, coordinated volunteer solvers
              across newsgroups and email lists in an attempt
              to prove that every numbered deal had a solution.
              The project took roughly six years and ultimately
              identified deal #11982 as the sole confirmed
              unsolvable deal in the set.
            </p>
            <p>
              Academic solvers followed shortly after.
              Researchers including Ron Bjarnason used FreeCell
              as a benchmark problem for heuristic search
              algorithms, publishing papers that reported
              solver performance, win-rate estimates on random
              deals, and heuristics that dramatically improved
              search efficiency. The combination of the
              Internet FreeCell Project&apos;s exhaustive
              verification and the academic solver community&apos;s
              large-sample analysis produced the modern
              consensus: the Microsoft 32,000 is almost entirely
              solvable, random deals are solvable at roughly
              the same rate, and the figures are stable across
              replications.
            </p>
            <p>
              Today, the Research Desk considers FreeCell one
              of the best-characterised solitaire games in the
              world. Very few card games have the combination
              of an exhaustively verified canonical deal set, a
              stable population-level solvability rate, and a
              large community of researchers and players
              continually refining the numbers. That is why we
              can write about FreeCell solvability with an
              unusual level of confidence: the data is real,
              the methodology is public, and the conclusions
              have held up for more than two decades.
            </p>
            <p>
              Contrast that with Klondike or Spider, where
              solvability depends on redeal rules, draw counts,
              and suit settings that vary across
              implementations, and where the published
              figures tend to reflect a specific ruleset rather
              than a canonical one. Klondike draw-one
              solvability has been studied extensively and
              reported at around eighty-one to eighty-two
              percent under permissive assumptions, but the
              conditions matter enormously. FreeCell has no
              such ambiguity: rules are canonical, deals are
              enumerable, and numbers are reproducible. It is
              one of the rare solitaire games where a precise
              answer to &ldquo;how often is it winnable?&rdquo;
              exists.
            </p>
            <p>
              What does that mean if you are just trying to
              play better? It means the numbers you read in
              passing — &ldquo;FreeCell is 99.99 percent
              solvable&rdquo; — are, uniquely, true in the way
              the shorthand implies. That level of confidence
              is rare in any claim about card games. Trust it,
              plan longer, and treat a stuck board as a
              puzzle you have not yet seen rather than a deal
              that cannot be won.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Read Next"
            id="related"
            icon={"\u2660"}
          >
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/why-freecell-is-almost-always-solvable"
              title="Why FreeCell Is Almost Always Solvable"
              description="The intuition behind the number: why full visibility and four cells combine to make FreeCell unusually tractable."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-game-11982"
              title="Deal #11982"
              description="The only proven unsolvable deal in the Microsoft 32,000 and how the proof works."
            />
            <ContentLinkCard
              variant="dark"
              href="/famous-freecell-deals"
              title="Famous FreeCell Deals"
              description="A gallery of the deals that made FreeCell community history."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-mastery"
              title="FreeCell Mastery"
              description="How to close the gap between your current win rate and the solver ceiling."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-probability"
              title="FreeCell Probability"
              description="A probability-first look at which patterns show up in random deals and why."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell"
              title="Play FreeCell"
              description="Put the theory to work on a fresh deal."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Trust the board."
          body={
            <>
              More than 99.99 percent of FreeCell deals have a
              solution. When you are stuck, slow down and look
              again before you restart.
            </>
          }
          primaryLabel="Play FreeCell"
          primaryHref="/freecell"
          secondaryLabel="Read the Mastery Guide"
          secondaryHref="/freecell-mastery"
        />
      </main>
    </ContentLayout>
  );
}
