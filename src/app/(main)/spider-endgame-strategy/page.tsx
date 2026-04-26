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

const PAGE_PATH = "/spider-endgame-strategy";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

const FAQS = [
  {
    question: "How many cards are typically left in a Spider endgame?",
    answer:
      "There is no fixed threshold, but most experienced players consider the endgame to begin once the last stock deal has been made and the tableau is entirely face-up. That usually leaves between 30 and 50 cards on the tableau, depending on how many suits have already been completed. The practical distinction is that once the stock is empty, the game becomes fully deterministic -- no new information will arrive, and every move is a planning decision rather than a risk assessment.",
  },
  {
    question: "Should I complete suits as fast as possible in the endgame?",
    answer:
      "Not necessarily. Completing a suit removes thirteen cards from play, which frees space, but it also removes cards that may be serving as structural scaffolding -- holding up runs, preserving empty columns, or providing landing spots for other sequences. The correct approach is to complete a suit when the removal creates more working room than the cards were providing. If completing a suit leaves you with fewer empty columns than you had before, delay it.",
  },
  {
    question: "What is the most common endgame mistake in Spider Solitaire?",
    answer:
      "Filling an empty column without a plan to reopen it. Empty columns are the primary resource in the endgame, and every card placed into one is a commitment. Players who treat empty columns as convenient dumping grounds lose games they should have won. Before placing anything in an empty column, you need a concrete plan -- usually expressed in moves -- for how that column will become empty again.",
  },
  {
    question: "How do I know if my Spider endgame position is still winnable?",
    answer:
      "Count your empty columns, count the suits that are close to completion (ten or more cards in same-suit descending order), and count the number of off-suit blocks separating those near-complete runs. If you have at least one empty column and at most two off-suit blockers per near-complete suit, the position is usually solvable. If you have zero empty columns and multiple tangled suits, the position is likely dead even if it does not feel obviously stuck.",
  },
  {
    question: "Does endgame strategy differ between 1-suit, 2-suit, and 4-suit Spider?",
    answer:
      "The principles are the same -- empty column management, suit completion sequencing, deadlock avoidance -- but the difficulty of execution scales sharply. In 1-suit, every run is automatically same-suit, so the endgame is almost always solvable if you have not wasted columns. In 4-suit, off-suit entanglements are common, and you may need to disassemble long runs card by card to resolve them, which demands far more empty columns than the same position in 1-suit.",
  },
];

export const metadata: Metadata = {
  title: `Spider Solitaire Endgame Strategy -- Closing Out the Win | ${siteConfig.siteName}`,
  description:
    "Master the Spider Solitaire endgame: suit completion sequencing, empty column management after the last stock deal, deadlock avoidance, and when to accept a loss. A tactical guide for the final stretch.",
  keywords: [
    "spider solitaire endgame",
    "spider solitaire endgame strategy",
    "spider solitaire late game",
    "spider solitaire last stock deal",
    "spider solitaire suit completion",
    "spider solitaire empty column strategy",
    "spider solitaire deadlock",
    "spider solitaire closing strategy",
    "spider solitaire winning tips",
  ],
  openGraph: {
    title: "Spider Solitaire Endgame Strategy -- Closing Out the Win",
    description:
      "How to navigate the final phase of a Spider Solitaire hand: recognizing a winnable position, sequencing suit completions, managing columns after the last deal, and knowing when a position is dead.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
};

export default function SpiderEndgameStrategyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        {
          "@type": "ListItem",
          position: 3,
          name: "Endgame Strategy",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Endgame Strategy -- Closing Out the Win",
      description:
        "Tactical guide to the Spider Solitaire endgame: recognizing winnable positions, sequencing suit completions, empty column management, deadlock patterns, and the decision to resign.",
      author: {
        "@type": "Organization",
        name: "The Strategy Desk",
        url: absoluteUrl("/authors/the-strategy-desk"),
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
        title="Spider Solitaire Endgame Strategy -- Closing Out the Win"
        subtitle="The stock is empty, the tableau is face-up, and every remaining move is a planning decision. Here is how to convert a late-game advantage into a finished hand."
        kicker="Endgame Pillar"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* What Counts as the Endgame in Spider */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Defining the Phase" id="what-is-endgame" icon={"\u2660"}>
            What counts as the endgame in Spider
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The endgame in Spider Solitaire begins when you have dealt the
              last row from the stock. At that point no new cards will enter
              the tableau, every remaining card is either face-up or sitting
              beneath face-up cards you already know about, and the game
              becomes a closed system. Before that moment, play is a mixture
              of strategy and risk management &mdash; you plan around partial
              information because you do not know what the next deal will
              bring. After that moment, the game is purely strategic. Every
              card is accounted for, every column is visible, and the only
              question is whether you can untangle what you have into eight
              completed suits.
            </p>
            <p>
              Some players mark the endgame differently: after three suits
              are complete, or after reaching fewer than forty cards on the
              tableau. Those are reasonable working definitions, but the
              stock-empty threshold is the structurally meaningful one,
              because it is the point where the nature of the game changes.
              Before the last deal, you are playing a game of adaptive risk.
              After the last deal, you are solving a fixed puzzle. The skills
              overlap, but the mindset should shift.
            </p>
            <p>
              In practical terms, the endgame often covers between fifteen
              and forty moves. That is not a large window, but the decisions
              inside it are dense. A single misplaced card in the endgame
              can deadlock a position that was solvable thirty seconds
              earlier. The margin is thin precisely because no new
              information will arrive to bail you out.
            </p>
          </ContentBody>
        </CardSection>

        {/* Recognizing a Winnable Position */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Board Reading" id="winnable-position" icon={"\u2665"}>
            Recognizing a winnable position
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Not every endgame is winnable. In 4-suit Spider, a substantial
              fraction of games reach the final phase already dead &mdash; the
              cards are tangled in a way that no sequence of moves can
              resolve. Recognizing whether your position is live or dead
              before you start executing saves time and teaches you to read
              board states, which is itself a transferable skill.
            </p>
            <p>
              The first diagnostic is empty columns. If you enter the
              endgame with at least one empty column, your position is
              usually live. Empty columns are the working space you need to
              disassemble mixed runs, shuttle cards between stacks, and
              reassemble same-suit sequences. A position with zero empty
              columns and significant off-suit entanglement is almost
              always dead in 4-suit, and often dead in 2-suit as well.
            </p>
            <p>
              The second diagnostic is near-complete suits. Count how many
              suits have ten or more of their thirteen cards already arranged
              in descending same-suit order somewhere on the tableau. Each
              near-complete suit is close to removal, and removing a suit
              frees thirteen card slots &mdash; which in turn may open the empty
              columns you need for the remaining suits. A position with
              two near-complete suits and one empty column is stronger than
              a position with zero near-complete suits and three empty
              columns.
            </p>
            <p>
              The third diagnostic is blocker count. A blocker is an
              off-suit card sitting inside an otherwise same-suit run,
              preventing that run from being moved as a group. Count the
              blockers across all your near-complete suits. One blocker per
              suit is usually solvable. Two blockers per suit requires an
              empty column for each untangling step. Three or more blockers
              per suit in 4-suit is a strong signal that the position is
              dead unless you have ample free columns.
            </p>
            <p>
              Run these three diagnostics before committing to a move
              sequence. If the position looks dead, scroll through the
              options once to confirm, then resign and start a new hand.
              Playing out a dead endgame teaches nothing and wastes the time
              you could spend on a hand that has something to teach.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Clearing the Last Suits */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Completion Tactics" id="clearing-suits" icon={"\u2666"}>
            Clearing the last suits
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Completing a suit in Spider means assembling a descending
              same-suit run from King down to Ace in a single column. Once
              assembled, the thirteen cards are automatically removed to the
              foundation. In the endgame, suit completion is both the
              objective and the primary tool &mdash; every suit you complete
              frees space for the remaining suits.
            </p>
            <p>
              The critical tactical question is sequencing: which suit do
              you complete first? The answer is almost always the suit that
              is closest to completion and whose removal creates the most
              usable space. A suit missing only one card, where that card
              is accessible on top of another column, should be completed
              immediately. A suit missing three cards that are buried under
              other runs should wait until the easier suit is gone and the
              freed space can be used for excavation.
            </p>
            <p>
              A common mistake is completing a suit that removes structural
              support from the rest of the tableau. If a near-complete
              Spades run is sitting on top of a Hearts sequence that you
              also need, pulling the Spades run out will collapse the column
              and scatter the Hearts cards. In that scenario, completing
              Spades is correct only if you have somewhere to park the
              Hearts cards during the transition. If you do not, the
              completion destroys more structure than it creates.
            </p>
            <p>
              The practical approach is to plan completions in pairs.
              Before finishing suit A, ask: once A is gone, can I
              immediately begin assembling suit B in the space that opened?
              If yes, proceed. If finishing A leaves you in a position where
              B is no closer to done, you may be completing suits in the
              wrong order. Endgame suit completion is not a race &mdash; it is a
              domino chain, and the order of the dominoes matters.
            </p>
          </ContentBody>
        </CardSection>

        {/* Managing the Final Stock Deals */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Last-Deal Discipline" id="final-stock-deals" icon={"\u2663"}>
            Managing the final stock deals
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The transition from mid-game to endgame revolves around the
              last one or two stock deals. These are the most consequential
              deals in the game, because they set the tableau state you will
              have to solve without any further help. How you prepare for
              them determines whether you enter the endgame with a solvable
              position or a dead one.
            </p>
            <p>
              Before making the second-to-last deal, run a quick
              assessment: how many empty columns do you have, how many
              same-suit runs are close to complete, and how much disorder
              exists on the tableau? If you can create an additional empty
              column before dealing, do it &mdash; even if the move costs you a
              partial run. An extra empty column absorbs a bad deal far
              better than a slightly longer run does.
            </p>
            <p>
              Spider requires that every column contain at least one card
              before a deal can be made. This rule forces you to fill any
              empty columns right before dealing. The choice of which cards
              to place in those columns is not throwaway &mdash; it is a
              strategic decision. Place cards that are least useful
              elsewhere: orphaned off-suit singles, low-value cards that
              are not part of any active run, or cards from suits you have
              already given up on completing. Never fill a pre-deal column
              with a card that is part of an active same-suit sequence.
            </p>
            <p>
              After the final deal lands, pause. Do not move anything for
              ten seconds. Scan the entire tableau. Identify which of the
              newly dealt cards extend existing runs, which create new
              problems, and which are neutral. The post-deal scan is the
              most important single habit in Spider endgame play, because
              the first move you make after the last deal sets the
              trajectory for the rest of the hand.
            </p>
          </ContentBody>
        </CardSection>

        {/* Empty Column Strategy in Late Game */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Endgame Resource" id="empty-columns" icon={"\u2660"}>
            Empty column strategy in late game
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Empty columns are worth more in the endgame than at any other
              point in the game. In the mid-game, an empty column is
              valuable but replaceable &mdash; you can always clear another column
              later, and the stock will keep feeding you cards that create
              opportunities. In the endgame, empty columns are finite. Once
              you fill one, you only get it back by completing a suit or
              consolidating an entire column elsewhere. Both of those
              actions are expensive.
            </p>
            <p>
              The fundamental endgame rule is: never fill an empty column
              without a concrete plan to recover it. A concrete plan means
              you can name the sequence of moves that will empty that column
              again. If you cannot articulate the recovery in specific
              moves, do not place the card. Find a different approach.
            </p>
            <p>
              Empty columns serve three purposes in the endgame. First,
              they are staging areas for card-by-card disassembly of
              mixed-suit runs. If you need to extract a Hearts card from
              the middle of a mixed Spades-Hearts-Clubs stack, you need an
              empty column to park the Spades cards while you access the
              Hearts card. Second, they are temporary holding for cards
              displaced during suit completion &mdash; when you pull a completed
              King-to-Ace run off a column, the cards beneath it need
              somewhere to go. Third, they serve as buffers that let you
              rearrange the order of cards within a column by cycling them
              through the empty space.
            </p>
            <p>
              In 4-suit endgames, the number of empty columns you need is
              roughly equal to the number of off-suit blockers you must
              resolve. If three cards need to be shuttled out of mixed runs,
              you need at least two empty columns to execute the
              disassembly without deadlocking. Players who enter the 4-suit
              endgame with only one empty column often find that it is not
              enough, which is why the pre-deal column-creation push
              described above is so important.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* When Multiple Suits Are Close to Complete */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Parallel Completions" id="multiple-suits" icon={"\u2665"}>
            When multiple suits are close to complete
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The best endgame positions present a luxury problem: two or
              even three suits are within a few cards of completion, and the
              question is which to finish first. This is not a trivial
              choice. The order in which you complete suits determines
              whether the remaining suits can be assembled with the space
              you have.
            </p>
            <p>
              The default heuristic is to complete the suit that has the
              fewest blockers and whose missing cards are most accessible.
              A suit missing one card that sits on top of a column is a
              faster completion than a suit missing one card buried under
              four others. Speed matters because every completed suit
              returns thirteen card slots to the working space, and those
              slots are the fuel for the next completion.
            </p>
            <p>
              A subtler consideration is interdependence. Sometimes the
              missing card for suit A is trapped inside a near-complete
              run of suit B. In that case, you must complete B first to
              release A&apos;s missing card, even if A is otherwise closer
              to done. Mapping these dependencies before you start moving
              is the highest-leverage endgame skill. Draw the dependency
              chain mentally: B must finish before A, A must finish before
              C, so the correct sequence is B-A-C regardless of which suit
              looks closest at a glance.
            </p>
            <p>
              When two suits are independent &mdash; neither blocks the other
              &mdash; complete the one that frees the most columns. If
              completing Hearts opens two columns and completing Diamonds
              opens one, finish Hearts first. The extra column makes the
              Diamonds completion easier. When both suits free the same
              number of columns, complete the shorter remaining run,
              because it requires fewer intermediate moves and leaves your
              empty columns intact longer.
            </p>
          </ContentBody>
        </CardSection>

        {/* Avoiding Endgame Deadlocks */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Deadlock Patterns" id="deadlocks" icon={"\u2666"}>
            Avoiding endgame deadlocks
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A deadlock occurs when no legal move improves your position
              and at least one suit cannot be completed regardless of move
              order. Deadlocks in Spider are not always obvious &mdash; the
              tableau may still have legal moves available, but none of
              them lead to a path where all remaining suits complete. The
              game is dead even though it does not look obviously stuck.
            </p>
            <p>
              The most common deadlock pattern is the circular block. Card
              X sits on top of card Y, but moving X requires space that
              only becomes available after Y is moved, and moving Y
              requires X to be gone first. In a two-card circular block,
              one empty column breaks the cycle. In a three-card or larger
              circular block, you need correspondingly more empty columns.
              When you do not have enough columns to break the cycle, the
              position is dead.
            </p>
            <p>
              The second common pattern is the buried King. A King that
              sits beneath other cards in a column cannot be moved to
              another column (Kings can only go into empty columns), and
              if the cards above it are needed for a different suit
              completion, you face a dilemma: excavate the King and disrupt
              the other suit, or abandon the King&apos;s suit entirely.
              In endgames, buried Kings are the single most frequent
              cause of unwinnable positions.
            </p>
            <p>
              Prevention is the best cure. The habits that prevent
              endgame deadlocks are formed in the mid-game: keep Kings
              mobile or anchored at column bottoms, avoid building long
              mixed-suit stacks that will be expensive to disassemble, and
              maintain at least one empty column through the late mid-game
              so that the post-deal tableau has working room. Players who
              consistently arrive in the endgame with one or two empty
              columns deadlock far less often than players who arrive
              with zero.
            </p>
            <p>
              When you suspect a deadlock, test it. Pick the suit closest
              to completion and mentally trace every move required to
              finish it. If any step requires a column you do not have and
              cannot create, the position is dead. Confirm by checking the
              second-closest suit. If both suits are blocked, resign.
              Testing a suspected deadlock takes thirty seconds and saves
              you five minutes of fruitless shuffling.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Final Stretch */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Last 20 Cards" id="final-stretch" icon={"\u2663"}>
            The final stretch: last 20 cards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              When the tableau is down to its last twenty or so cards --
              typically two suits remaining &mdash; the game enters its most
              concrete phase. At this point, you should be able to see every
              card, name every obstacle, and plan the exact sequence of
              moves to the finish. If you cannot plan the finish from here,
              the position is probably dead.
            </p>
            <p>
              The technique for the last twenty cards is exhaustive
              planning. Do not move a card until you have mentally traced
              the path to completion. Count the empty columns. Count the
              blockers. Identify the order in which cards must move. Name
              the intermediate parking spots. If the plan holds, execute it.
              If the plan breaks at step six because a column is missing,
              step back and look for an alternative sequence before you have
              committed moves that cannot be reversed.
            </p>
            <p>
              A practical habit for the final stretch: work backwards from
              the completed state. Picture the two remaining suits fully
              assembled, King through Ace, sitting in their columns. Now
              ask: what is the last move before completion? What is the
              move before that? Walking the sequence backwards often
              reveals the correct move order more clearly than forward
              planning, because backward planning shows you which columns
              need to be empty at which steps.
            </p>
            <p>
              Speed changes in the final stretch. The mid-game rewards a
              steady pace with occasional pauses for assessment. The final
              stretch rewards slow, deliberate play with no wasted moves.
              Every move that does not directly advance a suit completion is
              a move that might create an unnecessary deadlock. The
              discipline of touching nothing until the plan is clear is
              the difference between converting a winnable endgame and
              throwing it away.
            </p>
          </ContentBody>
        </CardSection>

        {/* When to Accept a Loss */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Resignation Decision" id="accept-loss" icon={"\u2660"}>
            When to accept a loss
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Not every Spider hand is winnable, and not every winnable hand
              will be won. The ability to recognize a dead position and
              resign cleanly is a skill, not a concession. Players who
              grind out obviously dead endgames are not being persistent &mdash;
              they are burning time that could go toward a hand with better
              prospects.
            </p>
            <p>
              Resign when all three of these conditions are true: you have
              zero empty columns, at least one suit has multiple off-suit
              blockers that you cannot dislodge, and no legal move creates
              a new empty column. That combination is the textbook dead
              position in Spider endgames. You may still have legal moves
              available &mdash; shuffling cards between columns, building
              cosmetic sequences &mdash; but none of them will lead to a
              completed suit.
            </p>
            <p>
              Resign also when a single suit requires more column
              disassembly than your current free space can support. If you
              need to move five cards off a column to reach a critical card
              and you have only one empty column and no other landing spots,
              the math does not work. You cannot park five cards in one
              column.
            </p>
            <p>
              The psychological benefit of clean resignations is real.
              Players who resign dead positions and immediately start a new
              hand maintain better focus and higher win rates over a
              session than players who fight every hand to its bitter end.
              The endgame of a dead hand teaches nothing. The opening of a
              new hand is full of opportunity. Allocate your attention
              accordingly.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* FAQ */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq" icon={"\u2665"}>
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

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy Hub"
              description="The central strategy resource for Spider Solitaire at every difficulty level."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-opening-strategy"
              title="Spider Opening Strategy"
              description="How the first ten moves shape the rest of the hand."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/tips"
              title="Spider Tips"
              description="Quick tactical advice for common Spider situations."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-winnability"
              title="Spider Winnability Data"
              description="What the numbers say about win rates across 1-suit, 2-suit, and 4-suit."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Test your endgame"
          body={
            <>
              The endgame is where good Spider players separate from great
              ones. Every hand that reaches the final phase with even one
              empty column is a puzzle worth solving. Start a game and see
              how you handle the closing stretch.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the opening strategy"
          secondaryHref="/spider-opening-strategy"
        />
      </main>
    </ContentLayout>
  );
}
