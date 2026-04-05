import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "How FreeCell Supermoves Work | The Math Behind Multi-Card Moves",
  description:
    "Understand FreeCell supermoves \u2014 the formula for moving multiple cards at once, how free cells and empty columns multiply your capacity, and advanced supermove strategy.",
  keywords: [
    "freecell supermoves",
    "freecell supermove formula",
    "how to move multiple cards freecell",
    "freecell move multiple cards",
    "freecell supermove explained",
    "freecell supermove math",
    "freecell empty column strategy",
    "freecell move capacity",
    "freecell sequence move",
    "freecell advanced strategy",
    "freecell free cell math",
    "freecell move calculator",
  ],
  openGraph: {
    title:
      "How FreeCell Supermoves Work | The Math Behind Multi-Card Moves",
    description:
      "The complete guide to FreeCell supermoves \u2014 the formula, the math, and the strategy behind moving multiple cards at once.",
    url: absoluteUrl("/how-freecell-supermoves-work"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "What is a supermove in FreeCell?",
    answer:
      "A supermove is a shortcut that lets you move multiple cards at once between tableau columns. In standard FreeCell rules, you can only move one card at a time. A supermove automates the tedious process of moving cards individually through free cells and empty columns, then restacking them in order. It\u2019s not a special rule \u2014 it\u2019s a convenience that represents a sequence of legal single-card moves.",
  },
  {
    question: "What is the supermove formula in FreeCell?",
    answer:
      "The formula is: Maximum cards you can move = (1 + empty free cells) \u00d7 2^(empty columns). With 0 free cells and 0 empty columns, you can move 1 card. With 4 free cells and 1 empty column, you can move (1+4) \u00d7 2^1 = 10 cards. With 4 free cells and 2 empty columns, you can move (1+4) \u00d7 2^2 = 20 cards \u2014 enough to move virtually any sequence.",
  },
  {
    question: "Why do empty columns matter more than free cells for supermoves?",
    answer:
      "Empty columns have an exponential effect on move capacity because they can temporarily hold entire sub-sequences, not just single cards. Each empty column doubles your move capacity. One free cell adds 1 to your capacity, but one empty column multiplies the total by 2. That\u2019s why experienced players prioritize clearing entire columns over keeping free cells empty, even though both are important.",
  },
  {
    question: "Can you supermove in Baker\u2019s Game and Eight Off?",
    answer:
      "Yes, both Baker\u2019s Game and Eight Off support supermoves using the same formula. However, those games require same-suit sequences for supermoves (e.g., 8\u2660-7\u2660-6\u2660), whereas FreeCell allows alternating-color sequences (e.g., 8\u2660-7\u2665-6\u2663). This makes supermoves much harder to set up in Baker\u2019s Game and Eight Off because building same-suit runs requires more precise card manipulation.",
  },
  {
    question: "Do all FreeCell games support supermoves?",
    answer:
      `Most digital FreeCell implementations support supermoves as a convenience feature \u2014 including ${siteConfig.siteName}. Some older or purist versions require you to manually move cards one at a time. Either way, the result is identical; supermoves just save you the tedium of clicking through each individual card move. A few implementations also show the individual moves being animated in sequence.`,
  },
  {
    question: "What happens if I don\u2019t have enough capacity for a supermove?",
    answer:
      "If you try to move a sequence that exceeds your current move capacity, the game won\u2019t allow it. You\u2019ll need to free up more space first \u2014 either by moving cards to foundations, clearing cards from free cells, or emptying a tableau column. Sometimes you can partially move a sequence: move as many cards as your capacity allows, free up more space with the remaining moves, then complete the transfer.",
  },
];

/* ── Capacity table data ── */

const capacityExamples = [
  { freeCells: 0, emptyCols: 0, capacity: 1 },
  { freeCells: 1, emptyCols: 0, capacity: 2 },
  { freeCells: 2, emptyCols: 0, capacity: 3 },
  { freeCells: 3, emptyCols: 0, capacity: 4 },
  { freeCells: 4, emptyCols: 0, capacity: 5 },
  { freeCells: 0, emptyCols: 1, capacity: 2 },
  { freeCells: 1, emptyCols: 1, capacity: 4 },
  { freeCells: 2, emptyCols: 1, capacity: 6 },
  { freeCells: 3, emptyCols: 1, capacity: 8 },
  { freeCells: 4, emptyCols: 1, capacity: 10 },
  { freeCells: 0, emptyCols: 2, capacity: 4 },
  { freeCells: 2, emptyCols: 2, capacity: 12 },
  { freeCells: 4, emptyCols: 2, capacity: 20 },
  { freeCells: 4, emptyCols: 3, capacity: 40 },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function HowFreecellSupermovesWorkPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "How FreeCell Supermoves Work: The Math Behind Multi-Card Moves",
      description:
        "A complete guide to FreeCell supermoves \u2014 the formula, a capacity reference table, and strategies for maximizing your move potential.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/how-freecell-supermoves-work"),
      },
    },
    {
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
    },
    {
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
          name: "How Supermoves Work",
          item: absoluteUrl("/how-freecell-supermoves-work"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="How FreeCell Supermoves Work"
        subtitle={
          <>
            Every FreeCell player uses supermoves, but few understand the
            math behind them. One simple formula controls how many cards you
            can move at once &mdash; and mastering it transforms your game.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── What Is a Supermove? ── */}
        <CardSection id="what-is-supermove">
          <SectionHeading
            sub="The Basics"
            id="what-is-supermove-heading"
            icon={"\u2660"}
          >
            What Is a Supermove?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              In FreeCell, the official rules only allow you to move one card
              at a time. When you want to move a sequence of cards &mdash; say,
              a run of 8&#9829;&ndash;7&#9824;&ndash;6&#9830; &mdash; you
              technically need to:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Move the 6&#9830; to a free cell</li>
              <li>Move the 7&#9824; to a free cell</li>
              <li>Move the 8&#9829; to the target column</li>
              <li>Move the 7&#9824; from the free cell onto the 8&#9829;</li>
              <li>Move the 6&#9830; from the free cell onto the 7&#9824;</li>
            </ol>
            <p>
              That&apos;s 5 moves to transfer 3 cards. A <strong>supermove</strong>{" "}
              automates this entire sequence into a single drag-and-drop
              action. You grab the whole run and place it, and the game
              silently executes all the individual moves for you.
            </p>
            <p>
              But here&apos;s the crucial insight: a supermove is only legal
              when you have <em>enough empty space</em> to theoretically
              perform all those individual moves. The game won&apos;t let you
              move a 5-card sequence if you only have 2 free cells and no
              empty columns. Understanding the formula for move capacity is
              what separates intermediate players from experts.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The Formula ── */}
        <CardSection id="formula">
          <SectionHeading
            sub="The Math"
            id="formula-heading"
            icon={"\u2663"}
          >
            The Supermove Formula
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p className="text-center text-lg font-mono text-[#2a2522] bg-[#B8860B]/[0.06] rounded-lg py-4 px-6">
              Max cards = (1 + empty free cells) &times; 2<sup>empty columns</sup>
            </p>
            <p>
              This elegant formula captures two different kinds of temporary
              storage and how they interact:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Free cells add linearly.</strong> Each empty free cell
                increases your capacity by 1. With 4 free cells and no empty
                columns, you can move 5 cards (1 + 4).
              </li>
              <li>
                <strong>Empty columns multiply exponentially.</strong> Each
                empty column <em>doubles</em> your total capacity. This is
                because an empty column can temporarily hold an entire
                sub-sequence, not just a single card. It acts as a staging
                area for moving cards in and out.
              </li>
            </ul>
            <p>
              The &quot;1&quot; in the formula represents the card you&apos;re
              actually moving &mdash; you always get to move at least 1 card
              regardless of available space.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Capacity Reference Table ── */}
        <CardSection id="capacity-table">
          <SectionHeading
            sub="Quick Reference"
            id="capacity-table-heading"
            icon={"\u2665"}
          >
            Supermove Capacity Table
          </SectionHeading>

          <ContentBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Free Cells
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Empty Columns
                    </th>
                    <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Max Cards
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {capacityExamples.map((row, i) => (
                    <tr
                      key={`${row.freeCells}-${row.emptyCols}`}
                      className={
                        i % 2 === 0
                          ? "bg-[#B8860B]/[0.03]"
                          : ""
                      }
                    >
                      <td className="py-2.5 pr-4 text-[#2a2522] text-sm text-center">
                        {row.freeCells}
                      </td>
                      <td className="py-2.5 px-4 text-[#2a2522] text-sm text-center">
                        {row.emptyCols}
                      </td>
                      <td className="py-2.5 pl-4 text-[#2a2522] font-semibold text-sm text-center">
                        {row.capacity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[#666666]">
              Notice the pattern: going from 0 to 1 empty column doubles
              capacity. Going from 1 to 2 doubles it again. A single empty
              column is often more valuable than 2 free cells.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Why Empty Columns Are Gold ── */}
        <CardSection id="empty-columns">
          <SectionHeading
            sub="The Exponential Advantage"
            id="empty-columns-heading"
            icon={"\u2666"}
          >
            Why Empty Columns Are Worth More Than Free Cells
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Here&apos;s a scenario that illustrates the power difference.
              Imagine you have 2 free cells empty and 0 empty columns. Your
              move capacity is 3. Now compare two options for your next move:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Option A: Free up a third free cell.</strong> Capacity
                goes from 3 to 4 &mdash; a gain of 1.
              </li>
              <li>
                <strong>Option B: Clear an entire column.</strong> Capacity
                goes from 3 to 6 &mdash; a gain of 3. That&apos;s triple the
                benefit.
              </li>
            </ul>
            <p>
              With 4 free cells empty, the comparison is even more dramatic.
              Going from 0 to 1 empty column jumps you from 5 to 10 &mdash;
              a gain of 5. No single free cell can match that.
            </p>
            <p>
              This is why expert FreeCell players obsess over clearing columns.
              An empty column isn&apos;t just &quot;one more space&quot;
              &mdash; it&apos;s a force multiplier that doubles everything
              else you have. Plan your early game around creating that first
              empty column, and the midgame opens up dramatically.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Supermove Strategy ── */}
        <CardSection id="strategy">
          <SectionHeading
            sub="Practical Application"
            id="strategy-heading"
            icon={"\u2660"}
          >
            Supermove Strategy Tips
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Count before you move.</strong> Before attempting a
                multi-card move, quickly count your empty free cells and empty
                columns, then use the formula. Moving and getting blocked is
                worse than pausing to calculate.
              </li>
              <li>
                <strong>Preserve empty columns for supermoves.</strong> Resist
                the temptation to fill an empty column with a single card
                unless it creates a clear tactical advantage. That column is
                worth 2x your entire free-cell capacity.
              </li>
              <li>
                <strong>Stage multi-step supermoves.</strong> Sometimes you
                need to move a sequence that exceeds your capacity. Break it
                into parts: move the top portion of the sequence first, free
                up more space, then move the rest. This &quot;partial
                supermove&quot; technique is key to solving difficult deals.
              </li>
              <li>
                <strong>Time your moves around foundation builds.</strong>{" "}
                Moving cards to foundations permanently frees up space without
                occupying free cells or columns. If you can build to
                foundations first, your subsequent supermove capacity increases.
              </li>
              <li>
                <strong>Think backwards from the supermove.</strong> When you
                see a sequence you want to move, work backwards: &quot;I need
                to move 7 cards. That requires (7) capacity. I have 3 free
                cells and need 1 empty column: (1+3) &times; 2 = 8. I need
                to free up just 1 column.&quot; This reverse planning prevents
                wasted moves.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Common Mistakes ── */}
        <CardSection id="mistakes">
          <SectionHeading
            sub="Pitfalls to Avoid"
            id="mistakes-heading"
            icon={"\u2663"}
          >
            Common Supermove Mistakes
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Filling free cells too early.</strong> Each occupied
                free cell reduces your supermove capacity by 1. In the early
                game, avoid using free cells unless the move directly advances
                your strategy (like freeing an Ace).
              </li>
              <li>
                <strong>Filling empty columns carelessly.</strong> Placing a
                random card in an empty column costs you half your move
                capacity. Only fill an empty column when it creates a
                longer same-color sequence or directly leads to foundation
                builds.
              </li>
              <li>
                <strong>Ignoring the destination column.</strong> When moving
                a sequence onto another column, that destination doesn&apos;t
                count as empty (it has cards). Only completely empty columns
                contribute to the formula.
              </li>
              <li>
                <strong>Not planning for the return trip.</strong> If you
                temporarily break a sequence to make a supermove, you&apos;ll
                need capacity to reassemble it afterwards. Make sure you
                account for both directions.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Cheat Sheet ── */}
        <CardSection id="cheat-sheet">
          <SectionHeading sub="Quick Reference" id="cheat-sheet-heading" icon={"\ud83d\udccb"}>
            Supermove Cheat Sheet
          </SectionHeading>

          <ContentBody>
            <div className="bg-[#B8860B]/[0.06] rounded-lg p-5 space-y-3">
              <p className="font-semibold text-[#2a2522]">
                Formula: (1 + free cells) &times; 2^(empty columns)
              </p>
              <ul className="text-sm text-[#444444] space-y-1.5">
                <li>&bull; 4 free cells + 0 empty columns = <strong>5 cards</strong></li>
                <li>&bull; 4 free cells + 1 empty column = <strong>10 cards</strong></li>
                <li>&bull; 4 free cells + 2 empty columns = <strong>20 cards</strong></li>
                <li>&bull; Each empty column doubles your total capacity</li>
                <li>&bull; Each free cell adds 1 to your base capacity</li>
                <li>&bull; Empty columns &gt; free cells in almost every situation</li>
                <li>&bull; Always count before attempting big moves</li>
                <li>&bull; Break large moves into stages if capacity is tight</li>
              </ul>
            </div>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Explore More" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-opening-strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Opening Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-endgame-strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Endgame Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Tips &amp; Tricks &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-mistakes-to-avoid" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Mistakes to Avoid &rarr;
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Statistics &amp; Win Rates &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-bakers-game" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Baker&apos;s Game &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solver" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Solver &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Ready to Put Supermoves to Work?"
          body="Try counting your move capacity before each big move. You'll be amazed how it changes your game."
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
