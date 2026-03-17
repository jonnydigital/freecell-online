'use client';

import { motion } from 'framer-motion';
import {
  getDailySeed,
  getSpeedTier,
  getMoveTier,
  getEmojiGrid,
} from '@/lib/dailyChallenge';

interface ShareResultCardProps {
  dateStr: string;
  moves: number;
  time: number;
  hintsUsed: number;
  streak?: number;
}

function getStarCount(moves: number): number {
  if (moves <= 60) return 3;
  if (moves <= 90) return 2;
  return 1;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ShareResultCard({
  dateStr,
  moves,
  time,
  hintsUsed,
  streak,
}: ShareResultCardProps) {
  const seed = getDailySeed(dateStr);
  const starCount = getStarCount(moves);
  const grid = getEmojiGrid(moves, time, hintsUsed);
  const speedTier = getSpeedTier(time);
  const moveTier = getMoveTier(moves);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 150 }}
      className="w-[350px] max-w-full mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: '#0a3d0a' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3 text-center">
        <div className="text-white/50 text-xs tracking-widest uppercase mb-1">
          {formatDate(dateStr)}
        </div>
        <div className="text-white text-xl font-bold">
          🃏 FreeCell Daily #{seed}
        </div>
        <div className="mt-1.5">
          {'⭐'.repeat(starCount)}
          {'☆'.repeat(3 - starCount)}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 px-5 py-4">
        <div className="text-center">
          <div className="text-white text-xl font-bold">{formatTime(time)}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">Time</div>
        </div>
        <div className="text-center">
          <div className="text-white text-xl font-bold">{moves}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">Moves</div>
        </div>
        <div className="text-center">
          <div className="text-white text-xl font-bold">{hintsUsed}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">Hints</div>
        </div>
      </div>

      {/* Emoji Performance Grid */}
      <div className="px-5 pb-3 text-center">
        <div className="text-2xl tracking-widest">{grid}</div>
        <div className="flex justify-center gap-3 mt-1 text-[10px] text-white/30">
          <span>{speedTier === '🟩' ? 'Fast' : speedTier === '🟨' ? 'Steady' : 'Slow'}</span>
          <span>·</span>
          <span>{moveTier === '🟩' ? 'Efficient' : moveTier === '🟨' ? 'Good' : 'Many'}</span>
          <span>·</span>
          <span>{hintsUsed === 0 ? 'No Hints' : `${hintsUsed} Hint${hintsUsed > 1 ? 's' : ''}`}</span>
        </div>
      </div>

      {/* Suit Completion */}
      <div className="flex justify-center gap-2 pb-3">
        {['♠', '♥', '♦', '♣'].map((suit, i) => (
          <div
            key={suit}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{
              background: '#1a5c1a',
              color: i === 1 || i === 2 ? '#c83232' : '#e0e0e0',
            }}
          >
            {suit}
          </div>
        ))}
      </div>

      {/* Streak */}
      {streak && streak >= 2 && (
        <div className="text-center pb-3 text-sm">
          <span className="text-orange-400 font-bold">🔥 {streak}-day streak</span>
        </div>
      )}

      {/* Footer */}
      <div className="bg-[#072907] px-5 py-3 text-center">
        <div className="text-white/30 text-[11px] tracking-wider">
          playfreecellonline.com/daily-freecell
        </div>
      </div>
    </motion.div>
  );
}
