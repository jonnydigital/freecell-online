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
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

const PAGE_PATH = "/solitaire-strategy";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Solitaire Strategy Fundamentals | ${siteConfig.siteName}`,
  description:
    "Cross-game strategic principles that apply to every solitaire variant: visibility, commitment, sequencing, optionality, reading the deal, openings, midgame, endgame, and common errors.",
  keywords: [
    "solitaire strategy",
    "solitaire fundamentals",
    "solitaire principles",
    "how to win at solitaire",
    "solitaire opening strategy",
    "solitaire endgame",
    "solitaire mistakes",
  ],
  openGraph: {
    title: "Solitaire Strategy Fundamentals",
    description:
      "The four universal principles, how to read a deal, openings, midgame management, endgame technique, and the mistakes that cost you wins.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor(PAGE_PATH),
  },
};

export default function SolitaireStrategyPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Solitaire Strategy Fundamentals",
      description:
        "A cross-game strategic reference covering the four universal principles, opening theory, midgame management, endgame technique, and common errors.",
      url: absoluteUrl(PAGE_PATH),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
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
          name: "Solitaire Strategy",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Solitaire Strategy Fundamentals"
        subtitle="The principles that apply across every solitaire variant: what to look for, when to commit, how to sequence moves, and how to spot a losing position before you throw away a winning one."
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
          <SectionHeading variant="dark" sub="Why strategy matters" id="intro" icon={"\u2660"}>
            Strategy is what separates the win rate you have from the one you could have
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Most solitaire strategy writing lives at one of two
              unsatisfying extremes. At one end are the vague maxims:
              "always play aces to the foundations," "think ahead," "do not
              uncover a card unless you have to." At the other end are
              hyper-specific tips about a single deal or a single opening
              position, which are useful exactly once. This page sits in
              the middle. We publish the principles that actually generalize
              &mdash; the ideas that keep earning their keep whether you are
              playing FreeCell, Spider, Klondike, or a nineteenth-century
              French patience nobody under seventy has heard of.
            </p>
            <p>
              The four universal principles below are the scaffolding the
              Strategy Desk uses for every game analysis we publish. They
              come from thousands of hours of play on our end, from the
              simulation data produced by our colleagues at the Research
              Desk, and from the classic solitaire literature. After the
              principles we cover reading the deal, opening decisions,
              midgame management, endgame technique, and the common
              strategic errors we see players make over and over.
            </p>
            <p>
              One framing note: we use the word "strategy" broadly. Some
              sections below are closer to tactics (concrete move choices
              in specific situations), and some are strategy in the
              traditional sense (overall game plan, resource allocation,
              risk management). Across solitaire the distinction matters
              less than in two-player games, because a solitaire player
              is simultaneously the general and the infantry. We simply
              call the whole package "strategy" for brevity.
            </p>
          </ContentBody>
        </CardSection>

        {/* Four Universal Principles */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Fundamentals" id="four-principles" icon={"\u2665"}>
            The four universal principles
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                1. Visibility &mdash; know what you can and cannot see
              </h3>
              <p className="leading-relaxed">
                Every solitaire game sits on a spectrum from fully
                open-information (FreeCell, Baker&rsquo;s Dozen, Beleaguered
                Castle) to heavily hidden (Klondike, Yukon, Spider). Your
                strategy has to account for which you are playing. In
                open-information games, you can plan deep, commit to long
                sequences, and trust your analysis. In hidden-information
                games, you have to preserve optionality because the next
                flipped card can invalidate a plan. The biggest strategic
                mistake we see is treating Klondike like FreeCell &mdash;
                building long sequences under the assumption that the
                hidden cards will cooperate. They often will not. The
                strategy that works in FreeCell (commit to a plan) is the
                strategy that loses Klondike (stay flexible). Visibility
                dictates the other three principles.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                2. Commitment &mdash; treat irreversible moves with more care
              </h3>
              <p className="leading-relaxed">
                Solitaire moves differ enormously in how reversible they
                are. Sliding a card between columns is often reversible.
                Sending a card to the foundation is usually not &mdash; once
                an Ace is on the foundation, you cannot pull it back. Using
                a free cell in FreeCell is reversible as long as you can
                free the cell later; parking a low card you cannot release
                effectively commits the cell for the rest of the game.
                Flipping a face-down card is a hard commitment in most
                cascade games because you cannot unflip it. The general
                rule: irreversible moves deserve strictly more thought than
                reversible ones. Before committing, ask what you give up,
                not just what you gain.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                3. Sequencing &mdash; the order you make moves matters
              </h3>
              <p className="leading-relaxed">
                Two strategies with the same endpoint can diverge wildly
                based on move order. A common example: you have three cards
                to move and two paths to move them. Doing A then B is often
                equivalent to doing B then A &mdash; except when doing A
                first blocks access to the card you needed for B. The
                Strategy Desk&rsquo;s internal rule of thumb is "resolve
                dependencies before liberations." Put cards where they need
                to go for future plans before opening up new paths that
                will be harder to use once the dependencies shift.
                Sequencing is also how supermoves pay off: the combination
                of free cells and empty columns gives you multiple
                equivalent orderings, and the best one is rarely the first
                one you spot.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                4. Optionality &mdash; keep more doors open than you need
              </h3>
              <p className="leading-relaxed">
                Optionality is the strategic equivalent of a savings
                account. When the game is ahead of you &mdash; easy moves,
                visible path to foundations, plenty of empty cells or
                columns &mdash; spend your moves in ways that preserve
                options. Do not rush foundations in FreeCell if the card
                might still be useful as a tableau link. Do not fill an
                empty column in Klondike with a short sequence when a King
                is two moves away. Do not cycle the stock in Spider until
                you have exhausted the tableau moves that might reveal a
                better deal. Players who win consistently keep their
                options open through the midgame, then cash them in
                decisively at the endgame. The instinct to "make progress"
                is often the instinct that costs you the win.
              </p>
            </div>

            <p className="pt-4 border-t border-white/[0.08]">
              The four principles are not equally important in every game.
              In FreeCell, commitment dominates because the information is
              open and you can plan far ahead. In Klondike, optionality
              dominates because hidden cards can invalidate a plan at any
              moment. In Spider, sequencing dominates because the order
              you build suits in drives almost every late-game decision.
              Knowing which principle leads in the game you are playing is
              itself a strategic skill.
            </p>
          </ContentBody>
        </CardSection>

        {/* Reading Starting Positions */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The deal" id="reading-deal" icon={"\u2666"}>
            Reading starting positions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Before you move a card, scan the deal. Strong players spend
              the first twenty or thirty seconds of every game doing
              nothing but reading the position. Below are the things we
              look at, in order.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Ace and low-card placement.</strong>{" "}
                Are the Aces buried or near the surface? Are the 2s near
                their matching Aces? A deal with buried Aces is slower; a
                deal with buried 2s under their Aces is often unwinnable
                in cascade games without a lot of rework. In Klondike the
                early-foundation odds drive the whole pace.
              </li>
              <li>
                <strong className="text-white">Blockers and critical dependencies.</strong>{" "}
                Look for cards sitting on top of cards they will eventually
                need. A Queen buried under a 5 in the same column is a
                future problem. A King buried deep in a non-empty column
                in Klondike is the single most common reason Klondike
                deals become unwinnable.
              </li>
              <li>
                <strong className="text-white">Cascade length and parity.</strong>{" "}
                Count the columns. Note which are long and which are short.
                In FreeCell a deal with one very long column and one very
                short column is easier than a deal with four medium columns,
                because the short column gives you early room to maneuver.
              </li>
              <li>
                <strong className="text-white">Color or suit distribution.</strong>{" "}
                In alternating-color games, check whether the colors are
                distributed evenly across columns. An unbalanced deal
                (lots of reds in one column, lots of blacks in another)
                constrains your sequencing options.
              </li>
              <li>
                <strong className="text-white">Empty-column potential.</strong>{" "}
                Which column is closest to empty? In Eight Off and Seahaven,
                count Kings &mdash; if all four Kings are deeply buried,
                you will have a very hard time using empty columns at all.
              </li>
            </ul>
            <p>
              Reading the deal is the single skill that transfers most
              directly across variants. A player who learns to read FreeCell
              positions well will read Klondike, Yukon, and Baker&rsquo;s
              Game positions well too, because the questions are the same
              even when the answers differ.
            </p>
            <p>
              A practical habit we teach new players on the Strategy Desk:
              before you move a single card, write down (mentally or
              literally) the two biggest problems you see in the deal. Are
              both black Aces buried? Is one column carrying a 2-3-4 chain
              that depends on a 5 you cannot reach? Naming the problems
              forces you to plan around them instead of stumbling into
              them. After a few weeks the habit internalizes and you stop
              needing to articulate the problems consciously; your eye
              goes to them automatically.
            </p>
            <p>
              Reading also gets faster with practice. Our target for
              experienced players is ten to fifteen seconds to read a
              FreeCell deal, thirty to forty-five seconds for a Spider
              deal, and twenty seconds for a Klondike opening (which is
              fundamentally about the stock, not the tableau). If you are
              taking much longer than those targets, the problem is
              usually that you are trying to plan a specific line before
              you have diagnosed the position. Diagnose first, plan second.
            </p>
          </ContentBody>
        </CardSection>

        {/* Opening Principles */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Openings" id="openings" icon={"\u2663"}>
            Opening principles
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The opening of a solitaire game is the stretch before any
              card hits the foundations. Every game has its own opening
              theory, but a handful of principles apply across the board.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Play the obvious moves first.</strong>{" "}
                Aces, low cards that can reach foundations safely, and
                cards that free trapped sequences. These moves cost you
                nothing and simplify the board.
              </li>
              <li>
                <strong className="text-white">Establish an empty column
                early in cascade games.</strong>{" "}
                An empty column is roughly equivalent to an extra free cell
                in FreeCell and more than that in Klondike. If you can
                clear a short column in the first few moves, do it; the
                rest of the game will be easier.
              </li>
              <li>
                <strong className="text-white">Do not split matched pairs.</strong>{" "}
                If a low card is already sitting on the matching suit one
                rank higher, do not move it in the opening. You are
                breaking a finished structure for nothing.
              </li>
              <li>
                <strong className="text-white">Prefer moves that reveal information.</strong>{" "}
                In hidden-information games, a move that flips a new card
                is worth more than an equally useful move that reveals
                nothing. Early flips compound because they give you more
                data for all subsequent decisions.
              </li>
              <li>
                <strong className="text-white">Hold back cards that might
                be needed as tableau links.</strong>{" "}
                In FreeCell do not rush a 2 to the foundation if it is
                sitting below a useful 3. The 2 becomes a tableau resource
                once the 3 can land on it.
              </li>
            </ul>
            <p>
              See the per-game opening guides for the specific move order
              that works in each variant: our{" "}
              <Link href="/freecell-opening-strategy" className="text-[#D4AF37] hover:underline">FreeCell opening strategy</Link>{" "}
              page is the most detailed, and the{" "}
              <Link href="/freecell/strategy" className="text-[#D4AF37] hover:underline">FreeCell strategy</Link>{" "}
              page covers broader FreeCell opening theory.
            </p>
            <p>
              A note about opening moves and win-rate research: across the
              deals we and other researchers have studied, opening-move
              choice materially changes the outcome in only a minority of
              FreeCell deals. Most deals are either robustly winnable or
              robustly unwinnable regardless of the first move. The deals
              in the middle &mdash; where the opening decides the game
              &mdash; are where opening theory matters, and they are
              exactly the deals where a strong player separates from a
              weak one. You will not notice opening-move quality during
              easy runs; you will notice it on the hard deals.
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
              The midgame is the stretch between the first foundation
              plays and the moment you can see a clear path to victory.
              This is where most solitaire games are won or lost, and it
              is the hardest phase to describe because the right move
              depends on the particulars of the deal. A few principles
              hold regardless.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Do not send cards to the
                foundations you still need.</strong>{" "}
                The classic FreeCell mistake: rushing a 4 to the foundation
                when a 5 in the tableau wants to land on it. A good rule
                of thumb: hold a card in the tableau if both of the
                adjacent opposite-color cards one rank down are still
                buried.
              </li>
              <li>
                <strong className="text-white">Treat cells and empty
                columns as currency.</strong>{" "}
                Every cell occupied is a move you cannot make later.
                Before parking a card in a cell, ask how long it will
                stay there. If the answer is "until the endgame," you are
                probably making a mistake.
              </li>
              <li>
                <strong className="text-white">Protect your empty
                columns.</strong>{" "}
                In Eight Off and Seahaven, only Kings can fill an empty
                column. Do not empty a column speculatively if your Kings
                are all deeply buried &mdash; you will lose the empty
                column and gain nothing.
              </li>
              <li>
                <strong className="text-white">Look for forced lines.</strong>{" "}
                Sometimes the game has exactly one playable sequence and
                your only job is to find it. A forced line in the midgame
                is usually the clearest signal that the deal is winnable.
              </li>
              <li>
                <strong className="text-white">Know when to undo.</strong>{" "}
                If you notice that your last three moves made the position
                strictly worse and you have undo available, use it.
                Stubbornness is expensive in solitaire.
              </li>
              <li>
                <strong className="text-white">Watch for branch points.</strong>{" "}
                Certain midgame moments are true forks: two reasonable
                plans, and you have to pick one. When you see a fork,
                stop and look three moves deeper down each branch before
                committing. Branch points are where the Strategy Desk
                does its most careful thinking; they are also where
                games are won.
              </li>
              <li>
                <strong className="text-white">Use the foundations as
                storage, not as a goal.</strong>{" "}
                The foundations exist to win the game, but during the
                midgame they also function as a storage system for cards
                that are done being useful. Think of each foundation
                play as parking rather than progress; you are freeing
                up tableau real estate.
              </li>
            </ul>
            <p>
              Midgame tempo is a concept worth naming. Tempo in solitaire
              is the number of productive moves you can make per flipped
              card or per stock deal. High-tempo midgames finish fast
              with lots of cards landing on foundations; low-tempo
              midgames drag, with many cells occupied and nothing
              progressing. When you notice the tempo dropping, it is
              usually a sign that the position has degraded and you
              should re-read it rather than pushing forward.
            </p>
            <p>
              Resource accounting is the other midgame skill worth
              explicit practice. Pick a consistent accounting rule &mdash;
              for example, "a filled cell costs one unit, an occupied
              column with a short chain costs two units, and a blocked
              column costs three" &mdash; and track your units through
              the midgame. You do not have to use our numbers; invent
              your own. The act of scoring your resources out loud
              forces you to slow down on moves that look helpful but
              actually cost more than they earn.
            </p>
          </ContentBody>
        </CardSection>

        {/* Endgame Technique */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Endgame" id="endgame" icon={"\u2665"}>
            Endgame technique
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The endgame is the phase where every remaining card has a
              clear destination and the only question is the order. A
              surprising number of wins are thrown away in the endgame
              because players stop paying attention and auto-play their
              way into a blocked position.
            </p>
            <ul className="space-y-3 list-disc pl-6">
              <li>
                <strong className="text-white">Count the remaining moves.</strong>{" "}
                Once you can see the finish, count the number of moves to
                get there and make sure you have enough cell and empty-column
                capacity. If the count does not balance, stop and rework.
              </li>
              <li>
                <strong className="text-white">Trigger auto-complete
                consciously.</strong>{" "}
                In most digital solitaires the engine will auto-play the
                remaining cards once the position is fully resolvable.
                Understand when that trigger fires; it can save you the
                last ninety seconds of a long game. But do not rely on
                auto-complete to save you from a position that is not
                actually resolvable.
              </li>
              <li>
                <strong className="text-white">Recognize a lost
                position.</strong>{" "}
                The sooner you can see that a deal is unwinnable, the
                sooner you can start the next one. Signs of a lost position:
                all cells occupied with no landing spot; every column
                holding a sequence that depends on a card buried elsewhere;
                cyclic blockers (A depends on B, B depends on C, C depends
                on A).
              </li>
              <li>
                <strong className="text-white">Play the longest sequence
                last.</strong>{" "}
                When you have multiple columns to finish, the shortest
                ones first tend to liberate cells you will need for the
                longer ones. Sequencing at the endgame is the reverse of
                sequencing at the midgame: spend options, do not save them.
              </li>
              <li>
                <strong className="text-white">Clear cells before clearing
                columns.</strong>{" "}
                In FreeCell-family games, free cells at the very end are
                more valuable than empty columns because they let you do
                final-move reshuffles without rebuilding a tableau
                sequence. When you are deep in the endgame, prefer moves
                that empty cells over moves that empty columns.
              </li>
              <li>
                <strong className="text-white">Beware of the
                auto-complete cliff.</strong>{" "}
                Some positions look finished but fail a single
                auto-complete check because one card sits behind a
                blocker. Verify that every card has a clear path before
                you commit the remaining moves. Nothing is worse than a
                game that dies three moves from the end.
              </li>
            </ul>
            <p>
              The most common endgame regret we hear from players is
              "I was so close." Close is not a win. The habit to build
              is to slow down as the game approaches its end, not to
              speed up. Early-game moves are often repeatable; late-game
              moves are usually one-shot. Treat the final eight-to-ten
              moves of every game as the moves that deserve the most
              attention, not the least. If you play a little slower at
              the end, your win rate goes up immediately.
            </p>
          </ContentBody>
        </CardSection>

        {/* Common Strategic Errors */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pitfalls" id="errors" icon={"\u2666"}>
            Common strategic errors
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Strategy Desk watches players make the same handful of
              mistakes over and over. Here are the ones we see most often,
              with the corrective habit alongside.
            </p>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                <strong className="text-white">Rushing aces and twos to
                the foundation in FreeCell.</strong>{" "}
                Low cards are valuable tableau tools. Send them only when
                you no longer need them as landing spots. We cover this in
                detail in our{" "}
                <Link href="/freecell-mistakes-to-avoid" className="text-[#D4AF37] hover:underline">mistakes to avoid</Link>{" "}
                page.
              </li>
              <li>
                <strong className="text-white">Building long tableau
                sequences in Klondike too early.</strong>{" "}
                Long sequences eat column space. Build them only when you
                can see the hidden cards underneath or have a clear
                foundation destination. In hidden-information games,
                optionality usually beats tableau length.
              </li>
              <li>
                <strong className="text-white">Filling empty columns
                without a plan.</strong>{" "}
                An empty column is a resource. Placing a card into it for
                no specific reason throws the resource away. Always ask
                what you gain from filling the column now versus keeping
                it empty.
              </li>
              <li>
                <strong className="text-white">Cycling the Spider stock
                too early.</strong>{" "}
                Every stock deal in Spider adds ten new cards on top of
                your carefully-built sequences. Deal only when you have
                exhausted the tableau moves; the tableau tells you more
                than the stock will.
              </li>
              <li>
                <strong className="text-white">Ignoring same-suit
                discipline in Baker&rsquo;s Game and Eight Off.</strong>{" "}
                Players coming from FreeCell often try to move alternating-color
                sequences that are not legal in same-suit variants. Retrain
                the instinct before starting; it will save dozens of
                wasted moves.
              </li>
              <li>
                <strong className="text-white">Over-reliance on undo.</strong>{" "}
                Undo is a useful tool for recovery, but if you are
                constantly undoing, you are probably not reading the
                position carefully enough before moving. Slow down; undo
                less.
              </li>
              <li>
                <strong className="text-white">Treating hints as
                strategy.</strong>{" "}
                Hint systems find a legal move, not the best move. They
                are useful for finding a move you missed; they are not a
                substitute for thinking. See our{" "}
                <Link href="/freecell-hints-explained" className="text-[#D4AF37] hover:underline">hints explained</Link>{" "}
                page for a breakdown of what hint systems actually do.
              </li>
              <li>
                <strong className="text-white">Giving up on winnable
                deals too early.</strong>{" "}
                The inverse of the previous error. Because FreeCell is
                almost always winnable, restart-spam is a sign you are
                missing a line rather than that the deal is bad. Slow down
                and read the position again before restarting.
              </li>
              <li>
                <strong className="text-white">Treating every game like
                FreeCell.</strong>{" "}
                Klondike, Yukon, Spider, and Canfield all have hidden
                cards. Plans that assume full information will fail in
                any game where the next flip can change everything. If
                you play multiple variants, retrain your instincts when
                you switch.
              </li>
              <li>
                <strong className="text-white">Counting only winnable
                moves, not all moves.</strong>{" "}
                When you evaluate a position, count every legal move, not
                just the obviously helpful ones. You will often find a
                useful move hiding among the legal ones, especially when
                an unusual sequence opens up a new path.
              </li>
              <li>
                <strong className="text-white">Playing tired.</strong>{" "}
                Solitaire is a game of sustained attention. Quality of
                play drops sharply after about forty-five minutes of
                continuous play. If your win rate is falling over the
                course of an evening, take a break. You will come back
                sharper.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Related Strategy Pages */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Per-game strategy" id="per-game" icon={"\u2663"}>
            Per-game strategy pages
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/freecell/strategy"
              title="FreeCell Strategy"
              description="The full strategy reference for FreeCell, including supermoves, opening principles, and endgame counting."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/strategy"
              title="Klondike Strategy"
              description="Draw-1 and draw-3 strategy, stock cycling, and how to handle hidden-card risk."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy"
              description="Empty-column valuation, suit-order decisions, and when to deal from the stock."
            />
            <ContentLinkCard
              variant="dark"
              href="/bakers-game/strategy"
              title="Baker's Game Strategy"
              description="Same-suit FreeCell play, with emphasis on the tight sequencing it requires."
            />
            <ContentLinkCard
              variant="dark"
              href="/eight-off/strategy"
              title="Eight Off Strategy"
              description="How to use eight free cells without giving up the King-only empty-column constraint."
            />
            <ContentLinkCard
              variant="dark"
              href="/yukon/strategy"
              title="Yukon Strategy"
              description="Klondike without a stock: how to weaponize free-group movement."
            />
          </ContentBody>
        </CardSection>

        <AuthorBio authorSlug="the-strategy-desk" />

        <CtaSection
          heading="Put the principles into practice"
          body={
            <>
              Open a FreeCell deal and read the position for thirty
              seconds before your first move. Then play one full game
              under the four principles above.
            </>
          }
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="See the difficulty ranking"
          secondaryHref="/solitaire-difficulty-ranking"
        />
      </main>
    </ContentLayout>
  );
}
