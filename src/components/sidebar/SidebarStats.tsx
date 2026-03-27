'use client';

import { useState, useEffect } from 'react';
import { loadStats } from '@/lib/storage';
import { getWinPercent } from '@/lib/stats';
import { getCurrentStreak } from '@/lib/dailyChallenge';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function SidebarStats() {
  const [winPercent, setWinPercent] = useState(0);
  const [bestTime, setBestTime] = useState<string>('--');
  const [bestMoves, setBestMoves] = useState<string>('--');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const stats = loadStats();
    setWinPercent(getWinPercent(stats));
    setBestTime(stats.bestTime !== null ? formatTime(stats.bestTime) : '--');
    setBestMoves(stats.leastMoves !== null ? String(stats.leastMoves) : '--');
    setStreak(getCurrentStreak());
  }, []);

  return (
    <div
      className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(27,73,29,0.95),rgba(8,28,10,0.94))] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      role="region"
      aria-label="Your Stats"
    >
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
        Your Stats
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <StatCell label="Win Rate" value={`${winPercent}%`} />
        <StatCell label="Best Time" value={bestTime} />
        <StatCell label="Best Moves" value={bestMoves} />
        <StatCell label="Streak" value={streak > 0 ? `${streak}d` : '--'} />
      </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/6 bg-white/[0.03] px-3 py-2.5 text-center">
      <div className="text-lg font-bold text-white/90 leading-tight">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
        {label}
      </div>
    </div>
  );
}
