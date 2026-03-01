'use client';

import type { Achievement } from '../lib/achievements';

interface AchievementBadgeProps {
  achievement: Achievement;
}

/**
 * Individual achievement badge display.
 * Locked = grayscale with lock icon.
 * Unlocked = colorful with gold accent and unlock date.
 * Shows progress bar for progressive achievements.
 */
export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const unlocked = !!achievement.unlockedAt;
  const hasProgress = achievement.target != null && achievement.target > 0;
  const progress = achievement.progress ?? 0;
  const progressPct = hasProgress
    ? Math.min(100, Math.round((progress / achievement.target!) * 100))
    : 0;

  const dateStr = unlocked
    ? new Date(achievement.unlockedAt!).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div
      className={`rounded-xl p-3 text-center transition-all ${
        unlocked
          ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
          : 'bg-white/5 border border-white/10 opacity-50'
      }`}
    >
      {/* Icon */}
      <div className={`text-3xl mb-1.5 ${unlocked ? '' : 'grayscale'}`}>
        {unlocked ? achievement.icon : '🔒'}
      </div>

      {/* Name */}
      <div
        className={`text-sm font-semibold leading-tight ${
          unlocked ? 'text-[#D4AF37]' : 'text-white/60'
        }`}
      >
        {achievement.name}
      </div>

      {/* Description */}
      <div className={`text-[10px] mt-0.5 leading-snug ${unlocked ? 'text-white/50' : 'text-white/30'}`}>
        {achievement.description}
      </div>

      {/* Progress bar (for locked progressive achievements) */}
      {hasProgress && !unlocked && (
        <div className="mt-2">
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D4AF37]/50 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[9px] text-white/30 mt-0.5">
            {progress}/{achievement.target}
          </div>
        </div>
      )}

      {/* Unlock date */}
      {unlocked && dateStr && (
        <div className="text-[9px] text-[#D4AF37]/50 mt-1.5">{dateStr}</div>
      )}
    </div>
  );
}
