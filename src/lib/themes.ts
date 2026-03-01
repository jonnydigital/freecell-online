// src/lib/themes.ts

export interface ThemeDefinition {
  id: string;
  name: string;
  feltColor: string;        // hex - Phaser canvas background
  feltNoiseLight: string;   // hex - light specks in felt noise
  feltNoiseDark: string;    // hex - dark specks in felt noise
  vignetteAlpha: number;    // base alpha for vignette edge darkening
  cardBack: 'classic' | 'blue' | 'red' | 'ornate';
  // Derived UI colors for React components
  ui: {
    base: string;           // full-page background
    dark: string;           // toolbar, footer
    mid: string;            // game container
    accent: string;         // buttons, slot outlines
    accentHover: string;    // button hover
    border: string;         // subtle borders
    panel: string;          // modal/panel bg
  };
}

export const themes: ThemeDefinition[] = [
  {
    id: 'classic-green',
    name: 'Classic Green',
    feltColor: '#0a3d0a',
    feltNoiseLight: '#1a5c1a',
    feltNoiseDark: '#062e06',
    vignetteAlpha: 0.12,
    cardBack: 'classic',
    ui: {
      base: '#0a351a',
      dark: '#072907',
      mid: '#0d4a22',
      accent: '#1a5c1a',
      accentHover: '#257a25',
      border: '#2a7c2a',
      panel: '#0d2f0d',
    },
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    feltColor: '#0d1f3d',
    feltNoiseLight: '#1a3a6e',
    feltNoiseDark: '#060e1f',
    vignetteAlpha: 0.12,
    cardBack: 'blue',
    ui: {
      base: '#0b1929',
      dark: '#081428',
      mid: '#122d52',
      accent: '#1a3a6e',
      accentHover: '#25508e',
      border: '#2a5a9e',
      panel: '#0e1e38',
    },
  },
  {
    id: 'wine-red',
    name: 'Wine Red',
    feltColor: '#3d0d1a',
    feltNoiseLight: '#6e1a30',
    feltNoiseDark: '#1f060e',
    vignetteAlpha: 0.12,
    cardBack: 'red',
    ui: {
      base: '#2e0a14',
      dark: '#280812',
      mid: '#521222',
      accent: '#6e1a30',
      accentHover: '#8e2545',
      border: '#9e2a48',
      panel: '#350c18',
    },
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    feltColor: '#1a1a2e',
    feltNoiseLight: '#2a2a4e',
    feltNoiseDark: '#0e0e1a',
    vignetteAlpha: 0.15,
    cardBack: 'classic',
    ui: {
      base: '#141420',
      dark: '#121220',
      mid: '#222238',
      accent: '#2a2a4e',
      accentHover: '#3a3a6e',
      border: '#3a3a6e',
      panel: '#18182c',
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    feltColor: '#2d3436',
    feltNoiseLight: '#4a5154',
    feltNoiseDark: '#1a1f20',
    vignetteAlpha: 0.12,
    cardBack: 'classic',
    ui: {
      base: '#232829',
      dark: '#1e2324',
      mid: '#383f42',
      accent: '#4a5154',
      accentHover: '#5a6366',
      border: '#5a6366',
      panel: '#282e30',
    },
  },
];

export function getThemeById(id: string): ThemeDefinition {
  return themes.find(t => t.id === id) || themes[0];
}

/** Apply theme CSS custom properties to document root */
export function applyThemeCssVars(theme: ThemeDefinition): void {
  const root = document.documentElement;
  root.style.setProperty('--theme-base', theme.ui.base);
  root.style.setProperty('--theme-dark', theme.ui.dark);
  root.style.setProperty('--theme-mid', theme.ui.mid);
  root.style.setProperty('--theme-accent', theme.ui.accent);
  root.style.setProperty('--theme-accent-hover', theme.ui.accentHover);
  root.style.setProperty('--theme-border', theme.ui.border);
  root.style.setProperty('--theme-panel', theme.ui.panel);
  root.style.setProperty('--felt-color', theme.feltColor);
  root.style.setProperty('--felt-color-light', theme.feltNoiseLight);
}

/** Convert hex color string (#rrggbb) to Phaser integer (0xRRGGBB) */
export function hexToInt(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}
