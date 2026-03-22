import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import SeahavenGamePage from "./SeahavenGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Seahaven Towers Solitaire | Play Online Free — Strategic Card Game",
  description:
    "Play Seahaven Towers online for free. Build same-suit sequences from Ace to King using 10 tableau columns and 4 free cells. Single-card moves, Kings-only empty columns. No download required.",
  keywords: [
    "seahaven towers",
    "seahaven towers solitaire",
    "seahaven towers online",
    "seahaven towers card game",
    "seahaven towers free",
    "play seahaven towers",
    "seahaven solitaire no download",
  ],
  openGraph: {
    title: "Seahaven Towers Solitaire | Play Online Free — Strategic Card Game",
    description:
      "Play Seahaven Towers online for free. Build same-suit foundations from Ace to King. 10 columns, 4 free cells. No download required.",
    url: absoluteUrl("/seahaven"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Seahaven Towers?",
    answer:
      "Seahaven Towers is a strategic single-deck solitaire game played with 10 tableau columns of 5 cards each (50 cards face-up) plus 4 free cells, 2 of which start occupied by the remaining cards. The goal is to build four foundation piles from Ace to King by suit. Only single cards can be moved, and empty columns can only be filled with Kings.",
  },
  {
    question: "How is Seahaven Towers different from FreeCell?",
    answer:
      "While both games use free cells and foundations, Seahaven Towers requires same-suit descending stacking (not alternating colors), has 10 columns instead of 8, only allows single-card moves (no supermoves), and restricts empty columns to Kings only. It starts with 2 of 4 free cells already occupied, making the opening more constrained.",
  },
  {
    question: "What is the win rate for Seahaven Towers?",
    answer:
      "Seahaven Towers has an estimated win rate of around 85-90% with expert play. The combination of 4 free cells and 10 columns provides significant maneuverability, but the same-suit stacking and Kings-only empty column rules create challenging decision points.",
  },
  {
    question: "Can you move groups of cards in Seahaven Towers?",
    answer:
      "No. Seahaven Towers only allows single-card moves — you cannot move sequences or groups of cards at once. This is a key difference from FreeCell, which allows supermoves (moving multiple cards using empty cells and columns as intermediate storage). Every move in Seahaven must be planned one card at a time.",
  },
  {
    question: "What can fill an empty column in Seahaven Towers?",
    answer:
      "Only Kings can be placed in empty tableau columns. This restriction makes empty columns both powerful and precious — you need to plan carefully before creating them and ensure you have a King ready to take advantage of the space.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Seahaven Towers Solitaire",
    description:
      "Free online Seahaven Towers Solitaire. Build same-suit foundations from Ace to King using 10 columns and 4 free cells.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/seahaven"),
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
        name: "Seahaven Towers",
        item: absoluteUrl("/seahaven"),
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
      <SeahavenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Seahaven Towers Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Seahaven Towers is a strategic single-deck solitaire game that blends the
          free cell mechanics of{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          with the same-suit building of{" "}
          <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Game
          </Link>
          . With 10 columns, 4 free cells, and single-card moves only, it demands
          precise planning and careful use of temporary storage.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Seahaven Towers Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 50 cards face-up across 10 columns of 5. The remaining 2 cards go
          to the first two of four free cells. Build four foundation piles from
          Ace to King, one per suit. Tableau stacking is{" "}
          <strong>same-suit descending</strong> — place a 9 of Hearts on a 10 of
          Hearts. Only single cards can be moved, and empty columns accept{" "}
          <strong>Kings only</strong>.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          Seahaven Towers sits at a unique intersection: it has the temporary
          storage of FreeCell but the strict same-suit requirement of Baker&apos;s Game.
          The single-card-only rule means you must manually orchestrate every
          step of a multi-card sequence transfer, making each free cell and empty
          column critically important. The 10-column layout gives you more room
          to maneuver than FreeCell&apos;s 8 columns, but 2 pre-occupied free cells
          tighten the opening.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/seahaven/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Seahaven Towers
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bakers-game"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&apos;s Game
            </Link>{" "}
            — Same-suit stacking with FreeCell layout
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
        <MoreGames currentSlug="seahaven" />
      </article>
    </>
  );
}
