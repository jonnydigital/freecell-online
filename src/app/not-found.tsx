import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🃏</div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-white/60 text-lg mb-6">
          This card isn&#39;t in the deck.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded-lg text-white font-medium transition-colors"
        >
          Deal a New Game →
        </Link>
      </div>
    </div>
  );
}
