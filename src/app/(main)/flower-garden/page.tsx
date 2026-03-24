import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import FlowerGardenGamePage from "./FlowerGardenGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Flower Garden Solitaire | Play Online Free — Bouquet Reserve Card Game",
  description:
    "Play Flower Garden Solitaire online for free. A classic patience game with a 16-card bouquet reserve — every card available to play anytime. 6 columns, build down regardless of suit. No download required.",
  keywords: [
    "flower garden solitaire",
    "flower garden solitaire online",
    "flower garden card game",
    "flower garden patience",
    "play flower garden solitaire",
    "flower garden solitaire free",
    "bouquet solitaire",
    "the garden solitaire",
  ],
  openGraph: {
    title: "Flower Garden Solitaire | Play Online Free — Bouquet Reserve Card Game",
    description:
      "Play Flower Garden Solitaire online for free. 16-card bouquet reserve with every card available. Build down regardless of suit across 6 columns.",
    url: absoluteUrl("/flower-garden"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Flower Garden Solitaire?",
    answer:
      "Flower Garden Solitaire is a classic patience card game where 36 cards are dealt face-up into 6 columns of 6 (the 'garden'), and the remaining 16 cards form a reserve called the 'bouquet.' Every card in the bouquet is available to play at any time. Build tableau columns down regardless of suit, and build foundations up by suit from Ace to King.",
  },
  {
    question: "How does the bouquet work in Flower Garden?",
    answer:
      "The bouquet is a reserve of 16 cards, all fully visible and available to play at any time. You can move any bouquet card to a foundation (if it fits) or onto a tableau column (building down). The bouquet gives you tremendous flexibility — it's like having 16 free cells that start pre-loaded with cards.",
  },
  {
    question: "What is the win rate for Flower Garden Solitaire?",
    answer:
      "Flower Garden Solitaire has an estimated win rate of approximately 30-40% with skilled play. While the bouquet reserve provides significant flexibility, the restriction to single-card moves and the any-suit-descending building rule can make it tricky to untangle columns.",
  },
  {
    question: "Can I fill empty columns in Flower Garden?",
    answer:
      "Yes! Unlike many solitaire games, Flower Garden allows any card to fill an empty column — from either the tableau or the bouquet. This makes empty columns very valuable strategic tools.",
  },
  {
    question: "How is Flower Garden different from FreeCell?",
    answer:
      "Flower Garden has a 16-card bouquet reserve (vs 4 free cells), 6 tableau columns (vs 8), builds down regardless of suit (vs alternating color), and only allows single-card moves. The bouquet cards are all pre-dealt and visible, while FreeCell's free cells start empty and are filled during play.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flower Garden Solitaire",
    description:
      "Free online Flower Garden Solitaire. 16-card bouquet reserve with every card available. Build down regardless of suit across 6 tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/flower-garden"),
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
        name: "Flower Garden Solitaire",
        item: absoluteUrl("/flower-garden"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <FlowerGardenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Flower Garden Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Flower Garden Solitaire is a classic patience card game featuring a unique{" "}
          <strong>bouquet reserve</strong> of 16 cards — all available to play at any time.
          Deal 36 cards face-up into 6 columns of 6 (the &ldquo;garden&rdquo;), then use the
          bouquet to help build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Flower Garden Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards: 36 into 6 columns of 6 cards each (all face-up), and
          the remaining 16 into the bouquet reserve. Build tableau columns{" "}
          <strong>down regardless of suit</strong> — place a 5 on any 6. Only the top
          card of each column can be moved. Any bouquet card can be played to a
          foundation or onto a tableau column at any time. Empty columns can be filled
          by any card.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Bouquet Reserve
        </h3>
        <p className="mb-4 leading-relaxed">
          The bouquet is what makes Flower Garden unique. All 16 reserve cards are
          visible and available from the start. Think of them as pre-loaded free cells —
          you can play any bouquet card at any time, giving you tremendous flexibility
          to unblock tableau columns and build foundations. Managing the bouquet
          wisely is the key to winning.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/flower-garden/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Flower Garden Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bisley"
              className="text-[#D4AF37] hover:underline"
            >
              Play Bisley Solitaire
            </Link>{" "}
            — Dual-direction foundations meet in the middle
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Same-suit building with unlimited redeals
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic free cell solitaire
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
        <MoreGames currentSlug="flower-garden" />
      </article>
    </>
  );
}
