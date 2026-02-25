'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// X icon unused — close handled by Skip/Done buttons

const tutorialSteps = [
  {
    title: 'Welcome to FreeCell!',
    text: 'This quick tutorial will walk you through the basics of the game.',
    highlight: null,
  },
  {
    title: 'The Goal',
    text: 'The goal is to move all 52 cards to the four foundations in the top right, building up from Ace to King for each suit.',
    highlight: 'foundations',
  },
  {
    title: 'The Free Cells',
    text: 'These four empty cells in the top left are temporary storage spaces. Each can hold only one card.',
    highlight: 'freecells',
  },
  {
    title: 'Moving Cards',
    text: 'On desktop, drag cards to move them. On mobile, tap a card to select it, then tap its destination to move it.',
    highlight: 'tableau',
  },
  {
    title: 'Daily Challenge',
    text: 'Play a special, solvable game each day to build up your winning streak. Access it from the home screen.',
    highlight: 'dailyButton',
  },
  {
    title: "You're Ready!",
    text: 'You now know everything you need to play. Good luck!',
    highlight: null,
  },
];

interface TutorialProps {
  isOpen: boolean;
  onDismiss: () => void;
  highlightRect: { x: number; y: number; width: number; height: number; } | null;
}

export default function Tutorial({ isOpen, onDismiss, highlightRect }: TutorialProps) {
  const [step, setStep] = useState(0);

  const handleDismiss = () => {
    try {
      localStorage.setItem('tutorialSeen', 'true');
    } catch (e) {
      console.error('Failed to set tutorialSeen in localStorage', e);
    }
    onDismiss();
  };

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Effect to pass the current step's highlight key up to the parent
  useEffect(() => {
    if (isOpen) {
      const key = tutorialSteps[step].highlight;
      // This is a bit of a hack. A more robust solution might use a callback.
      // We're notifying GameShell which element we need a rect for.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)._geminiTutorialHighlight = key;
      window.dispatchEvent(new CustomEvent('gemini-tutorial-step-change'));
    }
  }, [step, isOpen]);
  
  const currentStep = tutorialSteps[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />
          
          {/* Spotlight effect */}
          {highlightRect && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: highlightRect.x,
                  y: highlightRect.y,
                  width: highlightRect.width,
                  height: highlightRect.height,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 rounded-lg"
                style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8)',
                    pointerEvents: 'none',
                }}
             />
          )}

          <div className="fixed inset-0 z-[51] flex flex-col items-center justify-end p-4 md:justify-center">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#072907] border-2 border-[#D4AF37]/50 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center text-white"
            >
              <h2
                className="text-3xl font-bold text-[#D4AF37] mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {currentStep.title}
              </h2>
              <p className="text-white/80 mb-6">{currentStep.text}</p>

              <div className="flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 text-white/50 hover:text-white transition-colors"
                  >
                    Previous
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-white/50 hover:text-white transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    {step === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
