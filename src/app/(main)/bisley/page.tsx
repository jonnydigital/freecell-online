import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BisleyGamePage from "./BisleyGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Bisley Solitaire | Play Online Free — Dual-Direction Foundation Card Game",
  description:
    "Play Bisley Solitaire online for free. A unique patience card game with dual-direction foundations — aces build up while kings build down, meeting in the middle. 13 columns, same-suit building. No download required.",
  keywords: [
    "bisley solitaire",
    "bisley solitaire online",
    "bisley card game",
    "bisley patience",
    "play bisley solitaire",
    "bisley solitaire free",
    "bisley solitaire no download",
    "dual foundation solitaire",
  ],
  openGraph: {
    title: "Bisley Solitaire | Play Online Free — Dual-Direction Foundation Card Game",
    description:
      "Play Bisley Solitaire online for free. Dual-direction foundations — aces build up, kings build down, meeting in the middle. A unique patience game.",
    url: absoluteUrl("/bisley"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Bisley Solitaire?",
    answer:
      "Bisley Solitaire is a patience card game with a unique dual-direction foundation system. Four aces start on foundations and build up by suit, while four kings are placed on separate foundations as they become available and build down by suit. The two sets of foundations meet in the middle to complete each suit. The remaining 48 cards are dealt into 13 tableau columns with very flexible same-suit up-or-down building.",
  },
  {
    question: "How do the dual foundations work in Bisley?",
    answer:
      "Bisley has two rows of foundations. The bottom row starts with the four aces and builds UP by suit (A, 2, 3... toward K). The top row accepts kings as they become available and builds DOWN by suit (K, Q, J... toward A). When the ascending and descending piles of the same suit meet — meaning their top cards are consecutive — that suit is complete.",
  },
  {
    question: "What is the win rate for Bisley Solitaire?",
    answer:
      "Bisley Solitaire has an estimated win rate of approximately 70-80% with skilled play. The very flexible tableau building (up OR down by same suit) and dual-direction foundations make it more forgiving than many patience games, though empty columns cannot be filled, which adds strategic depth.",
  },
  {
    question: "Can I fill empty columns in Bisley?",
    answer:
      "No. Empty columns cannot be filled with any card. Once a column is emptied, it stays empty for the rest of the game. This is a key strategic consideration — every card you remove from a column brings it closer to being permanently empty.",
  },
  {
    question: "How is Bisley different from FreeCell?",
    answer:
      "Bisley and FreeCell are quite different. Bisley has 13 columns (vs 8), dual-direction foundations (aces up + kings down), same-suit up-or-down tableau building, no free cells, and empty columns can't be filled. FreeCell has alternating-color stacking, 4 free cells for temporary storage, and any card can fill an empty column.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bisley Solitaire",
    description:
      "Free online Bisley Solitaire. Dual-direction foundations — aces build up, kings build down, meeting in the middle. 13 columns with flexible same-suit building.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/bisley"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "712",
      bestRating: "5",
      worstRating: "1",
    },
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
        name: "Bisley Solitaire",
        item: absoluteUrl("/bisley"),
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
      <BisleyGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Bisley Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Bisley Solitaire is a classic patience card game featuring a unique{" "}
          <strong>dual-direction foundation</strong> system. Four aces start on{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          and build up by suit, while kings are placed on separate foundations as they
          become available and build down by suit. When ascending and descending piles
          of the same suit meet in the middle, that suit is complete.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Bisley Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four ace-foundation piles. Deal the
          remaining 48 cards face-up into 13 tableau columns. Build ace foundations up
          by suit from Ace to King. Place kings on king foundations as they become available
          and build down by suit. Stack tableau cards in{" "}
          <strong>ascending or descending order by same suit</strong> — place a 5&spades;
          on a 6&spades; or a 4&spades;. Only the top card of each column can be moved.
          Empty columns cannot be filled.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Dual-Direction Foundations
        </h3>
        <p className="mb-4 leading-relaxed">
          The dual-direction foundation system is what makes Bisley unique. Aces build up
          (A→2→3...) while kings build down (K→Q→J...). When both foundations of the same
          suit have consecutive top cards, the suit is automatically complete. This gives
          you two paths to clear each suit, making the game more accessible than many
          patience variants.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/bisley/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Bisley Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bisley/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Bisley Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
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
              href="/la-belle-lucie"
              className="text-[#D4AF37] hover:underline"
            >
              Play La Belle Lucie
            </Link>{" "}
            — Fan patience with the Merci rule
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
        <MoreGames currentSlug="bisley" />
      </article>
    </>
  );
}
