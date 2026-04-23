import Link from 'next/link';
import { type DealInfo } from '@/lib/curatedDeals';

interface GameDealInfoProps {
  gameNum: number;
  deal: DealInfo | undefined;
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  Impossible: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export default function GameDealInfo({ gameNum, deal }: GameDealInfoProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
        FreeCell Game #{gameNum}
      </h2>

      {deal ? (
        <CuratedDealContent gameNum={gameNum} deal={deal} />
      ) : (
        <GenericDealContent gameNum={gameNum} />
      )}

      {/* Related links — always shown */}
      <div className="mt-8 pt-6 border-t border-white/[0.07]">
        <h3 className="text-lg font-semibold text-white mb-3">Explore More FreeCell</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/famous-freecell-deals" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Famous FreeCell Deals</span>
            <p className="text-xs text-white/50 mt-1">The iconic game numbers every FreeCell player should know.</p>
          </Link>
          <Link href="/freecell-solvability" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Which Deals Are Solvable?</span>
            <p className="text-xs text-white/50 mt-1">The 8 known unsolvable deals and why every other deal can be won.</p>
          </Link>
          <Link href="/freecell-mastery" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Master FreeCell</span>
            <p className="text-xs text-white/50 mt-1">The complete roadmap from first deal to expert-level play.</p>
          </Link>
          <Link href="/freecell-probability" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">FreeCell Probability</span>
            <p className="text-xs text-white/50 mt-1">Win rates, solvability math, and why FreeCell is 99.999% winnable.</p>
          </Link>
          <Link href="/solver" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">FreeCell Solver</span>
            <p className="text-xs text-white/50 mt-1">Paste a board — see the winning line if one exists.</p>
          </Link>
          <Link href="/strategy" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Strategy Guide</span>
            <p className="text-xs text-white/50 mt-1">Free-cell management, supermoves, and board reading.</p>
          </Link>
        </div>
      </div>
    </article>
  );
}

function tierNarrative(num: number): { heading: string; paragraphs: string[] } {
  if (num <= 100) {
    return {
      heading: `One of the original 100 FreeCell deals`,
      paragraphs: [
        `Deal #${num} sits in the first 100 game numbers of the classic Microsoft dealing algorithm — the range most long-time FreeCell players know by heart. Deals in this band tend to have recognizable openings because millions of players have encountered them since the 1990s.`,
        `If you want to see how your solve time compares to other players, keep an eye on the daily leaderboard after completing this deal. Most deals in the 1–100 range are rated Easy or Medium, so this is a good number to chase personal bests on.`,
      ],
    };
  }
  if (num <= 1000) {
    return {
      heading: `A classic Microsoft FreeCell layout`,
      paragraphs: [
        `Deal #${num} is one of the early Microsoft FreeCell deals that originally shipped with Windows. The dealing algorithm is deterministic, so deal #${num} produces identical tableau placements for every player in every version of the game — which is why you can share the number and replay it years later.`,
        `Deals in the 101–1,000 range make excellent practice targets. They are well-documented in the community, and if you get stuck you can check the solver for the shortest winning line or compare approaches in our strategy guide.`,
      ],
    };
  }
  if (num <= 10000) {
    return {
      heading: `A mid-range Microsoft FreeCell deal`,
      paragraphs: [
        `Deal #${num.toLocaleString()} belongs to the 1,001–10,000 range of Microsoft FreeCell numbering. These deals are part of the 32,000 deal set that shipped with Windows 98 and XP — they are the deals competitive FreeCell players reference when discussing difficulty and technique.`,
        `If this deal feels tough, remember that 99.999% of all FreeCell deals are solvable with perfect play. The key moves in any FreeCell deal are usually: free an Ace early, hold at least two free cells in reserve, and avoid filling a column with a descending single-suit run until you have somewhere to move it.`,
      ],
    };
  }
  if (num <= 32000) {
    return {
      heading: `One of the 32,000 original Microsoft deals`,
      paragraphs: [
        `Deal #${num.toLocaleString()} is one of the 32,000 numbered deals included in the original Windows FreeCell release. Deals in this range are the historical canon of the game — every major solvability study (from Don Woods to modern automated solvers) has analyzed deals drawn from this set.`,
        `Only one of these 32,000 deals — game #11982 — is proven unsolvable. Every other deal in this range, including #${num.toLocaleString()}, has a valid winning sequence. If you get stuck, the issue is almost always move order: try the solver, then replay to internalize the line.`,
      ],
    };
  }
  if (num <= 100000) {
    return {
      heading: `An extended-range FreeCell deal`,
      paragraphs: [
        `Deal #${num.toLocaleString()} lies in the extended range (32,001–100,000) — deals generated by the same Microsoft algorithm but outside the original Windows set. They produce fully legitimate FreeCell boards and are useful if you want a deal that you probably have not seen before.`,
        `Seven of the eight known unsolvable FreeCell deals live in this wider range (#146692, #186216, #455889, #495505, #512118, #517776, #781948 are all outside the original 32,000). If this deal feels impossible, check our list of known unsolvable deals — otherwise it is winnable and the solver can prove it.`,
      ],
    };
  }
  return {
    heading: `A high-range FreeCell deal`,
    paragraphs: [
      `Deal #${num.toLocaleString()} is a high-number Microsoft-algorithm deal. The algorithm is deterministic, so this deal produces a fixed, reproducible tableau that you can share with friends using the URL above.`,
      `Deals this far into the numbering space are rarely discussed in published solvability studies, but they behave the same way mathematically — the vast majority are solvable, and the same FreeCell fundamentals apply: free Aces and Twos first, protect your free cells, and build empty columns before you commit to long sequences.`,
    ],
  };
}

function GenericDealContent({ gameNum }: { gameNum: number }) {
  const { heading, paragraphs } = tierNarrative(gameNum);
  return (
    <div className="mb-4">
      <p className="text-sm uppercase tracking-wide text-[#D4AF37]/80 mb-3">{heading}</p>
      {paragraphs.map((text, i) => (
        <p key={i} className={i === 0 ? 'leading-relaxed' : 'mt-3 leading-relaxed'}>
          {text}
        </p>
      ))}
      <p className="mt-3 leading-relaxed">
        New to FreeCell? Start with our{' '}
        <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
          how to play guide
        </Link>
        , then read the{' '}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">
          strategy guide
        </Link>{' '}
        to learn the patterns that separate casual play from expert-level wins. Stuck on a specific deal? The{' '}
        <Link href="/solver" className="text-[#D4AF37] hover:underline">
          FreeCell solver
        </Link>{' '}
        will find a winning line if one exists.
      </p>
    </div>
  );
}

function CuratedDealContent({ gameNum, deal }: { gameNum: number; deal: DealInfo }) {
  const isImpossible = deal.difficulty === 'Impossible';
  const isHard = deal.difficulty === 'Hard';
  const isEasy = deal.difficulty === 'Easy';

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        {deal.difficulty && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[deal.difficulty]}`}>
            {deal.difficulty}
          </span>
        )}
        <span className="text-white/50 text-sm">{deal.label}</span>
      </div>

      {isImpossible && (
        <div className="mb-4">
          <p className="leading-relaxed">
            Deal #{gameNum} is one of only eight confirmed unsolvable FreeCell deals
            out of the first 1,000,000 numbered games. No legal sequence of moves can
            solve this board. It has been verified through exhaustive computer search,
            meaning every possible path has been explored and none lead to a completed
            foundation.
          </p>
          {gameNum === 11982 && (
            <p className="mt-3 leading-relaxed">
              Game #11982 is the most famous of the unsolvable deals. It was the only
              impossible game found in the original 32,000 Microsoft FreeCell deals and
              has become a reference point for the entire solvability discussion. Read the{' '}
              <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">
                full story of Deal #11982
              </Link>.
            </p>
          )}
          <p className="mt-3 leading-relaxed">
            Despite being unsolvable, many players attempt it as a challenge or to
            see the board layout for themselves. The other confirmed impossible deals
            are{' '}
            <Link href="/famous-freecell-deals" className="text-[#D4AF37] hover:underline">
              listed on our famous deals page
            </Link>.
          </p>
        </div>
      )}

      {isHard && (
        <div className="mb-4">
          <p className="leading-relaxed">
            Deal #{gameNum} is rated as one of the hardest solvable FreeCell deals.
            It is solvable, but the winning line is extremely narrow. Expect buried
            low cards, tight free-cell management, and little room for error. If you
            can solve this one, you are playing at an expert level.
          </p>
          <p className="mt-3 leading-relaxed">
            Need help with difficult boards? Read our{' '}
            <Link href="/hard-freecell-games" className="text-[#D4AF37] hover:underline">
              guide to hard FreeCell games
            </Link>{' '}
            or use the{' '}
            <Link href="/solver" className="text-[#D4AF37] hover:underline">
              solver
            </Link>{' '}
            to study the winning path.
          </p>
        </div>
      )}

      {isEasy && (
        <div className="mb-4">
          <p className="leading-relaxed">
            Deal #{gameNum} is a beginner-friendly game with accessible low cards and
            natural sequences. It is a good deal for building confidence, practicing
            clean board reading, and reinforcing the fundamentals before moving to
            harder challenges.
          </p>
          <p className="mt-3 leading-relaxed">
            Looking for more practice at this level? Browse our{' '}
            <Link href="/easy-freecell-games" className="text-[#D4AF37] hover:underline">
              easy FreeCell games guide
            </Link>{' '}
            or start with the{' '}
            <Link href="/freecell-for-beginners" className="text-[#D4AF37] hover:underline">
              beginner walkthrough
            </Link>.
          </p>
        </div>
      )}

      {!isImpossible && !isHard && !isEasy && (
        <div className="mb-4">
          <p className="leading-relaxed">
            Deal #{gameNum} is a notable game in the FreeCell community: {deal.label.toLowerCase()}.
            Every FreeCell deal number maps to a specific card layout generated by the
            original Microsoft algorithm. Share this link with friends to challenge them
            with exactly the same board.
          </p>
        </div>
      )}
    </>
  );
}

