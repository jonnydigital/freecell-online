import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Canfield Solitaire Strategy Guide | Advanced Winning Techniques",
  description:
    "Master Canfield Solitaire with advanced strategies for reserve pile management, foundation base rank adaptation, stock cycling optimization, and tableau wrapping techniques. Win more games with proven methods.",
  keywords: [
    "canfield solitaire strategy",
    "canfield solitaire winning strategy",
    "canfield solitaire advanced techniques",
    "how to win canfield solitaire",
    "canfield reserve pile strategy",
    "canfield foundation strategy",
    "canfield solitaire guide",
    "canfield solitaire card counting",
    "canfield stock cycling strategy",
    "canfield tableau wrapping",
    "canfield solitaire expert tips",
  ],
  alternates: {
    canonical: absoluteUrl("/canfield/strategy"),
  },
  openGraph: {
    title: "Canfield Solitaire Strategy Guide | Advanced Winning Techniques",
    description:
      "Advanced strategies for Canfield Solitaire: reserve management, foundation adaptation, stock cycling, tableau wrapping, and card counting techniques.",
    url: absoluteUrl("/canfield/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most effective strategy for Canfield Solitaire?",
    answer:
      "The most effective strategy revolves around the reserve pile. Prioritize every move that plays a card from the reserve, since the 13-card reserve is the primary bottleneck. Beyond that, adapt quickly to the foundation base rank, cycle the stock with discipline rather than speed, and use tableau wrapping (King to Ace) to build longer sequences that create more movement options.",
  },
  {
    question: "How does the random foundation base rank affect strategy?",
    answer:
      "The foundation base rank changes which cards are high-priority and which are less urgent. If the base rank is 7, then 7s are your Aces — get them to foundations immediately. Cards just below the base rank (6s in this example) become your Kings equivalent, sitting at the bottom of tableau sequences. Mentally re-mapping the rank hierarchy at the start of each game is essential for strong play.",
  },
  {
    question: "Should I empty tableau columns deliberately in Canfield?",
    answer:
      "While the reserve still has cards, emptying a column forces an automatic fill from the reserve. This can be a useful tactic to cycle through reserve cards faster, but you lose control over what fills the space. Once the reserve is empty, empty columns become extremely valuable because you can place any card there, giving you powerful reorganization options. The strategy shifts dramatically once the reserve is cleared.",
  },
  {
    question: "How important is card counting in Canfield Solitaire?",
    answer:
      "Card counting is very important, especially for tracking which cards remain in the stock versus the reserve. Since you can see the top reserve card and all tableau cards, you can deduce what must be in the stock. Tracking foundation-ready cards (the next rank needed for each suit) lets you anticipate when key cards will appear and plan your tableau accordingly. Even rough tracking improves decision-making significantly.",
  },
  {
    question: "When should I give up on a Canfield deal and restart?",
    answer:
      "Restart when you have cycled through the entire stock without playing a single card and have no tableau moves available. Also consider restarting if the reserve is barely depleted after two full stock cycles, or if critical foundation cards are trapped with no path to reach them. Canfield has a low win rate (around 30-35% with optimal play), so recognizing unwinnable states early saves time for winnable deals.",
  },
];

export default function CanfieldStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Canfield Solitaire", item: absoluteUrl("/canfield") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/canfield/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Canfield Solitaire Strategy Guide",
        description: "Advanced strategies for Canfield Solitaire covering reserve management, foundation adaptation, stock cycling, and card counting techniques.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-24",
        dateModified: "2026-03-24",
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
        title="Canfield Solitaire Strategy Guide"
        kicker={<><Link href="/canfield" className="hover:text-white transition-colors">Canfield Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for the casino's toughest patience game — from reserve pile mastery to stock cycling optimization and card counting techniques."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Canfield Solitaire", href: "/canfield" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Canfield Solitaire strategy comes down to three pillars: <strong className="text-white">deplete the reserve aggressively</strong>,{" "}
          <strong className="text-white">adapt to the foundation base rank</strong>, and{" "}
          <strong className="text-white">cycle the stock with discipline</strong>.
          Every decision should serve at least one of these goals. The reserve is your primary obstacle,
          the base rank reshapes your priorities each game, and the stock is a finite resource that
          rewards patience over speed.
        </p>
      </div>

      {/* Section 1: Reserve Pile Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Reserve Pile Management: The Key to Winning
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The 13-card reserve pile is what makes{" "}
          <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield Solitaire
          </Link>{" "}
          uniquely challenging. Only the top card is ever available, and you cannot rearrange or look
          through the pile. Every card you extract from the reserve reveals a new card and brings you
          closer to the point where the game opens up dramatically. Mastering reserve management is
          the single most impactful skill in Canfield.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The fundamental rule is simple: when you have a choice between moving a tableau card and
          moving the top reserve card to the same destination, choose the reserve card almost every
          time. Tableau cards can wait — they are visible and accessible. Reserve cards are a queue
          you must process sequentially, and every delay compounds.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Reserve to foundation</strong> is always the highest-priority
            move. It depletes the reserve and builds the foundation simultaneously.
          </li>
          <li>
            <strong className="text-white/90">Reserve to tableau</strong> is the second-best option. Even
            if the placement is not ideal, getting the card out of the reserve reveals the next card.
          </li>
          <li>
            <strong className="text-white/90">Create landing spots proactively.</strong> Before cycling
            the stock, scan the reserve top card and ask: can I rearrange the tableau to create a valid
            destination for this card?
          </li>
          <li>
            <strong className="text-white/90">Track what you have seen.</strong> As reserve cards are
            played, remember what came before. This helps you anticipate which cards are still buried
            and plan accordingly.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Once the reserve is fully depleted, empty tableau columns
            can be filled with any card of your choosing. This transforms the game — suddenly you have
            the flexibility to reorganize the entire tableau. Getting to this point is the strategic
            inflection point of every Canfield game.
          </p>
        </div>
      </section>

      {/* Section 2: Foundation Base Rank Adaptation */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Base Rank Adaptation
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          where foundations always start with Aces, Canfield uses a random base rank determined by
          the first card dealt to the foundation. This means you must mentally recalibrate your
          priorities at the start of every game. If the base rank is a 9, then all four foundations
          build 9, 10, J, Q, K, A, 2, 3, 4, 5, 6, 7, 8 — wrapping around from King through Ace
          and continuing up.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The base rank determines which cards are immediately valuable and which are long-term
          holds. Cards of the base rank are your foundation starters — move them to foundations
          immediately, just as you would Aces in Klondike. Cards one rank below the base become
          your &ldquo;Kings&rdquo; — they sit at the bottom of tableau sequences and are the
          last cards to reach the foundation.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Base rank cards</strong> go to foundations immediately.
            They are never useful on the tableau.
          </li>
          <li>
            <strong className="text-white/90">Base rank + 1</strong> cards are your &ldquo;Twos&rdquo; equivalent.
            Move them to foundations as soon as the base card is placed.
          </li>
          <li>
            <strong className="text-white/90">Base rank - 1</strong> cards are your sequence anchors.
            They sit at the bottom of tableau columns and are the last to be played.
          </li>
          <li>
            <strong className="text-white/90">Mid-range cards</strong> require judgment. Keep them on the
            tableau when they anchor useful sequences; move them to foundations when they block progress.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental shortcut:</strong> At the start of each game, identify the base rank and
            immediately note what the &ldquo;Ace equivalent,&rdquo; &ldquo;Two equivalent,&rdquo; and
            &ldquo;King equivalent&rdquo; ranks are. This mental mapping takes five seconds and
            prevents costly mid-game confusion about foundation order.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Stock Cycling Optimization */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Stock Cycling Optimization
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Canfield deals cards from the stock three at a time, with only the top card of each
          group playable. This means roughly two-thirds of the stock is inaccessible on any given
          pass. Disciplined stock cycling — knowing when to draw, when to pause, and how to shift
          the three-card alignment — separates strategic players from those who flip mindlessly.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          On your first pass through the stock, your primary goal is reconnaissance. Note where
          key cards fall relative to the three-card groupings. Which foundation-ready cards are
          accessible? Which are buried one or two cards deep? This information becomes your
          planning foundation for subsequent passes.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Exhaust tableau and reserve moves first.</strong> Before
            drawing from the stock, ensure no productive moves exist on the board. Every tableau
            rearrangement you make before drawing could change which stock cards become useful.
          </li>
          <li>
            <strong className="text-white/90">Track the three-card rhythm.</strong> When you play a card
            from the waste pile, the card beneath it becomes available. This shifts which cards are
            accessible on the current pass. Use this to reach buried cards strategically.
          </li>
          <li>
            <strong className="text-white/90">Plan across multiple passes.</strong> If a key card is
            inaccessible this pass, plan tableau moves that will shift the alignment on the next pass.
            Playing or not playing waste cards affects the grouping on future cycles.
          </li>
          <li>
            <strong className="text-white/90">Count your passes.</strong> Some Canfield variants limit
            stock passes. Even with unlimited passes, tracking how many times you have cycled without
            progress tells you whether the game is still viable.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Advanced technique:</strong> Sometimes the correct play is to <em>not</em> play an
            available waste card, because playing it would shift the three-card alignment and bury a
            more important card on the next draw. This requires remembering what is coming next in
            the stock — difficult, but extremely powerful when executed correctly.
          </p>
        </div>
      </section>

      {/* Section 4: Tableau Building With Wrapping */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tableau Building With Wrapping
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Canfield&apos;s tableau follows the standard alternating-color, descending-rank pattern, but
          with a critical twist: sequences wrap from Ace back to King. A red Ace can be placed on a
          black 2, and a black King can be placed on a red Ace. This wrapping mechanic opens up
          building options that do not exist in{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          or{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          .
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Wrapping means sequences can be much longer than 13 cards. A sequence like 4, 3, 2, A, K, Q, J
          is perfectly valid and can be moved as a complete unit between columns. These extended sequences
          give you powerful reorganization capability, letting you shift large groups of cards to open
          up new plays.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build long wrapped sequences deliberately.</strong> The
            longer your sequences, the more cards you can move as a unit, giving you greater
            tableau flexibility.
          </li>
          <li>
            <strong className="text-white/90">Use wrapping to unblock cards.</strong> If a card you need
            is trapped under a King, you can potentially extend the sequence downward through wrapping
            (placing an Ace, then a King below it) to reach the blocked card.
          </li>
          <li>
            <strong className="text-white/90">Sequences move as units.</strong> An entire properly-ordered
            sequence can shift to another column in a single move, freeing the column underneath for
            a new card or auto-fill from the reserve.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Wrapping is powerful but can lead to over-building. Do not
            extend a sequence just because you can — every card locked into a sequence is a card that
            cannot go to the foundation. Build sequences purposefully, with an eye toward eventually
            dismantling them onto foundations.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Empty Column Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns behave differently in Canfield depending on whether the reserve has cards.
          This dual behavior is one of the most important strategic nuances to understand. When the
          reserve is active, empty columns auto-fill from the reserve — you have no choice in what
          goes there. Once the reserve is depleted, empty columns accept any card you choose, becoming
          powerful strategic tools.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          While the reserve still has cards, deliberately emptying columns can serve as a reserve
          acceleration tactic. Each empty column forces one reserve card into play. If you can engineer
          multiple empty columns in a single sequence of moves, you can burn through the reserve
          rapidly. However, this is a double-edged sword — the cards that auto-fill may not fit your
          tableau plans at all.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Phase</span>
            <span>Empty Column Behavior</span>
            <span>Strategy</span>
          </div>
          {[
            ["Reserve active", "Auto-fills from reserve (no choice)", "Use to accelerate reserve depletion when current top card has no direct play"],
            ["Reserve empty", "Fill with any card you choose", "Extremely valuable — use for temporary storage and sequence reorganization"],
            ["Late game", "Fill strategically to unlock foundation runs", "Place cards that enable the longest chain of foundation moves"],
          ].map(([phase, behavior, strategy], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{phase}</span>
              <span>{behavior}</span>
              <span>{strategy}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Once the reserve is empty, treat empty columns like free cells in{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>
            . They are temporary holding spaces that let you reorganize the tableau. The more empty
            columns you have, the more complex the rearrangements you can perform.
          </p>
        </div>
      </section>

      {/* Section 6: Card Counting Techniques */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Card Counting Techniques
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Card counting in Canfield is not about memorizing the entire deck. It is about tracking
          the cards that matter most to your current situation. With only four tableau columns,
          much of the deck is hidden in the reserve and stock at any given time. Strategic counting
          helps you make informed decisions about which moves are likely to pay off and which are
          dead ends.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Start with the basics: count how many cards of the foundation base rank have been played.
          If the base rank is 7 and you can see two 7s on the tableau and one on the foundation,
          the fourth 7 must be in the stock or reserve. Knowing this tells you whether to expect
          it soon or plan around its absence.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track foundation-ready cards.</strong> For each suit,
            know what rank is needed next on the foundation. Then track where those specific cards
            are — visible on the tableau, seen in the stock, or still unknown.
          </li>
          <li>
            <strong className="text-white/90">Count by suit for foundations.</strong> Since foundations
            build in suit, knowing that two Hearts have gone to the foundation and three are visible
            on the tableau means eight Hearts are unaccounted for in the stock and reserve.
          </li>
          <li>
            <strong className="text-white/90">Track stock card positions.</strong> After your first
            pass through the stock, note where critical cards fall in the three-card groupings.
            On subsequent passes, you can plan moves to shift the alignment and access those cards.
          </li>
          <li>
            <strong className="text-white/90">Use elimination logic.</strong> If you need a red 5 for
            a tableau play and both red 5s are visible on the board, no amount of stock cycling will
            produce another one. Redirect your strategy immediately.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>What to Track</span>
            <span>Why It Matters</span>
            <span>Difficulty</span>
          </div>
          {[
            ["Base rank card locations", "Determines when you can start new foundations", "Easy"],
            ["Next foundation rank per suit", "Tells you which cards to prioritize playing", "Easy"],
            ["Stock card positions (3-card groups)", "Enables strategic alignment shifts", "Medium"],
            ["Reserve card memory", "Anticipate what auto-fills will produce", "Medium"],
            ["Full suit accounting", "Reveals impossible situations early", "Hard"],
          ].map(([what, why, difficulty], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{what}</span>
              <span>{why}</span>
              <span className={
                difficulty === "Easy" ? "text-emerald-400" :
                difficulty === "Medium" ? "text-amber-400" :
                "text-red-400"
              }>{difficulty}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: When to Restart */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          When to Restart: Reading Unwinnable States
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Canfield is a difficult game — even expert players win only about 30-35% of deals. This
          means roughly two-thirds of games are extremely difficult or impossible to complete regardless
          of skill. Recognizing unwinnable states early and restarting saves time for the deals where
          smart play actually makes a difference.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The challenge is distinguishing between &ldquo;stuck for now&rdquo; and &ldquo;stuck
          forever.&rdquo; A game that feels locked might open up with a single card from the stock,
          while a game that looks promising might be mathematically impossible due to hidden card
          positions. Here are the signals to watch for.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Full stock cycle with zero plays.</strong> If you cycle
            through the entire stock without playing a single card and have no tableau moves, the
            game is definitively over.
          </li>
          <li>
            <strong className="text-white/90">Reserve stalled after two stock cycles.</strong> If you
            have cycled the stock twice and the reserve has barely shrunk (fewer than 3-4 cards
            played), the game is likely unwinnable.
          </li>
          <li>
            <strong className="text-white/90">Foundation bottleneck.</strong> If the next card needed
            for all four foundations is trapped in inaccessible positions (deep in the reserve with
            blocking cards that cannot be moved), the game may be deadlocked.
          </li>
          <li>
            <strong className="text-white/90">Circular dependency.</strong> Card A needs Card B to be
            freed, but Card B needs Card A to be freed. These mutual blocks are unresolvable.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Good Canfield players restart
            frequently. The skill is not in winning every deal — it is in quickly identifying which
            deals are winnable and playing those deals optimally. Time spent grinding an impossible
            deal is time not spent winning a solvable one.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 8: Canfield vs Klondike Strategy Comparison */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Canfield vs Klondike: Strategic Differences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players approach Canfield with a{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike strategy
          </Link>{" "}
          mindset. While both games use alternating-color tableau building, the strategic priorities
          are fundamentally different. Understanding these differences is essential for adapting
          your play.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>Klondike</span>
            <span>Canfield</span>
          </div>
          {[
            ["Primary obstacle", "Face-down cards in tableau", "13-card reserve pile"],
            ["Foundation start", "Always Aces", "Random base rank (wrapping)"],
            ["Empty columns", "Only Kings can fill", "Auto-fill from reserve, then any card"],
            ["Tableau wrapping", "Not allowed", "Ace wraps to King and vice versa"],
            ["Key skill", "Uncovering hidden cards", "Reserve depletion and base rank adaptation"],
            ["Win rate (skilled)", "40-50% (Draw 1)", "30-35%"],
          ].map(([element, klondike, canfield], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{klondike}</span>
              <span>{canfield}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The biggest mindset shift: in Klondike, your goal is to reveal hidden information (face-down
          cards). In Canfield, most of the hidden information is in the stock — your goal is to process
          the reserve queue and build foundations around a variable base rank. Players who make this
          mental shift see an immediate improvement in their Canfield results.
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
              <strong>Deplete the reserve first.</strong> Every move should prioritize getting cards
              out of the 13-card reserve pile.
            </li>
            <li>
              <strong>Identify your rank hierarchy.</strong> Map the base rank to &ldquo;Ace,&rdquo;
              base + 1 to &ldquo;Two,&rdquo; and base - 1 to &ldquo;King&rdquo; at the start of each game.
            </li>
            <li>
              <strong>Cycle the stock deliberately.</strong> Note card positions on the first pass
              and plan alignment shifts for subsequent passes.
            </li>
            <li>
              <strong>Exploit wrapping.</strong> Build extended sequences through Ace-King boundaries
              to maximize tableau flexibility.
            </li>
            <li>
              <strong>Phase your empty column strategy.</strong> Use empty columns to force reserve
              plays early; use them as free storage once the reserve is clear.
            </li>
            <li>
              <strong>Count what matters.</strong> Track foundation-ready cards and base rank cards —
              not the entire deck.
            </li>
            <li>
              <strong>Restart without guilt.</strong> If two full stock cycles produce minimal
              progress, move on to a winnable deal.
            </li>
            <li>
              <strong>Adapt, do not memorize.</strong> Every game has a different base rank. Rigid
              strategies fail — flexible thinking wins.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/canfield/how-to-play" title="How to Play Canfield" description="Complete rules, setup, and foundation mechanics explained." />
            <ContentLinkCard href="/canfield/tips" title="Canfield Tips & Tricks" description="Quick, practical tips for improving your Canfield game." />
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy guide for the world's most popular solitaire." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Canfield knowledge to the test. Play free online Canfield Solitaire with unlimited undo, stock cycling, and instant new deals."
          primaryLabel="Play Canfield Solitaire"
          primaryHref="/canfield"
          secondaryLabel="Learn the Rules"
          secondaryHref="/canfield/how-to-play"
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

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Canfield Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/canfield" title="Play Canfield Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/canfield/how-to-play" title="How to Play Canfield" description="Complete rules and foundation mechanics" />
          <ContentLinkCard href="/canfield/tips" title="Canfield Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy for the world's most popular solitaire" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
