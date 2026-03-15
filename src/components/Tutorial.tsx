'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spade, Hand, ArrowDownUp, RotateCcw, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

export interface TutorialStep {
  title: string;
  text: string;
  icon: ReactNode;
  highlightKey: string | null;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Welcome to FreeCell!',
    text: 'A quick walkthrough to get you started. Every deal in FreeCell is solvable with the right strategy.',
    icon: <Spade size={28} />,
    highlightKey: null,
  },
  {
    title: 'Free Cells',
    text: 'These four cells are temporary storage. Each holds one card. Use them strategically to free up moves in the tableau.',
    icon: <span className="text-2xl font-bold">4</span>,
    highlightKey: 'freecells',
  },
  {
    title: 'Foundations',
    text: 'Your goal: build each suit from Ace to King here. Cards are moved automatically when safe, or drag them yourself.',
    icon: <span className="text-lg">A → K</span>,
    highlightKey: 'foundations',
  },
  {
    title: 'Moving Cards',
    text: 'Drag a card to move it, or tap it then tap the destination. On mobile, a single tap auto-moves when there\'s an obvious play.',
    icon: <Hand size={28} />,
    highlightKey: 'tableau',
  },
  {
    title: 'Valid Moves',
    text: 'Stack cards in descending order with alternating colors (red on black, black on red). Empty columns can hold any card.',
    icon: <ArrowDownUp size={28} />,
    highlightKey: 'tableau',
  },
  {
    title: 'Undo Anytime',
    text: 'Made a mistake? Undo is unlimited — experiment freely. Use the undo button or press Ctrl+Z.',
    icon: <RotateCcw size={28} />,
    highlightKey: 'undo',
  },
  {
    title: 'You\'re Ready!',
    text: 'That\'s everything. You can replay this tutorial anytime from Settings.',
    icon: <Sparkles size={28} />,
    highlightKey: null,
  },
];

export interface HighlightRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TutorialProps {
  isOpen: boolean;
  onDismiss: () => void;
  highlightRect: HighlightRect | null;
  onStepChange: (highlightKey: string | null) => void;
}

export default function Tutorial({ isOpen, onDismiss, highlightRect, onStepChange }: TutorialProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Notify parent of highlight key whenever step changes
  useEffect(() => {
    if (isOpen) {
      onStepChange(TUTORIAL_STEPS[step].highlightKey);
    }
  }, [step, isOpen, onStepChange]);

  // Reset step when opened
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setDirection(1);
    }
  }, [isOpen]);

  const handleDismiss = useCallback(() => {
    try {
      localStorage.setItem('tutorialSeen', 'true');
    } catch {
      // Storage blocked
    }
    onDismiss();
  }, [onDismiss]);

  const handleNext = useCallback(() => {
    if (step < TUTORIAL_STEPS.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      handleDismiss();
    }
  }, [step, handleDismiss]);

  const handlePrev = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  }, [step]);

  const isLastStep = step === TUTORIAL_STEPS.length - 1;
  const currentStep = TUTORIAL_STEPS[step];

  // Determine if the card should appear above or below the spotlight
  const cardPosition = (() => {
    if (!highlightRect) return 'center';
    const viewportMid = window.innerHeight / 2;
    const spotlightMid = highlightRect.y + highlightRect.height / 2;
    return spotlightMid < viewportMid ? 'below' : 'above';
  })();

  const contentVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.95,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Tutorial">
          {/* Dark overlay — always present, click does nothing (must use buttons) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/75"
            aria-hidden="true"
          />

          {/* Spotlight cutout */}
          <AnimatePresence mode="wait">
            {highlightRect && (
              <motion.div
                key={currentStep.highlightKey}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: highlightRect.x - 8,
                  y: highlightRect.y - 8,
                  width: highlightRect.width + 16,
                  height: highlightRect.height + 16,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 rounded-xl"
                style={{
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Content card */}
          <div
            className={`absolute inset-0 flex flex-col px-4 pointer-events-none ${
              cardPosition === 'above'
                ? 'justify-start pt-8 md:pt-12'
                : cardPosition === 'below'
                  ? 'justify-end pb-24 md:pb-16'
                  : 'justify-center'
            }`}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="pointer-events-auto mx-auto w-full max-w-md"
              >
                <div
                  className="rounded-3xl border-2 shadow-2xl px-8 py-7 backdrop-blur-md"
                  style={{
                    backgroundColor: 'var(--theme-panel)',
                    borderColor: 'color-mix(in srgb, var(--gold) 40%, transparent)',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--theme-accent)', color: 'var(--gold)', width: 52, height: 52 }}
                    >
                      {currentStep.icon}
                    </div>
                    <h2
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: 'var(--gold)', fontFamily: 'var(--font-playfair)' }}
                    >
                      {currentStep.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] leading-relaxed text-white/70 mb-6">
                    {currentStep.text}
                  </p>

                  {/* Step dots */}
                  <div className="flex items-center justify-center gap-2 mb-5">
                    {TUTORIAL_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: i === step ? 24 : 8,
                          backgroundColor: i === step ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Skip — always visible */}
                    <button
                      onClick={handleDismiss}
                      className="px-4 py-2.5 text-sm font-medium text-white/40 hover:text-white/70 active:text-white transition-colors rounded-xl min-h-[44px]"
                    >
                      Skip
                    </button>

                    <div className="flex items-center gap-2.5">
                      {/* Previous */}
                      {step > 0 && (
                        <button
                          onClick={handlePrev}
                          className="px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 active:text-white transition-colors rounded-xl border border-white/10 min-h-[44px]"
                        >
                          Back
                        </button>
                      )}

                      {/* Next / Got it! */}
                      <button
                        onClick={handleNext}
                        className="px-7 py-3 text-sm font-bold rounded-xl transition-all active:scale-95 min-h-[44px]"
                        style={{
                          backgroundColor: 'var(--gold)',
                          color: '#000',
                        }}
                      >
                        {isLastStep ? 'Got it!' : 'Next'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step counter */}
                <p className="text-center text-[11px] text-white/25 mt-2 tabular-nums">
                  {step + 1} of {TUTORIAL_STEPS.length}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
