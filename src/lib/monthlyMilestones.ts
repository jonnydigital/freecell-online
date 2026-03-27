/**
 * Monthly Challenge Milestone System
 *
 * Tracks daily challenge wins per calendar month and awards
 * Bronze (10), Silver (20), Gold (full month) milestone trophies.
 */

import { loadDailyData, getMonthDays } from './dailyChallenge';

export interface MonthlyMilestone {
  level: 'bronze' | 'silver' | 'gold';
  threshold: number;
  label: string;
  icon: string;
}

export interface MonthlyProgress {
  year: number;
  month: number; // 0-indexed
  monthName: string;
  totalDays: number;
  completedCount: number;
  milestones: MonthlyMilestone[];
  achieved: MonthlyMilestone[];
  nextMilestone: MonthlyMilestone | null;
  winsToNext: number;
}

function getMilestones(daysInMonth: number): MonthlyMilestone[] {
  return [
    { level: 'bronze', threshold: 10, label: 'Bronze', icon: '🥉' },
    { level: 'silver', threshold: 20, label: 'Silver', icon: '🥈' },
    { level: 'gold', threshold: daysInMonth, label: 'Gold', icon: '🥇' },
  ];
}

/** Count completed daily challenges in a given month */
export function getMonthlyWins(year: number, month: number): number {
  const data = loadDailyData();
  const days = getMonthDays(year, month);
  let count = 0;
  for (const day of days) {
    if (data.completedDays[day]) count++;
  }
  return count;
}

/** Get full monthly progress for a given month */
export function getMonthlyProgress(year: number, month: number): MonthlyProgress {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const completedCount = getMonthlyWins(year, month);
  const milestones = getMilestones(totalDays);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  const achieved = milestones.filter(m => completedCount >= m.threshold);
  const nextMilestone = milestones.find(m => completedCount < m.threshold) ?? null;
  const winsToNext = nextMilestone ? nextMilestone.threshold - completedCount : 0;

  return {
    year,
    month,
    monthName,
    totalDays,
    completedCount,
    milestones,
    achieved,
    nextMilestone,
    winsToNext,
  };
}
