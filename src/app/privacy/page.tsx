import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PlayFreeCellOnline.com',
  description: 'Privacy Policy for PlayFreeCellOnline.com',
};

export default function PrivacyPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      {/* ── Header ── */}
      <header className="bg-[#072907] text-white pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <Link href="/" className="text-sm font-black uppercase tracking-widest mb-8 hover:text-[#D4AF37] transition-colors">
          Freecell<span className="text-[#D4AF37]">.</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Transparent and simple data policies for our players.
        </p>
      </header>

      {/* ── Main Content (Article Card) ── */}
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 relative -mt-8 mb-20 z-10">
        <article className="max-w-none">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-10 pb-4 border-b border-gray-100">
            Last Updated: {lastUpdated}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">01. Information Collection</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>We collect minimal data to ensure the game works as intended:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-gray-900">Local Data:</strong> Your scores and settings are stored in your browser's LocalStorage. This stays on your device.</li>
                <li><strong className="text-gray-900">Analytics:</strong> We use Google Analytics to understand basic traffic patterns in an anonymous way.</li>
                <li><strong className="text-gray-900">Cloud Sync:</strong> If you create a profile, we securely store your email and stats via Supabase.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">02. Advertising</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We use standard ad providers (like Google AdSense) to keep the game free. They may use cookies to show relevant ads. You can manage these in your browser or via Google's ad settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">03. Security</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We treat your data with respect. Communication between your browser and our servers is encrypted using industry-standard SSL/TLS.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">04. Contact</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Questions? Reach out at privacy@playfreecellonline.com.
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
