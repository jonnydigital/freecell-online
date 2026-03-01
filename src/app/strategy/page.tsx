import Link from "next/link";
import type { Metadata } from "next";
import AdUnit from "../../components/AdUnit";

export const metadata: Metadata = {
  title: "FreeCell Strategy Guide | How to Win FreeCell — Beginner to Expert Tips",
  description: "Master FreeCell strategy with this comprehensive guide. Beginner tips, intermediate tactics, advanced techniques, and common mistakes to avoid.",
  keywords: ["freecell strategy", "how to win freecell", "freecell tips", "freecell guide"],
};

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      {/* ── Header ── */}
      <header className="bg-[#072907] text-white pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <Link href="/" className="text-sm font-black uppercase tracking-widest mb-8 hover:text-[#D4AF37] transition-colors">
          Freecell<span className="text-[#D4AF37]">.</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Strategy
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          The difference between a 50% win rate and 90%+ is pure strategy. Learn the logic of the solve.
        </p>
      </header>

      {/* ── Main Content (Article Card) ── */}
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 relative -mt-8 mb-20 z-10">
        <article className="max-w-none">
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">The Three Laws</h2>
            <div className="grid md:grid-cols-3 gap-8 not-prose">
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">Preserve Space</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Every filled free cell halves your capacity. Keep your workspace open at all costs.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">Think in Chains</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Don't move a card without knowing the next three moves it enables. Foresight is your only tool.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">Exhume Low Cards</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Aces buried 6 cards deep are emergencies. Dig them out early to start the win cascade.</p>
              </div>
            </div>
          </section>

          <AdUnit className="my-8" />

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Beginner Tactics</h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <p>
                <strong className="text-gray-900">01. Don't build long sequences too early.</strong> A sequence of 5 cards looks great, but it locks up an entire column. Only stack what you need to move.
              </p>
              <p>
                <strong className="text-gray-900">02. Value empty columns over free cells.</strong> An empty column can hold a sequence and doubles your move capacity. A free cell only holds one card.
              </p>
              <p>
                <strong className="text-gray-900">03. Use Undo as a learning tool.</strong> If you hit a dead end, backtrack. FreeCell is about finding paths, and undo lets you explore them all risk-free.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Expert Play</h2>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 not-prose">
              <h3 className="text-xl font-bold mb-3 text-gray-800">The Opening Scan</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Spend the first 30 seconds of any game without touching a card. Identify the location of every Ace, find the cleanest columns, and map out your first 5 moves. High-level FreeCell is won in the first minute of observation.
              </p>
              <Link href="/" className="text-[#072907] font-bold text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
                Practice an opening scan now →
              </Link>
            </div>
          </section>
        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-lg font-black uppercase tracking-widest mb-8 inline-block">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
            <Link href="/how-to-play" className="hover:text-black transition-colors">How to Play</Link>
            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
