import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import EightOffPage from './EightOffPage';

export const metadata: Metadata = {
  title: 'Eight Off Solitaire — Play the Classic 8 Free Cell Card Game Online Free',
  description:
    'Play Eight Off solitaire online for free. A challenging FreeCell variant with 8 free cells and same-suit stacking. Build foundations by suit from Ace to King. No download required.',
  keywords: [
    'eight off solitaire',
    'eight off card game',
    'eight off online',
    'eight off free',
    'eight off rules',
    'freecell variant',
    'same suit solitaire',
    '8 free cells',
    'play eight off',
    'solitaire card game',
  ],
  openGraph: {
    title: 'Eight Off Solitaire — Play Online Free',
    description:
      'Eight Off is a challenging FreeCell variant with 8 free cells and same-suit stacking. Play free online.',
    url: absoluteUrl('/eight-off'),
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Eight Off", item: absoluteUrl('/eight-off') },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EightOffPage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Eight Off Solitaire: The 8 Free Cell Challenge
        </h2>

        <p className="mb-4 leading-relaxed">
          Eight Off is a classic patience card game and a close relative of FreeCell.
          While standard FreeCell gives you 4 free cells and allows alternating-color
          stacking, Eight Off doubles the free cells to 8 but enforces same-suit
          stacking in the tableau. The extra storage space is balanced by the stricter
          building rules, creating a deeply strategic game that rewards careful planning
          and precise execution.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How to Play Eight Off
        </h3>

        <p className="mb-4 leading-relaxed">
          Eight Off uses a standard 52-card deck. The layout consists of 8 tableau
          columns (cascades), 8 free cells across the top, and 4 foundation piles.
          At the start, 48 cards are dealt face-up into the 8 cascades, with each
          column receiving exactly 6 cards. The remaining 4 cards are placed face-up
          in 4 of the 8 free cells, leaving 4 free cells empty.
        </p>

        <p className="mb-4 leading-relaxed">
          The goal is to move all 52 cards to the 4 foundation piles, building each
          foundation in ascending order from Ace through King by suit. The Spades
          foundation must be built from Ace of Spades through King of Spades, the
          Hearts foundation from Ace of Hearts through King of Hearts, and so on.
        </p>

        <p className="mb-4 leading-relaxed">
          In the tableau, cards can only be stacked on cards of the <strong>same
          suit</strong> that are exactly one rank higher. For example, the 5 of Clubs
          can only be placed on the 6 of Clubs. Only individual cards can be moved
          at a time &mdash; you cannot move sequences directly. However, when you have
          enough empty free cells and empty cascades, the game automatically calculates
          how many cards you could move as a sequence (the &ldquo;supermove&rdquo;
          shortcut), saving you from tedious manual moves. Any single card can be placed
          in an empty free cell or on an empty tableau column.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy Tips
        </h3>

        <p className="mb-4 leading-relaxed">
          Despite having 8 free cells, Eight Off is harder than standard FreeCell
          because of the same-suit stacking rule. You need to think carefully about
          which cards to store in free cells and when. Key strategies include:
        </p>

        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Keep free cells open.</strong> The 8 free cells are your lifeline.
            Filling them all up early leaves you with no room to maneuver. Try to keep
            at least 2-3 free cells available at all times.
          </li>
          <li>
            <strong>Prioritize uncovering Aces and Twos.</strong> Getting low-rank
            cards to the foundations early frees up space and creates momentum.
          </li>
          <li>
            <strong>Create empty columns.</strong> Empty cascades are even more valuable
            than free cells because they can hold any card and serve as temporary
            staging areas for rearranging sequences.
          </li>
          <li>
            <strong>Plan same-suit runs.</strong> Since you can only stack by suit,
            look for opportunities to build long same-suit descending sequences that
            can eventually be moved to foundations in order.
          </li>
          <li>
            <strong>Use the 4 pre-dealt free cell cards wisely.</strong> The 4 cards
            that start in free cells are often key cards. Check if any of them are
            Aces or can be immediately played to a foundation.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Eight Off vs FreeCell vs Baker&apos;s Game
        </h3>

        <p className="mb-4 leading-relaxed">
          Eight Off sits between FreeCell and Baker&apos;s Game in difficulty.
          Baker&apos;s Game has the same same-suit stacking rule but only 4 free
          cells, making it the hardest of the three. FreeCell has 4 free cells but
          allows alternating-color stacking, making it the most accessible. Eight Off
          compensates for its strict stacking rule by giving you double the free cell
          storage, but only about 4 of those cells start empty. The win rate for
          Eight Off is estimated at around 85-90% of random deals, compared to
          roughly 99.999% for FreeCell and about 75% for Baker&apos;s Game.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          History and Origins
        </h3>

        <p className="mb-4 leading-relaxed">
          Eight Off has roots in the family of reserve-cell patience games that
          emerged in the mid-20th century. Like Baker&apos;s Game, it predates the
          modern FreeCell that Microsoft popularized in Windows. The game demonstrates
          how changing a single parameter &mdash; the number of free cells &mdash; can
          dramatically alter the character of a card game. Eight Off remains a favorite
          among solitaire enthusiasts who enjoy a challenging yet solvable patience
          game that tests strategic thinking without relying on luck.
        </p>
      </article>
    </>
  );
}
