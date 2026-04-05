import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const ROUTE = "/freecell-mastery";

export const metadata: Metadata = {
  title: `FreeCell Mastery: From Beginner to Expert | ${siteConfig.siteName}`,
  description:
    "A complete FreeCell mastery guide: the four pillars of play, opening theory, cell economics, supermoves, endgame technique, Microsoft deal distribution, and tournament-level preparation.",
  keywords: [
    "freecell mastery",
    "freecell expert strategy",
    "freecell advanced strategy",
    "freecell opening theory",
    "freecell supermoves",
    "freecell endgame",
    "freecell cell economy",
    "freecell tournament play",
  ],
  openGraph: {
    title: `FreeCell Mastery: From Beginner to Expert | ${siteConfig.siteName}`,
    description:
      "The long-form mastery guide we wish we had when we were learning FreeCell: pillars, openings, cell economics, supermoves, endgame, deal distribution, and speedrun play.",
    url: absoluteUrl(ROUTE),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor(ROUTE),
  },
};

export default function FreecellMasteryPage() {
  if (!isOwnedBy(ROUTE, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "FreeCell Mastery: From Beginner to Expert",
      description:
        "A long-form guide to mastering FreeCell, from the four pillars of play through opening theory, cell economics, supermoves, endgame technique, and tournament preparation.",
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
        "@id": absoluteUrl(ROUTE),
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
          name: "FreeCell Mastery",
          item: absoluteUrl(ROUTE),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        kicker="Strategy Desk"
        title="FreeCell Mastery: From Beginner to Expert"
        subtitle="Every card face-up, every decision yours. This is the long guide we wish someone had handed us when we first sat down with a full deal and the faint suspicion that good play and bad play were different things."
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
          <SectionHeading
            variant="dark"
            sub="Why Mastery Matters"
            id="intro"
            icon={"\u2660"}
          >
            FreeCell rewards mastery more than any other solitaire
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Most solitaire games are partly about luck. You flip cards off a
              stock pile, hope a red Jack appears, curse the shuffle when it
              does not, and move on. FreeCell does not give you that
              consolation. Every one of the fifty-two cards is visible from the
              first move. There is no hidden row, no stock to cycle, no
              mysterious next card. When you lose, it is because of a decision
              you made, and if you can learn to make better decisions, your
              win rate can climb almost without ceiling.
            </p>
            <p>
              That is the feature of FreeCell that rewards mastery. Skill
              converts almost linearly into wins. A new player might finish
              fifty or sixty percent of their games. A careful intermediate
              player will push that number into the seventies. A strong player
              wins ninety or more, and the best tournament players, on
              difficult deal sets, win everything that is mathematically
              possible to win. The ceiling is close to a hundred percent, and
              closing the gap is not about luck. It is about seeing more of the
              board, counting more of the moves, and knowing which of the two
              decent lines is actually the correct one.
            </p>
            <p>
              This page is a mastery guide, written the way we teach the game
              at the Strategy Desk. We start with the four pillars that
              organise every decision in FreeCell, then move through the phases
              of a game in order: opening, midgame, endgame. We cover the
              cell-economy thinking that separates strong players from
              average ones. We explain supermoves the way a tournament player
              thinks about them, not the way a software manual describes them.
              We end with a tour of the Microsoft deal set and the particular
              habits of mind that speedrun and tournament players cultivate.
              None of it is magic. All of it is learnable.
            </p>
          </ContentBody>
        </CardSection>

        {/* Pillars */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Four Pillars"
            id="pillars"
            icon={"\u2665"}
          >
            The pillars of FreeCell play
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Everything we know about strong FreeCell play rests on four
              pillars: full visibility, cell economy, column economy, and
              sequence building. Every decision you make should be readable as
              a trade between these four. If you cannot name which pillar a
              move is serving, the move is probably not worth making.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Pillar one: visibility
            </h3>
            <p>
              FreeCell starts with all cards face-up, and this is the
              foundation of everything else. You are not playing against a
              hidden deck. You are solving a puzzle that has been published in
              full. The first thirty seconds of a game, before you touch any
              cards, should be spent reading the board. Where are the four
              Aces buried? How deep is the Ace you need worst of all? Which
              columns are holding Kings that will block a long unwinding? Are
              the low cards clustered on one side of the tableau or scattered
              evenly? Can you trace a path from any given Ace to the
              foundation without moving more than two or three other cards
              out of the way?
            </p>
            <p>
              Strong players develop a deal-reading habit. They do not start
              moving cards until they have a rough mental map of the deal.
              Weak players, by contrast, grab the first move that looks good
              and end up committed to a line before they know whether the
              deal has a trap in it. The face-up property of FreeCell is not
              a gift you can ignore. It is the single most important source
              of information you will ever have, and the game is designed
              around the assumption that you are using it.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Pillar two: cell economy
            </h3>
            <p>
              The four free cells are the scarcest resource in the game.
              Every card parked in a cell is a card not helping you, and
              every filled cell shrinks the pool of legal moves. The
              supermove mechanic, which we will cover in detail later,
              depends directly on how many cells are empty: one empty cell
              doubles the number of cards you can move in a run, two empty
              cells triple it, and so on. A full set of empty cells can
              turn an apparently impossible line into a routine one.
            </p>
            <p>
              Cell economy is not about never using cells. It is about
              knowing the cost of each cell you fill. A cell is cheap when
              it is being used to expose a card you need soon and the card
              going into the cell is one you can retrieve quickly. A cell is
              expensive when the card you are parking is a deep-suit blocker
              that will not come out until late in the game. Masters
              unconsciously classify every parked card by how long it will
              sit there. Beginners fill cells in order and panic when they
              fill the last one.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Pillar three: column economy
            </h3>
            <p>
              The eight tableau columns are your working space. An empty
              column is more valuable than a full cell, because an empty
              column can hold a sequence of any length. In the
              supermove formula, empty columns multiply your movable-run
              size, so opening a column at the right moment can unlock a
              position that looked blocked. But not every column is equally
              easy to empty. A column that already contains a King is
              painful to clear because Kings only move to empty columns,
              and once one is there, you cannot stack it on anything. A
              column with a single blocking low card near the top is often
              the cheapest column to empty.
            </p>
            <p>
              Column economy also governs where you place cards. Putting a
              black Seven on a red Eight that has nothing below it is a
              different move from putting the same Seven on a red Eight
              that is hiding a trapped Ace. The destination matters. Good
              players look two or three layers down before they commit.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Pillar four: sequence building
            </h3>
            <p>
              The objective, ultimately, is to build the four foundations
              from Ace through King. But on the way there, you are also
              building tableau sequences, because tableau sequences are how
              cards get to the foundation quickly. A clean sequence from a
              King down to a low card is both a destination for other
              cards and a future pipeline onto the foundations. Deciding
              which sequence to prioritise is mostly a question of which
              suits are free to run. If hearts is clear to Jack and diamond
              foundations are ready to receive low cards, building a long
              red-Seven run is more valuable than building a parallel black
              run that has no home.
            </p>
            <p>
              Those are the four pillars. Every decision in FreeCell is a
              trade across them. Fill a cell to expose a low card, or
              empty a column to expand the movable run? Build a longer
              sequence now, or keep a shorter one flexible for later?
              Strong players think in pillars. We will refer back to them
              throughout the rest of this guide.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Opening Theory */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="The First Three Moves"
            id="opening-theory"
            icon={"\u2666"}
          >
            Opening theory
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The opening of a FreeCell game is where mastery is most
              visible. The first three moves, by our measurement, account
              for the difference between winning and losing on a large
              fraction of hard deals. A strong opening is not about
              aggressive play. It is about reading the deal, identifying
              the Ace that is hardest to reach, and making sure you do not
              commit to a line that makes it harder.
            </p>
            <p>
              Before we describe what to do, here is what not to do. Do
              not park a card in a cell before you have looked at the
              whole board. Do not stack an Ace onto the foundation in the
              first move simply because the first move happens to be free
              — sometimes holding the Ace in its column for one more turn
              keeps the column alive. Do not open a column by clearing
              its bottom card before checking whether clearing it creates
              a free column you can use or a trapped column you cannot.
              Opening theory in FreeCell is close to opening theory in
              chess: the wrong first move can cost you the game, and the
              right first move often looks modest.
            </p>

            <h3 className="text-lg font-semibold text-white">
              What to look for in the deal
            </h3>
            <p>
              The single most important question to ask about a fresh
              deal is where the Aces and Twos are. Foundations start
              empty, and you cannot build anything until the Aces come
              out. If three of your four Aces are near the top of their
              columns and one is buried six cards deep, the deep Ace is
              the deal&apos;s choke point. Every decision in the opening
              should take the position of that buried Ace into account.
              You cannot bury it further. You may need to park cards in
              cells specifically to dig it out.
            </p>
            <p>
              The second question is where the Kings are. Kings are
              immovable outside empty columns, so a King parked at the
              bottom of a tall column is usually fine. A King in the
              middle of a column, with useful cards below it, is a
              problem because clearing the column will require moving
              several good cards to expose the King, and then moving
              the King somewhere it may not belong. Count your Kings
              and note which ones are blockers.
            </p>
            <p>
              The third question is whether the low cards (Twos, Threes,
              Fours) are clustered or spread. Clustering is good. If
              three of your Twos are near the top and one is deep, you
              can build foundations quickly on three suits and work on
              the fourth. If all four Twos are buried, the opening will
              feel brittle, because foundations will be slow and
              cell pressure will be higher.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Ace-exposure moves
            </h3>
            <p>
              The strongest opening moves are usually ace-exposure moves:
              sequences of one or two moves that uncover an Ace without
              committing cells or blocking columns. An Ace sitting beneath
              a single card with a natural destination is the ideal case.
              An Ace beneath two unrelated cards, where each one needs a
              cell, is a signal that the deal will be slow. When an Ace
              is reachable in two or fewer moves without using a cell,
              you take it. When it requires a cell, you weigh the cost:
              is the card going in cheap to retrieve, or is it another
              low card you will need back soon?
            </p>

            <h3 className="text-lg font-semibold text-white">
              Column-selection heuristics
            </h3>
            <p>
              In the first five or six moves, avoid starting sequences
              in columns that already contain blockers. If column three
              has a buried King, do not extend the top of column three
              with a long run — that run will need to be moved later
              when you clear the King. Prefer to start runs in columns
              that either already contain their own natural sequences or
              whose bottom cards are close to the foundation.
            </p>
            <p>
              Also prefer to empty the cheapest column first. If column
              two has only three cards and one of them has an easy
              home, column two is your cheapest empty-column candidate.
              An early empty column is worth more than most opening
              moves combined, because it dramatically expands the
              movable-run formula from that point forward.
            </p>
            <p>
              For deeper coverage of opening principles, see our{" "}
              <Link
                href="/freecell-opening-strategy"
                className="text-[#D4AF37] hover:underline"
              >
                FreeCell opening strategy guide
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Midgame: Cell Economics */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Midgame Part One"
            id="midgame-cells"
            icon={"\u2663"}
          >
            Midgame: cell economics
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The midgame is where most games are won or lost. Opening
              mistakes are survivable on easy deals. Midgame mistakes
              tend to compound. The central midgame skill is knowing when
              to use a cell and when to hold one in reserve, which is
              what we call cell economics.
            </p>

            <h3 className="text-lg font-semibold text-white">
              When to use a cell
            </h3>
            <p>
              Use a cell when the card you are parking is cheap to
              retrieve, when the card it exposes is worth more than one
              move of flexibility, or when the alternative is blocking a
              column. Cells are also fine to use temporarily — if you
              can park a card, complete a multi-step plan, and return
              the card within two or three moves, the cell was effectively
              free. The sin is parking a card and then not touching it
              for twenty moves.
            </p>

            <h3 className="text-lg font-semibold text-white">
              When to hold a cell
            </h3>
            <p>
              Hold a cell when the movable-run size you currently have
              is exactly what you need for the next big move. If you
              need to move a five-card run and you have three empty
              cells plus one empty column, you can do it. If you fill
              one of those cells speculatively, you lose the five-card
              run. Count before you fill. Veterans count in their heads
              as a reflex: empty cells, empty columns, current run
              capacity. That is cell parity thinking, and it is the
              habit that separates intermediate players from strong
              ones.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Cell parity thinking
            </h3>
            <p>
              Cell parity is the bookkeeping that lets you answer one
              question: how many cards can I move right now? The
              supermove formula is <em>(empty cells + 1) × 2 ^ empty
              columns</em>. One empty cell with zero empty columns
              means two cards. Four empty cells with zero columns
              means five. Four empty cells with two empty columns
              means twenty. You do not need to memorise the table.
              You just need to know what happens to the number when
              you spend a cell or open a column. Spending a cell
              subtracts one from the run size. Opening an empty
              column doubles it. Closing an empty column halves it.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Common midgame traps
            </h3>
            <p>
              The most common midgame trap is cell lock: you fill
              three cells, the fourth is precious, and the position
              has no legal moves that do not require you to dump
              another card into the fourth cell. Once the fourth cell
              fills with no plan to retrieve, the game is effectively
              over. The cure is to stop before you fill the third
              cell and ask whether the full position — not just the
              next move — actually needs that cell.
            </p>
            <p>
              The second common trap is the parallel-suit jam. You
              build two beautiful cascading runs in parallel and then
              discover that both are blocked by the same card. Parallel
              runs are appealing because each feels like progress, but
              they waste space if only one of them can finish. Prefer
              to commit to a primary run and use the secondary as a
              dumping ground for small cleanups.
            </p>
          </ContentBody>
        </CardSection>

        {/* Midgame: Supermoves */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Midgame Part Two"
            id="supermoves"
            icon={"\u2660"}
          >
            Midgame: supermoves
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              A supermove is the mechanic that lets you move a run of
              cards in a single interface gesture even though the game
              technically only allows single-card moves. The engine
              counts the empty cells and columns, calculates how many
              cards you can move by staging them through those spaces,
              and performs the whole staging sequence as one action.
              Without supermoves, even a simple red-Eight-to-black-Nine
              stack would require you to manually shuffle each card
              through a cell.
            </p>

            <h3 className="text-lg font-semibold text-white">
              The supermove formula
            </h3>
            <p>
              Most implementations use the standard formula: the
              number of cards you can move in a single run is{" "}
              <em>(empty cells + 1) × 2 ^ (empty columns)</em>. With
              four empty cells and no empty columns, you can move
              five cards. With three empty cells and one empty
              column, you can move eight. With four empty cells and
              two empty columns, you can move twenty. The exponent
              is where the real leverage lives: every additional
              empty column roughly doubles your movable-run length,
              which is why empty columns are the most valuable
              resource in the game.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Counting available moves
            </h3>
            <p>
              Masters count available moves constantly. Before
              starting any multi-card move, they verify that the
              current resources support it. Before filling a cell or
              closing a column, they check whether the next planned
              move will still fit. This is why cell parity thinking
              is so central: the moves you can and cannot make are
              a direct function of the current resource count.
            </p>
            <p>
              One subtlety: the exponent counts columns that are
              empty before the move starts. If you want to move a
              run <em>into</em> an empty column, the column does not
              count toward the supermove length of <em>that</em>
              move. It counts for every other move. That distinction
              bites beginners who try to move an eight-card run into
              their last empty column.
            </p>

            <h3 className="text-lg font-semibold text-white">
              When the engine supermove is not optimal
            </h3>
            <p>
              The computed supermove is always legal, but it is not
              always best. The engine will move a five-card run for
              you in one action by staging through your cells, but
              if you wanted one of those cards to sit in a cell for a
              later exposure, the engine has just spent your cells
              and returned them all, and that return path may not
              match the position you actually wanted. At master
              level, some players disable auto-supermoves on certain
              deals and perform the staging manually to control which
              card ends up where. That is niche behaviour, but it is
              the kind of detail that matters when you are chasing
              the last few percentage points of win rate.
            </p>
            <p>
              For the deeper mechanic walkthrough, see{" "}
              <Link
                href="/how-freecell-supermoves-work"
                className="text-[#D4AF37] hover:underline"
              >
                how FreeCell supermoves work
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Endgame Technique */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Closing the Game"
            id="endgame"
            icon={"\u2665"}
          >
            Endgame technique
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The endgame is the phase after the foundations start
              filling rapidly and the tableau has collapsed to a few
              remaining runs. A well-played midgame almost always
              produces a winning endgame, but weak endgame technique
              can still turn a won position into a loss. The two core
              endgame skills are knowing when auto-complete is about
              to trigger and ordering foundation builds so that the
              last few cards do not strand.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Auto-complete triggers
            </h3>
            <p>
              Most FreeCell implementations auto-complete the game
              when every card in the tableau and cells can be
              monotonically advanced to the foundation without
              further choices. On our site, auto-complete triggers
              when the remaining cards form strictly descending
              alternating-colour sequences (or, in same-suit
              variants, strictly descending same-suit sequences)
              and there are no blockers. Recognising when you are
              within a move or two of that trigger is worth a
              noticeable amount of time, because you can stop
              optimising and simply let the game finish.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Foundation-build ordering
            </h3>
            <p>
              When you have multiple foundations at similar heights,
              the order in which you feed them matters. Pushing
              hearts to King while clubs is still at Seven can
              strand a black card that you now have nowhere to
              park. The rule of thumb is to keep foundations close
              in rank and to prefer sending the card whose absence
              most opens the tableau. Cards that are holding up a
              run should go to foundation before cards that are
              already at the bottom of an empty run.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Counting remaining moves
            </h3>
            <p>
              In the last ten or twelve moves, you should be
              counting. How many cards remain? How many are in
              cells? How many in each column? Are any of them
              blocking a card that needs to go first? Counting
              turns the endgame from a hopeful shuffle into a
              deterministic sequence. Players who count cleanly
              almost never blunder the last twenty moves of a
              won game. Players who do not count can and do,
              surprisingly often.
            </p>
            <p>
              For a dedicated deep-dive on the endgame, see our{" "}
              <Link
                href="/freecell-endgame-strategy"
                className="text-[#D4AF37] hover:underline"
              >
                FreeCell endgame strategy guide
              </Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Deal Distribution */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Knowing the Set"
            id="deal-distribution"
            icon={"\u2666"}
          >
            The deal distribution
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The Microsoft deal set — numbered 1 through 32,000 —
              is the most studied population of FreeCell deals in
              the world. Mastering FreeCell as a competitive player
              means learning something about the shape of that set:
              how hard deals are distributed, which deals are known
              traps, and how to recognise a hard deal before you
              sink ten minutes into it.
            </p>
            <p>
              The set is not uniformly difficult. Microsoft never
              intended deal number to correlate with difficulty,
              but the random seeds used by Jim Horne&apos;s original
              port produce a natural difficulty curve anyway. Some
              low-numbered deals are unusually gentle. Some mid-range
              deals (around the four-thousand and eleven-thousand
              ranges) are famously hard. Tournament players build
              mental maps of which deals are favourable and which
              are traps.
            </p>
            <p>
              The only known unsolvable deal in the original 32,000
              is{" "}
              <Link
                href="/freecell-game-11982"
                className="text-[#D4AF37] hover:underline"
              >
                deal #11982
              </Link>
              . Every other deal has been proven solvable by
              community or computer analysis. A small handful were
              classified as unsolvable for years before advanced
              solvers found their solutions, which is a humbling
              lesson about the limits of human search. See our{" "}
              <Link
                href="/famous-freecell-deals"
                className="text-[#D4AF37] hover:underline"
              >
                famous FreeCell deals
              </Link>{" "}
              list for more deal-specific lore.
            </p>
            <p>
              How should you handle a hard deal? Slow down. The
              strongest single habit for hard deals is spending
              longer before your first move. A deal that takes
              fifteen minutes of planning and thirty seconds of
              play is a deal you almost certainly win. A deal that
              takes zero minutes of planning and fifteen minutes of
              improvisation is a deal you almost certainly lose.
              Restarts are also legal, although we argue in our{" "}
              <Link
                href="/freecell-solvability"
                className="text-[#D4AF37] hover:underline"
              >
                solvability guide
              </Link>{" "}
              that they are rarely necessary once you have spent
              the planning time.
            </p>
          </ContentBody>
        </CardSection>

        {/* Tournament & Speedrun */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Competitive Play"
            id="tournament"
            icon={"\u2663"}
          >
            Tournament and speedrun play
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              FreeCell has no central competitive body, but it has
              an active informal scene of tournaments, time-attack
              leaderboards, and longstanding community records. The
              mental model of top players is worth studying even if
              you never plan to compete, because competitive habits
              are the clearest version of mastery.
            </p>
            <p>
              Speedrun play is a specialisation. Speedrunners
              memorise common opening patterns on popular deals, use
              the interface with both hands, and learn which
              auto-move triggers fire on which cards. Their games
              are studies in efficient motor execution, not deep
              search. For unfamiliar deals, speedrunners tend to
              drop back into normal planning — they know that trying
              to speedrun an unknown deal produces losses.
            </p>
            <p>
              Tournament play is the opposite. Tournaments usually
              run on deal sets chosen to be hard or unfamiliar, with
              long time limits and strict no-restart rules. The
              winning style is methodical: long planning phase,
              careful cell economy, explicit counting, and
              disciplined endgame. Top tournament players will
              sometimes sit motionless for several minutes before
              their first move, which is unnerving to watch but
              almost always the correct discipline. See our{" "}
              <Link
                href="/freecell-world-records"
                className="text-[#D4AF37] hover:underline"
              >
                FreeCell world records
              </Link>{" "}
              page for the current known best times and streaks.
            </p>
            <p>
              One trait unites the strongest players we have
              watched: they do not panic. A mid-range position that
              looks dangerous to a beginner is a routine problem to
              a master, because the master has built up a library
              of similar positions and a set of habits for
              untangling them. When a master does encounter a
              position they cannot resolve, they stop, go back to
              the board, and reread it from scratch — the same
              deal-reading habit they used at move one. Mastery is
              not a different kind of play. It is the same kind of
              play done more carefully and more often.
            </p>
          </ContentBody>
        </CardSection>

        {/* Drills and practice */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Drills"
            id="practice"
            icon={"\u2666"}
          >
            Practice drills that build mastery
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Reading about FreeCell is a starting point. Practice
              is where the pillars become reflex. Here are the
              drills we recommend to Strategy Desk writers when
              they are working up a new deal set, and to readers
              who want to build mastery the way we build it.
            </p>

            <h3 className="text-lg font-semibold text-white">
              The ten-deal read
            </h3>
            <p>
              Open ten consecutive deals. For each one, spend a
              full minute looking at the board before touching a
              card. Name, out loud or in writing, the deepest Ace,
              the worst-placed King, and the cheapest column to
              empty. Then play the deal normally. After ten deals,
              review how often your first-minute read matched what
              actually happened. The gap between the read and the
              play is where your opening theory is weakest.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Count-first practice
            </h3>
            <p>
              For twenty deals, refuse to touch a card before
              saying, out loud, the current movable-run size and
              the current cell count. Say it again after every
              move. This feels painfully slow for the first few
              deals and then becomes automatic. Players who do
              this for a week almost always report that their
              midgame cell discipline noticeably improves.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Hard-deal immersion
            </h3>
            <p>
              Once a week, pick a known hard deal and play it
              without restarts, without hints, and without a
              time limit. The point of the drill is not winning.
              The point is spending forty minutes thinking
              carefully about a single board. You will finish
              some of these games and you will lose some. Both
              outcomes teach you something the easy deals
              cannot. Try a handful of entries from our{" "}
              <Link
                href="/hard-freecell-games"
                className="text-[#D4AF37] hover:underline"
              >
                hard FreeCell games
              </Link>{" "}
              list when you are ready to start.
            </p>

            <h3 className="text-lg font-semibold text-white">
              Post-loss review
            </h3>
            <p>
              When you lose, do not restart immediately. Stop,
              look at the board you ended up with, and identify
              the single move that you now think was wrong.
              Write it down or note it mentally. Over a week of
              honest post-loss review, patterns emerge — almost
              everyone&apos;s losses cluster around one or two
              specific mistakes, not a uniform distribution of
              small errors. Identify your cluster and your
              average win rate will climb.
            </p>
            <p>
              The most common clusters we see, in rough order
              of frequency, are: filling cells too early before
              reading the board, starting runs in columns that
              contain blockers, committing Aces to foundations
              at moments that would have been better spent
              keeping the parent column alive, and foundation
              ordering mistakes in the last ten moves of an
              endgame. Once you know which of those mistakes is
              your personal bottleneck, you can target the
              drills that fix it. Cell discipline responds to
              count-first practice. Column-selection errors
              respond to the ten-deal read. Endgame ordering
              errors respond to hard-deal immersion, because
              those drills force you to count in the endgame
              when you are tired. Build the habit of asking, at
              the end of every game, what you would change if
              you played the same deal again tomorrow. That
              single question, applied consistently across a
              few hundred games, produces better players more
              reliably than any tip sheet we could write.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading
            variant="dark"
            sub="Read Next"
            id="related"
            icon={"\u2660"}
          >
            Related guides on the network
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/freecell/how-to-play"
              title="How to Play FreeCell"
              description="The rules primer for anyone learning the game from scratch."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell/tips"
              title="FreeCell Tips"
              description="Shorter, tactical advice you can apply on the very next deal."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-opening-strategy"
              title="FreeCell Opening Strategy"
              description="A dedicated deep-dive on the first moves of a FreeCell game."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-endgame-strategy"
              title="FreeCell Endgame Strategy"
              description="How to close a game cleanly once the foundations start filling."
            />
            <ContentLinkCard
              variant="dark"
              href="/how-freecell-supermoves-work"
              title="How FreeCell Supermoves Work"
              description="The formula, the intuition, and the edge cases of multi-card moves."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell"
              title="Play FreeCell"
              description="Open the game and put what you just read into practice."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Play a deal with what you just learned."
          body={
            <>
              Mastery is built one deal at a time. Open a fresh game,
              spend the first minute reading the board, and notice
              how your opening changes.
            </>
          }
          primaryLabel="Play FreeCell"
          primaryHref="/freecell"
          secondaryLabel="Try a Hard Deal"
          secondaryHref="/hard-freecell-games"
        />
      </main>
    </ContentLayout>
  );
}
