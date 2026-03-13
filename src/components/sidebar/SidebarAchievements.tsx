'use client';

import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { loadUnlockedMap, ACHIEVEMENT_DEFS } from '@/lib/achievements';

interface SidebarAchievementsProps {
  onShowFull: () => void;
  refreshKey?: number;
}

export default function SidebarAchievements({ onShowFull, refreshKey }: SidebarAchievementsProps) {
  const [unlocked, setUnlocked] = useState<{ id: string; name: string; icon: string; at: number }[]>([]);
  const [total] = useState(ACHIEVEMENT_DEFS.length);

  useEffect(() => {
    const map = loadUnlockedMap();
    const list = Object.entries(map)
      .map(([id, at]) => {
        const def = ACHIEVEMENT_DEFS.find(d => d.id === id);
        return def ? { id, name: def.name, icon: def.icon, at: at as number } : null;
      })
      .filter(Boolean) as { id: string; name: string; icon: string; at: number }[];

    list.sort((a, b) => b.at - a.at);
    setUnlocked(list);
  }, [refreshKey]);

  const count = unlocked.length;
  const pct = total > 0 ? (count / total) * 100 : 0;
  const recent = unlocked.slice(0, 2);

  return (
    <div
      className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,62,24,0.95),rgba(7,25,9,0.94))] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      role="region"
      aria-label="Achievements"
    >
      <div className="mb-3 flex items-center gap-2">
        <Trophy size={14} className="text-[#D4AF37]" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Achievements</h3>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="mb-1 flex justify-between text-sm text-white/60">
          <span>{count}/{total} unlocked</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#D4AF37]/75 transition-all"
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
      </div>

      {/* Recent unlocks — or preview locked achievements if none */}
      {recent.length > 0 ? (
        <div className="mb-3 space-y-2 rounded-[18px] border border-white/6 bg-white/[0.03] p-3">
          {recent.map((a) => (
            <div key={a.id} className="flex items-center gap-2">
              <span className="text-base leading-none">{a.icon}</span>
              <span className="text-sm text-white/70 truncate">{a.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-3 space-y-2 rounded-[18px] border border-white/6 bg-white/[0.03] p-3">
          {ACHIEVEMENT_DEFS.slice(0, 2).map((def) => (
            <div key={def.id} className="flex items-center gap-2 opacity-35">
              <span className="text-base leading-none grayscale">{def.icon}</span>
              <span className="text-sm text-white/50 truncate">{def.name}</span>
            </div>
          ))}
          <p className="mt-1 pl-0.5 text-xs text-white/40">Win a game to start unlocking</p>
        </div>
      )}

      <button
        type="button"
        onClick={onShowFull}
        className="w-full rounded-full border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer"
      >
        View All Achievements
      </button>
    </div>
  );
}
