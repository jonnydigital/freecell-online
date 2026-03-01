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
      <header className="bg-[#072907] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Privacy Policy.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            Transparent and simple data policies for our players.
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
            <h2 className="text-2xl font-black text-[#072907] mb-6">01. Information Collection</h2>
            <div className="space-y-4 text-gray-500">
              <p>We collect minimal data to ensure the game works as intended:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Local Data:</strong> Your scores and settings are stored in your browser's LocalStorage. This stays on your device.</li>
                <li><strong>Analytics:</strong> We use Google Analytics to understand basic traffic patterns in an anonymous way.</li>
                <li><strong>Cloud Sync:</strong> If you create a profile, we securely store your email and stats via Supabase.</li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">02. Advertising</h2>
            <p className="text-gray-500">
              We use standard ad providers (like Google AdSense) to keep the game free. They may use cookies to show relevant ads. You can manage these in your browser or via Google's ad settings.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">03. Security</h2>
            <p className="text-gray-500">
              We treat your data with respect. Communication between your browser and our servers is encrypted using industry-standard SSL/TLS.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-black text-[#072907] mb-6">04. Contact</h2>
            <p className="text-gray-500">
              Questions? Reach out at privacy@playfreecellonline.com.
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
