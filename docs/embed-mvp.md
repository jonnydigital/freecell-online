# FreeCell Embed MVP

**Last updated:** March 12, 2026

## Overview

PlayFreeCellOnline.com offers a free, embeddable FreeCell solitaire widget that any website can add with a single HTML snippet. The embed is a fully playable game — not a screenshot or a redirect.

## Runtime URL

```
https://playfreecellonline.com/embed/freecell
```

The embed is served from the `/embed/freecell` route, which runs inside a chrome-free layout with no ads, no footer, no analytics scripts, and no cookie consent banner.

## How the Generator Works

The public generator at `/embed-generator` lets anyone create an embed code without writing HTML:

1. Set width (320–1200px) and height (400–900px)
2. See a live preview of the embedded game at those dimensions
3. Copy the generated `<iframe>` snippet to clipboard
4. Paste into any HTML page, WordPress post, Squarespace embed block, or forum

The generator uses `absoluteUrl('/embed/freecell')` so the embed URL is always domain-correct regardless of which site key is active.

## Supported Parameters

| Parameter | Type | Description |
|---|---|---|
| `ref` | Query string | Optional referrer tag for attribution tracking. Example: `?ref=my-blog`. Stored in `window.__embedRef` for analytics. |

No other parameters are currently supported. Width and height are controlled by the iframe attributes, not by query params.

## What the Embed Includes

- Full FreeCell game with drag-and-drop (mouse and touch)
- Top bar: game number, timer, move counter
- Controls: New Game, Restart, Undo, Redo, Hint
- Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y (redo), H (hint)
- Win overlay with star rating (3 stars ≤60 moves, 2 stars ≤90, 1 star >90)
- Attribution bar at the bottom linking back to playfreecellonline.com

## What the Embed Excludes

These features exist in the main site but are intentionally removed from the embed:

- Ads
- Stats tracking / stats panel
- Achievements / badges
- Daily challenge flow
- Ghost mode / solver / replay
- Tutorial
- Streak and storm modes
- Leaderboard
- Share buttons
- Settings panel / card back picker
- Sound toggle UI (sounds still play via the board's built-in effects)
- Deadlock detection banner
- Cookie consent
- Analytics scripts (GA4, AdSense)
- Service worker

## Attribution Requirement

The embed includes a small "Powered by PlayFreeCellOnline.com" link at the bottom of the game. This link must remain visible. It is the only requirement for using the embed.

The attribution link includes UTM tracking: `?utm_source=embed&utm_medium=widget`.

## Iframe Headers

The embed route serves these headers to allow cross-origin embedding:

```
X-Frame-Options: ALLOWALL
Content-Security-Policy: frame-ancestors *
```

These are set in `next.config.ts` for all `/embed/*` routes only. Non-embed routes retain default frame restrictions.

## Technical Architecture

- **Route group:** `src/app/(embed)/embed/` — has its own layout with no site chrome
- **Root layout:** Minimal `src/app/layout.tsx` with only HTML/body/fonts/CSS
- **Main site layout:** `src/app/(main)/layout.tsx` with all chrome (ads, footer, analytics)
- **Game shell:** `src/components/embed/EmbedGameShell.tsx` — reuses `useDomFreecellStore` and `DomBoard`
- **Generator:** `src/components/embed/EmbedGeneratorClient.tsx` — live preview + copy-to-clipboard

The embed is `noindex, nofollow` — it should not appear in search results.

## Out of Scope (Current MVP)

- Multi-game embed support (Spider, Klondike, etc.)
- WordPress plugin
- Ads inside embeds
- Advanced theming / custom colors
- Licensing terms beyond attribution
- Analytics endpoint for embed usage (embed traffic is currently only distinguishable by the absence of GA events)
- Embed usage tracking API

## Embed Code Example

```html
<iframe
  src="https://playfreecellonline.com/embed/freecell"
  width="800"
  height="600"
  frameborder="0"
  style="border:0;border-radius:8px;"
  allowfullscreen>
</iframe>
```

With referrer tracking:

```html
<iframe
  src="https://playfreecellonline.com/embed/freecell?ref=my-site"
  width="800"
  height="600"
  frameborder="0"
  style="border:0;border-radius:8px;"
  allowfullscreen>
</iframe>
```
