import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire FAQ — Common Questions Answered",
  description:
    "Answers to the most common Klondike Solitaire questions — Draw 1 vs Draw 3, Vegas scoring, win rates, stock pile rules, undo, and more.",
  keywords: [
    "klondike solitaire faq",
    "klondike solitaire questions",
    "solitaire faq",
    "klondike draw 1 vs draw 3",
    "klondike solitaire rules questions",
    "is klondike solitaire winnable",
    "klondike vegas scoring",
    "solitaire common questions",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/faq"),
  },
  openGraph: {
    title: "Klondike Solitaire FAQ — Common Questions Answered",
    description:
      "Answers to the most common Klondike Solitaire questions — Draw 1 vs Draw 3, Vegas scoring, win rates, and more.",
    url: absoluteUrl("/klondike/faq"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the difference between Draw 1 and Draw 3?",
    answer: [
      "In Draw 1 (also called Turn 1), you flip one card at a time from the stock pile. You see every card in the stock each time you cycle through it, and you can play any card as it comes up. This is the easier variant and is recommended for beginners.",
      "In Draw 3 (Turn 3), you flip three cards at a time but can only play the top card of each group. This means roughly two-thirds of the stock is inaccessible on any given pass. You need to cycle through the stock multiple times and sometimes strategically avoid playing a card to maintain favorable alignment. Draw 3 is significantly harder, with win rates dropping from 40-50% (Draw 1) to 10-20%.",
    ],
  },
  {
    question: "What is Vegas scoring in Klondike?",
    answer: [
      "Vegas scoring simulates a real casino wager. You \"buy\" the deck for $52 at the start and earn $5 for every card you place on a foundation pile. If you clear all 52 cards, you earn $260 total for a net profit of $208.",
      "The catch: in true Vegas rules, you can only pass through the stock pile once (some variants allow three passes). This makes the game extremely difficult — most hands result in a net loss. With a single pass, even skilled players only profit on 5-10% of deals. Vegas scoring rewards conservative, calculated play where every stock-pile card counts.",
    ],
  },
  {
    question: "How many times can I go through the stock pile?",
    answer: [
      "It depends on the variant you are playing. In the most common casual version (Draw 1 with unlimited passes), you can cycle through the stock as many times as you like. Our online Klondike game uses unlimited passes by default.",
      "In Draw 3, many traditional rule sets allow unlimited passes but penalize each recycle (typically -20 points in standard scoring). In strict Vegas rules, you get only one pass through the stock — once you have flipped through all 24 cards, the stock is exhausted. Some Vegas variants allow three passes.",
    ],
  },
  {
    question: "Are all Klondike deals winnable?",
    answer: [
      "No. Computer analysis of millions of random deals has shown that approximately 79-82% of Klondike deals are theoretically winnable with perfect play in Draw 1. That means about 18-21% of deals are genuinely impossible to complete, no matter how well you play.",
      "For Draw 3, the winnability rate is even lower because the three-card draw restriction prevents access to certain cards. The hidden face-down cards, stock pile order, and King placement can create deadlocks that make a deal unsolvable. This is a major difference from FreeCell, where 99.999% of deals are solvable.",
    ],
  },
  {
    question: "What is a good win rate in Klondike?",
    answer: [
      "Win rates vary significantly by variant and skill level. Here are rough benchmarks for Draw 1 with unlimited passes: beginners win 10-20% of games, intermediate players win 25-35%, and skilled players win 40-50%. The theoretical ceiling with perfect play is around 79-82%.",
      "For Draw 3: beginners win 2-8%, intermediate players win 8-15%, and skilled players win 15-20%. If you are consistently winning more than 20% of Draw 3 games, you are an excellent Klondike player. Remember that a significant portion of deals are simply unwinnable, so 100% is mathematically impossible.",
    ],
  },
  {
    question: "When should I move a King to an empty column?",
    answer: [
      "Move a King to an empty column when it will enable meaningful progress — specifically, when it allows you to uncover face-down cards, extend useful sequences, or play critical cards from the stock pile. The best scenario is when moving a King to an empty column uncovers a face-down card in its original position and creates a new building opportunity in the empty column.",
      "Avoid moving a King to an empty column if the King is already in a useful position, if moving it would not uncover a hidden card, or if you have no cards to build on it. Also consider which color King to place: a black King allows you to build red Queen, black Jack, red 10, etc. Choose the color that matches the cards you have available for building.",
    ],
  },
  {
    question: "Is Klondike harder than FreeCell?",
    answer: [
      "The answer depends on what you mean by \"harder.\" Klondike has a much lower win rate (40-50% vs 82%+ for FreeCell), which makes it harder to win any individual game. This is primarily because Klondike hides 21 cards face-down and includes a stock pile with random ordering — both introduce significant luck elements.",
      "However, FreeCell is arguably a harder game to master at the highest level because it is almost entirely skill-based. Every card is visible from the start, so there are no excuses — every loss is a mistake. In Klondike, you can blame bad luck (and often be correct). In FreeCell, you can only blame yourself. Many serious card game players consider FreeCell the deeper strategic game, while Klondike is the harder game to win consistently.",
    ],
  },
  {
    question: "Can I undo moves in Klondike?",
    answer: [
      "In our online Klondike Solitaire game, yes — unlimited undo is available. You can step back through your moves to explore different lines of play and learn from mistakes. This is one of the biggest advantages of playing digitally versus with physical cards.",
      "Whether undo \"counts\" is a matter of personal preference. Purists argue that a true win means no undo was used. Others view undo as a learning tool that helps develop better intuition. If you are tracking your win rate for personal improvement, consider playing some games with undo and some without to get a sense of your true skill level.",
    ],
  },
  {
    question: "What is the best first move in Klondike?",
    answer: [
      "There is no single best first move — it depends entirely on the specific deal. However, there are strong general principles for opening moves. First, scan the tableau for any Aces or Twos that can go directly to the foundations. Next, look for moves that uncover face-down cards, prioritizing the longer columns (columns 5, 6, and 7) since they contain the most hidden information.",
      "If multiple moves uncover face-down cards, prefer the move on the longest column. If no moves uncover face-down cards, start drawing from the stock. Avoid moving cards purely for the sake of moving — every early-game move should either uncover a hidden card, play to a foundation, or set up a sequence that will uncover hidden cards on the next turn.",
    ],
  },
  {
    question: "How long does an average Klondike game take?",
    answer: [
      "A typical Klondike game takes 5-15 minutes. Quick games that get stuck early can end in 2-3 minutes. Longer games where you successfully clear most of the board might take 15-20 minutes. Speedrunners can complete winning games in under 2 minutes, but this requires rapid pattern recognition and very fast clicking.",
      "Draw 3 games tend to take longer than Draw 1 because you cycle through the stock multiple times and need to think more carefully about each decision. If you are playing thoughtfully and considering your options, 10 minutes per game is a reasonable average. The beauty of Klondike is that it fits perfectly into short breaks — long enough to be engaging, short enough to finish in one sitting.",
    ],
  },
];

export default function KlondikeFaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.join(" "),
      },
    })),
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
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "FAQ",
        item: absoluteUrl("/klondike/faq"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Klondike Solitaire FAQ"
        subtitle="Answers to the most common questions about Klondike Solitaire — rules, strategy, scoring, and more."
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* FAQ Items */}
          {faqs.map((faq, i) => (
            <section key={i}>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {faq.question}
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                {faq.answer.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
              {i === 2 && <AdUnit format="horizontal" className="mt-8" />}
              {i === 5 && <AdUnit format="auto" className="mt-8" />}
              {i === 7 && <AdUnit format="auto" className="mt-8" />}
            </section>
          ))}

          <AdUnit format="horizontal" className="-my-1" />

          <CtaSection
            heading="Ready to Play?"
            body="Try Klondike Solitaire online for free with Draw 1 and Draw 3 modes, unlimited undo, and instant new deals. No download required."
            primaryLabel="Play Klondike Solitaire"
            primaryHref="/klondike"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/klondike" title="Play Klondike Solitaire" description="Play online for free, no download" />
              <ContentLinkCard href="/klondike/how-to-play" title="How to Play Klondike" description="Complete rules and setup guide" />
              <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy" description="Tips and techniques to win more" />
              <ContentLinkCard href="/freecell-vs-klondike" title="FreeCell vs Klondike" description="Head-to-head comparison" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
