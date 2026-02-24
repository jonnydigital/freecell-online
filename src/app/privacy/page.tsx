import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PlayFreeCellOnline.com',
  description: 'Privacy Policy for PlayFreeCellOnline.com',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white/70">← Back to Game</Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-white/50 mb-8">Last updated: February 23, 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>PlayFreeCellOnline.com collects minimal information to provide and improve our service:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li><strong>Game Data:</strong> Game statistics (wins, losses, times) are stored locally in your browser using LocalStorage. This data never leaves your device unless you create an account.</li>
              <li><strong>Analytics:</strong> We use Google Analytics 4 to understand how visitors use our site. This includes anonymous data like page views, session duration, and general geographic region.</li>
              <li><strong>Account Data:</strong> If you choose to create an account, we store your email address and game statistics through our database provider (Supabase).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Advertising</h2>
            <p>We display advertisements through Google AdSense and other ad networks. These services may use cookies and similar technologies to serve ads based on your interests. You can manage your ad preferences at <a href="https://adssettings.google.com" className="text-[#d4a843] underline">Google Ad Settings</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cookies</h2>
            <p>We use cookies for:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Essential site functionality</li>
              <li>Analytics (Google Analytics)</li>
              <li>Advertising (Google AdSense)</li>
            </ul>
            <p className="mt-2">You can control cookies through your browser settings. Disabling cookies may affect some features.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Data Storage</h2>
            <p>Your game progress is stored locally in your browser. If you create an account, data is stored securely in our database hosted by Supabase (US-based). We use industry-standard security measures to protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Third-Party Services</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Google Analytics 4 — <a href="https://policies.google.com/privacy" className="text-[#d4a843] underline">Privacy Policy</a></li>
              <li>Google AdSense — <a href="https://policies.google.com/technologies/ads" className="text-[#d4a843] underline">How Google uses data</a></li>
              <li>Vercel (hosting) — <a href="https://vercel.com/legal/privacy-policy" className="text-[#d4a843] underline">Privacy Policy</a></li>
              <li>Supabase (database) — <a href="https://supabase.com/privacy" className="text-[#d4a843] underline">Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of analytics tracking</li>
              <li>Control cookie preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Children&#39;s Privacy</h2>
            <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Contact</h2>
            <p>For privacy-related questions, please contact us at privacy@playfreecellonline.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
