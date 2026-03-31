import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import CruelGamePage from "./CruelGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Cruel Solitaire | Play Online Free — Redeal Patience Card Game",
  description:
    "Play Cruel Solitaire online for free. A patience card game with 12 piles, same-suit building, and a unique redeal mechanic. Aces start on foundations, build up by suit. No download required.",
  keywords: [
    "cruel solitaire",
    "cruel solitaire online",
    "cruel card game",
    "cruel patience",
    "play cruel solitaire",
    "cruel solitaire free",
    "cruel solitaire no download",
    "redeal solitaire",
  ],
  openGraph: {
    title: "Cruel Solitaire | Play Online Free — Redeal Patience Card Game",
    description:
      "Play Cruel Solitaire online for free. 12 piles, same-suit building, and unlimited redeals. A classic patience game.",
    url: absoluteUrl("/cruel"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Cruel Solitaire?",
    answer:
      "Cruel Solitaire is a patience card game where 48 cards are dealt face-up into 12 piles of 4 cards each. The four aces start on foundations. Build foundations up by suit from Ace to King. Stack tableau cards in descending order by same suit. The unique redeal mechanic gathers all tableau cards and re-deals them in groups of 4 without shuffling.",
  },
  {
    question: "How does the redeal work in Cruel Solitaire?",
    answer:
      "When you click the redeal button, all tableau cards are gathered from right to left (top card first from each pile), then re-dealt into groups of 4 without shuffling. The order of cards is preserved — they are just regrouped. You can redeal unlimited times. Strategic use of redeals is key to winning.",
  },
  {
    question: "What is the win rate for Cruel Solitaire?",
    answer:
      "Cruel Solitaire has an estimated win rate of approximately 25-30% with skilled play. The same-suit building requirement and inability to fill empty piles make it challenging, but the unlimited redeal mechanic provides opportunities to unblock stuck positions.",
  },
  {
    question: "Can I fill empty piles in Cruel Solitaire?",
    answer:
      "No. Empty piles cannot be filled with any card. Once a pile is emptied, it stays empty until the next redeal, which will redistribute cards into groups of 4. This is a key strategic consideration — emptying piles permanently removes storage space until you redeal.",
  },
  {
    question: "How is Cruel different from Perseverance Solitaire?",
    answer:
      "Cruel and Perseverance are very similar games. The main difference is that Perseverance typically allows building in alternating colors on the tableau, while Cruel requires same-suit building. Some versions of Perseverance also limit the number of redeals, while Cruel allows unlimited redeals.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cruel Solitaire",
    description:
      "Free online Cruel Solitaire. 12 piles, same-suit building, aces pre-placed on foundations, and unlimited redeals.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/cruel"),
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
        name: "Cruel Solitaire",
        item: absoluteUrl("/cruel"),
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


  const aggregateRatingJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cruel Solitaire",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "819",
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
      <CruelGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Cruel Solitaire
        </h1>

        <p className="mb-4 leading-relaxed">
          Cruel Solitaire is a classic patience card game that combines strategic
          same-suit building with a unique <strong>redeal mechanic</strong>. With 12
          piles of 4 cards each and aces pre-placed on{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>
          , every move matters. When you get stuck, the redeal button gathers all
          tableau cards and re-deals them in groups of 4 without shuffling — giving
          you new possibilities without changing the card order.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Cruel Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four foundation piles. Deal the
          remaining 48 cards face-up into 12 piles of 4 cards each. Build foundations
          up by suit from Ace to King. Stack tableau cards in{" "}
          <strong>descending order by same suit</strong> — place a 5&spades; on a
          6&spades;. Only the top card of each pile can be moved. Empty piles cannot be
          filled. Use unlimited redeals to unblock stuck positions.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Redeal Mechanic
        </h3>
        <p className="mb-4 leading-relaxed">
          The redeal is what makes Cruel unique among solitaire games. When activated,
          all tableau cards are gathered from right to left (top card first), then
          re-dealt into groups of 4. The card order is preserved — only the grouping
          changes. Timing your redeals strategically is the key to mastering Cruel
          Solitaire.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/cruel/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Cruel Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/cruel/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Cruel Solitaire Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/beleaguered-castle"
              className="text-[#D4AF37] hover:underline"
            >
              Play Beleaguered Castle
            </Link>{" "}
            — Another challenging variant with aces pre-placed
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
        <MoreGames currentSlug="cruel" />
      </article>
    </>
  );
}
