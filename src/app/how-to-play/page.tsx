import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Play FreeCell | Rules & Tutorial | PlayFreeCellOnline.com',
  description:
    'Learn how to play FreeCell Solitaire with our complete guide. Rules, setup, terminology, and step-by-step instructions for beginners.',
};

export default function HowToPlayPage() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Play FreeCell Solitaire',
    description: 'Learn the rules and setup of FreeCell Solitaire, the classic card game.',
    step: [
      { '@type': 'HowToStep', name: 'Deal the Cards', text: 'All 52 cards are dealt face-up into 8 columns (cascades). The first 4 columns get 7 cards each, the last 4 get 6 cards each.' },
      { '@type': 'HowToStep', name: 'Move Cards to Build Sequences', text: 'Move cards between cascades by placing them in descending order, alternating colors (e.g., black 6 on red 7).' },
      { '@type': 'HowToStep', name: 'Use Free Cells Wisely', text: 'Temporarily store individual cards in the 4 free cells to access buried cards.' },
      { '@type': 'HowToStep', name: 'Build Foundation Piles', text: 'Move Aces to the foundation and build up by suit (A, 2, 3... K). All 4 foundations must be completed to win.' },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <a href="/" className="hover:text-white/70">← Back to Game</a>
          {' · '}
          <a href="/strategy" className="hover:text-white/70">Strategy Guide</a>
          {' · '}
          <a href="/faq" className="hover:text-white/70">FAQ</a>
        </nav>

        <h1 className="text-4xl font-bold mb-4">How to Play FreeCell</h1>
        <p className="text-white/70 text-lg mb-10">
          FreeCell is one of the most popular solitaire card games in the world — and one of the fairest.
          Unlike most solitaire games, all cards are dealt face-up, so every game is almost entirely
          a test of skill. Here&#39;s everything you need to know.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">The Board</h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            A FreeCell board has three areas:
          </p>
          <ul className="space-y-3 text-white/80 ml-6 list-disc">
            <li>
              <strong className="text-white">Cascades (Tableau)</strong> — 8 columns of cards in the center.
              This is where you&#39;ll do most of your work, rearranging cards to free up the ones you need.
            </li>
            <li>
              <strong className="text-white">Free Cells</strong> — 4 empty slots in the upper-left.
              Each can hold one card as temporary storage.
            </li>
            <li>
              <strong className="text-white">Foundations</strong> — 4 slots in the upper-right.
              Build each foundation from Ace to King, one suit per pile.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">Setup</h2>
          <p className="text-white/80 leading-relaxed">
            All 52 cards are dealt face-up into 8 columns. The first 4 columns get 7 cards each,
            and the last 4 columns get 6 cards each. There&#39;s no stock pile and no hidden cards —
            you can see everything from the start.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">Rules of Play</h2>
          <ol className="space-y-4 text-white/80 ml-6 list-decimal">
            <li>
              <strong className="text-white">Moving between cascades:</strong> You can place a card on top of
              another card that is one rank higher and the opposite color. For example, a red 5 can go
              on a black 6.
            </li>
            <li>
              <strong className="text-white">Moving to free cells:</strong> Any single card can be moved to an
              empty free cell. Only one card per free cell.
            </li>
            <li>
              <strong className="text-white">Moving to foundations:</strong> Aces go directly to empty foundations.
              Then build up in the same suit: A♠, 2♠, 3♠, and so on up to K♠.
            </li>
            <li>
              <strong className="text-white">Empty columns:</strong> Any card (or valid sequence) can be moved
              to an empty cascade column.
            </li>
            <li>
              <strong className="text-white">Moving sequences:</strong> While the official rules only allow
              moving one card at a time, you can move a properly ordered sequence (descending rank,
              alternating colors) as a shortcut — as long as there are enough empty free cells and
              empty columns to theoretically do it one card at a time.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">How to Win</h2>
          <p className="text-white/80 leading-relaxed">
            The game is won when all 52 cards have been moved to the four foundation piles,
            with each pile containing a complete suit from Ace to King. Since nearly every
            FreeCell deal is solvable (99.999%), winning is almost always possible — it just
            takes planning and patience.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">Key Terminology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['Cascade', 'One of the 8 columns of cards on the tableau.'],
              ['Free Cell', 'Temporary storage for a single card.'],
              ['Foundation', 'Where you build completed suits (A through K).'],
              ['Tableau', 'The playing area with all 8 cascades.'],
              ['Supermove', 'Moving multiple cards at once as a shortcut.'],
              ['Auto-move', 'Cards automatically sent to foundations when safe.'],
            ].map(([term, def]) => (
              <div key={term} className="bg-[#1a5c1a]/20 rounded-lg p-4 border border-[#1a5c1a]/30">
                <dt className="font-semibold text-[#d4a843]">{term}</dt>
                <dd className="text-white/70 text-sm mt-1">{def}</dd>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#d4a843]">Tips for Beginners</h2>
          <ul className="space-y-2 text-white/80 ml-6 list-disc">
            <li>Always try to free up Aces and 2s as early as possible.</li>
            <li>Keep free cells empty — they&#39;re your most valuable resource.</li>
            <li>Empty columns are even more powerful than free cells. Protect them.</li>
            <li>Plan several moves ahead before committing.</li>
            <li>Don&#39;t be afraid to use the Undo button — it&#39;s how you learn!</li>
          </ul>
        </section>

        <div className="mt-12 flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded-lg text-white font-medium transition-colors"
          >
            Play FreeCell Now →
          </a>
          <a
            href="/strategy"
            className="px-6 py-3 border border-[#1a5c1a] hover:bg-[#1a5c1a]/30 rounded-lg text-white font-medium transition-colors"
          >
            Strategy Guide →
          </a>
        </div>
      </div>
    </div>
  );
}
