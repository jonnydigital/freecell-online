import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PlayFreeCellOnline.com',
  description: 'Terms of Service for PlayFreeCellOnline.com',
};

export default function TermsPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      {/* ── Header ── */}
      <header className="bg-[#072907] text-white pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <Link href="/" className="text-sm font-black uppercase tracking-widest mb-8 hover:text-[#D4AF37] transition-colors">
          Freecell<span className="text-[#D4AF37]">.</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          The formal agreement governing your use of our platform.
        </p>
      </header>

      {/* ── Main Content (Article Card) ── */}
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 relative -mt-8 mb-20 z-10">
        <article className="max-w-none">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-10 pb-4 border-b border-gray-100">
            Last Updated: {lastUpdated}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">01. Acceptance</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              By accessing PlayFreeCellOnline.com, you agree to these terms. If you do not agree, please stop using the service immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">02. Usage License</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We grant you a personal, non-exclusive license to play FreeCell in your browser for entertainment purposes. No commercial use or data scraping is permitted.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">03. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              The game mechanics of FreeCell are public domain. However, our specific design, code, and professional assets are owned by PlayFreeCellOnline.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">04. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              The service is provided "as is." We are not liable for any lost game data or interruptions.
            </p>
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
            <Link href="/strategy" className="hover:text-black transition-colors">Strategy</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
