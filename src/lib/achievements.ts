/**
 * Achievement System
 * Client-side achievements stored in localStorage
 */

export type AchievementCategory = 'milestones' | 'skill' | 'dedication' | 'special';

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
  // ── Milestones ──
  { id: 'first_win', name: 'First Win', description: 'Win your first game', icon: '🏆', category: 'milestones', target: 1 },
  { id: 'ten_wins', name: 'Getting Started', description: 'Win 10 games', icon: '⭐', category: 'milestones', target: 10 },
  { id: 'half_century', name: 'Half Century', description: 'Win 50 games', icon: '🌟', category: 'milestones', target: 50 },
  { id: 'centurion', name: 'Centurion', description: 'Win 100 games', icon: '💯', category: 'milestones', target: 100 },

  // ── Skill ──
  { id: 'speed_demon', name: 'Speed Demon', description: 'Win in under 2 minutes', icon: '⚡', category: 'skill' },
  { id: 'lightning', name: 'Lightning Fast', description: 'Win in under 90 seconds', icon: '🔥', category: 'skill' },
  { id: 'efficient', name: 'Efficient', description: 'Win with under 80 moves', icon: '🎯', category: 'skill' },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Win with under 60 moves', icon: '✨', category: 'skill' },
  { id: 'no_hints', name: 'Pure Skill', description: 'Win without using any hints', icon: '🧠', category: 'skill' },
  { id: 'comeback_kid', name: 'Comeback Kid', description: 'Win after 5+ undos', icon: '🔄', category: 'skill' },

  // ── Dedication ──
  { id: 'daily_devotee', name: 'Daily Devotee', description: 'Complete 7 daily challenges', icon: '📅', category: 'dedication', target: 7 },
  { id: 'streak_5', name: 'Streak Master', description: '5-day daily challenge streak', icon: '🔥', category: 'dedication', target: 5 },
  { id: 'streak_10', name: 'On Fire', description: '10-day daily challenge streak', icon: '🌟', category: 'dedication', target: 10 },
  { id: 'streak_25', name: 'Unstoppable', description: '25-day daily challenge streak', icon: '💎', category: 'dedication', target: 25 },
  { id: 'hat_trick', name: 'Hat Trick', description: 'Win 3 games in a row', icon: '🎩', category: 'dedication', target: 3 },

  // ── Special ──
  { id: 'night_owl', name: 'Night Owl', description: 'Win a game after midnight', icon: '🦉', category: 'special' },
  { id: 'theme_collector', name: 'Theme Collector', description: 'Try all 5 themes', icon: '🎨', category: 'special', target: 5 },
  { id: 'puzzle_streak_10', name: 'Storm Chaser', description: '10+ win puzzle streak', icon: '⛈️', category: 'special', target: 10 },
];

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  milestones: 'Milestones',
  skill: 'Skill',
  dedication: 'Dedication',
  special: 'Special',
};

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
  hintsUsed?: number;
  undosUsed?: number;
  dailyStreak?: number;
  totalDailyCompleted?: number;
  themesUsed?: number;
  puzzleStreakBest?: number;
  winHour?: number;
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
    case 'first_win':
    case 'ten_wins':
    case 'half_century':
    case 'centurion':
      return ctx.stats.gamesWon;
    case 'daily_devotee':
      return ctx.totalDailyCompleted ?? 0;
    case 'streak_5':
    case 'streak_10':
    case 'streak_25':
      return ctx.dailyStreak ?? 0;
    case 'hat_trick':
      return ctx.stats.currentStreak;
    case 'theme_collector':
      return ctx.themesUsed ?? 0;
    case 'puzzle_streak_10':
      return ctx.puzzleStreakBest ?? 0;
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

  // Win milestones
  if (ctx.stats.gamesWon >= 1) tryUnlock('first_win');
  if (ctx.stats.gamesWon >= 10) tryUnlock('ten_wins');
  if (ctx.stats.gamesWon >= 50) tryUnlock('half_century');
  if (ctx.stats.gamesWon >= 100) tryUnlock('centurion');

  // Speed
  if (ctx.winTime != null && ctx.winTime < 120) tryUnlock('speed_demon');
  if (ctx.winTime != null && ctx.winTime < 90) tryUnlock('lightning');

  // Moves
  if (ctx.winMoves != null && ctx.winMoves < 80) tryUnlock('efficient');
  if (ctx.winMoves != null && ctx.winMoves < 60) tryUnlock('perfectionist');

  // Hints & undos
  if (ctx.hintsUsed != null && ctx.hintsUsed === 0 && ctx.winTime != null) tryUnlock('no_hints');
  if (ctx.undosUsed != null && ctx.undosUsed >= 5 && ctx.winTime != null) tryUnlock('comeback_kid');

  // Daily streaks
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 5) tryUnlock('streak_5');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 10) tryUnlock('streak_10');
  if (ctx.dailyStreak != null && ctx.dailyStreak >= 25) tryUnlock('streak_25');

  // Daily completion count
  if (ctx.totalDailyCompleted != null && ctx.totalDailyCompleted >= 7) tryUnlock('daily_devotee');

  // Win streak
  if (ctx.stats.currentStreak >= 3) tryUnlock('hat_trick');

  // Night owl (midnight to 4am)
  if (ctx.winHour != null && ctx.winHour >= 0 && ctx.winHour < 5) tryUnlock('night_owl');

  // Theme collector
  if (ctx.themesUsed != null && ctx.themesUsed >= 5) tryUnlock('theme_collector');

  // Puzzle streak
  if (ctx.puzzleStreakBest != null && ctx.puzzleStreakBest >= 10) tryUnlock('puzzle_streak_10');

  return { newlyUnlocked };
}
