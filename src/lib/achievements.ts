/**
 * Achievement System
 * Client-side achievements stored in localStorage
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

const ACHIEVEMENTS_KEY = 'freecell_achievements';

export const ACHIEVEMENT_DEFS: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first_win', name: 'First Win', description: 'Win your first game', icon: '🏆' },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Win in under 3 minutes', icon: '⚡' },
  { id: 'efficient', name: 'Efficient', description: 'Win with under 80 moves', icon: '🎯' },
  { id: 'streak_master', name: 'Streak Master', description: '7-day daily challenge streak', icon: '🔥' },
  { id: 'centurion', name: 'Centurion', description: 'Win 100 games', icon: '💯' },
  { id: 'daily_devotee', name: 'Daily Devotee', description: 'Complete 30 daily challenges', icon: '📅' },
  { id: 'half_century', name: 'Half Century', description: 'Win 50 games', icon: '⭐' },
  { id: 'lightning', name: 'Lightning', description: 'Win in under 2 minutes', icon: '⚡' },
  { id: 'minimalist', name: 'Minimalist', description: 'Win with under 60 moves', icon: '✨' },
  { id: 'ten_streak', name: 'On Fire', description: '10-day daily challenge streak', icon: '🌟' },
];

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') return ACHIEVEMENT_DEFS.map(d => ({ ...d, unlockedAt: null }));
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    const saved: Record<string, number> = raw ? JSON.parse(raw) : {};
    return ACHIEVEMENT_DEFS.map(def => ({
      ...def,
      unlockedAt: saved[def.id] || null,
    }));
  } catch {
    return ACHIEVEMENT_DEFS.map(d => ({ ...d, unlockedAt: null }));
  }
}

function saveAchievement(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    const saved: Record<string, number> = raw ? JSON.parse(raw) : {};
    if (!saved[id]) {
      saved[id] = Date.now();
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(saved));
    }
  } catch {}
}

export interface CheckResult {
  newlyUnlocked: Achievement[];
}

/**
 * Check and unlock achievements based on current stats
 */
export function checkAchievements(
  stats: { gamesWon: number; bestTime: number },
  winTime?: number,
  winMoves?: number,
  dailyStreak?: number,
  totalDailyCompleted?: number,
): CheckResult {
  const achievements = loadAchievements();
  const newlyUnlocked: Achievement[] = [];

  const tryUnlock = (id: string) => {
    const ach = achievements.find(a => a.id === id);
    if (ach && !ach.unlockedAt) {
      saveAchievement(id);
      ach.unlockedAt = Date.now();
      newlyUnlocked.push(ach);
    }
  };

  // Win-based
  if (stats.gamesWon >= 1) tryUnlock('first_win');
  if (stats.gamesWon >= 50) tryUnlock('half_century');
  if (stats.gamesWon >= 100) tryUnlock('centurion');

  // Time-based (current win)
  if (winTime && winTime < 180) tryUnlock('speed_demon');
  if (winTime && winTime < 120) tryUnlock('lightning');

  // Move-based (current win)
  if (winMoves && winMoves < 80) tryUnlock('efficient');
  if (winMoves && winMoves < 60) tryUnlock('minimalist');

  // Streak-based
  if (dailyStreak && dailyStreak >= 7) tryUnlock('streak_master');
  if (dailyStreak && dailyStreak >= 10) tryUnlock('ten_streak');

  // Daily completion count
  if (totalDailyCompleted && totalDailyCompleted >= 30) tryUnlock('daily_devotee');

  return { newlyUnlocked };
}
