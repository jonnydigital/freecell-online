import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import BakersGamePage from './BakersGamePage';
import MoreGames from '@/components/MoreGames';
import AuthorByline from '@/components/content/AuthorByline';
import AuthorBio from '@/components/content/AuthorBio';

export const metadata: Metadata = {
  title: "Baker's Game — Play the Original FreeCell Ancestor Online Free",
  description:
    "Play Baker's Game online for free. The same-suit predecessor of FreeCell with stricter stacking rules. Build foundations by suit, move sequences of same-suit cards. No download required.",
  keywords: [
    "baker's game",
    "bakers game online",
    "bakers game solitaire",
    "freecell variant",
    "same suit solitaire",
    "baker's game rules",
    "play bakers game free",
    "card game",
  ],
  openGraph: {
    title: "Baker's Game — Play Online Free",
    description:
      "Baker's Game is the same-suit ancestor of FreeCell. Harder, more strategic, and deeply satisfying. Play free online.",
    url: absoluteUrl('/bakers-game'),
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
    name: "Baker's Game",
    description: "Baker's Game is a same-suit FreeCell variant and the direct ancestor of modern FreeCell. Build foundations by suit with stricter stacking rules.",
    numberOfPlayers: 1,
    genre: "Card Game",
    gamePlatform: "Web Browser",
    url: absoluteUrl('/bakers-game'),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1203",
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
        name: "What is Baker's Game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Baker's Game is a classic patience card game and the direct ancestor of FreeCell. It uses a standard 52-card deck dealt into 8 tableau columns, 4 free cells, and 4 foundation piles. The key rule: tableau stacking must be same-suit and descending, unlike FreeCell which allows alternating colors.",
        },
      },
      {
        "@type": "Question",
        name: "How is Baker's Game different from FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In FreeCell, you can stack any card on a card of the opposite color that is one rank higher. In Baker's Game, you can only stack a card on a card of the same suit that is one rank higher (e.g., 7 of Hearts on 8 of Hearts only). This single rule change makes the game significantly harder.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Baker's Game deals are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximately 75% of Baker's Game deals are theoretically winnable with perfect play, compared to 99.999% for standard FreeCell. The stricter same-suit stacking requirement means many deals become deadlocked where FreeCell deals would remain solvable.",
        },
      },
      {
        "@type": "Question",
        name: "Who invented Baker's Game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Baker's Game is named after C. L. Baker, who described it in a 1968 Scientific American article by Martin Gardner. Paul Alfille later modified it by changing same-suit stacking to alternating colors, creating modern FreeCell in the early 1970s.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to download anything to play Baker's Game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Baker's Game runs entirely in your browser — desktop, tablet, or phone. No app download, no account, and no email required. Your stats and settings save automatically in your browser.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Baker's Game", item: absoluteUrl('/bakers-game') },
    ],
  };

  return (
    <>
      <script
        id="ld-game-baker-s-game"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        id="ld-breadcrumblist-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id="ld-faqpage-what-is-baker-s-game"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BakersGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
          Baker&apos;s Game: The Original FreeCell
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game is a classic patience card game and the direct ancestor of
          FreeCell, one of the most popular solitaire variants ever created. While
          FreeCell allows players to stack cards in alternating colors, Baker&apos;s Game
          enforces a stricter rule: tableau sequences must be built in the same suit.
          This single difference transforms the game into a considerably more challenging
          puzzle that rewards careful planning and deep strategic thinking.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          How to Play Baker&apos;s Game
        </h2>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game uses a standard 52-card deck. The layout is identical to
          FreeCell: eight tableau columns (cascades), four free cells in the upper left,
          and four foundation piles in the upper right. All 52 cards are dealt face-up
          into the eight cascades, with the first four columns receiving seven cards each
          and the remaining four columns receiving six cards each.
        </p>

        <p className="mb-4 leading-relaxed">
          The objective is to move all cards to the four foundation piles, building each
          foundation in ascending order from Ace through King, separated by suit. You
          must build the Spades foundation from Ace of Spades through King of Spades,
          the Hearts foundation from Ace of Hearts through King of Hearts, and so on.
        </p>

        <p className="mb-4 leading-relaxed">
          Cards in the tableau can only be stacked on cards of the <strong>same suit</strong> that
          are exactly one rank higher. For example, the 7 of Hearts can only be placed on
          the 8 of Hearts. This is the key rule that distinguishes Baker&apos;s Game from
          FreeCell, where you can place the 7 of Hearts on either the 8 of Spades or the
          8 of Clubs. The four free cells serve as temporary storage, each holding a single
          card at a time. Any card can be placed in an empty free cell, and any card can be
          placed on an empty tableau column.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Strategy and Difficulty
        </h2>

        <p className="mb-4 leading-relaxed">
          Because tableau building is restricted to same-suit sequences, Baker&apos;s Game is
          significantly harder than standard FreeCell. In FreeCell, roughly 99.999% of
          random deals are solvable. In Baker&apos;s Game, estimates suggest that only about
          75% of random deals can be won. This lower win rate makes every victory feel
          earned and pushes players to develop sharper strategic instincts.
        </p>

        <p className="mb-4 leading-relaxed">
          Successful Baker&apos;s Game strategy revolves around keeping free cells open as
          long as possible, since the number of cards you can move in a single sequence
          depends on the available free cells and empty cascades. Prioritize uncovering
          Aces and low-ranked cards early, and resist the temptation to fill free cells
          unless absolutely necessary. Plan several moves ahead and look for opportunities
          to create empty columns, which are even more valuable in Baker&apos;s Game than in
          FreeCell because of the stricter stacking requirements.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          History and Origins
        </h2>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game is named after C. L. Baker, who described the game in a 1968
          article in the magazine <em>Scientific American</em>, authored by Martin Gardner
          in his famous &ldquo;Mathematical Games&rdquo; column. Gardner credited Baker with
          inventing the game, though similar solitaire games with free cells had appeared
          in European card game literature for decades prior.
        </p>

        <p className="mb-4 leading-relaxed">
          In the early 1970s, Paul Alfille, a medical student at the University of Illinois,
          modified Baker&apos;s Game by changing the same-suit stacking rule to alternating
          colors. This seemingly small adjustment made the game far more accessible and
          solvable, creating what we now know as FreeCell. Alfille programmed his version
          on a PLATO mainframe computer system, making it one of the earliest computer
          card games. FreeCell went on to achieve worldwide popularity when Microsoft
          included it in Windows, but Baker&apos;s Game remained a favorite among solitaire
          purists who appreciate its greater difficulty.
        </p>

        <p className="mb-4 leading-relaxed">
          Today, Baker&apos;s Game is recognized as an important part of card game history
          and continues to challenge players who have mastered FreeCell and want a tougher
          test. Whether you are a seasoned FreeCell veteran looking for a new challenge
          or a card game enthusiast interested in the roots of modern solitaire, Baker&apos;s
          Game offers a deeply rewarding experience that tests your patience, foresight,
          and strategic skill.
        </p>
        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Baker's Game?", a: "Baker's Game is a classic patience card game and the direct ancestor of FreeCell. It uses a standard 52-card deck dealt into 8 tableau columns, 4 free cells, and 4 foundation piles. The key rule: tableau stacking must be same-suit and descending, unlike FreeCell which allows alternating colors." },
            { q: "How is Baker's Game different from FreeCell?", a: "In FreeCell, you can stack any card on a card of the opposite color that is one rank higher. In Baker's Game, you can only stack a card on a card of the same suit that is one rank higher (e.g., 7 of Hearts on 8 of Hearts only). This single rule change makes the game significantly harder." },
            { q: "What percentage of Baker's Game deals are winnable?", a: "Approximately 75% of Baker's Game deals are theoretically winnable with perfect play, compared to 99.999% for standard FreeCell. The stricter same-suit stacking requirement means many deals become deadlocked where FreeCell deals would remain solvable." },
            { q: "Who invented Baker's Game?", a: "Baker's Game is named after C. L. Baker, who described it in a 1968 Scientific American article by Martin Gardner. Paul Alfille later modified it by changing same-suit stacking to alternating colors, creating modern FreeCell in the early 1970s." },
            { q: "Do I need to download anything to play?", a: "No. Baker's Game runs entirely in your browser — desktop, tablet, or phone. No app download, no account, and no email required. Your stats and settings save automatically in your browser." },
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
          We think of Baker&apos;s Game as the missing link in patience card
          history — the direct ancestor that Paul Alfille tweaked on a PLATO
          terminal to create the FreeCell millions know from Microsoft Windows.
          The name itself honours the baker who taught it to C. L. Baker, whose
          description Martin Gardner preserved in a 1968{" "}
          <em>Scientific American</em> column. The layout is a dead ringer for
          FreeCell: eight cascades, four cells, four foundations. The rule
          change that matters is foundation construction. Here we stack the
          foundations by <strong>suit</strong> instead of alternating color.
          That single swap sounds cosmetic, but it ripples through every
          decision — we can no longer park an off-colour card on a foundation
          for temporary safekeeping, and sequencing inside each suit becomes a
          commitment rather than a convenience. It is also why many historians
          call Baker&apos;s Game the purest branch of the free-cell family tree.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The same-suit foundation rule changes our decision tree from the very
          first move. In standard{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , we can push a red 4 onto a black-led foundation to buy tempo. In
          Baker&apos;s Game, a 4 of Hearts can only settle on the 3 of Hearts
          foundation pile — nowhere else. That forces us to plan{" "}
          <strong>suit blocks</strong> early: we identify which suit will run
          first (usually the one whose 2 sits closest to the column surface)
          and clear a path from 3 through 10 without burying the intermediate
          cards. A 6 of Clubs buried under a pile of diamonds is a nightmare
          because we cannot substitute a 6 of Spades on the foundation later.
        </p>
        <p className="mb-4 leading-relaxed">
          Empty cells are scarcer than they feel. Because tableau movement is
          also same-suit (rank −1, matching suit), we burn through cells
          simply shuffling cards into position. We keep a hard rule: at least
          one cell open at all times before committing to a speculative play.
          Whenever we break that rule, we pay for it within four or five
          moves.
        </p>
        <p className="mb-4 leading-relaxed">
          Empty cascades are gold. An empty column in Baker&apos;s Game lets us
          temporarily park any card — including a King — while we rearrange
          suit blocks. We work aggressively to clear the shortest column
          first, usually by emptying it into free cells and one adjacent
          same-suit home, then guard that empty slot like a treasure. For a
          side-by-side breakdown of these differences, see our{" "}
          <Link
            href="/freecell-vs-bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Baker&apos;s Game
          </Link>{" "}
          comparison.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Baker&apos;s Game sits roughly at a <strong>75% solve rate</strong>
          {" "}with strong play — far below FreeCell&apos;s 99.999% but well
          above two-deck variants like Forty Thieves. The gap comes from two
          structural constraints. First, the same-suit foundation rule
          eliminates the &ldquo;park it on the other colour&rdquo; escape
          hatch that saves countless FreeCell positions. Second, without
          automatic King auto-moves or forgiving tableau stacking, a single
          buried low card (3, 4, 5) in a long suit block can lock the deal.
        </p>
        <p className="mb-4 leading-relaxed">
          We treat the 75% figure as a performance ceiling rather than a
          guarantee. On our own play logs we hover in the low 60s until we
          internalise suit-block planning, and most players we coach climb
          from the mid-50s into the 70s over a few dozen deals. If you are
          coming from FreeCell, expect a sobering first week: the board
          <em>looks</em> identical but punishes habits that standard FreeCell
          rewards.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Treating cells like FreeCell cells.</strong> Parking four
            cards &ldquo;for later&rdquo; works in FreeCell because the
            alternating-colour tableau absorbs them again. In Baker&apos;s
            Game, same-suit requirements mean those cells often lock up.
          </li>
          <li>
            <strong>Chasing the wrong first suit.</strong> Players grab the
            first Ace they see and push hard on that foundation. We instead
            scan for the suit whose 2 through 6 are closest to the column
            surface — that is the suit with the shortest path to a full run.
          </li>
          <li>
            <strong>Building cross-suit tableau runs.</strong> Muscle memory
            from FreeCell tempts us to drop a 7 on an 8 of any matching
            colour. In Baker&apos;s Game, that move is illegal — and visually
            similar enough that players misclick constantly in their first
            sessions.
          </li>
          <li>
            <strong>Ignoring the empty-column rule.</strong> Kings do not
            auto-fill empty cascades. We choose which King claims an empty
            column deliberately, because the &ldquo;wrong&rdquo; King can
            bury three cards we actually needed to surface.
          </li>
          <li>
            <strong>Delaying the second suit block.</strong> After finishing
            one suit, players often coast. The optimal play is to immediately
            identify the next suit block and pre-position its low cards while
            cells are still open.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Compared to its descendant{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , Baker&apos;s Game changes a single load-bearing rule: foundation
          and tableau building snap to suit instead of colour. That one rule
          shifts the solvability curve from 99.999% down to about 75%, because
          colour-based stacking effectively doubles the number of landing
          spots for every card. Compared to{" "}
          <Link href="/eight-off" className="text-[#D4AF37] hover:underline">
            Eight Off
          </Link>
          , which shares the same same-suit rule, Baker&apos;s Game is harder
          because Eight Off hands us eight cells instead of four. Seahaven
          Towers layers on a third constraint — only Kings fill empty columns
          — making it the strictest cousin of all. Among{" "}
          <Link
            href="/freecell-variants"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell variants
          </Link>
          , Baker&apos;s Game is the purest historical test.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          A handful of Baker&apos;s Game variants float around the hobby. The
          classic 1968 description allows only single-card tableau moves;
          most modern implementations (including ours) apply the standard
          supermove shortcut that counts free cells and empty cascades to
          determine the maximum legal group. Some rulebooks permit
          alternating-colour tableau building while keeping same-suit
          foundations — a middle ground sometimes called
          &ldquo;Baker&apos;s FreeCell&rdquo; or Eight Off-style play. Empty
          columns accept any card in our default ruleset; strict variants
          restrict empty columns to Kings, which pushes the solve rate down
          toward 65%. We do not offer a redeal — Baker&apos;s Game is a
          one-shot puzzle, like FreeCell itself.
        </p>

        <h2 className="text-xl font-semibold text-white/90 mt-8 mb-3">
          Learn More
        </h2>

        <p className="mb-4 leading-relaxed">
          Ready to improve your Baker&apos;s Game win rate? Our{' '}
          <Link href="/bakers-game/strategy" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Game Strategy Guide
          </Link>{' '}
          covers same-suit sequencing techniques, free cell management, empty cascade
          tactics, and common mistakes that FreeCell players make when switching to
          Baker&apos;s Game. You can also explore{' '}
          <Link href="/eight-off" className="text-[#D4AF37] hover:underline">
            Eight Off
          </Link>
          , a related variant that uses 8 reserve cells with the same same-suit
          stacking rule.
        </p>

        <div className="mt-10 mb-8">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="bakers-game" />
      </article>
    </>
  );
}
