import { isHubSite, isKlondikeSite, isSpiderSite, siteConfig } from '@/lib/siteConfig';

// All four network properties
const ALL_SITES = {
  freecell:  { href: 'https://playfreecellonline.com', label: 'FreeCell Online', desc: 'Daily challenges, streak mode & 32,000+ deals' },
  klondike:  { href: 'https://playklondikeonline.com', label: 'Klondike Online', desc: 'Classic solitaire — Draw 1 & Draw 3' },
  spider:    { href: 'https://playspidersolitaireonline.com', label: 'Spider Solitaire Online', desc: '1-suit, 2-suit & 4-suit difficulty' },
  hub:       { href: 'https://solitairestack.com', label: 'Solitaire Stack', desc: 'All solitaire variants in one place' },
};

// Each site shows the three others; hub shows the three spokes
function getLinks() {
  if (isHubSite) {
    return [ALL_SITES.freecell, ALL_SITES.klondike, ALL_SITES.spider];
  }
  if (isKlondikeSite) {
    return [ALL_SITES.hub, ALL_SITES.freecell, ALL_SITES.spider];
  }
  if (isSpiderSite) {
    return [ALL_SITES.hub, ALL_SITES.freecell, ALL_SITES.klondike];
  }
  // FreeCell spoke (default)
  return [ALL_SITES.hub, ALL_SITES.klondike, ALL_SITES.spider];
}

export default function NetworkCrossLinks() {
  const links = getLinks();
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
