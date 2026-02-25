import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Play FreeCell Solitaire | Complete Rules & Tutorial Guide",
  description:
    "Learn how to play FreeCell Solitaire with our complete beginner's guide. Step-by-step rules, board layout diagrams, card movement examples, and expert tips to win more games.",
  keywords: [
    "how to play freecell",
    "freecell rules",
    "freecell tutorial",
    "freecell solitaire rules",
    "freecell guide",
    "freecell for beginners",
    "freecell card game",
  ],
  openGraph: {
    title: "How to Play FreeCell Solitaire | Complete Rules & Tutorial",
    description:
      "Master FreeCell with our visual guide. Board layout diagrams, step-by-step rules, and expert tips.",
    url: "https://playfreecellonline.com/how-to-play",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

/* ── Tiny helper components ── */

function MiniCard({
  rank,
  suit,
  ghost,
  glow,
}: {
  rank: string;
  suit: string;
  ghost?: boolean;
  glow?: boolean;
}) {
  const isRed = suit === "\u2665" || suit === "\u2666";
  if (ghost) {
    return (
      <div className="w-11 h-[3.75rem] sm:w-12 sm:h-16 rounded-lg border-2 border-dashed border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]/30 text-sm">
        {suit}
      </div>
    );
  }
  return (
    <div
      className={`w-11 h-[3.75rem] sm:w-12 sm:h-16 rounded-lg shadow-md border flex flex-col items-center justify-center font-bold leading-none select-none
        ${isRed ? "bg-white text-red-600 border-red-100" : "bg-white text-gray-900 border-gray-100"}
        ${glow ? "ring-2 ring-[#D4AF37] ring-offset-1 ring-offset-[#e8e3d8]" : ""}`}
    >
      <span className="text-sm sm:text-base">{rank}</span>
      <span className="text-[10px] sm:text-xs mt-0.5">{suit}</span>
    </div>
  );
}

function GoldStep({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#062516] flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
      {n}
    </div>
  );
}

function SectionHeading({
  children,
  id,
  sub,
  icon,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
}) {
  const isRedSuit = icon === "\u2665" || icon === "\u2666";
  return (
    <div className="px-8 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && (
          <span className={`mr-2 ${isRedSuit ? "text-red-500" : "text-[#c9a84c]"}`}>
            {icon}
          </span>
        )}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

/* ── Board diagram ── */

function BoardDiagram() {
  return (
    <div className="bg-[#0a4a2a] border border-[#1a6a3a]/50 rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
      {/* Top row: Free Cells + Foundations */}
      <div className="flex justify-between items-start gap-4 min-w-[340px]">
        {/* Free Cells */}
        <div>
          <div className="text-[10px] sm:text-xs text-[#D4AF37] font-semibold mb-2 tracking-wider uppercase text-center">
            Free Cells
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-11 h-[3.75rem] sm:w-12 sm:h-16 rounded-lg border-2 border-dashed border-white/20"
              />
            ))}
          </div>
        </div>
        {/* Foundations */}
        <div>
          <div className="text-[10px] sm:text-xs text-[#D4AF37] font-semibold mb-2 tracking-wider uppercase text-center">
            Foundations
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            {(["\u2660", "\u2665", "\u2666", "\u2663"] as const).map((suit) => {
              const isRed = suit === "\u2665" || suit === "\u2666";
              return (
                <div
                  key={suit}
                  className={`w-11 h-[3.75rem] sm:w-12 sm:h-16 rounded-lg border-2 border-dashed flex items-center justify-center text-sm sm:text-base
                    ${isRed ? "border-red-400/30 text-red-400/40" : "border-white/20 text-white/25"}`}
                >
                  {suit}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cascades */}
      <div className="mt-5">
        <div className="text-[10px] sm:text-xs text-[#D4AF37] font-semibold mb-2 tracking-wider uppercase text-center">
          8 Cascades
        </div>
        <div className="flex gap-1 sm:gap-1.5 justify-center min-w-[340px]">
          {[7, 7, 7, 7, 6, 6, 6, 6].map((count, col) => (
            <div
              key={col}
              className="relative"
              style={{ width: "2.75rem", height: `${20 + count * 14}px` }}
            >
              {Array.from({ length: count }).map((_, row) => (
                <div
                  key={row}
                  className="absolute left-0 right-0 h-5 bg-white/[0.08] border border-white/[0.06] rounded-[3px]"
                  style={{ top: `${row * 14}px` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend arrows */}
      <div className="flex justify-between mt-4 text-[10px] sm:text-xs text-white/40 px-1">
        <span>{"\u2190"} Temporary storage</span>
        <span>Build A {"\u2192"} K by suit {"\u2192"}</span>
      </div>
    </div>
  );
}

/* ── Color alternation diagram ── */

function ColorAlternationDiagram() {
  return (
    <div className="bg-[#0a4a2a] border border-[#1a6a3a]/50 rounded-xl p-5 sm:p-6 my-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {/* Valid move */}
        <div className="text-center">
          <div className="text-xs text-emerald-400 font-semibold mb-3 uppercase tracking-wider">
            {"\u2713"} Valid
          </div>
          <div className="flex flex-col items-center">
            <MiniCard rank="6" suit={"\u2660"} />
            <div className="-mt-8">
              <MiniCard rank="5" suit={"\u2665"} glow />
            </div>
          </div>
          <p className="text-white/50 text-xs mt-3">Red 5 on Black 6</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-28 bg-white/10" />
        <div className="sm:hidden h-px w-32 bg-white/10" />

        {/* Valid move 2 */}
        <div className="text-center">
          <div className="text-xs text-emerald-400 font-semibold mb-3 uppercase tracking-wider">
            {"\u2713"} Valid
          </div>
          <div className="flex flex-col items-center">
            <MiniCard rank="Q" suit={"\u2665"} />
            <div className="-mt-8">
              <MiniCard rank="J" suit={"\u2663"} glow />
            </div>
          </div>
          <p className="text-white/50 text-xs mt-3">Black J on Red Q</p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-28 bg-white/10" />
        <div className="sm:hidden h-px w-32 bg-white/10" />

        {/* Invalid move */}
        <div className="text-center">
          <div className="text-xs text-red-400 font-semibold mb-3 uppercase tracking-wider">
            {"\u2717"} Invalid
          </div>
          <div className="flex flex-col items-center">
            <MiniCard rank="9" suit={"\u2660"} />
            <div className="-mt-8 opacity-50">
              <MiniCard rank="8" suit={"\u2663"} />
            </div>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Same color — not allowed
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Supermove formula ── */

function SupermoveFormula() {
  return (
    <div className="bg-[#0a4a2a] border border-[#1a6a3a]/50 rounded-xl p-5 sm:p-6 my-6">
      <div className="text-center">
        <div className="text-xs text-[#D4AF37] font-semibold mb-4 uppercase tracking-wider">
          Supermove Formula
        </div>
        <div className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-4">
          (1 + free cells) {"\u00d7"} 2
          <sup className="text-[#D4AF37]">empty columns</sup>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm max-w-md mx-auto">
          {[
            { cells: 4, cols: 0, result: 5 },
            { cells: 2, cols: 1, result: 6 },
            { cells: 4, cols: 2, result: 20 },
          ].map(({ cells, cols, result }) => (
            <div
              key={`${cells}-${cols}`}
              className="bg-white/[0.06] rounded-lg p-3 border border-white/[0.06]"
            >
              <div className="text-white/50 text-xs mb-1">
                {cells} free cells, {cols} empty col{cols !== 1 ? "s" : ""}
              </div>
              <div className="text-[#D4AF37] font-bold text-lg">
                {result} cards
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Suit divider between major sections ── */

function SuitDivider() {
  return (
    <div className="suit-divider text-[#c9a84c]/40 text-sm">
      {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function HowToPlayPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play FreeCell Solitaire",
    description:
      "Complete guide to playing FreeCell Solitaire. Learn the rules, board layout, and strategies.",
    step: [
      {
        "@type": "HowToStep",
        name: "Understand the Board",
        text: "The FreeCell board has three areas: 4 free cells (temporary storage), 4 foundations (build A-K by suit), and 8 cascades (your main workspace).",
      },
      {
        "@type": "HowToStep",
        name: "Deal the Cards",
        text: "All 52 cards are dealt face-up into 8 columns. The first 4 columns get 7 cards, the last 4 get 6 cards. No cards are hidden.",
      },
      {
        "@type": "HowToStep",
        name: "Move Cards Between Cascades",
        text: "Place cards in descending order with alternating colors. A red 5 goes on a black 6, a black Jack on a red Queen.",
      },
      {
        "@type": "HowToStep",
        name: "Use Free Cells Wisely",
        text: "Store individual cards temporarily in the 4 free cells. Keep them empty when possible \u2014 they control how many cards you can move at once.",
      },
      {
        "@type": "HowToStep",
        name: "Build the Foundations",
        text: "Move Aces to foundations, then build up by suit (A, 2, 3...K). Complete all 4 foundations to win the game.",
      },
      {
        "@type": "HowToStep",
        name: "Plan Ahead and Win",
        text: "Think several moves ahead. Use undo freely. Nearly every deal is solvable \u2014 winning is a matter of skill and patience.",
      },
    ],
  };

  return (
    <div
      className="h-screen overflow-y-auto scroll-smooth felt-bg"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        {/* Decorative suit watermarks */}
        <div
          className="absolute top-8 left-[8%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>
        <div
          className="absolute top-20 right-[10%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2665"}
        </div>
        <div
          className="absolute bottom-4 left-[15%] text-4xl sm:text-6xl text-red-500/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-8 right-[12%] text-5xl sm:text-7xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>

        {/* Breadcrumbs */}
        <nav
          className="max-w-3xl mx-auto mb-8 text-sm text-[#6B7280]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link
                href="/"
                className="hover:text-white/80 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">How to Play</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play FreeCell Solitaire
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The complete guide to mastering the world&apos;s most rewarding
          card game — where every deal is solvable and every win is earned.
        </p>

        {/* Gold divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Table of Contents ── */}
      <nav className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            ["#what-is-freecell", "\u2660", "What is FreeCell?"],
            ["#the-board", "\u2665", "The Board"],
            ["#setup", "\u2666", "Game Setup"],
            ["#rules", "\u2663", "Rules of Play"],
            ["#supermoves", "\u2660", "Supermoves"],
            ["#first-game", "\u2665", "Your First Game"],
            ["#winning", "\u2666", "How to Win"],
            ["#terminology", "\u2663", "Terminology"],
            ["#tips", "\u2660", "Quick Tips"],
          ].map(([href, icon, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${icon === "\u2665" || icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {/* Section 1: What is FreeCell? */}
        <section id="what-is-freecell" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Introduction" id="what-is-freecell-heading" icon={"\u2660"}>
              What is FreeCell Solitaire?
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8 space-y-5">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75]">
                FreeCell is one of the most popular and intellectually rewarding
                solitaire card games ever created. Unlike traditional solitaire
                variants where hidden cards and random draws determine your fate,
                FreeCell deals all 52 cards face-up from the very beginning. This
                means every game is almost entirely a test of skill, strategic
                planning, and careful thinking — not luck.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                The game was first programmed by Paul Alfille for the PLATO
                educational computer system in 1978. It later became a worldwide
                phenomenon when Microsoft included it in Windows 95, introducing
                millions of people to its addictive blend of logic and card play.
                Today, FreeCell remains one of the most-played solitaire games in
                the world, beloved by casual players and puzzle enthusiasts alike
                for its fair gameplay and the deeply satisfying challenge it
                offers.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Nearly every deal is solvable. Of the original 32,000 Microsoft FreeCell deals, only one — deal #11982 — has been proven impossible.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                What makes FreeCell truly special is that nearly every deal is
                solvable. Of the original 32,000 Microsoft FreeCell numbered
                deals, only one — deal #11982 — has been proven impossible to
                complete. This means that when you lose a game of FreeCell,
                it&apos;s almost always because of a strategic error, not bad
                luck. That&apos;s what makes winning so satisfying and what makes
                improving your skills so rewarding. Every game is a puzzle
                waiting to be solved.
              </p>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 2: The Board */}
        <section id="the-board" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Board Layout" id="the-board-heading" icon={"\u2665"}>
              Understanding the Game Board
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8 space-y-5">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75]">
                The FreeCell board is elegantly simple, consisting of three
                distinct areas that each serve a specific purpose in your quest to
                organize all 52 cards. Understanding how these areas work together
                is the first step toward mastering the game.
              </p>

              <BoardDiagram />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#f0ede5] rounded-xl p-4 border border-[rgba(212,175,55,0.12)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#c9a84c] text-lg">
                      {"\u25CF"}
                    </span>
                    <h3 className="font-medium text-[#2a2522]">Free Cells</h3>
                  </div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">
                    Four empty spaces in the upper-left corner. These are your
                    temporary storage slots — your &quot;breathing room.&quot;
                    Each free cell holds exactly one card at a time. Using them
                    wisely is the key to unlocking complex moves and freeing
                    deeply buried cards.
                  </p>
                </div>
                <div className="bg-[#f0ede5] rounded-xl p-4 border border-[rgba(212,175,55,0.12)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#c9a84c] text-lg">
                      {"\u25CF"}
                    </span>
                    <h3 className="font-medium text-[#2a2522]">Foundations</h3>
                  </div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">
                    Four empty spaces in the upper-right corner. This is where you
                    build your completed suits. Each foundation starts empty and
                    must be built from Ace to King in a single suit. Once all four
                    foundations are complete, you&apos;ve won the game.
                  </p>
                </div>
                <div className="bg-[#f0ede5] rounded-xl p-4 border border-[rgba(212,175,55,0.12)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#c9a84c] text-lg">
                      {"\u25CF"}
                    </span>
                    <h3 className="font-medium text-[#2a2522]">Cascades</h3>
                  </div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">
                    Eight columns of cards in the center of the board. This is
                    your main workspace where all the strategic action happens. At
                    the start of the game, all 52 cards are distributed across
                    these columns. Your job is to rearrange them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 3: Setup */}
        <section id="setup" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Getting Started" id="setup-heading" icon={"\u2666"}>
              How the Game is Set Up
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8 space-y-5">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75]">
                When a new game of FreeCell begins, all 52 cards from a standard
                deck are dealt face-up into the 8 cascade columns. The first four
                columns receive 7 cards each (28 cards total), and the remaining
                four columns receive 6 cards each (24 cards total), accounting for
                all 52 cards in the deck.
              </p>

              {/* Visual of card distribution */}
              <div className="bg-[#f0ede5] rounded-xl p-4 border border-[rgba(212,175,55,0.12)] my-5">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-center">
                  {[7, 7, 7, 7, 6, 6, 6, 6].map((n, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-[10px] text-[#6B7280] mb-1">
                        Col {i + 1}
                      </div>
                      <div
                        className={`w-9 sm:w-11 h-8 sm:h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                          n === 7
                            ? "bg-[#D4AF37]/15 text-[#B8860B] border border-[#D4AF37]/25"
                            : "bg-[#f0ede5] text-[#6B7280] border border-[#d4c5a0]/30"
                        }`}
                      >
                        {n}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-[#6B7280] mt-3">
                  Number of cards dealt to each cascade column
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                There is no stock pile, no draw pile, and no hidden cards
                whatsoever. Every single card is visible from the moment the game
                begins. This complete transparency is what makes FreeCell a game of
                pure skill rather than chance — you have all the information you
                need to solve the puzzle from move one.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Each game is identified by a unique deal number. Our deals #1 through #32,000 are fully compatible with the original Microsoft FreeCell.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                Each game is identified by a unique deal number, which determines
                exactly how the cards are arranged. This means you can replay
                specific deals to improve your strategy, or share deal numbers with
                friends to compete on the exact same layout. Our deals #1 through
                #32,000 are fully compatible with the original Microsoft FreeCell,
                so you can even look up known solutions for specific deals.
              </p>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 4: Rules */}
        <section id="rules" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="The Rules" id="rules-heading" icon={"\u2663"}>
              Rules of Play
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75] mb-8">
                FreeCell has a small set of elegant rules that are easy to learn
                but take time to master. Here are the five core rules you need to
                know before making your first move.
              </p>

              {/* Rule 1 */}
              <div className="flex gap-4 mb-8">
                <GoldStep n={1} />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                    <span className="text-[#c9a84c] mr-1.5">{"\u2660"}</span>Moving Cards Between Cascades
                  </h3>
                  <p className="text-[#3a3a3a] leading-[1.75] mb-3">
                    The fundamental move in FreeCell: you can move the bottom
                    (exposed) card of any cascade onto the bottom card of another
                    cascade, but only if the destination card is{" "}
                    <strong className="text-[#2a2522]">one rank higher</strong> and
                    the{" "}
                    <strong className="text-[#2a2522]">opposite color</strong>. For
                    example, a red 5 ({"\u2665"} or {"\u2666"}) can be placed on a
                    black 6 ({"\u2660"} or {"\u2663"}). A black Jack can be placed
                    on a red Queen. But a red 3 cannot go on a red 4 (same color),
                    and a 7 cannot go on a 5 (must be exactly one rank higher).
                  </p>
                  <ColorAlternationDiagram />
                  <p className="text-[#5a5a5a] text-sm leading-relaxed">
                    This alternating-color, descending-rank rule is the backbone
                    of FreeCell gameplay. It&apos;s the same rule used for building
                    tableau columns in Klondike solitaire, so if you&apos;ve played
                    classic solitaire before, you already know the pattern.
                  </p>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="flex gap-4 mb-8">
                <GoldStep n={2} />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                    <span className="text-[#c9a84c] mr-1.5">{"\u2665"}</span>Using Free Cells
                  </h3>
                  <p className="text-[#3a3a3a] leading-[1.75]">
                    Any single exposed card can be moved to an empty free cell.
                    This is your safety valve — when you need to temporarily get a
                    card out of the way to access cards underneath it. However,
                    each free cell can only hold one card, and you only have four
                    of them. Using them wisely is absolutely critical. Every
                    occupied free cell reduces the number of cards you can move in
                    a single action. Think of free cells as your strategic reserve:
                    the best players use them sparingly and empty them again as
                    quickly as possible.
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="flex gap-4 mb-8">
                <GoldStep n={3} />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                    <span className="text-[#c9a84c] mr-1.5">{"\u2666"}</span>Building Foundations
                  </h3>
                  <p className="text-[#3a3a3a] leading-[1.75] mb-3">
                    Foundations are built up by suit, starting from the Ace. The
                    order is: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K. Each of
                    the four foundations holds one suit — spades ({"\u2660"}),
                    hearts ({"\u2665"}), diamonds ({"\u2666"}), and clubs (
                    {"\u2663"}). You can only place a card on a foundation if
                    it&apos;s the next card in that suit&apos;s sequence. For
                    example, if the spades foundation currently shows 5{"\u2660"},
                    only 6{"\u2660"} can go there next.
                  </p>
                  {/* Foundation build example */}
                  <div className="bg-[#0a4a2a] border border-[#1a6a3a]/50 rounded-lg p-4 flex items-center gap-2 overflow-x-auto">
                    <span className="text-xs text-white/50 mr-1 shrink-0">
                      Example:
                    </span>
                    {["A", "2", "3", "4", "5"].map((r) => (
                      <MiniCard key={r} rank={r} suit={"\u2660"} />
                    ))}
                    <span className="text-white/50 text-lg shrink-0">
                      {"\u2192"}
                    </span>
                    <span className="text-white/50 text-sm shrink-0">
                      ...K{"\u2660"}
                    </span>
                  </div>
                  <p className="text-[#5a5a5a] text-sm leading-relaxed mt-3">
                    In most FreeCell implementations — including ours — cards that
                    are safe to move to foundations are moved there automatically,
                    saving you clicks and letting you focus on the strategic
                    decisions.
                  </p>
                </div>
              </div>

              {/* Rule 4 */}
              <div className="flex gap-4 mb-8">
                <GoldStep n={4} />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                    <span className="text-[#c9a84c] mr-1.5">{"\u2663"}</span>Using Empty Columns
                  </h3>
                  <p className="text-[#3a3a3a] leading-[1.75]">
                    When a cascade column is completely emptied, any card or valid
                    sequence of cards can be moved there. Empty columns are
                    incredibly valuable — even more valuable than free cells —
                    because they can hold entire sequences of cards, not just
                    single cards. Each empty column doubles the number of cards you
                    can move at once. Protecting your empty columns is a hallmark
                    of skilled play. Think twice before filling an empty column,
                    especially with a King, since Kings have no card that can be
                    placed on top of them in a cascade.
                  </p>
                </div>
              </div>

              {/* Rule 5 */}
              <div className="flex gap-4">
                <GoldStep n={5} />
                <div className="flex-1">
                  <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                    <span className="text-[#c9a84c] mr-1.5">{"\u2660"}</span>The Supermove (Moving Multiple Cards)
                  </h3>
                  <p className="text-[#3a3a3a] leading-[1.75] mb-3">
                    Officially, FreeCell rules only allow moving one card at a
                    time. However, most computer versions — including ours — allow
                    you to move a properly ordered sequence of cards (descending
                    rank, alternating colors) as a single move. This works as long
                    as there are enough empty free cells and empty columns to
                    theoretically execute the move one card at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 5: Supermoves */}
        <section id="supermoves" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Advanced Mechanic" id="supermoves-heading" icon={"\u2660"}>
              Understanding Supermoves
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8 space-y-5">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75]">
                The supermove is one of the most important concepts in FreeCell.
                The number of cards you can move at once depends on how many empty
                free cells and empty cascade columns are available. The formula is
                straightforward:
              </p>

              <SupermoveFormula />

              <p className="text-[#3a3a3a] leading-[1.75]">
                For example, if you have 2 empty free cells and 1 empty column,
                you can move up to (1 + 2) × 2¹ = 6 cards at once. With all 4
                free cells empty and 2 empty columns, you can move an impressive
                (1 + 4) × 2² = 20 cards in a single action. This is why
                keeping free cells and columns empty is so powerful — it
                dramatically increases your ability to make large moves and
                reorganize the board efficiently.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Before attempting a multi-card move, quickly count your empty spaces to make sure the move is actually possible.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                Understanding this formula will transform how you evaluate the
                board. Before attempting a multi-card move, quickly count your
                empty spaces to make sure the move is actually possible. Running
                out of move capacity mid-plan is a common way games go wrong.
              </p>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 6: Your First Game */}
        <section id="first-game" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading
              sub="Step-by-Step Walkthrough"
              id="first-game-heading"
              icon={"\u2665"}
            >
              Playing Your First Game
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75] mb-8">
                Ready to play? Here&apos;s a step-by-step walkthrough of how to
                approach your very first game of FreeCell. Follow these steps and
                you&apos;ll be well on your way to a win.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <GoldStep n={1} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2660"}</span>Scan the Board
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Before making any move, take 30 seconds to survey the entire
                      layout. Where are the four Aces? How deeply buried are they?
                      Are there any 2s or 3s that are blocked? Which columns
                      already have some natural ordering? This initial scan will
                      save you from many dead ends later. The best FreeCell players
                      always start by analyzing the board before touching a single
                      card.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={2} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2665"}</span>Prioritize Freeing Aces and Low Cards
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Aces and 2s need to reach the foundations as soon as
                      possible. Every move you make in the early game should be
                      working toward uncovering and freeing these low-value cards.
                      If an Ace is buried under six other cards, that column
                      demands your attention. Plan a sequence of moves that will
                      uncover it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={3} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2666"}</span>Build Descending Sequences
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Start moving cards between cascades to create descending,
                      alternating-color sequences. Focus on columns where you can
                      make meaningful progress toward freeing important buried
                      cards. Avoid building sequences just because you can — every
                      sequence should serve your larger plan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={4} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2663"}</span>Send Cards to Foundations Early
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      As Aces become available, immediately move them to the
                      foundation area. Follow up with 2s, 3s, and higher cards as
                      they become accessible. Building foundations early creates
                      more room in the cascades and brings you closer to victory
                      with every card you place.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={5} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2660"}</span>Manage Free Cells and Empty Columns
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Keep careful track of your empty free cells and empty
                      columns. Every card you park in a free cell reduces your
                      flexibility and limits the number of cards you can move at
                      once. Only use free cells when absolutely necessary, and
                      prioritize emptying them again quickly. If you create an
                      empty column, protect it — it&apos;s your most valuable
                      resource.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={6} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2665"}</span>Think Several Moves Ahead
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Before each move, ask: &quot;What does this move
                      enable?&quot; Try to see 3 to 5 moves into the future. If a
                      sequence of moves doesn&apos;t lead to something productive —
                      freeing an important card, creating an empty column, or
                      building foundations — reconsider your approach. The best
                      FreeCell players think in chains, not individual actions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={7} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2666"}</span>Use Undo Freely — It&apos;s How You Learn
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      If you feel stuck or realize a move was a mistake, hit the
                      undo button without hesitation. Undo is not cheating —
                      it&apos;s the single best learning tool available to you. Try
                      a sequence of moves, observe the result, undo if it
                      didn&apos;t work, and try a different path. Over time,
                      you&apos;ll develop the intuition to see dead ends before you
                      reach them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 7: How to Win */}
        <section id="winning" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Victory" id="winning-heading" icon={"\u2666"}>
              How to Win at FreeCell
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8 space-y-5">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75]">
                The game is won when all 52 cards have been moved to the four
                foundation piles, with each pile containing a complete suit in
                order from Ace through King. The game automatically detects when
                you&apos;ve won, and in many cases, the final cards will cascade
                to the foundations automatically once the solution becomes
                inevitable.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                Since approximately 99.999% of FreeCell deals are solvable,
                winning is almost always possible with the right strategy and
                enough patience. Beginners typically win about 40–50% of their
                games. Intermediate players reach 70–80%. Expert players can
                consistently achieve win rates above 90%.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                The beauty of FreeCell is that every loss is a learning
                opportunity. When you lose, you know it was a strategic mistake —
                not bad luck. This is why FreeCell is so addictive: there is
                always room to improve, and every hard-earned victory feels
                genuinely satisfying.
              </p>

              {/* Win rate bar */}
              <div className="bg-[#f0ede5] rounded-xl p-5 border border-[rgba(212,175,55,0.12)] mt-2">
                <h3 className="font-medium text-[#B8860B] text-sm mb-4 uppercase tracking-wider">
                  Typical Win Rates by Skill Level
                </h3>
                {[
                  { label: "Beginner", pct: 45, color: "bg-amber-400" },
                  { label: "Intermediate", pct: 75, color: "bg-emerald-500" },
                  { label: "Expert", pct: 92, color: "bg-[#D4AF37]" },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-sm text-[#5a5a5a] mb-1">
                      <span>{label}</span>
                      <span className="font-bold text-[#2a2522]">{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-[#d4c5a0]/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 8: Terminology */}
        <section id="terminology" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Glossary" id="terminology-heading" icon={"\u2663"}>
              Key FreeCell Terminology
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75] mb-5">
                Knowing the correct terminology will help you follow strategy
                guides and communicate with other players. Here are the essential
                terms every FreeCell player should know.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  [
                    "Cascade",
                    "One of the 8 columns of cards on the tableau. Also called a column or pile.",
                  ],
                  [
                    "Free Cell",
                    "One of the 4 temporary storage spaces that can each hold a single card.",
                  ],
                  [
                    "Foundation",
                    "One of the 4 piles where you build completed suits from Ace to King.",
                  ],
                  [
                    "Tableau",
                    "The entire playing area containing all 8 cascades \u2014 your main workspace.",
                  ],
                  [
                    "Supermove",
                    "Moving a sequence of cards in one action, enabled by empty free cells and columns.",
                  ],
                  [
                    "Auto-move",
                    "When cards are automatically sent to foundations because they are safe to play.",
                  ],
                  [
                    "Exposed Card",
                    "The bottom card of a cascade \u2014 the only card in the column that can be moved.",
                  ],
                  [
                    "Deal Number",
                    "A unique identifier that determines exactly how cards are arranged in a game.",
                  ],
                ].map(([term, def]) => (
                  <div
                    key={term}
                    className="bg-[#f0ede5] rounded-lg p-4 border border-[rgba(212,175,55,0.12)]"
                  >
                    <dt className="font-semibold font-serif text-[#2a2522] text-lg mb-3">{term}</dt>
                    <dd className="text-[#5a5a5a] text-sm leading-relaxed">
                      {def}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SuitDivider />

        {/* Section 9: Quick Tips */}
        <section id="tips" className="scroll-mt-6">
          <div className="card-panel">
            <SectionHeading sub="Pro Tips" id="tips-heading" icon={"\u2660"}>
              Quick Tips for Beginners
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-lg font-serif text-[#3a3a3a] leading-[1.75] mb-5">
                Keep these tips in mind as you play your first few games. They
                represent the collected wisdom of experienced FreeCell players and
                will help you build good habits from the start.
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: "\u2660",
                    tip: "Always free up Aces and 2s as early as possible. Low cards belong on foundations, not blocking columns.",
                  },
                  {
                    icon: "\u2665",
                    tip: "Keep free cells empty whenever you can. They are your most precious resource \u2014 filling all four is often a game-ending mistake.",
                  },
                  {
                    icon: "\u2666",
                    tip: "Empty columns are even more powerful than free cells. Creating and preserving empty columns should be a top priority.",
                  },
                  {
                    icon: "\u2663",
                    tip: "Plan several moves ahead before committing. If you can\u2019t explain why you\u2019re making a move, don\u2019t make it.",
                  },
                  {
                    icon: "\u2660",
                    tip: "Prefer building in-suit sequences when possible. They can be sent directly to foundations without being broken apart.",
                  },
                  {
                    icon: "\u2665",
                    tip: "Don\u2019t place Kings in empty columns unless you have a clear reason. Kings are hard to move once placed.",
                  },
                  {
                    icon: "\u2666",
                    tip: "Use the undo button liberally. It\u2019s the fastest way to develop your strategic intuition.",
                  },
                  {
                    icon: "\u2663",
                    tip: "Keep foundation piles roughly balanced. One suit far ahead of the others can block auto-moves for the rest.",
                  },
                ].map(({ icon, tip }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#f0ede5] rounded-lg p-4 border border-[rgba(212,175,55,0.12)]"
                  >
                    <span
                      className={`text-xl shrink-0 mt-0.5 ${
                        icon === "\u2665" || icon === "\u2666"
                          ? "text-red-400"
                          : "text-[#c9a84c]"
                      }`}
                    >
                      {icon}
                    </span>
                    <p className="text-[#3a3a3a] text-sm leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div
            className="card-panel"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              {/* Decorative elements */}
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Play?
              </h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Put your new knowledge to the test. Every deal is solvable — the
                only question is whether you can find the path.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                    backgroundSize: "200% 100%",
                    color: "#1a1a0a",
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Strategy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <footer className="text-center text-sm text-[#6B7280]/60 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/strategy"
              className="hover:text-[#6B7280] transition-colors"
            >
              Strategy Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/faq"
              className="hover:text-[#6B7280] transition-colors"
            >
              FAQ
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/"
              className="hover:text-[#6B7280] transition-colors"
            >
              Play Free
            </Link>
          </div>
          <p className="mt-3 text-white/25">
            &copy; {new Date().getFullYear()} PlayFreeCellOnline.com
          </p>
        </footer>
      </main>
    </div>
  );
}
