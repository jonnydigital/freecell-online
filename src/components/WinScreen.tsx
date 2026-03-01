'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Calendar, Trophy, Share2, Eye } from 'lucide-react';
import { saveStarRating } from '@/lib/storage';

interface WinScreenProps {
  gameNumber: number;
  time: number;
  moves: number;
  hintsUsed: number;
  onPlayAgain: () => void;
  onDailyChallenge: () => void;
  solverStatus?: 'idle' | 'solving' | 'solved' | 'failed';
  optimalMoves?: number;
  onViewSolution?: () => void;
}

function getStarCount(moves: number): number {
  if (moves <= 60) return 3;
  if (moves <= 90) return 2;
  return 1;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function WinScreen({ gameNumber, time, moves, hintsUsed, onPlayAgain, onDailyChallenge, solverStatus, optimalMoves, onViewSolution }: WinScreenProps) {
  const [visible, setVisible] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  const starCount = getStarCount(moves);

  const isNewBest = useMemo(() => {
    return saveStarRating(gameNumber, starCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameNumber, starCount]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const starEmoji = '⭐'.repeat(starCount);
    const shareText = `I solved FreeCell Game #${gameNumber} in ${moves} moves (${formatTime(time)})! ${starEmoji}\nCan you beat it? https://playfreecellonline.com/game/${gameNumber}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FreeCell Online',
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard if share cancelled/fails
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      // Silent fail
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center animate-in fade-in duration-500">
      <div className="bg-[#0d2f0d]/95 border border-[#2a7c2a]/60 rounded-2xl shadow-2xl p-8 max-w-sm w-[90%] text-center backdrop-blur-sm">
        <Trophy size={48} className="mx-auto text-yellow-400 mb-3" />
        <h2 className="text-2xl font-bold text-yellow-400 mb-1">You Win!</h2>
        <p className="text-white/50 text-sm mb-4">Congratulations!</p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill={i < starCount ? '#facc15' : '#374151'}
              stroke={i < starCount ? '#eab308' : '#4b5563'}
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </motion.svg>
          ))}
        </div>
        {isNewBest && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-xs font-bold text-yellow-300 mb-4"
          >
            New Best!
          </motion.div>
        )}
        {!isNewBest && <div className="mb-4" />}

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
            <div className="text-xs text-white/50 mt-1">Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{moves}</div>
            <div className="text-xs text-white/50 mt-1">Moves</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{hintsUsed}</div>
            <div className="text-xs text-white/50 mt-1">Hints</div>
          </div>
        </div>

        {/* Solver Analysis */}
        {solverStatus === 'solving' && (
          <div className="text-sm text-white/40 mb-6 animate-pulse">Analyzing optimal solution...</div>
        )}
        {solverStatus === 'solved' && optimalMoves !== undefined && (
          <div className="text-sm text-white/60 mb-6">
            Optimal: <span className="text-emerald-400 font-bold">{optimalMoves}</span> moves
            {moves <= optimalMoves ? (
              <span className="text-yellow-400 ml-1 font-semibold">Perfect!</span>
            ) : (
              <span className="text-white/40 ml-1">(+{moves - optimalMoves} extra)</span>
            )}
          </div>
        )}
        {(solverStatus !== 'solving' && solverStatus !== 'solved') && <div className="mb-4" />}

        <div className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white font-semibold rounded-lg transition-colors"
          >
            <Shuffle size={18} />
            Play Again
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-lg transition-colors"
          >
            <Share2 size={18} />
            {shareStatus === 'copied' ? 'Copied!' : 'Share Results'}
          </button>
          <button
            onClick={onDailyChallenge}
            className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-700/80 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
          >
            <Calendar size={18} />
            Daily Challenge
          </button>
          {solverStatus === 'solved' && onViewSolution && (
            <button
              onClick={onViewSolution}
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Eye size={18} />
              View Optimal Solution
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
