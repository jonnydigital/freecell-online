import Link from "next/link";
import type { Metadata } from "next";
import { AccordionItem } from "@/components/AccordionItem";

export const metadata: Metadata = {
  title:
    "FreeCell FAQ | Answers to Every Question About FreeCell Solitaire",
  description:
    "Frequently asked questions about FreeCell Solitaire. Is every game winnable? How many cards can you move? What's a good win rate? Get expert answers to all your FreeCell questions.",
  keywords: [
    "freecell faq",
    "freecell questions",
    "is freecell winnable",
    "freecell rules questions",
    "freecell solitaire help",
    "freecell vs klondike",
    "freecell tips",
  ],
  openGraph: {
    title: "FreeCell FAQ | Answers to Every FreeCell Question",
    description:
      "Expert answers to the most common FreeCell Solitaire questions. Rules, strategy, win rates, and more.",
    url: "https://playfreecellonline.com/faq",
    siteName: "PlayFreeCellOnline.com",
    type: "website",
  },
};

/* ── Types & data ── */

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  icon: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "Game Basics",
    icon: "\u2660",
    items: [
      {
        question: "What is FreeCell Solitaire?",
        answer:
          "FreeCell is a solitaire card game played with a standard 52-card deck. Unlike most solitaire variants, every card is dealt face-up from the start. No luck involved, just pure skill. Your goal is to move all 52 cards to four foundation piles, building each suit from Ace to King. Microsoft bundled it with Windows 95, and it's been one of the most popular card games ever since.",
      },
      {
        question: "Is every FreeCell game winnable?",
        answer:
          "Almost. Of the original 32,000 Microsoft FreeCell numbered deals, only one (deal #11982) has been proven impossible. About 99.999% of all randomly dealt games have at least one solution. So when you lose, it's almost always a strategic mistake, not a bad deal. Some deals are definitely harder than others, though, and even expert players run into ones that take serious effort to crack.",
      },
      {
        question: "What are the free cells?",
        answer:
          "The free cells are four empty spaces in the upper-left corner of the board. They're temporary storage. You can move any single exposed card to an empty free cell at any time, but each cell only holds one card. The number of empty free cells directly affects how many cards you can move at once, so keeping them clear is a top priority. Think of them as breathing room. The more you have open, the more complex moves you can pull off.",
      },
      {
        question: "What are the foundation piles?",
        answer:
          "Foundation piles are the four spaces in the upper-right corner. Your goal is to build each one from Ace to King in a single suit. Once a card lands on a foundation, it's done. When all 52 cards are on the four foundations (13 per suit), you win. Most FreeCell games auto-move cards to foundations when it's safe, which saves you time.",
      },
    ],
  },
  {
    title: "Rules & Gameplay",
    icon: "\u2665",
    items: [
      {
        question: "How is FreeCell different from Klondike (classic) solitaire?",
        answer:
          "The biggest difference: in FreeCell, all 52 cards are dealt face-up. No hidden cards, no stock pile to draw from, so it's almost entirely skill-based. Klondike hides cards and uses a draw pile, which adds a big luck factor. FreeCell also gives you four temporary storage spaces (free cells) that Klondike doesn't have. Win rates tell the story. 99.999% of FreeCell deals are solvable, compared to roughly 80% for Klondike (and far fewer are actually won in practice).",
      },
      {
        question: "How many cards can I move at once?",
        answer:
          "Technically, official FreeCell rules only let you move one card at a time. But most computer versions (including ours) let you move an ordered sequence as a shortcut, called a supermove, as long as there are enough empty free cells and columns to theoretically do the individual moves. The formula: (1 + empty free cells) \u00d7 2^(empty columns) = max movable cards. So with 2 empty free cells and 1 empty column, you can move up to 6 cards at once. With all 4 free cells empty and no empty columns, you can move 5.",
      },
      {
        question: "What\u2019s the color alternation rule?",
        answer:
          "When building sequences on the cascades (the main columns), cards must go in descending rank with alternating colors. A red 5 goes on a black 6. A black Jack goes on a red Queen. You can't place a card on another card of the same color, even if the rank is right. This rule only applies to cascade building. Foundation piles are built by suit regardless of color.",
      },
      {
        question: "What happens when I empty a column?",
        answer:
          "When you completely empty a cascade column, you can move any card or valid sequence into it. Empty columns are incredibly valuable, even more so than free cells, because they can hold multiple cards. Each empty column doubles how many cards you can move in a single supermove. Experienced players treat empty columns as their most precious resource and think hard before filling them.",
      },
      {
        question: "What does \u2018auto-move\u2019 mean?",
        answer:
          "Auto-move is a convenience feature that automatically sends cards to the foundation when it's completely safe. A card is safe to auto-move when nothing in the cascades or free cells could ever need to go on top of it. For example, if both black 3s are already on their foundations, any red 4 can be auto-moved safely because no card would ever need to go on a red 4 in a cascade. It saves clicks without affecting your strategy.",
      },
    ],
  },
  {
    title: "Strategy & Winning",
    icon: "\u2666",
    items: [
      {
        question: "What is a good FreeCell win percentage?",
        answer:
          "It depends on your experience. Beginners typically win 30-50% of their games. Intermediate players who know the basics hit 65-80%. Advanced players land in the 80-90% range. Experts who've mastered opening analysis, supermove math, and cascade management can reach 90-95% or higher. Since nearly every deal is solvable, your win rate is a direct reflection of your skill. It's a great way to track your progress.",
      },
      {
        question: "What\u2019s the single most important FreeCell strategy?",
        answer:
          "Keep your free cells and empty columns as clear as possible. Everything in FreeCell flows from having open space. The supermove formula depends directly on empty spaces, and every occupied cell or filled column limits what you can do. Good players are constantly asking themselves: 'How do I pull this off while using the fewest temporary spaces?' Treating empty spaces as your most valuable resource is the single biggest thing you can do to win more games.",
      },
      {
        question: "Should I always move Aces to the foundation immediately?",
        answer:
          "Yes, always. An Ace can't have any card placed on top of it in a cascade (it's the lowest rank), so it's never useful sitting in the tableau. Same goes for 2s once their matching Ace is on the foundation. Moving low cards up early frees space and starts the chain of building that wins the game. Our game auto-moves these cards for you when they're safe to play.",
      },
      {
        question: "How do I get better at FreeCell?",
        answer:
          "Focus on three habits. First, scan the entire board before your first move. Find the Aces, spot buried low cards, and look for potential empty columns. Second, use undo freely to explore different move sequences without committing. This builds intuition faster than anything else. Third, keep your free cells and empty columns clear as long as possible. These three habits alone can take you from a 40% win rate to 70%+ within a few weeks. For more depth, check out our Strategy Guide.",
      },
    ],
  },
  {
    title: "About Our Game",
    icon: "\u2663",
    items: [
      {
        question: "Does the deal number matter?",
        answer:
          "Yes. Each deal number produces a specific arrangement of cards. You can share a number with friends and compete on the exact same layout, or retry a deal to find a better solution. Our deals #1 through #32,000 use the same algorithm as the original Microsoft FreeCell, so the card layouts are identical. You can look up known solutions and difficulty ratings for any of those deal numbers.",
      },
      {
        question: "Can I play FreeCell on my phone?",
        answer:
          "Yes. PlayFreeCellOnline.com works on any device: desktop, tablet, or phone. The interface adapts to your screen size automatically. It's also a Progressive Web App (PWA), so you can install it to your home screen for an app-like experience. No app store download needed. Just visit the site in your mobile browser and tap 'Add to Home Screen.'",
      },
      {
        question: "Is this game really free?",
        answer:
          "Yes, 100% free. No premium version, no pay-to-win, no features locked behind a paywall, and no account required. You get unlimited games with full access to everything: undo, hints, deal selection, all of it. We think the best card games should be available to everyone.",
      },
      {
        question: "Does the game work offline?",
        answer:
          "Yes. Since PlayFreeCellOnline.com is a Progressive Web App, it works offline after your first visit. The game gets cached in your browser, so you can play without an internet connection. Great for flights, commutes, or anywhere with bad WiFi. Just visit the site once while you're connected so the game files can download.",
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    ),
  };

  return (
    <div
      className="h-screen overflow-y-auto scroll-smooth felt-bg"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        {/* Decorative suit watermarks */}
        <div
          className="absolute top-8 left-[12%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>
        <div
          className="absolute top-20 right-[10%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2665"}
        </div>
        <div
          className="absolute bottom-6 right-[15%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>

        {/* Breadcrumbs */}
        <nav
          className="max-w-3xl mx-auto mb-8 text-sm text-[#6B7280]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link
                href="/"
                className="hover:text-white/80 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">FAQ</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Your questions about FreeCell Solitaire, answered. Rules, strategy,
          and game features all covered.
        </p>

        {/* Gold divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Category Nav ── */}
      <nav className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {faqCategories.map((cat) => {
            const isRedSuit = cat.icon === "\u2665" || cat.icon === "\u2666";
            return (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
              >
                <span
                  className={`text-sm ${isRedSuit ? "text-red-400" : ""}`}
                >
                  {cat.icon}
                </span>
                {cat.title}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {faqCategories.map((category) => {
          const categoryId = category.title
            .toLowerCase()
            .replace(/[^a-z]+/g, "-");
          const isRedSuit =
            category.icon === "\u2665" || category.icon === "\u2666";

          return (
            <section
              key={category.title}
              id={categoryId}
              className="scroll-mt-6"
            >
              <div className="card-panel">
                {/* Category heading — integrated into card body */}
                <div className="px-10 sm:px-12 pt-8 pb-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
                    {category.title}
                  </span>
                  <h2
                    id={`${categoryId}-heading`}
                    className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    <span
                      className={`mr-2 ${isRedSuit ? "text-red-500" : "text-[#c9a84c]"}`}
                    >
                      {category.icon}
                    </span>
                    {category.title}
                  </h2>
                  <div className="card-title-separator mt-5" />
                </div>

                {/* Accordion items */}
                {category.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Still have questions? ── */}
        <section>
          <div className="card-panel">
            <div className="px-8 sm:px-10 py-8 sm:py-10 text-center">
              <h2
                className="text-2xl font-bold text-[#2a2522] mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Still Have Questions?
              </h2>
              <div className="card-title-separator mx-auto max-w-[120px] mb-5" />
              <p className="text-[#5a5a5a] mb-5 max-w-lg mx-auto leading-relaxed">
                The best way to learn FreeCell is to play. Start a game,
                experiment, use undo freely, and try different approaches.
                You&apos;ll build intuition faster than any guide can teach.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <Link
                  href="/how-to-play"
                  className="px-5 py-2 rounded-full border border-[#D4AF37]/30 text-[#B8860B] font-medium hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all"
                >
                  Read the Full Rules
                </Link>
                <Link
                  href="/strategy"
                  className="px-5 py-2 rounded-full border border-[#D4AF37]/30 text-[#B8860B] font-medium hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all"
                >
                  Strategy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div
            className="card-panel"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2665"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2666"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Play?
              </h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                You&apos;ve got the knowledge. Time to put it to work. Every deal
                is waiting to be solved.
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                  backgroundSize: "200% 100%",
                  color: "#1a1a0a",
                }}
              >
                Play FreeCell Now
              </Link>
            </div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <footer className="text-center text-sm text-[#6B7280]/60 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-to-play"
              className="hover:text-[#6B7280] transition-colors"
            >
              How to Play
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/strategy"
              className="hover:text-[#6B7280] transition-colors"
            >
              Strategy Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/"
              className="hover:text-[#6B7280] transition-colors"
            >
              Play Free
            </Link>
          </div>
          <p className="mt-3 text-white/25">
            &copy; {new Date().getFullYear()} PlayFreeCellOnline.com
          </p>
        </footer>
      </main>
    </div>
  );
}
