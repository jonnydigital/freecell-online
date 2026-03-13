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

  return (
    <div
      className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(27,73,29,0.95),rgba(8,28,10,0.94))] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      role="region"
      aria-label="Daily Challenge"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Daily Challenge</h3>
        {streak > 0 && (
          <span className="text-sm text-orange-400 font-bold flex items-center gap-1" aria-label={`Current streak: ${streak} days`}>
            <span aria-hidden="true">&#x1F525;</span> {streak}d
          </span>
        )}
      </div>

      {/* Today status */}
      <div className="mb-4 flex items-center justify-between rounded-[18px] border border-white/6 bg-white/[0.03] px-3 py-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.32]">Today&apos;s Deal</div>
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

      {/* Month navigation */}
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="flex items-center justify-center w-8 h-8 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
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
          className="flex items-center justify-center w-8 h-8 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg disabled:opacity-20 disabled:cursor-default transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 rounded-[18px] border border-white/6 bg-white/[0.03] p-3">
        {/* Day headers */}
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="pb-1 text-center text-[11px] font-medium text-white/40">
            {d}
          </div>
        ))}

        {/* Empty leading cells */}
        {Array.from({ length: firstDow }).map((_, i) => (
          <div key={`empty-${i}`} className="h-6 w-6 xl:h-7 xl:w-7" />
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
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs xl:h-7 xl:w-7 ${
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
