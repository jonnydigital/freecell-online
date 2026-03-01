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
      <header className="bg-[#072907] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Terms of Service.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            The formal agreement governing your use of our platform.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-3xl mx-auto px-6 py-24">
        <article className="prose prose-lg prose-gray max-w-none">
          <p className="text-sm font-black uppercase tracking-widest text-gray-400 mb-12">
            Last Updated: {lastUpdated}
          </p>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">01. Acceptance</h2>
            <p className="text-gray-500">
              By accessing PlayFreeCellOnline.com, you agree to these terms. If you do not agree, please stop using the service immediately.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">02. Usage License</h2>
            <p className="text-gray-500">
              We grant you a personal, non-exclusive license to play FreeCell in your browser for entertainment purposes. No commercial use or data scraping is permitted.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">03. Intellectual Property</h2>
            <p className="text-gray-500">
              The game mechanics of FreeCell are public domain. However, our specific design, code, and professional assets are owned by PlayFreeCellOnline.com.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">04. Limitation of Liability</h2>
            <p className="text-gray-500">
              The service is provided "as is." We are not liable for any lost game data or interruptions.
            </p>
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
            <Link href="/strategy" className="hover:text-black transition-colors">Strategy</Link>
            <Link href="/faq" className="hover:text-black transition-colors">FAQ</Link>
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
