import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
  AuthorByline,
} from "@/components/content";
import {
  loadWinRateSimulations,
  methodologyLabel,
  type SimulationEntry,
  type SimulationMethodology,
} from "@/lib/winRateSimulations";

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const PAGE_PATH = "/solitaire-win-rates";

export const metadata: Metadata = {
  title: "Solitaire Win Rates: A Researched Database | SolitaireStack",
  description:
    "Cited win rates for FreeCell, Klondike, Spider, and 12 other solitaire variants. Solver analysis, Monte Carlo research, and confidence intervals.",
  keywords: [
    "solitaire win rates",
    "freecell win rate",
    "klondike win rate",
    "spider win rate",
    "solitaire solvability",
    "monte carlo solitaire research",
    "solitaire win rate database",
    "solitaire difficulty research",
  ],
  openGraph: {
    title: "Solitaire Win Rates: A Researched Database",
    description:
      "A cited win-rate database covering 15+ solitaire variants. Exhaustive solver analysis, Monte Carlo research, sample sizes, and confidence intervals — every number you can audit.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

const METHODOLOGY_STYLES: Record<SimulationMethodology, string> = {
  exhaustive: "bg-emerald-400/15 text-emerald-200 border-emerald-400/30",
  "monte-carlo": "bg-sky-400/15 text-sky-200 border-sky-400/30",
  published_research: "bg-indigo-400/15 text-indigo-200 border-indigo-400/30",
  community_data: "bg-amber-400/15 text-amber-200 border-amber-400/30",
  estimate: "bg-white/10 text-white/70 border-white/20",
};

function formatWinRate(entry: SimulationEntry): string {
  const base = entry.winRatePercent;
  // Show extra precision for very-high-solvability games.
  if (base >= 99) return base.toFixed(4).replace(/0+$/, "").replace(/\.$/, "") + "%";
  if (base >= 10) return base.toFixed(1).replace(/\.0$/, "") + "%";
  return base.toFixed(2).replace(/0+$/, "").replace(/\.$/, "") + "%";
}

function formatSampleSize(entry: SimulationEntry): string {
  if (!entry.sampleSize) return "—";
  if (entry.sampleSize >= 1_000_000) {
    return `${(entry.sampleSize / 1_000_000).toFixed(entry.sampleSize % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (entry.sampleSize >= 1_000) {
    return `${(entry.sampleSize / 1_000).toFixed(entry.sampleSize % 1_000 === 0 ? 0 : 1)}K`;
  }
  return entry.sampleSize.toLocaleString("en-US");
}

export default function SolitaireWinRatesPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) {
    notFound();
  }

  const simulations = loadWinRateSimulations();
  const entries = simulations.entries;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Solitaire Win Rates: A Researched Database",
      description:
        "A cited win-rate database covering 15+ solitaire variants, with sample sizes, confidence intervals, and methodology disclosures for every number.",
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
      "@type": "Dataset",
      name: "Solitaire Win-Rate Database",
      description:
        "Cited solvability and win-rate figures for 15+ solitaire variants, combining exhaustive solver analysis (FreeCell), Monte Carlo research (Klondike), published academic work, and community-sourced telemetry.",
      url: absoluteUrl(PAGE_PATH),
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: {
        "@type": "Organization",
        name: "The Research Desk",
        url: absoluteUrl("/authors/the-research-desk"),
      },
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      variableMeasured: [
        "Win-rate percent",
        "Sample size",
        "95% confidence interval",
        "Methodology class",
        "Primary source citation",
      ],
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: absoluteUrl("/solitaire-win-rates"),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Solitaire Win Rates", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Solitaire Win Rates: A Researched Database"
        subtitle="Cited solvability figures for 15+ solitaire variants. Exhaustive solver analysis, Monte Carlo research, sample sizes, and confidence intervals behind every number."
        kicker="Research"
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
          <SectionHeading variant="dark" sub="Why win rates matter" id="intro" icon={"\u2660"}>
            A win-rate number is only useful when you can audit it
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most of the solitaire sites that publish win-rate numbers pull
              those numbers out of the air. A lot of the figures that circulate
              online — 99% for FreeCell, 43% for Klondike, 20% for Spider — trace
              back to a single uncited blog post from the mid-2000s that someone
              else later paraphrased. The number propagates because nobody
              checks the receipt. We think that is backwards. Win rates are
              exactly the kind of claim that deserves a citation, a sample size,
              and an error bar, because the same game can produce wildly
              different win-rate figures depending on how it was measured.
            </p>
            <p>
              This page is our answer to the citation problem. Every entry
              below records where the number came from, how many deals were
              examined to produce it, what methodology was used, and what we do
              and do not know. The research library is maintained by the Solitaire
              Stack Research Desk and updates as new solver runs complete or
              new academic work lands in our reading queue. If a row says
              &quot;estimate,&quot; it means the figure is a community
              best-guess we have not yet reproduced in our own simulator — and
              we say so rather than rounding up into false confidence.
            </p>
            <p>
              We publish this as a public, cross-referenced database because
              solitaire players deserve better than marketing-copy numbers.
              When a site tells you &quot;85% of Spider 2-suit deals are
              winnable,&quot; you should be able to ask: <em>says who, from how
              many deals, under what assumptions</em>, and get an answer. The
              database below is our best attempt at providing that answer for
              fifteen of the most-played solitaire variants, and at being
              honest about the handful of games where our answer is still
              provisional.
            </p>
            <p>
              A word on scope. This page is about <em>solvability</em> — the
              fraction of randomly-dealt games that a strong player, or a
              solver, can win. It is not the same thing as a player&apos;s
              personal win rate, which depends on their own sequencing
              decisions, whether they allow undo, and how patient they are
              with long branches. Most solitaire apps will happily tell you
              your personal win rate in their statistics screen; this page
              tells you the ceiling that personal rate is bumping into. The
              gap between the two is where strategy articles earn their
              keep, and it is the specific gap each individual game page on
              the network is about.
            </p>
          </ContentBody>
        </CardSection>

        {/* Methodology */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Methodology" id="methodology" icon={"\u2663"}>
            How we classify and report win rates
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every row in the database carries a methodology tag. The tag
              tells you how much weight to put on the number, because not all
              win-rate research is the same thing. <strong>Exhaustive
              analysis</strong> means a solver was run against a closed set of
              deals and the answer is a count, not a sample: for the 32,000
              Microsoft-numbered FreeCell deals, for example, we know exactly
              which deals are winnable because every one has been solved. There
              is no error bar because there is no sampling — the answer is a
              fact about that specific set.
            </p>
            <p>
              <strong>Monte Carlo</strong> means a solver was run against a
              large random sample of deals and the win rate is reported as a
              percentage with a confidence interval. A Monte Carlo figure with
              N=10,000 deals has a 95% confidence half-width of roughly 1
              percentage point; at N=1,000,000 the half-width drops to about
              0.1 points. Sample size matters because tight claims require
              many deals, and a number quoted without N is almost impossible
              to evaluate. When we run our own Monte Carlo sweeps we disclose
              the solver heuristic alongside the number, because the same game
              plays differently under a greedy strategy versus a lookahead.
            </p>
            <p>
              <strong>Published research</strong> means a peer-reviewed or
              widely-cited academic paper generated the number — Bjarnason,
              Fern & Tadepalli&apos;s 2007 ICAPS paper on Klondike is the
              canonical example. <strong>Community data</strong> means the
              figure aggregates reported player statistics from large
              deployed clients (the original Microsoft Spider telemetry,
              modern solitaire apps, long-running forum threads) — useful but
              noisy. <strong>Estimate</strong> is the humility tag: we believe
              the figure is in the right neighbourhood, but we have not yet
              produced or found rigorous backing, and the row should be
              treated as provisional until a simulation or citation upgrades
              it.
            </p>
            <p>
              Confidence intervals, when reported, use the standard 95% level.
              For exhaustive entries the interval is a deterministic range
              reflecting rounding precision, not statistical uncertainty; for
              Monte Carlo entries the interval reflects the binomial
              sampling distribution at the stated N. We prefer to publish a
              wide honest interval over a tight fake one. A claim of
              &quot;winnable 92.3% of the time&quot; with no N and no interval
              is not a finding — it is a vibe.
            </p>
            <p>
              One more methodological note. Every solvability number in this
              database assumes unlimited undo and full-information play — the
              solver sees the whole layout, can back out of any move, and
              optimises without time pressure. That is almost never how a
              human plays. Human sessions are one-shot, time-boxed, and
              operate with the tableau hidden (for games where face-down cards
              exist) or simply held in working memory (for games where every
              card is visible from the start, like FreeCell). When you see a
              solvability figure of 82% for Klondike and a reported player
              win rate of 35%, the gap is not a mistake — it is the specific
              cost of playing the game as a human, under real constraints.
              We disclose this so readers do not walk away thinking that
              personal win rates two-thirds lower than the solvability
              ceiling mean they are bad at solitaire. They almost certainly
              do not.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* The database */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Database" id="database" icon={"\u2666"}>
            The win-rate database
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The table below is the canonical view of every game we have a
              cited win-rate figure for. Rows are sorted high-to-low by win
              rate; the methodology column tells you which class of evidence
              supports the figure. Click into any game page for the full
              treatment of rules, strategy, and the history behind the
              number — this page is the index, not the essay.
            </p>
            <p>
              Two things to watch for. First, compare the <em>win rate</em>{" "}
              column to the <em>sample size</em>: a 90% figure at N=1,000 is
              much weaker than a 90% figure at N=1,000,000, even though they
              read the same on the page. Second, remember that these are
              solvability numbers under strong play. Human win rates — the
              rate at which an average player actually wins — sit meaningfully
              lower for every game on this list, because humans cannot see the
              face-down cards or compute every branch. The gap between the
              solvable ceiling and the human floor is where strategy
              articles earn their keep.
            </p>
            <p>
              The dataset is also published under Creative Commons Attribution
              4.0. If you want to cite these numbers in your own work, please
              do — link back to this page and the primary sources listed in
              each row, and we will happily help you interpret the
              methodology.
            </p>

            <div className="mt-4 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#D4AF37]/30 bg-white/[0.03]">
                    <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                      Game
                    </th>
                    <th className="py-3 px-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                      Win Rate
                    </th>
                    <th className="py-3 px-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                      N
                    </th>
                    <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                      Methodology
                    </th>
                    <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .slice()
                    .sort((a, b) => b.winRatePercent - a.winRatePercent)
                    .map((entry, idx) => (
                      <tr
                        key={entry.key}
                        className={`border-b border-white/5 align-top ${
                          idx % 2 === 0 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <td className="py-3 px-3 text-white/90">
                          <div className="font-medium text-white">{entry.game}</div>
                          {entry.notes && (
                            <div className="mt-1 text-xs leading-snug text-white/55">
                              {entry.notes}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-white/90">
                          {formatWinRate(entry)}
                          {entry.confidenceInterval && (
                            <div className="mt-0.5 text-[10px] text-white/45">
                              95% CI {entry.confidenceInterval[0]}–
                              {entry.confidenceInterval[1]}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-xs text-white/60">
                          {formatSampleSize(entry)}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              METHODOLOGY_STYLES[entry.methodology]
                            }`}
                          >
                            {methodologyLabel(entry.methodology)}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs leading-snug text-white/60">
                          {entry.source}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/45">
              Dataset generated {new Date(simulations.generatedAt).toISOString().slice(0, 10)} ·{" "}
              {entries.length} entries · methodology mix:{" "}
              {Object.entries(simulations.methodologyBreakdown ?? {})
                .map(([m, n]) => `${n} ${m.replace("_", " ")}`)
                .join(", ")}
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Skill vs luck */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Skill vs Luck" id="skill-contribution" icon={"\u2665"}>
            Win rate is not the same as difficulty
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A common mistake when reading the database is to equate low win
              rate with high difficulty. The two are related but not the same.
              Clock Solitaire sits near a 1% win rate and is trivial to play —
              no player decisions exist, so the game is entirely a lottery.
              FreeCell sits near 100% solvability and is genuinely hard to play
              well, because the work of winning the 99.99% of deals that are
              solvable requires careful sequencing. Difficulty lives in the
              gap between what the game is willing to hand you and what your
              own sequencing can unlock.
            </p>
            <p>
              The cleaner mental model is to decompose each game into a luck
              ceiling and a skill gradient. The luck ceiling is the solvability
              figure in the database — the fraction of deals that a perfect
              player could win. The skill gradient is the slope of player win
              rates as playing strength improves: for FreeCell the gradient is
              steep (novice win rate ~60%, expert win rate ~99.99%), while for
              Clock the gradient is flat because no skill applies. When we
              rank games for <Link href="/solitaire-difficulty-ranking" className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline">difficulty</Link>, we
              weight the gradient heavily; the luck ceiling just tells you
              whether the destination is reachable at all.
            </p>
            <p>
              This is also why averaging win rates across difficulties is
              misleading. Spider&apos;s one-suit / two-suit / four-suit win
              rates are three separate curves; a headline &quot;Spider wins
              ~50% of the time&quot; hides the fact that nobody actually plays
              the average. Each difficulty level gets its own row in the
              database, and when a game has a redeal toggle that materially
              moves the number (Pyramid, Canfield) we note the assumed
              ruleset in the source citation. The same logic applies to
              FreeCell&apos;s restricted-cell variants: 4-cell classic, 3-cell,
              2-cell, and 1-cell FreeCell are effectively four different
              games, and collapsing them into a single &quot;FreeCell&quot;
              row would hide exactly the information a reader is trying to
              use when they pick a difficulty.
            </p>
            <p>
              The game pages themselves go deeper on this. Each individual
              variant page on the network carries its own skill-vs-luck
              breakdown, a tactical checklist for the specific sequencing
              problems that game poses, and an honest assessment of how much
              of the session outcome the player actually controls. The
              database on this page is the index into those essays: read a
              row, follow the link, and you get the full treatment. The
              database exists to stop readers from having to hunt for the
              citation, not to replace the strategy writing itself.
            </p>
          </ContentBody>
        </CardSection>

        {/* Exhaustive analysis */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Exhaustive Analysis" id="exhaustive" icon={"\u2660"}>
            The exhaustive-analysis games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              FreeCell is the rare solitaire game with a clean exhaustive
              result. Starting in 1994, Don Woods and Michael Keller ran
              solvers against the 32,000 deals numbered by the original
              Microsoft Windows FreeCell client; the effort became known as
              the Internet FreeCell Project. After years of community runs,
              the result was unambiguous: only deal #11,982 is unsolvable
              under standard rules with unlimited undo. One deal out of
              32,000 means the solvability rate on that closed set is
              99.996875%. This is not a sample — it is a count, and it is
              why the FreeCell row carries the <em>exhaustive</em> tag.
            </p>
            <p>
              The broader &quot;99.9987% of random deals are solvable&quot;
              figure that circulates for FreeCell is a separate Monte-Carlo
              result, derived from fc-solve sweeps on random shuffles outside
              the Microsoft numbering. The two numbers agree at the 99.99%
              level because the Microsoft deals are a reasonably unbiased
              sample, but they answer different questions: the exhaustive
              count tells you about a specific 32,000-deal library, and the
              random-sweep figure tells you about the space of all possible
              shuffles. We report both in the database and explain the
              distinction on <Link href="/freecell-solvability" className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline">the FreeCell solvability page</Link>.
            </p>
            <p>
              What does 99.9987% mean for a player? Practically, that you
              should never blame the deal. If you lose a random FreeCell
              game, the near-certainty is that the deal was winnable and
              your sequencing missed the path. The solvable ceiling is also
              the reason FreeCell has never had a mainstream &quot;too
              hard&quot; reputation — the game rewards careful play and
              almost always has an answer, which makes it feel fair even
              when a specific deal takes an hour.
            </p>
            <p>
              There are a few other solitaire variants that admit exhaustive
              or near-exhaustive analysis: small-footprint games like
              Accordion, Clock, and Aces Up have state spaces small enough
              that a solver can traverse them fully on modest hardware. The
              trouble is that &quot;small state space&quot; correlates with
              &quot;few meaningful player decisions,&quot; which is why those
              games sit at the low-skill end of the ranking. Games that
              reward skill tend to have branching factors that explode —
              Spider and Klondike specifically — and those are the games
              that force us into Monte Carlo sampling rather than exhaustive
              counts. The pattern generalises: if you can solve a solitaire
              game exhaustively on a laptop, you are probably playing a game
              with limited strategic depth. FreeCell is the unusual case
              where exhaustive work is possible on a closed deal library
              while the game itself remains deep, and that combination is
              why it is the most-studied solitaire variant in the academic
              literature.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Monte Carlo games */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Monte Carlo" id="monte-carlo" icon={"\u2663"}>
            The Monte Carlo games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike is the canonical Monte-Carlo case in the solitaire
              literature. The state space for standard 52-card Klondike is
              too large for exhaustive search — the combinatorics of stock
              cycling and face-down cards blow past what any solver can
              enumerate — so the win-rate question has to be answered by
              sampling. Bjarnason, Fern & Tadepalli (2007), in their ICAPS
              paper &quot;Lower Bounding Klondike Solitaire with Monte-Carlo
              Planning,&quot; ran planners across a large sample of deals and
              reported an upper bound of roughly 82% solvable under
              &quot;thoughtful play&quot; — their name for a solver that
              assumes full information about face-down cards. It is this
              figure that grounds the Klondike row in the database.
            </p>
            <p>
              Thoughtful play is an optimistic bound, not the number a human
              player would hit. Real Klondike players cannot see face-down
              cards when they choose their moves; they have to commit without
              the information that the thoughtful-play solver gets for free.
              The result is a ~40 percentage-point gap between the
              82% thoughtful-play ceiling and the ~30–40% rate at which
              engaged human players actually win. That gap is the entire
              reason Klondike feels hard: the game is deeply solvable in
              principle and mostly unsolvable in practice, because
              practical play is information-constrained.
            </p>
            <p>
              Monte-Carlo results also need confidence intervals, and here is
              where sample size earns its keep. A Monte-Carlo run at
              N=10,000 deals gives you a 95% half-width of roughly 1
              percentage point at the 50% win-rate level; halve the margin
              and you need four times the sample; halve it again and you need
              sixteen times. The Bjarnason paper&apos;s ~1,000,000-deal sweeps
              land at half-widths measured in tenths of a point, which is
              why their figure is the one everyone cites. When a site tells
              you &quot;Klondike Draw-3 wins 21% of the time&quot; with no N,
              treat the precision as theatre — the claim might be accurate,
              but the evidence presented does not support the precision
              quoted.
            </p>
            <p>
              The draw-3 vs draw-1 story also lives on the Monte-Carlo
              frontier. Follow-up work (Blake & Gent, 2013, and subsequent
              community solvers) suggests that draw-3 with unlimited redeals
              is slightly <em>more</em> solvable than draw-1, because cycling
              the stock reveals more cards in total. Humans do worse at
              draw-3 despite the higher ceiling because the memorisation
              load rises — you have to remember which stock cards you
              skipped on each cycle. The database reports both ceilings
              separately so readers do not collapse them into a single
              number.
            </p>
            <p>
              Other Monte-Carlo results we watch, but treat cautiously until
              we reproduce them ourselves, include community solver
              statistics from the Spider and TriPeaks communities and the
              long-running win-rate logs kept by the Pagat Solitaire
              mailing-list crowd. These are the sorts of sources that cite
              each other without always surfacing a primary run, which is
              how vague numbers propagate. Our project plan is to rebuild
              each row with our own sweep at N ≥ 100,000 per variant and a
              disclosed heuristic, then publish both the aggregate figure
              and the raw per-deal results. Until that work ships, the
              database is transparent about which rows are ours and which
              are someone else&apos;s.
            </p>
          </ContentBody>
        </CardSection>

        {/* Estimate-only games */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Estimates" id="estimates" icon={"\u2666"}>
            The estimate-only games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Roughly two-thirds of the database sits in the <em>estimate</em>
              {" "}and <em>community data</em> tiers. These are games with no
              peer-reviewed solver paper behind them and no first-party
              simulation from us yet. Pyramid, TriPeaks, Golf, Canfield, Forty
              Thieves, Yukon, Seahaven, Baker&apos;s Game, Eight Off, and the
              three Spider difficulties all live here. The figures are honest
              — drawn from community telemetry, older desktop-client
              statistics, and solver write-ups across the solitaire
              enthusiast community — but they are not yet figures we have
              produced ourselves or traced to a citable academic source.
            </p>
            <p>
              What do we know about these games? Quite a lot, directionally.
              Yukon is ~85% solvable because all cards are face-up from deal
              one, which collapses it into an information-complete puzzle
              similar to FreeCell. Eight Off is near-universally solvable
              because it hands the player eight free cells rather than
              FreeCell&apos;s four, and those extra reserves dissolve nearly
              every tableau jam. Forty Thieves is brutal — somewhere in the
              10-20% range — because its strict same-suit descending rule
              punishes sequencing errors that FreeCell and Klondike would
              forgive. Pyramid&apos;s win rate depends heavily on the redeal
              allowance: single-pass Pyramid sits around 1-3%, while
              three-redeal Pyramid climbs to ~6%.
            </p>
            <p>
              We publish these as estimates rather than silences because a
              directionally-correct number with an error bar is more useful
              than no number. When we move one of these rows from
              &quot;estimate&quot; to &quot;monte-carlo,&quot; it means we
              have run the simulator ourselves, disclosed the solver
              heuristic, and collected enough deals to shrink the confidence
              interval to something we trust. Until then, the tag warns you
              to discount the precision. A row that reads &quot;65% (estimate,
              community_data)&quot; should be parsed as &quot;around two-thirds,
              from telemetry we did not generate.&quot; It is still useful —
              it tells you the game is meaningfully skill-dependent and that
              a typical session can be won — but the second decimal place is
              not trustworthy, and we will not pretend it is.
            </p>
          </ContentBody>
        </CardSection>

        {/* Competitor comparison */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Auditing Claims" id="auditing" icon={"\u2665"}>
            Why competitor numbers often disagree
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Search for &quot;Klondike win rate&quot; and you will see figures
              spanning 15% to 82%. Search for Spider 2-suit and you will see
              30% to 70%. The spread is not random — it comes from different
              sites measuring different things and labelling them all the
              same way. Some sites report thoughtful-play ceilings; others
              report human-player telemetry; a few report the win rate of a
              specific greedy heuristic run by their own solver without
              disclosing which one. All three are valid numbers, and none of
              them are interchangeable.
            </p>
            <p>
              When you encounter a competitor win-rate claim, we recommend
              asking four questions. First, <em>what population was
              sampled</em> — random deals, a specific numbered library (like
              the Microsoft 32,000), or live player games? Second, <em>who
              was playing</em> — a full-information solver, a specific
              heuristic, or real humans? Third, <em>what was N</em> — and is
              it large enough to support the precision quoted? Fourth,
              <em> where is the primary source</em> — is the number traceable
              to a paper, a solver run, or a blog post that does not cite
              anything at all? A claim that survives all four questions is
              usable; a claim that fails any of them should be discounted.
            </p>
            <p>
              We practise what we preach by exposing the primary source for
              every row. When we cannot trace a number to a paper or a
              first-party solver run, the row carries the <em>estimate</em>
              {" "}tag and says so. We would rather publish &quot;we do not
              know precisely yet&quot; than dress up a guess as a finding.
              That is the quiet gap between a citation database and a
              marketing page, and it is the gap this project exists to
              close.
            </p>
            <p>
              The best-known Klondike win-rate disagreement is a good
              worked example. Some sources cite 82%, others cite 43%,
              others cite 21%. None of those numbers are wrong in isolation,
              and they are not even talking about the same question. 82% is
              the thoughtful-play upper bound from Bjarnason et al., where
              the solver sees face-down cards. 43% shows up in community
              write-ups as an approximation of strong human draw-1 play
              with unlimited redeals. 21% tends to appear for draw-3 human
              play under casino-style scoring. All three are useful; none
              are interchangeable; and a site that reports one of them
              without clarifying which question it answers is not being
              helpful to its readers. We try to make which-question explicit
              for every entry in the database.
            </p>
          </ContentBody>
        </CardSection>

        {/* Implications */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="What This Means" id="implications" icon={"\u2660"}>
            What the database means for players
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The practical takeaway from the database is simple: you are
              probably not bad at Spider. Four-suit Spider&apos;s ceiling
              is 5-15% under community telemetry, and that is the
              <em> solvable</em> ceiling, not the human rate. A real player
              who wins 8% of four-suit deals is playing within normal bounds
              for the game. The same correction applies to Pyramid (1-3%
              under single-pass rules), Golf (5-12%), and Forty Thieves
              (10-20%). If your Spider 4-suit win rate is 10%, the database
              says you are exactly where the game allows — you are not
              missing a trick that would push you to 60%, because 60% does
              not exist for that ruleset.
            </p>
            <p>
              The same database also tells you where the skill gradient is
              worth climbing. FreeCell, Yukon, Eight Off, and Spider 1-suit
              all have solvable ceilings above 85%, which means effort on
              those games compounds — a 10-percentage-point improvement in
              your sequencing actually reaches. For the high-luck games
              (Clock, Pyramid single-pass, four-suit Spider), improvement
              returns are flatter and the right expectation is that most
              sessions end in a loss by design.
            </p>
            <p>
              The last practical point is about undo. Every solvability
              figure in the database assumes undo is available, because
              solvers assume backtracking. If you play no-undo FreeCell —
              the original Microsoft ruleset — your personal win rate will
              sit meaningfully below the solvability ceiling, because one
              wrong sequence kills the whole deal. The gap between
              undo-allowed and no-undo play is a small but real adjustment
              to make when you compare your own stats to the database.
              Undo is not cheating; it is a tool that lets the game play at
              the level its solvability ceiling implies. No-undo is a
              harder discipline that most players should treat as a separate
              mode with its own lower expected win rate.
            </p>
          </ContentBody>
        </CardSection>

        {/* Open questions */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Open Questions" id="open-questions" icon={"\u2663"}>
            Open questions and future research
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The database has obvious holes. The Spider rows are all
              community-data tier; we would like to replace them with our
              own Monte-Carlo sweeps at N ≥ 100,000 per difficulty, using a
              disclosed solver heuristic, and with matched confidence
              intervals. Pyramid needs separate rows for single-pass,
              two-redeal, and three-redeal rulesets, because the spread is
              wide. Forty Thieves has enough rule variants (Josephine,
              Indian, Limited) that each deserves its own row rather than
              being flattened into one band.
            </p>
            <p>
              We are also interested in the exotic variants we currently
              cover at the rules level but not at the win-rate level:
              Scorpion, Bristol, Accordion, La Belle Lucie, Cruel, Bakers
              Dozen, and the restricted-cell FreeCell variants (1-cell,
              2-cell, 3-cell). Restricted-cell FreeCell in particular is a
              natural extension of Keller&apos;s work — we know the win
              rate collapses as free cells are removed, but the shape of
              the drop has not been published in a way we find citable.
              A clean result here would give players a calibrated menu of
              difficulty steps between Baker&apos;s Game and classic FreeCell,
              and it is exactly the kind of project our simulator roadmap
              was built for. When we close one of these research questions
              we will update this page and note the date in the update log.
              If you have a source we should be reading, write to the
              Research Desk — we take reader corrections seriously and will
              re-run the numbers in public when a better primary source
              turns up.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon="♦">
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard
              variant="felt"
              href="/our-solitaire-methodology"
              title="Research Methodology"
              description="The sources, simulation framework, and statistical standards behind every number on the network."
            />
            <ContentLinkCard
              variant="felt"
              href="/how-we-test-solitaire-games"
              title="How We Test Games"
              description="The three-pillar testing framework we run every solitaire variant through before publishing."
            />
            <ContentLinkCard
              variant="felt"
              href="/solitaire-difficulty-ranking"
              title="Difficulty Ranking"
              description="Every solitaire game we cover ranked from easiest to hardest, with win rate and skill-gradient notes."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          body={
            <>
              See a win-rate figure on the site that looks wrong? Point us at
              the source — we re-run simulations in public and update the
              database fast. Write to{" "}
              <a
                href="mailto:research@solitairestack.com"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                research@solitairestack.com
              </a>
              .
            </>
          }
          secondaryLabel="Research Methodology"
          secondaryHref="/our-solitaire-methodology"
        >
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
            <Link href="/freecell-solvability" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              FreeCell Solvability
            </Link>
            <Link href="/solitaire-difficulty-ranking" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Difficulty Ranking
            </Link>
            <Link href="/authors/the-research-desk" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Research Desk
            </Link>
            <Link href="/our-solitaire-methodology" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline">
              Methodology
            </Link>
          </div>
        </CtaSection>
      </main>
    </ContentLayout>
  );
}
