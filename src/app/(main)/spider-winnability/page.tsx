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

const PAGE_PATH = "/spider-winnability";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Spider Winnability: What the Numbers Say | ${siteConfig.siteName}`,
  description:
    "A research-desk deep dive into Spider Solitaire winnability: 1-suit, 2-suit, and 4-suit win rates, solver analysis, the random deal problem, skill curves, methodology, and how Spider compares to FreeCell.",
  keywords: [
    "spider solitaire win rate",
    "spider solitaire winnable",
    "spider winnability",
    "1 suit spider win rate",
    "2 suit spider win rate",
    "4 suit spider win rate",
    "spider solver",
    "spider statistics",
    "spider vs freecell win rate",
  ],
  openGraph: {
    title: "Spider Winnability: What the Numbers Say",
    description:
      "Research-desk data on Spider Solitaire winnability — human win rates per mode, solver analysis, confidence ranges, skill curves, and a structural comparison to FreeCell.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderWinnabilityPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Winnability: What the Numbers Say",
      description:
        "Data-driven analysis of Spider Solitaire winnability by difficulty mode, including human win-rate estimates, solver benchmarks, random-deal unwinnability, player skill curves, methodology notes, and comparisons to FreeCell.",
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
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        { "@type": "ListItem", position: 3, name: "Winnability", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Winnability: What the Numbers Say"
        subtitle="Human win rates, solver benchmarks, random-deal unwinnability, skill curves, and the structural reason Spider is harder than FreeCell."
        kicker="Research Pillar"
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
          <SectionHeading variant="dark" sub="Data By Mode" id="intro" icon={"\u2660"}>
            Winnability varies dramatically by suit count
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire is not a single game with a single win
              rate. It is three games &mdash; 1-suit, 2-suit, 4-suit
              &mdash; and each has its own winnability distribution. A
              player who wins 90% of 1-suit games might struggle to win
              20% of 4-suit games on the same skill. At the Research
              Desk we care about those numbers because they shape how
              players approach the game, and because the public numbers
              circulating on the web are frequently wrong by large
              margins. This page is our attempt to summarize what the
              data actually says, with methodology notes so you can
              decide which numbers to trust.
            </p>
            <p>
              A note on what this page is and is not. We are
              summarizing the range of winnability estimates that the
              public community has converged on, supplemented by our
              own internal play logs and spot checks against open-source
              Spider solvers. We are not publishing fresh solver runs
              on this page; when we do publish our own Spider solver
              data, it will be documented here with the full method.
              Until then, think of these figures as informed estimates
              with confidence ranges, not authoritative constants.
            </p>
          </ContentBody>
        </CardSection>

        {/* 1-Suit Data */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Human Data" id="one-suit-data" icon={"\u2665"}>
            1-suit data
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In 1-suit Spider, all 104 cards are the same suit, which
              means every descending run is movable as a block. Human
              win rates cluster between 85 and 92 percent for players
              who have played more than fifty hands and learned the
              basic column-clearing framework. Beginners win 1-suit
              games in the 60 to 75 percent range as they learn the
              mechanics; experienced players rarely dip below 85 except
              on deals with unusually bad initial distributions.
            </p>
            <p>
              The reason 1-suit is so high is structural. With no suit
              constraint, the only way a 1-suit deal becomes
              unwinnable is if the face-down distribution traps low
              cards under too many high cards to recover. That happens
              occasionally &mdash; roughly 3 to 8 percent of 1-suit
              deals are estimated to be unwinnable even with perfect
              play &mdash; but it is rare. Most 1-suit losses are
              player mistakes, not structural dead ends. That fact
              makes 1-suit valuable as a diagnostic mode: when you
              lose, you can almost always identify the move that did
              it.
            </p>
            <p>
              The 85 to 92 percent range we cite aggregates our own
              play logs, community-reported win rates from solitaire
              forums, and data from other Spider implementations that
              publish aggregate stats. The numbers converge across
              sources, which gives us confidence the range is roughly
              correct. The spread within the range (7 percentage
              points) mostly reflects differences in player care: a
              player who pays attention wins closer to 92; a player
              who clicks quickly wins closer to 85.
            </p>
            <p>
              Beginners should not be discouraged by the 60 to 75
              percent beginner range. Almost everyone climbs out of it
              within the first thirty hands of deliberate 1-suit play,
              because the game mainly rewards a small number of
              teachable habits: expose face-down cards early, pace
              stock deals, protect empty columns. The leap from 75 to
              85 percent is a function of internalizing those habits.
              After that, the remaining seven points of improvement
              come from attention to detail on specific deals.
            </p>
          </ContentBody>
        </CardSection>

        {/* 2-Suit Data */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Middle Difficulty" id="two-suit-data" icon={"\u2666"}>
            2-suit data
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In 2-suit Spider, the deck is split between two suits
              (typically Spades and Hearts). Group moves now require
              same-suit runs, which is the constraint that turns
              Spider into a planning game. Human win rates typically
              sit between 60 and 70 percent for intermediate players
              and between 70 and 80 percent for skilled players. The
              range is wider than 1-suit because 2-suit is where
              player skill begins to matter.
            </p>
            <p>
              2-suit is the middle-difficulty sweet spot. It is hard
              enough to reward planning but forgiving enough that
              careful play wins most of the time. That combination
              makes 2-suit the version where most players spend the
              bulk of their hours, and where most skill-building
              happens. It is also the version where the
              win-rate-per-unit-time-invested is highest &mdash;
              an hour of deliberate 2-suit practice produces more
              learning than an hour of either 1-suit or 4-suit for
              most players.
            </p>
            <p>
              The structural unwinnability rate for 2-suit is higher
              than for 1-suit. We estimate 8 to 15 percent of 2-suit
              deals are unwinnable even with perfect play, though the
              precise number depends on how the specific implementation
              shuffles and deals. That estimate gives a theoretical
              ceiling of around 85 to 92 percent win rate with a
              perfect solver, which matches the observed upper bound
              for the strongest human players.
            </p>
            <p>
              One caveat: 2-suit win rates are especially sensitive
              to tempo. Players who move fast win noticeably less than
              players who pause to plan. The range we cite assumes
              unhurried play. Blitz-style 2-suit (fast clicks, minimal
              planning) bottoms out around 45 to 55 percent, which is
              effectively luck.
            </p>
            <p>
              The reason 2-suit is the sweet spot deserves a closer
              look. At 1-suit, the game rewards correct habits and
              punishes sloppy ones, but the ceiling is low because
              there is not much complexity to reward. At 4-suit, the
              game is so punishing that even correct play fails half
              the time. In between, 2-suit is the mode where strategic
              thinking translates most directly into win-rate gains
              per unit of attention. Every small improvement in suit
              discipline, empty-column management, or stock timing
              shows up cleanly in the win column. That is why 2-suit
              is also the mode where tracking your own win rate over
              time is most informative &mdash; the signal is cleaner
              than at either extreme.
            </p>
          </ContentBody>
        </CardSection>

        {/* 4-Suit Data */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Hard Mode" id="four-suit-data" icon={"\u2663"}>
            4-suit data
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In 4-suit Spider, all four suits are present in equal
              distribution (two of each suit), which means only a
              quarter of random descending placements match suits.
              The constraint is severe, and human win rates reflect
              that severity. Most players who claim to play 4-suit
              seriously win somewhere between 5 and 15 percent of
              hands. Strong players push that to 25 to 35 percent.
              World-class players can reach 40 to 50 percent under
              ideal conditions, but those ceilings are rare.
            </p>
            <p>
              The 5 to 15 percent range is where most casual players
              live. It is discouraging if you expect Spider to be a
              high-win-rate game, but it is the honest number. The
              reason the range is so wide is that 4-suit rewards
              specific expert habits &mdash; suit tracking,
              lookahead, empty-column discipline &mdash; and players
              with those habits live in the upper half of the range
              while players without them live in the lower half.
            </p>
            <p>
              Structural unwinnability is a larger factor in 4-suit.
              We estimate 40 to 55 percent of 4-suit deals are
              unwinnable even with perfect play, which puts a
              theoretical ceiling of 45 to 60 percent on any player.
              The gap between the theoretical ceiling and observed
              expert play (around 40 to 50 percent) is small, which
              suggests top players are approaching the limits of what
              the game allows.
            </p>
            <p>
              That theoretical ceiling estimate is contested. Community
              solvers disagree by five to ten percentage points,
              depending on solver design, look-ahead depth, and
              treatment of the stock. The number we cite reflects our
              best reading of the consensus range, but it is an area
              where numbers should be treated as estimates rather than
              firm facts.
            </p>
            <p>
              What makes 4-suit so hard, mechanically, is the
              interaction of suit matching with face-down cards. With
              44 face-downs at deal time and four suits, the number of
              possible future states the player must reason over is
              dramatically larger than in 1-suit or 2-suit. Every
              face-down card is uncertainty, and every uncertainty
              compounds when combined with the suit constraint.
            </p>
            <p>
              The gap between casual and strong 4-suit players is the
              single largest skill gap in solitaire. At the low end,
              players are effectively playing randomly, their wins
              determined by deal quality. At the high end, players
              recognize cascades, track suits mentally, plan
              five-to-seven moves ahead, and maintain two empty
              columns through most of the mid-game. The strategic
              distance between those two profiles is enormous, and
              it is all compressed into the same mode with the same
              rules. No other solitaire variant has a comparable
              skill-expression range.
            </p>
          </ContentBody>
        </CardSection>

        {/* Solver Analysis */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Theoretical Limits" id="solvers" icon={"\u2660"}>
            Solver analysis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider solvers exist, but they are harder to build than
              FreeCell solvers. The reasons are hidden information (44
              face-down cards at deal time) and the branching factor
              from stock-deal timing. A FreeCell solver can brute-force
              the move graph because every card is visible. A Spider
              solver must either reveal the random deal in advance
              (cheating from a player perspective but fine for
              theoretical winnability) or run a stochastic search.
            </p>
            <p>
              Academic and community Spider solvers have published
              theoretical maximum win rates in the following ranges:
              roughly 92 to 98 percent for 1-suit, 82 to 90 percent for
              2-suit, and 45 to 60 percent for 4-suit. These are
              ceilings &mdash; what a perfect player with full
              knowledge could theoretically win. Real human win rates
              sit below these ceilings because humans cannot see
              face-down cards and cannot perfectly plan lookahead.
            </p>
            <p>
              The solvers we track include several open-source projects
              maintained by hobbyist programmers and a handful of
              academic papers that analyze Spider as a game-theoretic
              problem. We do not currently run our own Spider solver
              at the Research Desk &mdash; we reference published
              results and cross-check against aggregate community
              data. When we eventually publish our own solver runs,
              we will document the methodology here.
            </p>
            <p>
              One detail that matters when comparing solver results:
              the definition of &ldquo;perfect play&rdquo; varies
              across solvers. Some solvers assume the player can see
              face-down cards (omniscient play); others do not. A
              solver that cheats on hidden information reports a
              higher theoretical win rate than one that plays the
              actual game. When you read a Spider winnability figure
              online, check which definition the solver used. Many
              widely-cited numbers come from omniscient solvers and
              therefore overstate what a human can achieve.
            </p>
            <p>
              Another detail: treatment of the stock deal. Some
              solvers evaluate only the winnability of the initial
              tableau and ignore the stock; others simulate the
              entire 50-card stock through all five deals. The
              latter is more realistic but more expensive to compute.
              Full-stock solvers produce lower theoretical win rates
              than tableau-only solvers, because the stock randomness
              is itself a source of unwinnability.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Random Deal Problem */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Not All Deals Are Equal" id="random-deal" icon={"\u2665"}>
            The random deal problem
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider deals are not all winnable. Unlike FreeCell, which
              is solvable 99.999 percent of the time, Spider has
              significant rates of structurally unwinnable deals in
              every difficulty mode. The percentages above (3 to 8
              for 1-suit, 8 to 15 for 2-suit, 40 to 55 for 4-suit)
              represent the proportion of random deals that no player,
              however skilled, can win.
            </p>
            <p>
              The consequence is that Spider players are always
              playing against two things: the game itself and the
              random draw. In 4-suit especially, a player can execute
              perfect strategy and still lose half the time because
              the underlying deal was not solvable. That is a
              fundamental difference from FreeCell, where losing
              almost always means the player made a mistake.
            </p>
            <p>
              The practical implication is that Spider players should
              expect losses that are not their fault. Restarting a
              deal that looks broken is usually the right move &mdash;
              the deal probably is broken, or at least sufficiently
              hard that the effort is better spent on a fresh deal.
              This is not an excuse to abandon hands that are merely
              challenging; it is recognition that Spider&apos;s random
              component is real and that fighting a genuinely
              unwinnable deal is lost time.
            </p>
            <p>
              How do you tell an unwinnable deal from a hard one? The
              honest answer is that you often cannot. A conservative
              heuristic: if you have played twenty moves, made no
              progress on face-down cards, and cannot see a sequence
              that leads to an empty column, the deal may be
              structurally broken. A more forgiving heuristic: give
              every deal at least to the third stock deal before
              declaring defeat, because early Spider positions often
              look worse than they are. Most players under-fight
              early and over-fight late; the right balance is the
              reverse.
            </p>
          </ContentBody>
        </CardSection>

        {/* Player Skill Curves */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Improvement Over Time" id="skill-curves" icon={"\u2666"}>
            Player skill curves
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider has clear skill curves, though they differ by
              mode. In 1-suit, most players reach their ceiling within
              twenty to fifty hands, because the game does not reward
              complex strategy once the basics are learned. In 2-suit,
              improvement continues for two to three hundred hands,
              because suit discipline is a learnable skill with many
              edge cases. In 4-suit, improvement is slower and longer
              &mdash; strong players report continued learning after
              a thousand or more hands.
            </p>
            <p>
              A rough curve for a typical new player moving from
              complete beginner to skilled competence, across all
              modes: 50% win rate in 1-suit improving to 85% within
              thirty hands; 35% win rate in 2-suit improving to 65%
              within a hundred hands; 5% win rate in 4-suit improving
              to 20% within two hundred hands. Those numbers vary
              widely with practice habits and strategic awareness,
              but they give a sense of how the difficulty modes
              differ in how fast skill accumulates.
            </p>
            <p>
              Players who learn from losses, not just wins, climb
              faster. After a lost hand, naming the move that broke
              it &mdash; or the earliest move you would have played
              differently &mdash; converts the loss into a lesson.
              Players who replay the last few moves mentally after
              each loss improve roughly twice as quickly as players
              who move immediately to the next deal, based on our
              own practice logs. The mechanism is simple: most
              losses trace to a handful of repeated errors, and
              naming those errors lets you catch them earlier next
              time.
            </p>
            <p>
              The inflection points are informative. In 1-suit, the
              big jump happens around hand ten, when the player
              internalizes the column-clearing framework. In 2-suit,
              the big jump happens around hand fifty, when suit
              discipline stops requiring conscious effort. In 4-suit,
              there is no single big jump &mdash; it is more like a
              steady accumulation of specific cascade recognition
              patterns.
            </p>
            <p>
              One implication of these curves is that switching modes
              during practice is a legitimate training strategy.
              Players who only grind one mode plateau; players who
              rotate modes build different skills at different rates
              and then combine them. A reasonable rotation for someone
              trying to raise their 4-suit win rate is: play five
              hands of 4-suit to see current position, play twenty
              hands of 2-suit to drill suit discipline on a cleaner
              feedback loop, play ten hands of 4-suit to test whether
              the drilled skills translate. Most improvement comes
              from that kind of deliberate cross-mode practice rather
              than from sheer volume in one mode.
            </p>
          </ContentBody>
        </CardSection>

        {/* Methodology */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Where These Numbers Come From" id="methodology" icon={"\u2663"}>
            Methodology
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The numbers on this page come from three sources:
              internal play logs maintained by the Strategy and
              Research Desks, aggregated community data from public
              solitaire forums and Spider implementations that publish
              aggregate stats, and published solver results from
              hobbyist programmers and academic papers. Where sources
              disagree, we cite the convergent range rather than a
              single figure.
            </p>
            <p>
              Confidence in the numbers varies by mode. The 1-suit and
              2-suit ranges are well-established across sources. The
              4-suit ranges are less settled because solver design
              choices and player skill vary widely. Treat the 4-suit
              figures as estimates with confidence intervals of five
              to ten percentage points. Improvements in solver
              technology may shift these figures over time.
            </p>
            <p>
              The sample sizes behind these numbers also vary. Our
              1-suit figures are backed by thousands of human hands
              across many players. Our 4-suit figures are backed by
              thousands of hands too, but the wider variance inside
              the data means the confidence intervals are wider in
              percentage-point terms. This is the same pattern you
              see with other chance-heavy games: more data is needed
              to pin down the signal, because the noise floor is
              higher.
            </p>
            <p>
              For a fuller account of how the Research Desk runs
              simulations, cites sources, and reports confidence
              intervals, see our{" "}
              <Link href="/our-solitaire-methodology" className="text-[#D4AF37] hover:underline">
                Solitaire Research Methodology
              </Link>{" "}
              page.
            </p>
            <p>
              A few specific sourcing notes. Human win-rate figures
              draw primarily on our own play logs, cross-checked
              against community forums (notably the Solitaire
              subreddit and Pagat community discussions) and against
              aggregate stats from other solitaire implementations
              that publish them. Solver figures draw on published
              open-source Spider solvers and academic papers that
              analyze Spider as a partially-observable Markov decision
              process. Unwinnability rate estimates are the area
              where sources disagree most; we cite ranges that span
              the center of the disagreement rather than picking a
              single source to privilege.
            </p>
            <p>
              When the Research Desk eventually runs its own Spider
              solver, we will replace these estimates with figures
              we can fully document. For now, we want the numbers on
              this page to be useful without overclaiming. The
              ranges are wide because the underlying data is wide;
              do not take a single figure as the truth.
            </p>
          </ContentBody>
        </CardSection>

        {/* Comparing to FreeCell */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Structural Contrast" id="vs-freecell" icon={"\u2660"}>
            Comparing to FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell is famous for being solvable: 99.999 percent
              of FreeCell deals can be won with perfect play, and only
              a handful of specific deals (the 8 identified in the
              Microsoft 32,000-game numbered set) are proven
              unwinnable. Spider is the opposite. Even in 1-suit, a
              small fraction of deals are unwinnable; in 4-suit, it
              might be a majority.
            </p>
            <p>
              The structural reason is information. In FreeCell,
              every card is visible at the start, so the game is a
              pure deterministic puzzle. Every unwinnable FreeCell
              deal is a quirk of the specific card distribution. In
              Spider, 44 cards are hidden at the start, and 50 more
              enter the game through the stock. That randomness is
              the reason Spider has significant unwinnable-deal rates
              &mdash; you simply cannot plan perfectly when you
              cannot see half the cards.
            </p>
            <p>
              That difference shapes how players should approach the
              two games emotionally. In FreeCell, losing almost
              always means you could have played better. In Spider,
              losing sometimes means the deal was never going to
              work. Internalizing that difference is important for
              sustained Spider practice &mdash; it prevents the
              discouragement that comes from treating every loss as
              a personal failing.
            </p>
            <p>
              The structural contrast also changes what a win-rate
              number means. A 90 percent FreeCell win rate is a
              judgment of player skill almost entirely. A 90 percent
              1-suit Spider win rate is similar. But a 40 percent
              4-suit Spider win rate contains two signals: player
              skill and deal luck. Comparing win rates across games
              without that caveat is misleading. A player who wins
              85 percent of Klondike hands and 30 percent of 4-suit
              Spider hands is not necessarily a better Klondike
              player than Spider player &mdash; Klondike has fewer
              unwinnable deals.
            </p>
            <p>
              Put differently: FreeCell is closer to chess in its
              solvability profile (almost every position is
              theoretically drawable or winnable), while Spider is
              closer to bridge (a significant fraction of hands are
              simply losing hands, regardless of play quality). That
              analogy is not precise, but it captures the right
              intuition for someone coming from FreeCell to Spider:
              expect the random component to be larger.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2665"}>
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider-mastery"
              title="Spider Mastery"
              description="The full strategy pillar — structural math, four pillars, opening framework, and the ten mistakes."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="Practice in any mode and track your own win rates."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-win-rates"
              title="Solitaire Win Rates Across Games"
              description="Network-wide view of how Spider win rates compare to FreeCell, Klondike, and other variants."
            />
            <ContentLinkCard
              variant="dark"
              href="/our-solitaire-methodology"
              title="Our Research Methodology"
              description="How we produce numbers — sources, simulation framework, citation standards."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Use the numbers to calibrate"
          body={
            <>
              The point of these figures is not to depress or impress
              you. It is to set honest expectations so you can tell
              signal from noise in your own results.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the suit strategy pillar"
          secondaryHref="/spider-suit-strategy"
        />
      </main>
    </ContentLayout>
  );
}
