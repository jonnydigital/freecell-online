'use client';

import { useEffect } from 'react';

/**
 * Ensures the page can scroll past the h-dvh game container.
 * The game shell uses h-dvh + overflow-hidden which can trap
 * scroll on some browsers. This forces html/body to allow scrolling.
 * Render this component on any page with below-fold content after the game.
 */
export default function ScrollUnlock() {
  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  return null;
}
