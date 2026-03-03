'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import type { SolverMove } from '@/solver/FreeCellSolver';
import { describeSolution } from '@/solver/FreeCellSolver';
import { gameBridge } from '@/game/GameBridge';

interface SolutionReplayProps {
  gameNumber: number;
  moves: SolverMove[];
  totalMoveCount: number;
  playerMoves: number;
  onClose: () => void;
}

const SPEED_OPTIONS = [1, 2, 3] as const;
type Speed = typeof SPEED_OPTIONS[number];
const SPEED_DELAYS: Record<Speed, number> = { 1: 300, 2: 150, 3: 80 };

export default function SolutionReplay({ gameNumber, moves, totalMoveCount, playerMoves, onClose }: SolutionReplayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waitingForAnimation, setWaitingForAnimation] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const mountedRef = useRef(true);
  const isPlayingRef = useRef(false);

  const descriptions = useMemo(
    () => describeSolution(gameNumber, moves),
    [gameNumber, moves]
  );

  const totalSteps = moves.length;

  // Keep ref in sync for use in callbacks
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // Enter replay mode on mount, exit on unmount
  useEffect(() => {
    mountedRef.current = true;
    gameBridge.emit('setReplayMode', { enabled: true, gameNumber });

    return () => {
      mountedRef.current = false;
      gameBridge.emit('setReplayMode', { enabled: false });
    };
  }, [gameNumber]);

  // Listen for animation completion from Phaser
  useEffect(() => {
    const unsub = gameBridge.on('replayMoveExecuted', () => {
      if (!mountedRef.current) return;
      setWaitingForAnimation(false);
    });
    return unsub;
  }, []);

  // Auto-play: when animation completes and isPlaying, send next move
  useEffect(() => {
    if (!isPlaying || waitingForAnimation) return;
    if (currentStep >= totalSteps) {
      setIsPlaying(false);
      return;
    }

    // Delay between moves based on speed setting
    const timer = setTimeout(() => {
      if (!mountedRef.current || !isPlayingRef.current) return;
      sendMoveToPhaser(currentStep);
    }, SPEED_DELAYS[speed]);

    return () => clearTimeout(timer);
  }, [isPlaying, waitingForAnimation, currentStep, totalSteps, speed]);

  const sendMoveToPhaser = useCallback((step: number) => {
    if (step >= totalSteps) return;
    setWaitingForAnimation(true);
    gameBridge.emit('replayMove', moves[step]);
    setCurrentStep(step + 1);
  }, [moves, totalSteps]);

  const handleNext = useCallback(() => {
    if (waitingForAnimation || currentStep >= totalSteps) return;
    setIsPlaying(false);
    sendMoveToPhaser(currentStep);
  }, [currentStep, totalSteps, waitingForAnimation, sendMoveToPhaser]);

  const handlePrev = useCallback(() => {
    if (currentStep <= 0) return;
    setIsPlaying(false);
    setWaitingForAnimation(true);
    const targetStep = currentStep - 1;
    setCurrentStep(targetStep);
    // Seek: reset board and fast-forward to target position
    gameBridge.emit('setReplayMode', {
      enabled: true,
      gameNumber,
      preplayMoves: moves.slice(0, targetStep),
    });
  }, [currentStep, gameNumber, moves]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setWaitingForAnimation(true);
    setCurrentStep(0);
    gameBridge.emit('setReplayMode', { enabled: true, gameNumber });
  }, [gameNumber]);

  const handlePlayPause = useCallback(() => {
    if (currentStep >= totalSteps) {
      // Reset and replay from start
      setWaitingForAnimation(true);
      setCurrentStep(0);
      gameBridge.emit('setReplayMode', { enabled: true, gameNumber });
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [currentStep, totalSteps, gameNumber]);

  const handleCycleSpeed = useCallback(() => {
    setSpeed(prev => {
      const idx = SPEED_OPTIONS.indexOf(prev);
      return SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
    onClose();
  }, [onClose]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === ' ') { e.preventDefault(); handlePlayPause(); }
      else if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePrev, handleNext, handlePlayPause, handleClose]);

  // Visible move window (show ~5 moves centered on current)
  const windowSize = 5;
  const halfWindow = Math.floor(windowSize / 2);
  let windowStart = Math.max(0, currentStep - halfWindow);
  const windowEnd = Math.min(totalSteps, windowStart + windowSize);
  if (windowEnd - windowStart < windowSize) {
    windowStart = Math.max(0, windowEnd - windowSize);
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-[60] flex justify-center pb-2 sm:pb-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="pointer-events-auto bg-[#0d2f0d]/95 border border-[#2a7c2a]/60 rounded-2xl shadow-2xl p-4 sm:p-5 max-w-sm w-[94%] backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white">Optimal Solution</h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/50">You: <span className="text-white font-bold">{playerMoves}</span></span>
            <span className="text-white/50">Best: <span className="text-emerald-400 font-bold">{totalMoveCount}</span></span>
            <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors ml-1 p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
          />
        </div>

        {/* Move list */}
        <div className="bg-black/30 rounded-lg p-2 mb-3 min-h-[120px] max-h-[160px] overflow-hidden">
          {descriptions.length === 0 ? (
            <div className="text-white/30 text-center text-sm py-6">No moves needed</div>
          ) : (
            <div className="space-y-0.5">
              {descriptions.slice(windowStart, windowEnd).map((desc, i) => {
                const stepIndex = windowStart + i;
                const isCurrent = stepIndex === currentStep - 1;
                const isPast = stepIndex < currentStep - 1;
                return (
                  <div
                    key={stepIndex}
                    className={`text-xs px-2 py-1 rounded transition-all duration-200 font-mono ${
                      isCurrent
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isPast
                        ? 'text-white/30'
                        : 'text-white/60'
                    }`}
                  >
                    <span className="text-white/30 mr-1.5 inline-block w-4 text-right">{stepIndex + 1}.</span>
                    {desc}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleReset}
            disabled={waitingForAnimation}
            className="p-2.5 text-white/50 hover:text-white disabled:text-white/20 transition-colors active:scale-90"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0 || waitingForAnimation}
            className="p-2.5 text-white/50 hover:text-white disabled:text-white/20 transition-colors active:scale-90"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handlePlayPause}
            disabled={waitingForAnimation && isPlaying}
            className="p-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full transition-colors active:scale-90 min-w-[48px] min-h-[48px] flex items-center justify-center"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps || waitingForAnimation}
            className="p-2.5 text-white/50 hover:text-white disabled:text-white/20 transition-colors active:scale-90"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={22} />
          </button>
          <button
            onClick={handleCycleSpeed}
            className="ml-1 px-2 py-1 text-xs font-bold tabular-nums rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors active:scale-90 min-w-[3ch]"
            title="Playback speed"
          >
            {speed}x
          </button>
          <div className="text-xs text-white/40 tabular-nums ml-1 min-w-[4ch] text-right">
            {currentStep}/{totalSteps}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
