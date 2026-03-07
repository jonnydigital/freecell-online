'use client';

import { useEffect, useState } from 'react';
import { useSolver } from '@/hooks/useSolver';
import { describeSolution } from '@/solver/FreeCellSolver';
import Link from 'next/link';

const UNSOLVABLE_DEALS = [11982, 146692, 186216, 455889, 495340, 512118, 517776, 781948];

export default function SolverWidget() {
  const [input, setInput] = useState('');
  const [solvedNumber, setSolvedNumber] = useState<number | null>(null);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [solveTime, setSolveTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { status, moves, totalMoveCount, solve, reset } = useSolver();

  const handleSolve = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 1 || num > 1000000) return;
    reset();
    setDescriptions([]);
    setSolveTime(null);
    setSolvedNumber(num);
    setStartTime(performance.now());
    solve(num);
  };

  useEffect(() => {
    if (status === 'solved' && solvedNumber !== null && moves.length > 0) {
      setDescriptions(describeSolution(solvedNumber, moves));
      if (startTime !== null) setSolveTime(performance.now() - startTime);
    } else if (status === 'solved' && moves.length === 0 && solvedNumber !== null) {
      // Solved with 0 explicit moves (all auto-moves)
      setDescriptions(['All cards moved to foundations automatically!']);
      if (startTime !== null) setSolveTime(performance.now() - startTime);
    } else if (status === 'failed') {
      setDescriptions([]);
      if (startTime !== null) setSolveTime(performance.now() - startTime);
    }
  }, [status, moves, solvedNumber, startTime]);

  const isUnsolvable = solvedNumber !== null && UNSOLVABLE_DEALS.includes(solvedNumber);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
        <label className="block text-sm font-semibold text-white/80 mb-3">
          Game Number (1 &ndash; 1,000,000)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            min={1}
            max={1000000}
            placeholder="e.g. 617"
            disabled={status === 'solving'}
            className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/30 disabled:opacity-50 focus:outline-none focus:border-[#D4AF37]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={handleSolve}
            disabled={status === 'solving' || !input || parseInt(input) < 1 || parseInt(input) > 1000000}
            className="px-8 py-3 bg-[#1a5c1a] hover:bg-[#2d8a2d] disabled:opacity-50 disabled:hover:bg-[#1a5c1a] rounded-lg font-semibold text-white transition-colors cursor-pointer"
          >
            {status === 'solving' ? 'Solving...' : 'Solve'}
          </button>
        </div>
        {status === 'solving' && (
          <p className="mt-3 text-sm text-white/40 animate-pulse">
            Searching for a solution...
          </p>
        )}
      </div>

      {/* Results */}
      {status === 'solved' && solvedNumber !== null && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-green-400 text-xl">&#10003;</span>
            <h3 className="text-xl font-bold text-white">
              Deal #{solvedNumber} &mdash; Solved!
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-white/50">Player Moves</span>
              <p className="text-white font-semibold text-lg">{moves.length}</p>
            </div>
            <div>
              <span className="text-white/50">Total Moves (incl. auto)</span>
              <p className="text-white font-semibold text-lg">{totalMoveCount}</p>
            </div>
            {solveTime !== null && (
              <div>
                <span className="text-white/50">Solve Time</span>
                <p className="text-white font-semibold text-lg">
                  {solveTime < 1000 ? `${Math.round(solveTime)}ms` : `${(solveTime / 1000).toFixed(2)}s`}
                </p>
              </div>
            )}
          </div>

          {descriptions.length > 0 && (
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto mt-4">
              <h4 className="font-semibold text-white/70 text-sm uppercase tracking-wider mb-2">
                Solution Steps
              </h4>
              {descriptions.map((step, i) => (
                <div key={i} className="text-sm text-white/60 bg-black/20 rounded px-3 py-2 font-mono">
                  <span className="text-[#D4AF37] mr-2">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          )}

          <div className="pt-2">
            <Link
              href={`/game/${solvedNumber}`}
              className="text-[#D4AF37] hover:text-[#e5c548] text-sm font-medium transition-colors"
            >
              Play Deal #{solvedNumber} &rarr;
            </Link>
          </div>
        </div>
      )}

      {status === 'failed' && solvedNumber !== null && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-red-400 text-xl">&#10007;</span>
            <h3 className="text-xl font-bold text-white">
              Deal #{solvedNumber} &mdash; {isUnsolvable ? 'Unsolvable!' : 'No Solution Found'}
            </h3>
          </div>
          {isUnsolvable ? (
            <p className="text-white/60 leading-relaxed">
              Deal #{solvedNumber} is one of the <strong className="text-white/80">8 known unsolvable deals</strong> in
              the first 1,000,000 FreeCell games. No matter how you play, this deal cannot be won. The
              complete list of unsolvable deals:{' '}
              {UNSOLVABLE_DEALS.map((d, i) => (
                <span key={d}>
                  <Link href={`/game/${d}`} className="text-[#D4AF37] hover:underline">#{d}</Link>
                  {i < UNSOLVABLE_DEALS.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-white/60 leading-relaxed">
              The solver could not find a solution within its search limit of 300,000 states.
              This deal may still be solvable with a different approach. Try{' '}
              <Link href={`/game/${solvedNumber}`} className="text-[#D4AF37] hover:underline">
                playing it yourself
              </Link>!
            </p>
          )}
          {solveTime !== null && (
            <p className="text-white/40 text-sm">
              Search completed in {solveTime < 1000 ? `${Math.round(solveTime)}ms` : `${(solveTime / 1000).toFixed(2)}s`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
