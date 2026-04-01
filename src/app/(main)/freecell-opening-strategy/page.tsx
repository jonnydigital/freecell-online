import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "FreeCell Opening Strategy | How to Start Every Game Strong",
  description:
    "Master FreeCell opening strategy \u2014 first-move priorities, board scanning techniques, when to use free cells early, Ace liberation, and patterns that set up winning games.",
  keywords: [
    "freecell opening strategy",
    "freecell first move",
    "how to start freecell",
    "freecell opening moves",
    "freecell beginning strategy",
    "freecell starting tips",
    "freecell early game",
    "freecell board scan",
    "freecell ace strategy",
    "freecell free cell management",
    "freecell first moves guide",
    "freecell game start",
  ],
  openGraph: {
    title:
      "FreeCell Opening Strategy | How to Start Every Game Strong",
    description:
      "Learn how to analyze a FreeCell board and make strong opening moves \u2014 Ace liberation, free cell management, and move-sequence planning.",
    url: absoluteUrl("/freecell-opening-strategy"),
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
    question: "What should my first move in FreeCell be?",
    answer:
      "Before making any move, scan the entire board. Look for buried Aces and low cards, identify which columns are most tangled, and count how many moves it will take to free each Ace. Your first move should usually work toward freeing the most deeply buried Ace \u2014 or, if Aces are accessible, prioritize moves that open up the most options. Avoid using free cells on your first move unless it directly frees an Ace.",
  },
  {
    question: "Should I move Aces to the foundation immediately?",
    answer:
      "Yes, almost always. Aces and 2s should go to the foundation as soon as they\u2019re available \u2014 they have no strategic value on the tableau since nothing can be placed on an Ace. For 3s and above, consider whether the card might be useful for building tableau sequences before sending it to the foundation. A good rule of thumb: send a card to the foundation if both cards of the next lower rank (opposite colors) are already on foundations.",
  },
  {
    question: "How many free cells should I use in the opening?",
    answer:
      "Ideally zero. The opening is about creating options, not consuming them. Every free cell you occupy reduces your ability to make multi-card moves later. If you must use a free cell, make sure the move frees an Ace, exposes a critical low card, or creates an empty column. In the first 5\u201310 moves, try to keep at least 3 of your 4 free cells open.",
  },
  {
    question: "What is the most important thing to look for when scanning the board?",
    answer:
      "Look for buried Aces first \u2014 specifically, Aces that are deep in long columns. These are the bottleneck of most FreeCell games. Count how many cards sit on top of each Ace and plan a sequence of moves to liberate them. Also look for column length imbalance: long columns with many buried cards are problems, while short columns are opportunities. Finally, check if any columns can be quickly emptied \u2014 empty columns are extremely valuable.",
  },
  {
    question: "Should I try to empty a column early in the game?",
    answer:
      "If you can empty a column within the first 5\u20138 moves without using more than one free cell, absolutely do it. An empty column essentially functions as a super free cell \u2014 you can park any card or sequence there temporarily. Early empty columns give you enormous flexibility for the mid-game. However, don\u2019t sacrifice too many free cells or create worse tangles just to empty a column. It\u2019s a balance.",
  },
  {
    question: "What are common opening mistakes in FreeCell?",
    answer:
      "The most common mistakes are: (1) Moving cards to free cells without a plan to get them back out. (2) Building long tableau sequences that bury important low cards deeper. (3) Ignoring buried Aces and focusing on easy surface moves. (4) Using free cells on the very first move when better options exist. (5) Not scanning the full board before starting \u2014 hasty first moves often lead to dead ends. (6) Treating all Aces equally when one is much more buried and urgent than others.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function FreecellOpeningStrategyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "FreeCell Opening Strategy: How to Start Every Game Strong",
      description:
        "A detailed guide to FreeCell opening strategy \u2014 board scanning, Ace liberation, free cell management, and move patterns that set up winning games.",
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
        "@id": absoluteUrl("/freecell-opening-strategy"),
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
          name: "FreeCell Opening Strategy",
          item: absoluteUrl("/freecell-opening-strategy"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell Opening Strategy"
        subtitle={
          <>
            The first 5&ndash;10 moves of a FreeCell game determine whether
            you&apos;re playing from a position of strength or scrambling to
            recover. Here&apos;s how to read the board and make opening moves
            that set up wins.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── Step 1: Scan the Board ── */}
        <CardSection id="scan">
          <SectionHeading
            sub="Before You Move"
            id="scan-heading"
            icon={"\ud83d\udd0d"}
          >
            Step 1: Scan the Full Board
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Resist the urge to make the first obvious move. In FreeCell,
              all 52 cards are visible from the start &mdash; this is your
              superpower. Spend 10&ndash;15 seconds scanning before you touch
              anything. Here&apos;s what to look for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Locate all four Aces.</strong> Note which column each
                Ace is in and how deep it&apos;s buried. An Ace on top of a
                column is free. An Ace buried under 5 cards is a project.
              </li>
              <li>
                <strong>Find the 2s and 3s.</strong> These are your next
                priority after Aces. A free Ace is useless if its matching
                2 is buried at the bottom of the longest column.
              </li>
              <li>
                <strong>Identify short columns.</strong> Columns with 5 or
                fewer cards are candidates for early emptying. An empty
                column is the most powerful resource in FreeCell.
              </li>
              <li>
                <strong>Spot natural sequences.</strong> Look for cards
                already in alternating-color descending order. These can be
                moved together, saving free cells.
              </li>
              <li>
                <strong>Check column lengths.</strong> Columns 1&ndash;4 start
                with 7 cards, columns 5&ndash;8 with 6 cards. The shorter
                columns are often your best opportunities.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Step 2: Prioritize Ace Liberation ── */}
        <CardSection id="ace-liberation">
          <SectionHeading
            sub="The Foundation Priority"
            id="ace-liberation-heading"
            icon={"\u2660"}
          >
            Step 2: Plan Your Ace Liberation
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The most common reason FreeCell games become unwinnable is
              failure to free Aces early enough. Here&apos;s how to
              prioritize:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Most buried Ace first.</strong> If one Ace has 6 cards
                on top of it and another has 2, work toward the deeply buried
                one first. The shallow Ace will be easy to get later; the
                deep one needs a plan now.
              </li>
              <li>
                <strong>Check the matching 2.</strong> An Ace is only useful
                if its 2 is also reachable. If the A&#9824; is free but the
                2&#9824; is buried under 5 cards, sending the Ace to the
                foundation gains you very little. Consider which Ace-2 pair
                is most accessible <em>as a pair</em>.
              </li>
              <li>
                <strong>Count the moves.</strong> For each buried Ace, count
                exactly how many cards need to move to free it, and where
                each of those cards can go. If it takes 4 moves and 2 free
                cells, that&apos;s a significant investment. If it takes 1
                move, do it immediately.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Step 3: Free Cell Discipline ── */}
        <CardSection id="free-cells">
          <SectionHeading
            sub="Your Most Precious Resource"
            id="free-cells-heading"
            icon={"\u2663"}
          >
            Step 3: Protect Your Free Cells
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Free cells are the currency of FreeCell. Each occupied cell
              reduces the size of sequences you can move (the supermove
              formula is <span className="font-mono">(1 + free cells)
              &times; 2<sup>empty columns</sup></span>). In the opening,
              free cell discipline is critical:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Use free cells only with a plan.</strong> Before
                parking a card, know exactly when and where it will come
                back out. &quot;I&apos;ll figure it out later&quot; is how
                games die.
              </li>
              <li>
                <strong>Prefer tableau-to-tableau moves.</strong> If you can
                accomplish the same goal by moving cards between columns
                instead of using a free cell, always choose the tableau move.
              </li>
              <li>
                <strong>Match ins and outs.</strong> If you put a card in a
                free cell, your very next sequence of moves should ideally
                get it back out. Think of free cells as a revolving door,
                not storage.
              </li>
              <li>
                <strong>First free cell = fine. Third = danger.</strong> Using
                one free cell in the opening is normal. Using three means
                you&apos;re probably in trouble. If you find yourself filling
                3+ cells in the first 10 moves, reconsider your approach.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Step 4: Empty Column Creation ── */}
        <CardSection id="empty-columns">
          <SectionHeading
            sub="The Power Play"
            id="empty-columns-heading"
            icon={"\u2665"}
          >
            Step 4: Create Empty Columns Early
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              An empty column is worth more than a free cell. A free cell
              holds one card; an empty column can hold an entire sequence.
              The supermove formula doubles your capacity for each empty
              column.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Target the shortest column.</strong> A 6-card column
                needs only 6 moves to empty. A 7-card column needs 7. Even
                one card fewer makes a meaningful difference.
              </li>
              <li>
                <strong>Look for cascading opportunities.</strong> Sometimes
                clearing one column causes a chain reaction: moving its cards
                to other columns creates natural sequences that partially
                clear those columns too.
              </li>
              <li>
                <strong>Don&apos;t fill it immediately.</strong> Once you
                create an empty column, resist the urge to immediately park
                a card there. Keep it empty as long as possible &mdash; its
                value comes from flexibility.
              </li>
              <li>
                <strong>One empty column changes everything.</strong> With 4
                free cells and 1 empty column, you can move sequences of up
                to 10 cards. With 4 free cells and 0 empty columns, only 5.
                That&apos;s a 2x improvement from a single empty column.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Opening Patterns ── */}
        <CardSection id="patterns">
          <SectionHeading
            sub="Common Patterns"
            id="patterns-heading"
            icon={"\u2666"}
          >
            Recognizing Opening Patterns
          </SectionHeading>

          <ContentBody className="space-y-5">
            <h3 className="font-semibold text-[#2a2522] text-base">
              The Free Ace
            </h3>
            <p>
              When an Ace sits on top of a column (position 1), immediately
              move it to the foundation. If its matching 2 is also near the
              top of another column, you may be able to start a foundation
              run in the first few moves. This is the best possible opening
              &mdash; you reduce the board by 2+ cards with zero cost.
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              The Short Column Clear
            </h3>
            <p>
              A 6-card column where 4&ndash;5 of the cards can naturally
              stack onto other columns is a golden opportunity. If you can
              empty it within 5&ndash;6 moves using only 1 free cell, do it.
              The empty column will pay for itself many times over.
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              The Buried King Problem
            </h3>
            <p>
              A King buried in the middle of a long column is a structural
              problem. Kings can&apos;t be placed on anything &mdash; they
              can only go in empty columns. If a King is blocking access to
              an Ace, you&apos;ll need to create an empty column specifically
              for that King. Recognize this pattern early so you can plan
              around it.
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              The Natural Run
            </h3>
            <p>
              Sometimes the deal gives you a partial alternating-color
              sequence already in place: for example, 8&#9824;&ndash;7&#9829;
              &ndash;6&#9827; in the same column. These are gifts. Build on
              top of them when possible, and avoid breaking them apart unless
              absolutely necessary. Natural runs reduce the number of
              individual moves you need.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Cheat Sheet ── */}
        <CardSection id="cheat-sheet">
          <SectionHeading
            sub="Quick Reference"
            id="cheat-sheet-heading"
            icon={"\ud83d\udccb"}
          >
            Opening Strategy Cheat Sheet
          </SectionHeading>

          <ContentBody>
            <div className="bg-[#B8860B]/[0.05] rounded-lg p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">1.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Scan all 52 cards.</strong> Locate Aces, 2s, short
                  columns, and natural sequences.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">2.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Move free Aces/2s to foundations immediately.</strong> No
                  reason to keep them on the tableau.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">3.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Plan buried Ace liberation.</strong> Count moves needed;
                  target the deepest Ace first.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">4.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Preserve free cells.</strong> Use 0&ndash;1 in the
                  first 10 moves if possible.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">5.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Create an empty column.</strong> Target the shortest
                  column; keep it empty as long as possible.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">6.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Build natural sequences.</strong> Extend existing
                  alternating-color runs; don&apos;t break them.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#B8860B] font-bold text-sm shrink-0">7.</span>
                <p className="text-sm text-[#2a2522]">
                  <strong>Look 3&ndash;5 moves ahead.</strong> Every move
                  should be part of a planned sequence, not a reaction.
                </p>
              </div>
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

        <AdUnit className="-my-1" />

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Level Up" id="related-heading" icon={"\ud83d\udcda"}>
            More Strategy Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/strategy" className="text-[#B8860B] hover:underline text-sm">
                  Complete FreeCell Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Tips &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-mistakes-to-avoid" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Mistakes to Avoid &rarr;
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Win Rates &amp; Statistics &rarr;
                </Link>
              </li>
              <li>
                <Link href="/hard-freecell-games" className="text-[#B8860B] hover:underline text-sm">
                  Hard FreeCell Games &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solver" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Solver &rarr;
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Glossary &rarr;
                </Link>
              </li>
              <li>
                <Link href="/how-to-play" className="text-[#B8860B] hover:underline text-sm">
                  How to Play FreeCell &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Put It Into Practice"
          body="The best way to learn opening strategy is to play. Try scanning the board for 15 seconds before each game."
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
