/**
 * Achievement Tracker
 * Aggregates game context from various sources and checks for newly unlocked achievements.
 */

import { AchievementContext, CheckResult, checkAchievements } from './achievements';
import { GameStats } from './stats';
import { loadDailyData, getCurrentStreak } from './dailyChallenge';

const MODES_PLAYED_KEY = 'freecell_modes_played';
const UNIQUE_GAMES_KEY = 'freecell_unique_games';

/** Record that a game mode was played */
export function recordModePlayed(mode: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(MODES_PLAYED_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    if (!used.includes(mode)) {
      used.push(mode);
      localStorage.setItem(MODES_PLAYED_KEY, JSON.stringify(used));
    }
  } catch {}
}

/** Get number of unique game modes played */
export function getModesPlayedCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(MODES_PLAYED_KEY);
    const used: string[] = raw ? JSON.parse(raw) : [];
    return used.length;
  } catch {
    return 0;
  }
}

/** Record a unique game number played */
export function recordUniqueGame(gameNumber: number): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(UNIQUE_GAMES_KEY);
    const games: number[] = raw ? JSON.parse(raw) : [];
    if (!games.includes(gameNumber)) {
      games.push(gameNumber);
      localStorage.setItem(UNIQUE_GAMES_KEY, JSON.stringify(games));
    }
  } catch {}
}

/** Get count of unique game numbers played */
export function getUniqueGamesCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(UNIQUE_GAMES_KEY);
    const games: number[] = raw ? JSON.parse(raw) : [];
    return games.length;
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
  undosUsed?: number,
): AchievementContext {
  return {
    stats: {
      gamesWon: stats.gamesWon,
      currentStreak: stats.currentStreak,
    },
    winTime,
    winMoves,
    undosUsed,
    dailyStreak: getCurrentStreak(),
    totalDailyCompleted: getTotalDailyCompleted(),
    uniqueGamesPlayed: getUniqueGamesCount(),
    modesPlayed: getModesPlayedCount(),
  };
}

/**
 * Main entry point: build context and check for achievements.
 */
export function checkWinAchievements(
  stats: GameStats,
  winTime: number,
  winMoves: number,
  undosUsed: number,
): CheckResult {
  const ctx = buildContext(stats, winTime, winMoves, undosUsed);
  return checkAchievements(ctx);
}
