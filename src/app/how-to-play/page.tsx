import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Play FreeCell Solitaire | Complete Rules & Tutorial Guide",
  description:
    "Learn how to play FreeCell Solitaire with clear rules, board layout diagrams, card movement examples, and tips to win more games.",
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
      "Learn FreeCell with board layout diagrams, clear rules, and practical tips.",
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
            Same color, not allowed
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
        text: "Store individual cards temporarily in the 4 free cells. Keep them empty when possible. They control how many cards you can move at once.",
      },
      {
        "@type": "HowToStep",
        name: "Build the Foundations",
        text: "Move Aces to foundations, then build up by suit (A, 2, 3...K). Complete all 4 foundations to win the game.",
      },
      {
        "@type": "HowToStep",
        name: "Plan Ahead and Win",
        text: "Think several moves ahead. Use undo freely. Nearly every deal is solvable, so winning comes down to skill and patience.",
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
          Everything you need to know about FreeCell, the card game
          where every deal is solvable and every win is earned.
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
                FreeCell is one of the most popular solitaire card games out
                there. Unlike other solitaire games where hidden cards and random
                draws decide whether you win, FreeCell deals all 52 cards
                face-up from the start. Every game is a test of skill and
                careful thinking, not luck.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                Paul Alfille first programmed it for the PLATO educational
                computer system in 1978. It blew up when Microsoft included it
                in Windows 95, and millions of people got hooked. FreeCell is
                still one of the most-played solitaire games in the world
                because it&apos;s fair, it&apos;s challenging, and winning
                actually feels like you accomplished something.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Nearly every deal is solvable. Of the original 32,000 Microsoft FreeCell deals, only one (deal #11982) has been proven impossible.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                Here&apos;s the thing that hooks people: nearly every deal is
                solvable. Of the original 32,000 Microsoft FreeCell numbered
                deals, only one (deal #11982) has been proven impossible. So
                when you lose, it&apos;s almost always a strategic mistake, not
                bad luck. That&apos;s why winning feels so good and why you keep
                wanting to get better.
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
                The FreeCell board has three areas. Each one does something
                different, and you&apos;ll need to use all three to organize
                the full 52-card deck.
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
                    Four empty spaces in the upper-left corner. Think of them
                    as your breathing room. Each one holds exactly one card.
                    Use them well and you&apos;ll be able to pull off bigger
                    moves and dig out buried cards.
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
                    Four empty spaces in the upper-right corner. You build your
                    completed suits here, from Ace up to King in a single suit.
                    Fill all four foundations and you&apos;ve won.
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
                    where you do most of your work. All 52 cards start here,
                    and your job is to rearrange them.
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
                When a new game starts, all 52 cards get dealt face-up into 8
                columns. The first four columns get 7 cards each (28 total) and
                the last four get 6 cards each (24 total). That covers the
                whole deck.
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
                No stock pile, no draw pile, no hidden cards. You can see
                everything from the very first move. That&apos;s what makes
                FreeCell a game of pure skill instead of chance.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Each game is identified by a unique deal number. Our deals #1 through #32,000 are fully compatible with the original Microsoft FreeCell.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                Each game has a unique deal number that determines the card
                layout. You can replay specific deals to practice, or share
                numbers with friends so you&apos;re both playing the exact same
                hand. Our deals #1 through #32,000 match the original Microsoft
                FreeCell, so you can even look up known solutions online.
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
                FreeCell&apos;s rules are simple to learn but take time to get
                good at. Here are the five core rules you need before your
                first move.
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
                    Alternating colors, descending rank. If you&apos;ve played
                    Klondike (classic) solitaire before, you already know this
                    pattern.
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
                    You can move any single exposed card to an empty free cell.
                    It&apos;s your safety valve when you need to temporarily
                    get a card out of the way. But each free cell only holds
                    one card, and you only have four. Every occupied free cell
                    reduces how many cards you can move at once. Good players
                    use them sparingly and clear them out as fast as they can.
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
                    the four foundations holds one suit: spades ({"\u2660"}),
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
                    In most FreeCell versions (including ours), cards that are
                    safe to play get moved to foundations automatically. Saves
                    you clicks so you can focus on the real decisions.
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
                    When you empty a cascade column completely, you can move any
                    card or valid sequence there. Empty columns are even more
                    valuable than free cells because they hold entire sequences,
                    not just single cards. Each one doubles the number of cards
                    you can move at once. Think twice before filling an empty
                    column, especially with a King, since nothing can go on top
                    of a King in a cascade.
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
                    Technically, FreeCell only lets you move one card at a time.
                    But most computer versions (including ours) let you move a
                    properly ordered sequence (descending rank, alternating
                    colors) in one shot. It works as long as there are enough
                    empty free cells and columns to theoretically do it one card
                    at a time.
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
                Supermoves are a big deal in FreeCell. How many cards you can
                move at once depends on your empty free cells and empty
                columns. Here&apos;s the formula:
              </p>

              <SupermoveFormula />

              <p className="text-[#3a3a3a] leading-[1.75]">
                Say you have 2 empty free cells and 1 empty column. That&apos;s
                (1 + 2) × 2¹ = 6 cards at once. With all 4 free cells empty
                and 2 empty columns, you can move (1 + 4) × 2² = 20 cards in
                one shot. Keeping free cells and columns open gives you way
                more flexibility to reorganize the board.
              </p>

              {/* Pull-quote callout */}
              <div className="border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 pl-5 pr-5 py-4 my-8 rounded-r-lg">
                <p className="text-[#2a2522] leading-[1.75] italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Before attempting a multi-card move, quickly count your empty spaces to make sure the move is actually possible.
                </p>
              </div>

              <p className="text-[#3a3a3a] leading-[1.75]">
                Once you internalize this formula, you&apos;ll read the board
                differently. Before you try a multi-card move, count your
                empty spaces to make sure it&apos;s actually possible. Running
                out of move capacity halfway through a plan is a common way
                to lose.
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
                Ready to play? Here&apos;s how to approach your first game of
                FreeCell, step by step.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <GoldStep n={1} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2660"}</span>Scan the Board
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Before you touch anything, take 30 seconds to look over
                      the whole layout. Where are the Aces? How buried are they?
                      Are any 2s or 3s blocked? Do any columns already have some
                      natural ordering? This quick scan saves you from a lot of
                      dead ends later.
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
                      Aces and 2s need to get to the foundations as soon as you
                      can manage it. Your early moves should focus on uncovering
                      these low cards. If an Ace is buried under six other cards,
                      that column needs your attention first. Plan a sequence of
                      moves to dig it out.
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
                      Move cards between cascades to build descending,
                      alternating-color sequences. Focus on columns where
                      you&apos;ll actually free up important buried cards.
                      Don&apos;t build sequences just because you can. Every
                      move should serve a purpose.
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
                      When Aces become available, move them to the foundations
                      right away. Follow up with 2s, 3s, and so on as they open
                      up. Building foundations early frees up space in the
                      cascades and gets you closer to winning.
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
                      Keep track of your empty free cells and columns. Every
                      card you park in a free cell limits how many cards you can
                      move at once. Only use free cells when you have to, and
                      clear them out quickly. If you create an empty column,
                      protect it. It&apos;s your most valuable resource.
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
                      Before each move, ask yourself: &quot;What does this
                      open up?&quot; Try to see 3 to 5 moves ahead. If a
                      sequence of moves doesn&apos;t lead somewhere productive
                      (freeing a key card, creating an empty column, or building
                      foundations), reconsider. Good players think in chains, not
                      single moves.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <GoldStep n={7} />
                  <div>
                    <h3 className="font-semibold font-serif text-[#2a2522] text-lg mb-3">
                      <span className="text-[#c9a84c] mr-1.5">{"\u2666"}</span>Use Undo Freely. It&apos;s How You Learn
                    </h3>
                    <p className="text-[#3a3a3a] leading-[1.75]">
                      Stuck? Hit undo. Made a mistake? Hit undo. It&apos;s not
                      cheating. It&apos;s the best way to learn. Try a sequence,
                      see what happens, undo if it didn&apos;t work, and try
                      something else. Over time, you&apos;ll start spotting dead
                      ends before you reach them.
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
                You win when all 52 cards are on the four foundation piles,
                each containing a complete suit from Ace through King. The
                game detects your win automatically, and often the final cards
                cascade to the foundations on their own once the outcome is
                certain.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                About 99.999% of FreeCell deals are solvable, so winning is
                almost always possible if you play well enough. Beginners
                typically win around 40-50% of their games. Intermediate
                players hit 70-80%. Experts consistently clear 90%+.
              </p>
              <p className="text-[#3a3a3a] leading-[1.75]">
                Every loss teaches you something because you know it was a
                strategic mistake, not bad luck. That&apos;s why FreeCell is so
                addictive. There&apos;s always room to improve, and a
                hard-earned win actually feels like you did something.
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
                These are the terms you&apos;ll see in strategy guides and
                FreeCell discussions. Worth knowing so you can follow along.
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
                    "The entire playing area containing all 8 cascades. Your main workspace.",
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
                    "The bottom card of a cascade. It's the only card in the column you can move.",
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
                Keep these in mind for your first few games. They&apos;ll help
                you build good habits early.
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: "\u2660",
                    tip: "Always free up Aces and 2s as early as possible. Low cards belong on foundations, not blocking columns.",
                  },
                  {
                    icon: "\u2665",
                    tip: "Keep free cells empty whenever you can. Filling all four is often a game-ending mistake.",
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
                You know the rules. Every deal is solvable. The only question
                is whether you can find the path.
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
