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

const PAGE_PATH = "/klondike-mastery";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Klondike Solitaire: The Complete Mastery Guide | ${siteConfig.siteName}`,
  description:
    "The complete Klondike Solitaire mastery guide: layout logic, opening moves, Draw 1 vs Draw 3, midgame management, waste-pile tactics, endgame technique, and the ten most common mistakes.",
  keywords: [
    "klondike mastery",
    "klondike solitaire guide",
    "klondike strategy",
    "klondike complete guide",
    "how to win klondike",
    "klondike opening moves",
    "klondike endgame",
    "klondike draw 1 vs draw 3",
    "klondike tips",
    "klondike mistakes",
  ],
  openGraph: {
    title: "Klondike Solitaire: The Complete Mastery Guide",
    description:
      "From the first face-up card to the last foundation play: everything we teach players who want to stop losing random Klondike games.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function KlondikeMasteryPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Solitaire: The Complete Mastery Guide",
      description:
        "A long-form guide to playing Klondike Solitaire at a high level: layout logic, opening moves, draw-mode strategy, midgame management, waste-pile tactics, endgame technique, and the ten most common mistakes.",
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
          name: "Klondike Mastery",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Solitaire: The Complete Mastery Guide"
        subtitle="Layout logic, opening priorities, draw-mode strategy, midgame management, the waste-pile problem, endgame technique, and the ten mistakes that quietly cost you games."
        kicker="Klondike Mastery"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Introduction" id="intro" icon={"\u2660"}>
            Why Klondike is the classic, and why skill still matters
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike is the game most people mean when they say
              &quot;solitaire.&quot; It is the default that shipped with
              Windows for a generation, the patience that travelers played
              on flights before phones had browsers, and the one layout
              every card-curious child has dealt out at least once. That
              familiarity does something strange to the game: most players
              treat Klondike as luck with some card-moving on top. Win or
              lose, they shrug. They do not read up on it. They do not
              analyze the deal. They do not see a place where skill bites.
            </p>
            <p>
              Part of that resignation comes from the game&apos;s own
              reputation. Klondike ships with every computer in the
              world and sits in every airport terminal. A thing that
              universal stops looking like a thing that rewards study.
              Chess rewards study. Klondike, the thinking goes, rewards
              the cards you were dealt. We hear the same claim about
              poker from people who do not play poker. In both cases
              the claim is wrong for the same reason: the short-term
              noise of random cards hides a signal that only shows up
              across a long series of hands.
            </p>
            <p>
              We think that reading is wrong. Klondike has a real skill
              ceiling, and the gap between a casual player at 25&ndash;35
              percent and a serious player at 60&ndash;70 percent is not
              narrowed by luck. It is narrowed by a set of specific
              habits: reading the tableau before moving, planning a few
              ply ahead, knowing when to cycle the stock and when to
              pause, protecting the foundations from premature sends, and
              recognizing dead positions a turn or two before they lock.
              The ceiling above serious play, toward 79&ndash;82 percent
              in Draw 1, is the solver ceiling. Humans do not reach it.
              But the climb from 30 to 70 is available to anyone willing
              to treat the game like a game with structure.
            </p>
            <p>
              This guide is the long version of what we teach. It covers
              the layout logic, the opening priorities, the strategic
              difference between Draw 1 and Draw 3, the midgame choices
              that quietly decide most games, the specific problem of
              managing the waste pile in Draw 3, the endgame technique
              that separates 60-percent players from 90-percent players,
              and the ten mistakes we watch players make over and over.
              Nothing here is deep simulation theory &mdash; we save that
              for our{" "}
              <Link
                href="/klondike-probability"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Klondike probability page
              </Link>
              . This is the tactical playbook.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Layout and Its Logic */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Board" id="layout" icon={"\u2665"}>
            The layout and its logic
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike deals 28 cards into seven tableau columns of
              increasing length. Column 1 holds one face-up card. Column
              2 holds two: one face-down, one face-up. Column 7 holds
              seven: six face-down, one face-up. The remaining 24 cards
              form the stock, and the four foundation slots above the
              tableau start empty. The foundations want suited ascending
              sequences from Ace to King. The tableau wants descending
              alternating-color sequences from King down to Ace. Empty
              columns accept Kings only.
            </p>
            <p>
              That architecture is not arbitrary. It encodes the central
              puzzle of the game: you can only work with cards that are
              face-up, but most of the cards you need are face-down in
              the tableau or buried in the stock. The job of the game is
              to convert face-down cards into face-up cards while
              building toward foundations. Every move either reveals a
              new card, rearranges the face-up layer, or sends a card
              permanently home to the foundations. Moves that do none of
              these things are suspect.
            </p>
            <p>
              The stock is the second half of the puzzle. It holds 24
              cards you have not seen and cannot access freely. In Draw
              1, you turn them over one at a time and access each card
              individually. In Draw 3, you turn them in groups of three
              and can play only the top card of each group, with the
              other two visible but locked. That single-rule difference
              is enormous, and we will come back to it repeatedly. The
              stock cycles as many times as you want, but each cycle has
              costs: in timed and scored modes it subtracts points, and
              in every mode it gives the opponent &mdash; the deal itself
              &mdash; another chance to see which cards you are keeping
              stranded.
            </p>
            <p>
              The foundations reward patience. They are a one-way street.
              Every card you send to a foundation is gone from the
              tableau forever, and if you sent it too early you can no
              longer use it to build a sequence or to unblock a column.
              The classic Klondike mistake is a premature foundation send
              that locks up the tableau two moves later. We treat the
              foundations as the end state, not a running score &mdash; a
              place cards arrive when they are no longer useful below.
            </p>
          </ContentBody>
        </CardSection>

        {/* Opening Moves */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Opening" id="opening" icon={"\u2666"}>
            Opening moves
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The first minute of a Klondike game does more work than any
              other minute. You are choosing which face-down cards to
              reveal first, which columns to attack, which sequences to
              begin building, and where on the board the early Kings will
              land. A strong opening is not a clever one; it is an
              unhurried one. Before moving, we read the whole row of
              seven face-up cards and the waste pile top. We ask four
              questions in order.
            </p>
            <p>
              First, are any aces exposed? An ace is the only card we
              send to a foundation without hesitation. It never helps the
              tableau, and the sooner it leaves the sooner the foundation
              opens for the twos. Second, are any twos exposed and is the
              matching ace already up top? If yes, they go up as well.
              Third, what moves reveal a face-down card? A move that
              flips a new card is almost always better than a move that
              rearranges face-up cards without flipping anything. Fourth,
              which column has the most face-down cards? That column is
              the most expensive to open, so every move that digs into it
              is worth more than a move into a column already mostly
              exposed.
            </p>
            <p>
              We read left to right, because the leftmost columns are the
              shallowest and typically open first. Column 1 has only the
              single face-up card beneath it &mdash; zero face-down
              blockers &mdash; so it becomes an empty column quickly if
              the card is playable. That empty column is a King slot. We
              prefer to fill empty columns with Kings that unlock a lot
              of face-down cards in a different column. A King sitting
              in the stock waste that has a red Queen already on the
              tableau, built by alternating color below, will bring the
              whole Queen-Jack-Ten run with it when we move the King
              into the empty slot. That is the move that quietly wins
              games.
            </p>
            <p>
              Left-to-right is also how we think about sequence starts.
              An exposed black 7 opposite a red 8 in a neighboring
              column is a candidate join. We do not always make the
              join immediately. If joining them buries a card we will
              need later, or commits a 7 we might want on a different
              8, we wait. In the first few moves we prefer joins that
              reveal face-down cards, not joins that merely tidy the
              face-up layer.
            </p>
            <p>
              King placement deserves its own paragraph. Kings are the
              only card that can fill an empty column, which makes them
              both powerful and dangerous. A King placed too early in
              the wrong empty column can lock a sequence away from its
              natural home. We try not to commit a King to an empty
              column until we know what is riding on it. If we have a
              Queen of the opposite color ready to build, the King is
              productive. If we have no Queen yet and the other empty
              column is about to open, we wait. The worst King placement
              in Klondike is the reflex one, made because a column is
              empty and the King happened to be on top of the waste.
            </p>
            <p>
              One more opening principle: the first stock cycle is a
              survey. In Draw 1 we go through the stock once without
              making aggressive plays, reading what is there. In Draw 3
              we turn the stock and note which cards are accessible,
              which are buried, and whether the accessible ones are
              cards we actually want. Only after that survey do we make
              a plan. Players who do not survey end up reacting to the
              stock instead of using it.
            </p>
            <p>
              One caution on the survey pass: do not play a card just
              because it is legal. In Draw 1 the temptation is to slap
              every playable card onto the tableau immediately and feel
              productive. That habit produces a cluttered tableau with
              no face-down reveals and a chewed-up stock. The survey
              pass is a reading exercise. We play only the moves we are
              certain of &mdash; aces, two-to-foundation sends when the
              ace is already up, and a single King that unlocks a
              clear chain. Everything else we hold until we have seen
              the full stock and can plan the next few moves together.
            </p>
          </ContentBody>
        </CardSection>

        {/* Draw 1 vs Draw 3 */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Draw Modes" id="draw-mode" icon={"\u2663"}>
            Draw 1 vs Draw 3
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Draw 1 and Draw 3 are different games. That is not
              rhetorical. The solvability bounds differ by a few
              percentage points &mdash; roughly 82 percent in Draw 1
              versus 78&ndash;82 percent in Draw 3 depending on the
              analysis &mdash; but the human win-rate gap is much
              larger. Good players win 60&ndash;70 percent of their Draw
              1 games and 15&ndash;20 percent of their Draw 3 games.
              Expert players stretch Draw 1 toward 79&ndash;82 percent
              and Draw 3 toward 25&ndash;33 percent. The same deal,
              played under the same hands, wins in Draw 1 and loses in
              Draw 3 more often than not.
            </p>
            <p>
              The gap is not about the cards. It is about stock access.
              In Draw 1, every card in the stock is reachable on every
              pass. The stock is essentially a queue you can search. In
              Draw 3, only one-third of the stock is reachable per pass,
              and every play shifts the cycle, rearranging which cards
              are reachable on the next pass. Draw 1 pacing rewards
              methodical planning: you see the problem, you plan the
              sequence, you execute. Draw 3 pacing rewards adaptive
              memory: you hold the cycle in your head, you know where
              the key cards are sitting, you wait for the window when
              the cycle puts the card you need at the top of its group.
            </p>
            <p>
              Strategy changes accordingly. In Draw 1, we build
              foundations a little more aggressively because we know we
              can fetch a replacement if the tableau needs one. In Draw
              3, we build foundations conservatively, because the
              replacement card might be trapped at position 1 or 2 in
              its group for three more passes. In Draw 1, empty columns
              are useful; in Draw 3, they are precious. In Draw 1,
              cycling the stock is cheap; in Draw 3, cycling without
              playing anything is a warning that our plan is not
              working.
            </p>
            <p>
              There is a second, quieter difference between the modes:
              the psychology of cycling. In Draw 1, players feel in
              control because every card is reachable. In Draw 3,
              players feel at the mercy of the cycle because so much
              of the stock is locked. That psychology leaks into
              decisions. Draw 3 players sometimes rush the tableau to
              feel productive, sending cards to foundations or joining
              sequences early, because they cannot fix anything in the
              stock. Draw 1 players sometimes overplan, holding every
              card for a better home and never committing. We teach
              the same remedy to both: notice the feeling, name it,
              and then ignore it. The right move is the right move
              whether or not you feel in control.
            </p>
            <p>
              Cycle management is the Draw 3 skill. Every stock play
              shifts the positions of every subsequent card. A good
              Draw 3 player knows this and exploits it: plays a blocker
              even when the landing spot is imperfect, because the
              shifted cycle will expose a more valuable card on the next
              pass. A bad Draw 3 player plays whatever is on top of the
              stock when it is useful and does not think about how the
              cycle will look after. We cover the full cycle-shift
              technique on our{" "}
              <Link
                href="/klondike/draw-1-vs-draw-3"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Draw 1 vs Draw 3 comparison
              </Link>
              . If you take only one thing from this section, take this:
              Draw 1 is a planning game, Draw 3 is a memory game, and
              the habits that win them are different.
            </p>
          </ContentBody>
        </CardSection>

        {/* Midgame Management */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Midgame" id="midgame" icon={"\u2660"}>
            Midgame management
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The midgame is the stretch between the first few stock
              cycles and the endgame where the foundations start
              filling. Most games are decided here, and most players
              treat this stretch as the boring middle. We think the
              opposite: the midgame is where the game is won or thrown
              away. The key choices are about when to burn stock cards,
              how to protect the foundations, when to rebuild columns,
              and how to recover from positions that feel stuck.
            </p>
            <p>
              Burning the stock means playing a stock card you do not
              need onto the tableau to expose the card beneath it (Draw
              3) or to keep the stock from stalling (Draw 1). Burning is
              a trade: you accept a worse tableau in exchange for better
              stock access. We burn when the cost is small &mdash; the
              card lands on a column we are already planning to
              reorganize, or on a temporary sequence we can rebuild
              later. We do not burn when the burn buries a card we
              actively need. A burn that commits a red 4 onto a black 5
              we were saving for a different red 4 is not a burn, it is
              a mistake.
            </p>
            <p>
              Protecting the foundations is the discipline of not
              sending cards too early. The standard guidance is &quot;keep
              foundations within two ranks of each other,&quot; and it is
              reasonable as a rule of thumb. The deeper principle is
              that every foundation send removes a card from the
              tableau&apos;s vocabulary. A red 6 on the foundation cannot
              host a black 5. A 4 that went up cannot carry a 3-2-A
              sequence back down. We hold cards that might be needed
              below. We send cards when their usefulness below has
              expired &mdash; when both opposite-color successors are
              already placed or the tableau no longer has a need for
              the sequence the card could anchor.
            </p>
            <p>
              Column rebuilding is the midgame habit of taking a
              half-built column apart to rescue a buried card. This is
              painful and often correct. If the 10 of spades is buried
              under a 9 of hearts and 8 of clubs, and we need the 10 to
              host a red 9 that unlocks a much bigger chain, we may
              need to move the 9-and-8 elsewhere to reach the 10. The
              rebuilt column is worth the cost if the chain that comes
              free is long enough. We count moves before starting a
              rebuild: three moves to dismantle and one to reassemble
              only makes sense if the chain it unlocks pays more than
              four moves of progress.
            </p>
            <p>
              One more midgame habit: protect the empty columns. Once a
              column empties, we try not to fill it casually. An empty
              column is a temporary storage bay that lets us dismantle
              other columns safely. If we fill it with a King at the
              wrong moment, we lose that workspace. The rule we teach
              is: do not fill an empty column unless the King coming in
              drags a productive chain behind it, or unless leaving the
              column empty would mean losing the next move anyway.
              Holding an empty column for one extra turn, even when a
              King is sitting on the waste, is often correct.
            </p>
            <p>
              Recovering from stuck positions is the midgame test. A
              position feels stuck when no legal move reveals a new
              card and the stock has no playable top. Often the move
              exists, and we just have not found it. The recovery
              routine is: survey every face-up card in every column,
              check the waste top, check if any foundation card could
              temporarily come back down (if rules permit), and check
              if a tableau-to-tableau move would unlock a downstream
              move two ply ahead. If none of those find a move, we
              cycle the stock one more pass with a specific card in
              mind. If that fails, we concede the deal and reset. A
              hand spent trying to force a dead position is a hand
              spent not learning why it died.
            </p>
          </ContentBody>
        </CardSection>

        {/* Waste Pile Problem */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Waste Pile" id="waste" icon={"\u2665"}>
            The waste pile problem
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The waste pile is the graveyard of played stock cards, and
              in Draw 3 it becomes the pivotal structure of the game.
              Managing the waste in Draw 3 is a distinct skill from
              managing the tableau. We think about it as pattern
              recognition over the stock cycle, not as card-by-card
              play.
            </p>
            <p>
              The cycle shifts every time a card is played from the
              waste to the tableau. If the original stock order had the
              key card at position 2 of group 4 &mdash; meaning it was
              the second of the three cards in the fourth turn &mdash;
              then after playing a single stock card the key card
              shifts forward by one. After playing two, it shifts by
              two. Experienced Draw 3 players track this in their head.
              They know that if they play one stock card, the previously
              buried card will come to the accessible position on the
              next pass. That is not luck; that is arithmetic.
            </p>
            <p>
              The mistake pattern is playing stock cards without
              thinking about what they do to the cycle. A player sees
              the 5 of hearts on top of the stock, has nowhere useful
              to place it, and plays it anyway because it is legal. The
              5 lands on the tableau, burying a card, and the next stock
              turn brings up a 9 of clubs they did not need. Two moves
              later the 5 is in the way and the cycle has shifted in a
              direction that buries the ace they were chasing.
            </p>
            <p>
              The correct pattern is to read the stock as a sequence of
              three-card windows, identify which windows contain the
              cards we need, and plan the cycle shifts that will bring
              those cards to the top of their windows. If the 7 of
              spades is at position 1 of a group (buried under two
              cards), we need two cards to come off the top of previous
              groups to shift the 7 forward. That means finding two
              useful plays from earlier in the cycle before the group
              containing the 7, even if those plays are suboptimal in
              themselves. The payoff is that the 7 then sits at the
              accessible position on the next pass.
            </p>
            <p>
              In Draw 1, the waste pile is much simpler &mdash; every
              card is eventually reachable &mdash; but it still carries
              a lesson. The order in which stock cards cycle back is
              the order in which they were buried, so playing them in
              a different order on the first pass changes which card
              sits at the top when we need it. We still think about
              the cycle in Draw 1, but the cost of getting it wrong is
              small because every card comes back in a single pass.
            </p>
          </ContentBody>
        </CardSection>

        {/* Endgame */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Endgame" id="endgame" icon={"\u2666"}>
            Endgame technique
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The endgame in Klondike starts when the foundations hold
              enough cards that the remaining tableau is a short countdown.
              The tableau at this point usually has no more face-down
              cards, the stock is either exhausted or predictable, and the
              game is effectively a sequencing puzzle: in what order do
              we send the remaining cards to the foundations so that no
              column blocks another?
            </p>
            <p>
              Foundation ordering is the skill. A naive endgame sends
              every card to the first foundation that accepts it. A
              careful endgame holds cards when sending them would break
              a tableau sequence we still need. If we have a black 5 on
              a red 6, and the red 6 is the only place the black 5 can
              sit, sending the 5 to a foundation is fine &mdash; it is
              done with its tableau job. If the 5 is still carrying a 4
              and a 3, we leave it in place and finish the 4 and 3
              first, so the 5 goes up with nothing riding on it.
            </p>
            <p>
              Move-counting matters in the endgame. We count the
              shortest sequence of moves that finishes the game and
              compare it to the sequence we are playing. If our plan
              takes 20 moves and a shorter plan exists, we adopt the
              shorter plan &mdash; not because the game cares about the
              number, but because the shorter plan usually has fewer
              branch points where we could make a mistake. Shorter
              plans are safer plans.
            </p>
            <p>
              Another endgame habit is holding the last few tableau
              cards in a known order. As cards go up, the tableau
              becomes a countdown and we can often read the entire
              remaining path. At that point we stop reacting and start
              executing. If the final eight cards will go up in a
              specific sequence, we play that sequence without
              hesitation. If the sequence has a fork &mdash; two
              possible orders &mdash; we pick the one with fewer
              branches and finish. Endgames that drag on are usually
              endgames where the player stopped planning and started
              reacting to each card as it came.
            </p>
            <p>
              Knowing when we have won or lost is the last endgame
              skill. A game is won the moment every face-up card has a
              clear path home, regardless of how many moves remain. A
              game is lost the moment a required card is buried under a
              card that cannot move anywhere &mdash; a dead-card
              configuration that will not resolve. Recognizing these
              moments early saves time. In particular, recognizing
              losses saves the frustration of playing a dead position
              for another five minutes. The sooner we see a loss, the
              sooner the next deal starts.
            </p>
          </ContentBody>
        </CardSection>

        {/* 10 Common Mistakes */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Mistakes" id="mistakes" icon={"\u2663"}>
            The ten most common mistakes
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              These are the mistakes we see most often when we teach
              Klondike. Every one of them is fixable, and fixing any of
              them typically adds a few percentage points to a
              player&apos;s win rate.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Premature foundation sends.</strong>{" "}
                Sending a 4 to the foundation when the opposite-color
                3 is still needed below. The foundation is a one-way
                street; do not hurry.
              </li>
              <li>
                <strong className="text-white">Reflex King placement.</strong>{" "}
                Dropping the first King you see into the first empty
                column. The King stays there forever; wait for the
                King that unlocks the longest chain.
              </li>
              <li>
                <strong className="text-white">Chasing visible aces.</strong>{" "}
                Building the tableau around revealing an ace that is
                deep-buried, when two other aces are available at
                smaller cost. The column with more face-down cards is
                usually not the best target.
              </li>
              <li>
                <strong className="text-white">Stock-cycling without a plan.</strong>{" "}
                Cycling the stock and playing whichever cards are
                legal, instead of deciding first which card you are
                fishing for.
              </li>
              <li>
                <strong className="text-white">Ignoring Draw 3 cycle shifts.</strong>{" "}
                Playing stock cards without tracking how the cycle
                changes. The cycle is predictable; ignoring it is
                choosing to lose information.
              </li>
              <li>
                <strong className="text-white">Joining sequences too early.</strong>{" "}
                Dropping a 7 onto an 8 when you might want that 7 on
                a different 8 two moves later. Early joins can lock
                in suboptimal structure.
              </li>
              <li>
                <strong className="text-white">Leaving face-down cards
                face-down.</strong>{" "}
                Preferring face-up reorganizing to face-down reveals.
                The game is won by revealing cards, not by tidying.
              </li>
              <li>
                <strong className="text-white">Rebuilding for no reason.</strong>{" "}
                Dismantling a column to reach a buried card that, once
                free, does not open anything useful. Count the payoff
                before you pay the cost.
              </li>
              <li>
                <strong className="text-white">Forcing dead positions.</strong>{" "}
                Playing a locked position for another five minutes in
                the hope something shakes loose. It will not. Reset.
              </li>
              <li>
                <strong className="text-white">Playing at the wrong tempo.</strong>{" "}
                Racing through moves when the position needs thought,
                or stalling when the position is clear. Tempo is a
                skill; we return to it below.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Play Tempo */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Tempo" id="tempo" icon={"\u2660"}>
            Play tempo
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We have watched a lot of Klondike hands, and one of the
              clearest predictors of win rate is tempo. Players who
              race through moves lose to players who pause and read.
              Players who freeze on every decision fail to develop
              pattern recognition. The winning tempo is neither fast
              nor slow; it is responsive to the position.
            </p>
            <p>
              Fast is correct when the tableau is simple and the next
              three or four moves are forced. Stock top is an ace; the
              ace goes up. Stock top is a red 9 and a black 10 is
              exposed; the 9 goes to the 10. Fast play here is good
              play, because there is nothing to think about and
              thinking would only waste attention. The danger of fast
              play is when the position stops being simple and the
              tempo does not reset. Players blow good midgames by
              continuing to play at opening-tempo speed when the
              position has become subtle.
            </p>
            <p>
              Slow is correct at the branch points: the first King
              placement, the decision to send the first 2 to a
              foundation, the decision to start a stock cycle that
              will burn cards. These are the moves that echo. We
              spend a few seconds reading the full board before
              committing, and we ask whether the move closes any
              doors we might want open. That small pause is the
              single biggest tempo correction we give players.
            </p>
            <p>
              Timed play changes tempo but not the fundamentals. In a
              timed session we still pause at branch points; we just
              pause less. Players who race for a clock time almost
              always lose points to mistakes they would not have made
              in untimed play. The experienced approach is to decide
              up front whether the session is for speed or accuracy
              and to play the whole hand at one tempo. Switching
              tempos mid-game is where the real losses hide.
            </p>
            <p>
              Focus is the other half of tempo. Klondike is a long
              game for a 52-card deck, and concentration slips. A
              player who was doing well at move 15 can lose at move
              40 simply by losing focus. We treat games as
              self-contained: sit down, play one deal with full
              attention, finish, take a short break, start another.
              Marathon sessions with half-attention produce marathon
              losses. Short focused sessions produce the improvement
              graph we want.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related / Cross-links */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related" icon={"\u2665"}>
            Related Klondike guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike"
              title="Play Klondike Solitaire"
              description="Draw 1 or Draw 3, unlimited undo, hints, and statistics."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/how-to-play"
              title="How to Play Klondike"
              description="Canonical rules, setup, and a first-game walkthrough."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/tips"
              title="Klondike Tips"
              description="Quick tactical tips distilled from the mastery guide."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/strategy"
              title="Klondike Strategy"
              description="The deeper strategic layer: planning, sequencing, and tempo."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/draw-1-vs-draw-3"
              title="Draw 1 vs Draw 3"
              description="Why the two draw modes are different games, with cycle math."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-probability"
              title="Klondike Probability"
              description="Solvability bounds, simulation methodology, and human win-rate ceilings."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready to put it into practice?"
          body="Open a Draw 1 or Draw 3 game and play one deal with the opening checklist in mind."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the strategy guide"
          secondaryHref="/klondike/strategy"
        />
      </main>
    </ContentLayout>
  );
}
