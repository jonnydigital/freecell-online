'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Trophy,
  Target,
  Clock,
  Flame,
  TrendingUp,
  Zap,
  BarChart3,
  Calendar,
  Star,
  CheckCircle2,
  XCircle,
  Swords,
  Timer,
} from 'lucide-react';
import { loadStats, type GameVariant } from '../../lib/storage';
import { loadAllStarRatings } from '../../lib/storage';
import { getAverageMoves, getAverageTime, getWinPercent } from '../../lib/stats';
import { loadDailyData, getCurrentStreak } from '../../lib/dailyChallenge';
import { loadStreakData } from '../../lib/streakStorage';
import { loadStormData } from '../../lib/stormStorage';
import { loadGameHistory, type GameResult } from '../../lib/gameHistory';

// ─── Types ───

type TimeFilter = 'all' | '7d' | '30d';
type Tab = 'overview' | 'history' | 'daily' | 'modes';

// ─── Animation Variants ───

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// ─── Helpers ───

function formatTime(seconds: number | null): string {
  if (seconds === null || !seconds || seconds === 0 || isNaN(seconds) || seconds === Infinity)
    return '—';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function filterByTime(history: GameResult[], filter: TimeFilter): GameResult[] {
  if (filter === 'all') return history;
  const now = Date.now();
  const ms = filter === '7d' ? 7 * 86400000 : 30 * 86400000;
  return history.filter((r) => now - r.ts < ms);
}

// ─── Chart Components (pure SVG) ───

function WinRateChart({ history }: { history: GameResult[] }) {
  if (history.length < 2) return <EmptyChart label="Play more games to see win rate trends" />;

  // Rolling win rate — compute cumulative win % at each game
  const points: { x: number; y: number }[] = [];
  let wins = 0;
  const step = Math.max(1, Math.floor(history.length / 30));
  for (let i = 0; i < history.length; i++) {
    if (history[i].won) wins++;
    if (i % step === 0 || i === history.length - 1) {
      points.push({ x: i, y: (wins / (i + 1)) * 100 });
    }
  }

  const w = 320;
  const h = 140;
  const pad = { top: 10, right: 10, bottom: 20, left: 35 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;

  const xMax = points[points.length - 1].x || 1;
  const toX = (v: number) => pad.left + (v / xMax) * innerW;
  const toY = (v: number) => pad.top + innerH - (v / 100) * innerH;

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(' ');
  const area = `${line} L${toX(points[points.length - 1].x).toFixed(1)},${(pad.top + innerH).toFixed(1)} L${toX(points[0].x).toFixed(1)},${(pad.top + innerH).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Win rate over time chart">
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={pad.left} x2={w - pad.right} y1={toY(v)} y2={toY(v)} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
          <text x={pad.left - 4} y={toY(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize={8}>
            {v}%
          </text>
        </g>
      ))}
      <path d={area} fill="url(#winGrad)" opacity={0.3} />
      <path d={line} fill="none" stroke="#D4AF37" strokeWidth={2} strokeLinejoin="round" />
      {/* Current rate indicator */}
      {points.length > 0 && (
        <circle cx={toX(points[points.length - 1].x)} cy={toY(points[points.length - 1].y)} r={3} fill="#D4AF37" />
      )}
      <defs>
        <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GamesPerDayChart({ history }: { history: GameResult[] }) {
  if (history.length === 0) return <EmptyChart label="No games recorded yet" />;

  const dayCounts: Record<string, number> = {};
  for (const g of history) {
    const key = dayKey(g.ts);
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  }

  const sortedDays = Object.keys(dayCounts).sort();
  const days = sortedDays.slice(-14);
  if (days.length === 0) return <EmptyChart label="No games recorded yet" />;

  const max = Math.max(...days.map((d) => dayCounts[d]));
  const w = 320;
  const h = 140;
  const pad = { top: 10, right: 10, bottom: 24, left: 28 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const barW = Math.min(18, (innerW / days.length) * 0.7);
  const gap = (innerW - barW * days.length) / (days.length + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Games per day chart">
      {[0, Math.ceil(max / 2), max].map((v) => (
        <g key={v}>
          <line x1={pad.left} x2={w - pad.right} y1={pad.top + innerH - (v / max) * innerH} y2={pad.top + innerH - (v / max) * innerH} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} />
          <text x={pad.left - 4} y={pad.top + innerH - (v / max) * innerH + 3} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize={8}>
            {v}
          </text>
        </g>
      ))}
      {days.map((day, i) => {
        const count = dayCounts[day];
        const barH = (count / max) * innerH;
        const x = pad.left + gap + i * (barW + gap);
        const y = pad.top + innerH - barH;
        const label = day.slice(5);
        return (
          <g key={day}>
            <rect x={x} y={y} width={barW} height={barH} rx={2} fill="#D4AF37" opacity={0.8} />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={6}>
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MoveDistributionChart({ history }: { history: GameResult[] }) {
  const wins = history.filter((g) => g.won && g.moves > 0);
  if (wins.length < 3) return <EmptyChart label="Win more games to see move distribution" />;

  const moves = wins.map((g) => g.moves);
  const min = Math.min(...moves);
  const max = Math.max(...moves);
  const range = max - min || 1;
  const bucketCount = Math.min(12, Math.max(4, Math.ceil(wins.length / 3)));
  const bucketSize = Math.ceil(range / bucketCount) || 1;

  const buckets: { label: string; count: number }[] = [];
  for (let i = 0; i < bucketCount; i++) {
    const lo = min + i * bucketSize;
    const hi = lo + bucketSize - 1;
    const count = moves.filter((m) => m >= lo && m <= hi).length;
    buckets.push({ label: `${lo}`, count });
  }

  const maxCount = Math.max(...buckets.map((b) => b.count));
  const w = 320;
  const h = 140;
  const pad = { top: 10, right: 10, bottom: 24, left: 28 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const barW = Math.min(22, (innerW / buckets.length) * 0.75);
  const gap = (innerW - barW * buckets.length) / (buckets.length + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Move efficiency distribution chart">
      {buckets.map((bucket, i) => {
        const barH = maxCount > 0 ? (bucket.count / maxCount) * innerH : 0;
        const x = pad.left + gap + i * (barW + gap);
        const y = pad.top + innerH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={2} fill="#6ee7b7" opacity={0.7} />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={6}>
              {bucket.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BestTimesChart({ history }: { history: GameResult[] }) {
  const wins = history.filter((g) => g.won && g.time > 0).sort((a, b) => a.time - b.time);
  if (wins.length < 2) return <EmptyChart label="Win more games to see best times" />;

  const top = wins.slice(0, 10);
  const maxTime = Math.max(...top.map((g) => g.time));
  const w = 320;
  const h = 140;
  const pad = { top: 10, right: 10, bottom: 6, left: 45 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const barH = Math.min(12, (innerH / top.length) * 0.75);
  const gap = (innerH - barH * top.length) / (top.length + 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-label="Best times chart">
      {top.map((game, i) => {
        const bw = (game.time / maxTime) * innerW;
        const y = pad.top + gap + i * (barH + gap);
        return (
          <g key={i}>
            <text x={pad.left - 4} y={y + barH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={8}>
              {formatTime(game.time)}
            </text>
            <rect x={pad.left} y={y} width={bw} height={barH} rx={2} fill="#60a5fa" opacity={0.7} />
          </g>
        );
      })}
    </svg>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-[140px] text-white/30 text-sm text-center px-4">
      {label}
    </div>
  );
}

// ─── Activity Heatmap (GitHub-style, 52 weeks) ───

function ActivityHeatmap({
  history,
  dailyCompletions,
}: {
  history: GameResult[];
  dailyCompletions: Record<string, { moves: number; time: number }>;
}) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const totalDays = 52 * 7 + dayOfWeek + 1;

  const dayCounts: Record<string, number> = {};
  for (const g of history) {
    const key = dayKey(g.ts);
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  }
  for (const key of Object.keys(dailyCompletions)) {
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  }

  const cells: { date: string; count: number; col: number; row: number }[] = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const idx = totalDays - 1 - i;
    const col = Math.floor(idx / 7);
    const row = idx % 7;
    cells.push({ date: key, count: dayCounts[key] || 0, col, row });
  }

  const cellSize = 10;
  const cellGap = 2;
  const cols = Math.ceil(totalDays / 7);
  const svgW = cols * (cellSize + cellGap) + 30;
  const svgH = 7 * (cellSize + cellGap) + 20;

  const maxCount = Math.max(1, ...Object.values(dayCounts));

  function getColor(count: number): string {
    if (count === 0) return 'rgba(255,255,255,0.06)';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return 'rgba(212,175,55,0.25)';
    if (intensity < 0.5) return 'rgba(212,175,55,0.45)';
    if (intensity < 0.75) return 'rgba(212,175,55,0.65)';
    return 'rgba(212,175,55,0.9)';
  }

  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  for (const cell of cells) {
    if (cell.row !== 0) continue;
    const m = parseInt(cell.date.split('-')[1]);
    if (m !== lastMonth) {
      lastMonth = m;
      const d = new Date(cell.date + 'T12:00:00');
      monthLabels.push({
        label: d.toLocaleString('en-US', { month: 'short' }),
        col: cell.col,
      });
    }
  }

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} aria-label="Activity heatmap">
        {dayLabels.map((label, i) =>
          label ? (
            <text key={i} x={0} y={16 + i * (cellSize + cellGap) + cellSize / 2 + 3} fill="rgba(255,255,255,0.3)" fontSize={7}>
              {label}
            </text>
          ) : null,
        )}
        {monthLabels.map((m, i) => (
          <text key={i} x={22 + m.col * (cellSize + cellGap)} y={10} fill="rgba(255,255,255,0.3)" fontSize={7}>
            {m.label}
          </text>
        ))}
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={22 + cell.col * (cellSize + cellGap)}
            y={16 + cell.row * (cellSize + cellGap)}
            width={cellSize}
            height={cellSize}
            rx={2}
            fill={getColor(cell.count)}
          >
            <title>
              {cell.date}: {cell.count} game{cell.count !== 1 ? 's' : ''}
            </title>
          </rect>
        ))}
      </svg>
    </div>
  );
}

// ─── Streak Calendar (last 30 days) ───

function StreakCalendar({ history }: { history: GameResult[] }) {
  const today = new Date();
  const todayKey = dayKey(today.getTime());
  const days: { date: string; won: boolean; played: boolean }[] = [];

  const dayResults: Record<string, { played: boolean; won: boolean }> = {};
  for (const g of history) {
    const key = dayKey(g.ts);
    if (!dayResults[key]) dayResults[key] = { played: false, won: false };
    dayResults[key].played = true;
    if (g.won) dayResults[key].won = true;
  }

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const r = dayResults[key];
    days.push({ date: key, played: !!r?.played, won: !!r?.won });
  }

  return (
    <div className="flex gap-[3px] flex-wrap justify-center">
      {days.map((day) => {
        const d = new Date(day.date + 'T12:00:00');
        const dayNum = d.getDate();
        const isToday = day.date === todayKey;
        return (
          <div
            key={day.date}
            className={`w-7 h-7 rounded flex items-center justify-center text-[9px] font-medium relative ${
              day.won
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                : day.played
                  ? 'bg-red-500/20 text-red-300/70 border border-red-500/20'
                  : 'bg-white/5 text-white/20 border border-white/5'
            } ${isToday ? 'ring-1 ring-[#D4AF37]/50' : ''}`}
            title={`${day.date}${day.won ? ' — Won' : day.played ? ' — Played' : ''}`}
          >
            {dayNum}
          </div>
        );
      })}
    </div>
  );
}

// ─── Star Display ───

function StarRating({ stars }: { stars: number }) {
  if (!stars) return <span className="text-white/20">—</span>;
  return (
    <span className="inline-flex gap-px">
      {[1, 2, 3].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= stars ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white/10'}
        />
      ))}
    </span>
  );
}

// ─── Stat Card ───

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-xl p-3 text-center">
      <div className="flex justify-center mb-1 text-[#D4AF37]">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{label}</div>
      {sub && <div className="text-[10px] text-white/30 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Chart Wrapper ───

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-white/60 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// ─── Game History Table ───

function GameHistoryTable({
  history,
  starMap,
}: {
  history: GameResult[];
  starMap: Record<string, number>;
}) {
  const recent = [...history].reverse().slice(0, 20);

  if (recent.length === 0) {
    return (
      <div className="text-center text-white/30 py-8 text-sm">
        No games played yet. Start playing to see your history!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white/40 text-[11px] uppercase tracking-wider border-b border-white/10">
            <th className="text-left py-2 pr-2">Date</th>
            <th className="text-left py-2 pr-2">Game</th>
            <th className="text-center py-2 pr-2">Result</th>
            <th className="text-right py-2 pr-2">Time</th>
            <th className="text-right py-2 pr-2">Moves</th>
            <th className="text-center py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((game, i) => (
            <motion.tr
              key={game.ts}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-2 pr-2 text-white/50 text-xs whitespace-nowrap">
                {formatDate(game.ts)}
              </td>
              <td className="py-2 pr-2 text-white/60 font-mono text-xs">
                {game.game ? `#${game.game}` : '—'}
              </td>
              <td className="py-2 pr-2 text-center">
                {game.won ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <CheckCircle2 size={12} />
                    Win
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-400/60 text-xs">
                    <XCircle size={12} />
                    Loss
                  </span>
                )}
              </td>
              <td className="py-2 pr-2 text-right text-white/50 font-mono text-xs">
                {formatTime(game.time)}
              </td>
              <td className="py-2 pr-2 text-right text-white/50 font-mono text-xs">
                {game.moves || '—'}
              </td>
              <td className="py-2 text-center">
                {game.game ? (
                  <StarRating stars={starMap[String(game.game)] || 0} />
                ) : (
                  <span className="text-white/20">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Daily Challenge Stats ───

function DailyStatsSection({
  dailyData,
  dailyStreak,
}: {
  dailyData: { completedDays: Record<string, { moves: number; time: number }>; longestStreak: number };
  dailyStreak: number;
}) {
  const completions = Object.values(dailyData.completedDays);
  const totalCompleted = completions.length;
  const avgTime = totalCompleted > 0
    ? Math.round(completions.reduce((s, c) => s + c.time, 0) / totalCompleted)
    : null;
  const avgMoves = totalCompleted > 0
    ? Math.round(completions.reduce((s, c) => s + c.moves, 0) / totalCompleted)
    : null;
  const bestTime = totalCompleted > 0
    ? Math.min(...completions.map((c) => c.time))
    : null;

  // Last 30 days completion calendar
  const today = new Date();
  const todayKey = dayKey(today.getTime());
  const last30: { date: string; completed: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    last30.push({ date: key, completed: !!dailyData.completedDays[key] });
  }

  const last30Completed = last30.filter((d) => d.completed).length;

  return (
    <div className="space-y-4">
      {/* Daily stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<Calendar size={18} />}
          label="Completed"
          value={totalCompleted}
        />
        <StatCard
          icon={<Flame size={18} />}
          label="Current Streak"
          value={dailyStreak}
          sub={`Best: ${dailyData.longestStreak}`}
        />
        <StatCard
          icon={<Clock size={18} />}
          label="Avg Time"
          value={formatTime(avgTime)}
          sub={bestTime ? `Best: ${formatTime(bestTime)}` : undefined}
        />
        <StatCard
          icon={<Zap size={18} />}
          label="Avg Moves"
          value={avgMoves ?? '—'}
        />
      </div>

      {/* 30-day completion calendar */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/60">Last 30 Days</h3>
          <span className="text-xs text-white/30">{last30Completed}/30 completed</span>
        </div>
        <div className="flex gap-[3px] flex-wrap justify-center">
          {last30.map((day) => {
            const d = new Date(day.date + 'T12:00:00');
            const dayNum = d.getDate();
            const isToday = day.date === todayKey;
            return (
              <div
                key={day.date}
                className={`w-7 h-7 rounded flex items-center justify-center text-[9px] font-medium ${
                  day.completed
                    ? 'bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-white/5 text-white/15 border border-white/5'
                } ${isToday ? 'ring-1 ring-white/30' : ''}`}
                title={`${day.date}${day.completed ? ' — Completed' : ''}`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Mode Breakdown ───

function ModeBreakdown({
  history,
  dailyData,
  puzzleStreakBest,
  puzzleStormBest,
}: {
  history: GameResult[];
  dailyData: { completedDays: Record<string, { moves: number; time: number }>; longestStreak: number };
  puzzleStreakBest: number;
  puzzleStormBest: number;
}) {
  // Classic: all history (game history doesn't distinguish modes currently)
  const classicWins = history.filter((g) => g.won);
  const classicWinRate = history.length > 0 ? Math.round((classicWins.length / history.length) * 100) : 0;

  const dailyCompletions = Object.values(dailyData.completedDays);
  const dailyCount = dailyCompletions.length;
  const dailyAvgTime = dailyCount > 0
    ? Math.round(dailyCompletions.reduce((s, c) => s + c.time, 0) / dailyCount)
    : null;

  const modes = [
    {
      name: 'Classic',
      icon: <Target size={18} />,
      color: 'text-[#D4AF37]',
      bg: 'bg-[#D4AF37]/10 border-[#D4AF37]/20',
      stats: [
        { label: 'Games', value: history.length },
        { label: 'Win Rate', value: `${classicWinRate}%` },
        { label: 'Wins', value: classicWins.length },
      ],
    },
    {
      name: 'Daily Challenge',
      icon: <Calendar size={18} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      stats: [
        { label: 'Completed', value: dailyCount },
        { label: 'Avg Time', value: formatTime(dailyAvgTime) },
        { label: 'Best Streak', value: dailyData.longestStreak },
      ],
    },
    {
      name: 'Puzzle Streak',
      icon: <Flame size={18} />,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
      stats: [
        { label: 'Best Streak', value: puzzleStreakBest || '—' },
      ],
    },
    {
      name: 'Puzzle Storm',
      icon: <Zap size={18} />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      stats: [
        { label: 'Best Score', value: puzzleStormBest || '—' },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {modes.map((mode) => (
        <motion.div
          key={mode.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`border rounded-xl p-4 ${mode.bg}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={mode.color}>{mode.icon}</span>
            <h4 className="text-sm font-semibold text-white/80">{mode.name}</h4>
          </div>
          <div className="flex gap-4 flex-wrap">
            {mode.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Page ───

type GameType = 'freecell' | 'klondike';

export default function StatsPage() {
  const [filter, setFilter] = useState<TimeFilter>('all');
  const [tab, setTab] = useState<Tab>('overview');
  const [gameType, setGameType] = useState<GameType>('freecell');

  const statsVariant: GameVariant | undefined = gameType === 'klondike' ? 'klondike' : undefined;
  const stats = useMemo(() => loadStats(statsVariant), [statsVariant]);
  const allHistory = useMemo(() => loadGameHistory(), []);
  const dailyData = useMemo(() => loadDailyData(), []);
  const dailyStreak = useMemo(() => getCurrentStreak(), []);
  const puzzleStreakBest = useMemo(() => loadStreakData().bestStreak, []);
  const puzzleStormBest = useMemo(() => loadStormData().bestScore, []);
  const starMap = useMemo(() => loadAllStarRatings(), []);

  // Filter history by game type: entries without a variant field are assumed to be freecell (legacy data)
  const typeFilteredHistory = useMemo(() => {
    if (gameType === 'klondike') return allHistory.filter(g => g.variant === 'klondike');
    return allHistory.filter(g => !g.variant || g.variant === 'freecell');
  }, [allHistory, gameType]);
  const history = useMemo(() => filterByTime(typeFilteredHistory, filter), [typeFilteredHistory, filter]);

  // Derived stats from filtered history
  const filteredStats = useMemo(() => {
    if (history.length === 0) return null;
    const wins = history.filter((g) => g.won);
    const winTimes = wins.filter((g) => g.time > 0);
    return {
      games: history.length,
      wins: wins.length,
      winRate: Math.round((wins.length / history.length) * 100),
      avgMoves: wins.length > 0 ? Math.round(wins.reduce((s, g) => s + g.moves, 0) / wins.length) : null,
      avgTime: winTimes.length > 0 ? Math.round(winTimes.reduce((s, g) => s + g.time, 0) / winTimes.length) : null,
      bestTime: winTimes.length > 0 ? Math.min(...winTimes.map((g) => g.time)) : null,
    };
  }, [history]);

  const displayStats = filter === 'all'
    ? {
        games: stats.gamesPlayed,
        wins: stats.gamesWon,
        losses: stats.gamesPlayed - stats.gamesWon,
        winRate: getWinPercent(stats),
        avgMoves: getAverageMoves(stats),
        avgTime: getAverageTime(stats),
        bestTime: stats.bestTime,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        leastMoves: stats.leastMoves,
      }
    : {
        games: filteredStats?.games ?? 0,
        wins: filteredStats?.wins ?? 0,
        losses: (filteredStats?.games ?? 0) - (filteredStats?.wins ?? 0),
        winRate: filteredStats?.winRate ?? 0,
        avgMoves: filteredStats?.avgMoves ?? null,
        avgTime: filteredStats?.avgTime ?? null,
        bestTime: filteredStats?.bestTime ?? null,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        leastMoves: stats.leastMoves,
      };

  const filters: { key: TimeFilter; label: string }[] = [
    { key: 'all', label: 'All Time' },
    { key: '30d', label: '30 Days' },
    { key: '7d', label: '7 Days' },
  ];

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 size={14} /> },
    { key: 'history', label: 'History', icon: <Timer size={14} /> },
    { key: 'daily', label: 'Daily', icon: <Calendar size={14} /> },
    { key: 'modes', label: 'Modes', icon: <Swords size={14} /> },
  ];

  return (
    <div
      className="min-h-screen text-white felt-bg"
      style={{ overflow: 'auto' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 pb-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-white/50 hover:text-white transition-colors"
            aria-label="Back to game"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1
            className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <BarChart3 size={24} />
            Statistics
          </h1>
        </motion.header>

        {/* Game Type Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="flex gap-2 mb-4"
        >
          {([['freecell', 'FreeCell'], ['klondike', 'Klondike']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setGameType(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                gameType === key
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1 overflow-x-auto"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
                tab === t.key
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </motion.div>

        {/* ═══ Overview Tab ═══ */}
        {tab === 'overview' && (
          <motion.div
            key="overview"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Time Filter */}
            <motion.div variants={fadeUp} custom={0} className="flex gap-2 mb-6">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filter === f.key
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>

            {/* Stats Cards Grid */}
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatCard
                icon={<Target size={18} />}
                label="Total Games"
                value={displayStats.games}
              />
              <StatCard
                icon={<TrendingUp size={18} />}
                label="Win Rate"
                value={`${displayStats.winRate}%`}
                sub={`${displayStats.wins}W / ${displayStats.losses}L`}
              />
              <StatCard
                icon={<Flame size={18} />}
                label="Current Streak"
                value={displayStats.currentStreak}
                sub={`Best: ${displayStats.longestStreak}`}
              />
              <StatCard
                icon={<Clock size={18} />}
                label="Fastest Win"
                value={formatTime(displayStats.bestTime)}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <StatCard
                icon={<Zap size={18} />}
                label="Avg Moves"
                value={displayStats.avgMoves ?? '—'}
                sub={displayStats.leastMoves ? `Best: ${displayStats.leastMoves}` : undefined}
              />
              <StatCard
                icon={<Clock size={18} />}
                label="Avg Time"
                value={formatTime(displayStats.avgTime)}
              />
              <div className="col-span-2 sm:col-span-1">
                <StatCard
                  icon={<Trophy size={18} />}
                  label="Daily Streak"
                  value={dailyStreak}
                  sub={`Longest: ${dailyData.longestStreak}`}
                />
              </div>
            </motion.div>

            {/* Charts */}
            <motion.div variants={fadeUp} custom={3} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <ChartCard title="Win Rate Over Time">
                <WinRateChart history={history} />
              </ChartCard>
              <ChartCard title="Games Per Day">
                <GamesPerDayChart history={history} />
              </ChartCard>
              <ChartCard title="Move Distribution (Wins)">
                <MoveDistributionChart history={history} />
              </ChartCard>
              <ChartCard title="Best Times (Top 10)">
                <BestTimesChart history={history} />
              </ChartCard>
            </motion.div>

            {/* Streak Calendar */}
            <motion.div variants={fadeUp} custom={4} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-white/60 mb-3">Win Streak (Last 30 Days)</h3>
              <StreakCalendar history={typeFilteredHistory} />
              <div className="flex items-center justify-center gap-4 mt-3 text-[9px] text-white/30">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-500/30" />
                  Won
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-red-500/20 border border-red-500/20" />
                  Played (no win)
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/5" />
                  No activity
                </span>
              </div>
            </motion.div>

            {/* Activity Heatmap */}
            <motion.div variants={fadeUp} custom={5} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-white/60 mb-3">Activity (Past Year)</h3>
              <ActivityHeatmap history={typeFilteredHistory} dailyCompletions={gameType === 'freecell' ? dailyData.completedDays : {}} />
              <div className="flex items-center justify-end gap-1 mt-3 text-[9px] text-white/30">
                <span>Less</span>
                {[0.06, 0.25, 0.45, 0.65, 0.9].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-[10px] h-[10px] rounded-sm"
                    style={{
                      background: i === 0 ? `rgba(255,255,255,${opacity})` : `rgba(212,175,55,${opacity})`,
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </motion.div>

            {/* Puzzle Streak Best */}
            {puzzleStreakBest > 0 && (
              <motion.div
                variants={fadeUp}
                custom={6}
                className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 border border-orange-500/20 rounded-xl p-4 mb-6 flex items-center gap-4"
              >
                <Flame size={28} className="text-orange-400 flex-shrink-0" />
                <div>
                  <div className="text-sm text-white/50">Puzzle Streak Best</div>
                  <div className="text-2xl font-black text-orange-300">{puzzleStreakBest}</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ═══ History Tab ═══ */}
        {tab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-white/60 mb-3">Recent Games</h3>
              <GameHistoryTable history={typeFilteredHistory} starMap={starMap} />
            </div>
          </motion.div>
        )}

        {/* ═══ Daily Tab ═══ */}
        {tab === 'daily' && (
          <motion.div
            key="daily"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DailyStatsSection dailyData={dailyData} dailyStreak={dailyStreak} />
          </motion.div>
        )}

        {/* ═══ Modes Tab ═══ */}
        {tab === 'modes' && (
          <motion.div
            key="modes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModeBreakdown
              history={typeFilteredHistory}
              dailyData={dailyData}
              puzzleStreakBest={puzzleStreakBest}
              puzzleStormBest={puzzleStormBest}
            />
          </motion.div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            Back to game
          </Link>
        </div>
      </div>
    </div>
  );
}
