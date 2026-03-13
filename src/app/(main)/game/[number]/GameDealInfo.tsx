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
        <h3 className="text-lg font-semibold text-white mb-3">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/famous-freecell-deals" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Famous FreeCell Deals</span>
            <p className="text-xs text-white/50 mt-1">The iconic game numbers every FreeCell player should know.</p>
          </Link>
          <Link href="/deals" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Browse All Deals</span>
            <p className="text-xs text-white/50 mt-1">Search curated collections or jump to any game number.</p>
          </Link>
          <Link href="/strategy" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Strategy Guide</span>
            <p className="text-xs text-white/50 mt-1">Master free-cell management, supermoves, and board reading.</p>
          </Link>
          <Link href="/tips" className="rounded-lg border border-white/[0.07] p-4 hover:border-[#D4AF37]/40 transition-colors">
            <span className="font-medium text-white text-sm">Tips and Tricks</span>
            <p className="text-xs text-white/50 mt-1">Quick tactical advice you can apply mid-game.</p>
          </Link>
        </div>
      </div>
    </article>
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

function GenericDealContent({ gameNum }: { gameNum: number }) {
  return (
    <div className="mb-4">
      <p className="leading-relaxed">
        Every FreeCell game number corresponds to a unique card layout generated by
        the original Microsoft dealing algorithm. Deal #{gameNum} produces the same
        board every time, which means you can share this exact game with friends,
        retry it after a loss, or compare your approach to other players.
      </p>
      <p className="mt-3 leading-relaxed">
        Approximately 99.999% of all FreeCell deals are solvable with perfect play.
        If this deal feels stuck, try clearing an empty column first, preserving
        your free cells for critical extractions, and working to expose buried aces
        and twos before building long tableau sequences.
      </p>
      <p className="mt-3 leading-relaxed">
        New to FreeCell? Start with our{' '}
        <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
          how to play guide
        </Link>{' '}
        or read the{' '}
        <Link href="/strategy" className="text-[#D4AF37] hover:underline">
          strategy guide
        </Link>{' '}
        to learn the patterns that separate casual play from expert-level wins.
      </p>
    </div>
  );
}
