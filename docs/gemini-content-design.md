Loaded cached credentials.
Here is the comprehensive design specification for the informational pages (FAQ, How-to-Play, Strategy). This document is formatted for direct handoff to your developer.

### 1. Core Color Variables
*We are extending your base palette to support glassmorphism and proper text contrast on dark backgrounds.*

*   **Primary Background:** `#062516` (Deep Casino Green)
*   **Primary Accent:** `#D4AF37` (Champagne Gold)
*   **Accent Hover:** `#E5C354` (Bright Champagne)
*   **Heading Text:** `#FFFFFF` (Pure White) or `#D4AF37` (Gold) depending on hierarchy
*   **Body Text:** `#E0EFE6` (Soft Mint/Off-White) - *Never use pure white for body text to reduce eye strain.*
*   **Muted Text:** `#9EBAA8` (Sage Green)
*   **Glass Background:** `rgba(255, 255, 255, 0.04)`
*   **Glass Border:** `rgba(212, 175, 55, 0.15)` (15% Gold)
*   **Glass Highlight (Top border):** `rgba(255, 255, 255, 0.1)`

### 2. Typography System
*Ensure `Playfair Display` and `Inter` are loaded with the correct weights.*

*   **H1 (Page Title):** Playfair Display, `font-weight: 600`
    *   Mobile: `text-4xl` (36px), `leading-tight`
    *   Desktop: `text-5xl` (48px) to `text-6xl` (60px), `leading-tight`
    *   Color: `#D4AF37` (Gold)
*   **H2 (Section/Category Header):** Playfair Display, `font-weight: 500`
    *   Mobile: `text-2xl` (24px)
    *   Desktop: `text-3xl` (30px)
    *   Color: `#FFFFFF`
*   **H3 (Question/Sub-header):** Inter, `font-weight: 500`
    *   Mobile: `text-lg` (18px)
    *   Desktop: `text-xl` (20px)
    *   Color: `#FFFFFF`
*   **Body Text:** Inter, `font-weight: 400`
    *   Size: `text-base` (16px), `leading-relaxed` (1.625)
    *   Color: `#E0EFE6`
*   **Labels/Small Text:** Inter, `font-weight: 500`, uppercase, `tracking-wider` (letter-spacing: 0.05em)
    *   Size: `text-sm` (14px)
    *   Color: `#D4AF37`

### 3. Background & Base Layout
Instead of a flat color, the background should have a subtle texture or gradient to give depth behind the glass elements.

*   **Body Background:**
    *   Base: `#062516`
    *   Subtle Radial Gradient (Centered top): `radial-gradient(circle at 50% 0%, #0a331f 0%, #062516 70%)`
*   **Page Container:**
    *   Max-width: `max-w-4xl` (896px)
    *   Padding: `px-6 py-12` (Mobile) / `md:px-12 md:py-24` (Desktop)
    *   Centering: `mx-auto`

### 4. Glassmorphism Container Specs (The "Cards")
*Replace all solid white boxes with these specifications.*

**Tailwind Classes:**
`bg-white/5 backdrop-blur-md border border-gold/15 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden`

**Custom CSS Equivalents:**
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtle light catch */
  border-radius: 1rem; /* 16px */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}
```

### 5. Accordion Component (FAQ Specifics)
*The accordion must feel fluid and tactile, like dealing a card.*

*   **Container:** Uses the `.glass-panel` spec above.
*   **Individual Item Wrapper:**
    *   Border-bottom: `1px solid rgba(212, 175, 55, 0.1)` (Except last child)
*   **Trigger Button (The Question):**
    *   Padding: `py-5 px-6`
    *   Display: `flex justify-between items-center w-full text-left`
    *   Hover State: `bg-white/5` (transition: `background-color 0.2s ease`)
    *   Active/Open State: Text color shifts from `#FFFFFF` to `#D4AF37`
*   **Chevron Icon:**
    *   Color: `#D4AF37`
    *   Size: `w-5 h-5`
    *   Animation: `transform rotate-180` when open. `transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`
*   **Content Area (The Answer):**
    *   Padding: `px-6 pb-6 pt-0` (Top padding is 0 to stay close to the question)
    *   Animation: Standard CSS Grid transition for smooth height animation.
    *   ```css
        .accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .accordion-content[data-state="open"] {
          grid-template-rows: 1fr;
        }
        .accordion-content > div {
          overflow: hidden;
        }
        ```

### 6. Decorative Elements (Card Theming)
*Subtle nods to the game without being distracting.*

*   **Category Navigation:**
    *   Instead of standard tabs, use "Suit" themed pills.
    *   Style: `rounded-full px-5 py-2 border border-gold/30 bg-transparent text-sm tracking-wide text-gold flex items-center gap-2 transition-all`
    *   Hover: `bg-gold/10 border-gold/50`
    *   Active: `bg-gold text-[#062516] font-semibold border-gold`
    *   Icons: Small (14px) SVG suit symbols inline with the text.
*   **Corner Flourishes (Optional, for large screens):**
    *   On the absolute corners of the `.glass-panel` wrappers, you can add a faint, 10% opacity SVG of a traditional playing card corner pattern (e.g., a stylized spade or filigree) using `bg-no-repeat bg-[position:top_right_1rem] bg-[size:40px]`.

### 7. Layout Hierarchy (Top to Bottom)

1.  **Hero Section:**
    *   H1 (`#D4AF37`, Playfair) centered.
    *   Sub-headline (Body size, `#9EBAA8`, Inter) centered underneath, max-width `2xl`.
    *   Spacing: `mb-12`
2.  **Category Nav (Sticky on Mobile):**
    *   Horizontal scrolling flex container on mobile (`overflow-x-auto no-scrollbar`), centered flex wrap on desktop.
    *   Spacing: `mb-10`
3.  **Content Sections (The Glass Panels):**
    *   Group FAQs by category into separate `.glass-panel` containers to break up the visual weight.
    *   Each panel gets an H2 inside at the top: `px-6 pt-6 pb-4 text-white border-b border-gold/10`.
    *   Spacing between panels: `gap-8` (flex-col).

### Summary for the Developer:
"Use Tailwind's `bg-white/5 backdrop-blur-md` for the cards. Replace white text with `#E0EFE6` for paragraphs. All borders should be `#D4AF37` at 10-15% opacity. Animate the accordions using the CSS Grid `1fr/0fr` trick. Keep padding generous (`p-6` min inside cards)."
