/**
 * Achievement Tracker
 * Aggregates game context from various sources and checks for newly unlocked achievements.
 */

import { AchievementContext, CheckResult, checkAchievements } from './achievements';
import { GameStats } from './stats';
import { loadDailyData, getCurrentStreak } from './dailyChallenge';
import { loadStreakData } from './streakStorage';

const THEMES_USED_KEY = 'freecell_themes_used';

/** Record that a theme was used */
export function recordThemeUsed(themeId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(THEMES_USED_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    if (!used.includes(themeId)) {
      used.push(themeId);
      localStorage.setItem(THEMES_USED_KEY, JSON.stringify(used));
    }
  } catch {}
}

/** Get number of unique themes used */
export function getThemesUsedCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(THEMES_USED_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    return used.length;
  } catch {
    return 0;
  }
}

/** Count total daily challenges completed */
function getTotalDailyCompleted(): number {
  const data = loadDailyData();
  return Object.keys(data.completedDays).length;
}

/**
 * Build the full achievement context from current game state.
 * Call this after a win with the win-specific data.
 */
export function buildContext(
  stats: GameStats,
  winTime?: number,
  winMoves?: number,
  hintsUsed?: number,
  undosUsed?: number,
): AchievementContext {
  return {
    stats: {
      gamesWon: stats.gamesWon,
      currentStreak: stats.currentStreak,
    },
    winTime,
    winMoves,
    hintsUsed,
    undosUsed,
    dailyStreak: getCurrentStreak(),
    totalDailyCompleted: getTotalDailyCompleted(),
    themesUsed: getThemesUsedCount(),
    puzzleStreakBest: loadStreakData().bestStreak,
    winHour: new Date().getHours(),
  };
}

/**
 * Main entry point: build context and check for achievements.
 */
export function checkWinAchievements(
  stats: GameStats,
  winTime: number,
  winMoves: number,
  hintsUsed: number,
  undosUsed: number,
): CheckResult {
  const ctx = buildContext(stats, winTime, winMoves, hintsUsed, undosUsed);
  return checkAchievements(ctx);
}
