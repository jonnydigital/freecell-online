import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

const PAGE_PATH = "/klondike-opening-strategy";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

export const metadata: Metadata = {
  title: `Klondike Solitaire Opening Strategy — Setting Up for Success | ${siteConfig.siteName}`,
  description:
    "Master the opening moves in Klondike Solitaire. Learn when to move Aces, how to expose face-down cards, King placement strategy, Draw 1 vs Draw 3 openings, and the moves that look good but cost you games.",
  keywords: [
    "klondike opening strategy",
    "klondike solitaire opening moves",
    "klondike first moves",
    "klondike solitaire strategy",
    "klondike opening tips",
    "solitaire opening moves",
    "klondike face-down cards",
    "klondike king placement",
    "draw 1 vs draw 3 opening",
    "klondike beginner strategy",
  ],
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
  },
  openGraph: {
    title: "Klondike Solitaire Opening Strategy — Setting Up for Success",
    description:
      "The first few moves in Klondike define the entire game. Learn the scanning routine, foundation priorities, face-down card reveals, King placement, and stock pile timing that separate winning players from the rest.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function KlondikeOpeningStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire Opening Strategy — Setting Up for Success",
    description:
      "A detailed guide to the opening phase of Klondike Solitaire covering tableau scanning, foundation priorities, face-down card reveals, King placement, Draw 1 vs Draw 3 differences, stock pile timing, and common opening traps.",
    author: {
      "@type": "Organization",
      name: "The Strategy Desk",
      url: absoluteUrl("/authors/the-strategy-desk"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.url,
    },
    datePublished: PUBLISHED_DATE,
    dateModified: UPDATED_DATE,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(PAGE_PATH),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Klondike Solitaire", item: absoluteUrl("/klondike") },
      { "@type": "ListItem", position: 3, name: "Opening Strategy", item: absoluteUrl(PAGE_PATH) },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best first move in Klondike Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best first move is to scan all seven face-up tableau cards before touching anything. If any Aces are visible, move them to the foundations immediately. After that, look for moves that expose face-down cards, especially in the longer columns. The goal of the opening is information — the more cards you can see, the better your decisions will be for the rest of the game.",
        },
      },
      {
        "@type": "Question",
        name: "Should I always move Aces and Twos to the foundation right away?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Aces have zero strategic value on the tableau because no card can be placed on top of them in a descending sequence. Twos are nearly as safe — the only card that could land on a Two is an Ace, and Aces should already be on the foundation. Moving both immediately clears space and opens foundation lanes without any downside.",
        },
      },
      {
        "@type": "Question",
        name: "When should I move a King to an empty column?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Move a King to an empty column only when it will bring a productive sequence with it — ideally a Queen of the opposite color already built on the tableau that the King can host. Dropping a lone King into an empty column without a plan locks that column permanently and wastes the workspace. Wait until you know what the King will accomplish before committing it.",
        },
      },
      {
        "@type": "Question",
        name: "Is the opening different in Draw 1 vs Draw 3?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, significantly. In Draw 1 you can access every stock card on each pass, so the opening focuses on tableau efficiency and revealing face-down cards. In Draw 3 you can only reach one out of every three stock cards per pass, so the opening must also account for stock-pile cycle management. Draw 3 openings require more conservative foundation sends and more careful preservation of empty columns.",
        },
      },
      {
        "@type": "Question",
        name: "How many moves should I plan ahead in the opening?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the opening, try to see at least two to three moves ahead before committing to any action. The goal is not deep calculation but simple consequence checking: if I move this card, what does it reveal, what does it block, and does it leave me with a productive next move? Players who move one card at a time without checking the downstream effect lose games they could have won.",
        },
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <ContentHero
        title="Klondike Solitaire Opening Strategy"
        kicker={<><Link href="/" className="hover:text-white/60 transition-colors">Home</Link>{" "}&rsaquo;{" "}<Link href="/klondike" className="hover:text-white/60 transition-colors">Klondike Solitaire</Link>{" "}&rsaquo;{" "}Opening Strategy</>}
        subtitle="The first few moves define the entire game. Learn the scanning routine, foundation priorities, and face-down card habits that set winning players apart."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Klondike Solitaire", href: "/klondike" }]}
      />

      <main className="max-w-3xl mx-auto px-6 py-12">

        <div className="mb-10">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-white/[0.03] border border-white/10 rounded-xl">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#why-opening-matters" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Why the First Few Moves Define the Game</a></li>
            <li><a href="#scan-first" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Scan the Tableau Before Touching Anything</a></li>
            <li><a href="#aces-and-twos" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Move Aces and Twos to Foundations Immediately</a></li>
            <li><a href="#expose-face-down" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Expose Face-Down Cards First</a></li>
            <li><a href="#king-placement" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">When to Move Kings to Empty Columns</a></li>
            <li><a href="#draw-1-vs-draw-3" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Draw 1 vs Draw 3 Opening Differences</a></li>
            <li><a href="#stock-pile" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">The Stock Pile: When to Start Drawing</a></li>
            <li><a href="#alternating-sequences" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Building Alternating Color Sequences</a></li>
            <li><a href="#traps" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Moves That Look Good But Aren&apos;t</a></li>
            <li><a href="#opening-checklist" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Opening Checklist</a></li>
            <li><a href="#faq" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Frequently Asked Questions</a></li>
          </ul>
        </nav>

        <AdUnit slot="content-top" className="-my-1" />

        {/* ── Why the First Few Moves Define the Game ── */}
        <section id="why-opening-matters" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Why the First Few Moves Define the Game
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Most Klondike games are not lost in the midgame. They are lost in the first thirty seconds. The opening is where you choose which face-down cards to reveal, which columns to attack, and which sequences to begin building. A poor opening does not announce itself with a bang. It sets up a quiet constraint that limits your options twenty moves later, when you find yourself one card short of an empty column or one reveal short of a workable stock cycle.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Think of the opening as an investment. Every move you make in the first minute either buys you information or spends it. Moves that reveal face-down cards buy information. Moves that rearrange the face-up layer without flipping anything spend your time without increasing what you know about the deal. The best Klondike players treat the opening as an information-gathering phase, not a building phase. Building comes later, once you know enough about the deal to build in the right direction.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The good news is that opening technique is the easiest part of Klondike to improve. The decisions are concrete, the patterns repeat across thousands of deals, and the rules are simple enough to hold in working memory while you play. If you change nothing else about your Klondike game, changing the way you handle the first ten moves will raise your win rate by several percentage points.
          </p>
        </section>

        {/* ── Scan the Tableau Before Touching Anything ── */}
        <section id="scan-first" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Scan the Tableau Before Touching Anything
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The deal is in front of you: seven columns, seven face-up cards, and 24 cards hidden in the stock. Before you move a single card, read the entire row of face-up cards from left to right. You are looking for four things.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Aces and Twos.</strong> Any Ace on the tableau should go to the foundation immediately. Any Two whose matching Ace is already on the foundation follows. These are free moves with no downside.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Revealing moves.</strong> Which face-up cards can be placed on other face-up cards in a legal alternating-color, descending-rank sequence? Among those, which ones would expose a face-down card? A move that reveals a hidden card is almost always better than a move that does not.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Column depth.</strong> Count the face-down cards in each column. Column 1 has zero. Column 7 has six. The columns with the most face-down cards hold the most hidden information, and revealing cards in those columns gives you the biggest return on a single move.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Possible sequences.</strong> Are there natural pairs visible? A black 7 next to a red 8, a red Jack next to a black Queen? Note them but do not act yet. Some of these joins will be productive; others will block a better play you have not seen.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            This scan takes five to ten seconds. It costs nothing and it prevents the most common opening error: making the first legal move you see without checking whether a better move exists two columns to the right. Players who scan first win more games than players who react first, and the margin is not close.
          </p>
        </section>

        {/* ── Move Aces and Twos to Foundations Immediately ── */}
        <section id="aces-and-twos" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Move Aces and Twos to Foundations Immediately
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            This is the one unconditional rule in Klondike openings. An Ace sitting on the tableau is a dead card. Nothing can be built on top of an Ace in a descending sequence, which means it occupies space without contributing to your tableau structure. Moving it to the foundation costs nothing and opens a lane for the Two, then the Three, then the rest of the suit.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Twos are nearly as safe. The only card that could legally be placed on a Two in a descending tableau sequence is an Ace, and every Ace should already be on the foundation. Sending the Two up immediately keeps the foundation moving and clears the tableau without any loss of flexibility.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Threes require a brief pause. A Three is safe to send to the foundation if both opposite-color Twos are already on their foundations. If one of them is still on the tableau or in the stock, the Three might be needed as a landing spot for that Two in a tableau sequence. The pause is brief because Threes are low-value tableau cards, but the habit of checking before sending is what separates deliberate play from autopilot.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Everything above a Three requires real thought. Fours, Fives, and higher are active tableau participants. A red 5 on the foundation can no longer host a black 4 on the tableau, and if that black 4 is carrying a sequence below it, the missing 5 might strand the entire chain. In the opening, the safe policy is: send Aces and Twos unconditionally, send Threes if both opposite-color Twos are already up, and hold everything else until you have scanned the tableau and stock for dependencies.
          </p>
        </section>

        <AdUnit className="-my-1" />

        {/* ── Expose Face-Down Cards First ── */}
        <section id="expose-face-down" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Expose Face-Down Cards First
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            If there is a single cardinal rule of the Klondike opening, this is it: given a choice between a move that reveals a face-down card and a move that does not, almost always choose the reveal. The logic is straightforward. Face-down cards are the primary obstacle between you and winning. Every face-down card you flip gives you new information about the deal and new options for building sequences. Every move that rearranges the face-up layer without flipping anything keeps you operating on the same limited information.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            This principle has a natural hierarchy. Revealing a face-down card in column 7 (which starts with six hidden cards) is worth more than revealing one in column 3 (which starts with two). The longer columns hold more buried information, and each flip there has a higher chance of exposing a card you need for a foundation sequence or a tableau build. When two moves both reveal a face-down card, prefer the one that digs into the deeper column.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The exception to this rule is narrow and specific. Occasionally a face-up rearrangement that does not reveal anything sets up a chain of two or three subsequent moves that together reveal multiple face-down cards. The preparatory move is worth making if, and only if, the chain behind it is real and not speculative. If you need a card from the stock to complete the chain, the chain is speculative. If every card needed is already visible on the tableau, the chain is real. In the opening, real chains are uncommon, so the default is simple: reveal first, rearrange second.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            New players frequently violate this principle by building neat-looking sequences. Moving a red 9 onto a black 10 feels productive because the sequence looks organized, but if neither card had a face-down card beneath it, the move accomplished nothing. The tableau does not need to look tidy. It needs to expose hidden cards.
          </p>
        </section>

        {/* ── When to Move Kings to Empty Columns ── */}
        <section id="king-placement" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            When to Move Kings to Empty Columns
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Empty columns are the most valuable resource on the Klondike tableau, and Kings are the only cards that can fill them. That combination makes King placement one of the most consequential opening decisions. A King placed well unlocks an entire sequence. A King placed poorly locks a column permanently and wastes the workspace the empty column provided.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The ideal King placement looks like this: you have an empty column. A King is available on the tableau or on top of the waste. A Queen of the opposite color is already visible somewhere on the board with a sequence built below it. You place the King in the empty column, move the Queen onto the King, and the Queen&apos;s old column now reveals a face-down card. Three good things happened in two moves: the King found a home, the Queen extended a sequence, and a face-down card was exposed.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The worst King placement is the reflexive one. A column empties. A King is sitting on the waste pile. The player drops the King in without checking whether a Queen is available. The King now occupies the column alone with no sequence riding on it, the empty-column workspace is gone, and no face-down card was revealed. That King will sit there for the rest of the game, often doing nothing useful.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Sometimes holding an empty column is better than filling it. An empty column functions as a temporary storage bay, allowing you to dismantle and rebuild sequences in other columns. If no productive King placement exists, leave the column empty for a turn or two. The workspace is frequently worth more than the King.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            One more consideration: color matters. If both a red King and a black King are available, choose the one whose opposite-color Queen is visible and buildable. A red King needs a black Queen, and a black King needs a red Queen. Picking the King that has a partner ready produces immediate value. Picking the King that has no partner produces a column that sits idle.
          </p>
        </section>

        {/* ── Draw 1 vs Draw 3 Opening Differences ── */}
        <section id="draw-1-vs-draw-3" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Draw 1 vs Draw 3 Opening Differences
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Draw 1 and Draw 3 are different games from the first stock flip. In Draw 1, every card in the stock is individually accessible on each pass. You will see all 24 stock cards, one at a time, and can play any of them the moment they appear. The opening in Draw 1 is forgiving: if you miss an opportunity, it comes back around on the next cycle.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Draw 3 changes the calculus entirely. You turn cards in groups of three and can only play the top card of each group. The other two are visible but locked. That restriction means roughly two-thirds of the stock is inaccessible on any given pass. A card you need might be sitting at position two in its group, and the only way to reach it is to play a card from a previous group, shifting the entire cycle forward by one position.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Draw 1 opening priorities:</strong> Focus on the tableau. Reveal face-down cards aggressively. Send Aces and Twos to foundations without hesitation. Use the first stock pass as a survey to see what is available, then plan your second pass around specific cards. Empty columns are useful workspace; fill them when a productive King appears.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Draw 3 opening priorities:</strong> The tableau is still priority one, but you must also think about the stock from the start. Be more conservative with foundation sends above Twos, because the replacement card might be trapped in the stock for multiple passes. Preserve empty columns longer, because they are harder to recreate in Draw 3. On your first stock pass, note not just which cards are there but where they sit within their groups. That positional information is the key to managing the cycle later.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The practical difference for most players: in Draw 1, the opening can be somewhat improvised because access to the stock is generous. In Draw 3, the opening demands a plan. Improvising in Draw 3 leaves you reacting to the cycle instead of controlling it, and reactive Draw 3 players win fewer than one game in five.
          </p>
        </section>

        <AdUnit className="-my-1" />

        {/* ── The Stock Pile: When to Start Drawing ── */}
        <section id="stock-pile" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Stock Pile: When to Start Drawing
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            A common beginner instinct is to start drawing from the stock immediately. The seven face-up cards are scanned in two seconds, one or two obvious moves are made, and the hand reaches for the stock pile before the tableau has been fully worked. That instinct costs games.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The correct sequence is to exhaust every productive tableau move before touching the stock. &quot;Productive&quot; means the move reveals a face-down card, builds toward a foundation, or improves the tableau in a way that creates new possibilities. A move that shuffles face-up cards sideways without accomplishing any of those things is not productive and does not count as a reason to delay drawing.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Once you have made every useful tableau move, the stock becomes the next source of information. Your first pass through the stock should be a survey. In Draw 1, flip through the cards and note what is available without playing anything except safe moves: Aces, Twos going to foundations, and cards that slot into existing tableau sequences without creating new problems. In Draw 3, turn each group of three and record mentally which cards are accessible and which are buried.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The survey pass serves a purpose: it tells you what the deal gave you. After the survey, you know which Kings are in the stock, where the missing Aces sit, and whether the cards you need for a tableau build are accessible or locked. That knowledge turns the second pass from reactive card-flipping into planned extraction. Players who skip the survey play the stock blind. Players who take the survey play it with a map.
          </p>
        </section>

        {/* ── Building Alternating Color Sequences ── */}
        <section id="alternating-sequences" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Building Alternating Color Sequences
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Klondike requires descending tableau sequences in alternating colors: a black 10 on a red Jack, a red 9 on a black 10, and so on down to Ace. These sequences are the engine of the game. A long, well-built sequence can be moved as a unit onto a higher card, clearing space and revealing face-down cards in a single action. A fragmented tableau with short, disconnected sequences has no engine and no momentum.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            In the opening, sequence building is secondary to face-down reveals, but the two goals overlap more often than not. Moving a red 6 onto a black 7 builds the sequence and, if the red 6 was the top card of its column, reveals the face-down card beneath it. When a move accomplishes both goals simultaneously, it is almost always correct.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Sequence length matters. A three-card sequence (say, black 8, red 7, black 6) is far more useful than three individual cards scattered across columns. The sequence can be moved as a block, opening the column below it. The scattered cards each require separate moves and occupy separate columns. Building sequences early means fewer moves later, and fewer moves means fewer chances for the game to lock up.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            One trap to avoid: building sequences that go nowhere. A beautiful red-black alternating run from 10 down to 4 is worthless if there is no Jack on the board for the 10 to land on. Before extending a sequence, check whether the next card up is available or at least plausible. If the sequence has no future parent card, building it longer only locks more cards into an immobile stack.
          </p>
        </section>

        {/* ── Moves That Look Good But Aren't ── */}
        <section id="traps" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Moves That Look Good But Aren&apos;t
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The most dangerous moves in Klondike are the ones that feel productive without being productive. They have a surface logic that satisfies the part of your brain that wants to see progress, but they do not actually bring you closer to winning. Here are the most common traps in the opening.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Sending a 4 or 5 to the foundation immediately.</strong> It looks like progress. The foundation counter ticks up. But that 4 or 5 might be the only card on the board that can host a 3 or 4 of the opposite color. Once it leaves the tableau it is gone permanently. In the opening, when you have seen fewer than half the cards in the deck, removing mid-range cards from play is a gamble that rarely pays off.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Building a long sequence in column 1.</strong> Column 1 starts with a single face-up card and no hidden cards beneath it. Stacking a long sequence on column 1 feels satisfying, but it misuses the column. Column 1 empties quickly when the single card is played, and that empty column is more valuable as workspace than as a host for a sequence that could live anywhere.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Moving cards between columns without revealing anything.</strong> A red 9 can go on either of two black 10s. You move it to the left one because the left one is shorter. Neither column reveals a face-down card. The move was legal, consumed your attention, and accomplished nothing. In the opening, every move that does not reveal a face-down card should be interrogated: what exactly did this accomplish?
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Drawing from the stock before exhausting tableau moves.</strong> The stock feels like a source of possibility. Flipping a new card is exciting. But the stock should be the last resort, not the first impulse. Every card you draw before finishing your tableau work adds complexity without adding clarity. The tableau moves are known quantities. The stock is a gamble. Solve the known quantities first.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Filling an empty column with the first available King.</strong> We covered this in the King placement section, but it bears repeating as a trap because it is so common. An empty column is workspace. A King without a Queen is a wall. The reflex to fill empty space is strong. Override it.
          </p>
        </section>

        {/* ── Opening Checklist ── */}
        <section id="opening-checklist" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Opening Checklist
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Use this step-by-step checklist for the first minute of every Klondike game. After a few dozen hands the steps will become automatic.
          </p>
          <div className="space-y-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 1: Full tableau scan</h3>
              <p className="text-sm text-white/60">
                Read all seven face-up cards left to right. Identify Aces, Twos, possible alternating-color joins, and note the depth of each column. Do not move anything yet.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 2: Send Aces and Twos to foundations</h3>
              <p className="text-sm text-white/60">
                Move any visible Aces to the foundation immediately. If a Two is exposed and its matching Ace is already on the foundation, send the Two as well. These moves are always correct.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 3: Prioritize face-down reveals</h3>
              <p className="text-sm text-white/60">
                Look for tableau moves that expose hidden cards. When multiple revealing moves exist, prefer the one that digs into the deepest column (columns 5, 6, or 7).
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 4: Evaluate King placements</h3>
              <p className="text-sm text-white/60">
                If an empty column exists or is about to exist, check whether a King with a matching opposite-color Queen is available. If yes, place the King and build. If no productive King is ready, hold the empty column as workspace.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 5: Build short sequences where they serve a purpose</h3>
              <p className="text-sm text-white/60">
                Join alternating-color pairs only when the join reveals a face-down card or creates a sequence that a parent card can host. Skip joins that merely rearrange the face-up layer.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 6: Exhaust all productive tableau moves</h3>
              <p className="text-sm text-white/60">
                Continue making moves that reveal face-down cards or build toward foundations. Each time a new card flips, pause and reassess. A new card may open a chain of plays you could not see before.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 7: Survey the stock</h3>
              <p className="text-sm text-white/60">
                When no more productive tableau moves remain, begin your first pass through the stock. Play only safe moves (Aces, Twos, obvious sequence fits). Note where key cards sit for your second pass.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">Step 8: Plan the second pass</h3>
              <p className="text-sm text-white/60">
                After the survey, you know the deal. Identify the two or three cards you most need from the stock and plan the moves that will access them. In Draw 3, calculate which plays will shift the cycle to make those cards reachable.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="-my-1" />

        {/* ── FAQ ── */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                What is the best first move in Klondike Solitaire?
              </h3>
              <p className="text-white/60 leading-relaxed">
                The best first move is to scan all seven face-up tableau cards before touching anything. If any Aces are visible, move them to the foundations immediately. After that, look for moves that expose face-down cards, especially in the longer columns. The goal of the opening is information, and the more cards you can see, the better your decisions will be for the rest of the game.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Should I always move Aces and Twos to the foundation right away?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Yes. Aces have zero strategic value on the tableau because no card can be placed on top of them in a descending sequence. Twos are nearly as safe because the only card that could land on a Two is an Ace, and Aces should already be on the foundation. Moving both immediately clears space and opens foundation lanes without any downside.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                When should I move a King to an empty column?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Move a King to an empty column only when it will bring a productive sequence with it. The ideal scenario is a Queen of the opposite color already on the board that the King can host. Dropping a lone King into an empty column without a plan locks that column permanently and wastes the workspace. Wait until you know what the King will accomplish before committing it.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Is the opening different in Draw 1 vs Draw 3?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Yes, significantly. In Draw 1, every stock card is accessible on each pass, so the opening focuses on tableau efficiency and revealing face-down cards. In Draw 3, only one of every three stock cards is reachable per pass, so the opening must also account for stock-pile cycle management. Draw 3 openings require more conservative foundation sends and more careful preservation of empty columns.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                How many moves should I plan ahead in the opening?
              </h3>
              <p className="text-white/60 leading-relaxed">
                Try to see at least two to three moves ahead before committing to any action. The goal is not deep calculation but simple consequence checking: if I move this card, what does it reveal, what does it block, and does it leave me with a productive next move? Players who move one card at a time without checking the downstream effect lose games they could have won.
              </p>
            </div>
          </div>
        </section>

        {/* ── Related Guides ── */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Reading">Related Klondike Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="The deeper strategic layer: planning, sequencing, and tempo across all phases of the game." />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips and Tricks" description="Quick tactical tips for raising your win rate in both Draw 1 and Draw 3." />
            <ContentLinkCard href="/klondike-for-beginners" title="Klondike for Beginners" description="First-game walkthrough covering setup, rules, and foundational moves." />
            <ContentLinkCard href="/klondike-mistakes-to-avoid" title="Klondike Mistakes to Avoid" description="The most common errors that cost Klondike players winnable games." />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Ready to put the opening to work?"
          body="Open a Klondike game and play the first ten moves using the checklist. One deal is all it takes to feel the difference."
          primaryLabel="Play Klondike Solitaire"
          primaryHref="/klondike"
          secondaryLabel="Read the full strategy guide"
          secondaryHref="/klondike/strategy"
        />
      </main>
    </ContentLayout>
  );
}
