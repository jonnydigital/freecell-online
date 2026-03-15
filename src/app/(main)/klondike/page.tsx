import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import KlondikeGamePage from "./KlondikeGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
  description:
    "Play Klondike Solitaire online for free. The classic card game everyone calls Solitaire. Choose Draw 1 or Draw 3 mode. Undo, hints, and statistics. No download required.",
  keywords: [
    "klondike solitaire",
    "klondike solitaire online",
    "play klondike solitaire",
    "free klondike solitaire",
    "solitaire online",
    "play solitaire",
    "klondike draw 1",
    "klondike draw 3",
    "classic solitaire",
    "patience card game",
  ],
  openGraph: {
    title: "Klondike Solitaire | Play Online Free — Draw 1 & Draw 3",
    description:
      "Play Klondike Solitaire online for free. The classic card game with Draw 1 and Draw 3 modes. No download required.",
    url: absoluteUrl("/klondike"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Klondike Solitaire",
    description:
      "Free online Klondike Solitaire with Draw 1 and Draw 3 modes. The classic patience card game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/klondike"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <KlondikeGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Klondike Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Klondike is the card game most people simply call &quot;Solitaire.&quot;
          Originally popularized during the Klondike Gold Rush and later made
          famous by Microsoft Windows, it remains the most-played solitaire
          variant in the world. Deal seven tableau columns, build four
          foundation piles from Ace to King, and try to clear the board.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Klondike Works
        </h3>
        <p className="mb-4 leading-relaxed">
          A single 52-card deck is dealt into seven columns. Column 1 gets 1
          card, column 2 gets 2, and so on up to 7 cards in column 7. Only the
          top card of each column is face-up; the rest are hidden. The remaining
          24 cards form the stock pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Build tableau columns in descending order with alternating colors — a
          red 6 on a black 7, a black Queen on a red King. Move Aces to the
          foundations and build up by suit to King. Only Kings can fill empty
          columns. Draw from the stock when you need more options.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Draw 1 vs Draw 3
        </h3>
        <p className="mb-4 leading-relaxed">
          In <strong className="text-white/90">Draw 1</strong> mode, you flip
          one card at a time from the stock — easier and great for beginners.
          In <strong className="text-white/90">Draw 3</strong> mode, you flip
          three cards but can only play the top one — significantly harder and
          the traditional competitive variant. Use the toggle above the game
          to switch between modes.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Klondike vs FreeCell
        </h3>
        <p className="mb-4 leading-relaxed">
          The biggest difference is information. In{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , every card is visible from the start — it&apos;s a pure logic
          puzzle where 99.999% of deals are solvable. In Klondike, 21 cards
          start face-down, so luck plays a larger role. Many Klondike deals
          are genuinely unwinnable regardless of play. For a detailed comparison,
          see our{" "}
          <Link
            href="/freecell-vs-klondike"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Klondike
          </Link>{" "}
          guide.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/klondike/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Klondike Solitaire
            </Link>{" "}
            — Complete rules and setup guide
          </li>
          <li>
            <Link
              href="/klondike/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike Strategy Guide
            </Link>{" "}
            — Tips to win more games
          </li>
          <li>
            <Link
              href="/klondike/faq"
              className="text-[#D4AF37] hover:underline"
            >
              Klondike FAQ
            </Link>{" "}
            — Common questions answered
          </li>
          <li>
            <Link
              href="/freecell-vs-klondike"
              className="text-[#D4AF37] hover:underline"
            >
              FreeCell vs Klondike
            </Link>{" "}
            — Head-to-head comparison
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another classic solitaire variant
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="klondike" />
      </article>
    </>
  );
}
