import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Seahaven Towers Strategy Guide | Advanced Winning Techniques",
  description:
    "Master Seahaven Towers with advanced strategies for free cell management, same-suit sequence building, Kings-only empty column optimization, supermove calculation, and tower rotation techniques. Win more games with proven methods.",
  keywords: [
    "seahaven towers strategy",
    "seahaven towers winning strategy",
    "seahaven towers advanced techniques",
    "how to win seahaven towers",
    "seahaven towers strategy guide",
    "seahaven towers free cell management",
    "seahaven towers same suit building",
    "seahaven towers king column strategy",
    "seahaven towers supermove",
    "seahaven towers tower management",
    "seahaven vs freecell strategy",
  ],
  alternates: {
    canonical: absoluteUrl("/seahaven/strategy"),
  },
  openGraph: {
    title: "Seahaven Towers Strategy Guide | Advanced Winning Techniques",
    description:
      "Advanced strategies for Seahaven Towers: free cell management, same-suit building, Kings-only columns, move capacity calculation, and tower rotation techniques.",
    url: absoluteUrl("/seahaven/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most effective strategy for Seahaven Towers?",
    answer:
      "The most effective strategy centers on free cell management and move capacity calculation. Always maintain at least one open free cell, plan every card placement 4-6 moves ahead, and calculate your move capacity (free cells + empty columns) before attempting multi-card transfers. Kings-only empty columns mean you should only clear columns when you have a King ready to fill them. Same-suit building requires more precision than FreeCell's alternating colors, so prioritize long same-suit sequences over short mixed ones.",
  },
  {
    question: "How do supermoves work in Seahaven Towers?",
    answer:
      "Seahaven Towers does not have supermoves in the way FreeCell does. In FreeCell, the game automatically moves multiple cards as a 'supermove' using empty cells and columns as intermediaries. In Seahaven, you must move each card individually — one at a time through free cells and empty columns. Your effective move capacity is the number of open free cells plus the number of empty columns (for Kings only). Planning these multi-step sequences manually is a core skill.",
  },
  {
    question: "How does Seahaven Towers strategy differ from FreeCell strategy?",
    answer:
      "Three critical differences reshape strategy: (1) same-suit tableau building (not alternating colors) cuts available moves roughly in half, demanding more precision; (2) Kings-only empty columns mean clearing a column is only useful when a King is ready to fill it; (3) two free cells start occupied, giving you less flexibility from the opening. FreeCell rewards aggressive column clearing; Seahaven rewards careful sequence building and patient free cell rotation.",
  },
  {
    question: "Should I focus on building foundations early in Seahaven Towers?",
    answer:
      "Move Aces and Twos to foundations immediately — they never help on the tableau. For cards ranked 3-6, check whether they are part of a useful same-suit sequence before sending them up. For 7s and above, foundation moves are usually safe since high cards rarely need to return to the tableau. The critical principle is: same-suit sequences on the tableau are already foundation-ready, so building them is effectively building foundations in advance.",
  },
  {
    question: "What win rate should I expect with optimal Seahaven Towers strategy?",
    answer:
      "Expert players achieve an 85-90% win rate in Seahaven Towers. Intermediate players typically win 50-70% of games. Despite the restrictive same-suit building rule, the 10 columns and 5-card stacks make most deals solvable. The high win rate rewards careful planning — if you are below 50%, focus on free cell management and move capacity calculation, which are the two skills that most dramatically improve results.",
  },
];

export default function SeahavenStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Seahaven Towers", item: absoluteUrl("/seahaven") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/seahaven/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Seahaven Towers Strategy Guide",
        description: "Advanced strategies for Seahaven Towers covering free cell management, same-suit building, Kings-only columns, and move capacity calculation.",
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
        title="Seahaven Towers Strategy Guide"
        kicker={<><Link href="/seahaven" className="hover:text-white transition-colors">Seahaven Towers</Link> / Strategy</>}
        subtitle="Advanced strategies for the FreeCell cousin that demands same-suit precision — from tower management and move capacity calculation to Kings-only column optimization."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Seahaven Towers", href: "/seahaven" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Seahaven Towers strategy rests on three pillars: <strong className="text-white">manage your four towers (free cells) as a rotation system, never a parking lot</strong>,{" "}
          <strong className="text-white">calculate move capacity before every multi-card transfer</strong>, and{" "}
          <strong className="text-white">build same-suit sequences that flow directly to foundations</strong>.
          With 10 columns but only single-card moves, every rearrangement must be planned step by
          step — and the Kings-only empty column rule means cleared columns are strategic investments,
          not casual workspace.
        </p>
      </div>

      {/* Section 1: Free Cell Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tower Management: The Art of Free Cell Rotation
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/seahaven" className="text-[var(--gold)] hover:text-white transition-colors">
            Seahaven Towers
          </Link>{" "}
          gives you 4 free cells — the same number as{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          . But there is a crucial difference: Seahaven starts with 2 of those cells already
          occupied by the leftover cards from the deal. You begin every game with only 2 available
          cells instead of 4, and those 2 pre-filled cells create an immediate constraint that
          shapes your entire opening strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The fundamental mistake players make is treating free cells as storage. They park a card,
          then park another, then realize both remaining cells are full and the board is frozen.
          Expert players treat free cells as a <em>rotation system</em>: cards flow in and flow out
          in quick cycles of 2-3 moves. A card enters a free cell, you rearrange the tableau, and
          the card exits to a foundation or a valid tableau position. The cell was occupied for
          moments, not turns.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Clear the 2 pre-filled cells first.</strong> Your opening
            priority is moving the starting free cell cards to valid tableau positions or foundations.
            Every cell you free expands your move capacity for the rest of the game.
          </li>
          <li>
            <strong className="text-white/90">Never fill the last cell without a guaranteed exit.</strong> Before
            placing a card in your final open cell, trace the exact sequence of moves that will empty
            at least one cell within 2-3 moves. If you cannot, do not fill it.
          </li>
          <li>
            <strong className="text-white/90">Low cards cycle fastest.</strong> Aces and Twos can exit
            directly to foundations. These are ideal candidates for temporary cell parking because
            their stay is minimal.
          </li>
          <li>
            <strong className="text-white/90">Kings cycle slowest.</strong> A King in a free cell can
            only exit to an empty column. If no empty column exists, that King is stuck indefinitely.
            Avoid parking Kings in cells unless you have a clear path to an empty column.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Count your open free cells before every move. If you are
            down to one, stop everything and find a way to empty a cell before proceeding. This
            single discipline — never dropping below one open cell — prevents more losses than any
            other habit. It is the Seahaven equivalent of &ldquo;never let the gas tank hit empty.&rdquo;
          </p>
        </div>
      </section>

      {/* Section 2: Move Capacity Calculation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Move Capacity Calculation: Planning Multi-Card Transfers
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Seahaven Towers does not support supermoves — you cannot drag a stack of cards from one
          column to another in a single action. Every multi-card rearrangement must be executed one
          card at a time, routing cards through free cells and (for Kings) empty columns. Your
          <em> move capacity</em> — the maximum number of cards you can transfer in a single
          sequence — is determined by the number of open free cells plus the number of empty columns
          available for King parking.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , the supermove formula is (1 + free cells) × 2^(empty columns), allowing exponential
          scaling with empty columns. Seahaven&apos;s single-card-only movement means your capacity
          scales linearly: with 2 open cells and 1 empty column (for a King), you can transfer
          at most 3 cards in sequence. This linear scaling makes every free cell and every empty
          column dramatically more valuable.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Calculate before you move.</strong> Before attempting
            any multi-card transfer, count: how many cards need to move? How many open cells do I
            have? Is there an empty column for a King? If the math does not work, find a different
            approach.
          </li>
          <li>
            <strong className="text-white/90">Free cells hold any card temporarily.</strong> Each open
            cell adds one card of transfer capacity. Two open cells means you can move up to 3 cards
            (the two cells plus the direct transfer of the bottom card).
          </li>
          <li>
            <strong className="text-white/90">Empty columns only help with Kings.</strong> An empty
            column adds transfer capacity only if one of the cards you are moving is a King. Otherwise,
            the empty column sits unused during the transfer.
          </li>
          <li>
            <strong className="text-white/90">Foundation moves during transfers</strong> can extend
            your effective capacity. If a card you temporarily placed in a free cell can go directly
            to the foundation, the cell is freed mid-sequence, letting you continue the transfer.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Open Free Cells</span>
            <span>Empty Columns (King-eligible)</span>
            <span>Max Cards Transferable</span>
          </div>
          {[
            ["0", "0", "1 (direct move only)"],
            ["1", "0", "2"],
            ["2", "0", "3"],
            ["3", "0", "4"],
            ["2", "1 (with King)", "4"],
            ["3", "1 (with King)", "5"],
          ].map(([cells, cols, max], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{cells}</span>
              <span>{cols}</span>
              <span className="text-emerald-400">{max}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Advanced technique:</strong> Look for intermediate foundation moves that extend
            your capacity mid-transfer. For example: park Card A in a cell, move Card B to the tableau,
            then notice Card A can go to the foundation — freeing the cell for Card C. These cascading
            moves effectively increase your capacity beyond the static calculation.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Same-Suit Sequence Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Same-Suit Sequence Building: Precision Over Volume
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Seahaven Towers requires same-suit descending sequences on the tableau. A 9 of Hearts
          can only stack on a 10 of Hearts — not a 10 of Diamonds or Clubs. This restriction
          cuts your available tableau moves roughly in half compared to{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          &apos;s alternating-color rule, where two of the four suits are valid destinations for
          any card.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The upside of same-suit building is strategic clarity. Every sequence you construct on
          the tableau is already in the exact order needed for the foundation. In FreeCell, you
          build alternating-color runs that must be dismantled card by card to move to foundations.
          In Seahaven, a same-suit run from Jack down to 5 means all seven cards will march to
          the foundation in order once the lower cards are placed. Building on the tableau <em>is</em>{" "}
          building the foundation — just in a different location.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This dual-purpose building changes your priorities. In FreeCell, you might build a long
          alternating-color sequence to expose a buried card, knowing you will break it apart later.
          In Seahaven, every same-suit connection is permanent progress that you should protect.
          Breaking a same-suit sequence to access a card beneath it should only be done when the
          card you gain is more valuable than the connections you lose.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for same-suit neighbors at the start.</strong> Identify
            which cards of each suit are near each other and can be consolidated with minimal moves.
          </li>
          <li>
            <strong className="text-white/90">Protect long runs.</strong> A 5-card same-suit sequence
            represents significant investment. Breaking it to access one card beneath it is rarely
            worth it unless that card completes another sequence of equal or greater length.
          </li>
          <li>
            <strong className="text-white/90">Short columns are sequence-building targets.</strong> Columns
            with only 2-3 cards are easiest to clear and rebuild with a clean same-suit run.
          </li>
          <li>
            <strong className="text-white/90">Avoid mixing suits on a column.</strong> Placing an off-suit
            card on a column because it fits by rank creates a problem you will need to solve later
            with limited free cell capacity.
          </li>
        </ul>
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-300/80 text-sm">
            <strong>Comparison with Baker&apos;s Game:</strong>{" "}
            <Link href="/bakers-game" className="text-[var(--gold)] hover:text-white transition-colors">
              Baker&apos;s Game
            </Link>{" "}
            also uses same-suit building but allows any card in empty columns and supports supermoves.
            Seahaven&apos;s Kings-only restriction and single-card-only movement make sequence building
            more constrained, but the 10 columns (vs. Baker&apos;s 8) provide more workspace.
          </p>
        </div>
      </section>

      {/* Section 4: Kings-Only Column Optimization */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Kings-Only Column Optimization: Strategic Column Clearing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Seahaven&apos;s Kings-only empty column rule is the single biggest strategic divergence from{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          . In FreeCell, empty cascades are universally valuable — any card can fill them, making
          them flexible workspace for reorganization. In Seahaven, empty columns serve one purpose:
          receiving Kings. This transforms column clearing from a general-purpose tactic into a
          targeted King-relocation strategy.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The decision to clear a column should always start with the question: &ldquo;Which King
          will fill this space, and what does that King move accomplish?&rdquo; Ideally, the King
          you move into the empty column was blocking useful cards beneath it, or it was occupying
          a column needed for a different suit&apos;s sequence. The column clear and King placement
          should create a net positive in board organization, not just shuffle cards around.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track all four Kings constantly.</strong> Know which
            Kings are exposed (available to move), which are buried (need excavation), and which are
            in free cells (need empty columns to exit).
          </li>
          <li>
            <strong className="text-white/90">Kings in free cells are high-priority targets.</strong> A
            King occupying a free cell permanently reduces your move capacity until it can be placed
            in an empty column. Freeing that cell should be a strategic priority.
          </li>
          <li>
            <strong className="text-white/90">Kings at the top of long columns</strong> are blocking
            everything beneath them. Moving such a King to an empty column unlocks the entire column
            for reorganization — a massive board improvement.
          </li>
          <li>
            <strong className="text-white/90">Sometimes a column should stay occupied.</strong> If
            clearing a column requires parking 4-5 cards in free cells (filling all of them) and
            no King is ready, the column clear costs more than it gains. Leave it and find a
            different approach.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>King Situation</span>
            <span>Priority</span>
            <span>Recommended Action</span>
          </div>
          {[
            ["King in free cell", "Highest", "Clear a column immediately to free the cell"],
            ["King blocking buried cards", "High", "Clear a column and relocate the King"],
            ["King at top of its suit's column", "Medium", "Already well-placed — build the sequence below it"],
            ["King already anchoring a sequence", "Low", "No action needed — focus elsewhere"],
          ].map(([situation, priority, action], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{situation}</span>
              <span className={
                priority === "Highest" ? "text-red-400" :
                priority === "High" ? "text-amber-400" :
                priority === "Medium" ? "text-emerald-400" :
                "text-white/40"
              }>{priority}</span>
              <span>{action}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> With 10 columns and only 5 cards per column at the start,
            Seahaven naturally creates empty columns faster than FreeCell. Some deals have an
            empty column within the first 5-10 moves. Be ready to exploit this immediately — have
            your King-placement plan ready before the column opens up.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Opening Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Opening Strategy: The First 10 Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The opening phase of Seahaven Towers is uniquely constrained because 2 of your 4 free
          cells start occupied. This means your opening moves have less flexibility than any other
          point in the game. A strong opening establishes the foundation (literally and figuratively)
          for the entire game, while a weak opening can create problems that persist for dozens of
          moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Your first priority is assessing the two pre-filled free cell cards. Can either go
          directly to a foundation (if they are Aces) or to a valid tableau position? Moving even
          one of these cards frees a cell and immediately expands your options. If both cards are
          mid-range with no immediate tableau destination, you are starting from a constrained
          position and should play conservatively.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          After addressing the pre-filled cells, scan all 10 columns for immediate opportunities.
          Aces exposed on top of columns should go to foundations. Same-suit consecutive cards
          already adjacent in a column are lucky breaks that should be preserved. Columns with
          only 4-5 cards and a King near the bottom are prime candidates for early clearing.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Move pre-filled cell cards first.</strong> Getting to
            3-4 open cells as quickly as possible gives you maximum flexibility for the middle game.
          </li>
          <li>
            <strong className="text-white/90">Send Aces and Twos to foundations immediately.</strong> Every
            foundation card placed reduces the number of cards you need to manage on the tableau.
          </li>
          <li>
            <strong className="text-white/90">Identify same-suit pairs.</strong> If a 7 of Clubs is
            sitting on an 8 of Clubs, that is a free same-suit connection. Protect it and try to
            extend it.
          </li>
          <li>
            <strong className="text-white/90">Do not commit to deep reorganization yet.</strong> The
            opening should be about quick wins and information gathering — save complex multi-move
            sequences for the middle game when you have more open cells.
          </li>
        </ul>
        <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
          <p className="text-purple-300/80 text-sm">
            <strong>Mental model:</strong> Think of the opening like chess. You are developing your
            pieces (freeing cells, placing Aces) and controlling the center (building same-suit
            connections on key columns). Do not launch an attack (complex reorganization) until your
            position is stable and your resources are deployed.
          </p>
        </div>
      </section>

      {/* Section 6: Seahaven vs FreeCell Deep Comparison */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Seahaven vs FreeCell: Adapting Your Mental Model
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Most Seahaven players arrive from{" "}
          <Link href="/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , and the transition is deceptively difficult. The games look similar — open information,
          free cells, single-card moves, build to foundations. But the rule differences create a
          fundamentally different strategic landscape. Players who apply FreeCell intuition directly
          to Seahaven consistently underperform because the games reward different skills.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The same-suit building restriction is the most impactful difference. In FreeCell, any red
          card can go on any black card of the next higher rank, giving you roughly twice as many
          valid moves at any given moment. Seahaven demands exact suit matching, which means fewer
          moves are available, sequences take longer to build, and each move carries more strategic
          weight. FreeCell is a game of flow; Seahaven is a game of precision.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>FreeCell Habit</span>
            <span>Seahaven Reality</span>
            <span>Required Adjustment</span>
          </div>
          {[
            ["Clear columns freely", "Only Kings fill empty columns", "Only clear when a King is ready"],
            ["Build long alternating runs", "Same-suit only — fewer valid moves", "Prioritize quality (in-suit) over quantity"],
            ["Supermoves handle multi-card shifts", "Every card moves individually", "Calculate move capacity before attempting"],
            ["Start with 4 open cells", "Start with only 2 open cells", "Opening must prioritize freeing cells"],
            ["Empty columns multiply capacity", "Empty columns only for Kings", "Column value depends on King availability"],
          ].map(([habit, reality, adjustment], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{habit}</span>
              <span>{reality}</span>
              <span className="text-amber-400">{adjustment}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The positive adaptation from FreeCell is that Seahaven&apos;s 10 columns (versus 8) and
          shorter starting stacks (5 cards versus 6-7) mean cards are less deeply buried. The extra
          workspace compensates for the tighter building rules. Players who make the mental shift
          from &ldquo;flexible moves, fewer columns&rdquo; (FreeCell) to &ldquo;precise moves, more
          columns&rdquo; (Seahaven) will find the game deeply rewarding.
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
              <strong>Rotate cards through free cells quickly.</strong> Cells are a conveyor belt,
              not a parking lot. Park, rearrange, empty — in 2-3 moves.
            </li>
            <li>
              <strong>Never fill the last open cell without a plan.</strong> Count your cells before
              every move. One open cell is the minimum for survival.
            </li>
            <li>
              <strong>Calculate move capacity before multi-card transfers.</strong> Free cells + King-eligible
              empty columns = your transfer limit. Do the math first.
            </li>
            <li>
              <strong>Build same-suit sequences as foundation previews.</strong> Every in-suit run
              you build is already in perfect foundation order.
            </li>
            <li>
              <strong>Clear columns only when a King is ready.</strong> Empty columns without Kings
              are wasted effort. Have a specific King in mind before clearing.
            </li>
            <li>
              <strong>Free the pre-filled cells early.</strong> Getting to 3-4 open cells in the
              opening dramatically expands your options.
            </li>
            <li>
              <strong>Precision over speed.</strong> Seahaven rewards careful planning, not rapid
              card movement. Think 4-6 moves ahead.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/seahaven/how-to-play" title="How to Play Seahaven" description="Complete rules, setup, and foundation mechanics explained." />
            <ContentLinkCard href="/seahaven/tips" title="Seahaven Tips & Tricks" description="Quick, practical tips for improving your Seahaven game." />
            <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Strategy guide for Seahaven's closest cousin." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Seahaven Towers knowledge to the test. Play free online Seahaven Towers with unlimited undo and instant new deals."
          primaryLabel="Play Seahaven Towers"
          primaryHref="/seahaven"
          secondaryLabel="Learn the Rules"
          secondaryHref="/seahaven/how-to-play"
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
          More Seahaven Towers Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/seahaven" title="Play Seahaven Towers" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/seahaven/how-to-play" title="How to Play Seahaven" description="Complete rules, setup, and strategy guide" />
          <ContentLinkCard href="/seahaven/tips" title="Seahaven Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/bakers-game/strategy" title="Baker's Game Strategy" description="Strategy for another same-suit FreeCell variant" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
