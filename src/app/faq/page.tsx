import Link from "next/link";
import type { Metadata } from "next";

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
    icon: "♠",
    items: [
      {
        question: "What is FreeCell Solitaire?",
        answer:
          "FreeCell is a solitaire card game played with a standard 52-card deck. Unlike most solitaire games, all cards are dealt face-up from the start, making it almost entirely a game of skill rather than luck. The goal is to move all 52 cards to four foundation piles, building each suit from Ace to King. It was popularized by Microsoft when they included it in Windows 95, and it remains one of the most beloved card games in the world.",
      },
      {
        question: "Is every FreeCell game winnable?",
        answer:
          "Almost! Of the original 32,000 Microsoft FreeCell numbered deals, only one — deal #11982 — has been proven impossible to solve. Mathematically, approximately 99.999% of all randomly dealt FreeCell games have at least one solution. This is what makes FreeCell so uniquely rewarding: when you lose, it's nearly always because of a strategic mistake, not because the deal was impossible. That said, some deals are significantly harder than others, and even expert players occasionally encounter deals that require extraordinary effort to solve.",
      },
      {
        question: "What are the free cells?",
        answer:
          "The free cells are four empty spaces in the upper-left corner of the board. They serve as temporary storage — you can move any single exposed card to an empty free cell at any time. However, each free cell can only hold one card. The number of empty free cells directly affects how many cards you can move at once, so keeping them empty is a critical strategic priority. Think of free cells as your breathing room: the more you have available, the more complex moves you can execute.",
      },
      {
        question: "What are the foundation piles?",
        answer:
          "Foundation piles are the four spaces in the upper-right corner of the board. Your ultimate goal is to build each foundation from Ace to King in a single suit. Once a card is placed on a foundation, it's considered complete. When all 52 cards are on the four foundations (13 cards each, one per suit), you win the game. Most FreeCell implementations automatically move cards to foundations when it's safe to do so, saving you time.",
      },
    ],
  },
  {
    title: "Rules & Gameplay",
    icon: "♥",
    items: [
      {
        question: "How is FreeCell different from Klondike (classic) solitaire?",
        answer:
          "FreeCell and Klondike differ in several important ways. In FreeCell, all 52 cards are dealt face-up from the start — there are no hidden cards and no stock pile to draw from. This makes FreeCell almost entirely a game of skill. In Klondike, cards are partially hidden and you draw from a stock pile, introducing a significant element of luck. FreeCell also has four dedicated temporary storage spaces (free cells) that don't exist in Klondike. The win rate for FreeCell is much higher (99.999% of deals are solvable) compared to Klondike (roughly 80% of deals are solvable, and far fewer are won in practice).",
      },
      {
        question: "How many cards can I move at once?",
        answer:
          "Technically, the official FreeCell rules only allow moving one card at a time. However, most computer implementations (including ours) allow you to move an ordered sequence of cards as a shortcut — a 'supermove' — as long as there are enough empty free cells and empty columns to perform the individual moves theoretically. The formula is: (1 + empty free cells) × 2^(empty columns) = maximum movable cards. For example, with 2 empty free cells and 1 empty column, you can move up to 6 cards at once. With all 4 free cells empty and no empty columns, you can move 5 cards.",
      },
      {
        question: "What's the color alternation rule?",
        answer:
          "When building sequences on cascades (the main columns), cards must be placed in descending rank and alternating colors. For example: a red 5 can be placed on a black 6, and a black Jack can be placed on a red Queen. You cannot place a card on another card of the same color (black on black or red on red), even if the rank is correct. This rule only applies to cascade building — foundation piles are built by suit regardless of color.",
      },
      {
        question: "What happens when I empty a column?",
        answer:
          "When a cascade column is completely emptied, any card or any valid sequence of cards can be moved into it. Empty columns are extremely valuable — even more valuable than free cells — because they can hold multiple cards. Each empty column doubles the number of cards you can move in a single supermove. Experienced players treat empty columns as their most precious resource and think carefully before filling them.",
      },
      {
        question: "What does 'auto-move' mean?",
        answer:
          "Auto-move is a convenience feature where cards are automatically moved to the foundation piles when it's completely safe to do so. A card is 'safe' to auto-move when no other card in the cascades or free cells could possibly need to be placed on top of it. For example, if both black 3s are already on their foundations, it's safe to auto-move any red 4 because no card will ever need to go on top of a red 4 in a cascade. Auto-move saves time and reduces unnecessary clicks without affecting strategy.",
      },
    ],
  },
  {
    title: "Strategy & Winning",
    icon: "♦",
    items: [
      {
        question: "What is a good FreeCell win percentage?",
        answer:
          "Win rates vary significantly by experience level. Beginners typically win 30–50% of their games. Intermediate players who understand the basic strategies win 65–80%. Advanced players consistently achieve 80–90%. Expert players — those who have fully mastered opening analysis, supermove calculation, and cascade management — can reach 90–95% or higher. Since almost every deal is solvable, your win rate is a direct measure of your strategic skill, making FreeCell an excellent game for tracking personal improvement over time.",
      },
      {
        question: "What's the single most important FreeCell strategy?",
        answer:
          "If we had to pick one tip, it would be: keep your free cells and empty columns as clear as possible. Everything in FreeCell flows from having available space. The supermove formula directly depends on empty spaces, and every occupied free cell or filled column reduces your ability to execute complex moves. Experienced players constantly ask themselves: 'How can I accomplish this while using the fewest temporary spaces?' Treating empty spaces as your most valuable resource is the single change that improves win rates the most.",
      },
      {
        question: "Should I always move Aces to the foundation immediately?",
        answer:
          "Yes — there is never a reason not to move an Ace to the foundation. An Ace cannot have any card placed on top of it in a cascade (it's the lowest rank), so it can never be useful in the tableau. The same applies to 2s once their corresponding Ace is on the foundation. Moving low cards to the foundation early frees up space and starts the chain of building that will eventually win the game. Our game auto-moves these cards for you when they're safe to play.",
      },
      {
        question: "How do I get better at FreeCell?",
        answer:
          "The fastest path to improvement involves three habits. First, always scan the entire board before making your first move — locate the Aces, identify buried low cards, and spot potential empty columns. Second, use the undo button freely to explore different move sequences without committing. This builds intuition faster than anything else. Third, keep your free cells and empty columns clear as long as possible. These three habits alone can move a beginner from a 40% win rate to 70%+ within a few weeks of regular play. For more detailed strategies, check out our comprehensive Strategy Guide.",
      },
    ],
  },
  {
    title: "About Our Game",
    icon: "♣",
    items: [
      {
        question: "Does the deal number matter?",
        answer:
          "Yes! Each deal number produces a specific, reproducible arrangement of cards. This means you can share a deal number with friends and compete on the exact same layout. It also means you can retry a specific deal if you want to find a better solution or improve your approach. Our deals #1 through #32,000 use the same algorithm as the original Microsoft FreeCell, so they produce identical card layouts. This compatibility means you can look up known solutions and difficulty ratings for specific deal numbers.",
      },
      {
        question: "Can I play FreeCell on my phone?",
        answer:
          "Absolutely! PlayFreeCellOnline.com is designed to work beautifully on any device — desktop, tablet, or mobile phone. The interface automatically adapts to your screen size for optimal gameplay. It's also a Progressive Web App (PWA), which means you can install it directly to your home screen for an app-like experience with no download required from any app store. Just visit the site in your mobile browser and use the 'Add to Home Screen' option.",
      },
      {
        question: "Is this game really free?",
        answer:
          "Yes, completely free. There's no premium version, no pay-to-win mechanics, no locking features behind a paywall, and no required account creation. You can play unlimited games with full access to all features — undo, hints, deal selection, and more — without spending a cent. We believe the best card games should be accessible to everyone.",
      },
      {
        question: "Does the game work offline?",
        answer:
          "Yes! Because PlayFreeCellOnline.com is a Progressive Web App, it works offline after your first visit. The game is cached in your browser, so you can play even when you don't have an internet connection — perfect for flights, commutes, or anywhere with spotty WiFi. Just make sure to visit the site at least once while connected to the internet so the game files can be downloaded and cached.",
      },
    ],
  },
];

/* ── Helpers ── */

function SectionHeading({
  children,
  id,
  sub,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
}) {
  return (
    <div className="mb-6">
      {sub && (
        <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-1 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#062516]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {children}
      </h2>
    </div>
  );
}

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
      className="h-screen overflow-y-auto scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #0F3F24 0%, #062516 60%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 text-center overflow-hidden">
        {/* Decorative suit watermarks */}
        <div
          className="absolute top-8 left-[12%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          ♠
        </div>
        <div
          className="absolute top-20 right-[10%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          ♥
        </div>
        <div
          className="absolute bottom-6 right-[15%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          ♣
        </div>

        {/* Breadcrumbs */}
        <nav
          className="max-w-4xl mx-auto mb-8 text-sm text-white/50"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link href="/" className="hover:text-white/80 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">FAQ</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Frequently Asked{" "}
          <span className="text-[#D4AF37]">Questions</span>
        </h1>
        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about FreeCell Solitaire — from basic
          rules to advanced strategy and our game features.
        </p>

        {/* Gold divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">♠ ♥ ♦ ♣</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Quick Jump ── */}
      <nav className="max-w-4xl mx-auto px-4 mb-10">
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 sm:p-5">
          <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-widest mb-3">
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white transition-colors border border-white/[0.08]"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {faqCategories.map((category) => {
          const categoryId = category.title
            .toLowerCase()
            .replace(/[^a-z]+/g, "-");
          const isRedSuit =
            category.icon === "♥" || category.icon === "♦";

          return (
            <section
              key={category.title}
              id={categoryId}
              className="scroll-mt-6 mb-8"
            >
              <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)] p-5 sm:p-8">
                <SectionHeading sub={category.title} id={`${categoryId}-heading`}>
                  <span
                    className={`mr-2 ${isRedSuit ? "text-red-500" : "text-gray-800"}`}
                  >
                    {category.icon}
                  </span>
                  {category.title}
                </SectionHeading>

                <div className="space-y-3">
                  {category.items.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-[#f8f6f0] rounded-lg border border-[#e8e4d8] overflow-hidden"
                    >
                      <summary className="cursor-pointer select-none list-none p-4 sm:p-5 flex items-start gap-3 hover:bg-[#f3f0e8] transition-colors">
                        <span className="text-[#D4AF37] font-bold text-lg leading-none mt-0.5 shrink-0">
                          Q
                        </span>
                        <span className="font-semibold text-[#062516] flex-1 leading-snug">
                          {faq.question}
                        </span>
                        <span className="text-gray-400 text-sm shrink-0 transition-transform duration-200 group-open:rotate-180 mt-0.5">
                          ▾
                        </span>
                      </summary>
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                        <div className="border-t border-[#e8e4d8] pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── Still have questions? ── */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)] p-5 sm:p-8 text-center">
            <h2
              className="text-2xl font-bold text-[#062516] mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              The best way to learn FreeCell is to play. Start a game and
              experiment — use undo freely, try different approaches, and
              you&apos;ll develop intuition faster than any guide can teach.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link
                href="/how-to-play"
                className="px-4 py-2 rounded-lg bg-[#062516]/5 text-[#062516] font-medium hover:bg-[#062516]/10 transition-colors"
              >
                Read the Full Rules
              </Link>
              <Link
                href="/strategy"
                className="px-4 py-2 rounded-lg bg-[#062516]/5 text-[#062516] font-medium hover:bg-[#062516]/10 transition-colors"
              >
                Strategy Guide
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-[#0a4a2a] to-[#062516] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25)] p-8 sm:p-10 text-center relative overflow-hidden">
            <div
              className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
              aria-hidden="true"
            >
              ♥
            </div>
            <div
              className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
              aria-hidden="true"
            >
              ♦
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ready to Play?
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Now that you know everything about FreeCell, put your knowledge
              to the test. Every deal is waiting to be solved.
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
        </section>

        {/* ── Cross-links ── */}
        <footer className="text-center text-sm text-white/40 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-to-play"
              className="hover:text-white/70 transition-colors"
            >
              How to Play
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/strategy"
              className="hover:text-white/70 transition-colors"
            >
              Strategy Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/" className="hover:text-white/70 transition-colors">
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
