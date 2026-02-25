// src/components/ThemeInitializer.tsx
'use client';

import { useEffect } from 'react';
import { themes, applyTheme, applyCardBack } from '../lib/themes';

const ThemeInitializer = () => {
  useEffect(() => {
    const storedThemeName = localStorage.getItem('theme-name') || 'Classic Green';
    const storedCardBack = localStorage.getItem('card-back') || "url('/cards/back.png')";

    const currentTheme = themes.find(t => t.name === storedThemeName) || themes[0];
    applyTheme(currentTheme);
    applyCardBack(storedCardBack);
  }, []);

  return null;
};

export default ThemeInitializer;
