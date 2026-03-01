'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { loadAchievements, CATEGORY_LABELS, AchievementCategory } from '../lib/achievements';
import { buildContext } from '../lib/achievementTracker';
import { loadStats } from '../lib/storage';
import AchievementBadge from './AchievementBadge';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsPanel({ isOpen, onClose }: AchievementsPanelProps) {
  const achievements = useMemo(() => {
    if (!isOpen) return [];
    const stats = loadStats();
    const ctx = buildContext(stats);
    return loadAchievements(ctx);
  }, [isOpen]);

  const unlocked = achievements.filter(a => a.unlockedAt);
  const categories = ['milestones', 'skill', 'dedication', 'special'] as AchievementCategory[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[440px] md:max-h-[650px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{
              background: 'var(--felt-color, #0a3d0a)',
              backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div className="flex items-center gap-2">
                <Trophy size={22} className="text-[#D4AF37]" />
                <h2 className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Achievements
                </h2>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X size={22} />
              </button>
            </div>

            <div className="text-center text-sm text-white/50 pb-3">
              {unlocked.length}/{achievements.length} unlocked
            </div>

            {/* Achievement Grid by Category */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              {categories.map(cat => {
                const catAchievements = achievements.filter(a => a.category === cat);
                if (catAchievements.length === 0) return null;
                return (
                  <div key={cat}>
                    <h3 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-2 px-1">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {catAchievements.map(ach => (
                        <AchievementBadge key={ach.id} achievement={ach} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
