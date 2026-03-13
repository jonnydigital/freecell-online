'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Crown, User, ChevronLeft, ChevronRight, Pencil, Check } from 'lucide-react';
import {
  LeaderboardEntry,
  fetchDailyLeaderboard,
  fetchAllTimeLeaderboard,
  formatLeaderboardTime,
} from '../lib/leaderboardClient';
import { getPlayerIdentity, setPlayerNickname } from '../lib/playerIdentity';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'today' | 'alltime';
const PAGE_SIZE = 10;

export default function Leaderboard({ isOpen, onClose }: LeaderboardProps) {
  const [tab, setTab] = useState<Tab>('today');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
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
  const [wasOpen, setWasOpen] = useState(false);

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

  // Load data when modal opens or tab changes
  useEffect(() => {
    if (isOpen) {
      // Refresh identity when opening
      if (!wasOpen) {
        const player = getPlayerIdentity();
        setPlayerId(player.id);
        setNickname(player.nickname);
        setWasOpen(true);
      }
      setPage(0);
      loadData();
    } else {
      setWasOpen(false);
    }
  }, [isOpen, tab, loadData, wasOpen]);

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
    if (rank === 1) return <Crown size={16} className="text-yellow-400" />;
    if (rank === 2) return <Medal size={16} className="text-gray-300" />;
    if (rank === 3) return <Medal size={16} className="text-amber-600" />;
    return <span className="text-white/30 text-xs">#{rank}</span>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a351a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative p-5 text-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0">
              <div className="flex justify-center mb-2">
                <div className="p-2.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                  <Trophy size={28} className="text-[#D4AF37]" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Leaderboard
              </h2>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                {tab === 'today' ? "Today's Rankings" : 'All-Time Best'}
              </p>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 shrink-0">
              <button
                onClick={() => setTab('today')}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === 'today'
                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTab('alltime')}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === 'alltime'
                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                All-Time
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Your Rank Card */}
              <div className="mx-3 mt-3 mb-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <User size={14} className="text-yellow-500/70" />
                    </div>
                    <div>
                      {editingName ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveNickname()}
                            maxLength={20}
                            placeholder="Nickname"
                            autoFocus
                            className="bg-black/30 border border-yellow-500/30 rounded px-2 py-0.5 text-sm text-yellow-200 w-32 outline-none focus:border-yellow-500/60"
                          />
                          <button
                            onClick={handleSaveNickname}
                            className="p-1 text-yellow-400 hover:text-yellow-300"
                          >
                            <Check size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-yellow-400">{nickname}</span>
                          <button
                            onClick={() => { setNameInput(nickname === 'Anonymous' ? '' : nickname); setEditingName(true); }}
                            className="p-0.5 text-yellow-500/30 hover:text-yellow-400 transition-colors"
                          >
                            <Pencil size={10} />
                          </button>
                        </div>
                      )}
                      <p className="text-[10px] text-yellow-500/40">
                        {yourRank ? `Rank #${yourRank} of ${entries.length}` : 'Not ranked yet'}
                      </p>
                    </div>
                  </div>
                  {yourEntry && (
                    <div className="flex gap-4 text-right">
                      <div>
                        <div className="text-sm font-mono text-yellow-200">{formatLeaderboardTime(yourEntry.time)}</div>
                        <div className="text-[9px] text-yellow-500/40 uppercase">Time</div>
                      </div>
                      <div>
                        <div className="text-sm font-mono text-yellow-200">{yourEntry.moves}</div>
                        <div className="text-[9px] text-yellow-500/40 uppercase">Moves</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem] px-4 py-2 text-[9px] font-bold text-white/25 uppercase tracking-widest border-b border-white/5">
                <span>#</span>
                <span>Player</span>
                <span className="text-center">Time</span>
                <span className="text-center">Moves</span>
              </div>

              {/* Loading */}
              {loading && (
                <div className="py-12 text-center text-white/30 text-sm animate-pulse">
                  Loading...
                </div>
              )}

              {/* Empty State */}
              {!loading && entries.length === 0 && (
                <div className="py-12 text-center">
                  <Trophy size={32} className="mx-auto text-white/10 mb-3" />
                  <p className="text-white/30 text-sm">No entries yet</p>
                  <p className="text-white/20 text-xs mt-1">Win a daily challenge to claim your spot!</p>
                </div>
              )}

              {/* Entries */}
              {!loading && pageEntries.map((entry, i) => {
                const isYou = entry.playerId === playerId;
                const globalIndex = page * PAGE_SIZE + i;
                return (
                  <motion.div
                    key={`${entry.playerId}-${entry.timestamp}-${entry.rank}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                    className={`grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem] px-4 py-2.5 items-center transition-colors group ${
                      isYou
                        ? 'bg-yellow-500/10 border-l-2 border-yellow-400'
                        : globalIndex % 2 === 0
                        ? 'bg-white/[0.02]'
                        : ''
                    } ${entry.rank <= 3 ? 'bg-white/[0.03]' : 'hover:bg-white/[0.04]'}`}
                  >
                    <div className="flex items-center justify-center font-bold text-sm">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className={`font-medium text-sm truncate pr-2 ${
                      isYou ? 'text-yellow-400' : 'text-white/70 group-hover:text-white/90'
                    } transition-colors`}>
                      {entry.playerName}
                      {isYou && <span className="text-[9px] text-yellow-500/50 ml-1.5">(you)</span>}
                    </div>
                    <div className={`text-center font-mono text-xs ${
                      isYou ? 'text-yellow-200' : 'text-white/40 group-hover:text-white/70'
                    } transition-colors`}>
                      {formatLeaderboardTime(entry.time)}
                    </div>
                    <div className={`text-center font-mono text-xs ${
                      isYou ? 'text-yellow-200' : 'text-white/40 group-hover:text-white/70'
                    } transition-colors`}>
                      {entry.moves}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 py-3 border-t border-white/5 shrink-0">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[10px] text-white/30 tabular-nums">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-1.5 text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-3 bg-black/30 text-center border-t border-white/5 shrink-0">
              <p className="text-[9px] text-white/20 uppercase tracking-widest">
                {tab === 'today' ? 'Resets daily at midnight UTC' : 'Best scores across all days'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Compact Widget (for WinScreen) ──

interface CompactLeaderboardProps {
  entries: LeaderboardEntry[];
  yourRank?: number;
  playerId: string;
  loading?: boolean;
  showHeader?: boolean;
}

export function CompactLeaderboard({ entries, yourRank, playerId, loading, showHeader = true }: CompactLeaderboardProps) {
  const top5 = entries.slice(0, 5);
  const yourEntry = entries.find((e) => e.playerId === playerId);
  const showYourEntry = yourEntry && yourEntry.rank > 5;

  if (loading) {
    return (
      <div className="text-center py-3">
        <p className="text-white/30 text-xs animate-pulse">Loading leaderboard...</p>
      </div>
    );
  }

  if (entries.length === 0) return null;

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex items-center gap-1.5 mb-2">
          <Trophy size={12} className="text-yellow-500/60" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Today&apos;s Leaderboard</span>
        </div>
      )}
      <div className="overflow-hidden rounded-[18px] border border-white/8 bg-black/[0.18]">
        {top5.map((entry) => {
          const isYou = entry.playerId === playerId;
          return (
            <div
              key={`compact-${entry.playerId}-${entry.rank}`}
              className={`grid grid-cols-[1.5rem_1fr_3rem_2.5rem] px-2.5 py-1.5 text-xs items-center ${
                isYou ? 'bg-yellow-500/10 text-yellow-300' : 'text-white/50'
              } ${entry.rank < 5 ? 'border-b border-white/5' : ''}`}
            >
              <span className={`font-bold ${entry.rank === 1 ? 'text-yellow-400' : ''}`}>
                {entry.rank}
              </span>
              <span className="truncate font-medium">
                {entry.playerName}
                {isYou && <span className="text-yellow-500/40 ml-1 text-[9px]">(you)</span>}
              </span>
              <span className="text-right font-mono text-[10px]">{formatLeaderboardTime(entry.time)}</span>
              <span className="text-right font-mono text-[10px]">{entry.moves}</span>
            </div>
          );
        })}
        {showYourEntry && yourEntry && (
          <>
            <div className="px-2.5 py-0.5 text-center text-white/10 text-[9px]">...</div>
            <div className="grid grid-cols-[1.5rem_1fr_3rem_2.5rem] px-2.5 py-1.5 text-xs items-center bg-yellow-500/10 text-yellow-300 border-t border-white/5">
              <span className="font-bold">{yourEntry.rank}</span>
              <span className="truncate font-medium">
                {yourEntry.playerName}
                <span className="text-yellow-500/40 ml-1 text-[9px]">(you)</span>
              </span>
              <span className="text-right font-mono text-[10px]">{formatLeaderboardTime(yourEntry.time)}</span>
              <span className="text-right font-mono text-[10px]">{yourEntry.moves}</span>
            </div>
          </>
        )}
      </div>
      {yourRank && (
        <p className="text-center text-[9px] text-white/20 mt-1.5">
          Your rank: #{yourRank} of {entries.length}
        </p>
      )}
    </div>
  );
}
