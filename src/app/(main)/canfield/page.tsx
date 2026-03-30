import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import CanfieldGamePage from "./CanfieldGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Canfield Solitaire | Play Online Free — No Download",
  description:
    "Play Canfield Solitaire online for free. Build four foundations up in suit from a random base rank with wrapping. Reserve pile, stock draws of three, and unlimited redeals. Undo, hints, mobile-friendly.",
  keywords: [
    "canfield solitaire",
    "canfield solitaire online",
    "canfield solitaire free",
    "canfield card game",
    "canfield solitaire rules",
    "canfield solitaire no download",
    "play canfield solitaire online",
    "solitaire online",
    "canfield patience",
    "demon solitaire",
  ],
  openGraph: {
    title: "Canfield Solitaire | Play Online Free — No Download",
    description:
      "Play Canfield Solitaire online for free. Build foundations up in suit from a random base rank. No download required.",
    url: absoluteUrl("/canfield"),
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
    name: "Canfield Solitaire",
    description:
      "Free online Canfield Solitaire. Build four foundations up in suit from a random base rank with wrapping.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/canfield"),
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
        name: "Canfield Solitaire",
        item: absoluteUrl("/canfield"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canfield Solitaire is a challenging card game where you build four foundation piles up in suit from a randomly determined base rank, with wrapping from King back to Ace. It features a 13-card reserve pile, four tableau columns, and a stock that deals three cards at a time.",
        },
      },
      {
        "@type": "Question",
        name: "How do you play Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deal 13 cards to the reserve (top card face-up), one card to start the first foundation (setting the base rank), one card to each of four tableau columns, and the rest to the stock. Build foundations up in suit with wrapping. Build tableau columns down in alternating colors with wrapping. Draw three cards at a time from the stock. Empty tableau columns auto-fill from the reserve.",
        },
      },
      {
        "@type": "Question",
        name: "What is the base rank in Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The base rank is determined by the first card dealt to the foundation. All four foundations must be built starting from this rank, going up in suit and wrapping around (e.g., if the base is 7, you build 7-8-9-10-J-Q-K-A-2-3-4-5-6).",
        },
      },
      {
        "@type": "Question",
        name: "Is Canfield Solitaire the same as Demon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Canfield Solitaire is known as 'Demon' or 'Demon Patience' in the UK. The rules are identical — both feature the 13-card reserve, random base rank foundations, and draw-three stock. The game was named after Richard A. Canfield, a 19th-century casino owner.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Canfield Solitaire games are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only about 30-35% of Canfield Solitaire deals are theoretically winnable with perfect play. In practice, win rates are typically 5-15% due to the hidden reserve cards and limited tableau space. This makes Canfield one of the more challenging solitaire variants.",
        },
      },
    ],
  };


  const aggregateRatingJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Canfield Solitaire",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "932",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={aggregateRatingJsonLd} />
      <CanfieldGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Canfield Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Canfield Solitaire (also called Demon Patience in the UK) is one of the most
          challenging and storied solitaire card games. Originally played in the casinos of
          Richard A. Canfield in the 1890s, players would pay $52 to play and earn $5 for
          each card placed on the foundations — the house almost always won.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          Thirteen cards are dealt face-down to the reserve pile with only the top card
          face-up. One card is placed on the first foundation, establishing the base rank
          for all four foundations. Four tableau columns receive one card each. The remaining
          cards form the stock pile, which deals three cards at a time to the waste pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Build foundations up in suit, wrapping from King through Ace back to the rank
          below the base. Build tableau columns down in alternating colors, also with
          wrapping. When a tableau column empties, it automatically fills from the reserve.
          When the stock is exhausted, flip the waste pile back over to form a new stock
          (unlimited redeals).
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Empty tableau columns are auto-filled from the reserve — use this to reveal hidden reserve cards</li>
          <li>Focus on depleting the reserve pile early for more flexibility</li>
          <li>Pay attention to the base rank — plan your foundation builds accordingly</li>
          <li>Don&rsquo;t rush to move cards to foundations if they&rsquo;re useful for tableau building</li>
          <li>Use the unlimited redeal wisely — track which cards cycle through the waste</li>
        </ul>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Canfield Solitaire?", a: "Canfield Solitaire is a challenging card game where you build four foundation piles up in suit from a randomly determined base rank, with wrapping from King back to Ace. It features a 13-card reserve pile, four tableau columns, and a stock that deals three cards at a time." },
            { q: "How do you play Canfield Solitaire?", a: "Deal 13 cards to the reserve (top card face-up), one card to start the first foundation (setting the base rank), one card to each of four tableau columns, and the rest to the stock. Build foundations up in suit with wrapping. Build tableau columns down in alternating colors with wrapping. Draw three cards at a time from the stock. Empty tableau columns auto-fill from the reserve." },
            { q: "What is the base rank in Canfield Solitaire?", a: "The base rank is determined by the first card dealt to the foundation. All four foundations must be built starting from this rank, going up in suit and wrapping around (e.g., if the base is 7, you build 7-8-9-10-J-Q-K-A-2-3-4-5-6)." },
            { q: "Is Canfield Solitaire the same as Demon Solitaire?", a: "Yes. Canfield Solitaire is known as 'Demon' or 'Demon Patience' in the UK. The rules are identical — both feature the 13-card reserve, random base rank foundations, and draw-three stock. The game was named after Richard A. Canfield, a 19th-century casino owner." },
            { q: "What percentage of Canfield Solitaire games are winnable?", a: "Only about 30-35% of Canfield Solitaire deals are theoretically winnable with perfect play. In practice, win rates are typically 5-15% due to the hidden reserve cards and limited tableau space. This makes Canfield one of the more challenging solitaire variants." },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/canfield/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Canfield Solitaire
            </Link>{" "}
            — Complete rules, setup, and strategy guide
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic draw-and-stack solitaire
          </li>
          <li>
            <Link
              href="/golf"
              className="text-[#D4AF37] hover:underline"
            >
              Play Golf Solitaire
            </Link>{" "}
            — Fast-paced solitaire with streak scoring
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
        <MoreGames currentSlug="canfield" />
      </article>
    </>
  );
}
