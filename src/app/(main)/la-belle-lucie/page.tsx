import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import LaBelleLucieGamePage from "./LaBelleLucieGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "La Belle Lucie Solitaire | Play Online Free — The Fan Card Game",
  description:
    "Play La Belle Lucie Solitaire (The Fan) online for free. 18 fans, same-suit building, 2 redeals with shuffle, and a special Merci rule. No download required.",
  keywords: [
    "la belle lucie solitaire",
    "la belle lucie online",
    "the fan solitaire",
    "la belle lucie card game",
    "play la belle lucie",
    "la belle lucie free",
    "fan solitaire",
    "merci rule solitaire",
  ],
  openGraph: {
    title: "La Belle Lucie Solitaire | Play Online Free — The Fan Card Game",
    description:
      "Play La Belle Lucie Solitaire online for free. 18 fans of cards, same-suit building, shuffled redeals, and the Merci rule.",
    url: absoluteUrl("/la-belle-lucie"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is La Belle Lucie Solitaire?",
    answer:
      "La Belle Lucie (also called The Fan) is a patience card game where 52 cards are dealt face-up into 17 fans of 3 cards plus 1 fan of 1 card. Build four foundations up by suit from Ace to King. Stack tableau cards in descending order by same suit. Only the top card of each fan can be moved, and empty fans cannot be filled.",
  },
  {
    question: "How many redeals are allowed in La Belle Lucie?",
    answer:
      "You are allowed up to 2 redeals in La Belle Lucie. When you redeal, all remaining tableau cards are gathered, shuffled, and re-dealt into fans of 3. After the second redeal (third deal), the special Merci rule becomes available.",
  },
  {
    question: "What is the Merci rule?",
    answer:
      "The Merci rule is a special privilege available after the final redeal (third deal). It allows you to draw one buried card from any fan and play it directly to a valid destination. This can be a game-saver when a critical card is trapped beneath others.",
  },
  {
    question: "What is the win rate for La Belle Lucie?",
    answer:
      "La Belle Lucie has an estimated win rate of approximately 15-20% with skilled play. The combination of same-suit building, limited redeals, and the inability to fill empty fans makes it one of the more challenging single-deck patience games.",
  },
  {
    question: "How is La Belle Lucie different from Cruel Solitaire?",
    answer:
      "Both games use same-suit tableau building, but they differ in several ways: La Belle Lucie deals into fans of 3 (vs Cruel's piles of 4), La Belle Lucie allows only 2 redeals with shuffling (vs Cruel's unlimited redeals without shuffling), and La Belle Lucie has the unique Merci rule. Cruel also pre-places aces on foundations while La Belle Lucie includes them in the deal.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "La Belle Lucie Solitaire",
    description:
      "Free online La Belle Lucie Solitaire (The Fan). 18 fans, same-suit building, shuffled redeals, and the Merci rule.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/la-belle-lucie"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "743",
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
        name: "La Belle Lucie Solitaire",
        item: absoluteUrl("/la-belle-lucie"),
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
      <LaBelleLucieGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          La Belle Lucie Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          La Belle Lucie (also known as <strong>The Fan</strong>) is one of the
          most elegant patience card games. All 52 cards are dealt face-up into
          18 fans — 17 fans of 3 cards and 1 fan of 1 card. Build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King, stacking tableau cards in descending
          same-suit order. With only 2 shuffled redeals and the special{" "}
          <strong>Merci rule</strong>, every move demands careful planning.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How La Belle Lucie Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up into 18 fans. Only the top card of each fan
          can be moved. Stack on the tableau in <strong>descending same-suit
          order</strong> — place a 5&spades; on a 6&spades;. Empty fans cannot
          be filled. When stuck, use one of your 2 redeals to gather, shuffle,
          and re-deal all remaining tableau cards into fresh fans of 3. After the
          final redeal, the <strong>Merci</strong> lets you rescue one buried card.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Merci Rule
        </h3>
        <p className="mb-4 leading-relaxed">
          After using both redeals (on the third deal), you gain a one-time
          privilege: draw any single buried card from any fan and play it to a
          valid destination. This powerful move can rescue a trapped Ace or
          unblock a critical sequence. Use it wisely — you only get one Merci
          per game.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/la-belle-lucie/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play La Belle Lucie
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/la-belle-lucie/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              La Belle Lucie Strategy Guide
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
            — Another same-suit building game with redeals
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
        <MoreGames currentSlug="la-belle-lucie" />
      </article>
    </>
  );
}
