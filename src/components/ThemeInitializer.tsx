// src/components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';
import { themes, getThemeById, applyThemeCssVars } from '../lib/themes';
import { applyCardBackCssVars } from '../game/CardBacks';

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
    const storedThemeId = localStorage.getItem('theme-id');
    const storedThemeName = localStorage.getItem('theme-name');
    const currentTheme = storedThemeId
      ? getThemeById(storedThemeId)
      : themes.find(t => t.name === storedThemeName) || themes[0];
    applyThemeCssVars(currentTheme);
    applyCardBackCssVars();

    return () => window.removeEventListener('themeChange', handler);
  }, []);

  return null;
};

export default ThemeInitializer;
