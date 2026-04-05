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

const PAGE_PATH = "/spider-mastery";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Spider Solitaire Mastery: The Complete Guide | ${siteConfig.siteName}`,
  description:
    "The complete guide to Spider Solitaire mastery: the two-deck puzzle, four strategic pillars, opening principles, column-clearing framework, stock management, and the ten mistakes that cost games.",
  keywords: [
    "spider solitaire mastery",
    "spider solitaire guide",
    "spider solitaire strategy",
    "how to win spider solitaire",
    "spider solitaire tips",
    "empty columns spider",
    "spider stock management",
    "spider tableau reading",
    "spider endgame",
    "spider solitaire mistakes",
  ],
  openGraph: {
    title: "Spider Solitaire Mastery: The Complete Guide",
    description:
      "A deep guide to Spider Solitaire — structural math, four strategic pillars, opening principles, column-clearing, stock management, and the tactical errors that end games.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderMasteryPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Mastery: The Complete Guide",
      description:
        "The complete Spider Solitaire mastery guide: structural math, four strategic pillars, opening theory, column-clearing framework, stock management, tableau reading, endgame transitions, and tactical mistakes to avoid.",
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
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        { "@type": "ListItem", position: 3, name: "Spider Mastery", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Solitaire Mastery: The Complete Guide"
        subtitle="The structural math, the four strategic pillars, the opening framework, and the tactical errors that separate 10% players from 60% players."
        kicker="Strategy Pillar"
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
          <SectionHeading variant="dark" sub="Why Spider Is Different" id="intro" icon={"\u2660"}>
            Why Spider rewards different skills
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire looks like a cousin of FreeCell and Klondike,
              but it rewards a fundamentally different kind of thinking. In
              FreeCell every card is visible from the start, and the game is
              a pure logic puzzle with a handful of parking slots. In
              Klondike you cycle a stock pile and juggle alternating colors
              across seven columns. Spider hands you something closer to a
              building project: two decks of cards, ten tall columns, fifty
              cards waiting to drop from the stock, and a single goal that
              you have to engineer rather than navigate toward.
            </p>
            <p>
              The difference shows up in what wins a game. FreeCell rewards
              precise supermove arithmetic. Klondike rewards patience with
              the stock cycle. Spider rewards space. Every decision a skilled
              Spider player makes is really a decision about the shape of
              the tableau two or three deals from now. Can we clear a column
              before the next deal lands? Can we keep a same-suit run intact
              while we hunt face-down cards? If we open this column, does it
              stay open? Those questions sit on top of the familiar
              card-by-card choices, and that extra layer is where Spider
              stops feeling like a variant and starts feeling like its own
              game.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Two-Deck Puzzle */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Structural Math" id="two-deck-puzzle" icon={"\u2665"}>
            The two-deck puzzle
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Understanding Spider starts with counting pieces. The game uses
              two full decks shuffled together &mdash; 104 cards total,
              eight copies of every rank, with suit distribution that depends
              on the difficulty mode. At the deal, 54 of those cards land on
              the tableau across ten columns: the first four columns hold
              six cards each, the remaining six columns hold five cards
              each. Only the top card of every column is face-up. The other
              44 are hidden.
            </p>
            <p>
              The stock pile holds the remaining 50 cards, and it dispenses
              them in strict batches. Each time you trigger a deal, the
              stock drops one card onto every column. That means the stock
              contains exactly five deals of ten cards each. Once those five
              deals are gone, no new cards ever enter the tableau. Every
              game of Spider is therefore a finite resource problem: you
              start with 54 visible placements, you receive five
              forced injections of ten cards, and you have to assemble
              eight complete King-through-Ace runs out of what is in front
              of you.
            </p>
            <p>
              The foundations are another place Spider breaks the usual
              pattern. You do not build foundations card by card. Instead,
              when a complete same-suit King-to-Ace run appears on a column,
              the entire run is removed as a single block. Eight such
              removals end the game in victory. That rule has a large
              strategic consequence: foundations are not a safety valve you
              can use to park awkward cards early. They are the final
              delivery of work you have already done on the tableau. Until
              you have assembled thirteen cards of the same suit in descending
              order, nothing goes to the foundation. Every foundation event
              is really a column-clearing event.
            </p>
            <p>
              Put those three rules together &mdash; 104 cards, five forced
              deals, run-based foundations &mdash; and Spider becomes a game
              about staging. Your job at any given moment is to protect the
              work you have already done (the same-suit runs you have
              assembled), expose more work to do (the face-down cards under
              those runs), and keep enough empty space to absorb the next
              deal without losing your structure. Every Spider mistake
              traces back to misjudging one of those three pressures.
            </p>
            <p>
              The column geometry is worth pausing on. Ten columns sounds
              like a lot of space, but after the fifth deal the tableau
              carries 104 cards spread across those ten slots. The average
              column depth late in the game is ten cards or more. That
              density is why empty columns are precious: without them, the
              tableau has no flex, and any move you want to make runs into
              the wall of another tall column. The whole game is really a
              fight to keep at least one column short enough that the rest
              of the board can breathe.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Four Strategic Pillars */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Core Framework" id="four-pillars" icon={"\u2666"}>
            The four strategic pillars
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Every Spider decision answers to one of four competing
              priorities. When players stall, it is usually because they
              are optimizing for one pillar while ignoring the other three.
              Reading Spider like a strategist means feeling all four at
              once and knowing which one to privilege in a given position.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Pillar 1: Column depth &mdash; exposing hidden cards.
            </p>
            <p>
              Forty-four face-down cards start the game. Every face-down
              card is a question you cannot answer yet, and answered
              questions are what let you plan. The first pillar is therefore
              uncovering cards. Moves that peel a card off the bottom of a
              column are paid for in information, and that information
              usually pays for itself across the next ten turns. The
              shortest columns at deal time &mdash; the six five-card
              columns &mdash; are the cheapest information you can buy.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Pillar 2: Same-suit building &mdash; protecting movable runs.
            </p>
            <p>
              In Spider you can lay a descending card on any other descending
              card of any suit. But only a same-suit descending run can be
              picked up and moved as a group. That single rule is the entire
              reason Spider is harder than it looks. A mixed-suit run is
              frozen &mdash; it can only move one card at a time. A
              same-suit run is a lever. The second pillar is protecting
              same-suit structure once you build it and avoiding
              moves that cross a suit boundary unnecessarily.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Pillar 3: Empty-column creation &mdash; the space dividend.
            </p>
            <p>
              Every empty column is an unlocked door. Any card or any
              same-suit run can land on an empty column, which means empties
              multiply your move options. A Spider tableau with two empty
              columns is a different game than the same tableau with zero.
              The third pillar is about manufacturing empties and refusing
              to fill them casually. We return to this pillar in detail in
              our column-clearing framework below and in the{" "}
              <Link href="/spider-column-tactics" className="text-[#D4AF37] hover:underline">
                Spider Column Tactics
              </Link>{" "}
              pillar.
            </p>
            <p className="text-[#D4AF37] font-semibold">
              Pillar 4: Stock-deal timing &mdash; when to accept the injection.
            </p>
            <p>
              The deal button is always available once every column has at
              least one card, but that does not mean every moment is equal.
              A deal lands ten new cards on top of your existing columns,
              potentially burying runs you just finished building. The
              fourth pillar is knowing when a deal helps you (you are stuck
              and need new material) and when it hurts you (you are about
              to empty a column and would prefer the current cards stay
              exposed). Good Spider players deal with intent. Beginners
              deal because they are out of ideas.
            </p>
            <p>
              The pillars do not operate independently. They trade off. A
              move that exposes a face-down card might cross a suit boundary
              and freeze a run. A move that protects a same-suit run might
              cost you an empty column. A deal that rescues you from a
              stuck position might bury three face-downs you were about to
              expose. Every Spider decision is really a weighted comparison
              of pillar priorities, and the weights shift as the game
              progresses. Early-game tilts toward pillars one and two
              (information and structure); mid-game tilts toward pillar
              three (space); endgame tilts toward pillar two again (clean
              runs to deliver to foundations). Recognizing which pillar
              the current position most needs is the meta-skill.
            </p>
          </ContentBody>
        </CardSection>

        {/* Opening Principles */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="First Moves Framework" id="opening-principles" icon={"\u2663"}>
            Opening principles
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider openings look deceptively simple because only ten cards
              are face-up. That surface simplicity is a trap. The first
              fifteen moves of a Spider game set the distribution of empty
              columns, same-suit runs, and exposed cards that will shape
              every subsequent turn. A loose opening produces a position
              where the first deal is a disaster. A disciplined opening
              produces a position where the first deal clarifies the board.
            </p>
            <p>
              We open Spider with three tasks in priority order. First,
              scan the ten face-up cards for same-suit connections. If a
              Ten of Spades sits on one column and a Nine of Spades sits on
              another, that pair is the beginning of a same-suit run and
              should be joined as soon as it is safe to do so. Finding
              these latent connections is the single most important opening
              move because it builds the first lever of the game.
            </p>
            <p>
              Second, identify which columns can be shortened fastest. Columns
              with small top cards (low numbers) are usually easier to
              empty because low cards migrate to the tops of other columns
              more readily. Columns with Kings at their base are harder to
              clear because a King cannot go anywhere except on an empty
              column. A five-card column with a Two on top is far more
              promising than a five-card column with a Jack on top.
            </p>
            <p>
              Third, set up cascades. A cascade is a sequence of moves where
              each move creates the condition for the next. If moving the
              top of column 7 onto column 3 exposes a card that lets us
              then move column 4 onto column 7, we have staged a two-move
              chain that turns one opportunity into two. Good openings are
              chains. Bad openings are one-offs that leave the board
              structurally identical to where it started except with
              cards shuffled around.
            </p>
            <p>
              A quick opening checklist we use at the Strategy Desk: name the
              two same-suit connections visible on the tableau, name the two
              shortest columns, name one face-down card you expect to expose
              in the next three turns, and name one column that is a
              candidate for emptying. If you can answer all four before your
              first move, you are opening Spider correctly. If you cannot,
              you are about to make a random-feeling move that will haunt
              the mid-game.
            </p>
            <p>
              Opening move order matters too. Make the irreversible moves
              first &mdash; the ones you cannot undo without disrupting
              other plans. Moves that expose face-down cards are
              irreversible, so they often go first. Moves that merge two
              same-suit cards into a starter run are semi-permanent and
              usually second. Moves that fill empty space are last, because
              filling empties commits you to a board shape, and you want to
              know what shape you need before committing. Think of the
              opening as staging, not executing: you are preparing the
              tableau to do work, not doing it yet.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Column-Clearing Framework */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Most Valuable Asset" id="column-clearing" icon={"\u2660"}>
            The column-clearing framework
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Empty columns are the single most valuable resource in
              Spider. This is not a casual claim. We mean it arithmetically.
              A free cell in FreeCell holds one card. An empty column in
              Spider accepts any card and any same-suit run of any length.
              That asymmetry compounds every turn the column stays open.
            </p>
            <p>
              The mechanism is straightforward. When you need to move a
              same-suit run but the destination column blocks you, an empty
              column becomes the temporary home that frees the run to travel
              later. When you need to expose a face-down card and the column
              above it is full of mixed-suit junk, an empty column lets you
              offload the junk one card at a time without destroying other
              structure. When the stock deal lands and a key King comes off
              the top, an empty column absorbs it without wrecking a
              neighbor. Empty columns are not just convenience &mdash; they
              are the infrastructure that makes complex Spider plays
              possible.
            </p>
            <p>
              Creating an empty column starts with the column you are
              going to empty, not the move you want to make. Pick the target
              column first. Usually this is the column with the fewest cards
              and the smallest face-up card at its base, which minimizes the
              number of cards you need to place elsewhere. Then walk
              backwards: for each face-up card on the column, identify where
              it will go. If a card has no destination, ask whether you can
              create one by rearranging another column first. If multiple
              cards share a destination, you will need a chain.
            </p>
            <p>
              The second skill is defending empties. Once a column opens,
              beginners fill it immediately &mdash; usually with a King or
              a single card they wanted off their hands. That is almost
              always a mistake. An empty column with one King in it has
              already lost most of its value. The whole point of the empty
              is optionality; filling it commits you to that one card. The
              right question is: what is the minimum commitment this empty
              column can absorb to still serve as a staging area? The best
              answer is frequently "nothing" &mdash; keep the column open
              for another three moves and use it as overflow until you have
              to commit.
            </p>
            <p>
              There is a rule of thumb we call the two-empty threshold. If
              you can engineer the tableau to have two empty columns at
              once, Spider gets dramatically easier because you can move
              any same-suit run or King-headed stack around without
              blocking yourself. Reaching two empties is the milestone
              that turns a mid-game into a winning position in most hands.
              Most lost Spider games are lost because the player never
              generated a second empty column and kept bashing against a
              single-column bottleneck.
            </p>
            <p>
              For a deeper treatment of empty-column tactics, see our{" "}
              <Link href="/spider-column-tactics" className="text-[#D4AF37] hover:underline">
                Spider Column Tactics
              </Link>{" "}
              pillar &mdash; it unpacks the full column-clearing playbook
              including traps to avoid when filling empties.
            </p>
          </ContentBody>
        </CardSection>

        {/* Stock Management */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Five-Deal Countdown" id="stock-management" icon={"\u2665"}>
            Stock management
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The stock pile in Spider is fixed: 50 cards, five deals, no
              more. Unlike Klondike, there is no recycling. Every deal is a
              one-way injection of ten cards. The central stock-management
              question is not whether to deal, but when &mdash; and that
              question matters because a deal can either clarify or wreck
              the tableau depending on the state you deal into.
            </p>
            <p>
              The ground rule in Spider is that you cannot deal when any
              column is empty. The engine enforces this because a deal
              injects one card per column, and empty columns would simply
              skip and break the game. That rule is a strategic lever. If
              you are sitting on an empty column and you want to keep it
              open, you are safe from an accidental deal. If you are trying
              to deal, you first have to fill every empty column, which
              often means committing a card you did not want to commit.
            </p>
            <p>
              We deal when the tableau is stuck &mdash; no productive moves
              left, no face-down cards you can peel without making things
              worse, and the runs you have built are stable enough that new
              cards on top of them will not scramble them beyond recovery.
              We hold the deal when we are mid-cascade, when we are one or
              two moves from opening a column, or when the current tableau
              is fragile enough that burying it under ten new cards would
              lose the progress we have already made.
            </p>
            <p>
              The five-deal countdown matters because each deal costs a
              specific thing: visibility. Right before the last deal, you
              ideally want every face-down card exposed, because new cards
              will land on top and potentially re-bury work you thought was
              done. A common intermediate-player mistake is racing through
              the first two deals out of habit and arriving at the fifth
              deal with half the original face-downs still hidden &mdash;
              the final injection almost always buries them permanently.
              Pacing the five deals so each one lands on a clean or
              semi-clean tableau is one of the skills that separates 10%
              players from 40% players.
            </p>
            <p>
              A reasonable tempo for the five deals: deal one after the
              first round of exposure work, when you have roughly a third of
              the initial face-downs cleared and at least one same-suit
              pair connected. Deal two after another round of
              reorganization, ideally when you have opened your first empty
              column. Deal three should land on a tableau where most
              early face-downs are visible and at least two columns are
              substantially shorter than average. Deal four is the
              pre-endgame deal &mdash; take it when you are close to
              having all face-downs exposed, because deal five is about to
              force you into closing mode. Deal five is always a calculated
              hit; take it when there is nothing left to prepare.
            </p>
          </ContentBody>
        </CardSection>

        {/* Reading the Tableau */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Board Awareness" id="reading-tableau" icon={"\u2666"}>
            Reading the tableau
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Reading a Spider tableau means seeing more than what is on it
              right now. It means recognizing which runs can still move,
              which face-down cards are likely to be helpful versus awkward
              when they are revealed, and how a potential stock deal will
              reshape the current picture. Most recovery plays begin with a
              correct read.
            </p>
            <p>
              Start with movable runs. Identify every descending same-suit
              run of length two or more, and mark them as movable assets.
              Then identify every descending mixed-suit run &mdash; these
              are frozen. You can add a card to a mixed run, but you cannot
              pick it up. Confusing movable with frozen runs is the single
              most common mid-game error in 2-suit and 4-suit Spider.
            </p>
            <p>
              Next, track hidden cards. With 44 face-downs at deal time, a
              skilled Spider player keeps a rough running estimate of how
              many of each rank are still hidden. You do not need to track
              every card. You need to know whether the remaining Kings are
              probably buried deep or likely to show up on the next deal.
              Late-game recovery often depends on a read like "there is
              probably one more Six of Hearts still under that column, so
              clearing this run now is premature."
            </p>
            <p>
              Finally, predict the deal. Before triggering a deal, look at
              the top card of each column and imagine a random card landing
              on top. Which landings would wreck you? Which would help?
              If the wreck scenarios dominate &mdash; for example, most
              tops are mid-rank cards with no plausible higher card that
              could land cleanly &mdash; delay the deal, or rearrange the
              tops so the deal has a better chance of landing productively.
              You do not control which cards come out, but you control which
              landing pad they meet.
            </p>
            <p>
              Tableau reading is also a defense against tunnel vision. It is
              easy to fall in love with a specific plan &mdash; finishing
              one same-suit run, for example &mdash; and ignore the
              position of the other nine columns. The habit we train at the
              Strategy Desk is a full-tableau scan before every fourth or
              fifth move: step back, look at the entire board, and ask
              whether the move sequence you are about to execute is still
              the best use of the position. Often it is not; often there
              is a cheaper move on a column you have not been watching.
            </p>
          </ContentBody>
        </CardSection>

        {/* Endgame Transitions */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Closing The Game" id="endgame" icon={"\u2663"}>
            Endgame transitions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Spider endgame begins after the fifth and final stock
              deal. From that point forward, no new cards enter the game,
              and every decision is about combining the cards that are
              already visible into eight complete runs. The endgame has
              three characteristic states: winning, losing, and recoverable.
              Recognizing which one you are in is the first move.
            </p>
            <p>
              A winning endgame looks like this: most face-down cards are
              exposed, at least two empty columns are available, and most
              of your same-suit runs are partially assembled &mdash; not
              complete, but staged so the remaining cards have obvious
              destinations. From here, execution is mostly arithmetic.
              Count the moves required to finish each run, sequence them in
              an order that does not block itself, and drive forward.
            </p>
            <p>
              A losing endgame is the opposite: multiple face-down cards
              still buried, no empty columns, mixed-suit junk on top of
              your runs, and no way to reorganize without dismantling work.
              Losing endgames rarely recover. The correct response is to
              identify the move sequence that would be required to recover,
              recognize that it is not available, and start a new game with
              the lessons from this one.
            </p>
            <p>
              Recoverable endgames are the interesting case. You are stuck
              but not broken. The recovery playbook has three moves: look
              for a swap that temporarily trades a mid-game advantage for
              access to a buried card, accept one short-term sacrifice to
              generate one empty column, and recompute the remaining runs
              from scratch. Many recoverable endgames are won by noticing
              that a partially assembled same-suit run of four cards can be
              temporarily broken to free a critical low card &mdash; the
              broken run reassembles three moves later on a different
              column and the sacrifice nets you a win.
            </p>
            <p>
              Transitioning between states is the skill. A game can move
              from winning to recoverable in two bad moves, and from
              recoverable to losing in another two. The way to hold a
              winning endgame is to stop making aggressive plays once the
              outcome is determined &mdash; just finish each run in
              sequence, one foundation event at a time, and do not
              introduce unforced complexity. The way to climb out of a
              recoverable endgame is to slow down, re-scan the whole
              tableau as though you were seeing it for the first time, and
              look for the unorthodox move &mdash; the one that breaks a
              run, empties a column, or reshapes a tableau you have been
              treating as fixed.
            </p>
          </ContentBody>
        </CardSection>

        {/* The 10 Spider Mistakes */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Tactical Errors" id="mistakes" icon={"\u2660"}>
            The ten Spider mistakes
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Across thousands of Spider hands at the Strategy Desk, ten
              errors account for most losses. Most of them are small enough
              to escape notice until the deal that punishes them arrives.
            </p>
            <ol className="space-y-3 list-decimal pl-6">
              <li>
                <strong className="text-white">Crossing suits unnecessarily.</strong>{" "}
                Placing a descending card of a different suit on top of a
                same-suit run freezes the run in place. Only do it when the
                move is load-bearing.
              </li>
              <li>
                <strong className="text-white">Filling an empty column with one card.</strong>{" "}
                An empty column is infrastructure. One card in it is usually
                a commitment you will regret.
              </li>
              <li>
                <strong className="text-white">Dealing out of impatience.</strong>{" "}
                If you are out of moves, deal. If you still have productive
                moves, resolve them first.
              </li>
              <li>
                <strong className="text-white">Ignoring face-down cards.</strong>{" "}
                Every face-down card is a future problem. The longer you
                postpone uncovering it, the worse the late game gets.
              </li>
              <li>
                <strong className="text-white">Assembling runs you cannot complete.</strong>{" "}
                A same-suit run of six cards is useless if the Seven you need
                is double-buried. Check the path before committing.
              </li>
              <li>
                <strong className="text-white">Building mixed-suit chains too long.</strong>{" "}
                A mixed chain of eight cards is an anchor. Keep chains short
                unless the chain itself is load-bearing for a cascade.
              </li>
              <li>
                <strong className="text-white">Moving Kings prematurely.</strong>{" "}
                Kings only go on empty columns. Placing a King there
                permanently costs you the empty until the King is moved
                again &mdash; which might be never.
              </li>
              <li>
                <strong className="text-white">Forgetting the two-card constraint.</strong>{" "}
                Mixed-suit runs can only move one card at a time. Plan
                mixed-run moves as a sequence, not a single action.
              </li>
              <li>
                <strong className="text-white">Dealing into a fragile tableau.</strong>{" "}
                If ten random cards on top of your columns would wreck you,
                delay the deal and reshape the tops first.
              </li>
              <li>
                <strong className="text-white">Declaring dead too early.</strong>{" "}
                Spider tableaus that look hopeless often have one cascade
                hidden in them. Walk the board once more before restarting.
              </li>
            </ol>
            <p>
              If you internalize one heuristic from this list, make it the
              fifth one: before you assemble a same-suit run, verify that
              the remaining cards in the run are reachable. Spider players
              lose hundreds of games building elegant five-card runs that
              then freeze because the matching Six or Seven is permanently
              buried under a King. The lesson is to treat every same-suit
              run as a hypothesis that you will need to pay for later. If
              the payment is not affordable, do not start the run. Trust
              that the cards you need to pay will be exposed by pillar one
              work (face-down exposure) in due time.
            </p>
            <p>
              The other mistake that deserves its own paragraph is mistake
              nine: dealing into a fragile tableau. Every deal is permanent.
              You cannot undo a deal once it lands, and the cards it drops
              are distributed randomly across your ten columns. If your
              current tops are mostly low-to-mid cards with same-suit runs
              beneath them, a deal can bury your runs under unplayable
              high cards that will sit there until you chip them off one
              by one. The defense is always the same: before dealing, look
              at the top of every column and ask &ldquo;if a random card
              landed here, would I still have a plan?&rdquo; If the answer
              is no for more than three columns, delay.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2665"}>
            Spider reading list
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="Jump into a game at the difficulty you want — 1, 2, or 4 suit."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/how-to-play"
              title="How to Play Spider"
              description="The canonical rules primer — deal, movement, stock, and win condition."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy Primer"
              description="The short-form strategy page for players who want the highlights."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/tips"
              title="Spider Tips"
              description="Quick tactical tips that fit on a single screen."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-suit-strategy"
              title="1-Suit vs 2-Suit vs 4-Suit"
              description="How the three difficulty modes play as different games."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-column-tactics"
              title="Spider Column Tactics"
              description="The deep dive on empty columns — creating, defending, and using them."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Play with the framework"
          body={
            <>
              The only way to internalize the four pillars is to use them.
              Start a hand, name the pillar you are prioritizing on each
              move, and see how your win rate shifts after twenty games.
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
