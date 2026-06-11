// src/lib/themes.ts

export interface ThemeDefinition {
  id: string;
  name: string;
  feltColor: string;        // hex - mid felt tone / Phaser canvas background
  feltNoiseLight: string;   // hex - felt vignette highlight (center)
  feltNoiseDark: string;    // hex - light specks in felt noise (legacy)
  vignetteAlpha: number;    // base alpha for vignette edge darkening
  cardBack: 'classic' | 'blue' | 'red' | 'ornate';
  // Derived UI colors for React components
  ui: {
    base: string;           // full-page background
    dark: string;           // toolbar, footer, felt vignette edge
    mid: string;            // game container
    accent: string;         // buttons, slot outlines
    accentHover: string;    // button hover
    border: string;         // subtle borders
    panel: string;          // modal/panel bg
  };
  // Optional card/table styling overrides (fall back to stylesheet defaults)
  card?: {
    face?: string;            // CSS background-image for the card face
    suitRed?: string;
    suitBlack?: string;
    foundationAccent?: string;     // foundation slot ring color
    foundationAccentSoft?: string; // foundation watermark / inner ring
    courtFont?: string;            // font for J/Q/K index letters
  };
}

// Defaults applied when a theme doesn't override a card/table property,
// so switching themes always resets cleanly.
const CARD_DEFAULTS = {
  face: 'linear-gradient(168deg, #ffffff 0%, #fbf9f4 55%, #f3efe6 100%)',
  suitRed: '#c8102e',
  suitBlack: '#1b1b1f',
  foundationAccent: 'rgba(212, 175, 55, 0.35)',
  foundationAccentSoft: 'rgba(212, 175, 55, 0.30)',
  courtFont: "Georgia, 'Times New Roman', serif",
};

export const themes: ThemeDefinition[] = [
  {
    id: 'casino',
    name: 'Casino',
    feltColor: '#114a27',
    feltNoiseLight: '#1c6b39',
    feltNoiseDark: '#0c3b1f',
    vignetteAlpha: 0.16,
    cardBack: 'classic',
    ui: {
      base: '#0e4020',
      dark: '#0a3310',
      mid: '#125a2a',
      accent: '#1f6e22',
      accentHover: '#2a8a2d',
      border: '#2a7c2a',
      panel: '#0d2f0d',
    },
    card: {
      foundationAccent: 'rgba(212, 175, 55, 0.38)',
      foundationAccentSoft: 'rgba(212, 175, 55, 0.32)',
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    feltColor: '#347a51',
    feltNoiseLight: '#46996a',
    feltNoiseDark: '#245839',
    vignetteAlpha: 0.12,
    cardBack: 'classic',
    ui: {
      base: '#2a6342',
      dark: '#245839',
      mid: '#347a51',
      accent: '#2f7d4f',
      accentHover: '#3a9a63',
      border: '#3f8c5c',
      panel: '#1f4d33',
    },
    card: {
      face: '#ffffff',
      suitRed: '#d4202a',
      suitBlack: '#111111',
      foundationAccent: 'rgba(255, 255, 255, 0.28)',
      foundationAccentSoft: 'rgba(255, 255, 255, 0.26)',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    feltColor: '#161f29',
    feltNoiseLight: '#243747',
    feltNoiseDark: '#0e141b',
    vignetteAlpha: 0.18,
    cardBack: 'blue',
    ui: {
      base: '#0e141b',
      dark: '#0b1118',
      mid: '#1b2733',
      accent: '#2f3e52',
      accentHover: '#3d5066',
      border: '#3a4a5e',
      panel: '#141d26',
    },
    card: {
      face: '#ffffff',
      suitRed: '#e8384f',
      suitBlack: '#1b2733',
      foundationAccent: 'rgba(120, 140, 255, 0.45)',
      foundationAccentSoft: 'rgba(150, 170, 255, 0.40)',
      courtFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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

  // Card / table styling — always set (with fallback) so themes reset cleanly
  const c = theme.card ?? {};
  root.style.setProperty('--card-face', c.face ?? CARD_DEFAULTS.face);
  root.style.setProperty('--suit-red', c.suitRed ?? CARD_DEFAULTS.suitRed);
  root.style.setProperty('--suit-black', c.suitBlack ?? CARD_DEFAULTS.suitBlack);
  root.style.setProperty('--foundation-accent', c.foundationAccent ?? CARD_DEFAULTS.foundationAccent);
  root.style.setProperty('--foundation-accent-soft', c.foundationAccentSoft ?? CARD_DEFAULTS.foundationAccentSoft);
  root.style.setProperty('--court-font', c.courtFont ?? CARD_DEFAULTS.courtFont);
}

/** Convert hex color string (#rrggbb) to Phaser integer (0xRRGGBB) */
export function hexToInt(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}
