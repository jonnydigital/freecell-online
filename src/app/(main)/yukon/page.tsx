import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import YukonGamePage from "./YukonGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Yukon Solitaire | Play Online Free — No Download",
  description:
    "Play Yukon Solitaire online for free. Move any face-up card regardless of sequence in this challenging Klondike variant. Seven tableau columns, no stock pile. Undo, hints, mobile-friendly.",
  keywords: [
    "yukon solitaire",
    "yukon solitaire online",
    "yukon solitaire free",
    "yukon card game",
    "yukon solitaire rules",
    "yukon solitaire no download",
    "play yukon solitaire online",
    "solitaire online",
    "yukon patience",
    "klondike variant",
  ],
  openGraph: {
    title: "Yukon Solitaire | Play Online Free — No Download",
    description:
      "Play Yukon Solitaire online for free. Move any face-up card in this challenging Klondike variant. No download required.",
    url: absoluteUrl("/yukon"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Yukon Solitaire",
    description:
      "Free online Yukon Solitaire. Move any face-up card regardless of sequence across seven tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/yukon"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1156",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yukon Solitaire",
        item: absoluteUrl("/yukon"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yukon Solitaire is a Klondike variant where all 52 cards are dealt to seven tableau columns with no stock pile. The key difference is that any face-up card can be moved along with all cards on top of it, regardless of whether they form a proper sequence.",
        },
      },
      {
        "@type": "Question",
        name: "How does Yukon differ from Klondike?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Klondike, you can only move properly sequenced runs (alternating color, descending rank). In Yukon, any face-up card can be moved with everything on top of it, even if the cards aren't in sequence. Yukon also deals all 52 cards to the tableau — there's no stock or waste pile.",
        },
      },
      {
        "@type": "Question",
        name: "How do you win Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You win by building all four foundation piles from Ace to King by suit. Move cards between tableau columns (building down in alternating colors) to uncover face-down cards and free up Aces and other cards for the foundations.",
        },
      },
      {
        "@type": "Question",
        name: "Can any card be moved in Yukon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any face-up card can be moved, along with all cards stacked on top of it, to another tableau column — as long as the moved card follows the alternating-color, descending-rank rule on the destination column. Only Kings can be placed on empty columns.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Yukon Solitaire games are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximately 85-90% of Yukon Solitaire games are theoretically winnable with perfect play. In practice, win rates are typically 25-40% due to the complex decision-making required.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <YukonGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Yukon Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Yukon Solitaire is a challenging variant of Klondike where all 52 cards are
          dealt face-up across seven tableau columns — no stock pile, no waste pile. The
          twist: we can move any face-up card along with all cards on top of it,
          regardless of whether they form a proper sequence.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Column 1 gets one face-up card. Columns 2 through 7 each get one additional
          face-down card plus five face-up cards stacked on top. This means column 7
          has 11 cards total (6 face-down + 5 face-up). All 52 cards are in play from
          the very first move.
        </p>
        <p className="mb-4 leading-relaxed">
          Build on tableau columns in descending rank with alternating colors, just like
          Klondike. Build foundation piles up from Ace to King by suit. Only Kings can
          fill empty columns. The freedom to move any face-up card — not just ordered
          runs — gives you far more options but demands deeper strategic thinking.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Focus on uncovering face-down cards — every reveal opens new possibilities</li>
          <li>Move Kings to empty columns strategically to unlock buried cards</li>
          <li>Don&rsquo;t just move cards because you can — plan several moves ahead</li>
          <li>Build foundations steadily but don&rsquo;t rush Aces up if they&rsquo;re needed for tableau building</li>
          <li>Use the &ldquo;move any face-up card&rdquo; rule to dig deep into columns</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Yukon takes its name from the same Gold Rush territory that inspired
          Klondike, and the two games are often treated as siblings in patience
          catalogs from the early twentieth century. The oldest printed
          descriptions place Yukon among the prospector-era variants that spread
          through North American parlors alongside Klondike itself, borrowing the
          seven-column deal and the ace-to-king foundations while quietly
          rewriting the movement rules. Where Klondike locks the tableau into
          strict descending runs and forces us to mine through a stock, Yukon
          turns every exposed card into a legal pick-up — the stack below a card
          tags along whether or not it is properly ordered. The result is a game
          that looks identical on the table but plays like a different sport
          once the first move is made, which is probably why it survived long
          enough to appear in most modern solitaire collections under both the
          Yukon and &ldquo;Moosehide&rdquo; names.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The single most important idea in Yukon is that every face-up card is
          movable. Unlike Klondike, where a buried nine can only travel if the
          cards above it already form a valid run, Yukon lets us grab that nine
          and everything piled on top of it in a single motion. We should exploit
          this constantly — the game rewards aggressive digging far more than
          patient building.
        </p>
        <p className="mb-4 leading-relaxed">
          Empty columns are less valuable here than in Klondike. In Klondike,
          an empty column is a renewable staging area because any King and its
          attached run can refill it. In Yukon, since any card&rsquo;s tail can
          always move anywhere, we do not need to hoard empty columns as a
          transit lane. Clearing a column just to have it empty is almost
          always a mistake; we should only do it when a specific sequence of
          moves requires the space.
        </p>
        <p className="mb-4 leading-relaxed">
          Build down in alternating colors whenever the option exists, and
          prioritize sequences that give us access to face-down cards. Every
          face-down card we expose expands our future move tree, and the
          deepest columns (columns six and seven, with their stacks of six and
          eleven cards) hide the information we need most. When in doubt, we
          ask: does this move reveal a hidden card, or does it only shuffle
          visible cards around? If the answer is the second, we pause and
          look for something better. Finally, do not break up same-suit
          sequences needlessly — while alternating-color builds are the
          official tableau rule, keeping matching suits grouped makes
          eventual foundation transfers cleaner and prevents the tableau
          from fossilizing into an unmovable knot.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Yukon is one of the most solvable cascade games in the family. Because
          all 52 cards are face-up by the end of the deal and every card is
          movable, solver studies consistently place the theoretical win rate
          near <strong>85%</strong> — an enormous number for a game that looks
          this intimidating. The open information is the reason: with no hidden
          stock and no randomness after the deal, a careful player has access
          to the full decision tree from move one.
        </p>
        <p className="mb-4 leading-relaxed">
          Human win rates are naturally lower, typically landing in the
          25&ndash;45% band depending on experience. The gap between the
          theoretical ceiling and the practical average tells us something
          important: Yukon losses are almost always strategic, not unlucky.
          Unlike <Link href="/klondike" className="text-[#D4AF37] hover:underline">Klondike</Link>,
          where a bad stock shuffle can doom a deal, Yukon punishes impatience
          and rewards thinking three or four moves ahead. Use undo liberally
          while learning; the solver confirms that most deals are winnable,
          so a loss is usually a signal to replay and hunt for the line we
          missed.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Treating empty columns like Klondike.</strong>
            New Yukon players often spend three or four moves clearing a
            column out of habit, then find they had nothing planned to put
            there. Keep the column full until a specific King-plus-run move
            needs the room.
          </li>
          <li>
            <strong className="text-white/90">Breaking same-suit sequences.</strong>
            Splitting a neatly matching run just to satisfy the alternating-color
            tableau rule creates extra work for the endgame, when we need to
            feed the foundations in clean suited order.
          </li>
          <li>
            <strong className="text-white/90">Rushing low cards to foundation.</strong>
            Aces and twos are often more useful as tableau anchors than as
            foundation base cards. Park them until the board opens up.
          </li>
          <li>
            <strong className="text-white/90">Ignoring column 7.</strong>
            The deepest column hides the most information. Plan digs that
            target it early rather than saving it for last.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>Yukon vs. Klondike.</strong> The deal structure is identical
          — seven columns, a staircase of face-down cards topped with a
          face-up anchor — but the play experience diverges instantly. Klondike
          forces us through a stock pile and restricts tableau moves to ordered
          runs, so a big part of the game is simply managing draw timing.
          Yukon removes the stock entirely and lets any face-up card migrate
          with its tail. Win rates reflect the difference: Klondike hovers
          around 80% solvable with variable human rates, while Yukon&rsquo;s
          open tableau pushes the solver number to roughly 85% and makes
          skilled play noticeably more rewarding.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Yukon vs. <Link href="/freecell" className="text-[#D4AF37] hover:underline">FreeCell</Link>.</strong>
          Both are open-information games — no hidden stock, no random
          draws after the deal. FreeCell is famously near-perfectly
          solvable (99.999%+), while Yukon&rsquo;s ~85% is lower because we
          lack free cells as temporary storage. Players who love FreeCell&rsquo;s
          deductive feel will enjoy Yukon; players who want more forgiving
          odds should stick with FreeCell.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Yukon vs. <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider</Link>.</strong>
          Spider uses two decks and same-suit grouping rules, which makes
          it a fundamentally different puzzle — closer to sequencing than
          cascade digging. Yukon is the tighter, single-deck cousin.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Yukon has spawned a small family of variants worth knowing. The
          most popular is <strong>Russian Solitaire</strong>, which keeps
          Yukon&rsquo;s move-any-card rule but rejects the alternating-color
          tableau rule in favor of strict same-suit descending builds. The
          result is punishingly hard — solver estimates drop into the
          20&ndash;30% range because same-suit constraints strangle the
          decision tree. <strong>Alaska</strong> (sometimes called Alaska
          Yukon) splits the difference by allowing both up-and-down
          same-suit runs on the tableau, which changes the strategic
          texture considerably and opens lines that are impossible in
          pure Yukon. <strong>Double Yukon</strong> scales the game up
          to two decks and nine columns, attractive for players who want
          longer sessions and a broader decision space without leaving
          the Yukon rule set. For a lighter change of pace, try the
          Moosehide rewording of the standard rules, which is identical
          in play but appears under a different name in older catalogs.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/yukon/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Yukon Solitaire
            </Link>{" "}
            — Complete rules, setup, and strategy guide
          </li>
          <li>
            <Link
              href="/yukon/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Yukon Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic solitaire game Yukon is based on
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Another challenging multi-column solitaire game
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="yukon" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
