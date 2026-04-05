import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import EightOffPage from './EightOffPage';
import MoreGames from '@/components/MoreGames';
import AuthorByline from '@/components/content/AuthorByline';
import AuthorBio from '@/components/content/AuthorBio';

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
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Eight Off Solitaire",
    description: "Eight Off is a challenging FreeCell variant with 8 free cells and same-suit stacking. Build foundations by suit from Ace to King.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl('/eight-off'),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "934",
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
        name: "What is Eight Off Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eight Off is a patience card game and close relative of FreeCell. It uses 8 free cells (double FreeCell's 4) but requires same-suit stacking in the tableau. At the start, 48 cards fill 8 columns and 4 cards go to 4 of the 8 free cells, leaving 4 cells empty.",
        },
      },
      {
        "@type": "Question",
        name: "How is Eight Off different from FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eight Off has 8 free cells instead of FreeCell's 4, but uses same-suit stacking (you can only place a card on a card of the same suit). FreeCell uses alternating-color stacking. The extra free cells partially compensate for the stricter building rule.",
        },
      },
      {
        "@type": "Question",
        name: "How many free cells does Eight Off have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eight Off has 8 free cells total. At the start of the game, 4 of those cells are already occupied by cards dealt there, leaving 4 free cells empty. As you move cards off those initial 4, more cells open up for temporary card storage.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Eight Off deals are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximately 85-90% of Eight Off deals are theoretically winnable with optimal play. This places it between standard FreeCell (99.999% winnable) and Baker's Game (about 75% winnable).",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to download anything to play Eight Off?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Eight Off Solitaire runs entirely in your browser — desktop, tablet, or phone. No app download, no account, and no email required. Your stats and settings save automatically in your browser.",
        },
      },
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EightOffPage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Eight Off Solitaire: The 8 Free Cell Challenge
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Eight Off is a classic patience card game and a close relative of FreeCell.
          While standard FreeCell gives you 4 free cells and allows alternating-color
          stacking, Eight Off doubles the free cells to 8 but enforces same-suit
          stacking in the tableau. The extra storage space is balanced by the stricter
          building rules, creating a deeply strategic game that rewards careful planning
          and precise execution.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How to Play Eight Off
        </h2>

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

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy Tips
        </h2>

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

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Eight Off vs FreeCell vs Baker&apos;s Game
        </h2>

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

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          History and Origins
        </h2>

        <p className="mb-4 leading-relaxed">
          Eight Off has roots in the family of reserve-cell patience games that
          emerged in the mid-20th century. Like Baker&apos;s Game, it predates the
          modern FreeCell that Microsoft popularized in Windows. The game demonstrates
          how changing a single parameter &mdash; the number of free cells &mdash; can
          dramatically alter the character of a card game. Eight Off remains a favorite
          among solitaire enthusiasts who enjoy a challenging yet solvable patience
          game that tests strategic thinking without relying on luck.
        </p>
        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Eight Off Solitaire?", a: "Eight Off is a patience card game and close relative of FreeCell. It uses 8 free cells (double FreeCell's 4) but requires same-suit stacking in the tableau. At the start, 48 cards fill 8 columns and 4 cards go to 4 of the 8 free cells, leaving 4 cells empty." },
            { q: "How is Eight Off different from FreeCell?", a: "Eight Off has 8 free cells instead of FreeCell's 4, but uses same-suit stacking (you can only place a card on a card of the same suit). FreeCell uses alternating-color stacking. The extra free cells partially compensate for the stricter building rule." },
            { q: "How many free cells does Eight Off have?", a: "Eight Off has 8 free cells total. At the start, 4 of those cells are already occupied by cards dealt there, leaving 4 free cells empty. As you move cards off those initial 4, more cells open up for temporary card storage." },
            { q: "What percentage of Eight Off deals are winnable?", a: "Approximately 85-90% of Eight Off deals are theoretically winnable with optimal play. This places it between standard FreeCell (99.999% winnable) and Baker's Game (about 75% winnable)." },
            { q: "Do I need to download anything to play?", a: "No. Eight Off Solitaire runs entirely in your browser — desktop, tablet, or phone. No app download, no account, and no email required. Your stats and settings save automatically in your browser." },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Eight Off belongs to the mid-20th-century family of reserve-cell
          patience games that bloomed in European card-game compendiums
          before computers made solitaire a household pastime. The game is
          essentially a cousin to{" "}
          <Link
            href="/bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&apos;s Game
          </Link>
          , sharing the strict same-suit stacking rule that distinguishes
          both from modern FreeCell. Where Baker&apos;s Game hands you four
          cells, Eight Off doubles that to eight — four already holding
          cards at deal time, four starting empty. The extra cell budget
          lifts the solve rate to roughly 99%, making Eight Off the gentlest
          entry point into the same-suit branch of the FreeCell family. We
          think of it as the training wheels cousin: it teaches you to plan
          by suit without punishing you for every inefficient move.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The eight cells are a trap if you do not treat them as scarce.
          Because Eight Off is nearly always winnable, players learn to spray
          cards into cells reflexively — one here, one there — confident that
          the surplus capacity will bail them out. It often does. But the
          habit fails the moment you transition back to{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            standard FreeCell
          </Link>{" "}
          or Baker&apos;s Game. We discipline ourselves to ask &ldquo;does
          this cell move reopen a tableau option?&rdquo; before every park.
          If the answer is no, the card stays in the column.
        </p>
        <p className="mb-4 leading-relaxed">
          Same-suit tableau building makes sequence construction slower than
          FreeCell. A red 9 cannot sit on a black 10; it needs its own suit
          mate. That means we actively plan <strong>where each suit will be
          assembled</strong> — usually the column holding that suit&apos;s
          King, or an empty column we have claimed. We then funnel 2 through
          Queen into that column in descending order, one at a time, using
          cells as temporary stepping stones. A well-played Eight Off looks
          like four parallel assembly lines, one per suit.
        </p>
        <p className="mb-4 leading-relaxed">
          The four pre-dealt cell cards deserve a first-move audit. Two of
          them are often playable immediately — either to foundations (if
          one is an Ace) or to a tableau column that has the matching suit
          on top. Clearing those two opens real working cells. Empty columns
          remain the highest-leverage resource; we clear the shortest column
          first, then protect the empty slot aggressively. For the full
          comparison against FreeCell, see our{" "}
          <Link
            href="/freecell-vs-eight-off"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Eight Off
          </Link>{" "}
          guide.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Eight Off lands at roughly <strong>99% solvable</strong> with good
          play — nearly a guaranteed win if you avoid obvious blunders. That
          is why we treat it as the perfect on-ramp to cell-based patience
          games. It sits between standard FreeCell (99.999%) and Baker&apos;s
          Game (~75%), and in practical terms it is a more forgiving sibling
          of both. The high solvability is structural: with up to eight cells
          available and 48 cards dealt across eight columns of six, the
          board almost always has a safety valve.
        </p>
        <p className="mb-4 leading-relaxed">
          The gap between theoretical winability and actual performance is
          the real story. Beginners land around 60% because they burn cells
          early and cannot rebuild suit sequences afterward. Disciplined
          players crest 95% by treating the cell budget as if it were four
          rather than eight. The deals that do lose typically share a
          pattern: a low card of one suit buried under a King-stack of
          another, with no path to surface it before cells fill.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Overusing cells because they are there.</strong> Eight
            open cells feel infinite. They are not. Every card you park is a
            card you eventually have to place, and tableau building is
            same-suit, so landing spots are narrower than your instinct says.
          </li>
          <li>
            <strong>Ignoring the four pre-dealt cell cards.</strong> Players
            often leave them untouched for ten or fifteen moves. The correct
            habit is to audit them in the first two moves and play whichever
            are immediately legal.
          </li>
          <li>
            <strong>Building without a suit plan.</strong> If you cannot name
            which suit will finish first, you are playing reactively. Pick a
            target suit within the first five moves.
          </li>
          <li>
            <strong>Spending empty columns on mid-rank cards.</strong> An
            empty column holding a 7 is almost wasted. Empty columns earn
            their keep with Kings or as swap stations for suit blocks.
          </li>
          <li>
            <strong>Treating the last five cards as automatic.</strong>{" "}
            Endgames in Eight Off can still lose if a low card is buried.
            Verify the final descent path before committing the penultimate
            foundation play.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          The one-rule change against{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            standard FreeCell
          </Link>
          {" "}is cell count — eight rather than four — and the reciprocal
          constraint is same-suit tableau building instead of alternating
          colour. That swap moves us from 99.999% solvability down to about
          99%, but it flips the texture of play entirely. FreeCell feels
          like solving a logic puzzle; Eight Off feels like running a
          four-lane assembly. Against Baker&apos;s Game, Eight Off keeps the
          same-suit rule but quadruples the working space (four extra cells,
          since Baker&apos;s Game starts with all cells empty but only
          provides four). Among{" "}
          <Link
            href="/freecell-variants"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell variants
          </Link>
          , Eight Off is the most forgiving entry point. Seahaven Towers is
          the strictest sibling, layering a Kings-only empty-column rule
          onto the same-suit foundation.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The classical description gives Eight Off exactly eight cells with
          four cards pre-dealt into them, and no redeal. Some implementations
          allow any card into an empty column; stricter variants (often
          grouped with Seahaven-style rules) restrict empty columns to
          Kings, which pushes the solve rate down into the low 90s. A
          &ldquo;tight&rdquo; variant that deals one card to every cell at
          start (eight pre-dealt cards, zero empty cells) appears in some
          older compendiums and rarely clears 80%. Supermove shortcuts —
          moving a pre-built same-suit run as a group when enough cells and
          columns are free — are standard in modern implementations
          including ours. Eight Off never offers a redeal; the deal you get
          is the deal you solve.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Learn More
        </h2>

        <p className="mb-4 leading-relaxed">
          Want to sharpen your Eight Off skills? Our{' '}
          <Link href="/eight-off/strategy" className="text-[#D4AF37] hover:underline">
            Eight Off Strategy Guide
          </Link>{' '}
          covers reserve cell management, opening card analysis, same-suit sequencing,
          and how Eight Off strategy differs from FreeCell and Baker&apos;s Game. You
          can also try{' '}
          <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Game
          </Link>
          , which uses the same same-suit stacking rule but with only 4 free cells
          for an even tougher challenge.
        </p>

        <div className="mt-10 mb-8">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="eight-off" />
      </article>
    </>
  );
}
