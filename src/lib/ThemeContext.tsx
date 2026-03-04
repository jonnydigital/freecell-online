'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeDefinition, themes, getThemeById, applyThemeCssVars } from './themes';
import { gameBridge } from '../game/GameBridge';

interface ThemeContextValue {
  theme: ThemeDefinition;
  setTheme: (theme: ThemeDefinition) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): ThemeDefinition {
  if (typeof window === 'undefined') return themes[0];
  const storedId = localStorage.getItem('theme-id');
  if (storedId) return getThemeById(storedId);
  const oldName = localStorage.getItem('theme-name');
  if (oldName) {
    const found = themes.find(t => t.name === oldName);
    if (found) {
      localStorage.setItem('theme-id', found.id);
      return found;
    }
  }
  return themes[0];
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeDefinition>(getInitialTheme);

  // Apply CSS vars and notify game on mount
  useEffect(() => {
    applyThemeCssVars(theme);
    gameBridge.emit('themeChanged', theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
