'use client';

import DomGameShell from '@/components/dom-freecell/DomGameShell';
import '@/components/dom-freecell/dom-card-styles.css';

export default function DomFreecellPage() {
  return (
    <div className="min-h-dvh bg-[#0a1f0a]">
      {/* ── Above the fold: game + ad sidebar ── */}
      <div className="flex w-full h-dvh">
        {/* Game — takes available space */}
        <div className="flex-1 min-w-0">
          <DomGameShell />
        </div>

        {/* Ad sidebar — 300px, hidden on narrow screens */}
        <div className="hidden xl:flex flex-col w-[300px] flex-shrink-0 gap-3 p-3">
          <div
            className="w-full h-[250px] rounded-lg flex items-center justify-center text-white/20 text-xs"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)' }}
          >
            Ad Unit — 300×250
          </div>
          <div
            className="w-full flex-1 rounded-lg flex items-center justify-center text-white/20 text-xs"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)' }}
          >
            Ad Unit — 300×600
          </div>
        </div>
      </div>

      {/* ── Below the fold: SEO content ── */}
      <div className="bg-[#072907]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-white/80 space-y-12" style={{ fontFamily: 'system-ui, sans-serif' }}>

          <section>
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#D4AF37' }}>
              Play FreeCell Online — Free, No Download
            </h1>
            <p className="text-lg leading-relaxed">
              FreeCell is one of the most popular solitaire card games in the world, and one of the few where nearly every deal is winnable.
              Unlike Klondike (the classic &ldquo;Solitaire&rdquo;), all 52 cards are dealt face-up from the start, making FreeCell a game of
              pure strategy rather than luck. Our free online version features numbered deals, unlimited undo, a built-in solver, and full
              statistics tracking — all in your browser with no download or signup required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D4AF37' }}>
              How to Play FreeCell
            </h2>
            <p className="leading-relaxed mb-4">
              The goal of FreeCell is to move all 52 cards to the four foundation piles, building each suit from Ace to King.
              Cards are arranged in eight cascading columns (the tableau), with four free cells in the upper left and four
              foundations in the upper right.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Tableau rule:</strong> Build columns in descending order, alternating colors (e.g., black 7 on red 8).</li>
              <li><strong>Free cells:</strong> Temporarily hold one card each. Use them strategically to free buried cards.</li>
              <li><strong>Foundations:</strong> Build up by suit from Ace to King. Cards on foundations are locked in place.</li>
              <li><strong>Moving sequences:</strong> You can move ordered runs of cards if enough free cells and empty columns are available.</li>
              <li><strong>Winning:</strong> Move all 52 cards to foundations to win the game.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D4AF37' }}>
              FreeCell Strategy Tips
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Plan ahead:</strong> All cards are visible, so think several moves ahead before acting.</li>
              <li><strong>Keep free cells open:</strong> The more free cells available, the larger the sequences you can move.</li>
              <li><strong>Empty columns are powerful:</strong> An empty tableau column is even more valuable than a free cell — it doubles your moving power.</li>
              <li><strong>Uncover Aces and Twos early:</strong> Getting low cards to foundations quickly opens up the board.</li>
              <li><strong>Don&apos;t fill free cells too early:</strong> Reserve them for critical moments when you need to access buried cards.</li>
              <li><strong>Build on Kings carefully:</strong> A King in an empty column is hard to move, so commit to a column strategy early.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D4AF37' }}>
              Is Every FreeCell Game Winnable?
            </h2>
            <p className="leading-relaxed mb-4">
              Nearly — but not quite. Of the original Microsoft FreeCell numbered deals (1 through 32,000), only one deal (#11982) is
              known to be unsolvable. Overall, expert-level play can win approximately 99.999% of randomly dealt FreeCell games.
              This near-perfect solvability is what makes FreeCell uniquely satisfying: when you lose, it&apos;s almost always because of a
              strategic mistake, not bad luck.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D4AF37' }}>
              FreeCell vs. Other Solitaire Games
            </h2>
            <p className="leading-relaxed mb-4">
              FreeCell stands apart from other solitaire variants in several important ways:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>vs. Klondike:</strong> Klondike deals cards face-down, introducing luck. FreeCell is fully open-information — pure skill.</li>
              <li><strong>vs. Spider:</strong> Spider Solitaire uses multiple decks and suit-based building. FreeCell uses one deck with alternating-color builds.</li>
              <li><strong>vs. Baker&apos;s Game:</strong> Baker&apos;s Game is the same layout as FreeCell but requires same-suit building instead of alternating colors, making it significantly harder.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#D4AF37' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white/90">Is this game really free?</h3>
                <p className="text-white/70">Yes — completely free, no download, no signup, no hidden fees. Play directly in your browser.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90">Can I play on my phone?</h3>
                <p className="text-white/70">Yes. The game is fully responsive and works on phones, tablets, and desktops.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90">What does the game number mean?</h3>
                <p className="text-white/70">Each game number produces the same deal every time. You can share a game number with friends and compete on the same hand.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white/90">How is the star rating calculated?</h3>
                <p className="text-white/70">3 stars for completing a game in 60 moves or fewer, 2 stars for 90 or fewer, and 1 star for any win above 90 moves.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-white/10 text-white/40 text-sm text-center">
            <p>Play FreeCell Online — A free browser-based card game with numbered deals, hints, and statistics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
