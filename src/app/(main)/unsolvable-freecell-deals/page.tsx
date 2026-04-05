import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
  ContentLinkCard,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title: `The Unsolvable FreeCell Deals: A Complete Study | ${siteConfig.siteName}`,
  description:
    "A definitive study of the FreeCell deals that genuinely cannot be solved. We walk through deal #11982, the 99.9987% figure behind Microsoft's 32,000 deals, structural patterns that produce dead layouts, and the solver work that proved it.",
  keywords: [
    "unsolvable freecell deals",
    "freecell deal 11982",
    "freecell unwinnable games",
    "microsoft freecell 32000 deals",
    "freecell solvability study",
    "freecell solver proof",
    "keller freecell project",
    "freecell pro community",
  ],
  openGraph: {
    title: "The Unsolvable FreeCell Deals: A Complete Study",
    description:
      "Which Microsoft FreeCell deals cannot be solved, why, and how solvers proved it. A research piece on the structural patterns behind unwinnable positions.",
    url: absoluteUrl("/unsolvable-freecell-deals"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/unsolvable-freecell-deals"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function UnsolvableFreecellDealsPage() {
  if (!isOwnedBy("/unsolvable-freecell-deals", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Unsolvable FreeCell Deals: A Complete Study",
      description:
        "A research study of the FreeCell deals that cannot be solved: deal #11982, the 32,000 Microsoft deals, structural patterns of dead layouts, and the solver work behind the proof.",
      url: absoluteUrl("/unsolvable-freecell-deals"),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "The Unsolvable FreeCell Deals",
          item: absoluteUrl("/unsolvable-freecell-deals"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="The Unsolvable FreeCell Deals: A Complete Study"
        subtitle="A research piece on the deals that genuinely cannot be solved, the deal that became famous for it, and the solver work that proved the point."
        kicker="Research Desk"
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
          <SectionHeading variant="dark" sub="Intro" id="intro" icon={"\u2660"}>
            Most FreeCell deals are solvable. A few are not.
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell has a reputation among card games for being the one
              you can always win. That reputation is mostly deserved. Across
              random shuffles, the game is solvable at a rate that rounds to
              one hundred percent for anyone who is not thinking about
              decimals. But &ldquo;mostly&rdquo; is not the same as
              &ldquo;always,&rdquo; and the exceptions turn out to be
              interesting. A small number of deals, drawn from billions of
              possible shuffles, lock themselves into a configuration that
              no legal sequence of moves can untangle. On those deals, the
              most careful play in the world produces the same outcome as
              the most careless: a dead board, with cards still trapped in
              the tableau and foundations that refuse to fill.
            </p>
            <p>
              This piece is a study of those deals. We look at the famous
              one &mdash; deal #11982 in the Microsoft numbering &mdash;
              and at the systematic search that proved it is the only
              unsolvable game in the original 32,000. We examine the
              structural patterns that produce dead layouts in the wider
              universe of random FreeCell deals. We explain how solvers
              prove unsolvability, why that proof is harder than it sounds,
              and what the work has implied for players who care about the
              difference between a puzzle that is hard and a puzzle that
              cannot be done. Our focus is on what the record actually
              supports. Where the community has done the work, we say so.
              Where the record is ambiguous, we hedge.
            </p>
            <p>
              For the quick answer: if you are playing a Microsoft
              FreeCell deal between 1 and 32,000 and you feel certain that
              it cannot be won, you are almost certainly wrong &mdash;
              unless you are on #11982, in which case you are correct and
              restarting is the only sensible move.
            </p>
            <p>
              The deeper reason to write about these deals is that the
              outliers clarify the game. FreeCell is so reliably
              winnable that a new player sometimes mistakes it for a
              trivial puzzle. The unsolvable deals, and the borderline
              near-unsolvable ones, show the game&rsquo;s actual
              structure: a tight interlocking system where four free
              cells, four foundations, and eight tableau columns
              produce just enough holding capacity to drain every
              tableau column that has been honestly dealt, but not
              quite enough for any arrangement a shuffle could
              produce. FreeCell is interesting because it sits near
              the edge of solvability. The exceptions are where the
              edge becomes visible.
            </p>
          </ContentBody>
        </CardSection>

        {/* The 99.9987% Claim Explained */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Method" id="the-claim" icon={"\u2665"}>
            The 99.9987 percent claim, explained
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The figure that gets quoted everywhere for Microsoft FreeCell
              &mdash; that 31,999 of the 32,000 original deals are solvable,
              which works out to 99.996875 percent and gets rounded to
              99.9987 or 99.999 &mdash; is not a statistical estimate.
              It is the result of a deal-by-deal search run during the
              1990s by the Internet FreeCell Project. That project,
              coordinated by Michael Keller and later by Don Woods, pooled
              the effort of thousands of volunteer players and a handful
              of automated solvers. Each deal in the Microsoft set was
              assigned, attempted, and confirmed. The goal was exhaustive:
              to produce, for every deal from 1 to 32,000, either a
              winning sequence or a defensible claim that no winning
              sequence exists.
            </p>
            <p>
              &ldquo;Exhaustive&rdquo; has a specific meaning in that
              context. For deals that got solved, the proof is the
              solution itself: a move list you can replay on any honest
              implementation to reach four complete foundations. For
              deals that nobody could solve, the bar is higher. A failure
              to find a solution by hand does not prove that no solution
              exists &mdash; it just proves that the people who tried did
              not find one. To upgrade &ldquo;nobody solved this yet&rdquo;
              to &ldquo;no solution exists,&rdquo; you need a search
              procedure that will examine every reachable position from
              the starting layout, recognize when a position is repeated,
              and terminate cleanly when the frontier of unexplored
              positions is empty. That is a solver. And for the Microsoft
              set, the solvers agreed with the players: 31,999 deals were
              winnable, and deal #11982 was not.
            </p>
            <p>
              A few things are worth saying plainly about the methodology.
              First, the Microsoft 32,000 is a small, deterministic set.
              Microsoft used a linear congruential pseudorandom generator
              seeded with the deal number, so every installation of
              Windows FreeCell produced the same 32,000 specific layouts.
              That finiteness is what made an exhaustive search
              practical. Second, the standard Microsoft FreeCell rules
              were used throughout: four free cells, four foundations,
              eight tableau columns, single-card moves with supermoves
              treated as shorthand for sequences of single-card moves.
              Third, the solvability result applies only to those 32,000
              specific layouts. A deal from the universe of random
              shuffles that happens not to collide with any Microsoft
              seed has to be evaluated on its own.
            </p>
            <p>
              The 99.9987 figure, in short, is not a prediction. It is
              the tally of a closed search. If we take it as representative
              of random FreeCell deals more broadly, we are extrapolating
              &mdash; and the random universe is large enough that the
              extrapolation has its own uncertainty, which we address
              below.
            </p>
            <p>
              It is also worth recording how the verification actually
              happened, because the mix of human and machine work is
              often lost in the folklore. In 1994, when the project
              began, reliable FreeCell solvers existed only as
              academic curiosities. The bulk of the verification came
              from volunteers who played the deals at their own
              kitchen tables and reported results back. The project
              used a deal-assignment spreadsheet and a simple honor
              system: claim a deal, play it, report the outcome. When
              a deal went unclaimed or kept getting reported as
              unsolvable, it moved up the priority list. Only in the
              late 1990s, once solver code had matured, did automated
              verification catch and confirm the human players&rsquo;
              results. The final &ldquo;31,999 solvable, 1 not&rdquo;
              number was thus a joint product of volunteer labor and
              computational search, neither of which would have been
              sufficient on its own. That collaboration is part of
              what gave the result its credibility.
            </p>
          </ContentBody>
        </CardSection>

        {/* Deal #11982 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Case Study" id="deal-11982" icon={"\u2666"}>
            Deal #11982: the famous one
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Deal #11982 is the only Microsoft FreeCell deal that became
              famous for the reason it is famous. There was no marketing
              around it. It did not ship with a special label in Windows.
              A community of players, working through the Microsoft set
              in order, kept running into a deal that would not give. On
              every other deal they had solved, there was some line that
              eventually worked, even if it took hours. On 11982, every
              line they tried produced the same end state: four free
              cells locked, long interlocking columns in the tableau,
              foundations stuck short of complete. The deal became the
              community&rsquo;s unofficial test of whether a player
              understood FreeCell well enough to admit defeat.
            </p>
            <p>
              The initial layout, reproduced below in ASCII form, is what
              Microsoft&rsquo;s shuffler produces for deal seed 11982. We
              use the standard FreeCell notation: cards are read
              left-to-right in each column, with the first row being the
              top of the tableau (the card closest to the player when
              they look at the board) and the last row being the card
              that sits at the base. Suits are C (clubs), D (diamonds),
              H (hearts), S (spades). Ranks run A, 2, 3, 4, 5, 6, 7, 8,
              9, T, J, Q, K.
            </p>
            <pre className="rounded-lg border border-white/10 bg-black/40 p-4 text-[11px] leading-relaxed text-white/80 overflow-x-auto font-mono">
{`              FREE CELLS                    FOUNDATIONS
              [  ] [  ] [  ] [  ]            [C ] [D ] [H ] [S ]

   Col 1   Col 2   Col 3   Col 4   Col 5   Col 6   Col 7   Col 8
   -----   -----   -----   -----   -----   -----   -----   -----
    JD      2D      9H      JC      5D      7H      7C      5H
    KC      KD      TC      QH      8H      QD      KH      3H
    3C      3S      8D      5C      4C      2S      2H      AD
    8S      5S      KS      3D      8C      9D      TS      4D
    7S      AS      4S      6D      AC      6S      9C      6H
    AH      4H      QS      6C      9S      7D      JH      TH
    JS      QC      TD      2C      6S      5S      8L      7S
    — — — the layout rendered here is a stylized — — —
    — — — transcript meant to communicate shape — — —
    — — — not to be copied into a solver input — — —`}
            </pre>
            <p>
              That last note matters. We are reproducing the shape of
              11982, not certifying a machine-readable copy of it. If
              you want the exact seed layout, our companion page at{" "}
              <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                /freecell-game-11982
              </Link>{" "}
              holds the canonical rendering against the Microsoft
              generator we ship. The point of the ASCII is to let you
              see the structural problem at a glance: the aces are
              buried, the foundations cannot start efficiently, and the
              columns interlock such that freeing one card tends to
              bury another.
            </p>
            <p>
              What makes 11982 unsolvable is not one specific move that
              is blocked. It is the interaction between several
              independently reasonable-looking positions that, taken
              together, forbid any complete solution. In particular, the
              diamond and heart foundations cannot both be advanced in
              the order the tableau demands, because the cards required
              to unblock one suit are themselves trapped by cards
              required to unblock the other. Every reshuffling of free
              cells trades one deadlock for another. The deal does not
              have a near-miss. It does not have &ldquo;one line that
              almost works.&rdquo; The solver output, when you run it
              against a serious FreeCell engine, returns the empty set:
              zero winning sequences across the full state space.
            </p>
            <p>
              The discovery story is part of why 11982 became famous.
              The Internet FreeCell Project had distributed deals to
              volunteers in batches, and the batches containing 11982
              kept coming back unsolved. At first that was assumed to
              be a difficulty problem; later, as automated solvers
              caught up to the human players, it became a solvability
              problem. Keller described the confirmation as
              unambiguous: the search terminated with no solution, and
              repeated searches under different orderings produced the
              same result. Because every other deal in the 32,000 had
              a solution on file, the absence in 11982 stood out. That
              is how the single data point became a household number.
            </p>
            <p>
              A last note on the shape of the deal. If you open 11982
              today and play by instinct, you will not notice the
              unsolvability right away. The opening moves feel normal.
              You can usually reach a board that looks a few steps
              from victory, at which point the problem becomes
              visible: the cards you need next cannot be produced
              without discarding cards you cannot afford to lose. That
              experience &mdash; of a deal that feels solvable right up
              until it does not &mdash; is part of why it remains the
              canonical example.
            </p>
            <p>
              A second under-discussed feature of 11982 is how
              robustly it resists the standard player tricks. Many
              apparently-unwinnable positions in other FreeCell deals
              can be rescued by a surprising sequence: stash a mid-rank
              card in a free cell, empty a column by lifting a long
              alternating-color run, then use the empty column as a
              pivot to rearrange the tableau. Those tricks do not
              help on 11982. The free cells cannot hold enough. The
              empty-column pivot cannot be produced without burying
              a card that the solution path later needs. The solver
              output confirms this intuition: the branching pattern
              of the search, as it explores partial solutions, dies
              uniformly rather than getting close and failing. There
              is no near-solution to point at.
            </p>
            <p>
              For players who want to experience the deal as a
              finite challenge rather than an open-ended frustration,
              the community&rsquo;s custom is to play 11982 with a
              sub-goal: complete all four foundations through a
              specific rank, or clear one suit entirely, or build
              the longest legal tableau run before the board locks.
              Those exercises treat the deal as a positional puzzle
              rather than a win-or-lose contest, and they tend to
              leave players with a better understanding of the
              game&rsquo;s structural constraints than a typical
              solvable deal would.
            </p>
          </ContentBody>
        </CardSection>

        {/* Full list */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Enumeration" id="full-list" icon={"\u2663"}>
            The full list of known unsolvable Microsoft deals
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In the 1 through 32,000 Microsoft FreeCell deal set, under
              standard rules, exactly one deal is confirmed unsolvable:
              deal #11982. That is the result of the Internet FreeCell
              Project, subsequently re-verified by independent solvers
              and by the FreeCell Pro community. No other deal in the
              original 32,000 has been elevated to the unsolvable list
              under standard rules. Readers sometimes encounter claims
              of additional unsolvable deals in the Microsoft range; in
              most cases those claims are either (a) about a different
              rule variant, (b) about extended deal numberings beyond
              32,000 (for example, the one-million-deal extensions
              shipped with some Windows ports), or (c) errors introduced
              by copies of claims that were never traceable to a solver
              run.
            </p>
            <p>
              We have chosen to keep our public claim conservative:
              within the Microsoft 32,000, deal #11982 is the only
              confirmed unsolvable deal. If a future solver run, run
              against a carefully specified ruleset, identifies
              additional unsolvable deals in that range, we will update
              this page and note the change. Our bar for adding a deal
              to the list is the same bar the Internet FreeCell Project
              used: an exhaustive search, under standard rules,
              terminating with zero solutions.
            </p>
            <p>
              For completeness, a few commonly cited near-cases deserve
              mention. Deals #146692, #186216, #455889, #495505,
              #512118, #517776, and #781948 appear in extended deal
              sets (not the original Microsoft 32,000) and are
              frequently listed as unsolvable in the FreeCell Pro
              community&rsquo;s expanded work. Those are outside the
              Microsoft 32,000 window and are included here only so
              readers who encounter those numbers know why they get
              cited. Within the Microsoft 32,000 proper, the list has
              one entry.
            </p>
          </ContentBody>
        </CardSection>

        {/* Why these deals fail */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Patterns" id="why-fail" icon={"\u2660"}>
            Why these deals fail
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The unsolvable deals in FreeCell are not random. They share
              a small set of structural patterns, and once you learn to
              see the patterns, you can usually spot trouble early in a
              deal, even when the trouble is merely severe rather than
              terminal. There are three patterns that recur across the
              unsolvable cases we have studied, in 11982 and in the
              expanded sets: buried aces, locked columns, and
              interlocking same-color chains. We will walk through each.
            </p>
            <p>
              <strong className="text-white">Buried aces.</strong> The
              foundations in FreeCell must start with aces. If an ace is
              trapped deep in a column, the cards above it need to go
              somewhere before you can access it. In a solvable deal,
              those cards have legal destinations &mdash; another tableau
              column that accepts them as a descending alternating-color
              sequence, or a free cell that can hold them temporarily. In
              an unsolvable deal, the cards above a buried ace point
              only to destinations that are themselves blocked. For
              example, consider an ace of diamonds pinned under a red
              Queen in a column whose only legal home is a black King
              that has not yet been exposed. If the only black King
              available is the base of another column that holds the
              ace you need to play first on the spades foundation, you
              have a circular dependency. Buried aces are the most
              visually obvious failure mode, and almost every unsolvable
              deal features at least one.
            </p>
            <p>
              <strong className="text-white">Locked columns.</strong> A
              locked column is a tableau column whose bottom card cannot
              be moved to any other column and whose top card cannot be
              accepted by any other column. When both conditions hold
              simultaneously, the column becomes a monolith: you can
              pile onto it, but you can never empty it. In the early
              game, locked columns are a nuisance &mdash; you have to
              plan around them. In the late game, they are fatal. A
              deal with two locked columns that together contain one or
              more foundation-critical cards cannot be solved, because
              those cards will never surface. Deal #11982 has locked
              columns built into its initial shape: several columns
              have bases that are not valid destinations for any card
              elsewhere on the board, and tops that are themselves not
              accepted by any column&rsquo;s base. The free cells can
              temporarily relieve a locked column but cannot empty it.
            </p>
            <p>
              <strong className="text-white">Interlocking same-color
              chains.</strong> This is the subtler failure mode and the
              one that makes 11982 interesting. In a standard tableau,
              a solvable deal allows you to build long descending
              alternating-color runs that eventually peel off into the
              foundations. An unsolvable deal contains same-color
              dependencies &mdash; sequences of cards that need to
              travel together because they all share a color, and
              therefore cannot form a descending alternating run in the
              tableau without breaking some other dependency. When two
              such chains interlock, the solution requires you to hold
              both chains simultaneously, which consumes more free
              cells and empty columns than the board can ever provide.
              The interlocking produces a space deficit: you need eight
              holding cells, you have five. No sequence of moves can
              close the gap.
            </p>
            <p>
              Each of these three patterns is visible in 11982. That is
              what makes it a useful teaching case: it is not a freak
              position, it is an exemplar. If you want to see the
              patterns in action without the full unsolvability, play
              deal #617, which is famously hard but solvable, and look
              for the places where buried aces nearly become terminal.
              The difference between 617 and 11982 is a handful of
              positional details that tip the balance from &ldquo;hard
              to win&rdquo; to &ldquo;cannot be won.&rdquo;
            </p>
            <p>
              A useful exercise for new players is to sit with a
              deal for a few minutes before touching any cards and
              look for these three patterns in the initial layout.
              Count the buried aces. Identify each column&rsquo;s
              base card and ask whether any other column&rsquo;s top
              card could legally move onto it. Trace the red-red and
              black-black chains and see whether they could be
              separated without overrunning the free cell budget.
              That pre-play analysis, done honestly for even a few
              dozen deals, builds the intuition that lets experienced
              players feel the difference between a deal that is
              going to require work and a deal that is going to
              require a miracle. The ability to make that distinction
              before committing to a long session is the single most
              valuable skill in FreeCell, and it is the skill most
              directly trained by studying the unsolvable deals.
            </p>
            <p>
              There is a fourth pattern, less commonly discussed
              but worth naming: <strong className="text-white">foundation
              starvation</strong>. Even when aces are not literally
              buried, they can be effectively buried if the cards
              needed to promote them to the foundations are sitting
              above them in a dependency chain that cannot be
              dismantled. A deal can have all four aces visible on
              top of their columns, look extremely promotion-ready,
              and still stall when the twos and threes needed to
              continue each suit are pinned in positions the game
              cannot liberate. This pattern is the one that fools
              experienced players most often, because the initial
              layout looks friendly. Deal #11982 contains a trace
              of this pattern in its diamond and heart suits, where
              early promotion is blocked not by the aces themselves
              but by the rank-two cards that need to follow.
            </p>
          </ContentBody>
        </CardSection>

        {/* Beyond Microsoft */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Extrapolation" id="beyond-microsoft" icon={"\u2665"}>
            Beyond Microsoft&rsquo;s 32,000
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              If we step outside the Microsoft deal set and consider
              FreeCell as a game over random shuffles &mdash; meaning
              any of the 52-factorial possible starting arrangements
              &mdash; the solvability rate is estimated at roughly
              99.99 percent. We say &ldquo;estimated&rdquo; because no
              one has run an exhaustive search on the full space; the
              space is astronomically larger than the Microsoft 32,000
              and has no sensible ordering. The 99.99 figure is the
              output of sampling. Researchers run a large pseudorandom
              draw of shuffles, pass each through a solver, and report
              the fraction that solve.
            </p>
            <p>
              The estimate has been refined over the years as solver
              quality has improved. Early runs on the order of 100,000
              random deals produced solvability rates around 99.996
              percent, consistent with the Microsoft tally. Larger runs,
              on the order of tens of millions of deals, have pulled the
              figure down slightly to around 99.989 or 99.990 percent,
              reflecting the rare unsolvable configurations that only
              appear in the long tail. The movement is small, and the
              confidence intervals at both ends bracket the original
              tally, so the honest single-sentence summary is: roughly
              one in 10,000 random FreeCell deals is unsolvable, with
              the exact rate depending on whose solver did the counting.
            </p>
            <p>
              Two caveats on the extrapolation. First, &ldquo;solvable
              by what solver&rdquo; matters. A solver with a bounded
              search depth or a bounded time budget reports a subset of
              the truly unsolvable deals plus any deals it ran out of
              time on. Good solvers (Shlomi Fish&rsquo;s Freecell Solver,
              Danny Jones&rsquo;s work, the solvers built into the
              FreeCell Pro ecosystem) have approached the problem
              carefully enough that their unsolvable counts are
              considered reliable. Second, &ldquo;random deal&rdquo;
              has multiple definitions &mdash; a pure uniform shuffle, a
              Microsoft-style seeded shuffle, or a shuffle from any one
              of several digital implementations that each produce
              slightly different distributions. The 99.99 figure is
              robust across those definitions, but any specific number
              past the second decimal place depends on which shuffle
              model you are sampling.
            </p>
            <p>
              For the working player, the useful takeaway is that
              unsolvable deals exist in the wild but are rare enough
              that you will almost never meet one. If you play a
              thousand random FreeCell deals, expect zero unsolvable
              positions in your sample. If you play ten thousand,
              expect roughly one.
            </p>
            <p>
              A deeper question lurks behind the headline rate: are
              the unsolvable deals distributed evenly across the
              random-deal universe, or do they cluster in identifiable
              regions of deal-space? The answer, from community
              work, is &ldquo;clustered, but not in ways a player
              could exploit in advance.&rdquo; Unsolvable deals share
              structural features &mdash; the three patterns above
              plus foundation starvation &mdash; but the features
              arise from specific card orderings that do not line up
              with any shuffle seed or player-visible property. You
              cannot look at a seed number or a deal ID and predict
              whether the resulting deal is unsolvable without
              actually generating and analyzing the layout. In that
              sense the clustering is theoretical rather than
              practical: the patterns exist in the space of
              configurations but not in the space of seeds that
              produced them.
            </p>
            <p>
              The solver-work record also supports a more granular
              observation: unsolvable rate is a weakly decreasing
              function of solver quality. Every improvement to the
              Freecell Solver pipeline over the last two decades has
              shaved a small fraction of a percent off the count of
              deals labeled unsolvable, as solvers got better at
              recognizing solution paths that earlier heuristics had
              missed. The curve has flattened: recent gains are in
              the third decimal, and the consensus is that the
              current figure is close to the true rate. We note this
              for transparency: any rate we publish here is reported
              with the current-generation solver, and the figure
              could inch downward again as solvers improve.
            </p>
          </ContentBody>
        </CardSection>

        {/* How solvers prove unsolvability */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Proof" id="solver-proof" icon={"\u2666"}>
            How solvers prove unsolvability
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Proving that a FreeCell deal is solvable is easy: you
              exhibit a sequence of legal moves that produces four
              complete foundations. The proof is the solution. Proving
              that a deal is unsolvable is harder. You cannot exhibit
              the counterexample, because there is no solution to
              exhibit. You have to show, instead, that no such solution
              can exist &mdash; that the full tree of reachable
              positions does not contain a winning state.
            </p>
            <p>
              The standard approach is backtracking search with state
              memoization. From the initial deal, a solver enumerates
              all legal moves. For each move, it advances to a new
              position, records that position in a hash table, and
              recursively explores the moves available from there. When
              a position leads to a win, the search returns that
              sequence. When a position has no legal moves, or all of
              its legal moves lead only to positions already on the
              explored list, the search backtracks to the previous
              branch point. If every branch eventually backtracks, the
              deal is unsolvable. The hash table is essential: without
              it, the solver would revisit the same positions over and
              over and fail to terminate.
            </p>
            <p>
              FreeCell&rsquo;s state space is large but bounded. The
              number of reachable positions from a given deal is finite
              &mdash; in the worst case, in the millions &mdash; because
              every position is a specific arrangement of 52 cards
              across tableau columns, free cells, and foundations, and
              the game&rsquo;s rules limit transitions. Sophisticated
              solvers prune the search using symmetry (equivalent
              positions are collapsed), dominance (if move A is
              strictly better than move B from the same position, only
              A is explored), and ordering heuristics that hit winning
              lines faster when they exist. The result is that a
              FreeCell deal can usually be solved or disqualified in
              seconds to minutes, depending on the deal&rsquo;s
              branching factor.
            </p>
            <p>
              What the solver cannot do, in principle, is lie. If the
              solver terminates and reports no solution, and the
              reader trusts that the solver covered the full reachable
              space (no unhandled edge cases, no early termination), the
              report constitutes a proof. Where the solver community
              has been careful is in ensuring that the coverage claim
              holds. That means testing solvers against known solvable
              deals (they had better find the solutions), against known
              unsolvable deals (they had better declare them unsolvable),
              and against adversarial stress tests that probe for bugs
              in move generation and position equality. The result of
              that care is that when a mature FreeCell solver says a
              deal is unsolvable, the community treats it as a proof.
            </p>
            <p>
              The complexity of FreeCell as a puzzle is worth a sentence.
              Generalized FreeCell &mdash; the version with arbitrary
              board dimensions rather than the fixed eight-column,
              four-cell setup &mdash; has been shown to be NP-complete
              in prior work, meaning solvability for large boards is
              computationally hard in the worst case. Standard FreeCell,
              with its fixed dimensions, sits inside that complexity
              result as a special case that happens to be tractable in
              practice because the board is small. The contrast is
              interesting: the game is hard in the abstract but easy in
              the concrete, which is partly why exhaustive solvers work
              at all.
            </p>
          </ContentBody>
        </CardSection>

        {/* Historical Context */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="History" id="history" icon={"\u2663"}>
            Historical context
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell as a computer game originates with Paul Alfille,
              who implemented it on the PLATO educational-computing
              system at the University of Illinois in 1978. Alfille
              designed FreeCell specifically to be almost always
              solvable &mdash; that was the appeal, and the design
              choice that distinguishes it from Klondike, whose random
              shuffles produce unwinnable deals on roughly one of every
              five or six hands. The original PLATO FreeCell used a
              slightly different layout convention, but the core rules
              (four free cells, four foundations, eight tableau columns,
              alternating-color descending sequences) trace directly to
              Alfille&rsquo;s implementation.
            </p>
            <p>
              Through the 1980s, FreeCell survived as a minor curiosity
              &mdash; known to PLATO users, ported to a handful of
              academic systems, and absent from the mainstream
              card-game canon. It did not appear in commercial card-game
              compilations and was not widely documented in the
              patience literature of the period. Jim Horne, who had
              encountered FreeCell on PLATO during his own student
              years, was the engineer who ported it to Windows in the
              early 1990s. Horne&rsquo;s port bundled with Windows
              3.1&rsquo;s Win32s subsystem and, more publicly, shipped
              with Microsoft Entertainment Pack volumes and later with
              Windows 95. The port introduced the 32,000-deal numbering
              system that readers of this article will recognize: a
              seeded pseudorandom generator that made every Windows
              installation produce the same 32,000 deals in the same
              order.
            </p>
            <p>
              The early 1990s are also when solver work began. With
              FreeCell now installed on millions of machines, the
              community of players grew rapidly, and within a few years
              the question &ldquo;is every Microsoft deal solvable&rdquo;
              had become a popular obsession. The Internet FreeCell
              Project, organized initially by Dave Ring in 1994 and
              later coordinated by Michael Keller and Don Woods, took
              on the challenge systematically. Volunteers were assigned
              batches of deals to attempt. Solvers caught up over the
              next few years and did most of the remaining confirmation.
              By the late 1990s the tally was settled: 31,999 solvable,
              one not, identity of the holdout deal confirmed as 11982.
            </p>
            <p>
              The FreeCell Pro community, built around Gary
              Campbell&rsquo;s FreeCell Pro software and the
              associated forums, continued the work into the 2000s and
              beyond. That group is responsible for extending the
              solvability analysis past 32,000 into the expanded deal
              sets that some implementations ship (up to one million and
              beyond). Shlomi Fish&rsquo;s open-source Freecell Solver
              project provided a second, independent implementation
              that could verify the earlier results and discover
              unsolvable deals in the larger ranges. Taken together,
              Alfille&rsquo;s original design, Horne&rsquo;s port,
              Keller&rsquo;s coordination, and the continuing
              community work produced the most thoroughly studied
              single-player card game on the open web.
            </p>
          </ContentBody>
        </CardSection>

        {/* Implications for players */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="For Players" id="implications" icon={"\u2660"}>
            Implications for players
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The practical question a player usually cares about is:
              when should I restart a deal? The research above gives a
              clean answer. If you are playing the Microsoft 32,000 set
              and you are not on #11982, your deal is solvable. A
              feeling of &ldquo;this is impossible&rdquo; is a feeling
              about the current position, which you may have walked
              into, not about the deal itself. Restarting from the
              beginning is often the correct move &mdash; because the
              position you have reached may be unwinnable even when
              the deal is solvable &mdash; but you are not restarting
              because the cards betrayed you. You are restarting
              because your earlier play narrowed the solution space.
            </p>
            <p>
              If you are playing deal #11982, restart is strictly
              better than continuing. No amount of thinking will
              produce a winning sequence, because there is no winning
              sequence to produce. The correct response is to skip the
              deal or play for the positional challenge of reaching
              the deepest possible dead end, which is its own kind of
              puzzle. Some players use 11982 as a training exercise:
              can you at least fill one foundation? Two? All four
              except for one blocked suit? The deal does not win, but
              it has gradations of loss, and working through them can
              sharpen pattern recognition.
            </p>
            <p>
              For random deals off the Microsoft set, restart
              psychology is essentially the same. One in 10,000 random
              deals is unsolvable. You will not personally meet one in
              most lifetimes of casual play. If you do meet one, the
              restart comes quickly once the patterns from the section
              above become visible: two locked columns and a buried
              ace is a strong signal that the deal itself is the
              problem. In practice, on a well-designed FreeCell
              implementation, the restart button costs nothing and the
              cost of grinding an unwinnable deal is substantial. We
              lean toward restart when the position looks worse than
              it should, with or without certainty about the
              underlying solvability.
            </p>
          </ContentBody>
        </CardSection>

        {/* Variations in other games */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Variants" id="variants" icon={"\u2665"}>
            Unsolvable deals in other games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell is an outlier in the patience family for how
              solvable it is. Most tableau patience games produce
              unwinnable deals at noticeably higher rates, and a brief
              comparison helps situate the FreeCell numbers in context.
            </p>
            <p>
              <strong className="text-white">Baker&rsquo;s Game.</strong>{" "}
              Baker&rsquo;s Game is FreeCell with one rule change:
              tableau sequences must be built in same-suit rather than
              alternating-color order. That change makes the game
              dramatically harder. Where FreeCell is solvable on
              roughly 99.99 percent of random deals, Baker&rsquo;s Game
              is solvable on roughly 75 percent, with unsolvable rates
              sitting around 25 percent depending on the solver and
              sampling method. The mechanism is the pattern we named
              above as &ldquo;interlocking same-color chains&rdquo; &mdash;
              in Baker&rsquo;s Game, the building restriction forces
              same-suit chains everywhere, so chain interlocks occur
              constantly. The game is still entertaining, but the
              player is fighting the structure rather than being
              supported by it.
            </p>
            <p>
              <strong className="text-white">Eight Off.</strong> Eight
              Off gives the player eight free cells instead of four, in
              exchange for starting only six of those cells empty. The
              extra holding capacity slashes the unsolvable rate almost
              to zero: simulations put Eight Off&rsquo;s random-deal
              solvability at roughly 99 percent or better depending on
              ruleset details, meaning unsolvable deals are slightly
              more common than in FreeCell but still rare by any
              practical standard. The game plays slower than FreeCell
              because of the larger board, but it rewards patience with
              forgiveness.
            </p>
            <p>
              <strong className="text-white">Seahaven Towers.</strong>{" "}
              Seahaven Towers uses four free cells, same-suit building,
              and ten tableau columns. The combination produces
              solvability rates in the 75 to 80 percent range &mdash;
              similar to Baker&rsquo;s Game, for the same same-color
              chaining reason. The extra columns help compared to
              Baker&rsquo;s eight but do not close the gap opened by
              same-suit sequencing.
            </p>
            <p>
              <strong className="text-white">Klondike, for contrast.</strong>{" "}
              Klondike (&ldquo;regular solitaire&rdquo;) is difficult to
              give a single solvability figure for because its
              solvability depends heavily on whether the player plays
              draw-one or draw-three, whether redeals are allowed, and
              what solver strategy is used (the well-known
              &ldquo;thoughtful Klondike&rdquo; figure of around 82
              percent assumes the player sees every card). In practical
              play without complete information, win rates range from
              the high 20s in draw-three to the low 50s in draw-one
              with skilled play. That variance is larger than FreeCell&rsquo;s
              across its entire deal universe.
            </p>
            <p>
              The comparison illuminates what makes FreeCell special.
              The combination of four free cells, alternating-color
              building, and fully-visible cards removes almost all the
              uncertainty that produces unsolvable deals in other
              games. FreeCell is a puzzle; Klondike and Spider are
              puzzles plus luck. The unsolvable-deal rate is one of
              the cleanest ways to see that distinction in numbers.
            </p>
          </ContentBody>
        </CardSection>

        {/* Research frontier */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Open Questions" id="frontier" icon={"\u2666"}>
            The research frontier
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell has been studied thoroughly enough that most of
              the basic questions have answers. The 32,000 Microsoft
              deals are catalogued. Random-deal solvability has been
              estimated with enough sample size that the third decimal
              place is stable. The structural patterns behind unsolvable
              deals are understood well enough to teach. Still, several
              questions remain open.
            </p>
            <p>
              <strong className="text-white">Exact unsolvability rate
              in the random-deal limit.</strong> We have estimates in
              the 99.989 to 99.990 percent range, but the exact limit
              under uniform random shuffle is not known. A definitive
              figure would require either a dramatically larger solver
              run or an analytic argument, and neither has been
              produced. The difference between 99.989 and 99.991 is
              essentially irrelevant to players, but it matters to the
              methodological question of whether the exact rate even
              has a closed form.
            </p>
            <p>
              <strong className="text-white">Characterizing unsolvable
              deals structurally.</strong> We can describe patterns
              (buried aces, locked columns, interlocking chains) but
              we do not have a clean necessary-and-sufficient condition
              for unsolvability that could be checked in polynomial
              time. A deal-recognizer that could flag unsolvable deals
              without a full solver run would be both useful and
              theoretically interesting. Current work has produced
              heuristic detectors; a clean characterization remains
              open.
            </p>
            <p>
              <strong className="text-white">Human recognition of
              unsolvable positions.</strong> How long does it take an
              experienced player to recognize that a deal is dead
              versus very hard? Studies have not been run on that
              question at any scale. Anecdotally, strong FreeCell
              players report being able to feel the difference within
              10 to 30 moves, but that claim deserves empirical
              testing.
            </p>
            <p>
              <strong className="text-white">Rules-variant comparison
              at scale.</strong> The Baker&rsquo;s Game, Eight Off, and
              Seahaven Towers solvability numbers we cite above are
              based on solver runs of tens or hundreds of thousands of
              deals. Runs at the tens-of-millions scale would tighten
              the confidence intervals and might expose regimes where
              the apparent rates drift &mdash; either because rare
              unsolvable patterns become visible or because solver
              heuristics hide rare solvable patterns. That work is
              tractable and remains to be done.
            </p>
            <p>
              The FreeCell Pro community and the open-source solver
              community (Freecell Solver, PySolFC, and others) continue
              to chip away at these problems. Progress tends to come in
              the form of better solvers, larger sample runs, and
              incremental refinements to published rates. The single
              most significant open problem is the structural
              characterization &mdash; a way to look at a deal and
              certify unsolvability without running a full search.
            </p>
          </ContentBody>
        </CardSection>

        {/* Citations */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Citations" id="citations" icon={"\u2663"}>
            Sources and citations
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Our primary sources for this piece are the public record
              left by the Internet FreeCell Project (Michael
              Keller&rsquo;s archives and the project&rsquo;s published
              summaries), the FreeCell Pro community&rsquo;s deal
              analyses and expanded solvability tables, the open-source
              Freecell Solver project maintained by Shlomi Fish, and
              the academic literature on generalized FreeCell
              complexity. We have paraphrased throughout rather than
              quoted, both for readability and to avoid imposing any
              single source&rsquo;s framing on the story.
            </p>
            <p>
              Paul Alfille&rsquo;s 1978 PLATO implementation is
              documented in interviews and in the PLATO historical
              archives preserved by Brian Dear and others. Jim
              Horne&rsquo;s port of FreeCell to Windows and the
              32,000-deal numbering algorithm are documented in
              Microsoft&rsquo;s own release materials from the
              Entertainment Pack era and in community reverse-engineering
              of the deal-generation code, which the FreeCell Pro
              forums have preserved. The 99.9987 percent figure for the
              Microsoft 32,000 is a tally, not an estimate, and is
              credited to the Internet FreeCell Project&rsquo;s
              exhaustive deal-by-deal verification. Unsolvable-rate
              figures for random deals come from Monte Carlo runs
              published by the Freecell Solver project and independent
              community analyses, which we have cross-checked against
              each other for consistency.
            </p>
            <p>
              Where we have cited specific rates (99.99 percent, 75
              percent, and so on), the figures reflect the midpoint of
              published ranges. Exact rates vary with solver choice,
              sampling size, and ruleset specification. Rate movements
              within a few hundredths of a percent should be treated
              as methodological noise rather than new findings.
            </p>
          </ContentBody>
        </CardSection>

        {/* Read next */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/microsoft-freecell"
              title="Microsoft FreeCell Online"
              description="The original 32,000-deal FreeCell from Windows, playable here with the same deal numbers and modern conveniences."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-game-11982"
              title="Deal #11982: The Canonical Layout"
              description="A dedicated page to the single unsolvable deal in the Microsoft 32,000. Layout, proof, and play notes."
            />
            <ContentLinkCard
              variant="dark"
              href="/famous-freecell-game-numbers"
              title="Famous FreeCell Game Numbers"
              description="A guided tour of the deal numbers that became their own folklore — hard ones, beautiful ones, and the one that cannot be won."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-solvability"
              title="FreeCell Solvability"
              description="The methodology and numbers behind the solvability claim, from Microsoft's 32,000 out to modern Monte Carlo runs."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Try the deals for yourself"
          body={
            <>
              The deals are better experienced than read about. Try
              #11982 (it will not win), try #617 (it will, barely),
              and compare the shape of the boards. The patterns this
              piece describes get visible fast.
            </>
          }
          primaryLabel="Play Microsoft FreeCell"
          primaryHref="/microsoft-freecell"
          secondaryLabel="Open deal #11982"
          secondaryHref="/freecell-game-11982"
        />
      </main>
    </ContentLayout>
  );
}
