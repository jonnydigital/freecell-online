import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Flower Garden Solitaire Strategy Guide | Expert Winning Tips",
  description:
    "Master Flower Garden Solitaire: bouquet management, King placement, empty-column creation, foundation order, and garden-bed optimization for higher win rates.",
  keywords: [
    "flower garden solitaire strategy",
    "flower garden solitaire winning strategy",
    "flower garden solitaire tips",
    "how to win flower garden solitaire",
    "flower garden bouquet strategy",
    "flower garden solitaire guide",
    "flower garden solitaire garden beds",
    "flower garden solitaire expert tips",
    "flower garden solitaire empty columns",
    "flower garden solitaire foundation order",
    "flower garden solitaire advanced techniques",
  ],
  alternates: {
    canonical: absoluteUrl("/flower-garden/strategy"),
  },
  openGraph: {
    title: "Flower Garden Solitaire Strategy Guide | Expert Winning Tips",
    description:
      "Advanced strategies for Flower Garden Solitaire: bouquet management, King placement, empty column creation, and foundation building optimization.",
    url: absoluteUrl("/flower-garden/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Flower Garden Solitaire?",
    answer:
      "The best strategy centers on bouquet management and empty column creation. The 16-card bouquet gives you enormous flexibility since every card in it is playable at any time — use this advantage to plan multi-move sequences. Focus on clearing at least one garden bed (column) early, which gives you space to reorganize. Build foundations evenly and be strategic about when you deploy bouquet cards versus when you hold them in reserve.",
  },
  {
    question: "How should I use the bouquet in Flower Garden Solitaire?",
    answer:
      "Think of the bouquet as a 16-card reserve where every card is simultaneously available. Use bouquet cards to fill gaps in sequences, to place on foundations directly, or to enable moves that clear columns. The key discipline is not depleting the bouquet too quickly — each card you play from the bouquet is one fewer option for future moves. Play bouquet cards when they directly advance your position (foundation plays, completing sequences) rather than just because you can.",
  },
  {
    question: "How do I handle Kings in Flower Garden Solitaire?",
    answer:
      "Kings are the biggest positional challenge because they block columns — nothing can be placed on top of a King in descending-rank building. When a King sits at the bottom of a garden bed, that column is effectively locked until the King goes to a foundation (which happens last). Prioritize moving Kings to empty columns where they serve as useful anchors for building long descending sequences, rather than leaving them blocking productive columns.",
  },
  {
    question: "Should I focus on foundation building or tableau organization?",
    answer:
      "Prioritize tableau organization in the early game and foundation building in the mid-to-late game. Early on, your goal is to create empty columns and long sequences — this gives you the reorganization power needed later. Once you have 1-2 empty columns and reasonable sequences, shift to aggressive foundation building. Playing cards to foundations that are 'safe' (no card on the tableau needs them as a building target) is always correct at any stage.",
  },
  {
    question: "What is the win rate for Flower Garden Solitaire?",
    answer:
      "Skilled players can win roughly 60% of Flower Garden deals with optimal play. This is higher than many solitaire variants because the fully-visible bouquet provides exceptional flexibility. The any-suit building rule on the tableau also helps by maximizing your placement options. However, King placement problems and unfavorable card distributions can still create unwinnable deals. Recognizing these early saves time.",
  },
];

export default function FlowerGardenStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Flower Garden Solitaire", item: absoluteUrl("/flower-garden") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/flower-garden/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Flower Garden Solitaire Strategy Guide",
        description: "Advanced strategies for Flower Garden Solitaire covering bouquet management, King placement, empty column creation, and foundation building order.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Flower Garden Solitaire Strategy Guide"
        kicker={<><Link href="/flower-garden" className="hover:text-white transition-colors">Flower Garden Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for mastering the bouquet — from garden bed optimization to King management and foundation building order."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Flower Garden Solitaire", href: "/flower-garden" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Flower Garden strategy centers on three pillars: <strong className="text-white">use the bouquet strategically, not impulsively</strong>,{" "}
          <strong className="text-white">create empty columns early</strong>, and{" "}
          <strong className="text-white">manage Kings as positional anchors, not obstacles</strong>.
          The 16-card bouquet where every card is always available gives you more options than
          almost any other solitaire variant. The challenge is converting that flexibility into
          efficient foundation building without depleting your reserves prematurely.
        </p>
      </div>

      {/* Section 1: Bouquet Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bouquet Management: Your 16-Card Advantage
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The bouquet is what makes Flower Garden unique among solitaire games. Sixteen cards —
          roughly a third of the deck — sit in a reserve where every single card is playable at
          any time. No other solitaire variant gives you this level of immediate access. In{" "}
          <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield
          </Link>
          , only the top reserve card is available. In{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , free cells hold at most 4 cards. Flower Garden&apos;s bouquet is a massive parallel
          resource, and using it well is the core skill of the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The fundamental tension: every bouquet card you play is one fewer option for future turns.
          Early in the game, the bouquet provides a safety net — you can always find <em>something</em>{" "}
          to play. But if you spend bouquet cards carelessly, the mid-game becomes much harder when
          you need specific cards for foundation runs or sequence bridging.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Foundation plays from bouquet are always good.</strong>{" "}
            Playing a bouquet card directly to a foundation advances your position and reduces the
            reserve at the same time. Never hesitate on these.
          </li>
          <li>
            <strong className="text-white/90">Sequence-completing plays are high value.</strong> Using
            a bouquet card to connect two partial sequences on the tableau is worthwhile because it
            creates a longer, more powerful run that can clear a column.
          </li>
          <li>
            <strong className="text-white/90">Avoid &ldquo;parking&rdquo; bouquet cards on the tableau.</strong>{" "}
            Placing a bouquet card onto a column just because it fits is usually wasteful. The card
            was more useful in the bouquet (accessible anytime) than buried in a column.
          </li>
          <li>
            <strong className="text-white/90">Count your bouquet periodically.</strong> When the bouquet
            drops below 8 cards, start being more conservative. Below 4 cards, every play must
            directly advance a foundation or clear a column.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> The bouquet is not a &ldquo;hand of cards to play.&rdquo;
            It is a strategic reserve. The best Flower Garden players end the game with the bouquet
            nearly empty, but they deplete it gradually over the full game — not in a burst at
            the start.
          </p>
        </div>
      </section>

      {/* Section 2: King Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          King Management: The Biggest Positional Challenge
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings are the most problematic cards in Flower Garden because nothing can be placed on
          top of a King in descending-rank building. A King at the bottom of a garden bed blocks
          the entire column — you cannot extend the sequence downward. The column becomes a
          one-way street: you can remove cards from the top, but you cannot add to it once you
          reach the King.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The strategic approach to Kings depends on their location. Kings in the bouquet are
          actually useful — you can deploy them to empty columns where they anchor full
          descending sequences (K-Q-J-10-...). Kings stuck at the bottom of occupied garden
          beds are the real problem, and dealing with them requires column-clearing maneuvers.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Kings in bouquet → save for empty columns.</strong>{" "}
            A bouquet King placed in an empty column starts a fresh sequence that can hold up to 12
            more cards (Q through A). This is one of the most powerful plays in the game.
          </li>
          <li>
            <strong className="text-white/90">Kings at bottom of beds → work above them.</strong>{" "}
            If a King is at the bottom of a garden bed, focus on clearing the cards above it.
            Once all cards above the King are played to foundations or moved elsewhere, the King
            is alone in the column — effectively an empty column with an anchor.
          </li>
          <li>
            <strong className="text-white/90">Kings in the middle of beds → biggest problem.</strong>{" "}
            A King sandwiched between cards you need requires moving everything above it first,
            then dealing with the King. Sometimes using the bouquet to build a parallel sequence
            is the only path.
          </li>
          <li>
            <strong className="text-white/90">Count Kings early.</strong> At the start of each game,
            locate all four Kings. Their positions largely determine the difficulty of the deal.
            Three Kings in the bouquet? Easy game. Three Kings buried mid-column? Prepare for a fight.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Warning:</strong> Do not move a King from the bouquet to the tableau just to
            &ldquo;get it out.&rdquo; A King in the bouquet is not taking up useful space — bouquet
            cards do not block each other. Only deploy a bouquet King when you have a specific plan
            to build a productive sequence on top of it.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Empty Column Creation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Creation: Your Primary Early Goal
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With only 6 garden beds holding 6 cards each, the tableau is relatively small. Creating
          even one empty column gives you critical reorganization space. Each empty column acts
          like a free cell that can hold an entire sequence — far more powerful than a single-card
          cell.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Your first empty column should be your top priority for the first 15-20 moves of the game.
          Target the shortest column or the one with the most foundation-ready cards on top.
          Use bouquet cards to supplement the tableau when they create direct foundation plays
          that thin out a target column.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Target the shortest column first.</strong> If one
            garden bed has only 3-4 cards remaining after initial foundation plays, that is your
            best candidate for clearing.
          </li>
          <li>
            <strong className="text-white/90">Use any-suit building to your advantage.</strong>{" "}
            Unlike{" "}
            <Link href="/penguin" className="text-[var(--gold)] hover:text-white transition-colors">
              Penguin
            </Link>{" "}
            (same-suit only), Flower Garden allows any-suit descending building. This means every
            card has multiple possible destinations, making it much easier to move cards off a
            target column.
          </li>
          <li>
            <strong className="text-white/90">Fill empty columns with Kings.</strong> Once a column
            is empty, the best card to place there is a King (from the bouquet or another column).
            A King starts a fresh 13-card descending sequence and will not be moved until end-game
            foundation building.
          </li>
          <li>
            <strong className="text-white/90">Multiple empty columns are game-winning.</strong> One
            empty column is useful. Two is powerful. Three means you have almost total control over
            the board. Aim for two empty columns by the mid-game.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> An empty column can hold an entire sequence, not just one card.
            This means moving a 5-card sequence to an empty column is valid and frees the original
            column completely. Use this to chain column-clearing moves — clear one column, use it
            as staging, then clear another.
          </p>
        </div>
      </section>

      {/* Section 4: Foundation Building Order */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Order
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden foundations build up from Ace to King in suit — the standard pattern.
          The question is not <em>where</em> cards go but <em>when</em> to play them. Aggressive
          foundation building depletes the tableau and makes reorganization easier, but playing
          a card to the foundation when it is still needed as a tableau building target can
          strand other cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The &ldquo;safe play&rdquo; rule: a card is safe to play to the foundation when both
          cards of the opposite color and one rank lower are already on their foundations. For
          example, the 5 of Hearts is safe when both black 4s (4♠ and 4♣) are on foundations.
          This ensures no card on the tableau could have used the 5♥ as a building target.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces and 2s go immediately.</strong> These are always
            safe — no card needs them as a tableau building target.
          </li>
          <li>
            <strong className="text-white/90">Build foundations evenly.</strong> Keeping all four
            foundations within 2-3 ranks of each other ensures the safe-play rule is satisfied
            more often, enabling faster play.
          </li>
          <li>
            <strong className="text-white/90">Check bouquet Aces first.</strong> Scan the bouquet for
            Aces at the start of every game. They go to foundations immediately, thinning the bouquet
            without losing options.
          </li>
          <li>
            <strong className="text-white/90">Late-game: play aggressively.</strong> Once the bouquet
            is mostly depleted and columns are thin, play to foundations at every opportunity. The
            safe-play rule matters less when few cards remain on the tableau.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Foundation Rank</span>
            <span>Safe Play Rule</span>
            <span>Action</span>
          </div>
          {[
            ["Aces", "Always safe", "Play immediately from any location"],
            ["2s", "Always safe", "Play immediately — nothing builds on an Ace"],
            ["3s-5s", "Check opposite-color cards 1 rank lower", "Play if safe; hold if needed as building target"],
            ["6s-9s", "Check carefully — high impact if wrong", "Only play when safe rule is satisfied or you are certain"],
            ["10s-Kings", "Usually safe by late game", "Play when foundations catch up; Kings always go last"],
          ].map(([rank, rule, action], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{rank}</span>
              <span>{rule}</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Any-Suit Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Exploiting Any-Suit Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden uses any-suit descending building on the tableau — a 9 of any suit can go
          on a 10 of any suit. This is the most permissive building rule in solitaire, giving you
          four possible destinations for every card (one per column with a matching rank+1 at its
          top). This flexibility is your primary advantage and the reason Flower Garden has a
          higher win rate than most variants.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The tradeoff: any-suit building makes it easy to create &ldquo;messy&rdquo; sequences
          where suits are interleaved. These sequences are easy to build but hard to dismantle
          for foundation play, since foundations require in-suit ordering. The skill is using
          any-suit flexibility for short-term organization while maintaining an eye toward
          eventual foundation dismantling.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build in-suit when possible.</strong> Even though
            any suit is allowed, choosing same-suit placements makes future foundation building
            smoother. Treat any-suit as a fallback, not a default.
          </li>
          <li>
            <strong className="text-white/90">Use any-suit to consolidate columns.</strong> The
            main value of any-suit building is merging cards from different columns efficiently.
            Use it to stack cards from a column you are trying to clear, even if the suits mix.
          </li>
          <li>
            <strong className="text-white/90">Short mixed-suit sequences are fine.</strong> A
            3-4 card mixed-suit sequence is easy to dismantle later. A 10-card mixed sequence
            is a nightmare. Keep mixed sequences short.
          </li>
          <li>
            <strong className="text-white/90">Sequences do not move as units.</strong> Unlike
            some solitaire variants, Flower Garden only allows moving one card at a time. Long
            sequences must be dismantled card-by-card, requiring empty columns or bouquet cards
            as temporary storage.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Critical rule:</strong> Only single cards can be moved in Flower Garden — there
            are no supermoves or group moves. A 6-card sequence requires 6 individual moves (with
            5 temporary storage locations) to relocate. This makes empty columns and the bouquet
            even more critical for reorganization.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 6: Reading the Deal */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reading the Deal: First-Move Analysis
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden is a perfect-information game — every card is visible from the start (36 in
          the garden beds, 16 in the bouquet). This means you can and should analyze the full deal
          before making your first move. Experienced players spend 30-60 seconds reading the deal
          to identify opportunities and threats.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Your initial scan should answer five questions: Where are the Aces? Where are the Kings?
          Which column is shortest? Which suits have the best foundation-building chains? And
          what is blocking the most progress?
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Locate all four Aces.</strong> Aces in the bouquet
            go to foundations immediately. Aces buried at the bottom of garden beds need excavation
            plans. Aces on top of beds — play them instantly.
          </li>
          <li>
            <strong className="text-white/90">Assess King positions.</strong> Kings in the bouquet
            are assets (future column anchors). Kings at the bottom of beds are neutral. Kings in
            the middle of beds are liabilities requiring column-clearing work.
          </li>
          <li>
            <strong className="text-white/90">Identify the clearing candidate.</strong> Which column
            can be emptied with the fewest moves? Often it is the column with the most top-accessible
            cards that can go directly to other columns or foundations.
          </li>
          <li>
            <strong className="text-white/90">Trace foundation chains.</strong> For each suit, trace
            the A-2-3-4... sequence and note where each card sits. If a suit has A-2-3-4 all
            accessible, that is a fast foundation run waiting to happen.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Reading shortcut:</strong> Count how many Aces are in the bouquet (free),
            how many Kings are in the bouquet (useful), and what is the shortest garden bed.
            These three numbers give you a quick difficulty estimate: 3+ bouquet Aces with
            2+ bouquet Kings and a 4-card shortest bed? That is a very winnable deal.
          </p>
        </div>
      </section>

      {/* Section 7: Flower Garden vs Canfield */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Flower Garden vs Canfield: Strategic Comparison
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden and{" "}
          <Link href="/canfield/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield
          </Link>{" "}
          are both reserve-based solitaire games, but their reserves work completely differently,
          which reshapes the entire strategy. Understanding the comparison helps players coming
          from one game adapt to the other.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Flower Garden</span>
            <span>Canfield</span>
          </div>
          {[
            ["Reserve size", "16 cards (bouquet)", "13 cards"],
            ["Reserve access", "All cards available simultaneously", "Only top card visible/playable"],
            ["Tableau building", "Any suit descending", "Alternating color descending"],
            ["Foundation start", "Always Aces", "Random base rank"],
            ["Tableau columns", "6 (garden beds)", "4"],
            ["Cards per column", "6", "1 (+ auto-fill from reserve)"],
            ["Stock/waste", "None", "Yes (deal 3)"],
            ["Win rate (skilled)", "~60%", "30-35%"],
            ["Key skill", "Bouquet conservation", "Reserve depletion"],
          ].map(([feature, fg, canfield], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{fg}</span>
              <span>{canfield}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The critical strategic inversion: in Canfield, you want to deplete the reserve as fast
          as possible (it blocks access to hidden cards). In Flower Garden, you want to conserve
          the bouquet as long as possible (every card is simultaneously useful). This is the single
          biggest mindset shift between the two games.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Read the full deal first.</strong> Locate Aces, Kings, and the shortest column
              before making any move.
            </li>
            <li>
              <strong>Play bouquet Aces and 2s immediately.</strong> These are always safe foundation
              plays that thin the bouquet without losing options.
            </li>
            <li>
              <strong>Clear a column within 15-20 moves.</strong> Your primary early goal is creating
              empty space for reorganization.
            </li>
            <li>
              <strong>Conserve the bouquet.</strong> Treat it as a strategic reserve, not a hand to
              empty. Deploy cards for foundation plays and sequence completions, not parking.
            </li>
            <li>
              <strong>Place Kings in empty columns.</strong> A King anchors a full 13-card sequence.
              Save bouquet Kings for this purpose.
            </li>
            <li>
              <strong>Build in-suit when possible.</strong> Any-suit is allowed, but same-suit
              sequences dismantle more cleanly for foundation play.
            </li>
            <li>
              <strong>Keep foundations within 2-3 ranks.</strong> Even building enables the safe-play
              rule and prevents card stranding.
            </li>
            <li>
              <strong>Remember: single card moves only.</strong> Plan reorganization with temporary
              storage (empty columns + bouquet) since sequences cannot move as units.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden" description="Complete rules, setup, and bouquet mechanics explained." />
            <ContentLinkCard href="/flower-garden/tips" title="Flower Garden Tips" description="Quick, practical tips for improving your game." />
            <ContentLinkCard href="/canfield/strategy" title="Canfield Strategy Guide" description="Strategy for another reserve-based solitaire." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Flower Garden knowledge to the test. Play free online Flower Garden Solitaire with unlimited undo, hints, and the full 16-card bouquet."
          primaryLabel="Play Flower Garden"
          primaryHref="/flower-garden"
          secondaryLabel="Learn the Rules"
          secondaryHref="/flower-garden/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More Resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Flower Garden Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/flower-garden" title="Play Flower Garden" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden" description="Complete rules and bouquet mechanics" />
          <ContentLinkCard href="/flower-garden/tips" title="Flower Garden Tips" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/canfield/strategy" title="Canfield Strategy Guide" description="Strategy for another reserve-based solitaire" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
