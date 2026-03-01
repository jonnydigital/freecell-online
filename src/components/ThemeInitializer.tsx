// src/components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';
import { themes, applyThemeCssVars } from '../lib/themes';

const ThemeInitializer = () => {
  useEffect(() => {
    const storedThemeName = localStorage.getItem('theme-name') || 'Classic Green';
    const currentTheme = themes.find(t => t.name === storedThemeName) || themes[0];
    applyThemeCssVars(currentTheme);
  }, []);

  return null;
};

export default ThemeInitializer;
