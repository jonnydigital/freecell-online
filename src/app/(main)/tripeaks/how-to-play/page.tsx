import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play TriPeaks Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play TriPeaks Solitaire with our complete guide. Rules for playing cards ±1 rank, three-peak layout, streak scoring, stock pile mechanics, and winning strategies.",
  keywords: [
    "how to play tripeaks solitaire",
    "tripeaks solitaire rules",
    "tripeaks solitaire guide",
    "tripeaks solitaire instructions",
    "tripeaks solitaire setup",
    "tripeaks solitaire for beginners",
    "tripeaks solitaire scoring",
    "tripeaks solitaire tutorial",
    "tri peaks card game rules",
    "triple peaks solitaire rules",
  ],
  openGraph: {
    title: "How to Play TriPeaks Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play TriPeaks Solitaire. Clear three peaks by playing cards one rank higher or lower than the waste pile.",
    url: absoluteUrl("/tripeaks/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How many cards are in the TriPeaks layout?",
    answer:
      "The TriPeaks layout uses 28 cards arranged in three overlapping peaks. The peaks share a base row of 10 face-up cards. Above the base, 18 cards are dealt face-down in three pyramid formations (3 peak tops, 6 cards in the second row, and 9 cards in the third row). The remaining 24 cards form the stock pile, with one card drawn to start the waste pile.",
  },
  {
    question: "What cards can you play in TriPeaks Solitaire?",
    answer:
      "You can play any available (uncovered) face-up card that is exactly one rank higher or lower than the current waste pile card. For example, if the waste pile shows a 7, you can play a 6 or an 8. Ranks wrap around, meaning you can play a King on an Ace or an Ace on a King. Suits do not matter in TriPeaks.",
  },
  {
    question: "Does King wrap to Ace in TriPeaks?",
    answer:
      "Yes. In TriPeaks Solitaire, ranks wrap around in both directions. You can play a King on an Ace and an Ace on a King. This wrapping rule is a core part of the game and opens up more possible moves, especially when trying to build long streaks.",
  },
  {
    question: "How does scoring work in TriPeaks Solitaire?",
    answer:
      "TriPeaks uses a streak-based scoring system. Each consecutive card you play without drawing from the stock increases your streak. The first card earns 1 point, the second earns 2, the third earns 3, and so on. Drawing from the stock resets the streak to zero. This means long chains of plays are worth exponentially more than individual plays.",
  },
  {
    question: "What happens when you can't make a move in TriPeaks?",
    answer:
      "When no available tableau card is ±1 rank from the waste pile top, you must draw a card from the stock pile. The drawn card becomes the new waste pile top, potentially opening new moves. If the stock is empty and no moves are available, the game is over.",
  },
  {
    question: "Is TriPeaks Solitaire the same as Pyramid Solitaire?",
    answer:
      "No. While both games feature pyramid-shaped card layouts, the mechanics differ significantly. Pyramid Solitaire removes pairs of cards that sum to 13, while TriPeaks removes single cards that are one rank higher or lower than the waste pile top. TriPeaks has three smaller peaks sharing a base row, while Pyramid has a single seven-row triangle. TriPeaks also features streak-based scoring that Pyramid does not have.",
  },
  {
    question: "What percentage of TriPeaks games are winnable?",
    answer:
      "Approximately 90% of randomly dealt TriPeaks games are theoretically winnable with perfect play, making it one of the more forgiving solitaire variants. However, actual win rates for human players are typically much lower, around 50-60%, because the game requires careful sequencing and planning to avoid getting stuck.",
  },
  {
    question: "When should you draw from the stock in TriPeaks?",
    answer:
      "Only draw from the stock when no available tableau card is one rank higher or lower than the current waste pile card. Before drawing, scan all available face-up cards carefully — it is easy to miss a valid play, especially when cards are scattered across three peaks. Drawing resets your streak, so avoid it when possible.",
  },
];

export default function HowToPlayTriPeaksPage() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play TriPeaks Solitaire",
    description:
      "A complete step-by-step guide to playing TriPeaks Solitaire, covering the three-peak layout, card playing rules, streak scoring, and stock pile mechanics.",
    totalTime: "PT10M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Understand the Layout",
        text: "The game deals 28 cards into three overlapping peaks sharing a base row of 10 face-up cards. The remaining 24 cards form the stock pile, and one card is drawn to start the waste pile.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Learn the Playing Rule",
        text: "You can play any available (uncovered) card that is exactly one rank higher or lower than the waste pile top card. Ranks wrap: King connects to Ace. Suits don't matter.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Uncover Face-Down Cards",
        text: "Cards in the upper rows start face-down. They flip face-up when both cards covering them from below are removed. Clearing face-down cards opens new opportunities.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Build Streaks for High Scores",
        text: "Each consecutive play without drawing earns increasing points: 1, 2, 3, and so on. Plan your moves to chain as many plays as possible before drawing from the stock.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Draw from Stock When Stuck",
        text: "If no available card is ±1 from the waste top, click the stock to draw a new card. This resets your streak, so only draw when truly necessary.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Clear All Three Peaks to Win",
        text: "The game is won when all 28 tableau cards are removed. You don't need to use all stock cards. The game is lost if no moves remain and the stock is empty.",
      },
    ],
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
        name: "TriPeaks Solitaire",
        item: absoluteUrl("/tripeaks"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Play",
        item: absoluteUrl("/tripeaks/how-to-play"),
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play TriPeaks Solitaire — Complete Rules & Guide",
    description:
      "Learn how to play TriPeaks Solitaire. Complete guide covering the three-peak layout, ±1 rank playing rule, streak scoring, and winning strategies.",
    url: absoluteUrl("/tripeaks/how-to-play"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl("/tripeaks/how-to-play"),
  };

  return (
    <ContentLayout>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <ContentHero
        title="How to Play TriPeaks Solitaire"
        subtitle="Complete rules, layout guide, streak scoring, and strategies for clearing all three peaks"
      />

      <ContentBody>
        {/* Breadcrumb */}
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tripeaks" className="hover:text-white/70 transition-colors">TriPeaks</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">How to Play</span>
        </nav>

        {/* Section 1: What Is TriPeaks */}
        <SectionHeading>What Is TriPeaks Solitaire?</SectionHeading>
        <p className="mb-4 leading-relaxed">
          TriPeaks Solitaire (also known as Tri Peaks, Triple Peaks, or Three Peaks) is a
          solitaire card game invented by Robert Hogue in 1989. It combines elements of Golf
          Solitaire with a visually striking three-peak card layout. The game became widely
          popular after its inclusion in Microsoft Solitaire Collection.
        </p>
        <p className="mb-4 leading-relaxed">
          Unlike Pyramid Solitaire, which removes pairs that total 13, TriPeaks uses a simpler
          mechanic: play any available card that is one rank higher or lower than the waste pile
          top. This creates a fast-paced, chain-building experience where the goal is to clear
          all three peaks while building scoring streaks.
        </p>

        <AdUnit slot="tripeaks-how-to-play-top" className="my-8" />

        {/* Section 2: Setup and Layout */}
        <SectionHeading>Setup and Layout</SectionHeading>
        <p className="mb-4 leading-relaxed">
          A standard 52-card deck is shuffled and dealt into the following layout:
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mb-6">
          <h4 className="font-semibold text-white/90 mb-3">The Three Peaks</h4>
          <ul className="space-y-2 text-white/70">
            <li><strong className="text-white/90">Row 0 (top):</strong> 3 cards — one at the top of each peak, dealt face-down</li>
            <li><strong className="text-white/90">Row 1:</strong> 6 cards — two under each peak top, dealt face-down</li>
            <li><strong className="text-white/90">Row 2:</strong> 9 cards — three under each row-1 pair, dealt face-down</li>
            <li><strong className="text-white/90">Row 3 (base):</strong> 10 cards — the shared base row, all dealt face-up</li>
          </ul>
          <p className="mt-3 text-white/60 text-sm">
            Total tableau cards: 3 + 6 + 9 + 10 = 28 cards
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mb-6">
          <h4 className="font-semibold text-white/90 mb-3">Stock and Waste</h4>
          <ul className="space-y-2 text-white/70">
            <li><strong className="text-white/90">Stock pile:</strong> 23 cards dealt face-down</li>
            <li><strong className="text-white/90">Waste pile:</strong> 1 card drawn face-up to start</li>
          </ul>
          <p className="mt-3 text-white/60 text-sm">
            The waste pile card is the &quot;target&quot; — you play cards ±1 rank from it.
          </p>
        </div>

        <p className="mb-4 leading-relaxed">
          Each card in rows 0–2 partially overlaps two cards in the row below it. A
          face-down card is flipped face-up when both cards covering it from below
          have been removed. Only face-up cards that are not covered can be played.
        </p>

        {/* Section 3: Playing Rule */}
        <SectionHeading>The Playing Rule</SectionHeading>
        <p className="mb-4 leading-relaxed">
          The core mechanic of TriPeaks is simple: click any available card that is
          exactly <strong className="text-white/90">one rank higher or lower</strong> than
          the current waste pile top card. Suits are completely irrelevant.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mb-6">
          <h4 className="font-semibold text-white/90 mb-3">Valid Plays (Examples)</h4>
          <ul className="space-y-1 text-white/70">
            <li>Waste shows <strong className="text-white/90">7</strong> → play a 6 or 8</li>
            <li>Waste shows <strong className="text-white/90">Queen</strong> → play a Jack or King</li>
            <li>Waste shows <strong className="text-white/90">Ace</strong> → play a 2 or King (wrapping!)</li>
            <li>Waste shows <strong className="text-white/90">King</strong> → play a Queen or Ace (wrapping!)</li>
          </ul>
        </div>

        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg p-5 mb-6">
          <h4 className="font-semibold text-[#D4AF37] mb-2">Wrapping Rule</h4>
          <p className="text-white/70">
            Ranks wrap around in TriPeaks. A King connects to an Ace and an Ace
            connects to a King. This is different from some solitaire variants where
            Aces and Kings are dead ends. The wrapping rule is essential for building
            long streaks and is one of the features that makes TriPeaks so satisfying.
          </p>
        </div>

        <AdUnit slot="tripeaks-how-to-play-mid" className="my-8" />

        {/* Section 4: Streak Scoring */}
        <SectionHeading>Streak-Based Scoring</SectionHeading>
        <p className="mb-4 leading-relaxed">
          TriPeaks uses an additive streak scoring system that rewards consecutive
          plays. Each time you play a card from the tableau without drawing from the
          stock, your streak counter increases by one.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-white/5">
                <th className="px-4 py-2 text-left text-white/80 font-semibold">Cards in Streak</th>
                <th className="px-4 py-2 text-left text-white/80 font-semibold">Points Earned</th>
                <th className="px-4 py-2 text-left text-white/80 font-semibold">Cumulative Total</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-t border-white/5"><td className="px-4 py-2">1st card</td><td className="px-4 py-2">1</td><td className="px-4 py-2">1</td></tr>
              <tr className="border-t border-white/5"><td className="px-4 py-2">2nd card</td><td className="px-4 py-2">2</td><td className="px-4 py-2">3</td></tr>
              <tr className="border-t border-white/5"><td className="px-4 py-2">3rd card</td><td className="px-4 py-2">3</td><td className="px-4 py-2">6</td></tr>
              <tr className="border-t border-white/5"><td className="px-4 py-2">4th card</td><td className="px-4 py-2">4</td><td className="px-4 py-2">10</td></tr>
              <tr className="border-t border-white/5"><td className="px-4 py-2">5th card</td><td className="px-4 py-2">5</td><td className="px-4 py-2">15</td></tr>
              <tr className="border-t border-white/5"><td className="px-4 py-2">10th card</td><td className="px-4 py-2">10</td><td className="px-4 py-2">55</td></tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4 leading-relaxed">
          Drawing from the stock pile resets your streak counter to zero. This means
          a single 10-card streak is worth far more than ten individual 1-card plays.
          Building and extending streaks is the primary skill in TriPeaks.
        </p>

        {/* Section 5: Step-by-Step Gameplay */}
        <SectionHeading>Step-by-Step Gameplay</SectionHeading>

        <div className="space-y-4 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[#D4AF37] font-bold text-lg">1.</span>
              <h4 className="font-semibold text-white/90">Survey the Board</h4>
            </div>
            <p className="text-white/70 ml-7">
              Look at the 10 face-up base cards and the initial waste pile card. Identify
              all cards that are ±1 from the waste top.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[#D4AF37] font-bold text-lg">2.</span>
              <h4 className="font-semibold text-white/90">Plan Your Streak</h4>
            </div>
            <p className="text-white/70 ml-7">
              Before clicking, trace a path through available cards. If the waste shows
              a 5, and you see a 4, 3, 2, A, K in the available cards, that&apos;s a potential
              5-card streak worth 15 points.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[#D4AF37] font-bold text-lg">3.</span>
              <h4 className="font-semibold text-white/90">Play Cards</h4>
            </div>
            <p className="text-white/70 ml-7">
              Click an available card that is ±1 from the waste top. It moves to the
              waste pile and becomes the new target. Any face-down cards that are now
              fully uncovered will flip face-up.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[#D4AF37] font-bold text-lg">4.</span>
              <h4 className="font-semibold text-white/90">Draw When Stuck</h4>
            </div>
            <p className="text-white/70 ml-7">
              If no available card is ±1 from the waste top, click the stock pile to
              draw a new card. This resets your streak but gives you a fresh target.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[#D4AF37] font-bold text-lg">5.</span>
              <h4 className="font-semibold text-white/90">Clear All Peaks</h4>
            </div>
            <p className="text-white/70 ml-7">
              Continue playing and drawing until all 28 tableau cards are removed (you
              win) or until no moves remain and the stock is empty (game over).
            </p>
          </div>
        </div>

        <AdUnit slot="tripeaks-how-to-play-steps" className="my-8" />

        {/* Section 6: Strategies */}
        <SectionHeading>Essential Strategies</SectionHeading>

        <div className="space-y-4 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <h4 className="font-semibold text-white/90 mb-2">Plan Multi-Card Runs</h4>
            <p className="text-white/70">
              Before making your first play, scan the board for chains. If you see a
              sequence like 7→6→5→4→3 among the available cards, play them in order
              rather than picking cards randomly. Longer streaks yield dramatically
              more points.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <h4 className="font-semibold text-white/90 mb-2">Focus on Peak Tops</h4>
            <p className="text-white/70">
              Clearing a peak top removes only one card, but it reveals two cards
              beneath it and starts a cascade that can expose many more. Prioritize
              moves that uncover cards in the upper rows of each peak.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <h4 className="font-semibold text-white/90 mb-2">Use Wrapping to Extend Streaks</h4>
            <p className="text-white/70">
              Remember that King↔Ace connections let you &quot;turn the corner&quot; during
              a streak. A run like Q→K→A→2→3 is five cards and worth 15 points.
              Always check if wrapping opens a longer chain.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <h4 className="font-semibold text-white/90 mb-2">Delay Drawing from Stock</h4>
            <p className="text-white/70">
              Every draw resets your streak multiplier. Scan every available card
              carefully before clicking the stock. It is easy to overlook a valid play
              on the other side of the board, especially with three peaks to track.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
            <h4 className="font-semibold text-white/90 mb-2">Balance the Peaks</h4>
            <p className="text-white/70">
              Try to clear cards across all three peaks evenly rather than focusing
              entirely on one peak. A balanced approach gives you more available cards
              at any given moment, increasing the chance of finding playable moves.
            </p>
          </div>
        </div>

        {/* Section 7: Key Rules and Edge Cases */}
        <SectionHeading>Key Rules and Edge Cases</SectionHeading>
        <ul className="list-disc pl-6 mb-8 space-y-2 text-white/70">
          <li>
            <strong className="text-white/90">Suits don&apos;t matter:</strong> Only rank
            matters in TriPeaks. A red 7 plays on a black 8 just as well as on a red 8.
          </li>
          <li>
            <strong className="text-white/90">Only available cards can be played:</strong> A
            card must be face-up and not covered by any card from the row below.
          </li>
          <li>
            <strong className="text-white/90">No recycling:</strong> Unlike some solitaire
            variants, TriPeaks does not let you recycle the stock pile. Once the stock is
            exhausted, you play with whatever waste card you have.
          </li>
          <li>
            <strong className="text-white/90">Wrapping is bidirectional:</strong> Both K→A
            and A→K are valid. The ranks form a continuous loop.
          </li>
          <li>
            <strong className="text-white/90">No partial wins:</strong> You either clear all
            28 tableau cards or you don&apos;t. There is no partial scoring for leftover
            cards (though your score from streaks is still tracked).
          </li>
        </ul>

        <AdUnit slot="tripeaks-how-to-play-bottom" className="my-8" />

        {/* FAQ Section */}
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <div className="space-y-4 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
              <h4 className="font-semibold text-white/90 mb-2">{faq.question}</h4>
              <p className="text-white/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA and cross-links */}
        <CtaSection
          heading="Ready to Play?"
          body="Try TriPeaks Solitaire now — it's free, works in your browser, and requires no download."
          primaryHref="/tripeaks"
          primaryLabel="Play TriPeaks Solitaire"
        />

        <CardSection>
          <ContentLinkCard
            href="/pyramid"
            title="Pyramid Solitaire"
            description="Pair cards that add up to 13 to clear the pyramid."
          />
          <ContentLinkCard
            href="/klondike"
            title="Klondike Solitaire"
            description="The classic draw-and-stack solitaire game."
          />
          <ContentLinkCard
            href="/spider"
            title="Spider Solitaire"
            description="Build suited runs across ten columns."
          />
          <ContentLinkCard
            href="/solitaire-types"
            title="Types of Solitaire"
            description="Explore 20+ solitaire variants and find your favorite."
          />
        </CardSection>
      </ContentBody>
    </ContentLayout>
  );
}
