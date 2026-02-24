Loaded cached credentials.
Here is a comprehensive, mobile-first design specification for the **FreeCell Online** splash screen. It perfectly balances "classic casino elegance" with "clean modern app," tailored for an adult demographic seeking a refined, low-cognitive-load experience.

### 1. Color Palette (Premium Casino Midnight)
We are abandoning flat "app" colors in favor of deep, rich tones that evoke a high-end card table under warm lighting, optimized for OLED phone screens.
*   **Background (Deep Felt):** `#062516` (A very dark, almost black, forest green)
*   **Background Glow (Center highlight):** `#0F3F24` (A softer emerald to create depth behind the logo/cards)
*   **Primary Accent (Champagne Gold):** `#D4AF37`
*   **Secondary Accent (Soft Gold):** `#F3E5AB`
*   **Primary Text (Crisp White):** `#FFFFFF`
*   **Secondary Text (Silver/Grey):** `#E2E8F0`

### 2. Typography
*   **Primary/Logo Font:** **`Playfair Display`** (Google Fonts). A high-contrast, elegant serif font. It screams "classic, established, and premium" without feeling like a spreadsheet.
*   **UI/Button Font:** **`Inter`** (Google Fonts). A highly legible, perfectly geometric sans-serif for buttons and taglines to ensure the app feels undeniably modern and easy to read for the 30-60 age bracket.

### 3. Tagline Options
1.  *"The classic game, elegantly refined."*
2.  *"Your perfect strategic escape."*
3.  *"Timeless solitaire. Modern perfection."*

### 4. Visual Elements & Layout
*   **Top (Header):** Subtle, low-opacity (10%) geometric card suits (Spades, Hearts, Clubs, Diamonds) acting as a minimalist watermarked pattern fading down from the top edge.
*   **Center (Hero Image):** Two beautifully rendered, minimalist playing cards (e.g., King of Spades and Ace of Hearts). They are fanned out slightly. **Animation:** A very slow, subtle CSS floating animation (`translate-y` shifting 4px up and down over 4 seconds) to make the screen feel "alive."
*   **Lower Middle:** The Logo and Tagline, anchored above the buttons.
*   **Bottom (Action Area):** Stacked buttons, anchored to the bottom safe area of the phone so they are instantly reachable by the user's thumb.

---

### React/Tailwind Component Specification

Hand this directly to your developer. It uses standard Tailwind CSS classes and structure.

```jsx
import React from 'react';

// Developer Note: Add these fonts to your _document.js or layout layout.tsx:
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
// Add this to tailwind.config.js for the custom animation:
// theme: { extend: { animation: { 'float': 'float 4s ease-in-out infinite' }, keyframes: { float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } } } } }

export default function SplashScreen() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden font-sans">
      
      {/* 1. BACKGROUND */}
      {/* Base dark green with a radial gradient glow in the center */}
      <div className="absolute inset-0 bg-[#062516]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0F3F24] via-transparent to-transparent opacity-80" />
      
      {/* Subtle Background Pattern (Optional watermark suits) */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* 2. TOP SPACING / SAFE AREA */}
      <div className="w-full pt-16 px-6 z-10 flex flex-col items-center flex-grow">
        
        {/* 3. HERO VISUAL (Floating Cards) */}
        {/* Developer: Replace these divs with high-res PNGs or SVGs of elegant minimalist cards */}
        <div className="relative w-48 h-64 mt-8 animate-float drop-shadow-2xl">
          {/* Back Card (Spades) */}
          <div className="absolute top-0 left-0 w-40 h-56 bg-white rounded-xl border border-gray-200 shadow-xl transform -rotate-6 origin-bottom-left flex items-center justify-center">
            <span className="text-6xl text-slate-800">♠</span>
          </div>
          {/* Front Card (Hearts) */}
          <div className="absolute top-4 left-8 w-40 h-56 bg-white rounded-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transform rotate-6 origin-bottom-right flex items-center justify-center">
            <span className="text-6xl text-red-600">♥</span>
          </div>
        </div>

        {/* 4. TYPOGRAPHY: LOGO & TAGLINE */}
        <div className="mt-16 text-center z-10">
          <h1 className="font-serif text-[42px] leading-tight font-bold text-white tracking-tight drop-shadow-md">
            FreeCell<br />
            <span className="text-[#D4AF37] italic font-medium text-[38px]">Online</span>
          </h1>
          <p className="mt-4 text-[15px] font-light tracking-wide text-[#E2E8F0] opacity-90">
            The classic game, elegantly refined.
          </p>
        </div>
      </div>

      {/* 5. ACTION AREA (BUTTONS) */}
      {/* Pinned to bottom, massive tap targets for thumbs */}
      <div className="w-full px-6 pb-12 pt-8 z-10 flex flex-col gap-4 bg-gradient-to-t from-[#062516] via-[#062516]/80 to-transparent">
        
        {/* Primary Button: Play Now */}
        {/* High visual hierarchy, rich gold gradient, slight shadow for depth */}
        <button className="w-full relative group overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#062516] font-bold text-[18px] py-4 rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all active:scale-[0.98]">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Play Now
            {/* Play icon chevron */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
          </span>
        </button>

        {/* Secondary Button: Daily Challenge */}
        {/* Glassmorphic, elegant, lower hierarchy but still prominent */}
        <button className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-[16px] py-4 rounded-2xl transition-all active:bg-white/10 active:scale-[0.98]">
          Daily Challenge
        </button>

        {/* Tertiary Button: How to Play */}
        {/* Minimal text link, out of the way but easy to find */}
        <button className="w-full mt-2 text-[14px] font-medium text-white/60 hover:text-white transition-colors py-2 underline-offset-4 hover:underline">
          How to Play
        </button>
      </div>

    </div>
  );
}
```

### Why this works for your audience:
1. **Contrast & Legibility:** The dark background makes the stark white cards and gold text pop brilliantly. The `Inter` font on the buttons ensures anyone without their reading glasses can still navigate flawlessly.
2. **Thumb Ergonomics:** On a 390x844 screen (iPhone 14/15 size), the buttons sit perfectly in the bottom 25% of the screen. The 16px (`py-4`) vertical padding on buttons creates a massive, error-free tap target.
3. **The Gold Gradient (`#D4AF37` to `#F3E5AB`):** Metallic gold is notoriously tricky in CSS. By using a diagonal gradient (`to-br`) crossing through a lighter shade (`#F3E5AB`), it perfectly simulates the shimmer of foil stamping on a high-end playing card box.
