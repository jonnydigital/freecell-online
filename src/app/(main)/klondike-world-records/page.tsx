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

const PAGE_PATH = "/klondike-world-records";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

export const metadata: Metadata = {
  title: `Klondike Solitaire Records and Achievements | ${siteConfig.siteName}`,
  description:
    "Fastest Klondike wins, longest win streaks, fewest-move finishes, solvability research, and competitive solitaire milestones. Verified records and honest estimates.",
  keywords: [
    "klondike solitaire records",
    "solitaire world records",
    "fastest klondike win",
    "klondike win streak record",
    "klondike solvability percentage",
    "solitaire achievements",
    "competitive solitaire",
    "klondike solitaire statistics",
    "solitaire pop culture",
    "klondike draw 1 vs draw 3 solvability",
  ],
  openGraph: {
    title: "Klondike Solitaire Records and Achievements",
    description:
      "Speed records, win streaks, solvability research, and competitive milestones from the Klondike Solitaire community.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
};

const faqs = [
  {
    question: "What percentage of Klondike Solitaire deals are winnable?",
    answer:
      "For Draw 1 with unlimited stock passes, computational studies estimate roughly 79 to 82 percent of deals are solvable by a perfect player. Draw 3 solvability is lower and less firmly established, with estimates ranging from about 75 to 82 percent depending on the solver and rule set. No study has exhaustively solved all possible deals, so these remain well-supported estimates rather than proven totals.",
  },
  {
    question: "What is the fastest recorded time to win a game of Klondike?",
    answer:
      "Community-reported speed records on Draw 1 sit in the range of 30 to 45 seconds for favorable deals, but no centralized governing body verifies these claims. Microsoft Solitaire Collection and similar platforms track personal bests internally, and some players have shared sub-30-second screenshots, though independent verification is rare. The fastest credible times come from deals where most low cards are exposed at the start.",
  },
  {
    question: "Is there a professional solitaire league or governing body?",
    answer:
      "There is no single international governing body for competitive solitaire. Microsoft hosts the Solitaire World Championship through its Solitaire Collection app, which is the closest thing to an official competitive circuit. Some online platforms run ranked ladders and seasonal tournaments, but competitive solitaire remains informal compared to chess or poker.",
  },
  {
    question:
      "Can a computer always beat a human at Klondike Solitaire?",
    answer:
      "A perfect-information solver that can see all face-down cards will always outperform a human, because it can compute optimal play for every deal. But Klondike is a partial-information game for human players: you cannot see face-down tableau cards or the stock order in advance. Solvers that respect partial information still outperform humans, but the gap is smaller than you might expect. The best human players reach win rates of 60 to 70 percent in Draw 1, while solvers with perfect information reach 79 to 82 percent.",
  },
];

export default function KlondikeWorldRecordsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Solitaire Records and Achievements",
      description:
        "Fastest Klondike wins, longest win streaks, fewest-move finishes, solvability research, and competitive solitaire milestones.",
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
          name: "Klondike Solitaire Records",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Solitaire Records and Achievements"
        subtitle="Speed records, win streaks, solvability research, move-count analysis, and competitive milestones from the community and from computational studies."
        kicker="Records and Achievements"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-research-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* ---- Fastest Wins ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Speed Records"
            id="fastest-wins"
            icon={"\u2660"}
          >
            The fastest Klondike wins on record
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Speed records in Klondike are difficult to verify because there is
              no central governing body and different apps measure time
              differently. Some implementations start the clock on the first
              move; others start it when the deal is laid out. Auto-complete
              behavior also matters: a game that auto-sends the last twenty
              cards in a batch will clock a faster finish than a game that
              requires manual sends.
            </p>
            <p>
              With those caveats, community-reported times for Draw 1
              Klondike cluster around 30 to 50 seconds on highly favorable
              deals. Players on the Microsoft Solitaire Collection forums and
              Reddit&apos;s r/solitaire have posted screenshots in the low
              30-second range, typically on deals where all four Aces and most
              low cards are exposed or one card deep. These are credible but
              unverified in the way that, say, a Guinness record is verified.
            </p>
            <p>
              Draw 3 speed records are inherently slower because the stock must
              be cycled in groups of three, which adds time even on the most
              cooperative deals. Credible Draw 3 speed reports sit in the 90
              to 150 second range for experienced players. The mechanical
              overhead of cycling through the stock three cards at a time
              imposes a floor that Draw 1 does not have.
            </p>
            <p>
              What separates a fast win from a normal win is almost entirely
              deal quality. The player&apos;s skill ceiling for speed is
              reached quickly: once you can recognize plays instantly and move
              cards without hesitation, the remaining bottleneck is how many
              cards need to cycle through the stock. A deal that puts most of
              its Aces and 2s on the tableau is simply faster to finish than
              one that buries them in the stock, regardless of the
              player&apos;s reflexes.
            </p>
          </ContentBody>
        </CardSection>

        {/* ---- Win Streaks ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Consistency Records"
            id="win-streaks"
            icon={"\u2665"}
          >
            Highest known win streaks
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Win streaks are a better measure of sustained skill than any
              single fast game. A long win streak in Draw 1 requires both high
              skill and some luck, because even the best human players cannot
              win every solvable deal. Streaks of 20 to 40 consecutive wins
              in Draw 1 are reported regularly by experienced players. Streaks
              above 50 are rare and typically involve careful deal selection or
              the use of unlimited undo.
            </p>
            <p>
              The question of what counts as a &quot;fair&quot; win streak is
              contentious in the community. Some players define a streak as
              consecutive wins without quitting or restarting any deal. Others
              allow themselves to abandon a deal that looks hopeless without
              breaking the streak, counting only completed games. The
              distinction matters enormously: under strict rules, a single
              unsolvable deal ends the streak through no fault of the player.
            </p>
            <p>
              Microsoft Solitaire Collection tracks streaks internally and
              reports that top percentile players sustain Draw 1 streaks in
              the 30 to 50 range under its standard rules. Draw 3 streaks
              are dramatically shorter. Even highly skilled Draw 3 players
              rarely sustain streaks above 10 to 15, because the lower human
              win rate in Draw 3 means that losing a winnable deal is more
              common and encountering an unsolvable deal is harder to
              distinguish from a mistake.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ---- Fewest Moves ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Move Minimization"
            id="fewest-moves"
            icon={"\u2666"}
          >
            Fewest moves to win: theoretical minimum analysis
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every winning Klondike game ends with 52 cards on the
              foundations. The question is how many moves it takes to get
              them there, and the answer depends entirely on how you define a
              move. If you count only foundation sends and ignore everything
              else, the theoretical minimum is exactly 52. No real game works
              that way, because cards do not teleport from the stock and
              tableau to the foundations without intermediate steps.
            </p>
            <p>
              Under more realistic counting, where each stock draw, each
              tableau-to-tableau transfer, and each foundation send counts as
              one move, the theoretical minimum on a maximally favorable deal
              is estimated at roughly 60 to 85 moves. Research solvers can
              compute the exact minimum for any specific deal, but those
              numbers are deal-specific. A deal where all Aces sit on top of
              short tableau columns and the stock contains only cards that go
              directly to the foundations would require fewer moves than one
              where the Aces are buried under six face-down cards.
            </p>
            <p>
              The practical takeaway is that move counts below 80 in standard
              counting represent very efficient play on a favorable deal.
              Counts below 60 are almost certainly either errors in counting
              or games played under rules that collapse multi-card actions
              into a single move. For a deeper look at counting methods and
              the records people claim, see our{" "}
              <Link
                href="/klondike-fewest-moves"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                fewest moves analysis
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* ---- Win Rate Records ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Human vs Computer"
            id="win-rates"
            icon={"\u2663"}
          >
            Win rate records: human vs computer
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Human win rates in Klondike vary widely by skill level and draw
              mode. Casual players typically win 15 to 30 percent of their
              Draw 1 games. Experienced players who apply basic strategy reach
              40 to 55 percent. Expert players who study the game seriously
              report sustained win rates of 60 to 70 percent in Draw 1, and
              some claim rates above 75 percent over large samples, though
              these claims are difficult to verify independently.
            </p>
            <p>
              Computer solvers with perfect information, meaning they can see
              all face-down cards and the stock order, solve roughly 79 to 82
              percent of Draw 1 deals. This figure represents the true
              solvability ceiling for Draw 1 Klondike under standard rules
              with unlimited stock passes. The remaining 18 to 21 percent of
              deals are provably unsolvable: no sequence of legal moves can
              win them regardless of skill.
            </p>
            <p>
              The gap between the best human players at around 70 percent and
              solvers at around 80 percent comes from information asymmetry.
              Humans cannot see face-down cards, so they must make decisions
              under uncertainty. A solver that sees everything can choose the
              provably optimal path; a human sometimes guesses wrong about
              what lies beneath a face-down card and loses a deal that was
              technically solvable. That 10-percentage-point gap is the cost
              of playing with hidden information.
            </p>
            <p>
              Draw 3 win rates are lower across the board. Casual players win
              5 to 15 percent. Experienced players reach 15 to 25 percent.
              Expert players report 25 to 35 percent. Solver solvability for
              Draw 3 is less firmly established but is estimated at 75 to 82
              percent depending on rule variations around stock cycling and
              pass limits.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ---- Solvability Question ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="The Math"
            id="solvability"
            icon={"\u2660"}
          >
            The Klondike solvability question
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              One of the most studied questions in recreational mathematics
              is: what fraction of Klondike deals are winnable? The answer is
              not as clean as you might hope, because it depends on rule
              variations and no complete enumeration of all possible deals
              has been performed.
            </p>
            <p>
              For Draw 1 with unlimited passes through the stock, the best
              available estimates come from large-scale solver runs.
              Researchers including Bjarnason, Tadayon, and others have
              published studies solving millions of random deals and
              reporting solvability rates in the range of 79 to 82 percent.
              The variation comes from differences in rule interpretation:
              whether partial sequences can be moved, whether empty columns
              accept only Kings, and how the stock resets after a full pass.
              Under the most common tournament rules, 82 percent is a
              widely cited upper bound.
            </p>
            <p>
              Draw 3 solvability is harder to pin down. The same studies
              that solve Draw 1 at 82 percent tend to find Draw 3 solvability
              in the range of 75 to 82 percent, but the uncertainty is
              larger because Draw 3 solving is computationally more expensive.
              The stock cycling in Draw 3 creates a much larger game tree,
              and exhaustive search is impractical for many deals. Some
              estimates go as low as 75 percent; others claim parity with
              Draw 1 if unlimited passes are allowed. The honest answer is
              that we do not know Draw 3 solvability as precisely as we know
              Draw 1.
            </p>
            <p>
              What we can say with confidence is that roughly one in five
              Klondike deals cannot be won by any player or any computer.
              When you lose a game, there is a real chance, roughly 18 to 21
              percent in Draw 1, that the loss was inevitable. That is a
              useful thing to know for setting realistic expectations and for
              understanding why even perfect play does not produce a 100
              percent win rate. For a fuller treatment of the probability
              landscape, see our{" "}
              <Link
                href="/klondike-probability"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Klondike probability page
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* ---- Pop Culture ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="In the Spotlight"
            id="pop-culture"
            icon={"\u2665"}
          >
            Famous solitaire moments in pop culture
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire entered the digital mainstream when Microsoft bundled
              it with Windows 3.0 in 1990. The story, well documented in
              Microsoft&apos;s own retrospectives, is that the game was
              included partly to teach users how to drag and drop with a
              mouse. It worked. Within a few years, office workers worldwide
              were spending significant portions of their day playing
              Klondike, and IT departments began blocking the game on
              corporate machines. A 2003 estimate by a New York City
              official claimed that city employees spent 250,000 hours per
              year playing solitaire on work computers, a figure that was
              widely reported and is plausible if unverified.
            </p>
            <p>
              The cultural footprint extended beyond office productivity
              debates. Solitaire appeared in films and television as
              shorthand for boredom, waiting, or solitude. The green felt
              background of the Windows version became an instantly
              recognizable visual cue. When Microsoft redesigned Solitaire
              for Windows 8 and later merged it into the Microsoft Solitaire
              Collection, the app eventually reached over 35 million monthly
              active users, making it one of the most played games in the
              world by any measure.
            </p>
            <p>
              The cascading card animation that played when you won a game
              of Klondike on early versions of Windows became iconic in its
              own right. Microsoft kept it in later versions because players
              expected it, and it has been referenced and parodied in other
              software and media. That animation is, for many people, the
              single most memorable moment in any solitaire game they have
              ever played.
            </p>
          </ContentBody>
        </CardSection>

        {/* ---- Competitive Tournaments ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Competition"
            id="tournaments"
            icon={"\u2666"}
          >
            Competitive solitaire tournaments
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Competitive solitaire is a small but growing space. The most
              prominent event is the Microsoft Solitaire World Championship,
              which has been running annually through the Microsoft Solitaire
              Collection app. Players compete across multiple solitaire
              variants including Klondike, Spider, FreeCell, Pyramid, and
              TriPeaks, with rankings based on speed and completion across
              a set of shared deals.
            </p>
            <p>
              The format addresses the biggest challenge of competitive
              solitaire: luck. By giving all competitors the same deals,
              the tournament isolates skill from deal quality. Everyone
              faces the same unsolvable deals and the same favorable deals.
              The winner is the player who extracts the most wins in the
              least time from the same set of cards. This is a meaningful
              test of skill, even though the game retains a significant
              luck component within any single deal.
            </p>
            <p>
              Outside the Microsoft event, several online platforms run
              ranked ladders and seasonal competitions. These are smaller
              in scale but often more focused on a single variant.
              Klondike-specific tournaments tend to use Draw 1 as the
              competitive standard because the higher solvability rate
              reduces the impact of unsolvable deals on final rankings.
              Draw 3 tournaments exist but are less common because the
              lower human win rate means more variance in outcomes.
            </p>
            <p>
              The competitive solitaire community is small enough that most
              serious players know each other by screen name. There is no
              prize money comparable to poker or chess tournaments. The
              motivation is personal achievement, leaderboard ranking, and
              the satisfaction of demonstrating that solitaire is a game
              where skill matters. That last point is important to a
              community that frequently encounters the dismissive claim
              that solitaire is &quot;just luck.&quot;
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ---- Personal Records ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Your Records"
            id="personal-records"
            icon={"\u2663"}
          >
            Setting your own personal records
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The most meaningful Klondike records are personal ones. Your
              win rate over your last 100 games, your fastest win, your
              longest streak: these are the numbers that track your actual
              improvement. Comparing yourself to community records is fun
              but less useful, because you cannot control which deals you
              receive and different apps count things differently.
            </p>
            <p>
              To set better personal records, focus on the three metrics that
              respond most to skill: win rate, average moves per win, and
              win streak length. Win rate improves when you learn to
              recognize and abandon unsolvable deals early instead of
              grinding through them. Average moves per win improves when you
              plan before cycling the stock and avoid unnecessary tableau
              rearrangements. Win streak length improves when you combine
              a high win rate with the discipline to play every deal
              carefully instead of rushing through.
            </p>
            <p>
              Tracking your statistics over time is more valuable than
              checking them after a single session. A bad session does not
              mean your skill has regressed; it means the deals were
              unfavorable or your focus was low. A good session does not
              mean you have suddenly improved; it means the conditions
              were right. The signal emerges over hundreds of games. If
              your Draw 1 win rate is 45 percent this month and was 38
              percent three months ago, that seven-point improvement is
              real and reflects genuine skill growth.
            </p>
            <p>
              One habit that accelerates improvement: after losing a deal,
              spend ten seconds asking why. Was it an unsolvable deal? A
              premature foundation send? A King placed in the wrong column?
              A stock cycle where you played cards without a target? Most
              losses have a specific cause, and naming it once is often
              enough to avoid it next time.
            </p>
          </ContentBody>
        </CardSection>

        {/* ---- FAQ ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Common Questions"
            id="faq"
            icon={"\u2660"}
          >
            Frequently asked questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <h3 className="font-medium text-white text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                {index < faqs.length - 1 && (
                  <div className="mt-6 border-b border-white/[0.07]" />
                )}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ---- Related Guides ---- */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Keep Reading"
            id="related"
            icon={"\u2665"}
          >
            Related Klondike guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike/strategy"
              title="Klondike Strategy"
              description="The core strategic principles that separate winning Klondike play from random clicking."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-probability"
              title="Klondike Probability"
              description="Solvability bounds, simulation methodology, and the math behind winnability."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/tips"
              title="Klondike Tips"
              description="Quick tactical tips distilled from the mastery guide for faster improvement."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-mastery"
              title="Klondike Mastery"
              description="The complete long-form guide to playing Klondike at a high level."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready to set your own records?"
          body="Open a Draw 1 or Draw 3 game and start tracking your win rate, streak, and fastest time."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the strategy guide"
          secondaryHref="/klondike/strategy"
        />
      </main>
    </ContentLayout>
  );
}
