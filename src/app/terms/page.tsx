import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | PlayFreeCellOnline.com',
  description: 'Terms of Service for PlayFreeCellOnline.com',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white/70">← Back to Game</Link>
        </nav>

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-white/50 mb-8">Last updated: February 23, 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using PlayFreeCellOnline.com, you agree to these Terms of Service. If you do not agree, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Description of Service</h2>
            <p>PlayFreeCellOnline.com provides a free, browser-based FreeCell solitaire game. The service is provided &quot;as is&quot; without warranties of any kind.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
            <p>Creating an account is optional. If you create an account, you are responsible for maintaining the security of your credentials. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>Attempt to exploit, hack, or disrupt the service</li>
              <li>Use automated tools to access the service in a way that burdens our infrastructure</li>
              <li>Manipulate leaderboards or game statistics through cheating</li>
              <li>Use the service for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Intellectual Property</h2>
            <p>The game code, design, and content are owned by PlayFreeCellOnline.com. Card artwork is used under the LGPL-2.1 license from the SVG-Cards project. FreeCell is a public domain card game.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Advertising</h2>
            <p>The service is supported by advertising. By using the service, you agree to the display of advertisements. Premium subscriptions may offer an ad-free experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>PlayFreeCellOnline.com is provided for entertainment purposes. We are not liable for any damages arising from your use of the service, including but not limited to loss of data, game progress, or interruption of service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Contact</h2>
            <p>For questions about these terms, please contact us at legal@playfreecellonline.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
