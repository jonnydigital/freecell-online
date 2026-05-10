import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  JsonLd,
  CtaSection,
  ContentLinkCard,
  CardSection,
  SectionHeading,
  ContentBody,
} from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

const PAGE_PATH = "/spider-world-records";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

const FAQS = [
  {
    question: "Are there official world records for Spider Solitaire?",
    answer:
      "No. There is no governing body that certifies Spider Solitaire records in the way chess or speedrunning communities maintain centralized leaderboards. Records exist as community-reported claims, platform leaderboards, and solver benchmarks, but none carry official verification in the traditional sense. That makes it important to evaluate any claimed record against the platform it came from and the methodology behind it.",
  },
  {
    question:
      "What is a realistic personal best to aim for in 4-suit Spider?",
    answer:
      "For most dedicated players, winning 25 to 35 percent of 4-suit games represents strong play. Completing a 4-suit game in under 150 moves is an ambitious but reachable goal. Win streaks beyond three consecutive 4-suit wins put you in rare company. Rather than chasing a single peak performance, focus on raising your rolling 50-game average -- that number reflects durable skill better than any single outlier game.",
  },
  {
    question: "Can a computer solve every Spider Solitaire deal?",
    answer:
      "No. Even with perfect information (seeing all face-down cards), a significant fraction of Spider deals are structurally unwinnable. In 4-suit mode, estimates place the unwinnable rate between 40 and 55 percent of random deals. Solvers can identify which deals are theoretically solvable and find optimal move sequences for those deals, but they cannot conjure a winning path where the card distribution makes one impossible.",
  },
  {
    question: "How do speedrunners time their Spider Solitaire games?",
    answer:
      "Most Spider speed claims use in-game timers provided by the platform, which measure active play time excluding pauses. Some players use external timers (LiveSplit or similar) for real-time measurement. The lack of a standardized timing method is one reason speed records are hard to compare across platforms. A claimed two-minute 1-suit win on one platform may or may not be comparable to a claimed two-minute win on another, depending on how each platform counts time.",
  },
];

export const metadata: Metadata = {
  title: `Spider Solitaire Records and Notable Achievements | ${siteConfig.siteName}`,
  description:
    "Spider Solitaire records: fastest wins by suit count, win streaks, fewest-move games, solver benchmarks, and tips for setting personal bests.",
  keywords: [
    "spider solitaire records",
    "spider solitaire world record",
    "spider solitaire fastest win",
    "spider solitaire win streak",
    "spider solitaire fewest moves",
    "spider solitaire solver",
    "spider solitaire leaderboard",
    "spider solitaire personal best",
  ],
  openGraph: {
    title: "Spider Solitaire Records and Notable Achievements",
    description:
      "Community achievements, computational benchmarks, speed records, win streaks, and what it takes to set your own Spider Solitaire personal bests.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
};

export default function SpiderWorldRecordsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Records and Notable Achievements",
      description:
        "An honest survey of Spider Solitaire records: fastest wins, longest win streaks, fewest-move completions, solver benchmarks, community leaderboards, verification challenges, and practical advice for personal bests.",
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Spider Solitaire",
          item: absoluteUrl("/spider"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Records",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Solitaire Records and Notable Achievements"
        subtitle="Fastest wins, longest streaks, fewest moves, solver benchmarks, and what the community has actually documented -- plus how to set your own personal bests."
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

        {/* Fastest Known Spider Wins */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="By Suit Count"
            id="fastest-wins"
            icon={"\u2660"}
          >
            Fastest known Spider wins
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Speed records in Spider Solitaire are poorly centralized
              compared to games like Minesweeper or Tetris, which have
              dedicated speedrunning communities with standardized timing.
              Spider speed claims exist mostly on platform-specific
              leaderboards, forum posts, and occasional YouTube
              demonstrations. That fragmentation makes it hard to cite a
              single authoritative fastest time for any mode. What follows
              is our best reading of what the community has documented,
              with honest caveats about verification.
            </p>
            <p>
              In 1-suit Spider, fast completions regularly come in under
              two minutes of active play time. The fastest credible claims
              we have seen sit in the 60-to-90-second range, though these
              depend heavily on the platform&apos;s interface speed and
              whether the timer counts animation time. A sub-60-second
              1-suit completion is theoretically possible on a platform
              with fast card movement and a favorable deal, but we have
              not seen a verifiable instance. The key variable in 1-suit
              speed is not deep strategy but recognition speed: how
              quickly the player identifies the correct move sequence
              without backtracking.
            </p>
            <p>
              In 2-suit Spider, fast completions typically fall in the
              three-to-five-minute range. Sub-three-minute claims exist
              but are rare and usually platform-dependent. The additional
              suit constraint slows play because each move requires a
              suit check, and misplays are more costly. Speed in 2-suit
              is less about raw clicking speed and more about pattern
              recognition for same-suit runs.
            </p>
            <p>
              In 4-suit Spider, fast completions are measured in the
              five-to-ten-minute range for strong players. Completing a
              4-suit game at all is an achievement for most players;
              completing one quickly requires both a favorable deal and
              expert-level play. We are not aware of any widely-verified
              sub-five-minute 4-suit completion, though individual claims
              surface occasionally. The cognitive overhead of tracking
              four suits and planning multi-move sequences makes
              4-suit speed qualitatively different from 1-suit speed.
            </p>
          </ContentBody>
        </CardSection>

        {/* Highest Win Streaks */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Consecutive Wins"
            id="win-streaks"
            icon={"\u2665"}
          >
            Highest win streaks
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Win streaks are the record type that players care about
              most, because they measure sustained consistency rather
              than a single peak performance. A long streak means you
              played well across many deals, including some difficult
              ones. The mathematics of streaks also makes them impressive
              at lower numbers than people expect: even a modest streak
              of five consecutive 4-suit wins, at a 25% base win rate,
              has a probability of roughly 0.1% per starting game.
            </p>
            <p>
              In 1-suit Spider, streaks of 20 to 50 consecutive wins are
              commonly reported by experienced players. Longer streaks --
              100 or more -- are plausible given the high base win rate
              but are rarely tracked because most players do not maintain
              detailed logs at that difficulty level. The theoretical
              expected streak length for a player winning 90% of 1-suit
              games is around 10 games (the geometric distribution mean),
              but observed streaks run longer because skilled players
              win well above 90% on average deals.
            </p>
            <p>
              In 2-suit Spider, streaks of 10 to 20 consecutive wins
              represent strong play. Anything above 20 is noteworthy.
              The structural unwinnability rate (estimated at 8 to 15
              percent of deals) puts a soft ceiling on how long any
              streak can reasonably run, regardless of player skill.
              A streak of 30 or more 2-suit wins would require either
              extraordinary skill, favorable deals, or both.
            </p>
            <p>
              In 4-suit Spider, any streak beyond three consecutive wins
              is statistically interesting. Streaks of five to eight
              4-suit wins surface in community forums, and we treat
              those as credible given that strong players win 30 to 40
              percent of games. A streak of ten or more consecutive
              4-suit wins would be remarkable and, to our knowledge,
              has not been publicly documented with verification. The
              combination of high structural unwinnability and the
              skill ceiling makes long 4-suit streaks genuinely rare
              events.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Fewest Moves Records */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Move Efficiency"
            id="fewest-moves"
            icon={"\u2666"}
          >
            Fewest moves records
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Move count is the most objective measure of Spider
              efficiency, because it is platform-independent (a move is
              a move, regardless of interface speed). However, what
              counts as a &ldquo;move&rdquo; varies between
              implementations. Some platforms count each card placement
              individually; others count a group move (moving a run of
              five same-suit cards) as a single move. That difference
              can easily account for a 30 to 50 percent swing in
              reported move counts, which makes cross-platform
              comparisons unreliable without knowing the counting method.
            </p>
            <p>
              In 1-suit Spider under single-card counting, efficient
              completions typically require 85 to 110 moves. Under
              group-move counting, the same game might register 50 to
              70 moves. The theoretical minimum depends on the specific
              deal -- some deals require fewer card movements than others
              based on how the initial tableau aligns -- but very few
              deals can be completed in under 80 single-card moves.
            </p>
            <p>
              In 2-suit and 4-suit, move counts rise substantially
              because mismatched suits require more rearrangement.
              A well-played 2-suit game typically runs 120 to 180 moves
              (single-card counting). A well-played 4-suit game often
              exceeds 200 moves and can reach 300 or more on complex
              deals. The fewest-move records we have seen claimed for
              4-suit sit around 150 to 170 single-card moves, but
              these require unusually cooperative deals where the
              initial distribution happens to minimize rearrangement.
            </p>
            <p>
              The relationship between move count and win probability
              is worth noting. Games that end in fewer moves tend to
              be games where the deal was favorable. Conversely, games
              that drag past 250 moves often end in losses because the
              extended rearrangement signals a difficult card
              distribution. Tracking your average move count per win
              is a useful diagnostic: if the number is trending down
              over time, you are finding more efficient paths through
              the game.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Debate Over Perfect Play */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Theory vs. Practice"
            id="perfect-play"
            icon={"\u2663"}
          >
            The debate over perfect play
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              &ldquo;Perfect play&rdquo; in Spider Solitaire is a
              contested concept. In FreeCell, where all cards are
              visible from the start, perfect play has a clear
              definition: the sequence of moves that wins the game if
              any winning sequence exists. In Spider, 44 cards begin
              face-down and 50 more arrive through the stock, which
              means the player never has full information. Perfect play
              in Spider therefore depends on what you assume the player
              knows.
            </p>
            <p>
              Omniscient perfect play assumes the player can see every
              card, including face-down and stock cards. Under this
              definition, the theoretical win rate represents the upper
              bound -- the fraction of deals that have any winning
              path at all. This is what most solver studies measure.
              The numbers (roughly 92-98% for 1-suit, 82-90% for
              2-suit, 45-60% for 4-suit) represent what a hypothetical
              perfect player with x-ray vision could achieve.
            </p>
            <p>
              Realistic perfect play assumes the player cannot see
              hidden cards but makes the statistically optimal decision
              at every point given the visible information. This is
              much harder to compute because it requires reasoning
              about probability distributions over hidden cards.
              No published solver fully implements realistic perfect
              play for Spider -- the computational complexity is
              prohibitive for full-stock 4-suit games. The gap between
              omniscient and realistic perfect play is itself unknown,
              which is one reason the community debates what
              &ldquo;perfect&rdquo; means in this context.
            </p>
            <p>
              The practical takeaway is that no human is playing
              perfectly by either definition. The best human players
              are operating somewhere below the realistic perfect-play
              ceiling, which is itself below the omniscient ceiling.
              That leaves room for improvement for everyone, and it
              means that any claimed &ldquo;perfect game&rdquo; in
              Spider should be understood as &ldquo;a game where the
              player made no obviously suboptimal moves,&rdquo; not
              as a mathematically proven optimal sequence.
            </p>
          </ContentBody>
        </CardSection>

        {/* Computer Solvers and Spider */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Algorithmic Approaches"
            id="computer-solvers"
            icon={"\u2660"}
          >
            Computer solvers and Spider
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Building a Spider Solitaire solver is substantially harder
              than building a FreeCell solver. FreeCell&apos;s open
              information and small state space make it tractable for
              brute-force search: solvers like FreeCell Solver by
              Shlomi Fish can evaluate millions of positions per second
              and have essentially mapped the entire game. Spider&apos;s
              hidden information, stock deals, and larger branching
              factor make the same brute-force approach impractical for
              realistic (non-omniscient) play.
            </p>
            <p>
              The algorithmic approaches that Spider solvers use fall
              into a few categories. Exhaustive search with omniscient
              knowledge is the simplest: reveal all cards, then use
              depth-first or breadth-first search to find a winning
              move sequence. This works but only measures omniscient
              winnability, not realistic playability. Monte Carlo
              methods sample random assignments for hidden cards and
              solve each sample, then aggregate results to estimate
              the probability of a win under uncertainty. Heuristic
              solvers use evaluation functions (column emptiness,
              suit-run length, face-down card count) to guide search
              toward promising branches without exhaustive exploration.
            </p>
            <p>
              Notable community solver projects include open-source
              implementations hosted on GitHub that tackle 1-suit and
              2-suit modes with reasonable accuracy. Full 4-suit solvers
              with stock integration remain rare because the search
              space is enormous. The most ambitious projects combine
              Monte Carlo sampling with heuristic pruning to make
              4-suit tractable, but they typically run for minutes per
              deal rather than the milliseconds that FreeCell solvers
              achieve.
            </p>
            <p>
              Machine learning approaches have been explored but not
              yet produced a dominant Spider solver. The partially
              observable nature of Spider makes it a more natural fit
              for reinforcement learning than for supervised learning,
              but the long game length (often 200+ moves) and sparse
              reward signal (win or lose, with few intermediate
              milestones) make training difficult. This remains an
              open area of hobbyist and academic interest.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* Community Records and Leaderboards */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Where Players Compete"
            id="community-records"
            icon={"\u2665"}
          >
            Community records and leaderboards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire records live on platform-specific
              leaderboards rather than any centralized registry. The
              Microsoft Solitaire Collection maintains internal
              leaderboards ranked by time and score. Various web-based
              Spider implementations track fastest completions and
              highest scores for their user bases. Mobile apps
              sometimes publish top-player lists. None of these
              leaderboards talk to each other, so a &ldquo;world
              record&rdquo; on one platform may not even be the
              fastest time on another platform.
            </p>
            <p>
              This fragmentation is the central problem with Spider
              records. Without a unified platform, there is no way to
              compare achievements across implementations. Different
              platforms use different shuffling algorithms, different
              move-counting methods, different timer behaviors, and
              different deal numbering systems. A score of 1200 on one
              platform means nothing on another unless you know how
              both platforms calculate scores.
            </p>
            <p>
              Community forums -- Reddit&apos;s r/solitaire, dedicated
              solitaire Discord servers, and older web forums -- are
              where players share their best results informally.
              Screenshot evidence is the most common form of
              verification, though screenshots are easy to fabricate.
              Video recordings provide stronger evidence but are
              rare for solitaire achievements. The most credible
              community records are those that come with video evidence,
              a named platform, and a deal number that others can
              independently attempt.
            </p>
            <p>
              Some players maintain personal spreadsheets or blogs
              documenting their Spider performance over hundreds or
              thousands of games. These long-form records are
              valuable for understanding skill progression even if
              they do not represent competitive &ldquo;records&rdquo;
              in the traditional sense. A player who documents 1,000
              consecutive 4-suit games with dates, move counts, and
              outcomes is contributing something more useful to the
              community&apos;s understanding than a single unverifiable
              speed claim.
            </p>
          </ContentBody>
        </CardSection>

        {/* How Records Are Verified */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="The Trust Problem"
            id="verification"
            icon={"\u2666"}
          >
            How records are verified
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Verification is the weakest link in Spider Solitaire
              records. Unlike speedrunning communities that have
              standardized tools (LiveSplit, video proof requirements,
              leaderboard moderators), the solitaire world has no
              equivalent infrastructure. Most claimed records are
              self-reported with a screenshot at best.
            </p>
            <p>
              The gold standard for a verifiable Spider record would
              include: a video recording of the entire game from deal
              to completion, identification of the platform and version,
              a deal number or seed that others can replay, clear
              display of the timer and move counter throughout, and
              no evidence of undo usage (or explicit disclosure of undo
              policy). Very few claimed records meet all of these
              criteria. Most meet none.
            </p>
            <p>
              The undo question is particularly important. Many Spider
              implementations offer unlimited undo, which effectively
              lets the player explore the game tree manually. A
              &ldquo;fastest win&rdquo; achieved with unlimited undo
              is a fundamentally different achievement from one
              achieved without it, yet most claimed records do not
              disclose whether undo was available or used. Any
              serious record-tracking effort would need to separate
              undo-allowed and no-undo categories, much as speedrunning
              separates glitchless and any-percent categories.
            </p>
            <p>
              Until the solitaire community develops standardized
              verification practices, all Spider records should be
              treated as claims rather than facts. That is not cynicism
              -- it is the honest state of the evidence. The records
              are probably real in most cases, but the infrastructure
              to confirm them does not yet exist.
            </p>
          </ContentBody>
        </CardSection>

        {/* Setting Your Own Records */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Personal Bests"
            id="your-records"
            icon={"\u2663"}
          >
            Setting your own records
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The most meaningful Spider records are the ones you set
              against yourself. Community records are interesting but
              unverifiable; your own personal bests are fully within
              your control and fully verifiable by definition. Here
              is how to approach personal record-setting productively.
            </p>
            <p>
              Track multiple metrics, not just win rate. Your rolling
              50-game win rate is the single most informative number,
              but fastest completion time, fewest moves per win, and
              longest win streak each measure different skills. A player
              who improves their average move count while holding win
              rate steady is finding more efficient paths, which is
              genuine progress even if the headline number does not
              change.
            </p>
            <p>
              Set mode-appropriate goals. In 1-suit, aim for a win
              streak of 20 or more, a completion time under two
              minutes, and a move count under 90 per game. In 2-suit,
              aim for a win rate above 70 percent over 50 games, a
              streak of 10 or more, and a move count under 150. In
              4-suit, aim for a win rate above 25 percent over 50
              games, a streak of 3 or more, and a move count under
              200 on wins. These targets represent strong play without
              being unreachable.
            </p>
            <p>
              Use a simple log. A spreadsheet or notebook tracking
              date, mode, outcome (win or loss), move count, and time
              is enough. Review the log weekly to spot patterns. You
              will likely discover that your losses cluster around
              specific situations -- stock-deal timing errors, premature
              column-filling, suit-discipline lapses -- and that naming
              those patterns accelerates improvement. The log converts
              abstract practice into concrete data, and concrete data
              is what drives deliberate improvement.
            </p>
            <p>
              Compare yourself to your past self, not to community
              claims. A 4-suit win rate that climbs from 10 percent to
              20 percent over a month represents real, earned progress.
              That improvement matters more than whether someone on the
              internet claims to win 50 percent of 4-suit games. Your
              own trajectory is the only record that is fully honest
              and fully yours.
            </p>
          </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Common Questions"
            id="faq"
            icon={"\u2660"}
          >
            Frequently asked questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Read Next"
            id="related"
            icon={"\u2665"}
          >
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy Guide"
              description="Core strategic framework for all three suit modes -- columns, suits, stock timing, and empty-column management."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-winnability"
              title="Spider Winnability"
              description="Data-driven analysis of win rates by mode, solver benchmarks, and the structural reasons behind Spider's difficulty."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/tips"
              title="Spider Tips and Tricks"
              description="Practical advice for immediate improvement -- the habits that separate casual from consistent players."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-mastery"
              title="Spider Mastery"
              description="The full strategy pillar -- structural math, four pillars, opening framework, and the ten mistakes that cost games."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Start tracking your own records"
          body={
            <>
              The best Spider records are the ones you set against
              yourself. Play a session, note your results, and watch
              the numbers improve over time.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the strategy guide"
          secondaryHref="/spider/strategy"
        />
      </main>
    </ContentLayout>
  );
}
