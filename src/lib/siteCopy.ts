/**
 * Per-site copy tokens for the Solitaire Stack network.
 *
 * This module centralises every brand-referring sentence that currently
 * renders identically across all four domains (solitairestack.com,
 * playfreecellonline.com, playklondikeonline.com,
 * playspidersolitaireonline.com). Pages should import `siteCopy` and bind
 * prose to these tokens so that each domain ships a distinct, site-specific
 * phrasing. That eliminates the "duplicate 4th spoke" signal Google was
 * picking up and unblocks AdSense approval for solitairestack.com.
 *
 * Add new tokens here as more shared prose is discovered during the
 * Phase 1 content refactor — keep the shape identical across all four
 * `SITE_COPY` entries so consumers can rely on every field being populated.
 */

import { siteConfig, type SiteKey } from './siteConfig';

export interface SiteCopy {
  /** Display name of the site's primary game, e.g. "FreeCell", "Klondike Solitaire". Hub uses the generic "solitaire games". */
  primaryGameName: string;
  /** Article to precede `primaryGameName` in running prose — "a" (spokes) or "the" (hub's generic phrasing). */
  primaryGameArticle: string;
  /** Possessive form of the site brand, e.g. "PlayFreeCellOnline.com's". Used in sentences like "{brandPossessive} strategy library". */
  brandPossessive: string;

  /** One-liner positioning tagline describing the hub/spoke role. Used in hero subheads and meta descriptions. */
  hubPositioning: string;
  /** Self-describing sentence (hub = "the solitaire hub"; spokes = "the {game} specialist"). Used in About/FAQ prose. */
  sitePositioning: string;
  /** Parameterised replacement for the old hardcoded "PlayFreeCellOnline.com offers both FreeCell and Spider…" sentence. Distinct per site. */
  otherGamesSentence: string;
  /** Network-role sentence — hub says "home of the Solitaire Stack network"; spokes say "part of the Solitaire Stack network". */
  networkDescription: string;

  /** Anchor/label for the recommended sister-site cross-link (the most relevant of the other 3 domains). */
  recommendedSisterSiteLabel: string;
  /** Absolute URL for the recommended sister-site cross-link. */
  recommendedSisterSiteUrl: string;

  /** Stock FAQ answer for "can I play other games here?" — hub lists availability; spokes point at sister sites. */
  crossGameAvailability: string;

  /** Publisher/brand name — duplicates `siteConfig.siteName` so consumers can pull copy tokens from a single import. */
  publisherName: string;
}

export const SITE_COPY: Record<SiteKey, SiteCopy> = {
  solitairestack: {
    primaryGameName: 'solitaire games',
    primaryGameArticle: 'the',
    brandPossessive: "SolitaireStack.com's",
    hubPositioning:
      'The hub where 26 solitaire variants live under one roof — clean rules, no downloads, no interruptions.',
    sitePositioning:
      "Solitaire Stack is the hub of our solitaire network. Whether you want the focused tactics of FreeCell or the lighter luck of Spider, you'll find them here with clean rules, no downloads, and no interruptions.",
    otherGamesSentence:
      'Solitaire Stack offers FreeCell, Spider, Klondike, and 23 more solitaire variants — all free, all in your browser, no downloads.',
    networkDescription: 'home of the Solitaire Stack network',
    recommendedSisterSiteLabel: 'Play FreeCell on the dedicated spoke at PlayFreeCellOnline.com',
    recommendedSisterSiteUrl: 'https://playfreecellonline.com',
    crossGameAvailability:
      'Yes. Solitaire Stack is a multi-game hub with 26 solitaire variants available, including FreeCell, Spider, Klondike, Pyramid, TriPeaks, and more — all free and playable in your browser.',
    publisherName: 'SolitaireStack.com',
  },
  playfreecellonline: {
    primaryGameName: 'FreeCell',
    primaryGameArticle: 'a',
    brandPossessive: "PlayFreeCellOnline.com's",
    hubPositioning:
      'The dedicated home for FreeCell Solitaire online — every Microsoft deal, supermoves, hints, and the deepest FreeCell strategy content on the web.',
    sitePositioning:
      'PlayFreeCellOnline.com is the dedicated home for FreeCell Solitaire online. Every Microsoft deal from #1 to #32,000, supermoves, hints, and the deepest FreeCell strategy content on the web.',
    otherGamesSentence:
      'PlayFreeCellOnline.com focuses on FreeCell, with Spider Solitaire available alongside. For Klondike, visit our sister site PlayKlondikeOnline.com.',
    networkDescription: 'part of the Solitaire Stack network',
    recommendedSisterSiteLabel: 'Play Klondike Solitaire at PlayKlondikeOnline.com',
    recommendedSisterSiteUrl: 'https://playklondikeonline.com',
    crossGameAvailability:
      'PlayFreeCellOnline.com focuses on FreeCell, with Spider Solitaire available as a secondary game. For Klondike, visit PlayKlondikeOnline.com; for the full 26-game catalogue, visit SolitaireStack.com.',
    publisherName: 'PlayFreeCellOnline.com',
  },
  playklondikeonline: {
    primaryGameName: 'Klondike Solitaire',
    primaryGameArticle: 'a',
    brandPossessive: "PlayKlondikeOnline.com's",
    hubPositioning:
      'The dedicated home for Klondike Solitaire — the classic card game most people just call Solitaire. Draw 1, Draw 3, Vegas scoring, and a full strategy library.',
    sitePositioning:
      'PlayKlondikeOnline.com focuses entirely on Klondike Solitaire — the classic card game most people just call Solitaire. Draw 1, Draw 3, Vegas scoring, and a full strategy library.',
    otherGamesSentence:
      'PlayKlondikeOnline.com is dedicated to Klondike Solitaire in all its variants. For FreeCell, visit PlayFreeCellOnline.com; for Spider, PlaySpiderSolitaireOnline.com.',
    networkDescription: 'part of the Solitaire Stack network',
    recommendedSisterSiteLabel: 'Play FreeCell at PlayFreeCellOnline.com',
    recommendedSisterSiteUrl: 'https://playfreecellonline.com',
    crossGameAvailability:
      'PlayKlondikeOnline.com is dedicated to Klondike Solitaire (Draw 1, Draw 3, Vegas scoring). For FreeCell visit PlayFreeCellOnline.com, for Spider visit PlaySpiderSolitaireOnline.com, or browse all 26 variants on SolitaireStack.com.',
    publisherName: 'PlayKlondikeOnline.com',
  },
  playspidersolitaireonline: {
    primaryGameName: 'Spider Solitaire',
    primaryGameArticle: 'a',
    brandPossessive: "PlaySpiderSolitaireOnline.com's",
    hubPositioning:
      'The specialist site for Spider Solitaire — 1-suit, 2-suit, and 4-suit play with in-depth column tactics and winnability research.',
    sitePositioning:
      'PlaySpiderSolitaireOnline.com is the specialist site for Spider Solitaire. 1-suit, 2-suit, and 4-suit play with in-depth column tactics and winnability research.',
    otherGamesSentence:
      'PlaySpiderSolitaireOnline.com is the specialist Spider site. For FreeCell, visit PlayFreeCellOnline.com; for Klondike, PlayKlondikeOnline.com.',
    networkDescription: 'part of the Solitaire Stack network',
    recommendedSisterSiteLabel: 'Play FreeCell at PlayFreeCellOnline.com',
    recommendedSisterSiteUrl: 'https://playfreecellonline.com',
    crossGameAvailability:
      'PlaySpiderSolitaireOnline.com is dedicated to Spider Solitaire (1-suit, 2-suit, and 4-suit). For FreeCell visit PlayFreeCellOnline.com, for Klondike visit PlayKlondikeOnline.com, or browse all 26 variants on SolitaireStack.com.',
    publisherName: 'PlaySpiderSolitaireOnline.com',
  },
};

export const siteCopy: SiteCopy = SITE_COPY[siteConfig.key];
