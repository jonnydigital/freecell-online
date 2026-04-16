// Hub homepage content shared between the server page (for JSON-LD prerender)
// and the client SolitaireHubHome component (for rendering).
//
// Why this lives in its own module: `SolitaireHubHome.tsx` is a `'use client'`
// component. Next 16 / Turbopack treats any named export from a `'use client'`
// module as a client reference proxy when imported by a server component,
// which makes `.map()` fail at SSR prerender time with
// `TypeError: e.featuredGames.map is not a function`. Hoisting the data into
// a plain module lets both sides import the real arrays.

import { siteConfig } from '@/lib/siteConfig';

export interface FeaturedGame {
  href: string;
  label: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const featuredGames: FeaturedGame[] = [
  {
    href: '/freecell',
    label: 'FreeCell',
    description: 'All 52 cards visible from the start. Pure skill, numbered deals, hints, undo, and full stat tracking.',
  },
  {
    href: '/spider',
    label: 'Spider Solitaire',
    description: 'Choose 1-suit, 2-suit, or 4-suit difficulty. Two decks, ten columns, and a deeper challenge curve.',
  },
  {
    href: '/bakers-game',
    label: "Baker's Game",
    description: "FreeCell's stricter ancestor. Build tableau columns by suit instead of alternating colors.",
  },
  {
    href: '/eight-off',
    label: 'Eight Off',
    description: 'Eight reserve cells instead of four. More storage, different tactics, same open-information style.',
  },
  {
    href: '/easy-freecell',
    label: 'Easy FreeCell',
    description: 'Aces and 2s start on the foundations. A gentler on-ramp for beginners learning FreeCell strategy.',
  },
];

export const faqItems: FaqItem[] = [
  {
    q: `What’s the difference between ${siteConfig.brandName} and a single-game solitaire site?`,
    a: `Most solitaire sites pick one game — usually Klondike or FreeCell — and wrap it in a wall of ads. We take a wider view. ${siteConfig.brandName} treats solitaire as a family of related puzzles, and we cover 26 variants with the same editorial depth: canonical rules, researched win rates, strategy guides written by players who actually solve the games, and honest difficulty ratings. If you only ever want to play Klondike, a single-game site is fine. If you want to understand the whole tradition, compare variants, or explore beyond the two or three games Windows shipped with, this is where we live.`,
  },
  {
    q: 'How do you pick which solitaire games to include?',
    a: `We start with every variant that appears in Parlett’s Oxford History of Card Games, Morehead and Mott-Smith’s Complete Book of Solitaire, and the Microsoft Solitaire Collection. From that long list we keep the games that still have players in 2026 — measured by search volume, community activity, and whether the rules produce interesting decisions. A game has to teach a skill that another game in the catalog does not already teach. That filter removed about a dozen near-duplicates and left us with the 26 distinct variants on the site.`,
  },
  {
    q: 'Do your win rates come from real data?',
    a: `Where rigorous data exists — FreeCell, Klondike, a few others — we cite the primary source and reproduce the number with our own simulations. Where rigorous data does not exist, we label the figure as an estimate and show the range. Our Research Desk publishes methodology notes on every number, and we correct in public when we are wrong. We would rather publish an honest estimate with bounds than a confident-sounding number we cannot defend.`,
  },
  {
    q: `I’m brand new to solitaire — where should I start?`,
    a: `Start with Klondike Draw 1. It is the game most people mean when they say "Solitaire," the rules are the most widely known, and the tutorial materials are the deepest on the open web. Once you win a few deals, try FreeCell — all cards are visible, so you can see why your plan worked or failed. Skip 4-suit Spider and Forty Thieves until you have 50 games under your belt. We keep a full skill ladder on this page.`,
  },
  {
    q: 'Are these the same games I played on Windows?',
    a: `For FreeCell, Spider, and Klondike: yes. We use the Microsoft deal numbering so deal #1 here is deal #1 in the 1995 Windows FreeCell client, and we match the Microsoft rule decisions (unlimited undo, auto-move to foundations, Draw 1 and Draw 3 variants). For games Windows never shipped — Yukon, Canfield, Forty Thieves, La Belle Lucie — we follow the canonical rules documented in Parlett and Morehead, with our Rules Desk flagging any place where implementations differ in the wild.`,
  },
  {
    q: `Why do you publish strategy content — doesn’t that spoil the game?`,
    a: `We think the opposite. Solitaire is more interesting when you know what you are doing. A player who understands column management in FreeCell or stock cycling in Klondike gets to make real decisions; a player without those concepts is guessing. Our strategy content is optional and sits on separate pages, so you can ignore it entirely. But if you want to move from a 30-percent win rate to 80, we would rather teach you than watch you grind.`,
  },
  {
    q: 'Can I trust your rules? Different sites have different rules.',
    a: `Our Rules Desk documents the canonical rule set for every variant and notes where implementations disagree. When the historical sources conflict — and they often do for older games like Canfield or Baker’s Dozen — we pick the most commonly used modern ruleset, explain why, and list the alternatives. Every rules page on the site is checked against the game that actually runs in the browser, so what you read matches what you play.`,
  },
  {
    q: 'What is the point of playing so many variants?',
    a: `Each variant tests a different cognitive skill. FreeCell is about full-information sequencing. Spider is about suit management across a crowded board. Pyramid is about pattern recognition under time-like pressure. Forty Thieves is about patience and risk assessment. Playing variety keeps you sharper than grinding one game forever, and it gives you a deeper appreciation for how solitaire designers have kept 52 cards interesting for 250 years.`,
  },
];
