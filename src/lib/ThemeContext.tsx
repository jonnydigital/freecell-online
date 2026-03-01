'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeDefinition, themes, getThemeById, applyThemeCssVars } from './themes';
import { gameBridge } from '../game/GameBridge';

interface ThemeContextValue {
  theme: ThemeDefinition;
  setTheme: (theme: ThemeDefinition) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeDefinition>(themes[0]);

  // Initialize from localStorage on mount
  useEffect(() => {
    let resolved: ThemeDefinition = themes[0];

    const storedId = localStorage.getItem('theme-id');
    if (storedId) {
      resolved = getThemeById(storedId);
    } else {
      // Migrate from old theme-name key
      const oldName = localStorage.getItem('theme-name');
      if (oldName) {
        const found = themes.find(t => t.name === oldName);
        if (found) {
          resolved = found;
          localStorage.setItem('theme-id', found.id);
        }
      }
    }

    setThemeState(resolved);
    applyThemeCssVars(resolved);
    gameBridge.emit('themeChanged', resolved);
  }, []);

  const setTheme = useCallback((newTheme: ThemeDefinition) => {
    setThemeState(newTheme);
    applyThemeCssVars(newTheme);
    localStorage.setItem('theme-id', newTheme.id);
    gameBridge.emit('themeChanged', newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
