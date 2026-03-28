'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Calendar, Trophy, Share2, Eye, Zap } from 'lucide-react';
import { saveStarRating } from '@/lib/storage';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { getShareText as getDailyShareText } from '@/lib/dailyChallenge';
import { getTodayStr } from '@/lib/dailyChallenge';
import { CompactLeaderboard } from './Leaderboard';
import { LeaderboardEntry } from '@/lib/leaderboardClient';
import ShareResultCard from './ShareResultCard';

const VARIANT_META: Record<string, { path: string; name: string }> = {
  'freecell-1cell': { path: '/freecell/1-cell', name: '1-Cell FreeCell' },
  'freecell-2cell': { path: '/freecell/2-cell', name: '2-Cell FreeCell' },
  'freecell-3cell': { path: '/freecell/3-cell', name: '3-Cell FreeCell' },
};

interface WinScreenProps {
  gameNumber: number;
  time: number;
  moves: number;
  hintsUsed: number;
  variant?: string;
  onPlayAgain: () => void;
  onDailyChallenge: () => void;
  solverStatus?: 'idle' | 'solving' | 'solved' | 'failed';
  optimalMoves?: number;
  onViewSolution?: () => void;
  isDailyGame?: boolean;
  streak?: number;
  leaderboardEntries?: LeaderboardEntry[];
  leaderboardRank?: number;
  leaderboardLoading?: boolean;
  playerId?: string;
}

function getStarCount(moves: number): number {
  if (moves <= 60) return 3;
  if (moves <= 90) return 2;
  return 1;
}

/** Calculate a score: base 500 + time bonus (faster = more) + move efficiency bonus - hint penalty */
function calculateScore(moves: number, time: number, hintsUsed: number): { total: number; moveBonus: number; timeBonus: number; hintPenalty: number } {
  const BASE = 500;
  // Move bonus: 60 moves (perfect) = 300 pts, 120+ moves = 0
  const moveBonus = Math.max(0, Math.round(300 * (1 - Math.max(0, moves - 60) / 60)));
  // Time bonus: under 2 min = 200 pts, over 10 min = 0
  const timeBonus = Math.max(0, Math.round(200 * (1 - Math.max(0, time - 120) / 480)));
  // Hint penalty: -15 per hint used
  const hintPenalty = hintsUsed * 15;
  return { total: BASE + moveBonus + timeBonus - hintPenalty, moveBonus, timeBonus, hintPenalty };
}

/** Animated counter hook — counts from 0 to target over duration ms */
function useAnimatedCounter(target: number, duration: number, delay: number): number {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startTimeRef.current) startTimeRef.current = ts;
        const elapsed = ts - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic for satisfying deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function WinScreen({
  gameNumber,
  time,
  moves,
  hintsUsed,
  variant,
  onPlayAgain,
  onDailyChallenge,
  solverStatus,
  optimalMoves,
  onViewSolution,
  isDailyGame,
  streak,
  leaderboardEntries,
  leaderboardRank,
  leaderboardLoading,
  playerId,
}: WinScreenProps) {
  const [visible, setVisible] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  const starCount = getStarCount(moves);
  const score = useMemo(() => calculateScore(moves, time, hintsUsed), [moves, time, hintsUsed]);
  const animatedScore = useAnimatedCounter(score.total, 1200, 1000);

  const isNewBest = useMemo(() => {
    return saveStarRating(gameNumber, starCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameNumber, starCount]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    let shareText: string;

    if (isDailyGame) {
      shareText = getDailyShareText(getTodayStr(), moves, time, hintsUsed, streak);
    } else {
      const starEmoji = '⭐'.repeat(starCount);
      const meta = VARIANT_META[variant || 'freecell'];
      const gameName = meta?.name || 'FreeCell';
      const gameUrl = meta
        ? absoluteUrl(`${meta.path}?game=${gameNumber}`)
        : absoluteUrl(`/game/${gameNumber}`);
      shareText = `I solved ${gameName} Game #${gameNumber} in ${moves} moves (${formatTime(time)})! ${starEmoji}\nScore: ${score.total.toLocaleString()} pts\nCan you beat it? ${gameUrl}`;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.brandName,
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
    <div className="absolute inset-0 z-[2000] flex items-center justify-center animate-in fade-in duration-500 overflow-y-auto py-6 backdrop-blur-sm">
      <div className="bg-[#0d2f0d]/95 border border-[#2a7c2a]/60 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-[92%] text-center backdrop-blur-sm my-auto">
        <Trophy size={52} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-yellow-400 mb-1.5">You Win!</h2>
        <p className="text-white/50 text-sm mb-1">Game #{gameNumber}</p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-2">
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
            className="text-xs font-bold text-yellow-300 mb-3"
          >
            New Best!
          </motion.div>
        )}
        {!isNewBest && <div className="mb-3" />}

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mb-5 py-3 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-400" />
            <span className="text-3xl font-black text-white tabular-nums">{animatedScore.toLocaleString()}</span>
            <span className="text-xs text-white/40 mt-1.5">pts</span>
          </div>
          <div className="flex justify-center gap-4 text-[10px] text-white/40">
            {score.moveBonus > 0 && <span>Moves +{score.moveBonus}</span>}
            {score.timeBonus > 0 && <span>Speed +{score.timeBonus}</span>}
            {score.hintPenalty > 0 && <span>Hints -{score.hintPenalty}</span>}
          </div>
        </motion.div>

        {/* Daily Challenge Share Card */}
        {isDailyGame && (
          <div className="mb-5">
            <ShareResultCard
              dateStr={getTodayStr()}
              moves={moves}
              time={time}
              hintsUsed={hintsUsed}
              streak={streak}
            />
            <p className="text-white/30 text-[10px] mt-2 text-center">
              Screenshot this card to share!
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 mb-5">
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
          <div className="text-sm text-white/40 mb-5 animate-pulse">Analyzing optimal solution...</div>
        )}
        {solverStatus === 'solved' && optimalMoves !== undefined && (
          <div className="text-sm text-white/60 mb-5">
            Optimal: <span className="text-emerald-400 font-bold">{optimalMoves}</span> moves
            {moves <= optimalMoves ? (
              <span className="text-yellow-400 ml-1 font-semibold">Perfect!</span>
            ) : (
              <span className="text-white/40 ml-1">(+{moves - optimalMoves} extra)</span>
            )}
          </div>
        )}
        {(solverStatus !== 'solving' && solverStatus !== 'solved') && <div className="mb-3" />}

        {/* Leaderboard Rank */}
        {isDailyGame && leaderboardRank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-5 py-3 px-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
          >
            <p className="text-xs text-yellow-400 font-bold">
              Ranked #{leaderboardRank} on today&apos;s leaderboard
            </p>
          </motion.div>
        )}

        {/* Compact Leaderboard Widget */}
        {isDailyGame && leaderboardEntries && leaderboardEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-5"
          >
            <CompactLeaderboard
              entries={leaderboardEntries}
              yourRank={leaderboardRank}
              playerId={playerId || ''}
              loading={leaderboardLoading}
            />
          </motion.div>
        )}

        <div className="flex flex-col gap-3.5">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white font-semibold rounded-xl transition-colors"
          >
            <Shuffle size={18} />
            Play Again
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-xl transition-colors"
          >
            <Share2 size={18} />
            {shareStatus === 'copied' ? 'Copied!' : 'Share Results'}
          </button>
          {(!variant || variant === 'freecell') && (
            <button
              onClick={onDailyChallenge}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-yellow-700/80 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Calendar size={18} />
              Daily Challenge
            </button>
          )}
          {solverStatus === 'solved' && onViewSolution && (
            <button
              onClick={onViewSolution}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
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
