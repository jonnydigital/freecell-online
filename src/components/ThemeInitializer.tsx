// src/components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';
import { themes, applyThemeCssVars } from '../lib/themes';

/**
 * Listens for runtime theme changes (e.g. from settings UI).
 * Initial theme is applied by a blocking <script> in root layout
 * to prevent FOUC — this component only handles subsequent changes.
 */
const ThemeInitializer = () => {
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.themeName) {
        const theme = themes.find(t => t.name === detail.themeName) || themes[0];
        applyThemeCssVars(theme);
      }
    };
    window.addEventListener('themeChange', handler);

    // Also re-apply on mount in case blocking script missed (e.g. client nav)
    const storedThemeName = localStorage.getItem('theme-name') || 'Classic Green';
    const currentTheme = themes.find(t => t.name === storedThemeName) || themes[0];
    applyThemeCssVars(currentTheme);

    return () => window.removeEventListener('themeChange', handler);
  }, []);

  return null;
};

export default ThemeInitializer;
