'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Swords, MessageSquare, VolumeX, Volume2, Trophy, Flame, Zap, Layers, Shuffle, Bug, Grid3X3, Sprout } from 'lucide-react';
import { getTodaysSeed, getTodayStr, loadDailyData, getCurrentStreak } from '../lib/dailyChallenge';
import { loadStats } from '../lib/storage';
import { getAverageTime } from '../lib/stats';

interface HomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayDaily?: (seed: number) => void;
  onNewGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onFeedback: () => void;
  onShowShortcuts: () => void;
  onAchievements?: () => void;
  onLeaderboard?: () => void;
}

export default function HomeOverlay({
  isOpen,
  onClose,
  onPlayDaily,
  onNewGame,
  isMuted,
  onToggleMute,
  onFeedback,
  onShowShortcuts,
  onLeaderboard,
}: HomeOverlayProps) {
  const todaySeed = getTodaysSeed();
  const todayStr = getTodayStr();

  const dailyData = useMemo(() => (isOpen ? loadDailyData() : null), [isOpen]);
  const stats = useMemo(() => (isOpen ? loadStats() : null), [isOpen]);
  const streak = useMemo(() => (isOpen ? getCurrentStreak() : 0), [isOpen]);

  const todayCompleted = dailyData ? !!dailyData.completedDays[todayStr] : false;
  const todayResult = dailyData?.completedDays[todayStr];

  const winRate = stats && stats.gamesPlayed > 0
    ? ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(0)
    : '0';

  const avgTime = stats ? getAverageTime(stats) : 0;

  const formatTime = (seconds: number | null) => {
    if (seconds === null || !seconds || seconds === 0 || isNaN(seconds) || seconds === Infinity) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const dateDisplay = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Overlay Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 max-h-[92vh] text-white rounded-t-2xl shadow-2xl z-50 flex flex-col"
            style={{
              background: 'var(--felt-color)',
              backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08), transparent 70%)',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-overlay-title"
          >
            {/* Header */}
            <header className="flex-shrink-0 text-center pt-5 pb-3 px-4 relative">
              <h1
                id="home-overlay-title"
                className="text-3xl font-bold text-[#D4AF37]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                FreeCell Online
              </h1>
              <p className="text-white/50 text-sm mt-1">{dateDisplay}</p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </header>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 px-5 pb-8">
              <div className="max-w-lg mx-auto space-y-5">

                {/* 1. Daily Challenge CTA (only for standard FreeCell) */}
                {onPlayDaily && (todayCompleted ? (
                  <div className="text-center bg-black/20 border border-[#c9a84c]/40 rounded-xl p-5">
                    <div className="text-base text-white/50 mb-1">Today&apos;s Challenge</div>
                    <div className="text-[#D4AF37] font-bold text-xl mb-2">Completed</div>
                    <div className="flex justify-center items-center gap-4 text-white/70 text-base">
                      <span>{todayResult?.moves} moves</span>
                      <span>&middot;</span>
                      <span>{formatTime(todayResult?.time || 0)}</span>
                    </div>
                    {onLeaderboard && (
                      <button
                        onClick={() => { onLeaderboard(); onClose(); }}
                        className="mt-3 text-sm text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Trophy size={14} />
                        View Rankings
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => { onPlayDaily(todaySeed); onClose(); }}
                      className="w-full text-xl font-bold py-5 px-6 rounded-xl text-[#0a3d0a] shimmer-button transition-transform active:scale-[0.97]"
                    >
                      Play Today&apos;s Challenge
                    </button>
                    {onLeaderboard && (
                      <button
                        onClick={() => { onLeaderboard(); onClose(); }}
                        className="w-full mt-2 text-sm text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1.5 py-1"
                      >
                        <Trophy size={14} />
                        View Rankings
                      </button>
                    )}
                  </div>
                ))}

                {/* 2. Game Modes — 2x2 grid */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { onNewGame(); onClose(); }}
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all"
                  >
                    <Shuffle size={22} className="text-[#D4AF37] shrink-0" />
                    <span className="text-base font-semibold text-white/80">New Game</span>
                  </button>
                  <a
                    href="/streak"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-orange-500/20 hover:bg-orange-500/10 active:scale-[0.97] transition-all"
                  >
                    <Flame size={22} className="text-orange-400 shrink-0" />
                    <span className="text-base font-semibold text-orange-300">Streak</span>
                  </a>
                  <a
                    href="/storm"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-cyan-500/20 hover:bg-cyan-500/10 active:scale-[0.97] transition-all"
                  >
                    <Zap size={22} className="text-cyan-400 shrink-0" />
                    <span className="text-base font-semibold text-cyan-300">Storm</span>
                  </a>
                  <a
                    href="/bakers-game"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-purple-500/20 hover:bg-purple-500/10 active:scale-[0.97] transition-all"
                  >
                    <Layers size={22} className="text-purple-400 shrink-0" />
                    <span className="text-base font-semibold text-purple-300">Baker&apos;s</span>
                  </a>
                  <a
                    href="/eight-off"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-teal-500/20 hover:bg-teal-500/10 active:scale-[0.97] transition-all"
                  >
                    <Grid3X3 size={22} className="text-teal-400 shrink-0" />
                    <span className="text-base font-semibold text-teal-300">Eight Off</span>
                  </a>
                  <a
                    href="/easy-freecell"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-lime-500/20 hover:bg-lime-500/10 active:scale-[0.97] transition-all"
                  >
                    <Sprout size={22} className="text-lime-400 shrink-0" />
                    <span className="text-base font-semibold text-lime-300">Easy</span>
                  </a>
                  <a
                    href="/spider"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-rose-500/20 hover:bg-rose-500/10 active:scale-[0.97] transition-all"
                  >
                    <Bug size={22} className="text-rose-400 shrink-0" />
                    <span className="text-base font-semibold text-rose-300">Spider</span>
                  </a>
                  <a
                    href="/klondike"
                    className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 border border-amber-500/20 hover:bg-amber-500/10 active:scale-[0.97] transition-all"
                  >
                    <Layers size={22} className="text-amber-400 shrink-0" />
                    <span className="text-base font-semibold text-amber-300">Klondike</span>
                  </a>
                </div>

                {/* 3. Stats row */}
                <a
                  href="/stats"
                  className="flex items-center justify-between px-5 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-5 text-base text-white/70">
                    <span><strong className="text-[#D4AF37]">{stats?.gamesPlayed ?? 0}</strong> Played</span>
                    <span><strong className="text-[#D4AF37]">{winRate}%</strong> Win</span>
                    <span><strong className="text-[#D4AF37]">{formatTime(avgTime)}</strong> Avg</span>
                    {streak > 0 && <span><strong className="text-[#D4AF37]">{streak}</strong> Streak</span>}
                  </div>
                  <span className="text-sm text-white/30">&rarr;</span>
                </a>

                {/* 4. Quick links */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  <a href="/how-to-play" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-black/20 transition-colors">
                    <HelpCircle size={28} className="text-[#D4AF37]" />
                    <span className="text-sm text-white/70">How to Play</span>
                  </a>
                  <a href="/strategy" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-black/20 transition-colors">
                    <Swords size={28} className="text-[#D4AF37]" />
                    <span className="text-sm text-white/70">Strategy</span>
                  </a>
                  <a href="/faq" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-black/20 transition-colors">
                    <MessageSquare size={28} className="text-[#D4AF37]" />
                    <span className="text-sm text-white/70">FAQ</span>
                  </a>
                  <a href="/achievements" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-black/20 transition-colors">
                    <Trophy size={28} className="text-[#D4AF37]" />
                    <span className="text-sm text-white/70">Badges</span>
                  </a>
                </div>

                {/* 4b. Explore links */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-white/40">
                  <a href="/leaderboard" className="hover:text-[#D4AF37] transition-colors">Leaderboard</a>
                  <span>·</span>
                  <a href="/history" className="hover:text-[#D4AF37] transition-colors">History</a>
                  <span>·</span>
                  <a href="/glossary" className="hover:text-[#D4AF37] transition-colors">Glossary</a>
                  <span>·</span>
                  <a href="/tips" className="hover:text-[#D4AF37] transition-colors">Tips</a>
                  <span>·</span>
                  <a href="/solitaire-types" className="hover:text-[#D4AF37] transition-colors">Solitaire Types</a>
                  <span>·</span>
                  <a href="/winning-deals" className="hover:text-[#D4AF37] transition-colors">Winning Deals</a>
                </div>

                {/* 5. Settings row */}
                <div className="flex justify-center items-center gap-5 pt-4 border-t border-white/10">
                  <button
                    onClick={onToggleMute}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2.5 rounded-lg hover:bg-black/20 transition-colors text-base"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>
                  <button
                    onClick={() => { onFeedback(); onClose(); }}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2.5 rounded-lg hover:bg-black/20 transition-colors text-base"
                  >
                    <MessageSquare size={20} />
                    <span>Feedback</span>
                  </button>
                  <button
                    onClick={() => { onShowShortcuts(); onClose(); }}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2.5 rounded-lg hover:bg-black/20 transition-colors text-base"
                  >
                    <span className="font-bold text-xl">?</span>
                    <span>Shortcuts</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
