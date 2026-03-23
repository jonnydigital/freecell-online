import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Accordion Solitaire | Rules & Strategy Guide",
  description:
    "Learn how to play Accordion Solitaire with complete rules, setup guide, and winning strategies. Match by rank or suit, move 1 or 3 left, compress into one pile.",
  keywords: [
    "accordion solitaire rules",
    "how to play accordion solitaire",
    "accordion solitaire strategy",
    "accordion card game rules",
    "accordion solitaire instructions",
    "accordion solitaire tutorial",
    "accordion solitaire tips",
    "accordion solitaire guide",
  ],
  openGraph: {
    title: "How to Play Accordion Solitaire | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Accordion Solitaire. Match by rank or suit, compress into one pile.",
    url: absoluteUrl("/accordion/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function AccordionHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Accordion Solitaire \u2014 Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Accordion Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/accordion/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Accordion Solitaire", item: absoluteUrl("/accordion") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/accordion/how-to-play") },
    ],
  };

  const faqs = [
    {
      question: "What makes Accordion Solitaire different from other solitaire games?",
      answer:
        "Accordion is unique because all 52 cards are visible from the start in a single row, and moves compress the row by removing positions. There are no foundations, no tableau columns, and no stock pile. The entire game is about compressing a row of cards by matching rank or suit, moving only 1 or 3 positions to the left.",
    },
    {
      question: "What is the win rate for Accordion Solitaire?",
      answer:
        "Accordion Solitaire has an estimated win rate of approximately 1-2% with skilled play. Many deals are mathematically unwinnable regardless of the moves you choose. This makes it one of the hardest solitaire games in existence.",
    },
    {
      question: "Why can I only move left?",
      answer:
        "The leftward-only movement rule is what defines Accordion. Cards compress toward the left side of the row. You can move a card onto the pile 1 position to its left or 3 positions to its left, but never to the right. This directional constraint creates the game's signature challenge.",
    },
    {
      question: "What happens when I move a card onto a pile with multiple cards?",
      answer:
        "When you move a card onto a pile, only the top card of each pile matters for matching. The moved card goes on top of the target pile. If the source pile had multiple cards, the remaining cards stay in place as their own pile. Only the top card can be moved from any pile.",
    },
    {
      question: "Can I move a pile of cards at once?",
      answer:
        "No. Only the single top card of a pile can be moved. Even if a pile has many cards stacked on it, you can only move the topmost card. The remaining cards in the pile stay in position.",
    },
    {
      question: "Is there any way to tell if a deal is winnable?",
      answer:
        "There is no quick way to determine if a deal is winnable before playing. The game's complexity makes it impractical to solve computationally for most deals. Part of Accordion's charm is not knowing whether victory is possible — you play each deal hoping for the best and learning from the patterns.",
    },
    {
      question: "Is Accordion Solitaire harder than FreeCell?",
      answer:
        "Yes, significantly. FreeCell has a win rate of approximately 82% with skilled play, while Accordion's win rate is just 1-2%. However, the difficulty is fundamentally different: FreeCell requires deep tactical planning, while Accordion combines pattern recognition with a large element of luck in the deal.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        {/* Breadcrumb */}
        <nav className="text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60">Home</Link>
          {" / "}
          <Link href="/accordion" className="hover:text-white/60">Accordion Solitaire</Link>
          {" / "}
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Accordion Solitaire
        </h1>

        <p className="text-lg leading-relaxed mb-8">
          Accordion Solitaire (also called Idle Year or Methuselah) is a deceptively
          simple patience game with an extraordinarily low win rate. All 52 cards are
          laid out in a row, and your only move is to match cards by rank or suit,
          compressing the row one step at a time. Getting all cards into a single pile
          is a rare and satisfying achievement.
        </p>

        <AdUnit slot="how-to-play-top" className="my-6" />

        {/* Setup */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Setup</h2>
          <ol className="list-decimal pl-6 space-y-3 text-white/70">
            <li>Use a standard 52-card deck.</li>
            <li>Deal all 52 cards face-up in a single row from left to right.</li>
            <li>All cards are visible from the start — no hidden information.</li>
            <li>There are no foundations, free cells, or stock piles.</li>
          </ol>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Objective</h2>
          <p className="text-white/70 leading-relaxed">
            Compress all 52 cards into a single pile. You win when only one pile
            remains. Most deals are unwinnable, so getting down to just a few piles
            is still an accomplishment.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Rules</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Matching Rule</h3>
              <p>
                A card can be moved if it matches the target card by
                <strong> rank</strong> (e.g., 7&spades; onto 7&hearts;) or by
                <strong> suit</strong> (e.g., 3&spades; onto K&spades;). Either
                condition is sufficient.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Movement Rule</h3>
              <p>
                A card can only be moved to the <strong>left</strong> — specifically
                onto the pile <strong>1 position</strong> to its left (its immediate
                neighbor) or <strong>3 positions</strong> to its left. No other
                distances are allowed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Top Card Only</h3>
              <p>
                Only the <strong>top card</strong> of each pile can be moved. When
                piles accumulate multiple cards, only the topmost card is available
                for play and for matching.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">Row Compression</h3>
              <p>
                When a card is moved and its source pile becomes empty, that position
                is <strong>removed from the row</strong>. All piles to the right shift
                left to close the gap. This compression can create new matching
                opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">No Foundations</h3>
              <p>
                Unlike most solitaire games, Accordion has no foundation piles. The
                goal is simply to reduce the row to a single pile by stacking cards.
              </p>
            </div>
          </div>
        </section>

        <AdUnit slot="how-to-play-mid" className="my-6" />

        {/* Strategy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Strategy Tips</h2>
          <div className="space-y-4 text-white/70">
            <div>
              <h3 className="font-semibold text-white/90 mb-1">1. Prefer 3-Left Moves</h3>
              <p>
                When you have a choice between moving 1 left or 3 left, the 3-left
                move is often better. It compresses more of the row and can open up
                chain reactions. However, always consider the consequences of both
                options before committing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">2. Look for Chain Reactions</h3>
              <p>
                The best moves create cascading opportunities. After compressing the
                row, check if the newly adjacent cards create additional matches.
                A single move that triggers 2-3 follow-up moves is far more valuable
                than an isolated match.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">3. Scan the Entire Row</h3>
              <p>
                Don&apos;t just look at the leftmost cards. Scan the entire row for
                available moves before deciding. A move near the end of the row might
                open up better opportunities than an obvious move at the beginning.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">4. Use Undo Liberally</h3>
              <p>
                With such a low win rate, experimentation is key. Use undo to explore
                different move sequences. Sometimes the order of moves matters more
                than which moves you make.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">5. Accept the Odds</h3>
              <p>
                Most Accordion deals are unwinnable. Don&apos;t get frustrated — even
                reducing the row to 5-10 piles is a good result. Focus on making the
                best possible moves rather than expecting to win every game.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-1">6. Watch for Suit Clusters</h3>
              <p>
                Cards of the same suit that are near each other are valuable — they
                can always be combined. Pay attention to where suit clusters form
                and try to keep them accessible.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Comparison: Accordion vs Related Games
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 pr-4 text-white/90">Feature</th>
                  <th className="py-3 pr-4 text-white/90">Accordion</th>
                  <th className="py-3 pr-4 text-white/90">Clock</th>
                  <th className="py-3 pr-4 text-white/90">Golf</th>
                  <th className="py-3 text-white/90">FreeCell</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Layout</td>
                  <td className="py-2.5 pr-4">Single row</td>
                  <td className="py-2.5 pr-4">Clock face</td>
                  <td className="py-2.5 pr-4">7 columns</td>
                  <td className="py-2.5">8 columns</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Matching rule</td>
                  <td className="py-2.5 pr-4">Rank or suit</td>
                  <td className="py-2.5 pr-4">Rank (auto)</td>
                  <td className="py-2.5 pr-4">&plusmn;1 rank</td>
                  <td className="py-2.5">Alternating color</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Foundations</td>
                  <td className="py-2.5 pr-4">None</td>
                  <td className="py-2.5 pr-4">Clock piles</td>
                  <td className="py-2.5 pr-4">Waste pile</td>
                  <td className="py-2.5">4 (A&rarr;K)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Skill vs luck</td>
                  <td className="py-2.5 pr-4">Some skill</td>
                  <td className="py-2.5 pr-4">Pure luck</td>
                  <td className="py-2.5 pr-4">Moderate skill</td>
                  <td className="py-2.5">High skill</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 font-medium">Free cells</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5 pr-4">0</td>
                  <td className="py-2.5">4</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Win rate</td>
                  <td className="py-2.5 pr-4">~1-2%</td>
                  <td className="py-2.5 pr-4">~1%</td>
                  <td className="py-2.5 pr-4">~90%</td>
                  <td className="py-2.5">~82%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit slot="how-to-play-bottom" className="my-6" />

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white/90 mb-2">{faq.question}</h3>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">Related Games & Guides</h3>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/accordion" className="text-[#D4AF37] hover:underline">
                Play Accordion Solitaire
              </Link>{" "}
              &mdash; Start a game now
            </li>
            <li>
              <Link href="/clock" className="text-[#D4AF37] hover:underline">
                Clock Solitaire
              </Link>{" "}
              &mdash; Another low win-rate patience game
            </li>
            <li>
              <Link href="/clock/how-to-play" className="text-[#D4AF37] hover:underline">
                Clock Solitaire Rules
              </Link>{" "}
              &mdash; Pure luck with ~1% win rate
            </li>
            <li>
              <Link href="/cruel" className="text-[#D4AF37] hover:underline">
                Cruel Solitaire
              </Link>{" "}
              &mdash; Challenging patience with redeals
            </li>
            <li>
              <Link href="/" className="text-[#D4AF37] hover:underline">
                Play FreeCell
              </Link>{" "}
              &mdash; The classic with 4 free cells
            </li>
            <li>
              <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                Types of Solitaire
              </Link>{" "}
              &mdash; Explore 20+ solitaire variants
            </li>
          </ul>
        </section>

        <NetworkCrossLinks />
      </article>
    </>
  );
}
