import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-[#041f04] border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Play */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Play
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                  FreeCell
                </Link>
              </li>
              <li>
                <Link href="/bakers-game" className="text-sm text-white/60 hover:text-white transition-colors">
                  Baker&apos;s Game
                </Link>
              </li>
              <li>
                <Link href="/eight-off" className="text-sm text-white/60 hover:text-white transition-colors">
                  Eight Off
                </Link>
              </li>
              <li>
                <Link href="/spider" className="text-sm text-white/60 hover:text-white transition-colors">
                  Spider Solitaire
                </Link>
              </li>
              <li>
                <Link href="/streak" className="text-sm text-white/60 hover:text-white transition-colors">
                  Streak Mode
                </Link>
              </li>
              <li>
                <Link href="/storm" className="text-sm text-white/60 hover:text-white transition-colors">
                  Storm Mode
                </Link>
              </li>
              <li>
                <Link href="/winning-deals" className="text-sm text-white/60 hover:text-white transition-colors">
                  Winning Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/how-to-play" className="text-sm text-white/60 hover:text-white transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/strategy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Strategy Guide
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-sm text-white/60 hover:text-white transition-colors">
                  Tips &amp; Tricks
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-sm text-white/60 hover:text-white transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-sm text-white/50 hover:text-white transition-colors">
                  Statistics &amp; Win Rates
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/history" className="text-sm text-white/60 hover:text-white transition-colors">
                  FreeCell History
                </Link>
              </li>
              <li>
                <Link href="/solitaire-types" className="text-sm text-white/60 hover:text-white transition-colors">
                  Solitaire Types
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-spider" className="text-sm text-white/60 hover:text-white transition-colors">
                  FreeCell vs Spider
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-white/60 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-sm text-white/60 hover:text-white transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-white/60 hover:text-white transition-colors">
                  Deal Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats & More */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              More
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/stats" className="text-sm text-white/60 hover:text-white transition-colors">
                  Your Stats
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black uppercase tracking-tighter text-white/60 hover:text-white transition-colors">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} FreeCell Online. Free to play, no download required.
          </p>
        </div>
      </div>
    </footer>
  );
}
