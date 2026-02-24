import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreeCell Strategy Guide | Tips to Win More Games',
  description:
    'Master FreeCell with proven strategies and tips. From beginner basics to advanced techniques, improve your win rate with our comprehensive strategy guide.',
};

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white/70">← Back to Game</Link>
          {' · '}
          <Link href="/how-to-play" className="hover:text-white/70">Rules</Link>
          {' · '}
          <Link href="/faq" className="hover:text-white/70">FAQ</Link>
        </nav>

        <h1 className="text-4xl font-bold mb-4">FreeCell Strategy Guide</h1>
        <p className="text-white/70 text-lg mb-10">
          Nearly every FreeCell deal is solvable. The difference between a 50% win rate and a 90%+
          win rate is strategy. Here are the techniques that separate beginners from experts.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">🟢 Beginner Tips</h2>
          <div className="space-y-4 text-white/80">
            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">1. Free Up Aces and 2s First</h3>
              <p>Before making any other moves, scan the board for Aces and 2s that are buried.
              These cards need to reach the foundation as soon as possible. Every move you make should
              be working toward uncovering them.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">2. Keep Free Cells Empty</h3>
              <p>Free cells are your most important resource. Every occupied free cell reduces
              the number of cards you can move at once. Resist the urge to use them early —
              you&#39;ll need them later for critical moves.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">3. Empty Columns Are Gold</h3>
              <p>An empty cascade column is even more powerful than a free cell because it can
              hold a sequence, not just one card. The formula for maximum movable cards doubles
              with each empty column. Protect your empty columns.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">4. Use Undo Liberally</h3>
              <p>The Undo button is your best learning tool. Try a sequence of moves — if it
              doesn&#39;t work, undo and try a different approach. Over time, you&#39;ll develop
              the ability to see these dead ends before you reach them.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">🟡 Intermediate Strategy</h2>
          <div className="space-y-4 text-white/80">
            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">5. Build In-Suit When Possible</h3>
              <p>When you have a choice between building a sequence with alternating suits or
              keeping cards in the same suit, prefer same-suit. Why? Same-suit sequences can be
              moved directly to the foundation, while mixed sequences need to be broken apart first.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">6. Plan 5-10 Moves Ahead</h3>
              <p>Before every move, think about where it leads. Ask yourself: &quot;After this move,
              what move does it enable? And what does THAT enable?&quot; The best players see chains
              of moves, not individual actions.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">7. Don&#39;t Build Long Sequences Too Early</h3>
              <p>A long descending sequence looks satisfying, but it locks up a column. You can&#39;t
              access any cards underneath. Build sequences only when they&#39;re useful for your
              overall plan, not just because the move is available.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">8. Watch the Foundation Balance</h3>
              <p>Try to keep your four foundation piles roughly equal in height. If one suit gets
              far ahead of the others, you may find yourself unable to auto-move cards because the
              cards they depend on haven&#39;t reached their foundations yet.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">🔴 Advanced Techniques</h2>
          <div className="space-y-4 text-white/80">
            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">9. The Opening Scan</h3>
              <p>Before making your first move, scan the entire board. Identify: Where are the
              Aces? Which cards are deeply buried? Which columns have the most ordered sequences?
              Are there any columns that are close to being emptied? This 30-second investment
              saves minutes of undo-ing later.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">10. Reversibility Principle</h3>
              <p>When choosing between two moves, prefer the one that&#39;s more easily reversed.
              Moving to a free cell can always be undone. Moving a King to an empty column is
              essentially permanent (that column is now occupied for a long time). Reversible
              moves keep your options open.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">11. The Cascade Shuffle</h3>
              <p>Sometimes you need to temporarily move an entire cascade to free cells and
              empty columns, perform an operation, then move everything back. This is the most
              advanced technique and requires careful counting of available moves. Remember:
              (1 + free cells) × 2^(empty columns) = max movable cards.</p>
            </div>

            <div className="bg-[#1a5c1a]/20 rounded-lg p-5 border border-[#1a5c1a]/30">
              <h3 className="font-semibold text-white mb-2">12. Know When to Resign</h3>
              <p>If you&#39;ve filled all 4 free cells and have no empty columns, you&#39;re often
              (but not always) stuck. Before giving up, carefully check every possible move. But
              sometimes the best strategy is recognizing a lost position early and starting a
              new game rather than wasting time.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">❌ Common Mistakes</h2>
          <ul className="space-y-3 text-white/80 ml-6 list-disc">
            <li><strong className="text-white">Filling free cells too early</strong> — This is the #1 beginner mistake. Every filled free cell reduces your flexibility.</li>
            <li><strong className="text-white">Moving cards without a plan</strong> — If you can&#39;t explain why you&#39;re making a move, don&#39;t make it.</li>
            <li><strong className="text-white">Ignoring buried low cards</strong> — An Ace buried under 6 cards is an emergency. Deal with it.</li>
            <li><strong className="text-white">Building Kings to empty columns too early</strong> — A King in an empty column is hard to move. Make sure you actually need that column arrangement.</li>
            <li><strong className="text-white">Not using Undo</strong> — Undo isn&#39;t cheating; it&#39;s learning. Use it.</li>
          </ul>
        </section>

        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded-lg text-white font-medium transition-colors"
          >
            Practice These Strategies →
          </Link>
          <Link
            href="/how-to-play"
            className="px-6 py-3 border border-[#1a5c1a] hover:bg-[#1a5c1a]/30 rounded-lg text-white font-medium transition-colors"
          >
            Learn the Rules →
          </Link>
        </div>
      </div>
    </div>
  );
}
