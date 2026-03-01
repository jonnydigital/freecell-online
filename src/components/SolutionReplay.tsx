'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import type { SolverMove } from '@/solver/FreeCellSolver';
import { describeSolution } from '@/solver/FreeCellSolver';

interface SolutionReplayProps {
  gameNumber: number;
  moves: SolverMove[];
  totalMoveCount: number;
  playerMoves: number;
  onClose: () => void;
}

export default function SolutionReplay({ gameNumber, moves, totalMoveCount, playerMoves, onClose }: SolutionReplayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const descriptions = useMemo(
    () => describeSolution(gameNumber, moves),
    [gameNumber, moves]
  );

  const totalSteps = moves.length;

  // Auto-play: advance one step at a time using setTimeout
  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= totalSteps) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
  }, [totalSteps]);

  const handlePlayPause = useCallback(() => {
    if (currentStep >= totalSteps) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [currentStep, totalSteps]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === ' ') { e.preventDefault(); handlePlayPause(); }
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePrev, handleNext, handlePlayPause, onClose]);

  // Visible move window (show ~7 moves centered on current)
  const windowSize = 7;
  const halfWindow = Math.floor(windowSize / 2);
  let windowStart = Math.max(0, currentStep - halfWindow);
  const windowEnd = Math.min(totalSteps, windowStart + windowSize);
  if (windowEnd - windowStart < windowSize) {
    windowStart = Math.max(0, windowEnd - windowSize);
  }

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#0d2f0d]/95 border border-[#2a7c2a]/60 rounded-2xl shadow-2xl p-6 max-w-sm w-[90%] backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Optimal Solution</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Move comparison */}
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="text-center">
            <div className="text-white/50">Your Moves</div>
            <div className="text-lg font-bold text-white">{playerMoves}</div>
          </div>
          <div className="text-center">
            <div className="text-white/50">Optimal</div>
            <div className="text-lg font-bold text-emerald-400">{totalMoveCount}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
          />
        </div>

        {/* Step counter */}
        <div className="text-center text-sm text-white/50 mb-3">
          Step {currentStep} of {totalSteps}
        </div>

        {/* Move list */}
        <div className="bg-black/30 rounded-lg p-3 mb-4 min-h-[200px] max-h-[250px] overflow-hidden">
          {descriptions.length === 0 ? (
            <div className="text-white/30 text-center text-sm py-8">No moves needed</div>
          ) : (
            <div className="space-y-1">
              {descriptions.slice(windowStart, windowEnd).map((desc, i) => {
                const stepIndex = windowStart + i;
                const isCurrent = stepIndex === currentStep - 1;
                const isPast = stepIndex < currentStep - 1;
                return (
                  <div
                    key={stepIndex}
                    className={`text-sm px-2 py-1.5 rounded transition-all duration-200 font-mono ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isPast
                        ? 'text-white/30'
                        : 'text-white/60'
                    }`}
                  >
                    <span className="text-white/30 mr-2 inline-block w-5 text-right">{stepIndex + 1}.</span>
                    {desc}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-2 text-white/50 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-2 text-white/50 hover:text-white disabled:text-white/20 transition-colors"
            title="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps}
            className="p-2 text-white/50 hover:text-white disabled:text-white/20 transition-colors"
            title="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="text-center text-xs text-white/20 mt-3">
          Arrow keys to step · Space to play · Esc to close
        </div>
      </motion.div>
    </div>
  );
}
