# FreeCell Visual Dimming After Client-Side Navigation

Date: 2026-03-31
Status: Open

## Bug

FreeCell appears visually dimmer or washed out after Next.js client-side navigation compared with a hard refresh on the same page.

## Reproduction Steps

1. Go to `playfreecellonline.com/spider` or `solitairestack.com/spider` via a full page load.
2. Click the `♣ Spider` dropdown or any Next.js `<Link>` that navigates to `/` (FreeCell).
3. Observe that the entire game shell background appears lighter or washed out, and cards look dimmer.
4. Hard refresh the same FreeCell page with `Cmd+R`.
5. Observe that the background becomes a richer, darker green, and cards look vivid and bright.

## Ruled Out

- CSS values are identical in both states. Computed background color, opacity, filter, mix-blend-mode, and CSS custom properties on every element from `<html>` down to the cards were verified identical via JavaScript in both the client-navigation and hard-refresh states.
- DOM structure is identical. Same elements, classes, attributes, and stylesheet count.
- `html2canvas` pixel sampling shows identical RGB values in both states. The difference is below what DOM and CSS inspection can detect.
- Forced repaints do not fix it. Toggling `display: none`, `will-change: transform`, and `opacity` on `<body>` and shell containers after client-side navigation does not resolve the visual difference.
- Removing all gradients and box-shadows from the shell did not fix the core issue. Commit `689ac4a` still exhibits the discrepancy with flat `var(--theme-dark)` and `var(--theme-base)` backgrounds.

## Root Cause Hypothesis

Chrome's GPU compositor builds the compositing layer tree differently when DOM elements are created via React reconciliation during client-side navigation versus when the page is painted from scratch on a full page load.

The shell inner uses `overflow-clip` with `lg:rounded-[30px]`, which likely creates a clipping compositing layer. During client-side navigation, this layer and its children, including cards with `will-change: transform`, appear to composite with subtly different brightness or gamma than when built from a fresh page paint.

## Architecture Details

- Next.js App Router with client-side navigation between `/spider` and `/game/[id]`
- Game shell in `src/components/dom-freecell/DomGameShell.tsx`
- Shell uses nested containers with `overflow-clip`, `border-radius: 30px`, and flat background colors through CSS custom properties
- Each card element has `will-change: transform` and `transform: matrix(...)`, creating individual compositing layers
- Theme CSS variables are set via a blocking script in `src/app/layout.tsx`
- `src/components/ThemeInitializer.tsx` re-applies theme variables on mount
- `src/app/(main)/layout.tsx` wraps both Spider and FreeCell routes

## Affected Files

- `src/components/dom-freecell/DomGameShell.tsx`
- `src/components/ThemeInitializer.tsx`
- `src/app/layout.tsx`

## Potential Fix Directions

1. Force the browser to rebuild the compositing layer tree after client-side navigation.
2. Add `isolation: isolate` and `contain: paint` to the shell to create a stronger compositing boundary.
3. Intercept game-to-game navigation and force hard navigation with `window.location.href` instead of client-side navigation.
4. Investigate whether removing `will-change: transform` from settled cards eliminates the compositor discrepancy.
