'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, User, ChevronLeft, ChevronRight, Pencil, Check } from 'lucide-react';
import {
  LeaderboardEntry,
  fetchDailyLeaderboard,
  fetchAllTimeLeaderboard,
  formatLeaderboardTime,
} from '@/lib/leaderboardClient';
import { getPlayerIdentity, setPlayerNickname } from '@/lib/playerIdentity';

type Tab = 'today' | 'alltime';
const PAGE_SIZE = 15;

export default function LeaderboardFullView() {
  const [tab, setTab] = useState<Tab>('today');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [playerId, setPlayerId] = useState(() => {
    if (typeof window === 'undefined') return '';
    return getPlayerIdentity().id;
  });
  const [nickname, setNickname] = useState(() => {
    if (typeof window === 'undefined') return 'Anonymous';
    return getPlayerIdentity().nickname;
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = tab === 'today'
        ? await fetchDailyLeaderboard()
        : await fetchAllTimeLeaderboard();
      setEntries(data);
    } catch {
      setEntries([]);
    }
    setLoading(false);
  }, [tab]);

  // Reset page and load data when tab changes
  const handleTabChange = useCallback((newTab: Tab) => {
    setTab(newTab);
    setPage(0);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const pageEntries = entries.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const yourEntry = entries.find((e) => e.playerId === playerId);
  const yourRank = yourEntry?.rank;

  const handleSaveNickname = () => {
    if (nameInput.trim()) {
      const updated = setPlayerNickname(nameInput);
      setNickname(updated.nickname);
    }
    setEditingName(false);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={18} className="text-yellow-400" />;
    if (rank === 2) return <Medal size={18} className="text-gray-300" />;
    if (rank === 3) return <Medal size={18} className="text-amber-600" />;
    return <span className="text-white/30 text-sm">#{rank}</span>;
  };

  return (
    <div>
      {/* Your Rank Card */}
      <div className="mb-6 p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <User size={18} className="text-yellow-500/70" />
            </div>
            <div>
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNickname()}
                    maxLength={20}
                    placeholder="Enter nickname"
                    autoFocus
                    className="bg-black/30 border border-yellow-500/30 rounded-lg px-3 py-1 text-sm text-yellow-200 w-40 outline-none focus:border-yellow-500/60"
                  />
                  <button onClick={handleSaveNickname} className="p-1.5 text-yellow-400 hover:text-yellow-300">
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-yellow-400">{nickname}</span>
                  <button
                    onClick={() => { setNameInput(nickname === 'Anonymous' ? '' : nickname); setEditingName(true); }}
                    className="p-1 text-yellow-500/30 hover:text-yellow-400 transition-colors"
                  >
                    <Pencil size={12} />
                  </button>
                </div>
              )}
              <p className="text-xs text-yellow-500/40">
                {yourRank ? `Ranked #${yourRank} of ${entries.length} players` : 'Play the daily challenge to get ranked'}
              </p>
            </div>
          </div>
          {yourEntry && (
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-yellow-200">{formatLeaderboardTime(yourEntry.time)}</div>
                <div className="text-[10px] text-yellow-500/40 uppercase tracking-wider">Time</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-yellow-200">{yourEntry.moves}</div>
                <div className="text-[10px] text-yellow-500/40 uppercase tracking-wider">Moves</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-4">
        <button
          onClick={() => handleTabChange('today')}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
            tab === 'today'
              ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => handleTabChange('alltime')}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
            tab === 'alltime'
              ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          All-Time Best
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[3rem_1fr_4.5rem_4rem_5rem] px-5 py-3 text-[10px] font-bold text-white/25 uppercase tracking-widest border-b border-white/5">
          <span>Rank</span>
          <span>Player</span>
          <span className="text-center">Time</span>
          <span className="text-center">Moves</span>
          <span className="text-center hidden sm:block">Game</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-white/30 text-sm animate-pulse">
            Loading leaderboard...
          </div>
        )}

        {/* Empty State */}
        {!loading && entries.length === 0 && (
          <div className="py-16 text-center">
            <Trophy size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-base">No entries yet</p>
            <p className="text-white/20 text-sm mt-2">Win a daily challenge to be the first on the board!</p>
          </div>
        )}

        {/* Entries */}
        {!loading && pageEntries.map((entry, i) => {
          const isYou = entry.playerId === playerId;
          const globalIndex = page * PAGE_SIZE + i;
          return (
            <motion.div
              key={`full-${entry.playerId}-${entry.timestamp}-${entry.rank}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025, duration: 0.2 }}
              className={`grid grid-cols-[3rem_1fr_4.5rem_4rem_5rem] px-5 py-3 items-center transition-colors group ${
                isYou
                  ? 'bg-yellow-500/10 border-l-2 border-yellow-400'
                  : globalIndex % 2 === 0
                  ? 'bg-white/[0.01]'
                  : ''
              } ${entry.rank <= 3 ? 'bg-white/[0.03]' : 'hover:bg-white/[0.04]'}`}
            >
              <div className="flex items-center justify-center font-bold">
                {getRankIcon(entry.rank)}
              </div>
              <div className={`font-medium truncate pr-2 ${
                isYou ? 'text-yellow-400' : 'text-white/70 group-hover:text-white/90'
              } transition-colors`}>
                {entry.playerName}
                {isYou && <span className="text-[10px] text-yellow-500/50 ml-2">(you)</span>}
              </div>
              <div className={`text-center font-mono text-sm ${
                isYou ? 'text-yellow-200' : 'text-white/40 group-hover:text-white/70'
              } transition-colors`}>
                {formatLeaderboardTime(entry.time)}
              </div>
              <div className={`text-center font-mono text-sm ${
                isYou ? 'text-yellow-200' : 'text-white/40 group-hover:text-white/70'
              } transition-colors`}>
                {entry.moves}
              </div>
              <div className="text-center font-mono text-xs text-white/20 hidden sm:block">
                #{entry.gameNumber}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-white/30 tabular-nums">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Info */}
      <p className="text-center text-[10px] text-white/15 mt-8 uppercase tracking-widest">
        {tab === 'today' ? 'Daily leaderboard resets at midnight UTC' : 'Best scores from all daily challenges'}
      </p>
    </div>
  );
}
