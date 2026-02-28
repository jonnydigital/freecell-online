import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreeCell Glossary | Card Game Terms & Definitions",
  description:
    "Complete glossary of FreeCell and Solitaire terms. Learn what tableau, cascade, foundation, free cell, stock, waste pile, and more mean.",
  keywords: [
    "freecell glossary",
    "solitaire terms",
    "card game terminology",
    "tableau definition",
    "cascade cards",
    "foundation pile",
    "free cell meaning",
    "solitaire glossary",
  ],
  openGraph: {
    title: "FreeCell Glossary | Card Game Terms & Definitions",
    description:
      "Complete glossary of FreeCell and Solitaire card game terms with clear definitions.",
    url: "https://playfreecellonline.com/glossary",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── Glossary data ── */

interface Term {
  term: string;
  id: string;
  definition: React.ReactNode;
}

const GLOSSARY: Term[] = [
  {
    term: "Ascending Order",
    id: "ascending-order",
    definition: (
      <>
        Cards arranged from lowest to highest rank: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King.{" "}
        <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">Foundation piles</Link> are always built in ascending order, starting with the Ace and ending with the King.
      </>
    ),
  },
  {
    term: "Auto-Complete",
    id: "auto-complete",
    definition: (
      <>
        A feature that automatically moves cards to the foundation piles when no other useful moves remain. In our game, auto-complete activates when all remaining cards can be sent to the foundations in sequence. It saves you from clicking through the final moves of an already-won game.
      </>
    ),
  },
  {
    term: "Build (Building)",
    id: "build",
    definition: (
      <>
        The act of placing cards on top of each other in a valid sequence. In FreeCell, you build <em>down</em> by alternating colors in the tableau (e.g., a black 7 on a red 8) and <em>up</em> by suit on the{" "}
        <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">foundations</Link>. Building efficiently is the core of{" "}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">FreeCell strategy</Link>.
      </>
    ),
  },
  {
    term: "Cascade",
    id: "cascade",
    definition: (
      <>
        The overlapping column of face-up cards in the tableau. FreeCell starts with eight cascades. Only the bottom (exposed) card of each cascade can be moved individually, though{" "}
        <a href="#supermove" className="text-[#D4AF37] hover:underline">supermoves</a> allow moving ordered sequences if enough empty spaces exist.
      </>
    ),
  },
  {
    term: "Column",
    id: "column",
    definition: (
      <>
        Another name for a <a href="#cascade" className="text-[#D4AF37] hover:underline">cascade</a>. FreeCell has eight columns where cards are dealt at the start of the game. An empty column is extremely valuable — it functions like an extra free cell that can hold an entire sequence of cards. See our{" "}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">strategy guide</Link> for tips on using empty columns.
      </>
    ),
  },
  {
    term: "Daily Challenge",
    id: "daily-challenge",
    definition: (
      <>
        A specific FreeCell deal that changes every day and is the same for all players. Daily challenges let you compete with others on the same board, track your streak, and compare solve times. Try today&apos;s{" "}
        <Link href="/" className="text-[#D4AF37] hover:underline">daily challenge</Link> and see how you stack up.
      </>
    ),
  },
  {
    term: "Deal",
    id: "deal",
    definition: (
      <>
        The initial layout of cards on the board. In FreeCell, all 52 cards are dealt face-up into eight columns at the start — there are no hidden cards. Each unique deal is identified by a{" "}
        <a href="#game-number" className="text-[#D4AF37] hover:underline">game number</a> (seed). Nearly all FreeCell deals are solvable, with only a handful of exceptions among the classic 32,000 deals.
      </>
    ),
  },
  {
    term: "Descending Order",
    id: "descending-order",
    definition: (
      <>
        Cards arranged from highest to lowest rank: King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2, Ace. In FreeCell&apos;s tableau, you build cascades in descending order with alternating colors.
      </>
    ),
  },
  {
    term: "Foundation",
    id: "foundation",
    definition: (
      <>
        The four piles in the upper-right corner where you build each suit in ascending order from Ace to King. Moving all 52 cards to the foundations is the goal of the game. Also called{" "}
        <a href="#home-cell" className="text-[#D4AF37] hover:underline">home cells</a>. Learn the basics in our{" "}
        <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">how to play guide</Link>.
      </>
    ),
  },
  {
    term: "Free Cell",
    id: "free-cell",
    definition: (
      <>
        One of four temporary storage spaces in the upper-left corner of the board. Each free cell can hold exactly one card at a time. Free cells give FreeCell its name and its unique strategic depth — they&apos;re your most valuable resource. Keeping them empty is{" "}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">strategy tip #1</Link> for beginners.
      </>
    ),
  },
  {
    term: "Game Number (Seed)",
    id: "game-number",
    definition: (
      <>
        A unique number that identifies a specific card arrangement. Entering the same game number always produces the same deal, making it possible to share challenges, replay boards, and compare strategies with other players. See also{" "}
        <a href="#seed" className="text-[#D4AF37] hover:underline">seed</a>.
      </>
    ),
  },
  {
    term: "Hint",
    id: "hint",
    definition: (
      <>
        An in-game feature that suggests a good next move when you&apos;re stuck. Our hint system uses a heuristic solver to find productive moves — it won&apos;t just show any legal move, it tries to show a <em>useful</em> one. Using hints is a great way to learn{" "}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">strategy patterns</Link>.
      </>
    ),
  },
  {
    term: "Home Cell",
    id: "home-cell",
    definition: (
      <>
        Another name for a <a href="#foundation" className="text-[#D4AF37] hover:underline">foundation</a> pile. The term &quot;home cell&quot; emphasizes that these piles are where cards ultimately belong — their &quot;home.&quot; Used interchangeably with foundation in most FreeCell documentation.
      </>
    ),
  },
  {
    term: "In-Suit Sequence",
    id: "in-suit-sequence",
    definition: (
      <>
        A run of cards that are both in order and share the same suit (e.g., 9♠ 8♠ 7♠). In-suit sequences are more valuable than mixed-color sequences because they can move directly to the{" "}
        <a href="#foundation" className="text-[#D4AF37] hover:underline">foundation</a> without being taken apart. Building in-suit when possible is an{" "}
        <Link href="/strategy#intermediate" className="text-[#D4AF37] hover:underline">intermediate strategy</Link>.
      </>
    ),
  },
  {
    term: "Move",
    id: "move",
    definition: (
      <>
        The act of transferring one or more cards from one location to another. In FreeCell, valid moves include: placing a card on a cascade (descending, alternating color), moving a card to a free cell, moving a card to a foundation, or using a{" "}
        <a href="#supermove" className="text-[#D4AF37] hover:underline">supermove</a> to transfer a sequence. Your total move count is tracked as a measure of efficiency.
      </>
    ),
  },
  {
    term: "Pile",
    id: "pile",
    definition: (
      <>
        A general term for any stack of cards on the board. In FreeCell, you work with three types of piles: <a href="#cascade" className="text-[#D4AF37] hover:underline">cascades</a> (the main columns), <a href="#foundation" className="text-[#D4AF37] hover:underline">foundations</a> (the goal piles), and <a href="#free-cell" className="text-[#D4AF37] hover:underline">free cells</a> (single-card temporary storage).
      </>
    ),
  },
  {
    term: "Rank",
    id: "rank",
    definition: (
      <>
        The value of a card: Ace (low), 2 through 10, Jack, Queen, King (high). Rank determines where a card can be placed — cascades are built by descending rank, foundations by ascending rank. There are 13 ranks in a standard deck, with four cards of each rank (one per suit).
      </>
    ),
  },
  {
    term: "Seed",
    id: "seed",
    definition: (
      <>
        See <a href="#game-number" className="text-[#D4AF37] hover:underline">Game Number</a>. The seed is the number used by the random number generator to produce a specific deal. Same seed always equals the same card layout.
      </>
    ),
  },
  {
    term: "Sequence",
    id: "sequence",
    definition: (
      <>
        A series of cards arranged in consecutive rank order. In FreeCell cascades, valid sequences alternate colors and descend in rank (e.g., red 9, black 8, red 7). An{" "}
        <a href="#in-suit-sequence" className="text-[#D4AF37] hover:underline">in-suit sequence</a> is the same concept but with all cards sharing one suit.
      </>
    ),
  },
  {
    term: "Stock",
    id: "stock",
    definition: (
      <>
        In many solitaire games, the stock is the face-down pile of undealt cards that you draw from during play. FreeCell does <em>not</em> have a stock — all 52 cards are dealt face-up at the start, which is what makes it a game of pure skill rather than luck.
      </>
    ),
  },
  {
    term: "Suit",
    id: "suit",
    definition: (
      <>
        One of four categories in a standard deck: Spades (♠), Hearts (♥), Diamonds (♦), and Clubs (♣). Spades and clubs are black; hearts and diamonds are red. Each{" "}
        <a href="#foundation" className="text-[#D4AF37] hover:underline">foundation</a> pile collects one complete suit from Ace to King.
      </>
    ),
  },
  {
    term: "Supermove",
    id: "supermove",
    definition: (
      <>
        A convenience feature that lets you move an entire ordered sequence of cards in one action, rather than moving them one at a time through free cells and empty columns. The number of cards you can supermove equals (1 + empty free cells) × 2<sup>empty columns</sup>. Understanding supermoves is key to{" "}
        <Link href="/strategy#advanced" className="text-[#D4AF37] hover:underline">advanced play</Link>.
      </>
    ),
  },
  {
    term: "Tableau",
    id: "tableau",
    definition: (
      <>
        The main playing area consisting of all eight <a href="#cascade" className="text-[#D4AF37] hover:underline">cascades</a> (columns). The tableau is where most of the action happens — you rearrange cards here to uncover buried low cards and build sequences. In FreeCell, the entire tableau is visible from the start, giving you complete information to plan your{" "}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">strategy</Link>.
      </>
    ),
  },
  {
    term: "Undo",
    id: "undo",
    definition: (
      <>
        A feature that reverses your last move, letting you take back mistakes and try different approaches. In FreeCell, unlimited undo is standard and encouraged — it&apos;s not cheating, it&apos;s{" "}
        <Link href="/strategy#beginner" className="text-[#D4AF37] hover:underline">one of the best learning tools</Link> available. Exploring and undoing multiple paths builds the intuition that separates beginners from experts.
      </>
    ),
  },
  {
    term: "Waste Pile",
    id: "waste-pile",
    definition: (
      <>
        In solitaire games with a <a href="#stock" className="text-[#D4AF37] hover:underline">stock</a>, the waste pile is where drawn cards land face-up. FreeCell does not have a waste pile since all cards are dealt to the tableau at the start. You may encounter this term in other solitaire variants like Klondike.
      </>
    ),
  },
  {
    term: "Win Rate",
    id: "win-rate",
    definition: (
      <>
        The percentage of games you win out of total games played. Since nearly every FreeCell deal is solvable, win rate is a direct measure of skill. Beginners typically win 30–50%, while experts reach 90%+. Check our{" "}
        <Link href="/strategy#benchmarks" className="text-[#D4AF37] hover:underline">win rate benchmarks</Link> to see where you stand.
      </>
    ),
  },
];

/* Group terms by first letter */
function groupByLetter(terms: Term[]): Map<string, Term[]> {
  const map = new Map<string, Term[]>();
  for (const t of terms) {
    const letter = t.term[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(t);
  }
  return map;
}

export default function GlossaryPage() {
  const grouped = groupByLetter(GLOSSARY);
  const letters = Array.from(grouped.keys()).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "FreeCell & Solitaire Glossary",
    description:
      "Complete glossary of FreeCell and Solitaire card game terms and definitions.",
    url: "https://playfreecellonline.com/glossary",
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `https://playfreecellonline.com/glossary#${t.id}`,
    })),
  };

  return (
    <div className="h-screen overflow-y-auto scroll-smooth felt-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        {/* Decorative suit watermarks */}
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>

        {/* Breadcrumbs */}
        <nav
          className="max-w-4xl mx-auto mb-8 text-sm text-[#6B7280]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link href="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">Glossary</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Glossary
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Every card game term you need to know, from Ace to Win Rate.
          Clear definitions with links to strategy and rules.
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

      {/* ── Letter Navigation ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-transparent text-sm font-bold text-[#D4AF37] flex items-center justify-center transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
            >
              {letter}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-6">
            <div className={CARD} style={CARD_TOP}>
              {/* Letter heading */}
              <div className="px-8 sm:px-10 md:px-12 pt-8 pb-0">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {letter}
                </h2>
                <div className="card-title-separator mt-4" />
              </div>

              <div className="px-8 sm:px-10 md:px-12 py-6 space-y-6">
                {grouped.get(letter)!.map((t) => (
                  <div key={t.id} id={t.id} className="scroll-mt-20">
                    <h3
                      className="text-lg font-semibold text-[#2a2522] mb-1.5"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {t.term}
                    </h3>
                    <p className="text-[#444444] leading-relaxed">{t.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── CTA ── */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Play?
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Now that you know the terminology, put your knowledge to work.
                Every term here comes alive once you&apos;re at the table.
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
                  Learn Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <footer className="text-center text-sm text-[#6B7280]/60 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-to-play" className="hover:text-[#6B7280] transition-colors">
              How to Play
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/strategy" className="hover:text-[#6B7280] transition-colors">
              Strategy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/faq" className="hover:text-[#6B7280] transition-colors">
              FAQ
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/" className="hover:text-[#6B7280] transition-colors">
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
