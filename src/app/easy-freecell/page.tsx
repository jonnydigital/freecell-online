import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import EasyFreeCellPage from './EasyFreeCellPage';

export const metadata: Metadata = {
  title: 'Easy FreeCell — Play Beginner-Friendly FreeCell Online Free',
  description:
    'Play Easy FreeCell online for free. Aces and 2s start on the foundations, giving you a gentler on-ramp to learn FreeCell strategy. No download required.',
  keywords: [
    'easy freecell',
    'easy freecell online',
    'beginner freecell',
    'freecell for beginners',
    'simple freecell',
    'easy freecell no download',
    'freecell practice',
    'learn freecell',
  ],
  openGraph: {
    title: 'Easy FreeCell — Play Online Free',
    description:
      'Easy FreeCell starts with Aces and 2s already on the foundations. A perfect way to learn the game before tackling standard deals.',
    url: absoluteUrl('/easy-freecell'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Easy FreeCell', item: absoluteUrl('/easy-freecell') },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Easy FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Easy FreeCell is a beginner-friendly variant of FreeCell where the Aces and 2s start pre-placed on the foundation piles. This gives you a head start and more room to maneuver, making it easier to learn FreeCell strategy without getting stuck early.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Easy FreeCell different from regular FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The only difference is the starting position: in Easy FreeCell, all eight cards (four Aces and four 2s) begin on the foundations instead of in the tableau. The stacking rules, free cells, and win condition are identical to standard FreeCell.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Easy FreeCell always winnable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Easy FreeCell deals are significantly more winnable than standard FreeCell because removing 8 cards from the tableau creates more open space from the start. While not every deal is guaranteed solvable, the vast majority can be won even by beginners.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I start with Easy FreeCell or regular FreeCell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you are new to FreeCell, Easy FreeCell is a great place to start. It lets you practice the core mechanics — alternating color stacking, using free cells wisely, and building foundations — without the pressure of a tightly packed board.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EasyFreeCellPage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Easy FreeCell: A Gentler Way to Learn
        </h2>

        <p className="mb-4 leading-relaxed">
          Easy FreeCell is a beginner-friendly variant of the classic FreeCell solitaire
          card game. The rules are identical to standard FreeCell with one key difference:
          all four Aces and all four 2s start pre-placed on the foundation piles. This
          removes eight cards from the tableau before you even make your first move,
          giving you significantly more breathing room to plan and execute your strategy.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How to Play Easy FreeCell
        </h3>

        <p className="mb-4 leading-relaxed">
          The game uses a standard 52-card deck dealt into eight tableau columns, just
          like regular FreeCell. However, the Aces and 2s are automatically moved to
          the four foundation piles at the start, leaving only 44 cards across the eight
          columns. You have four free cells for temporary storage and four foundation
          piles to build up by suit from 3 through King.
        </p>

        <p className="mb-4 leading-relaxed">
          Tableau cards are stacked in descending rank with alternating colors, just like
          standard FreeCell. Move a red 7 onto a black 8, a black Queen onto a red King,
          and so on. Use the free cells wisely — each holds only one card, and filling them
          all leaves you with no room to maneuver. Empty tableau columns are powerful tools
          that let you reorganize large sequences.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Why Start with Easy FreeCell?
        </h3>

        <p className="mb-4 leading-relaxed">
          Standard FreeCell can feel overwhelming for newcomers. With 52 tightly packed
          cards and only four free cells, even experienced players sometimes hit dead ends.
          Easy FreeCell solves this by removing the lowest cards from the puzzle, which
          creates more empty space, more legal moves, and more opportunities to recover
          from mistakes.
        </p>

        <p className="mb-4 leading-relaxed">
          This variant is particularly useful for developing three essential FreeCell
          skills: reading the board to spot sequences, timing your foundation plays, and
          managing free cell usage. Once these habits feel natural, transitioning to
          standard FreeCell becomes much less intimidating.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Easy FreeCell Strategy Tips
        </h3>

        <p className="mb-4 leading-relaxed">
          Even with the head start, good strategy matters. Focus on creating empty columns
          early — with fewer cards in the tableau, this is much more achievable than in
          standard FreeCell. Look for 3s that can be played to the foundations quickly,
          since the 2s are already there. And resist the urge to fill free cells with cards
          that could be placed elsewhere; saving free cells for critical moments is the
          difference between winning and getting stuck.
        </p>

        <p className="mb-4 leading-relaxed">
          When you feel confident winning Easy FreeCell consistently, challenge yourself
          with standard FreeCell. The core skills transfer directly — you will just need to
          manage a tighter board and find those opening Aces yourself.
        </p>
      </article>
    </>
  );
}
