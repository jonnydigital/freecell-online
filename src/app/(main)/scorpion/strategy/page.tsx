import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Scorpion Solitaire Strategy Guide | Advanced Winning Techniques",
  description:
    "Master Scorpion Solitaire — suit sequence building, face-down card uncovering, King column management, stock timing, and empty column optimization.",
  keywords: [
    "scorpion solitaire strategy",
    "scorpion solitaire winning strategy",
    "scorpion solitaire advanced techniques",
    "how to win scorpion solitaire",
    "scorpion solitaire strategy guide",
    "scorpion suit sequence building",
    "scorpion king column strategy",
    "scorpion solitaire reserve timing",
    "scorpion solitaire empty columns",
    "scorpion solitaire expert guide",
    "scorpion vs spider strategy",
  ],
  alternates: {
    canonical: absoluteUrl("/scorpion/strategy"),
  },
  openGraph: {
    title: "Scorpion Solitaire Strategy Guide | Advanced Winning Techniques",
    description:
      "Advanced strategies for Scorpion Solitaire: suit sequence building, face-down card uncovering, King column management, reserve timing, and empty column optimization.",
    url: absoluteUrl("/scorpion/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most effective strategy for Scorpion Solitaire?",
    answer:
      "The most effective strategy is a two-phase approach: first, systematically uncover all 21 face-down cards while building in-suit sequences wherever possible; second, once the board is fully visible, execute a planned sequence of King moves and column reorganizations to complete all four K-to-A runs. The reserve deal should be saved until phase one stalls, acting as a bridge between the two phases.",
  },
  {
    question: "How does Scorpion strategy differ from Spider Solitaire strategy?",
    answer:
      "Scorpion is far more restrictive than Spider. Spider gives you a 50-card stock pile with five rounds of deals and allows any card in empty columns. Scorpion gives you only 3 reserve cards and restricts empty columns to Kings only. This means every move in Scorpion carries more weight — you cannot rely on the stock to bail you out. Spider strategy tolerates more off-suit building as a temporary measure; Scorpion punishes it severely because you lack the resources to untangle mixed stacks.",
  },
  {
    question: "When should I deal the reserve cards in Scorpion Solitaire?",
    answer:
      "Deal the reserve only after exhausting all productive tableau moves — typically 30-50 moves into the game. Before dealing, maximize your in-suit connections and uncover as many face-down cards as possible. The ideal time to deal is when you have no moves that reveal face-down cards or extend in-suit sequences, but the board still has potential (not completely deadlocked). Dealing too early wastes your only lifeline; dealing too late means you may have passed the point of no return.",
  },
  {
    question: "How important are empty columns in Scorpion Solitaire?",
    answer:
      "Empty columns are extremely important but only useful if you have a King to fill them. Since only Kings can occupy empty spaces, each empty column is effectively a King-relocation slot. The strategic value comes from moving Kings that are sitting on top of face-down cards or blocking in-suit sequences. A well-timed King move into an empty column can uncover 2-3 hidden cards and unlock an entire suit's sequence simultaneously.",
  },
  {
    question: "What win rate should I expect with optimal Scorpion strategy?",
    answer:
      "Expert Scorpion players achieve roughly a 50% win rate. This is lower than Spider 1-suit (80%+) but higher than many challenging variants like Forty Thieves (10-15%). About half of all Scorpion deals are mathematically unsolvable regardless of play quality. The skill is in identifying winnable deals, playing those optimally, and restarting unwinnable ones quickly rather than grinding through lost causes.",
  },
];

export default function ScorpionStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Scorpion Solitaire", item: absoluteUrl("/scorpion") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/scorpion/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Scorpion Solitaire Strategy Guide",
        description: "Advanced strategies for Scorpion Solitaire covering suit sequence building, face-down card management, King column strategy, and reserve timing.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Scorpion Solitaire Strategy Guide"
        kicker={<><Link href="/scorpion" className="hover:text-white transition-colors">Scorpion Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for one of solitaire's most punishing variants — from suit sequence architecture to reserve timing and King column management."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Scorpion Solitaire", href: "/scorpion" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Scorpion Solitaire strategy comes down to three pillars: <strong className="text-white">build in-suit sequences from King to Ace relentlessly</strong>,{" "}
          <strong className="text-white">uncover all 21 face-down cards before the board locks up</strong>, and{" "}
          <strong className="text-white">save the 3-card reserve for the critical inflection point</strong>.
          Every move should extend a same-suit run, reveal hidden information, or set up a King
          relocation. Moves that accomplish none of these are actively harmful.
        </p>
      </div>

      {/* Section 1: Suit Sequence Architecture */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Suit Sequence Architecture: Building From King to Ace
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/scorpion" className="text-[var(--gold)] hover:text-white transition-colors">
            Scorpion Solitaire
          </Link>{" "}
          requires you to build four complete King-to-Ace same-suit sequences within the tableau.
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          {" "}where you build foundations incrementally, Scorpion demands that an entire 13-card
          same-suit run be assembled in a single column before it is removed. This means every
          off-suit card sitting between two same-suit cards is a problem that must be solved.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The strategic implication is profound: you are not just building sequences — you are
          <em> engineering</em> them. Each suit has 13 cards scattered across seven columns, and
          your job is to maneuver them into one column in perfect descending order. This requires
          understanding where every card of each suit currently sits, what obstacles separate
          them, and what sequence of moves will bring them together with minimum disruption.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Map each suit at the start.</strong> Before making any
            moves, mentally trace all visible cards of each suit. Which suits have cards naturally
            close together? Which have cards scattered across many columns?
          </li>
          <li>
            <strong className="text-white/90">Prioritize the most concentrated suit.</strong> If Spades
            has 6 visible cards already in partial sequences across 2-3 columns, that suit is closest
            to completion. Focus resources there first.
          </li>
          <li>
            <strong className="text-white/90">Every in-suit connection is permanent progress.</strong> Once
            two same-suit cards are properly connected, that connection should never be broken. Protect
            completed segments of sequences at all costs.
          </li>
          <li>
            <strong className="text-white/90">Off-suit cards between same-suit cards</strong> are the
            primary obstacle. Each one must be relocated — either to another column where it fits in-suit,
            or moved aside to reveal cards beneath it.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Think of each suit as a jigsaw puzzle. You have 13 pieces
            (some hidden) that need to assemble into one chain. Every move that connects two pieces
            of the same puzzle is progress. Every move that tangles pieces from different puzzles
            is regression. This mental model keeps your focus on what matters.
          </p>
        </div>
      </section>

      {/* Section 2: Face-Down Card Excavation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Face-Down Card Excavation: The 21-Card Problem
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Scorpion deals 21 cards face-down — three at the bottom of each of the first four
          columns. These 21 hidden cards represent 40% of the deck, and they are distributed in
          the worst possible way: concentrated in the columns where you also need to build
          sequences. You cannot complete any suit until you know where all 13 of its cards are,
          which means uncovering every hidden card is a prerequisite for winning.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The excavation challenge is compounded by Scorpion&apos;s movement rule. When you move a
          face-up card, every card below it in the column comes along. This means uncovering a
          face-down card often requires moving a large group of cards to another column — and that
          group may include cards that are part of a useful same-suit sequence. The tension between
          preserving existing sequences and revealing new information is the central strategic
          dilemma of every Scorpion game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Advanced players resolve this tension by prioritizing excavation over sequence preservation
          in the early game. A partially-built same-suit sequence can be reconstructed after the
          hidden cards are revealed, but you cannot plan effectively while 21 cards remain unknown.
          Break sequences to reveal cards, then rebuild those sequences with complete information.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Columns 1-4 are your excavation targets.</strong> These
            are the only columns with face-down cards. Columns 5-7 start fully face-up and serve as
            receiving stations for displaced cards.
          </li>
          <li>
            <strong className="text-white/90">Move cards from columns 1-4 to columns 5-7.</strong> In
            the early game, the natural flow is to shift face-up cards from the hidden-card columns
            onto the fully visible columns, progressively revealing hidden cards.
          </li>
          <li>
            <strong className="text-white/90">Track your excavation progress.</strong> Count remaining
            face-down cards after every few moves. Below 10 hidden cards, you are entering the
            mid-game. Below 5, you should be able to see the full solution path (or confirm the
            deal is unwinnable).
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Sometimes an in-suit move is available on columns
            5-7 that does not reveal any face-down cards. Should you take it? Usually no — unless
            the in-suit connection is critical (connecting a King to a Queen of the same suit) or
            the move creates a landing spot that enables a revealing move on the next turn.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: King Column Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King Column Strategy: The Backbone of Every Solution
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Scorpion, completed sequences run King to Ace in the same suit within a single column.
          This means each solution requires four columns dedicated to finished suits, leaving only
          three columns for maneuvering. Kings are the anchors of those four columns — every
          completed sequence starts with a King at the top. Managing where your Kings end up is
          therefore the most consequential strategic decision in the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The Kings-only empty column rule amplifies this importance. When you create an empty column,
          only a King (and its trailing cards) can fill it. This means empty columns serve exactly
          one purpose: relocating Kings. A misplaced King — one that sits in a column where it
          blocks another suit&apos;s sequence — is a critical problem. Moving it to the right column
          may require clearing a different column first, which requires moving <em>that</em> column&apos;s
          King somewhere else. King management cascades through the entire board.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Identify all four Kings immediately.</strong> Which are
            visible? Which are likely under face-down cards? Kings in columns 5-7 (no hidden cards)
            are easier to work with than Kings buried in columns 1-4.
          </li>
          <li>
            <strong className="text-white/90">A King in the wrong column</strong> is the most common
            cause of unwinnable board states. If the King of Hearts is sitting in the column where
            you need to build the Spades sequence, one of them has to move — and Kings can only move
            to empty columns.
          </li>
          <li>
            <strong className="text-white/90">Plan King relocations early.</strong> Do not wait until
            the board is congested to realize a King needs to move. As soon as you identify a King
            conflict, start working toward creating an empty column for the relocation.
          </li>
          <li>
            <strong className="text-white/90">Kings with same-suit cards below them</strong> are ideal.
            A King of Diamonds with a Queen and Jack of Diamonds already beneath it is three-thirteenths
            of a completed sequence — a significant head start.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> The endgame often comes down to a King-shuffling puzzle.
            You need King A in column 3 and King B in column 5, but both columns are occupied.
            Solving this requires creating an empty column as temporary King storage — the
            solitaire equivalent of the &ldquo;fifteen puzzle&rdquo; sliding game. Plan these
            shuffles before you start executing.
          </p>
        </div>
      </section>

      {/* Section 4: Reserve Timing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reserve Timing: Your 3-Card Lifeline
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Scorpion&apos;s reserve consists of just three cards, dealt one each to the first three
          columns. Compare this to{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>
          &apos;s 50-card stock with five rounds of 10-card deals. The reserve is not a resource to
          be used casually — it is a one-time strategic injection that should arrive at the precise
          moment when the tableau has stalled but the board still has structural potential.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The optimal timing for the reserve deal sits at the intersection of two conditions: you
          have no more moves that reveal face-down cards or extend in-suit sequences, and the
          board has not yet reached a deadlocked state. Dealing too early means you still had
          productive moves available and wasted your lifeline. Dealing too late means the board
          has degraded past the point where three cards can rescue it.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before dealing, prepare your columns. The three reserve cards land on columns 1, 2, and 3
          specifically. If those columns have well-organized sequences on top, a random card landing
          there may break them. If possible, arrange columns 1-3 so the top cards are high-rank or
          off-suit relative to the sequences you care about, minimizing the damage from random card
          placement.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Exhaust all moves first.</strong> Scan every column
            pair for valid in-suit placements and revealing moves. Triple-check before dealing.
          </li>
          <li>
            <strong className="text-white/90">Organize columns 1-3 pre-deal.</strong> The reserve
            cards land on top of whatever is there. Position these columns to absorb random cards
            with minimal sequence disruption.
          </li>
          <li>
            <strong className="text-white/90">Expect new opportunities after the deal.</strong> The
            three new cards often create 2-3 fresh moves that cascade into longer sequences. Look
            for these chains immediately after dealing.
          </li>
          <li>
            <strong className="text-white/90">If the reserve does not help, consider restarting.</strong> If
            the three new cards create no productive moves, the deal is likely unwinnable. Do not
            spend 20 more moves grinding — start fresh.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dealing the reserve within the first 15-20 moves. At
            that point, you have barely explored the tableau and almost certainly have productive
            moves hiding in plain sight. Experienced Scorpion players typically make 30-50 moves
            before touching the reserve — and some winnable deals never require it at all.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Empty Column Optimization */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Optimization: Creating and Using King Slots
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns in Scorpion are the game&apos;s most powerful tool and its most constrained
          resource. Unlike{" "}
          <Link href="/spider" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>
          {" "}where any card can fill an empty column (effectively making them free temporary
          storage), Scorpion restricts empty columns to Kings only. This single rule transforms
          empty columns from flexible workspace into targeted King-relocation slots.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The optimization challenge is that creating an empty column requires moving every card
          from a column elsewhere, but the benefit only materializes if you have a specific King
          ready to fill it. This creates a chicken-and-egg problem: you need an empty column to
          move a King, but creating the empty column requires moving cards that may need the King
          to be moved first. Solving this requires planning the entire sequence — from column clearing
          through King placement to subsequent builds — before executing the first move.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Scenario</span>
            <span>Value of Empty Column</span>
            <span>Action</span>
          </div>
          {[
            ["King blocking face-down cards", "Very High", "Clear a column and relocate the King immediately"],
            ["King in wrong suit-building column", "High", "Create empty column for King swap"],
            ["King already well-placed", "Low", "No need for an empty column — focus elsewhere"],
            ["No Kings available to move", "None", "Do not waste effort clearing columns"],
          ].map(([scenario, value, action], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{scenario}</span>
              <span className={
                value === "Very High" ? "text-emerald-400" :
                value === "High" ? "text-amber-400" :
                value === "Low" ? "text-orange-400" :
                "text-red-400"
              }>{value}</span>
              <span>{action}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> In the mid-game, when most face-down cards are revealed, your
            focus shifts from excavation to reorganization. At this point, empty columns become your
            primary tool for shuffling Kings between columns to assemble final sequences. Having a
            clear mental map of which Kings need to go where — and in what order — is the difference
            between winning and stalling out.
          </p>
        </div>
      </section>

      {/* Section 6: Scorpion vs Spider */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Scorpion vs Spider: Why Spider Tactics Fail in Scorpion
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Players transitioning from{" "}
          <Link href="/spider/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          often approach Scorpion with Spider-derived tactics that quickly lead to defeat. While
          both games require building same-suit King-to-Ace sequences, the resource constraints
          are fundamentally different. Understanding these differences is essential for adapting
          your strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Spider&apos;s generous 50-card stock (five rounds of 10 cards each) means you can
          tolerate significant board disorder. Off-suit builds are a legitimate tactic because
          the next stock deal will add new cards that may help untangle the mess. In Scorpion,
          you get exactly 3 reserve cards — period. Off-suit builds that you cannot undo quickly
          become permanent liabilities. The margin for error in Scorpion is dramatically smaller.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>Spider</span>
            <span>Scorpion</span>
          </div>
          {[
            ["Fresh card supply", "50 cards (5 deals of 10)", "3 cards (single deal)"],
            ["Empty columns", "Any card can fill", "Kings only"],
            ["Off-suit tolerance", "High — stock resets provide correction", "Very low — limited resources to untangle"],
            ["Column count", "10 columns", "7 columns"],
            ["Face-down cards", "54 hidden across 4 rows", "21 hidden in columns 1-4"],
            ["Win rate (skilled)", "80%+ (1-suit), 35% (4-suit)", "~50%"],
          ].map(([element, spider, scorpion], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{spider}</span>
              <span>{scorpion}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The biggest mindset shift: in Spider, the stock pile is a safety net that lets you take
          risks. In Scorpion, there is almost no safety net. Every off-suit move, every misplaced
          King, every premature reserve deal is a mistake that may be impossible to recover from.
          Scorpion demands discipline and precision that Spider forgives. Treat every move as if
          it might be the difference between winning and losing — because in Scorpion, it often is.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Build in-suit relentlessly.</strong> Every same-suit connection is permanent
              progress. Off-suit connections are debt you will pay later.
            </li>
            <li>
              <strong>Excavate face-down cards first.</strong> You cannot plan with 40% of the deck
              hidden. Revelation trumps sequence building in the early game.
            </li>
            <li>
              <strong>Map all four Kings.</strong> Know where every King is — visible or hidden — and
              plan which column each one will eventually anchor.
            </li>
            <li>
              <strong>Save the reserve for the stall point.</strong> Deal only when all productive
              tableau moves are exhausted, not before.
            </li>
            <li>
              <strong>Create empty columns with purpose.</strong> Only clear a column when you have
              a specific King ready to fill it and a clear reason for the relocation.
            </li>
            <li>
              <strong>Reject Spider-style off-suit building.</strong> Scorpion lacks the resources
              to untangle mixed stacks. Stay in-suit or pay the price.
            </li>
            <li>
              <strong>Restart without guilt.</strong> Half of all deals are unwinnable. Time spent
              on lost causes is time not spent winning solvable games.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/scorpion/how-to-play" title="How to Play Scorpion" description="Complete rules, setup, and valid moves for Scorpion Solitaire." />
            <ContentLinkCard href="/scorpion/tips" title="Scorpion Tips & Tricks" description="Quick, practical tips for improving your Scorpion game." />
            <ContentLinkCard href="/spider/strategy" title="Spider Strategy Guide" description="Strategy guide for Scorpion's famous cousin." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Scorpion knowledge to the test. Play free online Scorpion Solitaire with unlimited undo and instant new deals."
          primaryLabel="Play Scorpion Solitaire"
          primaryHref="/scorpion"
          secondaryLabel="Learn the Rules"
          secondaryHref="/scorpion/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Scorpion Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/scorpion" title="Play Scorpion Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/scorpion/how-to-play" title="How to Play Scorpion" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/scorpion/tips" title="Scorpion Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/spider/strategy" title="Spider Strategy Guide" description="Strategy for Scorpion's famous cousin" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
