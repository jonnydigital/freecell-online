import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import TwoCellPage from './TwoCellPage';
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: '2-Cell FreeCell — Very Challenging FreeCell Variant | Play Online Free',
  description:
    'Play 2-Cell FreeCell online for free. A very challenging FreeCell variant with only two free cells. Sharpen your skills with this tough solitaire puzzle. No download required.',
  keywords: [
    '2 cell freecell',
    'two cell freecell',
    'hard freecell',
    'freecell two free cells',
    'freecell hard mode',
    'freecell variant',
    'challenging solitaire',
    'card game',
  ],
  openGraph: {
    title: '2-Cell FreeCell — Very Challenging | Play Online Free',
    description:
      '2-Cell FreeCell cuts your free cells in half. A very challenging variant where every move counts. Play free online.',
    url: absoluteUrl('/freecell/2-cell'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "2-Cell FreeCell",
    description: "2-Cell FreeCell is a very challenging FreeCell variant with only two free cells. Fewer solvable deals than standard FreeCell, demanding precise play.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl('/freecell/2-cell'),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is 2-Cell FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2-Cell FreeCell is a FreeCell variant where you have only two free cells instead of the standard four. All other rules are identical: eight cascades, four foundations, alternating-color stacking. The reduced storage makes the game very challenging.",
        },
      },
      {
        "@type": "Question",
        name: "How does 2-Cell FreeCell compare to standard FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "With half the free cells, 2-Cell FreeCell is substantially harder than the standard game. You can move smaller sequences, dead-end positions arise more frequently, and significantly fewer deals are solvable. It's a great step up for players who find standard FreeCell too easy.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of 2-Cell FreeCell deals are solvable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Significantly fewer deals are solvable compared to standard FreeCell, where nearly all deals can be won. With only two free cells, many card configurations become impossible to resolve. The exact solvability rate depends on the deal distribution.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best strategies for 2-Cell FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Keep both free cells empty whenever possible. Prioritize creating empty tableau columns for extra maneuvering room. Uncover Aces and low cards early to build foundations. Build long in-suit sequences when you can, and plan several moves ahead before using a free cell.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "FreeCell", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 3, name: "2-Cell FreeCell", item: absoluteUrl('/freecell/2-cell') },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TwoCellPage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          2-Cell FreeCell: Half the Storage, Double the Challenge
        </h2>

        <p className="mb-4 leading-relaxed">
          2-Cell FreeCell takes the beloved classic and cuts your safety net in half.
          With only two free cells instead of four, every temporary storage decision
          carries real weight. The rest of the game is unchanged &mdash; eight
          cascades, four foundations, alternating-color tableau building, and the goal
          of moving all 52 cards to the foundations by suit. But with half the
          maneuvering room, this variant demands tighter planning and more precise
          execution.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How Reduced Free Cells Affect Gameplay
        </h3>

        <p className="mb-4 leading-relaxed">
          In standard FreeCell, four free cells let you move sequences of up to five
          cards at once (more with empty columns). With two free cells, your maximum
          sequence move drops to three cards without empty columns. This means longer
          tableau runs are harder to relocate, and you must think more carefully about
          which cards to unbury and in what order.
        </p>

        <p className="mb-4 leading-relaxed">
          Significantly fewer deals are solvable in 2-Cell FreeCell compared to the
          standard game. You will encounter more dead-end positions, especially if you
          fill both free cells early. Patience and careful planning are essential.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy Tips for 2-Cell FreeCell
        </h3>

        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Treat free cells as a last resort.</strong> With only two slots,
            filling even one immediately halves your flexibility. Use free cells only
            when you have a clear path to emptying them.
          </li>
          <li>
            <strong>Empty columns are gold.</strong> An empty cascade effectively acts
            as an extra free cell but is even more versatile because it can hold a
            sequence. Fight to create and preserve empty columns.
          </li>
          <li>
            <strong>Uncover low cards quickly.</strong> Getting Aces and Twos to the
            foundations early creates space and momentum. Scan all eight cascades at
            the start and identify which low cards are buried deepest.
          </li>
          <li>
            <strong>Build long alternating-color runs.</strong> Longer runs in the
            tableau reduce the number of individual cards you need to move, stretching
            your limited free cells further.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 mb-4">
          <div>
            <h4 className="font-semibold text-white/90">What is 2-Cell FreeCell?</h4>
            <p className="leading-relaxed">
              2-Cell FreeCell is a FreeCell variant where you have only two free cells
              instead of the standard four. All other rules are identical: eight
              cascades, four foundations, alternating-color stacking. The reduced
              storage makes the game very challenging.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">How does 2-Cell FreeCell compare to standard FreeCell?</h4>
            <p className="leading-relaxed">
              With half the free cells, 2-Cell FreeCell is substantially harder than
              the standard game. You can move smaller sequences, dead-end positions
              arise more frequently, and significantly fewer deals are solvable. It is
              a great step up for players who find standard FreeCell too easy.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">How many deals are solvable?</h4>
            <p className="leading-relaxed">
              Significantly fewer deals are solvable compared to standard FreeCell,
              where nearly all deals can be won. With only two free cells, many card
              configurations become impossible to resolve.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">What are the best strategies for 2-Cell FreeCell?</h4>
            <p className="leading-relaxed">
              Keep both free cells empty whenever possible. Prioritize creating empty
              tableau columns for extra maneuvering room. Uncover Aces and low cards
              early to build foundations. Build long in-suit sequences when you can,
              and plan several moves ahead before using a free cell.
            </p>
          </div>
        </div>

        <p className="text-sm text-white/50 mt-8">
          Want more? Try{' '}
          <a href="/freecell/1-cell" className="text-[#D4AF37] hover:underline">1-Cell FreeCell</a> for
          the ultimate challenge, or{' '}
          <a href="/freecell/3-cell" className="text-[#D4AF37] hover:underline">3-Cell FreeCell</a> for
          a slightly gentler step up. See our{' '}
          <a href="/strategy" className="text-[#D4AF37] hover:underline">strategy guide</a> and{' '}
          <a href="/tips" className="text-[#D4AF37] hover:underline">tips</a> for more help.
        </p>
        <MoreGames currentSlug="freecell-2cell" maxGames={7} />
      </article>
    </>
  );
}
