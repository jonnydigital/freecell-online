import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Draw 1 vs Draw 3 Solitaire | Klondike Comparison Guide (2026)",
  description:
    "Draw 1 vs Draw 3 Klondike Solitaire — complete comparison of rules, win rates, strategy depth, and difficulty. Learn which mode suits your skill level with data-backed analysis.",
  keywords: [
    "draw 1 vs draw 3 solitaire",
    "klondike draw 1 vs draw 3",
    "solitaire draw 1 or draw 3",
    "draw 3 solitaire rules",
    "which is better draw 1 or draw 3",
    "draw 1 solitaire win rate",
    "draw 3 solitaire strategy",
    "klondike solitaire draw modes",
    "solitaire draw 1 rules",
    "draw 3 klondike tips",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/draw-1-vs-draw-3"),
  },
  openGraph: {
    title: "Draw 1 vs Draw 3 Solitaire | Which Mode Should You Play?",
    description:
      "Complete comparison of Klondike Solitaire Draw 1 and Draw 3 modes. Win rates, strategy differences, difficulty levels, and a decision guide based on your skill level.",
    url: absoluteUrl("/klondike/draw-1-vs-draw-3"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the difference between Draw 1 and Draw 3 in Solitaire?",
    answer:
      "In Draw 1, you flip one card at a time from the stock pile and can access every card individually. In Draw 3, you flip three cards at a time and can only play the top card of each group. This means Draw 1 gives you access to all 24 stock cards, while Draw 3 restricts you to roughly one-third of the stock per pass. Draw 1 is easier and more strategic; Draw 3 is harder and adds a significant luck component.",
  },
  {
    question: "What is a good win rate for Draw 1 Klondike Solitaire?",
    answer:
      "A good win rate for Draw 1 Klondike is 60-70%, which indicates solid strategic play. Expert players can achieve 79-82%, which approaches the theoretical maximum of solvable deals. If you are winning less than 40% of Draw 1 games, focusing on fundamentals like uncovering face-down cards and balanced foundation building will produce immediate improvement.",
  },
  {
    question: "What is a good win rate for Draw 3 Klondike Solitaire?",
    answer:
      "A good win rate for Draw 3 Klondike is 15-20%. Expert players who track the stock cycle and use stock manipulation techniques can reach 25-33%. Because Draw 3 restricts stock access so heavily, even perfect play cannot overcome many deals that are theoretically solvable in Draw 1. Winning one in four or five Draw 3 games represents genuinely strong play.",
  },
  {
    question: "Should I start with Draw 1 or Draw 3 Klondike?",
    answer:
      "Start with Draw 1. It lets you see every card in the stock, win more often, and develop good strategic habits in a more forgiving environment. Once you consistently win 60% or more of Draw 1 games, switch to Draw 3 for a greater challenge. Jumping straight to Draw 3 as a beginner is frustrating and teaches you to blame luck rather than develop skill.",
  },
  {
    question: "Is Draw 3 Solitaire rigged or impossible to win?",
    answer:
      "No. Draw 3 is not rigged — it is genuinely harder by design. The restricted stock access means many deals that are solvable in Draw 1 become unwinnable in Draw 3. A win rate of 15-25% is normal and expected. The perception that Draw 3 is impossible often comes from players accustomed to Draw 1 win rates, where 70-80% is achievable. Draw 3 simply has a higher luck component and lower ceiling.",
  },
];

export default function Draw1VsDraw3Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Draw 1 vs Draw 3",
        item: absoluteUrl("/klondike/draw-1-vs-draw-3"),
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Draw 1 vs Draw 3 Klondike Solitaire: Complete Comparison",
    description:
      "Data-backed comparison of Klondike Solitaire Draw 1 and Draw 3 modes covering win rates, strategy, difficulty, and which mode to play.",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    datePublished: "2026-03-12",
    dateModified: "2026-03-12",
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2665"}
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-3 font-medium">
          <Link href="/klondike" className="hover:text-white transition-colors">
            Klondike Solitaire
          </Link>{" "}
          / Draw 1 vs Draw 3
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Draw 1 vs Draw 3 Solitaire
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          A complete comparison of Klondike&apos;s two draw modes — win rates, rules,
          strategy depth, and which one you should play.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-8">
        <article className="space-y-10">
          {/* Introduction */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Fundamental Difference
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike Solitaire — the game most people simply call &quot;Solitaire&quot; —
                comes in two main variants defined by a single rule: how many cards you
                flip from the stock pile at a time. <strong className="text-white/80">Draw 1</strong> flips
                one card. <strong className="text-white/80">Draw 3</strong> flips three. That one rule
                changes everything.
              </p>
              <p>
                Draw 1 is the forgiving, strategic variant where thoughtful players can win
                roughly 80% of their games. Draw 3 is the classic challenge — the version
                bundled with Windows for decades — where even expert play yields a 25-33%
                win rate. Same 52 cards, same seven-column tableau, same four foundations.
                One rule apart. Worlds of difference.
              </p>
              <p>
                This guide breaks down exactly how each mode works, what the numbers say
                about winnability, how strategy changes between them, and which mode is
                right for you. Whether you are a complete beginner choosing your first game
                or a seasoned player looking to understand the mechanics, this comparison
                will give you the full picture.
              </p>
            </div>
          </section>

          {/* How Each Mode Works */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Each Mode Works
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Both Draw 1 and Draw 3 start with the same setup: 28 cards dealt across
                seven tableau columns (7 face-up, 21 face-down), four empty foundation
                piles, and a 24-card stock pile. The only difference is how you access
                the stock. For a full breakdown of setup and rules, see our{" "}
                <Link href="/klondike/how-to-play" className="text-[#D4AF37] hover:underline">
                  How to Play Klondike
                </Link>{" "}
                guide.
              </p>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">
                    Draw 1 Rules
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>Flip <strong className="text-white/90">one card</strong> at a time from the stock</li>
                    <li>Every card in the stock is individually accessible</li>
                    <li>If you cycle through the entire stock without playing a card, the game is stuck</li>
                    <li>Unlimited passes through the stock are allowed</li>
                    <li>You see all 24 stock cards on every pass</li>
                  </ul>
                </div>

                <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">
                    Draw 3 Rules
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>Flip <strong className="text-white/90">three cards</strong> at a time from the stock</li>
                    <li>Only the <strong className="text-white/90">top card</strong> of each group of three is playable</li>
                    <li>The two cards beneath the top card are visible but locked</li>
                    <li>Unlimited passes through the stock are allowed</li>
                    <li>Only ~8 of 24 stock cards are accessible per pass</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mt-3">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Key insight:</strong> In Draw 1, the stock is essentially a queue — you
                  see every card in order. In Draw 3, the stock is more like a restricted deck
                  where two-thirds of the cards are hidden behind others. This restriction is
                  the single factor that makes Draw 3 dramatically harder.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Side-by-Side Comparison Table */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Side-by-Side Comparison
            </h2>
            <div className="text-white/60 leading-relaxed mb-4">
              <p>
                The table below summarizes how Draw 1 and Draw 3 compare across the
                metrics that matter most to players.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/10">
                  <span>Metric</span>
                  <span className="text-emerald-400">Draw 1</span>
                  <span className="text-amber-400">Draw 3</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Win Rate (Expert)</span>
                  <span className="text-emerald-400">79–82%</span>
                  <span className="text-amber-400">25–33%</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Win Rate (Good)</span>
                  <span>60–70%</span>
                  <span>15–20%</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Difficulty</span>
                  <span className="text-emerald-400">Moderate</span>
                  <span className="text-amber-400">Hard</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Strategy Depth</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Skill vs Luck</span>
                  <span className="text-emerald-400">~70% skill</span>
                  <span className="text-amber-400">~50% skill</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Avg. Game Time</span>
                  <span>5–10 min</span>
                  <span>8–15 min</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3 border-b border-white/5">
                  <span className="font-medium text-white/80">Stock Access</span>
                  <span>All 24 cards</span>
                  <span>~8 per pass</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 text-sm px-4 py-3">
                  <span className="font-medium text-white/80">Best For</span>
                  <span>Learning, relaxing</span>
                  <span>Challenge, mastery</span>
                </div>
              </div>
            </div>

            <p className="text-white/40 text-sm mt-3">
              Win rate data is based on computer analysis and aggregated player statistics.
              Individual results vary by experience and play style.
            </p>
          </section>

          {/* Win Rate Deep Dive */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Win Rate Analysis
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Win rates are the clearest way to see the gap between Draw 1 and Draw 3.
                The numbers tell a striking story.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-3">
                  Draw 1: 79–82% Theoretical Maximum
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  Computer analysis of millions of random Klondike deals shows that roughly
                  79–82% are solvable when you can access every stock card individually.
                  This means about 1 in 5 deals is genuinely unwinnable regardless of how
                  well you play — the cards are simply in an impossible configuration.
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Good players typically win 60–70% of Draw 1 games. The gap between 70%
                  and the 82% ceiling represents advanced skills: optimal king placement,
                  precise foundation timing, and multi-move lookahead. For context,{" "}
                  <Link href="/" className="text-[#D4AF37] hover:underline">
                    FreeCell
                  </Link>{" "}
                  has a 99.999% solvability rate — Klondike&apos;s 80% ceiling means luck
                  always plays a role.
                </p>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-3">
                  Draw 3: 10–30% Depending on Skill
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  Draw 3 win rates are harder to pin down because the restricted stock access
                  makes the skill range much wider. Casual players typically win 10–15% of
                  games. Experienced players who track the stock cycle hit 15–20%. Expert
                  players using stock manipulation techniques reach 25–33%.
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Many deals that are solvable in Draw 1 become unwinnable in Draw 3 simply
                  because the cards you need are trapped behind inaccessible stock cards.
                  This is not a flaw — it is the design. Draw 3 was created to be the harder,
                  more challenging variant. Winning one in four games is genuinely strong play.
                </p>
              </div>

              <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
                <p className="text-amber-300/80 text-sm">
                  <strong>Important context:</strong> The 79–82% figure for Draw 1 comes from
                  computer solvers that explore every possible move sequence. Human players make
                  suboptimal decisions, so real-world win rates are lower. Similarly, Draw 3
                  theoretical solvability is higher than 30% — the cap reflects human play with
                  imperfect stock tracking.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Strategy Differences */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Strategy Differences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                While{" "}
                <Link href="/klondike/strategy" className="text-[#D4AF37] hover:underline">
                  core Klondike strategy
                </Link>{" "}
                applies to both modes — uncover face-down cards, balance foundations, choose
                kings wisely — the tactical execution changes significantly between Draw 1
                and Draw 3.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Stock Pile Cycling
                  </h3>
                  <p className="text-sm">
                    <strong className="text-emerald-400">Draw 1:</strong> You see every card on every
                    pass. Use the first pass to survey what is available, then play
                    aggressively on subsequent passes. Stock management is simple — you just
                    need to know what is there.
                  </p>
                  <p className="text-sm mt-2">
                    <strong className="text-amber-400">Draw 3:</strong> You see only every third card
                    per pass. You must mentally track where key cards sit in the cycle. Playing
                    a card shifts the entire cycle, so every stock play has ripple effects on
                    future access. This is the single biggest skill differentiator in Draw 3.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Card Access and Planning Depth
                  </h3>
                  <p className="text-sm">
                    <strong className="text-emerald-400">Draw 1:</strong> With full stock access, you
                    can plan 5–10 moves ahead with confidence. You know exactly which cards
                    are available, so the challenge is pure optimization — finding the best
                    sequence of moves from a known set of options.
                  </p>
                  <p className="text-sm mt-2">
                    <strong className="text-amber-400">Draw 3:</strong> Planning depth is shorter
                    because stock access is uncertain. You might need the 7 of diamonds, but
                    it could be trapped behind two inaccessible cards for the next three passes.
                    Strategy shifts from &quot;find the best sequence&quot; to &quot;work with what is
                    reachable now.&quot;
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Foundation Building Pace
                  </h3>
                  <p className="text-sm">
                    <strong className="text-emerald-400">Draw 1:</strong> You can build foundations
                    more aggressively because any card you send up can be &quot;replaced&quot; by
                    accessing the next needed card from the stock. The full-access stock is a
                    safety net.
                  </p>
                  <p className="text-sm mt-2">
                    <strong className="text-amber-400">Draw 3:</strong> Build foundations
                    conservatively. Sending a card to the foundation when its opposite-color
                    pair is still buried can create a dead end that you cannot recover from —
                    because you may not be able to access the needed card from the stock for
                    several passes.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Empty Column Value
                  </h3>
                  <p className="text-sm">
                    <strong className="text-emerald-400">Draw 1:</strong> Empty columns are useful but
                    not critical. Since you can always find a king in the stock by cycling
                    through, empty columns are more of a convenience than a precious resource.
                  </p>
                  <p className="text-sm mt-2">
                    <strong className="text-amber-400">Draw 3:</strong> Empty columns are significantly
                    more valuable because kings are harder to access from the restricted stock.
                    Protect empty columns and fill them only when you have the right king
                    immediately available.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stock Manipulation (Draw 3 Advanced) */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Draw 3 Stock Manipulation Technique
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                This technique is what separates intermediate Draw 3 players (10–15% win
                rate) from advanced players (25%+). It deserves its own section because
                mastering it is the single most effective way to improve at Draw 3.
              </p>
              <p>
                In Draw 3, the stock is divided into groups of three. On each pass, you see
                cards at positions 3, 6, 9, 12, 15, 18, 21, and 24. The other 16 cards are
                hidden beneath them. But here is the key: every time you play a card from
                the stock, the cycle shifts. The two cards that were beneath the played card
                now occupy different positions, and every card after them shifts forward.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  How to Use Stock Manipulation
                </h3>
                <ol className="list-decimal pl-5 space-y-3 text-sm text-white/70">
                  <li>
                    <strong className="text-white/80">On your first pass, note where key cards are.</strong>{" "}
                    Track aces, kings, and any card you know you need. Note whether they are
                    the accessible top card or buried at position 1 or 2 in a group.
                  </li>
                  <li>
                    <strong className="text-white/80">Identify cards that are &quot;one off.&quot;</strong>{" "}
                    If the ace of hearts is at position 2 in a group, the card at position 3
                    (the accessible one) is blocking it. You need to remove that blocker.
                  </li>
                  <li>
                    <strong className="text-white/80">Play the blocker even if you do not need it.</strong>{" "}
                    Sometimes you play a card from the stock purely to shift the cycle and
                    expose a more valuable card. Place it on the tableau even if it is not
                    ideal — the access it unlocks is worth the cost.
                  </li>
                  <li>
                    <strong className="text-white/80">Recalculate the cycle after each play.</strong>{" "}
                    Every stock card you play changes the positions of all subsequent cards.
                    The more cards you play from the stock, the more the cycle shifts, giving
                    you access to previously trapped cards.
                  </li>
                </ol>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mt-3">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Practice tip:</strong> Start tracking stock positions in{" "}
                  <Link href="/klondike" className="text-emerald-400 hover:underline">
                    Draw 3 games
                  </Link>{" "}
                  by noting just the aces. Once that becomes natural, expand to tracking kings
                  and any card you need for an active sequence. Full stock tracking takes
                  practice but produces dramatic win-rate improvements.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Which Mode Should You Play? */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Which Mode Should YOU Play?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The right mode depends on what you want from the game. Here is a decision
                guide based on skill level and goals.
              </p>

              <div className="space-y-4">
                <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">
                    Choose Draw 1 If...
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>You are new to Klondike or Solitaire in general</li>
                    <li>You want to learn strategy in a forgiving environment</li>
                    <li>You enjoy winning more often than losing</li>
                    <li>You prefer strategic depth over luck-based challenge</li>
                    <li>You want a relaxing, meditative card game</li>
                    <li>Your current win rate in Draw 3 is below 10% and you are frustrated</li>
                  </ul>
                </div>

                <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-amber-400 mb-2">
                    Choose Draw 3 If...
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>You already win 60%+ of Draw 1 games and want more challenge</li>
                    <li>You enjoy the gambling-like tension of uncertain outcomes</li>
                    <li>You want to develop advanced skills like stock tracking</li>
                    <li>You prefer a game where each win feels earned</li>
                    <li>You enjoy the classic Windows Solitaire experience</li>
                    <li>You find Draw 1 too easy or predictable</li>
                  </ul>
                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-2">
                    The Progression Path
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The most effective way to improve at Klondike is to start with Draw 1,
                    build solid{" "}
                    <Link href="/klondike/tips" className="text-[#D4AF37] hover:underline">
                      fundamental habits
                    </Link>
                    , and transition to Draw 3 once Draw 1 feels comfortable. Use Draw 1
                    to master tableau management, foundation balancing, and king placement.
                    Then apply those skills to Draw 3 while adding stock-cycle tracking on
                    top. Skipping Draw 1 is like trying to run before you can walk — the
                    frustration of Draw 3&apos;s low win rate makes it hard to learn the
                    underlying strategy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* History / Origin */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              History and Origins
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike Solitaire originated in the late 19th century, likely named after
                the Klondike region of Canada&apos;s Yukon Territory during the 1896 Gold Rush.
                Prospectors reportedly played the game in saloons and camps, though the
                exact origins are disputed. The game was well-established in card game
                compendiums by the early 1900s.
              </p>
              <p>
                Draw 3 was the original and default variant. Drawing three cards at a time
                was standard in published rules throughout the 20th century. The game
                achieved massive global popularity when Microsoft bundled it as
                &quot;Solitaire&quot; (Draw 3 by default) with Windows 3.0 in 1990.
              </p>
              <p>
                Draw 1 emerged as a recognized variant later, likely popularized by digital
                implementations that offered it as an easier alternative. Its exact origin
                as a named variant is unclear — it may have always existed as a house rule
                simplification but was formalized when software made it a selectable option.
                Today, most{" "}
                <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                  digital solitaire platforms
                </Link>{" "}
                offer both modes, and Draw 1 has become the more popular choice among casual
                players due to its higher win rate.
              </p>
              <p>
                The draw-mode distinction is unique to Klondike among major solitaire
                variants.{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>{" "}
                has no stock pile at all.{" "}
                <Link href="/spider" className="text-[#D4AF37] hover:underline">
                  Spider Solitaire
                </Link>{" "}
                deals from the stock in a completely different way (10 cards at once across
                all columns). Klondike&apos;s draw mechanic is part of what makes it the most
                widely recognized card game in the world.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 rounded-xl p-8">
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Try Both Modes
              </h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Our Klondike game lets you switch between Draw 1 and Draw 3 with a single
                click. Play a few games of each and see which mode fits your style.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/klondike"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
                >
                  Play Klondike Solitaire →
                </Link>
                <Link
                  href="/klondike/strategy"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white/80 font-medium rounded-lg transition-colors"
                >
                  Read the Strategy Guide
                </Link>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Play Klondike Solitaire</span>
                <p className="text-sm text-white/40 mt-1">Play online for free — Draw 1 or Draw 3</p>
              </Link>
              <Link
                href="/klondike/how-to-play"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">How to Play Klondike</span>
                <p className="text-sm text-white/40 mt-1">Complete rules and setup guide</p>
              </Link>
              <Link
                href="/klondike/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Klondike Strategy Guide</span>
                <p className="text-sm text-white/40 mt-1">In-depth strategies for both modes</p>
              </Link>
              <Link
                href="/klondike/tips"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Klondike Tips & Tricks</span>
                <p className="text-sm text-white/40 mt-1">Quick, practical tips for all levels</p>
              </Link>
              <Link
                href="/klondike/winning-strategies"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Winning Strategies</span>
                <p className="text-sm text-white/40 mt-1">Advanced tactics for higher win rates</p>
              </Link>
              <Link
                href="/solitaire-types"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Types of Solitaire</span>
                <p className="text-sm text-white/40 mt-1">20 solitaire variants compared</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
