/**
 * Accessibility utilities for screen reader announcements
 * and user preference management.
 */

const A11Y_LIVE_REGION_ID = 'sr-announcements';
const HIGH_CONTRAST_KEY = 'freecell-high-contrast';
const REDUCED_MOTION_KEY = 'freecell-reduced-motion';

/**
 * Announce a message to screen readers via aria-live region.
 * Creates the live region if it doesn't exist yet.
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') return;

  let region = document.getElementById(A11Y_LIVE_REGION_ID);
  if (!region) {
    region = document.createElement('div');
    region.id = A11Y_LIVE_REGION_ID;
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
  }

  // Update priority if needed
  region.setAttribute('aria-live', priority);

  // Clear then set to ensure re-announcement of same message
  region.textContent = '';
  requestAnimationFrame(() => {
    region!.textContent = message;
  });
}

export function getHighContrast(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(HIGH_CONTRAST_KEY) === 'true';
}

export function setHighContrast(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(HIGH_CONTRAST_KEY, String(enabled));
  applyHighContrast(enabled);
}

export function applyHighContrast(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('high-contrast', enabled);
}

export function getReducedMotion(): boolean {
  if (typeof localStorage === 'undefined') return false;
  // Check manual preference first, then OS preference
  const manual = localStorage.getItem(REDUCED_MOTION_KEY);
  if (manual !== null) return manual === 'true';
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

export function setReducedMotion(enabled: boolean): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(REDUCED_MOTION_KEY, String(enabled));
  applyReducedMotion(enabled);
}

export function applyReducedMotion(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('reduced-motion', enabled);
}
