# Design Council Feedback — Content Pages (Feb 24, 2026)

Screenshots reviewed: FAQ page and How-to-Play page at playfreecellonline.com
Design intent: "Playing cards resting on casino felt" — ivory card containers on dark green textured felt with gold accents.

## Current State
- Green header bands inside cards ✅ (partially working)
- Felt texture + vignette on background ✅
- Ivory card containers ✅
- But execution still has major issues

---

## Gemini 3.1 Pro Critique

### 1. Layout: Left-Aligned Feel
- The `max-w-4xl mx-auto` technically centers, but the content feels lost on wide screens
- **Fix**: Use responsive padding `px-6 sm:px-8 lg:px-12` and ensure the page wrapper manages overflow correctly. Remove `h-screen` if it causes weird scrolling.

### 2. Category Labels Still Feel Disconnected
- The green header band is there but the labels feel like they float
- **Fix**: Make the category label + heading a cohesive header inside the card. The green band should use `overflow-hidden` on the parent card with proper border-radius inheritance.

### 3. Internal Padding Insufficient
- Text is still too close to card edges. FAQ questions nearly touch the left border.
- **Fix**: `px-8 sm:px-10 lg:px-12` for card body content. `py-8` vertical padding.

### 4. Card Shadows Too Subtle
- Cards feel flat despite rounded corners
- **Fix**: Layered shadow: `shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.12)]` plus `border border-[#E8E0CC]` for defined warm edge. Optional `ring-1 ring-inset ring-white/50` for inner highlight.

### 5. Vertical Spacing Inconsistent
- Gaps between cards vary
- **Fix**: Use `space-y-10 sm:space-y-14` (3.5rem on desktop) for consistent rhythm

### 6. Typography Hierarchy Weak
- Suit symbols same color as heading text
- **Fix**: Make suit icons gold `text-[#DAA520]` to create accent. Add `tracking-tight` to display-size serif headings.

---

## Claude Frontend Design Skill Critique

### 1. Category Labels Outside Card Visual Boundary
- The green band works but needs refinement. Two approaches:
  - **Option A (recommended)**: Green gradient band `bg-gradient-to-r from-[#1B5E20] to-[#2E7D32]` with gold label `text-amber-400 text-xs tracking-[0.25em]`, white heading below
  - **Option B (subtler)**: Label inside card with bottom border separator, no colored band

### 2. Internal Padding — Card Metaphor
- Real playing cards have generous margins around printed content
- **Fix**: `px-8 sm:px-10 lg:px-12 py-8` for card body. FAQ items need `-mx-4 px-4` technique for hover targets within padding.

### 3. How-to-Play Wall of Text (CRITICAL)
- Three dense paragraphs with no visual breaks = Terms of Service vibes
- **Fixes**:
  - `space-y-5` between paragraphs (1.25rem/20px)
  - Lead paragraph: `text-lg sm:text-xl font-serif` for first paragraph
  - Pull-quote callouts for key facts (deal #11982): `border-l-4 border-[#DAA520] bg-[#1B5E20]/10 px-6 py-4`
  - Sub-headings within long sections: `text-lg font-serif font-semibold` with gold suit icons
  - Decorative suit dividers between major sections

### 4. Card Texture
- Real playing cards have subtle linen texture
- **Fix**: Add very faint noise pattern overlay on card backgrounds at 2-3% opacity

### 5. FAQ Accordion Refinement
- Dividers need warmer color: `border-[#D4C9A8]/50`
- Hover state: `hover:bg-[#F5F0E0]/50`
- Chevron: ensure `shrink-0` and adequate `ml-4` spacing from question text
- `max-w-prose` (65ch) on answer text for readable line length

### 6. Navigation Pills
- In-page nav could be elevated with `hover:underline hover:underline-offset-4 hover:decoration-[#DAA520]/50`

---

## Implementation Priority (combined)

1. **Fix internal padding across all card bodies** — px-10 py-8 minimum
2. **Refine green header bands** — proper gradient, gold label, white heading, overflow-hidden inheritance
3. **How-to-play: break up wall of text** — paragraph spacing, lead paragraph, pull-quotes, sub-headings
4. **Card shadows + border** — layered shadow + warm border + optional inner ring
5. **Consistent vertical rhythm** — space-y-12 or space-y-14 between cards
6. **Typography polish** — gold suit icons, tracking-tight on headings, max-w-prose on body
7. **Accordion polish** — warmer dividers, better hover, proper padding
8. **Nav pills** — underline-offset hover treatment

## Files to Modify
- `src/app/faq/page.tsx`
- `src/app/how-to-play/page.tsx`
- `src/app/strategy/page.tsx`
- `src/components/AccordionItem.tsx`
- `src/app/globals.css`
