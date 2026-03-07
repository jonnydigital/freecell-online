import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "../../components/ContentLayout";
import DealsExplorer from "./DealsExplorer";

export const metadata: Metadata = {
  title: "FreeCell Deal Explorer | Browse & Play Specific Game Numbers",
  description:
    "Browse FreeCell game numbers by difficulty, explore curated collections of famous deals, beginner-friendly games, and expert challenges. Jump to any deal from 1 to 1,000,000.",
  keywords: [
    "freecell game numbers",
    "freecell deals",
    "browse freecell games",
    "freecell deal explorer",
    "freecell easy deals",
    "freecell hard deals",
    "freecell impossible deals",
    "freecell game 11982",
  ],
  openGraph: {
    title: "FreeCell Deal Explorer | Browse & Play Specific Game Numbers",
    description:
      "Browse FreeCell game numbers by difficulty. Famous deals, beginner-friendly games, expert challenges, and more.",
    url: absoluteUrl('/deals'),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeCell Deal Explorer | Browse & Play Specific Game Numbers",
    description:
      "Browse FreeCell game numbers by difficulty. Famous deals, beginner-friendly games, expert challenges, and more.",
  },
};

const faqs = [
  {
    question: "How many FreeCell game numbers are there?",
    answer:
      "The original Microsoft FreeCell included 32,000 deals numbered 1 through 32,000. Modern implementations extend this to 1,000,000 or more using the same random number generator algorithm with larger seeds.",
  },
  {
    question: "Do all FreeCell game numbers produce the same deal everywhere?",
    answer:
      "Yes, as long as the implementation uses the same Microsoft-compatible dealing algorithm. Game #617 will produce the exact same card layout on any compatible FreeCell program, allowing players worldwide to compare results on identical deals.",
  },
  {
    question: "Which FreeCell game numbers are impossible to win?",
    answer:
      "Of the original 32,000 Microsoft deals, only #11982 is proven impossible. In the extended 1,000,000 deal set, a handful of additional impossible deals have been identified, including #146692, #495000, #512118, #517776, and #781948.",
  },
  {
    question: "What is the easiest FreeCell game number?",
    answer:
      "While difficulty is somewhat subjective, deals like #164, #278, #420, and #1029 are widely considered among the easiest. These feature accessible Aces, natural card sequences, and forgiving layouts that most players can solve quickly.",
  },
  {
    question: "How are FreeCell game numbers generated?",
    answer:
      "Each game number serves as a seed for a linear congruential random number generator (the same algorithm used by Microsoft Visual C++). The seed determines the exact order in which all 52 cards are dealt to the eight tableau columns, producing a unique but reproducible layout.",
  },
];

export default function DealsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Deal Explorer", item: absoluteUrl('/deals') },
    ],
  };

  const jsonLd = {
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
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Deal Explorer
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Browse over a million unique FreeCell deals. Find famous games,
          discover easy wins, tackle expert challenges, or jump to any game
          number.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-8">
        <DealsExplorer />

        {/* FAQ */}
        <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
          <h2
            className="text-2xl font-bold text-white/90 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-medium text-white/80 text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                {i < faqs.length - 1 && (
                  <div className="mt-6 border-b border-white/10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
          <h2
            className="text-xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Related Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/winning-deals"
              className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
            >
              <span className="text-[#D4AF37] font-semibold">Winning Deals</span>
              <p className="text-sm text-white/40 mt-1">Easiest &amp; hardest deals with detailed analysis</p>
            </Link>
            <Link
              href="/statistics"
              className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
            >
              <span className="text-[#D4AF37] font-semibold">Statistics</span>
              <p className="text-sm text-white/40 mt-1">Win rates, solvability data, and more</p>
            </Link>
            <Link
              href="/strategy"
              className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
            >
              <span className="text-[#D4AF37] font-semibold">Strategy Guide</span>
              <p className="text-sm text-white/40 mt-1">Advanced techniques to beat tough deals</p>
            </Link>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
