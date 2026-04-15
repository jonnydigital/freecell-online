import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import ThreeCellPage from './ThreeCellPage';
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: '3-Cell FreeCell — Challenging FreeCell Variant | Play Online Free',
  description:
    'Play 3-Cell FreeCell online for free. A challenging FreeCell variant with only three free cells. One less cell than standard FreeCell changes everything. No download required.',
  keywords: [
    '3 cell freecell',
    'three cell freecell',
    'freecell three free cells',
    'freecell hard',
    'freecell variant',
    'challenging solitaire',
    'card game',
    'freecell challenge',
  ],
  openGraph: {
    title: '3-Cell FreeCell — Challenging Variant | Play Online Free',
    description:
      '3-Cell FreeCell removes one free cell from the classic game. A challenging variant that demands sharper play. Try it free online.',
    url: absoluteUrl('/freecell/3-cell'),
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
    name: "3-Cell FreeCell",
    description: "3-Cell FreeCell is a challenging FreeCell variant with only three free cells. One fewer cell than standard FreeCell noticeably increases the difficulty.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl('/freecell/3-cell'),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "834",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is 3-Cell FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "3-Cell FreeCell is a FreeCell variant where you have three free cells instead of the standard four. All other rules remain the same. Losing one free cell noticeably reduces your maneuvering room and makes the game more challenging.",
        },
      },
      {
        "@type": "Question",
        name: "How much harder is 3-Cell FreeCell than standard FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Removing one free cell makes a meaningful difference. Your maximum sequence move drops from five cards to four (without empty columns), and more deals become unsolvable. It's a noticeable step up from standard FreeCell without being as punishing as the 2-Cell or 1-Cell variants.",
        },
      },
      {
        "@type": "Question",
        name: "Is 3-Cell FreeCell a good stepping stone to harder variants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. 3-Cell FreeCell is the perfect middle ground between standard FreeCell and the more extreme restricted-cell variants. It teaches you to be more disciplined with free cell usage without overwhelming you with impossibility.",
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
      { "@type": "ListItem", position: 3, name: "3-Cell FreeCell", item: absoluteUrl('/freecell/3-cell') },
    ],
  };

  return (
    <>
      <script
        id="ld-game-3-cell-freecell"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        id="ld-faqpage-what-is-3-cell-freecell"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        id="ld-breadcrumblist-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ThreeCellPage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">
          3-Cell FreeCell: One Cell Less, One Level Harder
        </h2>

        <p className="mb-4 leading-relaxed">
          3-Cell FreeCell is the gentlest of the restricted-cell FreeCell variants,
          but do not mistake &ldquo;gentlest&rdquo; for &ldquo;easy.&rdquo; Removing
          just one free cell from the standard four creates a noticeably harder game.
          You still have eight cascades, four foundations, and alternating-color
          stacking, but with three free cells your maximum supermove drops from five
          cards to four (without empty columns), and tighter maneuvering room means
          more deals end in deadlock.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          What Changes with Three Free Cells?
        </h3>

        <p className="mb-4 leading-relaxed">
          The supermove formula in FreeCell is (1 + free cells) x 2^(empty columns).
          Dropping from four to three free cells reduces your base sequence-move
          capacity from 5 to 4. That single-card difference cascades through the
          game: some tableau rearrangements that were possible with four cells become
          impossible with three. You will find more situations where a key card is
          buried one layer too deep to reach.
        </p>

        <p className="mb-4 leading-relaxed">
          Most deals are still solvable in 3-Cell FreeCell, but the margin is
          tighter than standard FreeCell. Expect to encounter dead ends more often,
          especially if you use free cells carelessly in the early game.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy Tips for 3-Cell FreeCell
        </h3>

        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Use free cells sparingly.</strong> Three cells feel almost as
            generous as four &mdash; until they are full. Try to keep at least one
            free cell open at all times as an escape hatch.
          </li>
          <li>
            <strong>Create empty columns early.</strong> Empty cascades are even more
            valuable when you have fewer free cells. An empty column effectively doubles
            your sequence-move capacity.
          </li>
          <li>
            <strong>Prioritize low cards.</strong> Getting Aces and Twos to the
            foundations as quickly as possible creates permanent space. Identify buried
            low cards at the start and plan a path to uncover them.
          </li>
          <li>
            <strong>Avoid filling all three cells at once.</strong> Once all three are
            occupied, you can only move single cards between tableau columns. This is
            the single most common mistake in restricted-cell variants.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          A Stepping Stone to Harder Variants
        </h3>

        <p className="mb-4 leading-relaxed">
          3-Cell FreeCell is an excellent way to sharpen your skills before tackling
          the more extreme 2-Cell and 1-Cell variants. The lessons you learn
          here &mdash; careful free cell management, column preservation, deep
          planning &mdash; apply directly to every restricted-cell variant.
        </p>

        <h3 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 mb-4">
          <div>
            <h4 className="font-semibold text-white/90">What is 3-Cell FreeCell?</h4>
            <p className="leading-relaxed">
              3-Cell FreeCell is a FreeCell variant where you have three free cells
              instead of the standard four. All other rules remain the same. Losing one
              free cell noticeably reduces your maneuvering room and makes the game more
              challenging.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">How much harder is 3-Cell FreeCell than standard FreeCell?</h4>
            <p className="leading-relaxed">
              Removing one free cell makes a meaningful difference. Your maximum
              sequence move drops from five cards to four (without empty columns), and
              more deals become unsolvable. It is a noticeable step up from standard
              FreeCell without being as punishing as the 2-Cell or 1-Cell variants.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white/90">Is 3-Cell FreeCell a good stepping stone to harder variants?</h4>
            <p className="leading-relaxed">
              Yes. 3-Cell FreeCell is the perfect middle ground between standard
              FreeCell and the more extreme restricted-cell variants. It teaches you to
              be more disciplined with free cell usage without overwhelming you.
            </p>
          </div>
        </div>

        <p className="text-sm text-white/50 mt-8">
          Ready for more? Try{' '}
          <a href="/freecell/2-cell" className="text-[#D4AF37] hover:underline">2-Cell FreeCell</a> or{' '}
          <a href="/freecell/1-cell" className="text-[#D4AF37] hover:underline">1-Cell FreeCell</a> for
          a bigger challenge. Or check out our{' '}
          <a href="/strategy" className="text-[#D4AF37] hover:underline">strategy guide</a> and{' '}
          <a href="/tips" className="text-[#D4AF37] hover:underline">tips</a>.
        </p>
        <MoreGames currentSlug="freecell-3cell" maxGames={7} />
      </article>
    </>
  );
}
