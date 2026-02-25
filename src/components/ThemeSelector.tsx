// src/components/ThemeSelector.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { themes, cardBacks, applyTheme, applyCardBack, Theme } from '../lib/themes';
import { Check } from 'lucide-react';

const ThemeSelector: React.FC = () => {
  const [selectedThemeName, setSelectedThemeName] = useState<string>('Classic Green');
  const [selectedCardBack, setSelectedCardBack] = useState<string>("url('/cards/back.png')");

  const selectedTheme = useMemo(() => themes.find(t => t.name === selectedThemeName) || themes[0], [selectedThemeName]);

  useEffect(() => {
    const storedThemeName = localStorage.getItem('theme-name') || 'Classic Green';
    const storedCardBack = localStorage.getItem('card-back') || "url('/cards/back.png')";

    applyTheme(themes.find(t => t.name === storedThemeName) || themes[0]);
    applyCardBack(storedCardBack);

    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setSelectedThemeName(storedThemeName);
      setSelectedCardBack(storedCardBack);
    });
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setSelectedThemeName(theme.name);
    applyTheme(theme);
    localStorage.setItem('theme-name', theme.name);
  };

  const handleCardBackChange = (cardBack: { name: string, value: string }) => {
    setSelectedCardBack(cardBack.value);
    applyCardBack(cardBack.value);
    localStorage.setItem('card-back', cardBack.value);
  }

  if (!selectedTheme) {
    return null; // Don't render until theme is loaded
  }

  return (
    <div className="p-4 bg-black/20 rounded-xl border border-white/10">
      <h3 
        className="text-center text-lg font-bold mb-3 text-white/90"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Appearance
      </h3>
      
      {/* Theme Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Felt Color</label>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme)}
              className="h-10 w-full rounded-md border-2 transition-all flex items-center justify-center"
              style={{
                backgroundColor: theme.properties['--felt-color'],
                borderColor: selectedTheme?.name === theme.name ? '#D4AF37' : 'transparent',
              }}
              aria-label={`Select ${theme.name} theme`}
            >
              {selectedTheme?.name === theme.name && <Check size={20} className="text-white" />}
            </button>
          ))}
        </div>
      </div>
      
      {/* Card Back Selection */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">Card Back</label>
        <div className="grid grid-cols-4 gap-2">
          {cardBacks.map((cardBack) => (
            <button
              key={cardBack.name}
              onClick={() => handleCardBackChange(cardBack)}
              className="h-20 w-full rounded-md border-2 bg-center bg-cover transition-all flex items-center justify-center"
              style={{
                backgroundImage: cardBack.value,
                borderColor: selectedCardBack === cardBack.value ? '#D4AF37' : 'transparent',
              }}
              aria-label={`Select ${cardBack.name} card back`}
            >
              {selectedCardBack === cardBack.value && (
                <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-md">
                    <Check size={24} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
