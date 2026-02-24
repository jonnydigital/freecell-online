'use client';

import { GameStats, getWinPercent, getAverageTime } from '../lib/stats';

interface StatsPanelProps {
  stats: GameStats;
  isOpen: boolean;
  onClose: () => void;
}

function formatTime(seconds: number | null): string {
  if (seconds === null) return '—';
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function StatsPanel({ stats, isOpen, onClose }: StatsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#0d2e0d] border border-[#1a5c1a]/50 rounded-xl p-6 w-80 max-w-[90vw]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Statistics</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <StatBox label="Games Played" value={stats.gamesPlayed.toString()} />
          <StatBox label="Games Won" value={stats.gamesWon.toString()} />
          <StatBox label="Win Rate" value={`${getWinPercent(stats)}%`} />
          <StatBox
            label="Current Streak"
            value={stats.currentStreak.toString()}
          />
          <StatBox
            label="Longest Streak"
            value={stats.longestStreak.toString()}
          />
          <StatBox label="Best Time" value={formatTime(stats.bestTime)} />
          <StatBox
            label="Avg Time"
            value={formatTime(getAverageTime(stats))}
          />
          <StatBox
            label="Least Moves"
            value={stats.leastMoves?.toString() ?? '—'}
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded-lg text-white text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-[#d4a843]">{value}</div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  );
}
