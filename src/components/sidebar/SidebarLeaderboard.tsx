'use client';

import { Trophy } from 'lucide-react';
import { CompactLeaderboard } from '@/components/Leaderboard';
import type { LeaderboardEntry } from '@/lib/leaderboardClient';

interface SidebarLeaderboardProps {
  entries: LeaderboardEntry[];
  playerId: string;
  loading?: boolean;
  onShowFull: () => void;
}

export default function SidebarLeaderboard({ entries, playerId, loading, onShowFull }: SidebarLeaderboardProps) {
  const isEmpty = !loading && entries.length === 0;

  return (
    <div
      className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,62,24,0.95),rgba(7,25,9,0.94))] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      role="region"
      aria-label="Daily Leaderboard"
    >
      <div className="mb-3 flex items-center gap-2">
        <Trophy size={14} className="text-[#D4AF37]" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Daily Leaderboard</h3>
      </div>

      {loading && (
        <div className="py-4 text-center">
          <p className="text-sm text-white/[0.45] animate-pulse">Loading...</p>
        </div>
      )}

      {isEmpty && (
        <div className="rounded-[18px] border border-white/6 bg-white/[0.03] py-4 text-center">
          <div className="mb-1.5 text-2xl opacity-30" aria-hidden="true">&#127942;</div>
          <p className="text-sm font-medium text-white/70">No scores yet today</p>
          <p className="mt-0.5 text-xs text-white/[0.45]">Win today&apos;s challenge to claim #1</p>
        </div>
      )}

      {!loading && !isEmpty && (
        <>
          <CompactLeaderboard entries={entries} playerId={playerId} loading={loading} showHeader={false} />
          <button
            type="button"
            onClick={onShowFull}
            className="mt-3 w-full rounded-full border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer"
          >
            Show Full Leaderboard
          </button>
        </>
      )}
    </div>
  );
}
