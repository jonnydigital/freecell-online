import Link from "next/link";
import type { Metadata } from "next";
import AdUnit from "../../components/AdUnit";
import { AccordionItem } from "@/components/AccordionItem";

export const metadata: Metadata = {
  title: "FreeCell FAQ | Answers to Every Question About FreeCell Solitaire",
  description: "Frequently asked questions about FreeCell Solitaire. Is every game winnable? How many cards can you move? What's a good win rate? Get expert answers to all your FreeCell questions.",
  keywords: ["freecell faq", "freecell questions", "is freecell winnable", "freecell solitaire help"],
};

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    title: "Game Basics",
    items: [
      {
        question: "What is FreeCell Solitaire?",
        answer: "FreeCell is a solitaire card game played with a standard 52-card deck. Unlike most solitaire variants, every card is dealt face-up from the start. No luck involved, just pure skill. Your goal is to move all 52 cards to four foundation piles, building each suit from Ace to King.",
      },
      {
        question: "Is every FreeCell game winnable?",
        answer: "Almost. Of the original 32,000 Microsoft FreeCell numbered deals, only one (deal #11982) has been proven impossible. About 99.999% of all randomly dealt games have at least one solution. So when you lose, it's almost always a strategic mistake, not a bad deal.",
      },
    ],
  },
  {
    title: "Rules & Gameplay",
    items: [
      {
        question: "How is FreeCell different from Klondike?",
        answer: "The biggest difference: in FreeCell, all 52 cards are dealt face-up. No hidden cards, no stock pile to draw from. FreeCell also gives you four temporary storage spaces (free cells) that Klondike doesn't have. Win rates are also much higher in FreeCell due to the total information available.",
      },
      {
        question: "How many cards can I move at once?",
        answer: "Technically, official FreeCell rules only let you move one card at a time. But most computer versions let you move an ordered sequence as a shortcut, called a supermove, as long as there are enough empty free cells and columns to theoretically do the individual moves.",
      },
    ],
  },
  {
    title: "Strategy & Winning",
    items: [
      {
        question: "What is a good FreeCell win percentage?",
        answer: "It depends on experience. Beginners typically win 30-50%. Intermediate players hit 65-80%. Advanced players land in the 80-90% range. Experts consistently clear 90%+. Since nearly every deal is solvable, your win rate is a reflection of your foresight.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      {/* ── Header ── */}
      <header className="bg-[#072907] text-white pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <Link href="/" className="text-sm font-black uppercase tracking-widest mb-8 hover:text-[#D4AF37] transition-colors">
          Freecell<span className="text-[#D4AF37]">.</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          FAQ
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Everything you need to know about the mechanics, rules, and history of FreeCell.
        </p>
      </header>

      {/* ── Main Content (Article Card) ── */}
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 relative -mt-8 mb-20 z-10">
        <article className="max-w-none">
          {faqCategories.map((category) => (
            <section key={category.title} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
                {category.title}
              </h2>
              <div className="divide-y divide-gray-100">
                {category.items.map((faq, i) => (
                  <div key={i} className="py-8 first:pt-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-lg font-black uppercase tracking-widest mb-8 inline-block">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
            <Link href="/how-to-play" className="hover:text-black transition-colors">How to Play</Link>
            <Link href="/strategy" className="hover:text-black transition-colors">Strategy</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
