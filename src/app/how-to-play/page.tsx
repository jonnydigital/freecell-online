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
      <div className="w-11 h-[3.75rem] rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-sm">
        {suit}
      </div>
    );
  }
  return (
    <div
      className={`w-11 h-[3.75rem] rounded-lg shadow-sm border flex flex-col items-center justify-center font-bold leading-none select-none
        ${isRed ? "bg-white text-red-600 border-red-100" : "bg-white text-gray-900 border-gray-100"}
        ${glow ? "ring-2 ring-[#072907] ring-offset-1" : ""}`}
    >
      <span className="text-sm">{rank}</span>
      <span className="text-[10px] mt-0.5">{suit}</span>
    </div>
  );
}

function BoardDiagram() {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 my-8 overflow-x-auto">
      <div className="flex justify-between items-start gap-8 min-w-[500px]">
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Free Cells</div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-16 rounded-lg border-2 border-dashed border-gray-200 bg-white/50" />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Foundations</div>
          <div className="flex gap-2">
            {(["\u2660", "\u2665", "\u2666", "\u2663"] as const).map((suit) => (
              <div key={suit} className="w-12 h-16 rounded-lg border-2 border-dashed border-gray-200 bg-white/50 flex items-center justify-center text-gray-300">
                {suit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 text-center">8 Cascades (Tableau)</div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="w-12 h-32 rounded-lg border border-gray-100 bg-white/30" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorAlternationDiagram() {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 my-6 flex flex-col sm:flex-row items-center justify-center gap-12">
      <div className="text-center">
        <div className="text-[10px] font-bold text-green-600 uppercase mb-4 tracking-widest">Valid Move</div>
        <div className="flex flex-col items-center">
          <MiniCard rank="6" suit={"\u2660"} />
          <div className="-mt-8">
            <MiniCard rank="5" suit={"\u2665"} glow />
          </div>
        </div>
      </div>
      <div className="text-center opacity-40">
        <div className="text-[10px] font-bold text-red-600 uppercase mb-4 tracking-widest">Invalid Move</div>
        <div className="flex flex-col items-center">
          <MiniCard rank="9" suit={"\u2660"} />
          <div className="-mt-8">
            <MiniCard rank="8" suit={"\u2663"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SupermoveFormula() {
  return (
    <div className="bg-[#072907] text-white rounded-2xl p-10 my-8 text-center">
      <div className="text-[10px] font-bold text-[#D4AF37] uppercase mb-6 tracking-widest">The Supermove Formula</div>
      <div className="text-3xl md:text-4xl font-black mb-6">
        (1 + Free Cells) &times; 2<sup>Empty Columns</sup>
      </div>
      <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
        This calculation determines the maximum number of cards you can move in a single sequence. Keeping spaces open is your greatest strategic advantage.
      </p>
    </div>
  );
}

export default function HowToPlayPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play FreeCell Solitaire",
    description: "Complete guide to playing FreeCell Solitaire. Learn the rules, board layout, and strategies.",
    step: [
      { "@type": "HowToStep", name: "Understand the Board", text: "The board consists of 4 free cells, 4 foundations, and 8 cascades." },
      { "@type": "HowToStep", name: "Build Cascades", text: "Arrange cards in descending rank and alternating colors." },
      { "@type": "HowToStep", name: "Win", text: "Move all cards to foundations by suit from Ace to King." }
    ],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      {/* ── Header ── */}
      <header className="bg-[#072907] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            How to Play.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            Master the subtle art of FreeCell with our definitive guide to rules, mechanics, and winning probability.
          </p>
        </div>
      </header>

      {/* ── Sticky Nav ── */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <div className="max-w-4xl mx-auto px-6 py-5 flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 overflow-x-auto no-scrollbar">
          <a href="#what-is-freecell" className="hover:text-[#072907] transition-colors whitespace-nowrap">Introduction</a>
          <a href="#the-board" className="hover:text-[#072907] transition-colors whitespace-nowrap">The Board</a>
          <a href="#rules" className="hover:text-[#072907] transition-colors whitespace-nowrap">Rules</a>
          <a href="#supermoves" className="hover:text-[#072907] transition-colors whitespace-nowrap">Supermoves</a>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <article className="prose prose-xl prose-gray max-w-none">
          <section id="what-is-freecell" className="mb-32 scroll-mt-32">
            <h2 className="text-4xl font-black mb-8 text-[#072907] tracking-tight">What is FreeCell?</h2>
            <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
              <p>
                FreeCell is a solitaire card game that defines itself through perfect information. Unlike Klondike, where hidden cards introduce an element of chance, FreeCell deals the entire 52-card deck face-up.
              </p>
              <p>
                This transparency transforms the game from a test of luck into a test of pure logic. Statistically, 99.99% of deals are solvable. Every win is earned, and every loss is a lesson in foresight.
              </p>
            </div>
          </section>

          <section id="the-board" className="mb-32 scroll-mt-32">
            <h2 className="text-4xl font-black mb-8 text-[#072907] tracking-tight">Understanding the Board</h2>
            <p className="text-gray-500 mb-12 text-lg">
              The layout is designed for efficiency. Mastering the board's zones is the first step toward advanced play.
            </p>
            <BoardDiagram />
          </section>

          <section id="rules" className="mb-32 scroll-mt-32">
            <h2 className="text-4xl font-black mb-12 text-[#072907] tracking-tight">Rules of Engagement</h2>
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">01. Alternating Sequences</h3>
                <p className="text-gray-500 mb-8">Move cards between columns in descending rank and alternating colors. A Black 10 must be placed on a Red Jack.</p>
                <ColorAlternationDiagram />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">02. Foundation Building</h3>
                <p className="text-gray-500">Move Aces to the foundation piles. Build each suit upward sequentially: A, 2, 3... K. Once all 52 cards are on foundations, the game is won.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">03. Space Management</h3>
                <p className="text-gray-500">The four Free Cells serve as temporary holding zones. Every occupied cell reduces your mobility. Keep them clear to enable complex maneuvers.</p>
              </div>
            </div>
          </section>

          <section id="supermoves" className="mb-32 scroll-mt-32">
            <h2 className="text-4xl font-black mb-8 text-[#072907] tracking-tight">The Supermove</h2>
            <p className="text-gray-500 mb-12 text-lg leading-relaxed">
              Modern FreeCell engines allow you to move entire sequences at once. This isn't a shortcut—it's a calculation of your available empty spaces.
            </p>
            <SupermoveFormula />
          </section>
        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter mb-12 inline-block">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-16">
            <Link href="/strategy" className="hover:text-black transition-colors">Strategy</Link>
            <Link href="/rules" className="hover:text-black transition-colors">Rules</Link>
            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          </div>
          <p className="text-gray-300 text-[10px] uppercase tracking-[0.2em]">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
