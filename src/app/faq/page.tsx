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
      <header className="bg-[#072907] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="text-xl font-black uppercase tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            FAQ.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            Everything you need to know about the mechanics, rules, and history of FreeCell.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-3xl mx-auto px-6 py-24">
        {faqCategories.map((category) => (
          <section key={category.title} className="mb-24 last:mb-0">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-8">
              {category.title}
            </h2>
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {category.items.map((faq, i) => (
                <div key={i} className="py-8">
                  <h3 className="text-xl font-bold text-[#072907] mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter mb-12 inline-block">
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-16">
            <Link href="/how-to-play" className="hover:text-black transition-colors">How to Play</Link>
            <Link href="/strategy" className="hover:text-black transition-colors">Strategy</Link>
            <Link href="/about" className="hover:text-black transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          </div>
          <p className="text-gray-300 text-[10px] uppercase tracking-[0.2em]">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
