/**
 * Game statistics tracking
 */

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  longestStreak: number;
  bestTime: number | null;     // seconds, null if no wins
  totalTime: number;           // total seconds across all wins
  leastMoves: number | null;   // null if no wins
  totalMoves: number;          // total moves across all wins
}

export function createEmptyStats(): GameStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestTime: null,
    totalTime: 0,
    leastMoves: null,
    totalMoves: 0,
  };
}

export function getWinPercent(stats: GameStats): number {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
}

export function getAverageTime(stats: GameStats): number | null {
  if (stats.gamesWon === 0) return null;
  return Math.round(stats.totalTime / stats.gamesWon);
}

export function getAverageMoves(stats: GameStats): number | null {
  if (stats.gamesWon === 0) return null;
  return Math.round(stats.totalMoves / stats.gamesWon);
}

export function recordWin(
  stats: GameStats,
  timeSeconds: number,
  moves: number
): GameStats {
  return {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + 1,
    currentStreak: stats.currentStreak + 1,
    longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
    bestTime:
      stats.bestTime === null
        ? timeSeconds
        : Math.min(stats.bestTime, timeSeconds),
    totalTime: stats.totalTime + timeSeconds,
    leastMoves:
      stats.leastMoves === null
        ? moves
        : Math.min(stats.leastMoves, moves),
    totalMoves: stats.totalMoves + moves,
  };
}

export function recordLoss(stats: GameStats): GameStats {
  return {
    ...stats,
    gamesPlayed: stats.gamesPlayed + 1,
    currentStreak: 0,
  };
}
