import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from "@/components/content";
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
      "Of the original 32,000 Microsoft deals, only #11982 is proven impossible. In the extended 1,000,000 deal set, seven additional impossible deals have been confirmed: #146692, #186216, #455889, #495505, #512118, #517776, and #781948.",
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
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="FreeCell Deal Explorer"
        subtitle="Browse over a million unique FreeCell deals. Find famous games, discover easy wins, tackle expert challenges, or jump to any game number."
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <DealsExplorer />

        {/* FAQ */}
        <section className="rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden p-6 sm:p-8">
          <h2
            className="text-2xl font-bold text-white mb-6"
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
                  <div className="mt-6 border-b border-white/[0.07]" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4">Related Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <ContentLinkCard href="/winning-deals" title="Winning Deals" description="Easiest & hardest deals with detailed analysis" />
            <ContentLinkCard href="/freecell-game-11982" title="Deal #11982" description="The only proven unsolvable deal in the original set" />
            <ContentLinkCard href="/statistics" title="Statistics" description="Win rates, solvability data, and more" />
            <ContentLinkCard href="/strategy" title="Strategy Guide" description="Advanced techniques to beat tough deals" />
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
