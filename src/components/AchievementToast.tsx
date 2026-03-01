'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Achievement } from '../lib/achievements';

interface AchievementToastProps {
  achievements: Achievement[];
  onDone: () => void;
}

/**
 * Animated toast that shows newly unlocked achievements one at a time.
 * Gold/amber theme, auto-dismisses after 4 seconds per achievement.
 */
export default function AchievementToast({ achievements, onDone }: AchievementToastProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const current = achievements[currentIndex];

  useEffect(() => {
    if (!current) {
      onDone();
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [currentIndex, current, onDone]);

  const handleExitComplete = () => {
    if (currentIndex < achievements.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setVisible(true);
    } else {
      onDone();
    }
  };

  if (!current) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {visible && (
          <motion.div
            key={current.id}
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/40"
            style={{
              background: 'linear-gradient(135deg, #1a1000 0%, #2a1a00 50%, #1a1000 100%)',
              boxShadow: '0 0 30px rgba(212,175,55,0.25), 0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* Trophy icon with glow */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center">
                <Trophy size={20} className="text-[#1a1000]" />
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]/60 font-semibold">
                Achievement Unlocked
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg">{current.icon}</span>
                <span className="text-sm font-bold text-[#D4AF37]">{current.name}</span>
              </div>
              <div className="text-[11px] text-white/50 mt-0.5">{current.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
