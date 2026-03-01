'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakMilestoneProps {
  streak: number;
  show: boolean;
  onDismiss: () => void;
}

const MILESTONES = [3, 5, 7, 10, 15, 20, 25, 30, 50, 75, 100, 150, 200, 365];

function getMilestoneMessage(streak: number): { emoji: string; title: string; subtitle: string } {
  if (streak >= 365) return { emoji: '👑', title: 'LEGENDARY!', subtitle: `${streak}-game win streak! You are a FreeCell master.` };
  if (streak >= 100) return { emoji: '🏆', title: 'INCREDIBLE!', subtitle: `${streak} wins in a row! Absolute legend.` };
  if (streak >= 50) return { emoji: '🔥', title: 'UNSTOPPABLE!', subtitle: `${streak}-game win streak! On fire!` };
  if (streak >= 30) return { emoji: '⚡', title: 'DOMINANT!', subtitle: `${streak} consecutive wins! Can anyone stop you?` };
  if (streak >= 20) return { emoji: '💪', title: 'POWERHOUSE!', subtitle: `${streak}-game win streak! Seriously impressive.` };
  if (streak >= 15) return { emoji: '🌟', title: 'BRILLIANT!', subtitle: `${streak} wins and counting! Keep it going!` };
  if (streak >= 10) return { emoji: '✨', title: 'AMAZING!', subtitle: `${streak}-game win streak! Double digits!` };
  if (streak >= 7) return { emoji: '🎯', title: 'ON A ROLL!', subtitle: `${streak} consecutive wins! Lucky seven!` };
  if (streak >= 5) return { emoji: '🔥', title: 'HOT STREAK!', subtitle: `${streak} wins in a row! Keep it up!` };
  return { emoji: '🎉', title: 'NICE STREAK!', subtitle: `${streak} consecutive wins!` };
}

export function isMilestone(streak: number): boolean {
  return MILESTONES.includes(streak);
}

export default function StreakMilestone({ streak, show, onDismiss }: StreakMilestoneProps) {
  const [visible, setVisible] = useState(false);
  const { emoji, title, subtitle } = getMilestoneMessage(streak);

  useEffect(() => {
    if (show) {
      // Delay to let win screen appear first
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] cursor-pointer"
          onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
        >
          <div className="bg-gradient-to-r from-yellow-900/95 via-amber-800/95 to-yellow-900/95 border border-yellow-500/60 rounded-2xl shadow-2xl shadow-yellow-500/20 px-6 py-4 text-center backdrop-blur-sm min-w-[280px]">
            {/* Flame icon with streak count */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <motion.div
                animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                <Flame size={24} className="text-orange-400" />
              </motion.div>
              <span className="text-3xl">{emoji}</span>
              <motion.div
                animate={{ rotate: [5, -5, 5], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                <Flame size={24} className="text-orange-400" />
              </motion.div>
            </div>
            
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              className="text-xl font-black text-yellow-300 tracking-wide"
            >
              {title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-yellow-100/80 mt-1"
            >
              {subtitle}
            </motion.p>

            {/* Streak counter badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-black/30 rounded-full"
            >
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-bold text-white">{streak}</span>
              <span className="text-xs text-white/60">win streak</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
