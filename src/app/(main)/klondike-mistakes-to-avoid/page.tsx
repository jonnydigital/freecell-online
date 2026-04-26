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

const PAGE_PATH = "/klondike-mistakes-to-avoid";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

export const metadata: Metadata = {
  title: `10 Klondike Solitaire Mistakes That Cost You Games | ${siteConfig.siteName}`,
  description:
    "The ten most common Klondike Solitaire mistakes and how to fix them. Stop losing winnable games by breaking habits that quietly drain your win rate.",
  keywords: [
    "klondike solitaire mistakes",
    "klondike mistakes to avoid",
    "klondike solitaire tips",
    "why do I lose at klondike",
    "klondike solitaire strategy",
    "klondike common errors",
    "how to win klondike solitaire",
    "klondike solitaire help",
    "solitaire mistakes",
    "klondike bad habits",
  ],
  openGraph: {
    title: "10 Klondike Solitaire Mistakes That Cost You Games",
    description:
      "The ten habits that quietly cost you winnable Klondike games, and the better approach for each.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: absoluteUrl(PAGE_PATH) },
};

export default function KlondikeMistakesToAvoidPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "10 Klondike Solitaire Mistakes That Cost You Games",
      description:
        "The ten most common Klondike Solitaire mistakes and how to fix them. Each mistake explained with what goes wrong and the better approach.",
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "10 Klondike Mistakes to Avoid",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="10 Klondike Solitaire Mistakes That Cost You Games"
        subtitle="The habits that quietly drain your win rate, and the corrections that bring it back."
        kicker="Klondike Strategy"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Introduction */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Introduction" id="intro" icon={"\u2660"}>
            Why good players still lose winnable games
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most Klondike Solitaire losses feel like bad luck. The cards
              were buried in the wrong order, the stock never delivered what
              you needed, and the game locked up somewhere around the
              midpoint. That narrative is comforting, and it is wrong about
              half the time. Solvers estimate that roughly 79 to 82 percent
              of random Klondike deals are winnable in Draw 1. Good human
              players win around 60 to 70 percent of those deals. The gap
              between the solver ceiling and the human ceiling is not luck.
              It is a collection of small, repeatable mistakes that add up
              across hundreds of hands.
            </p>
            <p>
              We have watched thousands of Klondike sessions, read the
              replay data, and catalogued the patterns. The same ten
              mistakes appear over and over, across beginners and
              experienced players alike. None of them are dramatic. None of
              them feel like errors in the moment. That is precisely why
              they persist: the feedback loop in Klondike is slow enough
              that a bad habit can run for weeks before the player notices
              it in the win-rate numbers.
            </p>
            <p>
              This guide names each mistake, explains what goes wrong when
              you make it, and describes the better approach. If you fix
              even three or four of these habits, you will see the
              difference in your next fifty games.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 1 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 1" id="stock-before-tableau" icon={"\u2665"}>
            Always flipping from stock before checking tableau moves
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The stock pile sits at the top-left corner of the board, and
              it is the first thing most players reach for. Flip, look,
              play if possible, flip again. The tableau columns below sit
              there waiting, full of moves the player never considered
              because the stock was more interesting.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              Stock cards land on the tableau and occupy slots that
              tableau-to-tableau moves needed. You build a red 9 onto a
              black 10 from the stock, but a red 9 was already sitting
              two columns over on top of a face-down card. The stock play
              was legal but wasteful. The tableau play would have revealed
              a new card. The stock play revealed nothing.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Before touching the stock, scan every tableau column for
              moves that reveal face-down cards. Tableau-to-tableau moves
              that flip a hidden card are almost always higher priority
              than stock plays. The stock is not going anywhere. The
              hidden cards under your tableau columns are the information
              you need most, and every turn you delay revealing them is a
              turn you are playing with incomplete data.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 2 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 2" id="ignoring-empty-columns" icon={"\u2666"}>
            Ignoring empty columns
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              When a tableau column empties out, many players immediately
              drop whatever King is available into the slot and move on.
              Others leave the column empty and forget it exists. Both
              responses miss the point.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              An empty column is the most versatile space on the board.
              It can hold a King to start a new sequence, but it can also
              serve as temporary storage while you rearrange other
              columns. Filling it reflexively with the first King you
              find means you lose that workspace. Ignoring it entirely
              means you never use it as a staging area when dismantling
              a blocked column.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Treat every empty column as a decision point, not a reflex.
              Ask: is there a King that will start a productive chain with
              a Queen already available to build on it? If yes, fill the
              column. If no, hold it open. Use the empty column as
              temporary storage when you need to reach a buried card in
              another column. The value of an empty column is highest the
              turn before you fill it, because that is the turn you have
              the most options.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="my-2" />

        {/* Mistake 3 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 3" id="kings-without-thinking" icon={"\u2663"}>
            Moving Kings without thinking
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Kings are the only cards that can fill an empty column,
              which makes them simultaneously the most powerful and most
              dangerous cards in Klondike. A well-placed King anchors a
              long alternating-color sequence. A poorly placed King
              occupies an empty column forever and contributes nothing.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              A column empties and a King sits on top of the waste pile.
              The player drops it in without checking whether a different
              King, perhaps one buried under a single face-down card in
              the tableau, would be more productive. The placed King has
              no Queen of the opposite color ready to build on it, so it
              sits alone in its column for the rest of the game. The
              column is effectively dead.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Before placing a King, check which Queens are available or
              nearly available. A red King is only useful if a black Queen
              can land on it soon, and vice versa. If no Queen is ready,
              consider holding the empty column open. If two Kings are
              candidates, pick the one that will pull the longer chain
              behind it. King placement is the single highest-leverage
              decision in Klondike. Treat it accordingly.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 4 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 4" id="not-exposing-face-down" icon={"\u2660"}>
            Not exposing face-down cards first
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike deals 21 face-down cards across the seven tableau
              columns. Those hidden cards are the biggest source of
              uncertainty in the game. Every face-down card you reveal
              gives you new information and new options. Every face-down
              card you leave buried is a possibility you cannot plan
              around.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              Players rearrange face-up cards into tidy sequences without
              revealing anything underneath. They move a black 6 onto a
              red 7, which looks productive, but neither card was
              covering a face-down card. The board looks neater, but the
              information state has not changed. Meanwhile, a different
              move would have uncovered a face-down card in column five
              and potentially opened a new line of play.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Rank every available move by whether it reveals a face-down
              card. Moves that reveal hidden cards come first. Moves that
              rearrange face-up cards without revealing anything come
              second. Moves that do neither are suspect. When two moves
              both reveal a face-down card, prefer the move on the column
              with the most face-down cards remaining. That column is the
              most expensive to open, so every reveal there is worth more
              per move than a reveal on a column that is already mostly
              face-up.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 5 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 5" id="wrong-card-choice" icon={"\u2665"}>
            Choosing the wrong card when two options exist
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike regularly presents a choice: two cards of the same
              rank and opposite color can both go to the same destination.
              A red 8 in column two and a red 8 in column six both fit on
              the black 9 in column four. Most players pick whichever one
              they noticed first.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              The player moves the red 8 from column two, which had only
              one face-down card beneath it, instead of the red 8 from
              column six, which had four face-down cards beneath it. The
              easy column was already nearly open. The hard column stays
              blocked. The game missed an opportunity to dig into the
              deeper pile, and a few turns later that buried information
              becomes the reason the game stalls.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              When two cards compete for the same slot, move the one that
              sits on top of more face-down cards. If the face-down
              counts are equal, move the one from the longer column,
              because shortening a long column gives you more flexibility
              later. If both columns are the same length, check which
              reveal is more likely to chain into a second move. The
              tiebreaker is always information: pick the move that tells
              you the most about the cards you have not seen yet.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="my-2" />

        {/* Mistake 6 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 6" id="same-color-stacking" icon={"\u2666"}>
            Stacking same-color runs mindlessly
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike requires alternating colors in tableau sequences:
              red on black, black on red. But players sometimes build
              long single-color sequences in their head, thinking about
              suit order for the foundations while still working the
              tableau. The result is a move that looks right but violates
              the alternating-color rule, or worse, a legal move that
              builds an alternating sequence so long it becomes immovable.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              A player builds a King-Queen-Jack-10-9-8-7-6 sequence that
              stretches across eight cards. The sequence is legal and
              tidy. It is also frozen. No other column can accept an
              eight-card sequence, and there is no way to break it apart
              without empty columns to use as staging areas. The long run
              has consumed an entire column and cannot be reorganized.
              Cards buried beneath it are permanently locked.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Build sequences with purpose, not momentum. Before
              extending a run, ask whether the next card down in the
              sequence is actually needed there, or whether it would be
              more useful elsewhere. Short, flexible sequences that can
              be moved or split are better than long, frozen ones. A
              five-card run that you can relocate is more valuable than a
              ten-card run that you cannot. Keep your sequences short
              enough to stay mobile.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 7 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 7" id="uneven-foundations" icon={"\u2663"}>
            Forgetting to build all four foundations evenly
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              It feels good to send cards to the foundations. The ace goes
              up, the 2 follows, then the 3, and soon one foundation is at
              the 7 while the other three are still at 2. That imbalance
              is one of the quietest game-killers in Klondike.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              Every card sent to the foundations is permanently removed
              from the tableau. A red 6 on the hearts foundation cannot
              host a black 5 on the tableau anymore. When one foundation
              races ahead, the cards it consumed are no longer available
              to support building in the tableau. The player runs out of
              landing spots for the opposite-color cards in the middle
              ranks, the tableau jams, and the game dies with three
              foundations still stuck at low ranks.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Keep your four foundations within two ranks of each other as
              a general rule. Before sending a card up, ask whether its
              opposite-color predecessor is still needed below. A 5 of
              hearts can go up safely if both black 4s are already on
              their foundations or are no longer useful in the tableau.
              If a black 4 is still actively anchoring a sequence below,
              hold the red 5 in the tableau until the 4 is free. The
              foundations are the finish line, not a running score. Cards
              arrive there when their work below is done.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 8 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 8" id="playing-too-fast" icon={"\u2660"}>
            Playing too fast
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Speed feels like competence. Clicking through moves quickly
              gives the impression of mastery, and in the early game when
              moves are obvious it works fine. The problem is that the
              tempo does not shift when the position becomes complex.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              A player races through the first twenty moves on autopilot.
              Aces go up, obvious joins happen, the stock gets cycled.
              Then the board reaches a branch point: which King to place,
              whether to send a 4 to the foundation, whether to dismantle
              a column to reach a buried card. The player, still running
              on the fast tempo from the opening, makes the decision in
              two seconds instead of ten. The wrong King goes into the
              empty column. The game locks up six moves later, and the
              player blames the deal.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Play fast when the moves are forced. Play slow when there
              is a genuine choice. The distinction is not about thinking
              harder on every single move. It is about recognizing when
              you have hit a branch point and giving yourself a few extra
              seconds to read the full board before committing. The
              opening and the obvious endgame sequences can be played
              quickly. King placement, the first foundation sends above
              rank 3, and any column dismantle should get a pause. That
              pause is worth more than any other habit change in this
              list.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="my-2" />

        {/* Mistake 9 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 9" id="not-counting-stock" icon={"\u2665"}>
            Not counting remaining stock cards
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The stock pile starts with 24 cards. As you play cards from
              the stock to the tableau or foundations, the stock shrinks.
              Most players treat the stock as an infinite supply and stop
              paying attention to how many cards remain in it.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              The player needs a specific card from the stock to continue.
              They cycle through once, do not find it, cycle again, still
              do not find it. They have no idea whether the card has
              already been played, is sitting face-down in a tableau
              column, or is genuinely in the stock at a position they
              keep missing. In Draw 3, this blind cycling wastes entire
              passes because the player does not know whether the target
              card is even reachable on this cycle.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Keep a rough count of the stock. You do not need an exact
              number on every turn, but you should know whether the stock
              is full (24), half-used (around 12), or nearly empty (under
              6). As the stock thins out, you gain information: fewer
              unknown cards means more certainty about what is still
              hidden in the tableau. In Draw 3, counting the stock lets
              you predict which group your target card falls in and
              whether a cycle shift will bring it to the accessible
              position. Players who count the stock make better decisions
              in the midgame because they are working with more
              information than players who do not.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mistake 10 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistake 10" id="giving-up-early" icon={"\u2666"}>
            Giving up too early
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A game feels stuck. The stock has cycled twice with no useful
              plays, two columns are blocked by face-down cards you cannot
              reach, and the foundations are stalled at low ranks. The
              player hits &quot;new game&quot; and moves on. Sometimes that
              resignation is correct. More often than not, it is premature.
            </p>
            <p>
              <strong className="text-white">What goes wrong:</strong>{" "}
              The player abandons a winnable deal because the position
              looked hopeless at a glance. They did not check whether a
              tableau-to-tableau move could unlock a chain reaction. They
              did not look for a column dismantle that uses the empty
              column as temporary storage. They did not consider that
              playing a seemingly useless stock card would shift the Draw
              3 cycle and expose the exact card they needed on the next
              pass. The deal was solvable; the player just stopped
              looking.
            </p>
            <p>
              <strong className="text-white">The better approach:</strong>{" "}
              Before resigning, run a quick checklist. First, is there
              any tableau move you have not tried? Scan every face-up card
              against every possible destination. Second, would playing
              any stock card, even to a suboptimal spot, shift the cycle
              in a useful way? Third, is there a column you can dismantle
              using an empty column or a short temporary sequence? If all
              three answers are no and you have cycled the stock at least
              twice, the deal may genuinely be dead. But running that
              checklist takes thirty seconds and catches winnable games
              that a quick resignation would have thrown away. The
              difference between a 55-percent player and a 65-percent
              player is often just those thirty seconds of looking before
              quitting.
            </p>
          </ContentBody>
        </CardSection>

        {/* Summary */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Summary" id="summary" icon={"\u2663"}>
            Fixing these habits
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              You do not need to fix all ten at once. Pick the two or three
              that sound most familiar and focus on them for your next
              twenty games. Track your win rate before and after. The
              feedback will not be instant because Klondike has enough
              variance that a bad run can last a dozen games even with
              perfect play. But across fifty or a hundred hands, the
              numbers will move.
            </p>
            <p>
              The core principle behind all ten corrections is the same:
              slow down at decision points and prioritize information over
              tidiness. Revealing face-down cards matters more than
              building neat sequences. Holding an empty column matters
              more than filling it immediately. Counting the stock matters
              more than cycling it mindlessly. And checking for one more
              move before resigning matters more than starting a fresh
              deal.
            </p>
            <p>
              Klondike rewards the player who treats it as a game of
              decisions rather than a game of luck. The luck is real
              &mdash; roughly 18 to 21 percent of deals are unsolvable no
              matter what you do &mdash; but the remaining 79 to 82
              percent are waiting for someone who pays attention. These
              ten corrections are how you start paying attention.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related guides */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related" icon={"\u2660"}>
            Related Klondike guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike/strategy"
              title="Klondike Strategy"
              description="The deeper strategic layer: planning, sequencing, and tempo control."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/tips"
              title="Klondike Tips"
              description="Quick tactical tips for every stage of a Klondike game."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-for-beginners"
              title="Klondike for Beginners"
              description="New to Klondike? Start here for rules, layout, and first-game guidance."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/how-to-play"
              title="How to Play Klondike"
              description="Canonical rules, setup, and a complete first-game walkthrough."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready to break the habits?"
          body="Open a game and play one deal with these ten corrections in mind. Focus on revealing face-down cards first and pausing at branch points."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the strategy guide"
          secondaryHref="/klondike/strategy"
        />
      </main>
    </ContentLayout>
  );
}
