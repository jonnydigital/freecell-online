import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BeleagueredCastleGamePage from "./BeleagueredCastleGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Beleaguered Castle Solitaire | Play Online Free — Zero Free Cells",
  description:
    "Play Beleaguered Castle solitaire online for free. A challenging FreeCell variant with zero free cells — aces start on foundations, 48 cards in 8 cascades. Build up by suit from Ace to King. No download required.",
  keywords: [
    "beleaguered castle",
    "beleaguered castle solitaire",
    "beleaguered castle online",
    "beleaguered castle card game",
    "beleaguered castle free",
    "play beleaguered castle",
    "beleaguered castle solitaire no download",
    "zero free cells solitaire",
  ],
  openGraph: {
    title: "Beleaguered Castle Solitaire | Play Online Free — Zero Free Cells",
    description:
      "Play Beleaguered Castle online for free. Zero free cells, aces pre-placed on foundations, build up by suit. One of the most challenging solitaire variants.",
    url: absoluteUrl("/beleaguered-castle"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Beleaguered Castle solitaire?",
    answer:
      "Beleaguered Castle is a challenging single-deck solitaire game where all four aces are pre-placed on foundations. The remaining 48 cards are dealt face-up into 8 cascades of 6 cards each. With zero free cells, you must build foundations from Ace to King by suit using only single-card moves and descending-rank tableau stacking.",
  },
  {
    question: "How is Beleaguered Castle different from FreeCell?",
    answer:
      "The biggest difference is that Beleaguered Castle has zero free cells — no temporary storage at all. Aces start on the foundations instead of being dealt into cascades. Tableau stacking is by descending rank regardless of suit (not alternating colors), and any card can fill an empty column (not just Kings). This makes it significantly harder than FreeCell.",
  },
  {
    question: "What is the win rate for Beleaguered Castle?",
    answer:
      "Beleaguered Castle has an estimated win rate of approximately 25% with expert play. The lack of free cells makes many deals unsolvable, making it one of the most challenging solitaire variants. Careful planning and empty column management are essential.",
  },
  {
    question: "Can any card fill an empty column in Beleaguered Castle?",
    answer:
      "Yes. Unlike FreeCell or Seahaven Towers where empty columns are restricted to Kings, Beleaguered Castle allows any card to be placed in an empty tableau column. This is critical for maneuverability since there are no free cells.",
  },
  {
    question: "Why are the aces pre-placed on foundations?",
    answer:
      "In Beleaguered Castle, all four aces are removed from the deck before dealing and placed directly on the four foundation piles. This gives you a head start on building foundations and compensates slightly for the lack of free cells. The remaining 48 cards are dealt evenly into 8 columns of 6.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Beleaguered Castle Solitaire",
    description:
      "Free online Beleaguered Castle Solitaire. Zero free cells, aces pre-placed on foundations, build up by suit from Ace to King.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/beleaguered-castle"),
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
        name: "Beleaguered Castle",
        item: absoluteUrl("/beleaguered-castle"),
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
      <BeleagueredCastleGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Beleaguered Castle Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Beleaguered Castle is one of the most challenging solitaire variants in the{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          family. With <strong>zero free cells</strong> and all cards dealt face-up,
          every move must be precisely calculated. The four aces start pre-placed on
          foundations, giving you a head start on the build-up, but the lack of temporary
          storage makes this a true test of strategic thinking.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Beleaguered Castle Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four foundation piles. Deal the
          remaining 48 cards face-up into 8 cascades of 6 cards each. Build foundations
          up by suit from Ace to King. Stack tableau cards in{" "}
          <strong>descending rank regardless of suit</strong> — place any 7 on any 8.
          Only single cards can be moved, and any card can fill an empty column.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Zero Free Cell Challenge
        </h3>
        <p className="mb-4 leading-relaxed">
          Without free cells, Beleaguered Castle demands masterful use of empty
          columns as your only form of temporary storage. Creating and preserving
          empty columns is the key strategic skill. The ~25% win rate reflects the
          brutal difficulty — many deals are mathematically unsolvable, making each
          victory deeply satisfying.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/beleaguered-castle/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Beleaguered Castle
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/seahaven"
              className="text-[#D4AF37] hover:underline"
            >
              Play Seahaven Towers
            </Link>{" "}
            — Same-suit stacking with 4 free cells
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
        <MoreGames currentSlug="beleaguered-castle" />
      </article>
    </>
  );
}
