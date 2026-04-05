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
  AuthorByline,
} from "@/components/content";

const PAGE_PATH = "/klondike-probability";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Klondike Probability: What the Math Says | ${siteConfig.siteName}`,
  description:
    "Klondike Solitaire probability explained: solvability bounds from Bjarnason et al., human win rates by skill tier, stock-cycling EV, starting-position analysis, confidence intervals, and simulation methodology.",
  keywords: [
    "klondike probability",
    "klondike solvability",
    "klondike win rate",
    "klondike monte carlo",
    "klondike simulation",
    "bjarnason klondike",
    "solitaire win rate research",
    "klondike confidence intervals",
  ],
  openGraph: {
    title: "Klondike Probability: What the Math Says",
    description:
      "Honest summary of what simulations and solvers actually say about Klondike Solitaire win rates.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function KlondikeProbabilityPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Probability: What the Math Says",
      description:
        "A research-focused look at Klondike Solitaire probability: known solvability bounds, human win-rate research, stock-cycling expected value, confidence intervals, simulation methodology, and open questions.",
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
        "@id": absoluteUrl(PAGE_PATH),
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
          name: "Klondike Probability",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Probability: What the Math Says"
        subtitle="Solvability bounds, human win-rate research, and the honest confidence intervals behind every Klondike number on the web."
        kicker="Klondike Probability"
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
          <SectionHeading variant="dark" sub="Introduction" id="intro" icon={"\u2660"}>
            Why solvability research exists, and what it tells us
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike is the most-played solitaire variant on the
              planet, and until recently it was also one of the least
              formally studied. Everyone had an opinion about how
              often it was winnable; almost no one had done the math.
              The research history of Klondike probability is a
              decade-long project, mostly academic, to replace opinion
              with data. The headline finding is that a serious
              fraction of Klondike deals &mdash; roughly one in five
              &mdash; cannot be solved no matter how well they are
              played. That finding sounds obvious once you have it,
              but before the simulations existed it was disputed, and
              the specific bound was unknown.
            </p>
            <p>
              The motivation for running the math is practical. A
              player who believes Klondike is 95 percent winnable will
              blame bad luck for every loss. A player who knows
              Klondike is 80 percent winnable under perfect play will
              take losses more honestly, studying position features
              and improving. The numbers also discipline claims. When
              a casual article writes &quot;most Klondike games are
              winnable,&quot; we can check: yes, most are, but only
              if the player can approach solver-quality decisions.
              Under normal human play, the story is different. The
              research exists to separate those two claims.
            </p>
            <p>
              This page summarizes what the research actually says,
              distinguishes between solvability (what a perfect
              player could do) and observed win rate (what humans
              actually do), and explains the methodology behind the
              numbers. We also flag what is still uncertain, because
              Klondike probability is a living field and the numbers
              have error bars that popular coverage usually omits.
            </p>
          </ContentBody>
        </CardSection>

        {/* Known Solvability Bounds */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Solvability" id="bounds" icon={"\u2665"}>
            Known solvability bounds
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The canonical Klondike solvability reference is Bjarnason,
              Fern, and Tadepalli&apos;s 2007 paper &quot;Lower Bounding
              Klondike Solitaire with Monte-Carlo Planning,&quot; which
              ran Monte Carlo simulations to estimate a lower bound on
              solvability. Their finding, across a large sample of
              random deals with full observation of face-down cards,
              was a solvability rate of roughly 82 percent for the
              draw-one variant. The &quot;lower bound&quot; framing
              matters: the true solvability could be higher, because
              Monte Carlo samples do not exhaustively explore every
              branch. What the paper established is that at least 82
              percent of deals are definitely solvable under optimal
              play with full information.
            </p>
            <p>
              Later analyses pushed against that bound. Subsequent
              heuristic solvers, running on larger samples and with
              stronger search techniques, have reported
              draw-one solvability figures in the range of 82&ndash;91
              percent depending on methodology and the fraction of
              deals declared unsolvable versus undetermined by the
              solver. The academic consensus remains that the true
              draw-one solvability rate is in the low eighties to high
              eighties. No paper has established a tight upper bound;
              the problem space is large enough that exhaustive proof
              of unsolvability on a single deal takes significant
              compute.
            </p>
            <p>
              It is worth emphasizing that &quot;solvable&quot; in
              the research sense means a winning sequence exists
              under the stated rules and assumptions. It does not
              mean the game is easy, and it does not mean a player
              could realistically find the sequence. A solvable deal
              may require fifty moves of careful reordering, stock
              cycling, and foundation timing. The solvability rate
              is a theoretical ceiling; how close any player gets is
              a separate question with a separate answer, which is
              what the human-win-rate section of this page
              addresses.
            </p>
            <p>
              Draw-three solvability is reported slightly lower,
              typically in the range of 78&ndash;82 percent, depending
              on assumptions about stock cycling and the restrictions
              modeled. Some implementations allow unlimited redeals;
              others limit to one or three passes. Every restriction
              pulls the number down. The honest read is that Draw 3 is
              a few points harder than Draw 1 for a perfect player and
              a lot harder for a human player, because the gap between
              perfect play and human play is wider in Draw 3.
            </p>
            <p>
              A useful frame for the numbers: roughly one in five
              Klondike deals is unwinnable even under perfect play in
              Draw 1. That is the core finding. It does not depend on
              the player; it is a property of the deal itself. The
              remaining four in five deals are solvable, but solving
              them requires the kind of multi-step planning that
              humans rarely deliver under real-time conditions. The
              probability of winning under human play is therefore
              substantially lower than the solvability figure, and
              that gap is the focus of this page.
            </p>
            <p>
              The research methodology matters for interpreting the
              numbers. Monte Carlo planning does not prove unsolvable;
              it samples moves and estimates success rates. A deal is
              classified as unsolved if the solver could not find a
              win within its computational budget. That classification
              is conservative: some &quot;unsolved&quot; deals would
              win under deeper search. The published figures are
              therefore lower bounds in the strict sense, and the
              true solvability rates may be a few points higher than
              the headline numbers.
            </p>
          </ContentBody>
        </CardSection>

        {/* Human vs Optimal */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Humans" id="human" icon={"\u2666"}>
            Human vs optimal play
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The gap between optimal and human play in Klondike is
              wider than most players realize. Published solvability
              ceilings sit in the low eighties, but observed human
              win rates across the population sit much lower. Casual
              Draw-1 players land around 15&ndash;30 percent. Regular
              players who have read a strategy guide reach
              40&ndash;55 percent. Experienced players with deliberate
              practice reach 60&ndash;70 percent. Expert players with
              long study histories climb into the 70s, and a
              hypothetical perfect player would sit at the
              80&ndash;82 percent ceiling.
            </p>
            <p>
              Draw 3 widens the gap. Casual players win 5&ndash;10
              percent of Draw 3 games. Regular players reach
              10&ndash;15 percent. Experienced players hit
              15&ndash;20. Experts push into the 25&ndash;33 percent
              range. The solvability ceiling for Draw 3 under optimal
              play is somewhere between 78 and 82 percent depending
              on assumptions, so expert human play recovers only
              about a third of the available solvability. The rest is
              lost to imperfect cycle tracking, suboptimal move
              ordering, and the kinds of mistakes that are nearly
              unavoidable under real-time play conditions.
            </p>
            <p>
              The population-level distribution tells a similar
              story. In aggregated player-data studies from various
              digital platforms, the bulk of players sit between 20
              and 40 percent win rates in Draw 1 and between 8 and
              18 percent in Draw 3. A minority, typically under 10
              percent of the active player base, reaches the
              experienced tier. Expert-level play is rare. The
              distribution is not a failure of solitaire players; it
              is a reflection of how much of the game&apos;s skill
              depth goes unused under casual play conditions.
              Players who treat Klondike as a puzzle rather than a
              reflex game move through the distribution quickly.
            </p>
            <p>
              We have also observed consistency effects. Players who
              improve their Draw 1 win rate from 25 to 50 percent
              typically do not see proportional gains in Draw 3, and
              vice versa. The skills overlap but do not transfer one
              for one. Draw 1 teaches sequencing and foundation
              discipline; Draw 3 teaches memory and cycle planning.
              A player who masters one mode and neglects the other
              can sit at different skill levels between them. That
              is why &quot;your Klondike win rate&quot; is
              meaningless without saying which mode.
            </p>
            <p>
              The gap has practical implications. When a beginner
              asks &quot;is Klondike winnable?&quot;, the truthful
              answer depends on which ceiling we are citing. The
              solvability ceiling is roughly 80 percent in Draw 1, so
              in principle most deals are winnable; but the human
              ceiling under realistic play is lower. Under casual
              play, only around a third of Draw 1 deals will be won.
              Under expert play, nearly three in four are won. That
              range defines what &quot;winnable&quot; means in
              practice.
            </p>
          </ContentBody>
        </CardSection>

        {/* Stock-Cycling Decision */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Stock Cycling" id="cycling" icon={"\u2663"}>
            The stock-cycling decision
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              One of the tactical questions that simulation can answer
              is when recycling the stock is expected-value positive.
              In Draw 1 with unlimited passes, cycling is essentially
              free: every pass reveals the same 24 cards, and the
              player chooses which to play on which pass. The EV of
              cycling there is positive until no new legal moves
              become available, at which point the game is locked.
            </p>
            <p>
              In Draw 3, cycling has a real cost and a clear benefit.
              The cost is tempo and attention. The benefit is the
              cycle shift: every played card changes which cards are
              accessible on the next pass, so cycling is how we
              surface cards that were trapped. Simulation data
              suggests that the first three or four passes of the
              stock produce most of the accessible-card changes, and
              that diminishing returns set in after roughly the fifth
              pass. Players who cycle more than six or seven times
              without progress are usually in a locked position
              whether they recognize it or not.
            </p>
            <p>
              The expected value of a specific cycle is computable
              when the stock composition is known. If we need a
              particular ace, and we know its position in the stock,
              we can compute how many passes are required to bring
              it to the accessible position and whether those passes
              conflict with other card-retrieval goals. Simulation
              work formalizes this as a small dynamic program: each
              potential play is weighted by the number of cards it
              would unlock on the next pass, and the player chooses
              the play with the highest expected unlock. A heuristic
              solver using this rule plays Draw 3 significantly
              better than one that plays greedy-best-tableau-move,
              which is a useful piece of evidence that stock-cycle
              planning is the dominant Draw 3 skill.
            </p>
            <p>
              Pass-limited Draw 3 changes the math. When the rules
              allow only three passes through the stock, each pass
              becomes strategically scarce. A pass spent without a
              stock play is nearly wasted; a pass that produces two
              or three productive plays is well spent. Under
              three-pass rules, the solvability ceiling drops a few
              points because some deals that would have been
              solvable under unlimited passes run out of passes in
              the restricted mode.
            </p>
          </ContentBody>
        </CardSection>

        {/* Starting-Position Analysis */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Deals" id="positions" icon={"\u2660"}>
            Starting-position analysis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Not all Klondike deals are equally hard. Some opening
              configurations are significantly harder to solve than
              others, even before any play begins. Simulation work on
              starting-position features identifies a few properties
              that predict difficulty: the number of face-down Kings
              in deep columns, the distribution of aces across
              tableau versus stock, and the density of same-suit
              pairs in the top face-up row.
            </p>
            <p>
              These features have been studied piecewise rather than
              in a unified model. We have rough estimates of how much
              each factor shifts solvability, but no single formula
              that combines them into a deal-specific prediction.
            </p>
            <p>
              Face-down Kings are expensive because Kings can only
              land on empty columns, and empty columns require
              clearing a column first. A deal with all four Kings
              buried deep in the tableau has a harder time producing
              empty columns on demand, because the same Kings will
              need to come out before they can serve as column
              anchors. Deals with Kings already face-up on the
              tableau or accessible in the stock are significantly
              easier.
            </p>
            <p>
              Aces matter similarly. An ace buried under several
              face-down cards takes longer to reach, delaying the
              foundation start and often cascading into lost tempo.
              Aces already visible on the tableau or reachable in
              the stock&apos;s top group reach the foundation within
              the first few moves. The best opening configuration is
              one where all four aces are accessible within the
              first pass of the stock.
            </p>
            <p>
              A third feature that matters is the suit distribution
              in the top face-up row. A row that contains all four
              suits offers more flexibility for building alternating
              sequences than a row where three suits share the same
              color. Red-red-red starts force reliance on stock draws
              for any black card, delaying tableau building. Mixed
              suit starts allow immediate alternating-color joins
              from move one, which accelerates column emptying. The
              effect size is modest &mdash; a few percentage points
              in solvability &mdash; but it is consistent across
              simulation samples.
            </p>
            <p>
              Face-down density is the broader signal. A deal with
              heavy face-down blocking in multiple columns has more
              work to do before sequences can form. Heuristic
              solvers use these position features to prioritize
              early work and to flag deals that are likely to be
              unsolvable, saving compute for the marginal cases.
            </p>
          </ContentBody>
        </CardSection>

        {/* Confidence Intervals */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Statistics" id="ci" icon={"\u2665"}>
            Confidence intervals
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every solvability number circulating on the web has an
              error bar, and most presentations omit it. A claim that
              Klondike is &quot;82 percent solvable&quot; means
              nothing without a sample size and a confidence
              interval. A run of 1,000 simulated deals gives a
              different margin of error than a run of 1,000,000.
              Published research usually reports 95 percent confidence
              intervals, and those intervals are wider than readers
              expect.
            </p>
            <p>
              Confidence intervals are easy to state and harder to
              internalize. A 95 percent interval means that if we
              ran the experiment many times, 95 percent of the
              intervals we produced would contain the true
              parameter. It does not mean there is a 95 percent
              probability the true value is in any specific
              interval. That subtlety matters when headlines turn
              research findings into single numbers. An
              &quot;82 percent solvable&quot; claim is a point
              estimate, and the point estimate sits inside an
              interval that includes a range of possible true
              values. Good popular coverage reports the interval.
              Most does not.
            </p>
            <p>
              For a simple proportion estimate, the 95 percent
              confidence interval scales roughly with the inverse
              square root of the sample size. A sample of 10,000
              deals with an observed 82 percent solvability produces
              a confidence interval of roughly plus or minus 0.8
              percentage points. A sample of 1,000 widens that to
              plus or minus 2.4 points. A sample of 100 widens it
              further, to plus or minus 7.5 points. Small-sample
              claims should always be read with that margin in mind.
            </p>
            <p>
              Sample size matters a second way: the deal generator.
              A study that samples from a uniform random distribution
              of 52-card permutations is measuring the underlying
              game. A study that samples from only Microsoft-numbered
              deals is measuring that specific subset &mdash; which
              may have systematic properties that a uniform sample
              does not. Most published research uses uniform random
              samples, which is the right default for game-wide
              claims. Claims about specific deal numbering schemes
              require their own samples and their own confidence
              intervals.
            </p>
            <p>
              The published Klondike literature uses samples large
              enough to produce tight confidence intervals on
              solvability, but the methodology caveats remain. Every
              heuristic solver makes tradeoffs about search depth,
              time budget, and unsolved-deal treatment, and each
              tradeoff shifts the reported number slightly. A range
              of 78&ndash;85 percent across serious studies is not a
              failure to converge; it is the reality of running
              different analyses on different samples with different
              solvers.
            </p>
          </ContentBody>
        </CardSection>

        {/* Simulation Methodology */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Methodology" id="method" icon={"\u2666"}>
            Simulation methodology
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Running our own Klondike simulations is straightforward
              in principle. We generate uniform random permutations
              of a 52-card deck, deal them into the 28-card tableau
              plus 24-card stock configuration, and run a solver. The
              solver either finds a winning move sequence and returns
              &quot;solvable,&quot; finds no win within its budget
              and returns &quot;undetermined,&quot; or proves no win
              exists and returns &quot;unsolvable.&quot; We aggregate
              across a large sample and report solvability as the
              fraction of deals that returned &quot;solvable.&quot;
            </p>
            <p>
              Deal generation matters for reproducibility. A named,
              seeded random deck lets different researchers run the
              same deals and compare solver results directly. Without
              a shared seeding convention, every paper generates its
              own private deal set, which makes cross-study
              comparison suggestive rather than decisive. A small
              open benchmark of labeled Klondike deals would resolve
              much of that friction.
            </p>
            <p>
              The solver design is the interesting part. Heuristic
              solvers use domain knowledge &mdash; ace priority, King
              placement, face-down reveals &mdash; to prioritize
              moves, running a depth-limited search with pruning.
              Exhaustive solvers explore every reachable move
              sequence, guaranteed to find a win if one exists but
              prohibitively slow for some deals. Most published
              Klondike research uses heuristic solvers with a fixed
              compute budget, which is why results are framed as
              lower bounds.
            </p>
            <p>
              Time budget is the operational constraint. A deal that
              is solvable in principle may be unsolvable within a
              five-second compute budget per deal. Research papers
              usually disclose their per-deal budgets and the fraction
              of deals the solver could not finish. That fraction is
              an important caveat because it sets an upper bound on
              solvability: a run that budgets five seconds per deal
              and fails to solve ten percent of deals within that
              budget cannot claim a solvability rate above ninety
              percent on that sample. Longer budgets push the number
              up; shorter budgets push it down. When we compare two
              papers&apos; numbers, we compare their budgets first.
            </p>
            <p>
              Face-down treatment matters. Under full-observation
              simulation, the solver sees every card in the tableau
              including the face-down ones. Under partial-observation
              simulation, the solver only sees what a human player
              would see. Full-observation solvers report higher
              solvability because they can plan around cards a human
              would not yet know about. Partial-observation solvers
              report numbers closer to the human ceiling. Both are
              valid research targets; they answer different
              questions.
            </p>
          </ContentBody>
        </CardSection>

        {/* Open Questions */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Open Questions" id="open" icon={"\u2663"}>
            What is still uncertain
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Klondike research field has unresolved questions
              worth naming. First, the true solvability ceiling is
              still a range rather than a single number. Published
              bounds vary from the low eighties to the high eighties
              depending on methodology, and no exhaustive-search
              result has closed the gap. Second, the partial-
              observation ceiling, which is closer to what human
              play can achieve, is less well characterized than the
              full-observation ceiling. Third, the interaction
              between redeal limits and solvability is
              underexplored; most research assumes unlimited passes,
              but real digital implementations vary.
            </p>
            <p>
              There are also methodological gaps. The community has
              no shared benchmark suite of Klondike deals the way
              chess has tactical-test suites. Different solvers are
              evaluated on different samples, which makes direct
              comparison hard. A common test set of, say, 10,000
              labeled deals would advance the field. We would like
              to see someone publish one.
            </p>
            <p>
              A fourth open area is the relationship between stock
              position and solvability. We have qualitative evidence
              that deep-buried aces and kings matter, but we lack a
              formal model connecting stock composition to
              solvability probability. A characterization of, for
              instance, the conditional solvability of a deal where
              the ace of hearts sits at stock position 23 would let
              us tell players which stock orders tend to favor Draw 3
              play and which tend to block it. That sort of result
              would be useful to strategy writing and to teaching.
            </p>
            <p>
              Fifth, we have limited data on how human win rates
              interact with deal difficulty. It is plausible that
              strong human players win a larger fraction of
              easy-to-solve deals than weak players do, but it is
              also plausible that the gap closes on hard deals
              where nobody plays well. We would like to see a
              study that labels deals by their solver difficulty
              and cross-tabulates with observed human performance.
              That study would tell us, in quantitative terms,
              which parts of the skill curve are learnable and
              which are mostly luck-bound.
            </p>
            <p>
              Finally, the relationship between opening-position
              features and solvability is still heuristic rather
              than formalized. We know that buried Kings and aces
              make deals harder, but we do not have a single
              predictive model that takes a starting position and
              returns a solvability probability. Such a model would
              let players identify likely-unsolvable deals early
              and concede efficiently &mdash; useful in Vegas
              scoring especially.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related" icon={"\u2660"}>
            Related research and strategy
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike-mastery"
              title="Klondike Mastery Guide"
              description="The strategy playbook that converts probability into better play."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-win-rates"
              title="Solitaire Win Rates"
              description="Cross-variant win-rate comparison across the solitaire family."
            />
            <ContentLinkCard
              variant="dark"
              href="/our-solitaire-methodology"
              title="Our Research Methodology"
              description="How we produce original solitaire analysis and report confidence intervals."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-vegas-scoring"
              title="Klondike Vegas Scoring"
              description="Turning solvability numbers into expected-value decisions at the table."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Play informed"
          body="Open a Draw 1 deal with the solvability numbers in mind and see how close you get to the ceiling."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the mastery guide"
          secondaryHref="/klondike-mastery"
        />
      </main>
    </ContentLayout>
  );
}
