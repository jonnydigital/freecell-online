'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Swords, MessageSquare, VolumeX, Volume2, Trophy, Target, Clock } from 'lucide-react';
import { getTodaysSeed, getTodayStr, loadDailyData, getCurrentStreak, isTodayCompleted } from '../lib/dailyChallenge';
import { loadStats } from '../lib/storage';
import { getAverageMoves, getAverageTime } from '../lib/stats';
import ThemeSelector from './ThemeSelector';
import CalendarHeatmap from './CalendarHeatmap';

interface HomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayDaily: (seed: number) => void;
  onNewGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onFeedback: () => void;
  onShowShortcuts: () => void;
  onAchievements?: () => void;
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
  onAchievements,
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

  const avgMoves = stats ? getAverageMoves(stats) : 0;
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

          {/* Shimmer styles defined in globals.css */}

          {/* Overlay Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 h-[92vh] max-h-[800px] text-white rounded-t-2xl shadow-2xl z-50 flex flex-col"
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
            <div className="overflow-y-auto flex-1 px-4 pb-6">
              <div className="max-w-md mx-auto space-y-4">

                {/* Daily Challenge CTA */}
                {todayCompleted ? (
                  <div className="text-center bg-black/20 border border-[#c9a84c]/40 rounded-xl p-4">
                    <div className="text-sm text-white/50 mb-1">Today&apos;s Challenge</div>
                    <div className="text-[#D4AF37] font-bold text-lg mb-1">✓ Completed</div>
                    <div className="flex justify-center items-center gap-4 text-white/70 text-sm">
                      <span>{todayResult?.moves} moves</span>
                      <span>·</span>
                      <span>{formatTime(todayResult?.time || 0)}</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { onPlayDaily(todaySeed); onClose(); }}
                    className="w-full text-lg font-bold py-4 px-6 rounded-xl text-[#0a3d0a] shimmer-button transition-transform active:scale-[0.97]"
                  >
                    Play Today&apos;s Challenge
                  </button>
                )}

                {/* Streaks & Heatmap */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
                      <div className="text-3xl font-bold text-white">
                        {streak > 0 ? `${streak}` : '0'}
                        {streak > 0 && <span className="ml-1">🔥</span>}
                      </div>
                      <div className="text-xs text-white/50 mt-1">Current Daily Streak</div>
                    </div>
                    <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
                      <div className="text-3xl font-bold text-white">
                        {dailyData?.longestStreak ?? 0}
                      </div>
                      <div className="text-xs text-white/50 mt-1">Longest Daily Streak</div>
                    </div>
                  </div>
                  {dailyData && <CalendarHeatmap completedDays={dailyData.completedDays} />}
                </div>


                {/* New Game */}
                <button
                  onClick={() => { onNewGame(); onClose(); }}
                  className="w-full text-base font-semibold py-3 rounded-xl bg-transparent border-2 border-[#c9a84c]/50 text-[#c9a84c] hover:bg-[#c9a84c]/10 active:scale-[0.97] transition-all"
                >
                  Play a Random Game
                </button>

                {/* Stats */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <h2
                    className="text-center text-lg font-bold mb-3 text-white/90"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Statistics
                  </h2>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{stats?.gamesPlayed ?? 0}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Played</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{stats?.gamesWon ?? 0}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Won</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{winRate}%</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Win Rate</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{avgMoves ?? 'N/A'}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Avg. Moves</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{formatTime(avgTime)}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Avg. Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#D4AF37]">{formatTime(stats?.bestTime ?? 0)}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Best Time</div>
                    </div>
                  </div>
                </div>

                {/* Theme Selector */}
                <ThemeSelector />

                {/* Content Links + Achievements */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <a href="/how-to-play" className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-black/20 transition-colors">
                    <HelpCircle size={22} className="text-[#D4AF37]" />
                    <span className="text-xs text-white/70">How to Play</span>
                  </a>
                  <a href="/strategy" className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-black/20 transition-colors">
                    <Swords size={22} className="text-[#D4AF37]" />
                    <span className="text-xs text-white/70">Strategy</span>
                  </a>
                  <a href="/faq" className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-black/20 transition-colors">
                    <MessageSquare size={22} className="text-[#D4AF37]" />
                    <span className="text-xs text-white/70">FAQ</span>
                  </a>
                  <button onClick={() => { if (onAchievements) onAchievements(); onClose(); }} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-black/20 transition-colors">
                    <Trophy size={22} className="text-[#D4AF37]" />
                    <span className="text-xs text-white/70">Badges</span>
                  </button>
                </div>

                {/* Settings */}
                <div className="flex justify-center items-center gap-4 pt-2 border-t border-white/10">
                  <button
                    onClick={onToggleMute}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-black/20 transition-colors text-sm"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>
                  <button
                    onClick={() => { onFeedback(); onClose(); }}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-black/20 transition-colors text-sm"
                  >
                    <MessageSquare size={18} />
                    <span>Feedback</span>
                  </button>
                  <button
                    onClick={() => { onShowShortcuts(); onClose(); }}
                    className="flex items-center gap-2 text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-black/20 transition-colors text-sm"
                  >
                    <span className="font-bold text-lg">?</span>
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
