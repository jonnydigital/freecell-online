'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  loadDailyData,
  getTodayStr,
  getTodaysSeed,
  getCurrentStreak,
  getMonthDays,
  getFirstDayOfWeek,
} from '@/lib/dailyChallenge';
import { getMonthlyProgress } from '@/lib/monthlyMilestones';

interface SidebarDailyChallengeProps {
  onPlayDaily: (seed: number) => void;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function SidebarDailyChallenge({ onPlayDaily }: SidebarDailyChallengeProps) {
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [completedDays, setCompletedDays] = useState<Record<string, unknown>>({});
  const [streak, setStreak] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(false);

  useEffect(() => {
    const data = loadDailyData();
    setCompletedDays(data.completedDays);
    setStreak(getCurrentStreak());
    setTodayCompleted(!!data.completedDays[getTodayStr()]);
  }, []);

  const todayStr = getTodayStr();
  const todaySeed = getTodaysSeed();
  const days = getMonthDays(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);

  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    const now = new Date();
    if (viewYear === now.getFullYear() && viewMonth === now.getMonth()) return;
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const isCurrentMonth = viewYear === new Date().getFullYear() && viewMonth === new Date().getMonth();

  // Monthly milestone progress
  const progress = getMonthlyProgress(viewYear, viewMonth);
  const progressPercent = progress.nextMilestone
    ? Math.round((progress.completedCount / progress.nextMilestone.threshold) * 100)
    : 100;

  return (
    <div
      className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(27,73,29,0.95),rgba(8,28,10,0.94))] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      role="region"
      aria-label="Daily Challenge"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">Daily Challenge</h3>
        {streak > 0 && (
          <span className="text-sm text-orange-400 font-bold flex items-center gap-1" aria-label={`Current streak: ${streak} days`}>
            <span aria-hidden="true">&#x1F525;</span> {streak}d
          </span>
        )}
      </div>

      {/* Today status */}
      <div className="mb-4 flex items-center justify-between rounded-[18px] border border-white/6 bg-white/[0.03] px-3 py-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/[0.32]">Today&apos;s Deal</div>
          <div className="mt-1 text-sm text-white/[0.68]">Game #{todaySeed}</div>
        </div>
        {todayCompleted ? (
          <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            Completed
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onPlayDaily(todaySeed)}
            className="text-sm font-semibold text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 px-4 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            Play Today
          </button>
        )}
      </div>

      {/* Monthly milestone progress */}
      <div className="mb-4 rounded-[18px] border border-white/6 bg-white/[0.03] px-3 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-white/50">
            {progress.monthName} Wins
          </span>
          <span className="text-xs font-bold text-white/70">
            {progress.completedCount}/{progress.totalDays}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden mb-2">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(progressPercent, 100)}%`,
              background: progress.nextMilestone
                ? progress.nextMilestone.level === 'bronze'
                  ? '#CD7F32'
                  : progress.nextMilestone.level === 'silver'
                  ? '#C0C0C0'
                  : '#D4AF37'
                : '#D4AF37',
            }}
          />
          {/* Milestone markers */}
          {progress.milestones.map((m) => (
            <div
              key={m.level}
              className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/20"
              style={{ left: `${(m.threshold / progress.totalDays) * 100}%` }}
            />
          ))}
        </div>

        {/* Trophy badges + next target */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {progress.milestones.map((m) => {
              const earned = progress.completedCount >= m.threshold;
              return (
                <span
                  key={m.level}
                  className={`text-sm ${earned ? '' : 'opacity-25 grayscale'}`}
                  title={`${m.label} (${m.threshold} wins)${earned ? ' - Earned!' : ''}`}
                >
                  {m.icon}
                </span>
              );
            })}
          </div>
          {progress.nextMilestone && progress.winsToNext > 0 && (
            <span className="text-xs text-white/40">
              {progress.winsToNext} more to {progress.nextMilestone.label}!
            </span>
          )}
          {!progress.nextMilestone && (
            <span className="text-xs text-[#D4AF37] font-semibold">
              Perfect month!
            </span>
          )}
        </div>
      </div>

      {/* Month navigation */}
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="flex items-center justify-center w-9 h-9 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-white/70">
          {monthName} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          disabled={isCurrentMonth}
          className="flex items-center justify-center w-9 h-9 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg disabled:opacity-20 disabled:cursor-default transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5 rounded-[18px] border border-white/6 bg-white/[0.03] p-3">
        {/* Day headers */}
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="pb-1.5 text-center text-xs font-semibold text-white/40">
            {d}
          </div>
        ))}

        {/* Empty leading cells */}
        {Array.from({ length: firstDow }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {days.map((dateStr) => {
          const dayNum = parseInt(dateStr.split('-')[2], 10);
          const isToday = dateStr === todayStr;
          const isCompleted = !!completedDays[dateStr];
          const isFuture = dateStr > todayStr;

          return (
            <div
              key={dateStr}
              className={`flex aspect-square items-center justify-center rounded-full text-sm ${
                isToday
                  ? 'ring-1 ring-[#D4AF37]/60'
                  : ''
              } ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                  : isFuture
                  ? 'text-white/20'
                  : 'text-white/50'
              }`}
            >
              {isCompleted ? (
                <span className="text-emerald-400 text-base leading-none" aria-label={`Completed ${dateStr}`}>&#x2022;</span>
              ) : (
                dayNum
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
