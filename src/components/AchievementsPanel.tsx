'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { loadAchievements, Achievement } from '../lib/achievements';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsPanel({ isOpen, onClose }: AchievementsPanelProps) {
  const achievements = useMemo(() => (isOpen ? loadAchievements() : []), [isOpen]);
  const unlocked = achievements.filter(a => a.unlockedAt);
  const locked = achievements.filter(a => !a.unlockedAt);

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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[400px] md:max-h-[600px] bg-[#0a3d0a] border border-[#1a5c1a]/40 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
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

            {/* Achievement Grid */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Unlocked first */}
                {unlocked.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-3 text-center"
                  >
                    <div className="text-3xl mb-1">{ach.icon}</div>
                    <div className="text-sm font-semibold text-[#D4AF37]">{ach.name}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{ach.description}</div>
                  </div>
                ))}
                {/* Locked */}
                {locked.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-center opacity-40"
                  >
                    <div className="text-3xl mb-1 grayscale">🔒</div>
                    <div className="text-sm font-semibold text-white/60">{ach.name}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{ach.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
