'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Crown, Timer, Hash, User } from 'lucide-react';
import { GameStats } from '../lib/stats';

interface LeaderboardProps {
    isOpen: boolean;
    onClose: () => void;
    stats: GameStats;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    time: string;
    moves: number;
    isUser?: boolean;
}

const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'SolitaireKing88', time: '0:42', moves: 52 },
    { rank: 2, name: 'FreeCellMaster', time: '0:48', moves: 58 },
    { rank: 3, name: 'CardShark_99', time: '0:51', moves: 61 },
    { rank: 4, name: 'AceOfSpades', time: '0:55', moves: 54 },
    { rank: 5, name: 'QuickDraw', time: '1:02', moves: 65 },
    { rank: 6, name: 'ZenGamer', time: '1:08', moves: 59 },
    { rank: 7, name: 'HiddenDragon', time: '1:12', moves: 72 },
    { rank: 8, name: 'CascadeQueen', time: '1:15', moves: 68 },
    { rank: 9, name: 'UndoAddict', time: '1:19', moves: 85 },
    { rank: 10, name: 'LazyKing', time: '1:25', moves: 94 },
];

export default function Leaderboard({ isOpen, onClose, stats }: LeaderboardProps) {
    const formatTime = (seconds: number | null) => {
        if (seconds === null || seconds === 0) return 'N/A';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const personalBest: LeaderboardEntry = {
        rank: 0, // Will be calculated or shown separately
        name: 'You (Best)',
        time: formatTime(stats.bestTime),
        moves: stats.leastMoves || 0,
        isUser: true,
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a351a] border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-6 text-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                            <div className="flex justify-center mb-2">
                                <div className="p-3 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                                    <Trophy size={32} className="text-[#D4AF37]" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                                World Leaderboard
                            </h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Global Rankings • Daily Reset</p>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="flex flex-col gap-1.5">
                                {/* Ranking Header */}
                                <div className="grid grid-cols-[3rem_1fr_4rem_4rem] px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/5 mb-2">
                                    <span>Rank</span>
                                    <span>Player</span>
                                    <span className="text-center">Time</span>
                                    <span className="text-center">Moves</span>
                                </div>

                                {/* Sub-header for Personal */}
                                <div className="px-4 py-1 mb-1">
                                    <span className="text-[10px] font-bold text-yellow-500/50 uppercase tracking-widest">Personal Performance</span>
                                </div>

                                {/* Personal Entry */}
                                <div className="grid grid-cols-[3rem_1fr_4rem_4rem] px-4 py-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl items-center mb-4 shadow-lg shadow-yellow-900/10">
                                    <div className="flex items-center justify-center">
                                        <User size={16} className="text-yellow-500/70" />
                                    </div>
                                    <div className="font-bold text-yellow-500">Your Personal Best</div>
                                    <div className="text-center font-mono text-sm text-yellow-200">{personalBest.time}</div>
                                    <div className="text-center font-mono text-sm text-yellow-200">{personalBest.moves || '-'}</div>
                                </div>

                                {/* Sub-header for Global */}
                                <div className="px-4 py-1 mb-1 border-t border-white/5 pt-4">
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Global Top 10</span>
                                </div>

                                {/* Global Entries */}
                                {GLOBAL_LEADERBOARD.map((entry) => (
                                    <div
                                        key={entry.rank}
                                        className={`grid grid-cols-[3rem_1fr_4rem_4rem] px-4 py-3 rounded-xl items-center transition-colors group ${entry.rank <= 3 ? 'bg-white/5' : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center font-bold text-sm">
                                            {entry.rank === 1 && <Crown size={18} className="text-yellow-400" />}
                                            {entry.rank === 2 && <Medal size={18} className="text-gray-300" />}
                                            {entry.rank === 3 && <Medal size={18} className="text-amber-600" />}
                                            {entry.rank > 3 && <span className="text-white/30 group-hover:text-white/60 transition-colors">#{entry.rank}</span>}
                                        </div>
                                        <div className="font-semibold text-white/80 group-hover:text-white transition-colors truncate pr-2">
                                            {entry.name}
                                        </div>
                                        <div className="text-center font-mono text-sm text-white/50 group-hover:text-white/90 transition-colors">
                                            {entry.time}
                                        </div>
                                        <div className="text-center font-mono text-sm text-white/50 group-hover:text-white/90 transition-colors">
                                            {entry.moves}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-black/40 text-center">
                            <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
                                Connect with Google Play or GameCenter <br /> to save your spot on the world rankings.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
