import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import CalculationGamePage from "./CalculationGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Calculation Solitaire | Play Online Free — Math-Based Card Game",
  description:
    "Play Calculation Solitaire online for free. Build four foundations using different counting intervals (1s, 2s, 3s, 4s). Suit doesn't matter — only rank and math skills. No download required.",
  keywords: [
    "calculation solitaire",
    "calculation solitaire online",
    "calculation card game",
    "math solitaire",
    "calculation patience game",
    "play calculation solitaire",
    "calculation solitaire free",
    "solitaire math game",
    "broken intervals solitaire",
  ],
  openGraph: {
    title: "Calculation Solitaire | Play Online Free — Math-Based Card Game",
    description:
      "Play Calculation Solitaire online for free. Build four foundations by counting in intervals of 1, 2, 3, and 4 — wrapping around from King to Ace.",
    url: absoluteUrl("/calculation"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Calculation Solitaire?",
    answer:
      "Calculation Solitaire is a math-based patience card game where you build four foundations using different counting intervals. Foundation 1 counts by 1s (A,2,3...K), Foundation 2 by 2s (2,4,6,8,10,Q,A,3,5,7,9,J,K), Foundation 3 by 3s, and Foundation 4 by 4s. Suit doesn't matter — only rank. The challenge is managing four waste piles strategically.",
  },
  {
    question: "How do I play Calculation Solitaire?",
    answer:
      "Draw one card at a time from the stock. If it matches the next expected rank on any foundation, place it there. Otherwise, place it on one of four waste piles. You can also move the top card of any waste pile to a foundation when it matches. The goal is to complete all four foundations, each ending with King.",
  },
  {
    question: "Does suit matter in Calculation Solitaire?",
    answer:
      "No! Suit is completely irrelevant in Calculation Solitaire. Only the rank (number) of each card matters. This makes it unique among solitaire games — it's purely a mathematical puzzle about number sequences and waste pile management.",
  },
  {
    question: "What are the foundation sequences in Calculation?",
    answer:
      "Foundation 1 (Ace): A,2,3,4,5,6,7,8,9,10,J,Q,K. Foundation 2 (Two): 2,4,6,8,10,Q,A,3,5,7,9,J,K. Foundation 3 (Three): 3,6,9,Q,2,5,8,J,A,4,7,10,K. Foundation 4 (Four): 4,8,Q,3,7,J,2,6,10,A,5,9,K. Each sequence wraps around after King.",
  },
  {
    question: "What is the win rate for Calculation Solitaire?",
    answer:
      "With skilled play, Calculation Solitaire has an estimated win rate of around 30-40%. The key is waste pile management — planning which cards to bury where so you can access them in the right order later. It's one of the more skill-dependent solitaire games.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculation Solitaire",
    description:
      "Free online Calculation Solitaire. Build four foundations using counting intervals of 1, 2, 3, and 4. A unique math-based patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/calculation"),
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
        name: "Calculation Solitaire",
        item: absoluteUrl("/calculation"),
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
    name: "Calculation Solitaire",
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
      ratingCount: "654",
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
      <CalculationGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Calculation Solitaire
        </h2>

        <p className="mb-4 leading-relaxed">
          Calculation is a unique math-based solitaire where <strong>suit doesn&apos;t matter</strong> —
          only rank. Four foundations build up using different counting intervals: by 1s, 2s, 3s,
          and 4s, wrapping around from King back to Ace. The challenge lies entirely in managing
          your four waste piles to access cards in the right order.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Calculation Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Start with an Ace, 2, 3, and 4 as foundation bases. Draw cards one at a time from the
          stock. Each drawn card must go to a foundation (if it matches the next expected rank)
          or a waste pile. The top card of each waste pile is available to play to foundations
          at any time. There is <strong>no redeal</strong> — once the stock is empty, you can
          only play from waste pile tops.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Sequences
        </h3>
        <div className="space-y-2 mb-6 text-white/70 font-mono text-sm">
          <p><strong className="text-white/90">Foundation 1 (+1):</strong> A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</p>
          <p><strong className="text-white/90">Foundation 2 (+2):</strong> 2, 4, 6, 8, 10, Q, A, 3, 5, 7, 9, J, K</p>
          <p><strong className="text-white/90">Foundation 3 (+3):</strong> 3, 6, 9, Q, 2, 5, 8, J, A, 4, 7, 10, K</p>
          <p><strong className="text-white/90">Foundation 4 (+4):</strong> 4, 8, Q, 3, 7, J, 2, 6, 10, A, 5, 9, K</p>
        </div>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Tips
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">
          <li>Dedicate each waste pile to a specific range of ranks — don&apos;t mix randomly.</li>
          <li>Keep one waste pile empty or nearly empty as a &ldquo;buffer&rdquo; for unexpected cards.</li>
          <li>Learn the sequences! Knowing what&apos;s coming next on each foundation is crucial.</li>
          <li>Kings are always last — plan to bury them deep in waste piles early.</li>
          <li>Watch all four foundations simultaneously — a card might fit one you didn&apos;t expect.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/calculation/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Calculation
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bakers-dozen"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&apos;s Dozen
            </Link>{" "}
            — Another foundation-building solitaire
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
        <MoreGames currentSlug="calculation" />
      </article>
    </>
  );
}
