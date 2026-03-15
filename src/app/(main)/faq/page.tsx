import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, SectionHeading, CardSection, ContentBody, TocPills, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "FreeCell FAQ | Answers to Every Question About FreeCell Solitaire",
  description:
    "Frequently asked questions about FreeCell Solitaire. Is every game winnable? How many cards can you move? What's a good win rate? Get expert answers to all your FreeCell questions.",
  keywords: [
    "freecell faq",
    "freecell questions",
    "is freecell winnable",
    "freecell solitaire help",
    "freecell rules questions",
    "freecell how to win",
  ],
};

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "basics",
    title: "Game Basics",
    icon: "\u2660",
    items: [
      {
        question: "What is FreeCell Solitaire?",
        answer:
          "FreeCell is a solitaire card game played with a standard 52-card deck. Unlike most solitaire variants, every card is dealt face-up from the start — no luck involved, just pure skill. Your goal is to move all 52 cards to four foundation piles, building each suit from Ace to King.",
      },
      {
        question: "Is every FreeCell game winnable?",
        answer:
          "Almost. Of the original 32,000 Microsoft FreeCell numbered deals, only one (deal #11982) has been proven impossible. About 99.999% of all randomly dealt games have at least one solution. So when you lose, it\u2019s almost always a strategic mistake, not a bad deal.",
      },
      {
        question: "How do you win a game of FreeCell?",
        answer: (
          <>
            You win by moving all 52 cards to the four foundation piles, one per
            suit, stacked from Ace up to King. Most digital versions auto-complete
            the game once every remaining card is in proper descending order. For
            a deeper walkthrough, see our{" "}
            <Link
              href="/how-to-play"
              className="text-[#8B6914] hover:underline"
            >
              How to Play guide
            </Link>
            .
          </>
        ),
      },
      {
        question: "How many cards are in a FreeCell game?",
        answer:
          "A standard 52-card deck — 13 cards per suit (Ace through King), four suits (Spades, Hearts, Diamonds, Clubs). All 52 are dealt face-up into 8 columns at the start. The first four columns get 7 cards each and the last four get 6.",
      },
      {
        question: "Is FreeCell the same as Solitaire?",
        answer:
          "FreeCell is a type of solitaire, but it\u2019s very different from Klondike (the game most people call \u201CSolitaire\u201D). In Klondike, cards are hidden and you draw from a stock pile. In FreeCell, every card is visible from the start and there\u2019s no stock pile. FreeCell is almost entirely skill-based, while Klondike involves significant luck.",
      },
    ],
  },
  {
    id: "rules",
    title: "Rules & Gameplay",
    icon: "\u2665",
    items: [
      {
        question: "How is FreeCell different from Klondike?",
        answer:
          "The biggest difference: in FreeCell, all 52 cards are dealt face-up. No hidden cards, no stock pile to draw from. FreeCell also gives you four temporary storage spaces (free cells) that Klondike doesn\u2019t have. Win rates are also much higher in FreeCell due to the total information available.",
      },
      {
        question: "How many cards can I move at once?",
        answer: (
          <>
            Technically, official FreeCell rules only let you move one card at a
            time. But most computer versions allow{" "}
            <Link
              href="/glossary#supermove"
              className="text-[#8B6914] hover:underline"
            >
              supermoves
            </Link>{" "}
            — moving an ordered sequence as a shortcut, as long as there are
            enough empty free cells and columns to theoretically do the
            individual moves. The formula is: (1 + empty free cells) &times;
            2<sup>empty columns</sup>.
          </>
        ),
      },
      {
        question: "Can you move multiple cards between columns?",
        answer:
          "Yes, as long as the cards form a valid descending sequence with alternating colors, and you have enough empty free cells and columns to support the move. For example, you can move a red 5 on a black 6 as a pair if you have at least one empty free cell or column available.",
      },
      {
        question: "What happens when you run out of moves?",
        answer:
          "If all four free cells are full, no columns are empty, and no card can legally be placed on another card or foundation, the game is lost. Use the undo button to backtrack and try a different approach. Most \u201Cstuck\u201D positions are avoidable with better planning earlier in the game.",
      },
      {
        question: "What are the four empty spaces for?",
        answer: (
          <>
            The four spaces in the top-left are{" "}
            <Link
              href="/glossary#free-cell"
              className="text-[#8B6914] hover:underline"
            >
              free cells
            </Link>{" "}
            — temporary parking spots that each hold exactly one card. They give
            you breathing room to reorganize the tableau. But fill them all and
            you&apos;re nearly paralyzed — keeping them empty is one of the most
            important{" "}
            <Link href="/strategy" className="text-[#8B6914] hover:underline">
              strategic principles
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy & Winning",
    icon: "\u2666",
    items: [
      {
        question: "What is a good FreeCell win percentage?",
        answer:
          "It depends on experience. Beginners typically win 30\u201350%. Intermediate players hit 65\u201380%. Advanced players land in the 80\u201390% range. Experts consistently clear 90%+. Since nearly every deal is solvable, your win rate is a direct reflection of your foresight and planning ability.",
      },
      {
        question: "What\u2019s the best first move in FreeCell?",
        answer: (
          <>
            There\u2019s no universal best first move, but the best approach is
            to scan the entire board for 30 seconds before touching anything.
            Look for exposed Aces, buried low cards, and natural sequences
            already in place. Your first move should usually uncover a buried Ace
            or create space. Our{" "}
            <Link href="/strategy" className="text-[#8B6914] hover:underline">
              Strategy Guide
            </Link>{" "}
            covers opening play in depth.
          </>
        ),
      },
      {
        question: "How do I get better at FreeCell?",
        answer: (
          <>
            Focus on three habits: (1) always scan the board before your first
            move, (2) keep free cells empty as long as possible, and (3) plan
            3\u20135 moves ahead instead of making obvious moves. Use the undo
            button to explore different lines. Most players see major improvement
            within 20\u201330 games of deliberate practice. See our{" "}
            <Link href="/tips" className="text-[#8B6914] hover:underline">
              25 Tips & Tricks
            </Link>{" "}
            for specific actionable advice.
          </>
        ),
      },
      {
        question: "What is a supermove?",
        answer: (
          <>
            A supermove lets you move multiple cards at once between columns,
            as long as there are enough empty free cells and columns to
            theoretically move them one at a time. The formula is: (1 + empty
            free cells) &times; 2<sup>empty columns</sup>. With 2 empty free
            cells and 1 empty column, you can move 6 cards at once. Learn more
            in our{" "}
            <Link
              href="/how-to-play#supermoves"
              className="text-[#8B6914] hover:underline"
            >
              How to Play guide
            </Link>
            .
          </>
        ),
      },
      {
        question: "Should I use free cells or empty columns?",
        answer:
          "Empty columns are almost always more valuable. A free cell holds exactly one card, while an empty column can hold an entire sequence. Empty columns also double your supermove capacity exponentially. Use free cells only as a last resort and clear them as quickly as possible.",
      },
      {
        question: "Does FreeCell Online have keyboard shortcuts?",
        answer:
          "Yes. On desktop, you can play entirely with the keyboard. Press 1\u20138 for cascade columns, A/S/D/F for free cells, Q/W/E/R (or F1\u2013F4) to move cards to foundations. Z undoes, Y redoes, H gives a hint, and N starts a new game. Press ? at any time to see all available shortcuts.",
      },
    ],
  },
];

export default function FAQPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl('/faq') },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof faq.answer === "string" ? faq.answer : faq.question,
        },
      }))
    ),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell FAQ"
        subtitle="Everything you need to know about the mechanics, rules, and strategy of FreeCell."
      />

      {/* ── TOC Pills ── */}
      <TocPills
        items={faqCategories.map((cat) => ({
          href: `#${cat.id}`,
          icon: cat.icon,
          label: cat.title,
        }))}
      />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {faqCategories.map((category, catIndex) => (
          <section key={category.id} id={category.id} className="scroll-mt-6">
            <CardSection>
              <SectionHeading
                sub={`${category.items.length} Questions`}
                id={`${category.id}-heading`}
                icon={category.icon}
              >
                {category.title}
              </SectionHeading>

              <ContentBody className="space-y-4">
                {category.items.map((faq, i) => (
                  <div key={i} className="card-inset rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-[#8B6914] font-bold text-lg shrink-0 mt-0.5">
                        Q
                      </span>
                      <div className="flex-1">
                        <h3
                          className="font-medium text-[#2a2522] text-lg mb-2"
                          style={{
                            fontFamily:
                              "var(--font-playfair), Georgia, serif",
                          }}
                        >
                          {faq.question}
                        </h3>
                        <p className="text-[#444444] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ContentBody>
            </CardSection>

            {catIndex === 1 && <AdUnit className="mt-8" />}
          </section>
        ))}

        {/* ── CTA ── */}
        <CtaSection
          body={
            <>
              Now that you have the answers, put your knowledge to work at the
              table.
            </>
          }
          secondaryLabel="Learn Strategy"
          secondaryHref="/strategy"
        />
      </main>
    </ContentLayout>
  );
}
