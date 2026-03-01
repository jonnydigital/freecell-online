import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreeCell Strategy Guide | How to Win FreeCell — Beginner to Expert Tips",
  description: "Master FreeCell strategy with this comprehensive guide. Beginner tips, intermediate tactics, advanced techniques, and common mistakes to avoid.",
  keywords: ["freecell strategy", "how to win freecell", "freecell tips", "freecell guide"],
};

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      {/* ── Header ── */}
      <header className="bg-[#072907] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Strategy.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            The difference between a 50% win rate and 90%+ is pure strategy. Learn the logic of the solve.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <article className="prose prose-xl prose-gray max-w-none">
          <section className="mb-24">
            <h2 className="text-4xl font-black mb-8 text-[#072907]">The Three Laws</h2>
            <div className="grid md:grid-cols-3 gap-12 not-prose">
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-xl font-bold">Preserve Space</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Every filled free cell halves your capacity. Keep your workspace open at all costs.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-xl font-bold">Think in Chains</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Don't move a card without knowing the next three moves it enables. Foresight is your only tool.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-xl font-bold">Exhume Low Cards</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Aces buried 6 cards deep are emergencies. Dig them out early to start the win cascade.</p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-black mb-8 text-[#072907]">Beginner Tactics</h2>
            <div className="space-y-12 text-gray-500 text-lg leading-relaxed">
              <p>
                <strong>01. Don't build long sequences too early.</strong> A sequence of 5 cards looks great, but it locks up an entire column. Only stack what you need to move.
              </p>
              <p>
                <strong>02. Value empty columns over free cells.</strong> An empty column can hold a sequence and doubles your move capacity. A free cell only holds one card.
              </p>
              <p>
                <strong>03. Use Undo as a learning tool.</strong> If you hit a dead end, backtrack. FreeCell is about finding paths, and undo lets you explore them all risk-free.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl font-black mb-8 text-[#072907]">Expert Play</h2>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 not-prose">
              <h3 className="text-xl font-bold mb-4">The Opening Scan</h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Spend the first 30 seconds of any game without touching a card. Identify the location of every Ace, find the cleanest columns, and map out your first 5 moves. High-level FreeCell is won in the first minute of observation.
              </p>
              <Link href="/" className="text-[#072907] font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                Practice an opening scan now →
              </Link>
            </div>
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
            <Link href="/how-to-play" className="hover:text-black transition-colors">How to Play</Link>
            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
          </div>
          <p className="text-gray-300 text-[10px] uppercase tracking-[0.2em]">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
