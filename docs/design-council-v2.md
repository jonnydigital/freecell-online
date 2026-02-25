# Design Council V2 — Visual Review of Live Screenshots (Feb 24, 2026)

Both consultants reviewed actual screenshots of the live site. Here is their combined feedback.

---

## GEMINI 3.1 PRO FEEDBACK

### Core Problem
The white containers look like flat white boxes, not playing cards. Need texture, depth, shadows.

### 1. Eliminate the Green Header Bands
- The green bands BREAK the playing card metaphor. A playing card is one cohesive object.
- Instead: incorporate section titles directly into the card body with an elegant separator
- Use a subtle `<hr>` or gold gradient line below the title

### 2. Card Container Treatment
- Background: NOT pure white. Use warm ivory/cream (`#faf6f0` or similar)
- Border-radius: `rounded-2xl` (16px) — real playing cards have notable rounding
- Border: subtle warm border `border border-[#d4c5a0]/60`
- Shadow: HEAVY layered shadow — `box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 12px 40px rgba(0,0,0,0.2);`
- Inner frame: An absolute-positioned `inset-[6px]` div with faint golden border to mimic the printed border on real cards
- Padding: generous — `p-8 sm:p-10 md:p-12`
- Max-width: `max-w-3xl` centered, `w-full`

### 3. Felt Background
- Add noise/weave texture overlay at low opacity
- Add radial vignette: lighter warm green center, darker edges (overhead lighting)
- Base color should be richer: `#1a4a2e` or `#0d4022`

### 4. Typography
- Body: `text-base leading-[1.75]`, not pure black — use `text-[#3a3a3a]`
- Headings: serif (Playfair Display), `font-bold`, gold suit icons

### 5. Page Layout
- Center with flexbox: `flex justify-center items-start min-h-screen p-4 sm:p-8`
- Single card per section, centered, breathing room between

---

## CLAUDE FRONTEND DESIGN SKILL FEEDBACK

### Core Problem  
Same — white divs on green, not playing cards on felt.

### 1. Card Containers — The "Inner Frame" Trick (KEY INSIGHT)
- Add an inner decorative border: `absolute inset-[6px] rounded-xl border border-[#c9b97a]/25 pointer-events-none z-20`
- This mimics the printed border on real playing cards and is the single biggest improvement
- Shadow stack: `shadow-[0_4px_6px_rgba(0,0,0,0.3),_0_12px_24px_rgba(0,0,0,0.25),_0_1px_0px_rgba(255,255,255,0.1)_inset]`
- `bg-[#faf6f0]` for the warm cream tone

### 2. Green Header Band Treatment (different opinion from Gemini)
- KEEP the green band but make it feel integrated, not pasted on
- Use SOLID green `bg-[#1b5e30]` not a gradient (gradients look web-banner-ish)
- Add subtle sheen overlay for dimension
- Gold bottom separator: `bg-gradient-to-r from-transparent via-[#c9a84c]/70 to-transparent`
- More padding: `px-8 pt-5 pb-4`
- Gold suit symbols, gold category label

### 3. FAQ Accordion
- Dividers: `border-[#d4c5a0]/40` (gold-tinted, not gray)
- Hover: `hover:bg-[#f4edd8]/50` (warm, not white/gray)
- Chevrons: gold `text-[#b8993e]`
- Padding: `px-8 md:px-10 py-5`

### 4. How-to-Play Wall of Text
- `space-y-5` between paragraphs
- Pull-quote callouts: `border-l-4 border-[#c9a84c] bg-[#f4edd8]/60 rounded-r-lg`
- Decorative suit dividers between sections: `♦ ♠ ♦` with gold gradient lines
- Numbered steps with green circles + gold numbers for instructional content

### 5. Strategy Page Inner Cards
- The pillar cards (Preserve Flexibility, Think in Chains, etc.) need the same card treatment
- Or style them as "mini-cards" with similar cream/shadow/border treatment

---

## CONSENSUS (where both agree)

1. **Card background**: Warm cream/ivory `#faf6f0`, NOT pure white ✅
2. **Heavy layered shadows**: Multiple shadow values for depth ✅  
3. **Generous internal padding**: `px-8 sm:px-10` minimum ✅
4. **Body text**: `text-[#3a3a3a]` with `leading-relaxed` or `leading-[1.75]` ✅
5. **Gold accents throughout**: dividers, chevrons, suit icons ✅
6. **Rounded-2xl**: 16px radius for card-like feel ✅
7. **Break up how-to-play text**: paragraph spacing, callouts, dividers ✅
8. **Centered layout with max-width constraint** ✅

## DISAGREEMENT (your call)

- **Green header bands**: Gemini says ELIMINATE them. Claude says KEEP but refine.
  - SUGGESTION: Try Claude's approach (solid green, gold separator) — if it still looks wrong, cut them entirely per Gemini.

---

## IMPLEMENTATION NOTES

Files to modify:
- `src/app/globals.css` — update `.card-panel`, `.felt-bg` classes
- `src/app/faq/page.tsx` — card structure, accordion wrapper
- `src/app/how-to-play/page.tsx` — card structure, text breakup, callouts
- `src/app/strategy/page.tsx` — card structure, inner pillar cards
- `src/components/AccordionItem.tsx` — styling updates

The `.card-panel` class in globals.css should be updated with ALL the card treatments (shadow, border, radius, background). The inner frame can be added as a `::after` pseudo-element on `.card-panel` to avoid changing every page.

Keep ALL existing SEO text content intact.
