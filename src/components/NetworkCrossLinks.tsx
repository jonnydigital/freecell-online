import { isHubSite } from '@/lib/siteConfig';

const SPOKE_LINKS = [
  { href: 'https://solitairestack.com', label: 'Solitaire Stack', desc: 'All solitaire games in one place' },
  { href: 'https://solitairestack.com/spider', label: 'Spider Solitaire', desc: 'Play Spider on SolitaireStack' },
  { href: 'https://solitairestack.com/klondike', label: 'Klondike', desc: 'Play Klondike on SolitaireStack' },
];

const HUB_LINKS = [
  { href: 'https://playfreecellonline.com', label: 'PlayFreeCellOnline.com', desc: 'Dedicated FreeCell with daily challenges' },
  { href: 'https://playfreecellonline.com/daily-freecell', label: 'Daily FreeCell', desc: 'A new puzzle every day' },
  { href: 'https://playfreecellonline.com/streak', label: 'Streak Mode', desc: 'How long can you keep winning?' },
];

export default function NetworkCrossLinks() {
  const links = isHubSite ? HUB_LINKS : SPOKE_LINKS;
  const heading = isHubSite ? 'From Our Network' : 'More Solitaire Games';

  return (
    <aside className="mt-10 pt-6 border-t border-white/10">
      <h3 className="text-lg font-semibold text-[#D4AF37]/80 mb-3">{heading}</h3>
      <div className="flex flex-wrap gap-3">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/20 transition-all text-sm"
            rel="noopener"
          >
            <span className="text-white/80">{link.label}</span>
            <span className="text-white/40 text-xs">{link.desc}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
