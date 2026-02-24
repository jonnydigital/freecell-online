import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FreeCell FAQ | Common Questions About FreeCell Solitaire',
  description:
    'Frequently asked questions about FreeCell Solitaire. Learn about winnable games, scoring, strategy, and how FreeCell differs from other solitaire games.',
};

const faqs = [
  {
    question: 'Is every FreeCell game winnable?',
    answer:
      'Almost! Of the original 32,000 Microsoft FreeCell deals, only one (#11982) is proven to be unsolvable. In general, about 99.999% of randomly dealt FreeCell games have a solution, making it one of the most solvable solitaire variants.',
  },
  {
    question: 'What are free cells?',
    answer:
      'Free cells are the four empty spaces in the upper-left corner of the board. They act as temporary storage — you can move one card at a time to an empty free cell. The key strategy is to keep them as empty as possible to give yourself more flexibility for moves.',
  },
  {
    question: 'What are foundation piles?',
    answer:
      'Foundation piles are the four spaces in the upper-right corner. Your goal is to build each foundation from Ace to King in the same suit. Once a card is on a foundation, it\'s considered "done." The game is won when all 52 cards are on the foundations.',
  },
  {
    question: 'How is FreeCell different from Klondike solitaire?',
    answer:
      'Unlike Klondike (the classic solitaire most people know), all 52 cards in FreeCell are dealt face-up from the start. There\'s no hidden information and no stock pile to draw from. This makes FreeCell almost entirely a game of skill rather than luck.',
  },
  {
    question: 'How many cards can I move at once?',
    answer:
      'Technically, FreeCell rules only allow moving one card at a time. However, most implementations (including ours) allow you to move a sequence of cards as a shortcut, as long as there are enough empty free cells and empty columns to perform the intermediate moves. The formula is: (1 + empty free cells) × 2^(empty columns).',
  },
  {
    question: 'What is a good FreeCell win percentage?',
    answer:
      'Beginners typically win about 40-50% of games. Intermediate players win 70-80%. Expert players can achieve 90%+ win rates. Since almost every deal is solvable, your win rate mostly reflects your skill and patience.',
  },
  {
    question: 'Does the game number matter?',
    answer:
      'Yes! Each game number produces a specific, reproducible deal. This means you can share a game number with friends and play the exact same hand. Our deals #1-32,000 are compatible with Microsoft FreeCell, so you can look up solutions and strategies for specific deal numbers.',
  },
  {
    question: 'Can I play FreeCell on my phone?',
    answer:
      'Absolutely! PlayFreeCellOnline.com is designed to work on any device — desktop, tablet, or mobile. It\'s a Progressive Web App (PWA), so you can even install it to your home screen for an app-like experience.',
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a3d0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white/70">
            ← Back to Game
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-2">
          FreeCell Frequently Asked Questions
        </h1>
        <p className="text-white/60 text-lg mb-10">
          Everything you need to know about FreeCell Solitaire.
        </p>

        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1a5c1a]/20 border border-[#1a5c1a]/30 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
              <p className="text-white/80 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded-lg text-white font-medium transition-colors"
          >
            Play FreeCell Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
