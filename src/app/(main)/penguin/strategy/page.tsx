import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Penguin Solitaire Strategy Guide | Winning Techniques & Tips",
  description:
    "Master Penguin Solitaire with advanced strategies for flipper management, base rank adaptation, same-suit sequence building, and empty column tactics. Win more games with expert methods.",
  keywords: [
    "penguin solitaire strategy",
    "penguin solitaire winning strategy",
    "penguin solitaire tips",
    "how to win penguin solitaire",
    "penguin solitaire flipper strategy",
    "penguin solitaire guide",
    "penguin solitaire same suit building",
    "penguin solitaire base rank",
    "penguin solitaire empty columns",
    "penguin solitaire advanced techniques",
    "penguin solitaire expert tips",
  ],
  alternates: {
    canonical: absoluteUrl("/penguin/strategy"),
  },
  openGraph: {
    title: "Penguin Solitaire Strategy Guide | Winning Techniques & Tips",
    description:
      "Advanced strategies for Penguin Solitaire: flipper management, base rank adaptation, same-suit building, and empty column tactics.",
    url: absoluteUrl("/penguin/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Penguin Solitaire different from FreeCell?",
    answer:
      "Penguin has three key differences from FreeCell. First, it uses same-suit tableau building instead of alternating colors — you can only place a card on another card of the same suit that is one rank higher. Second, foundations start on a random base rank rather than always starting with Aces. Third, you get only one free cell (called the flipper) instead of four. These constraints make Penguin significantly more restrictive in terms of available moves, requiring more careful planning.",
  },
  {
    question: "How does the random base rank work in Penguin Solitaire?",
    answer:
      "When the game starts, the first card dealt determines the foundation base rank. All four foundations must start with that rank and build upward in suit, wrapping from King through Ace and continuing. For example, if the base rank is 7, foundations build 7-8-9-10-J-Q-K-A-2-3-4-5-6. Cards one rank below the base (6s in this example) become your 'Kings' — the last cards played to foundations and the only cards that can fill empty tableau columns.",
  },
  {
    question: "When should I use the flipper in Penguin Solitaire?",
    answer:
      "Use the flipper as a last resort, not a convenience. The single free cell is your only safety valve — once it is occupied, every move must be direct. The best time to use the flipper is when it enables a chain of moves that opens up the tableau significantly, such as freeing a column or accessing a buried foundation-ready card. Avoid stashing a card in the flipper without a clear plan to retrieve it within 2-3 moves.",
  },
  {
    question: "What cards can fill empty columns in Penguin Solitaire?",
    answer:
      "Only cards one rank below the foundation base rank can fill empty columns. If the base rank is 7, only 6s can go into empty columns. This is a critical constraint — it means empty columns are far less flexible than in FreeCell, where any card can fill an empty cascade. Creating empty columns is valuable only when you have the right rank card available or expect one to appear soon.",
  },
  {
    question: "Is Penguin Solitaire harder than FreeCell?",
    answer:
      "Penguin is generally harder than standard FreeCell. The same-suit building restriction eliminates roughly three-quarters of the placement options you would have with alternating-color building. The single flipper versus four free cells dramatically reduces your temporary storage. However, Penguin compensates slightly with seven tableau columns instead of eight. Skilled players win around 40% of Penguin deals versus 80-90% in FreeCell.",
  },
];

export default function PenguinStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Penguin Solitaire", item: absoluteUrl("/penguin") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/penguin/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Penguin Solitaire Strategy Guide",
        description: "Advanced strategies for Penguin Solitaire covering flipper management, base rank adaptation, same-suit building, and empty column tactics.",
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
        title="Penguin Solitaire Strategy Guide"
        kicker={<><Link href="/penguin" className="hover:text-white transition-colors">Penguin Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for one of solitaire's most restrictive variants — from flipper mastery to same-suit sequencing and base rank adaptation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Penguin Solitaire", href: "/penguin" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Penguin Solitaire strategy revolves around three pillars: <strong className="text-white">protect the flipper</strong>,{" "}
          <strong className="text-white">build same-suit sequences deliberately</strong>, and{" "}
          <strong className="text-white">adapt to the base rank instantly</strong>.
          With only one free cell and same-suit-only tableau building, every move is high-stakes.
          You cannot recover from a clogged flipper or a misplaced sequence.
          Success comes from planning 4-5 moves ahead and treating temporary storage as a
          precious, non-renewable resource.
        </p>
      </div>

      {/* Section 1: Understanding the Base Rank */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding the Base Rank
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Like{" "}
          <Link href="/canfield" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield Solitaire
          </Link>
          , Penguin uses a random foundation base rank determined at the start of each deal.
          The three remaining cards of the base rank are automatically placed on foundations
          during the deal. This means you start with three foundations already seeded — a
          significant head start, but one that reshapes your entire strategic calculus.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The base rank determines two critical things: which cards are immediately valuable
          for foundations, and which card rank can fill empty columns. Cards one rank below the
          base are your &ldquo;Kings&rdquo; — the anchors that sit at the bottom of sequences and
          the only cards eligible to fill empty tableau columns.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Base rank cards</strong> go to foundations immediately.
            Three are pre-placed; find the fourth and get it to a foundation as your top priority.
          </li>
          <li>
            <strong className="text-white/90">Base rank + 1 cards</strong> are your next foundation targets.
            Keep them accessible and avoid burying them under long sequences.
          </li>
          <li>
            <strong className="text-white/90">Base rank - 1 cards</strong> are your column fillers and
            sequence anchors. These are the only cards that can occupy empty columns, making them
            strategically crucial for tableau reorganization.
          </li>
          <li>
            <strong className="text-white/90">Mental re-mapping</strong> is essential at game start.
            Spend five seconds identifying the &ldquo;Ace equivalent,&rdquo; &ldquo;Two equivalent,&rdquo;
            and &ldquo;King equivalent&rdquo; for this specific deal.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Because three base rank cards are pre-placed, you
            effectively start the game with three foundations already begun. This means cards of
            base rank + 1 are immediately playable to foundations — prioritize uncovering and
            playing them early to build momentum.
          </p>
        </div>
      </section>

      {/* Section 2: Flipper Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Flipper Management: Your Only Safety Net
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The flipper — Penguin&apos;s single free cell — is the most important resource in the game.
          In{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , four free cells give you generous temporary storage. In Penguin, you get exactly one.
          This means the flipper must be treated as an emergency resource, not a convenience.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The cardinal rule: never place a card in the flipper without a concrete plan to remove it
          within the next 2-3 moves. A flipper that stays occupied for multiple turns is a flipper
          that cannot save you when you truly need it. The best Penguin players keep the flipper
          empty 80% of the time.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Use the flipper to enable chains, not single moves.</strong>{" "}
            The best flipper plays involve temporarily storing one card to unlock a cascade of 3-4
            subsequent moves that significantly improve the board state.
          </li>
          <li>
            <strong className="text-white/90">Plan the exit before the entry.</strong> Before placing a
            card in the flipper, identify exactly where it will go. If the destination requires moves
            that depend on cards you cannot yet access, do not use the flipper.
          </li>
          <li>
            <strong className="text-white/90">Foundation-bound cards are ideal flipper candidates.</strong>{" "}
            If the card you are about to stash in the flipper can go directly to a foundation on
            the next move, that is a safe use — the flipper will be cleared immediately.
          </li>
          <li>
            <strong className="text-white/90">Avoid flipper use in the early game.</strong> In the first
            10-15 moves, focus on creating space through direct plays. Save the flipper for mid-game
            and late-game situations where the board is tighter.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Stashing a card in the flipper because it &ldquo;might
            be useful later.&rdquo; This is almost always wrong. The card occupies your only safety
            valve, and the speculative benefit rarely materializes. If you cannot articulate the
            specific sequence of moves that will clear the flipper, do not use it.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Same-Suit Sequence Building */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Same-Suit Sequence Building
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The same-suit building constraint is what makes Penguin fundamentally different from
          most solitaire variants. In{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          or FreeCell, alternating colors give you two possible placement targets for any card.
          In Penguin, each card has exactly one valid column to join — the one with a same-suit
          card of the next higher rank at the bottom of its accessible sequence.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This restriction means you must think about suit distribution from the very first move.
          Columns naturally want to become single-suit runs. When you mix suits within a column
          (which is impossible by the rules), you — wait, you <em>cannot</em> mix suits. Every
          sequence in every column is pure suit. This makes columns highly ordered but severely
          limits where cards can go.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Think in suit lanes.</strong> Mentally assign each
            column to a suit based on the cards already there. With 7 columns and 4 suits, you
            have flexibility to dedicate 1-2 columns per suit, with extras for overflow.
          </li>
          <li>
            <strong className="text-white/90">Long sequences are powerful.</strong> A run of 5-6
            cards in the same suit can be moved as a complete unit to another column, provided
            there is space. This gives you column-clearing capability that isolated cards lack.
          </li>
          <li>
            <strong className="text-white/90">Avoid splitting sequences unnecessarily.</strong> Once
            you have built a clean same-suit run, breaking it apart costs moves to rebuild. Only
            split a sequence when it directly enables a foundation play or frees a critical card.
          </li>
          <li>
            <strong className="text-white/90">Watch for suit bottlenecks.</strong> If all accessible
            cards of one suit are buried under cards of another suit, that suit is effectively
            locked. Identify these bottlenecks early and plan around them.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental shortcut:</strong> Count how many cards of each suit are currently
            accessible (top of columns or in the flipper). If a suit has zero accessible cards,
            it is completely blocked. You need to free at least one card of that suit before any
            foundation progress is possible for it.
          </p>
        </div>
      </section>

      {/* Section 4: Empty Column Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns in Penguin are both valuable and restricted. Unlike FreeCell where any card
          can fill an empty cascade, Penguin allows only cards of the rank immediately below the
          base rank to fill empty columns. If the base rank is 9, only 8s can go into empty columns.
          This makes empty columns useful only in specific circumstances.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Despite this restriction, clearing columns is still a powerful strategy. Each empty column
          effectively extends your sequence-moving capacity. With 7 columns and only 4 suits, you
          should aim to keep 1-2 columns empty whenever possible, giving you room to reorganize
          sequences and access buried cards.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track your &ldquo;King equivalent&rdquo; cards.</strong>{" "}
            Know where every card of the column-filling rank is located. Having one available when
            a column clears is essential — an empty column you cannot fill is wasted opportunity.
          </li>
          <li>
            <strong className="text-white/90">Clear columns by building onto other columns first.</strong>{" "}
            Move same-suit sequences onto longer runs in other columns to empty a column. This
            often requires the flipper as a temporary bridge.
          </li>
          <li>
            <strong className="text-white/90">Empty columns amplify supermove capacity.</strong> Each
            empty column multiplies the number of cards you can move as a unit between columns.
            Two empty columns let you move sequences that would otherwise require multiple free cells.
          </li>
          <li>
            <strong className="text-white/90">Do not fill empty columns reflexively.</strong> Sometimes
            keeping a column empty for 2-3 turns enables a larger reorganization. Resist the urge
            to fill it immediately just because you have a valid card.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Empty Columns</span>
            <span>Max Sequence Move</span>
            <span>Strategic Value</span>
          </div>
          {[
            ["0 empty + flipper free", "2 cards", "Minimal — only short sequences movable"],
            ["1 empty + flipper free", "4 cards", "Moderate — can reorganize medium runs"],
            ["2 empty + flipper free", "6 cards", "Strong — significant reorganization power"],
            ["3+ empty + flipper free", "8+ cards", "Dominant — move nearly any sequence"],
          ].map(([cols, maxMove, value], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{cols}</span>
              <span>{maxMove}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> The supermove formula in Penguin is (1 + flipper) × 2^(empty columns).
            With the flipper free and 2 empty columns, you can move 2 × 4 = 8 cards at once.
            This is why maintaining empty columns is so powerful — each one doubles your
            sequence-moving capacity.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Foundation Building Order */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Order
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With three foundations pre-seeded at the start of the game, you have a head start —
          but you also face a coordination challenge. Building all four foundations at roughly the
          same pace is important because running one foundation far ahead can bury cards needed by
          the others.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The wrapping mechanic (foundations build past King through Ace and continue) means that
          every suit must eventually play all 13 ranks. Cards near the base rank should go to
          foundations immediately. Cards far from the base rank in the building sequence are your
          long-term tableau anchors — they will be the last to move up.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Keep foundations within 2 ranks of each other.</strong>{" "}
            If one suit is at base+5 and another is still at base+1, the advanced suit may have
            stripped cards from the tableau that the lagging suit needs for building.
          </li>
          <li>
            <strong className="text-white/90">Play foundation cards immediately when safe.</strong>{" "}
            A card is &ldquo;safe&rdquo; to play to the foundation when no other card currently
            on the tableau needs it as a building target. In same-suit building, this means
            checking only the same suit — is a card of one rank lower still on the tableau
            needing this card as a destination?
          </li>
          <li>
            <strong className="text-white/90">Find the fourth base rank card fast.</strong>{" "}
            Three foundations start pre-seeded; the fourth base rank card is somewhere in the
            tableau. Locating and playing it to complete the foundation quartet should be a
            top-three priority in every game.
          </li>
          <li>
            <strong className="text-white/90">Do not hoard cards on the tableau.</strong> In
            FreeCell, keeping cards on the tableau gives flexibility. In Penguin, the same-suit
            constraint means tableau cards are less flexible — move them to foundations whenever
            the opportunity arises.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Aggressive foundation building can backfire if you remove
            a card that was serving as a building target for another card in the same suit. Before
            playing to a foundation, check whether the card below it in the tableau sequence will
            become stranded without a valid destination.
          </p>
        </div>
      </section>

      {/* Section 6: Opening Moves */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Opening Moves: The First 10 Plays
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The opening is where Penguin games are won or lost. With the initial deal visible and
          three foundations pre-seeded, you have complete information. Use it. Before making your
          first move, scan the entire board and develop a plan for the first 8-10 moves.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Your opening priorities, in order: play any immediately foundation-ready cards (base+1
          rank cards sitting on top of columns), then begin consolidating same-suit sequences to
          free up columns, then identify which suit is most blocked and plan to address it.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Play foundation cards first.</strong> Any card of
            base+1 rank sitting on top of a column goes to its foundation immediately. This frees
            the card below it and advances your position with zero cost.
          </li>
          <li>
            <strong className="text-white/90">Consolidate short same-suit runs.</strong> If two
            columns have cards of the same suit that can connect, merge them. This frees one column
            and creates a longer, more powerful sequence.
          </li>
          <li>
            <strong className="text-white/90">Do not use the flipper in the opening.</strong> The
            first 5-8 moves should be direct plays — foundations and sequence merges. If you need
            the flipper before move 8, re-evaluate your plan.
          </li>
          <li>
            <strong className="text-white/90">Identify the problem suit.</strong> One suit will
            inevitably be more tangled than the others. Identify it early and route your first
            column-clearing efforts toward freeing its cards.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Because the deal is fully visible (no hidden cards),
            Penguin is a pure information game. Every losing game is theoretically detectable
            from the initial position. Train yourself to scan the full board before moving —
            this habit alone will improve your win rate significantly.
          </p>
        </div>
      </section>

      {/* Section 7: Penguin vs FreeCell vs Canfield */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Penguin vs FreeCell vs Canfield
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin borrows mechanics from both{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          and{" "}
          <Link href="/canfield/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Canfield
          </Link>
          , but the combination creates a uniquely constrained experience. Understanding how Penguin
          differs from its relatives helps players avoid importing habits that do not work here.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-4 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>FreeCell</span>
            <span>Canfield</span>
            <span>Penguin</span>
          </div>
          {[
            ["Tableau building", "Alternating color", "Alternating color", "Same suit only"],
            ["Free cells", "4", "0", "1 (flipper)"],
            ["Foundation start", "Always Aces", "Random base", "Random base (3 pre-placed)"],
            ["Empty column fill", "Any card", "Auto from reserve", "Base rank - 1 only"],
            ["Hidden cards", "None", "Reserve + stock", "None"],
            ["Tableau columns", "8", "4", "7"],
            ["Win rate (skilled)", "80-90%", "30-35%", "~40%"],
          ].map(([feature, fc, canfield, penguin], i) => (
            <div
              key={i}
              className={`grid grid-cols-4 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{fc}</span>
              <span>{canfield}</span>
              <span>{penguin}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The biggest habit to break when coming from FreeCell: you cannot use color mixing to
          build interim sequences. Every card must match suit. This means positions that would
          be trivially solvable in FreeCell can be impossible in Penguin. Respect the constraint
          and plan accordingly.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

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
              <strong>Map the base rank immediately.</strong> Identify your &ldquo;Ace,&rdquo; &ldquo;Two,&rdquo;
              and &ldquo;King&rdquo; equivalents before making any move.
            </li>
            <li>
              <strong>Find the fourth base rank card.</strong> Three are pre-placed; locating and
              playing the fourth completes your foundation quartet.
            </li>
            <li>
              <strong>Keep the flipper empty.</strong> Use it only for planned chains with a clear
              exit within 2-3 moves. Never speculatively stash.
            </li>
            <li>
              <strong>Think in suit lanes.</strong> Dedicate columns to suits and build clean
              same-suit sequences. Avoid fragmenting your suits across too many columns.
            </li>
            <li>
              <strong>Create and maintain empty columns.</strong> Each empty column doubles your
              supermove capacity. Keep 1-2 empty whenever possible.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Keep all four within 2 ranks of each other
              to avoid stranding cards.
            </li>
            <li>
              <strong>Scan the full board before moving.</strong> Penguin is a perfect-information
              game. Use that information — plan 5-8 moves ahead.
            </li>
            <li>
              <strong>Recognize dead positions early.</strong> If a suit is completely blocked with
              no path to free it, restart rather than grinding.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin" description="Complete rules, setup, and dealing mechanics explained." />
            <ContentLinkCard href="/penguin/tips" title="Penguin Tips & Tricks" description="Quick, practical tips for improving your Penguin game." />
            <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy guide for the classic FreeCell game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Penguin knowledge to the test. Play free online Penguin Solitaire with unlimited undo, hints, and instant new deals."
          primaryLabel="Play Penguin Solitaire"
          primaryHref="/penguin"
          secondaryLabel="Learn the Rules"
          secondaryHref="/penguin/how-to-play"
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
          More Penguin Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin" description="Complete rules and dealing mechanics" />
          <ContentLinkCard href="/penguin/tips" title="Penguin Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic FreeCell game" />
          <ContentLinkCard href="/canfield/strategy" title="Canfield Strategy Guide" description="Strategy for another base-rank variant" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
