// src/lib/themes.ts

export interface Theme {
  name: string;
  properties: {
    '--felt-color': string;
    '--felt-color-light': string;
    '--card-back': string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Classic Green',
    properties: {
      '--felt-color': '#0a3d0a',
      '--felt-color-light': '#1a5c1a',
      '--card-back': "url('/cards/back.png')",
    },
  },
  {
    name: 'Royal Blue',
    properties: {
      '--felt-color': '#1a2a5c',
      '--felt-color-light': '#2c4a8e',
      '--card-back': "url('/cards/back-blue.png')",
    },
  },
  {
    name: 'Regal Red',
    properties: {
      '--felt-color': '#5c1a1a',
      '--felt-color-light': '#8e2c2c',
      '--card-back': "url('/cards/back-red.png')",
    },
  },
  {
    name: 'Purple Velvet',
    properties: {
      '--felt-color': '#4a1a5c',
      '--felt-color-light': '#7b2c8e',
      '--card-back': "url('/cards/back-purple.png')",
    },
  },
  {
    name: 'Charcoal Black',
    properties: {
      '--felt-color': '#1a1a1a',
      '--felt-color-light': '#333333',
      '--card-back': "url('/cards/back-black.png')",
    },
  },
];

export const cardBacks = [
    { name: 'Classic Navy/Gold', value: "url('/cards/back.png')" },
    { name: 'Red/Gold', value: "url('/cards/back-red.png')" },
    { name: 'Green/Gold', value: "url('/cards/back-green.png')" },
    { name: 'Black/Silver', value: "url('/cards/back-black.png')" },
];

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  Object.entries(theme.properties).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const applyCardBack = (cardBackUrl: string) => {
    const root = document.documentElement;
    root.style.setProperty('--card-back', cardBackUrl);
}
