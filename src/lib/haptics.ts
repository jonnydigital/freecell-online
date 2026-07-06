import { loadSettings } from './storage';

type HapticPattern = 'select' | 'move' | 'foundation' | 'invalid' | 'win';

const PATTERNS: Record<HapticPattern, number | number[]> = {
  select: 8,
  move: 12,
  foundation: [10, 24, 18],
  invalid: [24, 36, 24],
  win: [18, 35, 28, 35, 45],
};

export function triggerHaptic(pattern: HapticPattern): void {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;

  try {
    if (!loadSettings().hapticsEnabled) return;
    navigator.vibrate(PATTERNS[pattern]);
  } catch {
    // Some browsers expose vibrate but block it in low-power or privacy modes.
  }
}
