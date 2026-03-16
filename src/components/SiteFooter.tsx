import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export default function SiteFooter() {
  const playLinks =
    siteConfig.key === 'solitairestack'
      ? [
          { href: siteConfig.primaryGamePath, label: 'FreeCell' },
          { href: '/spider', label: 'Spider Solitaire' },
          { href: '/bakers-game', label: "Baker's Game" },
          { href: '/eight-off', label: 'Eight Off' },
          { href: '/easy-freecell', label: 'Easy FreeCell' },
          { href: '/winning-deals', label: 'Winning Deals' },
        ]
      : [
          { href: '/', label: 'FreeCell' },
          { href: '/bakers-game', label: "Baker's Game" },
          { href: '/eight-off', label: 'Eight Off' },
          { href: '/easy-freecell', label: 'Easy FreeCell' },
          { href: '/spider', label: 'Spider Solitaire' },
          { href: '/streak', label: 'Streak Mode' },
          { href: '/storm', label: 'Storm Mode' },
          { href: '/winning-deals', label: 'Winning Deals' },
          { href: '/daily-freecell/calendar', label: 'Challenge Calendar' },
          { href: '/freecell/1-cell', label: '1-Cell FreeCell' },
          { href: '/freecell/2-cell', label: '2-Cell FreeCell' },
          { href: '/freecell/3-cell', label: '3-Cell FreeCell' },
        ];

  const learnLinks =
    siteConfig.key === 'solitairestack'
      ? [
          { href: '/freecell-for-beginners', label: 'FreeCell for Beginners' },
          { href: '/spider/how-to-play', label: 'Spider Rules' },
          { href: '/spider/strategy', label: 'Spider Strategy' },
          { href: '/spider/tips', label: 'Spider Tips' },
          { href: '/pyramid/how-to-play', label: 'Pyramid Rules' },
          { href: '/pyramid/strategy', label: 'Pyramid Strategy' },
          { href: '/freecell-vs-klondike', label: 'FreeCell vs Klondike' },
          { href: '/solitaire-types', label: 'Solitaire Types' },
          { href: '/faq', label: 'FAQ' },
        ]
      : [
          { href: '/how-to-play', label: 'How to Play' },
          { href: '/freecell-rules', label: 'FreeCell Rules' },
          { href: '/strategy', label: 'Strategy Guide' },
          { href: '/tips', label: 'Tips & Tricks' },
          { href: '/freecell-mistakes-to-avoid', label: 'Common Mistakes' },
          { href: '/freecell-cheat-sheet', label: 'Cheat Sheet' },
          { href: '/freecell-for-beginners', label: 'Beginner Guide' },
          { href: '/freecell-for-seniors', label: 'FreeCell for Seniors' },
          { href: '/large-cards', label: 'Large Cards Mode' },
          { href: '/freecell-hints-explained', label: 'Hints Explained' },
          { href: '/glossary', label: 'Glossary' },
          { href: '/faq', label: 'FAQ' },
          { href: '/statistics', label: 'Statistics & Win Rates' },
          { href: '/freecell-probability', label: 'Probability & Math' },
          { href: '/klondike/how-to-play', label: 'Klondike Rules' },
          { href: '/klondike/strategy', label: 'Klondike Strategy' },
          { href: '/klondike/tips', label: 'Klondike Tips' },
          { href: '/klondike/winning-strategies', label: 'Klondike Winning Strategies' },
          { href: '/klondike/draw-1-vs-draw-3', label: 'Draw 1 vs Draw 3' },
          { href: '/pyramid/how-to-play', label: 'Pyramid Rules' },
          { href: '/pyramid/strategy', label: 'Pyramid Strategy' },
        ];

  const exploreLinks =
    siteConfig.key === 'solitairestack'
      ? [
          { href: '/about', label: 'About the Network' },
          { href: '/daily-freecell', label: 'Daily FreeCell' },
          { href: '/freecell-vs-spider', label: 'FreeCell vs Spider' },
          { href: '/leaderboard', label: 'Leaderboard' },
          { href: '/deals', label: 'Deal Explorer' },
          { href: '/solver', label: 'Solver' },
        ]
      : [
          { href: '/history', label: 'FreeCell History' },
          { href: '/solitaire-types', label: 'Solitaire Types' },
          { href: '/freecell-vs-spider', label: 'FreeCell vs Spider' },
          { href: '/freecell-vs-klondike', label: 'FreeCell vs Klondike' },
          { href: '/microsoft-freecell', label: 'Microsoft FreeCell' },
          { href: '/hard-freecell-games', label: 'Hard FreeCell Games' },
          { href: '/easy-freecell-games', label: 'Easy FreeCell Games' },
          { href: '/famous-freecell-deals', label: 'Famous Deals' },
          { href: '/freecell-world-records', label: 'World Records' },
          { href: '/is-every-freecell-game-winnable', label: 'Is Every Game Winnable?' },
          { href: '/spider/is-spider-solitaire-winnable', label: 'Spider Winnability' },
          { href: '/leaderboard', label: 'Leaderboard' },
          { href: '/achievements', label: 'Achievements' },
          { href: '/deals', label: 'Deal Explorer' },
          { href: '/solver', label: 'Solver' },
          { href: '/freecell-variants', label: 'All Variants' },
        ];

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
              {playLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2.5">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
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
            {siteConfig.footerWordmark}<span className="text-[#D4AF37]">.</span>
          </Link>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteConfig.brandName}. Free to play, no download required.
          </p>
        </div>
      </div>
    </footer>
  );
}
