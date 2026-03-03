/**
 * Achievement System
 * Client-side achievements stored in localStorage
 */

export type AchievementCategory =
  | 'milestones'
  | 'streak'
  | 'speed'
  | 'skill'
  | 'daily'
  | 'explorer';

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  /** For progressive achievements, the target count */
  target?: number;
}

export interface Achievement extends AchievementDef {
  unlockedAt: number | null;
  /** Current progress toward target (only for progressive achievements) */
  progress?: number;
}

const ACHIEVEMENTS_KEY = 'freecell_achievements';

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  // ── Win Milestones (5) ──
  { id: 'first_win', name: 'First Victory', description: 'Win your very first game of FreeCell', icon: '🏆', category: 'milestones', target: 1 },
  { id: 'ten_wins', name: 'Getting Warmed Up', description: 'Win 10 games — you\'re hooked!', icon: '⭐', category: 'milestones', target: 10 },
  { id: 'fifty_wins', name: 'Half Century', description: 'Win 50 games like a seasoned pro', icon: '🌟', category: 'milestones', target: 50 },
  { id: 'hundred_wins', name: 'Centurion', description: 'Join the 100-win club', icon: '💯', category: 'milestones', target: 100 },
  { id: 'five_hundred_wins', name: 'Card Master', description: 'An incredible 500 wins. Bow down!', icon: '👑', category: 'milestones', target: 500 },

  // ── Streak (5) ──
  { id: 'streak_3', name: 'Hat Trick', description: 'Play 3 days in a row', icon: '🔥', category: 'streak', target: 3 },
  { id: 'streak_7', name: 'On a Roll', description: '7-day daily challenge streak', icon: '⚡', category: 'streak', target: 7 },
  { id: 'streak_14', name: 'Dedicated', description: '14-day daily challenge streak', icon: '💪', category: 'streak', target: 14 },
  { id: 'streak_30', name: 'Unstoppable', description: '30-day daily challenge streak', icon: '💎', category: 'streak', target: 30 },
  { id: 'streak_100', name: 'Legendary', description: '100-day streak — absolute legend', icon: '🏅', category: 'streak', target: 100 },

  // ── Speed (3) ──
  { id: 'speed_5', name: 'Quick Thinker', description: 'Win a game in under 5 minutes', icon: '⏱️', category: 'speed' },
  { id: 'speed_3', name: 'Speed Demon', description: 'Win a game in under 3 minutes', icon: '⚡', category: 'speed' },
  { id: 'speed_2', name: 'Lightning Fast', description: 'Win a game in under 2 minutes', icon: '🔥', category: 'speed' },

  // ── Efficiency / Skill (2) ──
  { id: 'no_undos', name: 'Flawless', description: 'Win without pressing undo once', icon: '🎯', category: 'skill' },
  { id: 'perfect_stars', name: 'Perfectionist', description: 'Earn a perfect 3-star rating', icon: '✨', category: 'skill' },

  // ── Daily Challenge (3) ──
  { id: 'first_daily', name: 'Daily Debut', description: 'Complete your first daily challenge', icon: '📅', category: 'daily', target: 1 },
  { id: 'daily_streak_7', name: 'Week Warrior', description: '7 daily challenges in a row', icon: '🗓️', category: 'daily', target: 7 },
  { id: 'daily_total_30', name: 'Monthly Devotee', description: 'Complete 30 daily challenges total', icon: '📆', category: 'daily', target: 30 },

  // ── Explorer (2) ──
  { id: 'hundred_games', name: 'Explorer', description: 'Play 100 different game numbers', icon: '🗺️', category: 'explorer', target: 100 },
  { id: 'all_modes', name: 'Versatile', description: 'Try every game mode', icon: '🃏', category: 'explorer', target: 4 },
];

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  milestones: 'Win Milestones',
  streak: 'Streak',
  speed: 'Speed',
  skill: 'Efficiency',
  daily: 'Daily Challenge',
  explorer: 'Explorer',
};

export const ALL_CATEGORIES: AchievementCategory[] = [
  'milestones',
  'streak',
  'speed',
  'skill',
  'daily',
  'explorer',
];

export function loadUnlockedMap(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveAchievement(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    const saved: Record<string, number> = raw ? JSON.parse(raw) : {};
    if (!saved[id]) {
      saved[id] = Date.now();
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(saved));
    }
  } catch { }
}

export interface AchievementContext {
  stats: { gamesWon: number; currentStreak: number };
  winTime?: number;
  winMoves?: number;
  undosUsed?: number;
  dailyStreak?: number;
  totalDailyCompleted?: number;
  uniqueGamesPlayed?: number;
  modesPlayed?: number;
}

export interface CheckResult {
  newlyUnlocked: Achievement[];
}

/**
 * Build full achievement list with progress and unlock status
 */
export function loadAchievements(ctx?: AchievementContext): Achievement[] {
  const saved = loadUnlockedMap();

  return ACHIEVEMENT_DEFS.map(def => {
    const achievement: Achievement = {
      ...def,
      unlockedAt: saved[def.id] || null,
    };

    // Calculate progress for progressive achievements
    if (def.target && ctx) {
      achievement.progress = getProgress(def.id, ctx);
    }

    return achievement;
  });
}

function getProgress(id: string, ctx: AchievementContext): number {
  switch (id) {
    // Win milestones
    case 'first_win':
    case 'ten_wins':
    case 'fifty_wins':
    case 'hundred_wins':
    case 'five_hundred_wins':
      return ctx.stats.gamesWon;

    // Streak
    case 'streak_3':
    case 'streak_7':
    case 'streak_14':
    case 'streak_30':
    case 'streak_100':
      return ctx.dailyStreak ?? 0;

    // Daily
    case 'first_daily':
    case 'daily_total_30':
      return ctx.totalDailyCompleted ?? 0;
    case 'daily_streak_7':
      return ctx.dailyStreak ?? 0;

    // Explorer
    case 'hundred_games':
      return ctx.uniqueGamesPlayed ?? 0;
    case 'all_modes':
      return ctx.modesPlayed ?? 0;

    default:
      return 0;
  }
}

/**
 * Check and unlock achievements based on current context
 */
export function checkAchievements(ctx: AchievementContext): CheckResult {
  const achievements = loadAchievements(ctx);
  const newlyUnlocked: Achievement[] = [];

  const tryUnlock = (id: string) => {
    const ach = achievements.find(a => a.id === id);
    if (ach && !ach.unlockedAt) {
      saveAchievement(id);
      ach.unlockedAt = Date.now();
      newlyUnlocked.push(ach);
    }
  };

  // ── Win milestones ──
  if (ctx.stats.gamesWon >= 1) tryUnlock('first_win');
  if (ctx.stats.gamesWon >= 10) tryUnlock('ten_wins');
  if (ctx.stats.gamesWon >= 50) tryUnlock('fifty_wins');
  if (ctx.stats.gamesWon >= 100) tryUnlock('hundred_wins');
  if (ctx.stats.gamesWon >= 500) tryUnlock('five_hundred_wins');

  // ── Streak (daily challenge streaks) ──
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 3) tryUnlock('streak_3');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 7) tryUnlock('streak_7');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 14) tryUnlock('streak_14');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 30) tryUnlock('streak_30');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 100) tryUnlock('streak_100');

  // ── Speed ──
  if (ctx.winTime != null && ctx.winTime < 300) tryUnlock('speed_5');
  if (ctx.winTime != null && ctx.winTime < 180) tryUnlock('speed_3');
  if (ctx.winTime != null && ctx.winTime < 120) tryUnlock('speed_2');

  // ── Efficiency ──
  if (ctx.undosUsed != null && ctx.undosUsed === 0 && ctx.winTime != null) tryUnlock('no_undos');
  if (ctx.winMoves != null && ctx.winMoves <= 60) tryUnlock('perfect_stars');

  // ── Daily Challenge ──
  if (ctx.totalDailyCompleted != null && ctx.totalDailyCompleted >= 1) tryUnlock('first_daily');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 7) tryUnlock('daily_streak_7');
  if (ctx.totalDailyCompleted != null && ctx.totalDailyCompleted >= 30) tryUnlock('daily_total_30');

  // ── Explorer ──
  if (ctx.uniqueGamesPlayed != null && ctx.uniqueGamesPlayed >= 100) tryUnlock('hundred_games');
  if (ctx.modesPlayed != null && ctx.modesPlayed >= 4) tryUnlock('all_modes');

  return { newlyUnlocked };
}
