import Link from 'next/link';
import { isHubSite } from '@/lib/siteConfig';

const ALL_GAMES = [
  { slug: 'freecell', label: 'FreeCell', href: isHubSite ? '/freecell' : '/', description: 'Classic FreeCell — all 52 cards visible, pure strategy.' },
  { slug: 'spider', label: 'Spider Solitaire', href: '/spider', description: 'One, two, or four suits across ten columns.' },
  { slug: 'bakers-game', label: "Baker's Game", href: '/bakers-game', description: 'Build by suit instead of alternating color.' },
  { slug: 'eight-off', label: 'Eight Off', href: '/eight-off', description: 'Eight reserve cells for more storage options.' },
  { slug: 'klondike', label: 'Klondike', href: '/klondike', description: 'The classic draw-and-stack solitaire.' },
  { slug: 'pyramid', label: 'Pyramid', href: '/pyramid', description: 'Match pairs that sum to 13 to clear the pyramid.' },
  { slug: 'tripeaks', label: 'TriPeaks', href: '/tripeaks', description: 'Clear three peaks by playing cards ±1 from the waste.' },
  { slug: 'golf', label: 'Golf Solitaire', href: '/golf', description: 'Clear seven columns by playing cards ±1 from the waste.' },
  { slug: 'yukon', label: 'Yukon Solitaire', href: '/yukon', description: 'Move any face-up card in this Klondike variant — no stock pile.' },
  { slug: 'canfield', label: 'Canfield Solitaire', href: '/canfield', description: 'Build from a random base rank with a 13-card reserve. Casino classic.' },
  { slug: 'forty-thieves', label: 'Forty Thieves', href: '/forty-thieves', description: 'Two decks, same-suit building, single card moves. Brutally hard.' },
  { slug: 'scorpion', label: 'Scorpion Solitaire', href: '/scorpion', description: 'Move any face-up card. Build same-suit runs from King to Ace.' },
  { slug: 'seahaven', label: 'Seahaven Towers', href: '/seahaven', description: 'Same-suit stacking, 10 columns, 4 free cells, single-card moves.' },
  { slug: 'beleaguered-castle', label: 'Beleaguered Castle', href: '/beleaguered-castle', description: 'Zero free cells. Aces pre-placed, descending rank stacking. Brutally hard.' },
  { slug: 'penguin', label: 'Penguin Solitaire', href: '/penguin', description: 'Random beak card sets the base. Same-suit building with wrapping foundations and 1 flipper cell.' },
  { slug: 'cruel', label: 'Cruel Solitaire', href: '/cruel', description: '12 piles, same-suit building, and unlimited redeals. A classic patience game.' },
  { slug: 'clock', label: 'Clock Solitaire', href: '/clock', description: 'Place cards on the clock face matching their rank. A classic patience game.' },
  { slug: 'accordion', label: 'Accordion Solitaire', href: '/accordion', description: 'Compress 52 cards into one pile by matching rank or suit. A challenging patience game.' },
  { slug: 'la-belle-lucie', label: 'La Belle Lucie', href: '/la-belle-lucie', description: 'Fan patience with same-suit building, shuffled redeals, and the Merci rule.' },
  { slug: 'bisley', label: 'Bisley Solitaire', href: '/bisley', description: 'Dual-direction foundations — aces build up, kings build down, meeting in the middle.' },
  { slug: 'aces-up', label: 'Aces Up', href: '/aces-up', description: "Discard lower-ranked same-suit cards until only four Aces remain. Also known as Idiot's Delight." },
  { slug: 'flower-garden', label: 'Flower Garden', href: '/flower-garden', description: '16-card bouquet reserve — every card available. Build down regardless of suit across 6 columns.' },
  { slug: 'bakers-dozen', label: "Baker's Dozen", href: '/bakers-dozen', description: '13 columns, Kings buried to the bottom. Build down regardless of suit. No free cells.' },
  { slug: 'gaps', label: 'Gaps (Montana)', href: '/gaps', description: 'Slide cards into gaps to arrange suit sequences in a 4×13 grid. A classic patience puzzle.' },
  { slug: 'calculation', label: 'Calculation', href: '/calculation', description: 'Math-based solitaire — build four foundations by counting in intervals of 1, 2, 3, and 4. Suit doesn\'t matter.' },
  { slug: 'monte-carlo', label: 'Monte Carlo', href: '/monte-carlo', description: 'Match and remove adjacent same-rank pairs from a 5×5 grid. Consolidate and deal to clear all 52 cards.' },
  { slug: 'easy-freecell', label: 'Easy FreeCell', href: '/easy-freecell', description: 'Aces and twos pre-placed for a gentler start.' },
  { slug: 'freecell-1cell', label: '1-Cell FreeCell', href: '/freecell/1-cell', description: 'Just one free cell. Extremely challenging.' },
  { slug: 'freecell-2cell', label: '2-Cell FreeCell', href: '/freecell/2-cell', description: 'Two free cells. Very challenging.' },
  { slug: 'freecell-3cell', label: '3-Cell FreeCell', href: '/freecell/3-cell', description: 'Three free cells. A tough step up.' },
];

interface MoreGamesProps {
  /** Slug of the current page's game, excluded from the list */
  currentSlug: string;
  /** Max games to show (default 5) */
  maxGames?: number;
}

export default function MoreGames({ currentSlug, maxGames = 5 }: MoreGamesProps) {
  const games = ALL_GAMES.filter(g => g.slug !== currentSlug).slice(0, maxGames);

  return (
    <section className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">More Solitaire Games</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {games.map(game => (
          <Link
            key={game.slug}
            href={game.href}
            className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/20 transition-all"
          >
            <div className="font-semibold text-white/90 mb-1">{game.label}</div>
            <div className="text-sm text-white/50 leading-snug">{game.description}</div>
          </Link>
        ))}
      </div>

      {!isHubSite ? (
        <p className="mt-6 text-sm text-white/40 text-center">
          Play all solitaire games at{' '}
          <a href="https://solitairestack.com" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline transition-colors">
            SolitaireStack.com
          </a>
        </p>
      ) : (
        <p className="mt-6 text-sm text-white/40 text-center">
          Visit our dedicated FreeCell site at{' '}
          <a href="https://playfreecellonline.com" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline transition-colors">{/* allow-foreign-brand:cross-site-promotion */}
            PlayFreeCellOnline.com
          </a>
        </p>
      )}
    </section>
  );
}
