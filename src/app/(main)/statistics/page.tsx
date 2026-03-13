import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";

export const metadata: Metadata = {
  title: "FreeCell Statistics & Win Rates | Solvability, Difficulty & Math",
  description:
    "Comprehensive FreeCell statistics: 99.999% solvability rate, average win rates, difficulty tiers, famous game numbers, and mathematical analysis. Compare FreeCell win rates with Klondike, Spider, and other solitaire games.",
  keywords: [
    "freecell statistics",
    "freecell win rate",
    "freecell solvability",
    "freecell game 11982",
    "freecell unsolvable deals",
    "freecell difficulty",
    "freecell math",
    "freecell vs klondike",
    "freecell average moves",
    "freecell solvable percentage",
    "freecell famous games",
    "freecell win percentage",
  ],
  openGraph: {
    title: "FreeCell Statistics & Win Rates | Solvability, Difficulty & Math",
    description:
      "99.999% of FreeCell deals are solvable. Explore win rates, difficulty tiers, famous game numbers, and the mathematics behind FreeCell solitaire.",
    url: absoluteUrl('/statistics'),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── FAQ data ── */

const statsFaqs = [
  {
    question: "What percentage of FreeCell games are winnable?",
    answer:
      "Approximately 99.999% of all FreeCell deals are solvable with perfect play. Out of the original 32,000 Microsoft FreeCell deals, only deal #11982 is proven unsolvable. In broader analyses of 1 million deals, only 8 have been confirmed unsolvable.",
  },
  {
    question: "What is the hardest FreeCell game number?",
    answer:
      "Deal #11982 is the most famous difficult deal because it is provably unsolvable — no sequence of legal moves can win it. Among solvable deals, difficulty varies based on how deeply aces are buried and how many same-suit sequences block progress. Deals with all four aces buried under 5+ cards are considered extremely hard.",
  },
  {
    question: "What is a good FreeCell win rate?",
    answer:
      "A good win rate depends on experience. Casual players typically win 40-60% of games. Intermediate players who apply basic strategy win 70-80%. Expert players using advanced techniques like supermoves and careful planning achieve 80-90%+ win rates. Since 99.999% of deals are solvable, a perfect player could theoretically win nearly every game.",
  },
  {
    question: "How many moves does it take to win FreeCell?",
    answer:
      "Most FreeCell games are won in 45-85 moves. Simple deals with accessible aces can be solved in as few as 35-45 moves. Complex deals requiring extensive card reorganization may take 80-120 moves. The number of moves depends on card distribution and how efficiently you plan your sequences.",
  },
  {
    question: "Is FreeCell harder than Klondike?",
    answer:
      "FreeCell is actually more solvable than Klondike — 99.999% vs roughly 79% with perfect play. However, FreeCell is strategically deeper because all cards are visible from the start, making it a game of pure skill rather than luck. Klondike's hidden cards introduce randomness that FreeCell eliminates entirely.",
  },
  {
    question: "Can every FreeCell game be won?",
    answer:
      "No, but very nearly. Out of 1 million analyzed deals, only 8 are confirmed unsolvable. The most famous is deal #11982 from the original Microsoft FreeCell. The other known unsolvable deals are #146692, #186216, #455889, #495505, #512118, #517776, and #781948. Every other deal has a solution.",
  },
  {
    question: "What is the fastest FreeCell time?",
    answer:
      "Speed records depend on the specific deal, but expert players can solve easy deals in under 60 seconds. Competitive speedrunners aim for sub-2-minute solves on random deals. The key to fast play is pattern recognition — experienced players instantly identify opening sequences without calculation.",
  },
  {
    question: "What is Game #11982?",
    answer:
      "Game #11982 is the only provably unsolvable deal among the original 32,000 Microsoft FreeCell game numbers. It was identified through exhaustive computer analysis and has become legendary in the FreeCell community. Despite being unsolvable, thousands of players attempt it every year as a challenge.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "FreeCell Statistics & Win Rates",
  description:
    "Comprehensive statistics on FreeCell solvability, win rates, difficulty tiers, and mathematical analysis of the game.",
  author: { "@type": "Organization", name: "PlayFreeCellOnline.com" },
  publisher: { "@type": "Organization", name: "PlayFreeCellOnline.com" },
  datePublished: "2026-03-06",
  dateModified: "2026-03-06",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: statsFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const tocItems = [
  { href: "#solvability", icon: "\u2660", label: "Solvability" },
  { href: "#win-rates", icon: "\u2665", label: "Win Rates" },
  { href: "#difficulty", icon: "\u2666", label: "Difficulty" },
  { href: "#comparison", icon: "\u2663", label: "Comparison" },
  { href: "#math", icon: "\u2660", label: "Mathematics" },
  { href: "#famous", icon: "\u2665", label: "Famous Games" },
  { href: "#improving", icon: "\u2666", label: "Improve" },
  { href: "#faq", icon: "\u2663", label: "FAQ" },
];

function SectionHeading({
  children,
  id,
  sub,
  icon,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
}) {
  return (
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522] scroll-mt-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function StatisticsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Statistics", item: absoluteUrl('/statistics') },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ── */}
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
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Statistics &amp; Win Rates
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The mathematics behind one of the most solvable card games ever
          created. From solvability rates to difficulty analysis, here&apos;s
          what the numbers reveal about FreeCell.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── TOC Pills ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {tocItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${item.icon === "\u2665" || item.icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-12">

        {/* ── Card 1: Solvability Statistics ── */}
        <section id="solvability" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="The Big Number" id="solvability-heading" icon={"\u2660"}>
              Solvability Statistics
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-6">
                FreeCell stands apart from nearly every other solitaire game
                because of one extraordinary statistic:{" "}
                <strong className="text-[#2a2522]">
                  99.999% of all FreeCell deals are solvable
                </strong>
                . This isn&apos;t an estimate or approximation — it&apos;s been
                verified through exhaustive computational analysis of millions
                of deals.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { stat: "99.999%", label: "Deals solvable" },
                  { stat: "1 in 32,000", label: "Unsolvable (original set)" },
                  { stat: "8 in 1,000,000", label: "Unsolvable (extended set)" },
                ].map((item) => (
                  <div key={item.label} className="card-inset rounded-lg p-5 text-center">
                    <div
                      className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {item.stat}
                    </div>
                    <div className="text-sm text-[#444444]">{item.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-[#444444] leading-relaxed mb-4">
                When Microsoft shipped FreeCell with Windows, it included 32,000
                numbered deals. Researchers and enthusiasts systematically
                solved every single one — except{" "}
                <strong className="text-[#2a2522]">deal #11982</strong>, which
                was proven to have no valid solution through exhaustive search.
                You can{" "}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                  try deal #11982 yourself
                </Link>{" "}
                to see why it&apos;s impossible.
              </p>

              <p className="text-[#444444] leading-relaxed mb-6">
                When analysis expanded to 1 million deals, researchers found
                only 8 total unsolvable configurations. The 8 known unsolvable
                deals are:
              </p>

              <div className="card-inset rounded-lg p-5 mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[11982, 146692, 186216, 455889, 495505, 512118, 517776, 781948].map((num) => (
                    <Link
                      key={num}
                      href={`/game/${num}`}
                      className="text-center py-2 px-3 rounded-md bg-white/50 border border-[#e5e0d8] text-[#D4AF37] font-mono font-semibold hover:bg-[#D4AF37]/10 transition-colors text-sm"
                    >
                      #{num}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card-inset rounded-lg p-5">
                <p className="text-sm text-[#444444]">
                  <strong className="text-[#2a2522]">What makes a deal unsolvable?</strong>{" "}
                  Unsolvable deals typically feature deeply buried key cards
                  (especially aces) combined with card distributions that make
                  it impossible to create enough free space to uncover them.
                  When critical cards are trapped beneath multiple same-suit
                  sequences and all four free cells become occupied before
                  aces can be freed, the game reaches an unwinnable state.
                  The four free cells simply cannot provide enough temporary
                  storage to untangle the tableau.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 2: Average Game Statistics ── */}
        <section id="win-rates" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Player Performance" id="win-rates-heading" icon={"\u2665"}>
              Average Game Statistics
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                FreeCell is a game of{" "}
                <strong className="text-[#2a2522]">perfect information</strong>{" "}
                — every card is visible from the first deal, with no hidden
                deck or face-down cards. This means your win rate is a direct
                reflection of skill, not luck. Here&apos;s how players
                typically perform:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    label: "Expert players",
                    range: "80-90%",
                    desc: "Consistent use of supermoves, careful planning, and efficient free cell management",
                    width: "85%",
                  },
                  {
                    label: "Intermediate players",
                    range: "60-75%",
                    desc: "Solid fundamentals with occasional strategic errors in complex positions",
                    width: "67%",
                  },
                  {
                    label: "Casual players",
                    range: "40-60%",
                    desc: "Basic understanding of rules, learning to plan ahead and manage resources",
                    width: "50%",
                  },
                  {
                    label: "Beginners",
                    range: "20-40%",
                    desc: "Still learning the game mechanics and developing pattern recognition",
                    width: "30%",
                  },
                ].map((tier) => (
                  <div key={tier.label} className="card-inset rounded-lg p-5">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-semibold text-[#2a2522]">{tier.label}</h3>
                      <span
                        className="text-lg font-bold text-[#D4AF37]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        {tier.range}
                      </span>
                    </div>
                    <p className="text-sm text-[#444444] mb-3">{tier.desc}</p>
                    <div className="h-2 bg-[#e5e0d8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full"
                        style={{ width: tier.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Average Moves to Win
                  </h3>
                  <p className="text-sm text-[#444444]">
                    Most games are won in{" "}
                    <strong className="text-[#2a2522]">45-85 moves</strong>.
                    Simple deals with accessible aces can be solved in as few
                    as 35 moves, while complex reorganizations may require 100+
                    moves. Efficient play means fewer moves — expert players
                    average closer to 50, while beginners often exceed 80.
                  </p>
                </div>
                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Average Game Duration
                  </h3>
                  <p className="text-sm text-[#444444]">
                    A typical FreeCell game takes{" "}
                    <strong className="text-[#2a2522]">5-15 minutes</strong>.
                    Speed players solve easy deals under 2 minutes, while
                    difficult deals requiring heavy analysis can take 20-30
                    minutes. The sweet spot for most players is 8-12 minutes
                    per game, balancing speed with careful decision-making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 3: Difficulty Tiers ── */}
        <section id="difficulty" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Deal Classification" id="difficulty-heading" icon={"\u2666"}>
              Difficulty Tiers
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                Not all FreeCell deals are created equal. While 99.999% are
                solvable, their difficulty varies enormously based on the
                initial card distribution. Researchers classify deals into
                tiers based on several measurable factors.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    tier: "Easy",
                    color: "#22c55e",
                    traits: [
                      "One or more aces visible on top of columns",
                      "Few cards of the same suit stacked together",
                      "Short columns with accessible key cards",
                      "Natural alternating-color sequences already formed",
                    ],
                  },
                  {
                    tier: "Medium",
                    color: "#D4AF37",
                    traits: [
                      "Standard distribution — aces buried 2-4 cards deep",
                      "Some same-suit blocking but manageable with free cells",
                      "Requires planning 5-10 moves ahead",
                      "One or two tricky columns that need careful unraveling",
                    ],
                  },
                  {
                    tier: "Hard",
                    color: "#ef4444",
                    traits: [
                      "All four aces deeply buried (5+ cards deep)",
                      "Multiple same-suit sequences creating chain dependencies",
                      "Requires near-perfect use of all four free cells",
                      "May need 80+ moves and extensive use of supermoves",
                    ],
                  },
                ].map((item) => (
                  <div key={item.tier} className="card-inset rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h3
                        className="text-lg font-semibold text-[#2a2522]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        {item.tier} Deals
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {item.traits.map((trait, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#444444]">
                          <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="card-inset rounded-lg p-5">
                <p className="text-sm text-[#444444]">
                  <strong className="text-[#2a2522]">Key difficulty factors:</strong>{" "}
                  The number of initially available free cells (always 4 in
                  standard FreeCell), the depth of buried aces, the number of
                  same-suit card pairs blocking each other, and whether kings
                  are positioned to allow efficient column management. Variants
                  like{" "}
                  <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                    Baker&apos;s Game
                  </Link>{" "}
                  (same-suit building only) are inherently harder because they
                  restrict which cards can stack on each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 4: Comparison with Other Solitaire Games ── */}
        <section id="comparison" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="How FreeCell Stacks Up" id="comparison-heading" icon={"\u2663"}>
              Comparison with Other Solitaire Games
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                FreeCell&apos;s near-perfect solvability rate is exceptional
                among solitaire games. Here&apos;s how it compares to other
                popular variants, each analyzed with optimal play:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e0d8]">
                      <th className="text-left py-3 px-4 font-semibold text-[#2a2522]">Game</th>
                      <th className="text-right py-3 px-4 font-semibold text-[#2a2522]">Solvability</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2a2522]">Hidden Cards?</th>
                      <th className="text-left py-3 px-4 font-semibold text-[#2a2522]">Skill vs Luck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { game: "FreeCell", rate: "~99.999%", hidden: "None", skill: "Pure skill", highlight: true },
                      { game: "Spider (1 suit)", rate: "~99%", hidden: "Yes (stock)", skill: "Mostly skill" },
                      { game: "Klondike (draw 1)", rate: "~79%", hidden: "Yes (tableau + stock)", skill: "Mixed" },
                      { game: "Baker\u2019s Game", rate: "~75%", hidden: "None", skill: "Pure skill" },
                      { game: "Spider (4 suits)", rate: "~33%", hidden: "Yes (stock)", skill: "Mixed" },
                    ].map((row) => (
                      <tr
                        key={row.game}
                        className={`border-b border-[#e5e0d8]/50 ${row.highlight ? "bg-[#D4AF37]/[0.06]" : ""}`}
                      >
                        <td className="py-3 px-4 font-medium text-[#2a2522]">{row.game}</td>
                        <td className="py-3 px-4 text-right font-mono text-[#D4AF37] font-semibold">{row.rate}</td>
                        <td className="py-3 px-4 text-[#444444]">{row.hidden}</td>
                        <td className="py-3 px-4 text-[#444444]">{row.skill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[#444444] leading-relaxed mb-4">
                FreeCell&apos;s combination of near-total solvability and zero
                hidden information makes it unique among solitaire games.
                Unlike{" "}
                <Link href="/freecell-vs-spider" className="text-[#D4AF37] hover:underline">
                  Spider Solitaire
                </Link>
                , where unseen cards in the stock pile can doom your game
                regardless of skill, FreeCell gives you all the information
                you need from the very first deal. Your success depends
                entirely on your decisions.
              </p>

              <p className="text-[#444444] leading-relaxed">
                <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                  Baker&apos;s Game
                </Link>{" "}
                — FreeCell&apos;s direct ancestor — has a much lower
                solvability rate (~75%) because it requires same-suit building
                instead of alternating colors. This restriction dramatically
                reduces the number of valid moves at any point. Explore all
                the differences on our{" "}
                <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                  solitaire types
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 5: Mathematical Analysis ── */}
        <section id="math" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Behind the Numbers" id="math-heading" icon={"\u2660"}>
              Mathematical Analysis
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8 text-[#444444] leading-relaxed">
              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Total Possible Deals
                </h3>
                <p>
                  A standard 52-card deck can be arranged in 52! (factorial)
                  ways — roughly 8.07 &times; 10<sup>67</sup> permutations. In
                  FreeCell, cards are dealt into 8 columns (4 columns of 7
                  cards and 4 columns of 6 cards). Since the order within each
                  column matters but the assignment to columns follows a fixed
                  pattern, the number of distinct FreeCell deals is
                  approximately 1.75 &times; 10<sup>64</sup>. That&apos;s more
                  arrangements than atoms in the observable universe — you will
                  never play the same random deal twice.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Supermove Theory
                </h3>
                <p>
                  The{" "}
                  <Link href="/glossary#supermove" className="text-[#D4AF37] hover:underline">
                    supermove
                  </Link>{" "}
                  is the mathematical engine that makes FreeCell solvable. The
                  maximum number of cards you can move in a single logical
                  operation follows this formula:
                </p>
                <div className="card-inset rounded-lg p-5 my-4 text-center">
                  <p
                    className="text-lg sm:text-xl font-semibold text-[#2a2522]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Max cards = (1 + free cells) &times; 2<sup>empty columns</sup>
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[
                    { cells: "4 free cells, 0 empty columns", result: "5 cards" },
                    { cells: "3 free cells, 1 empty column", result: "8 cards" },
                    { cells: "2 free cells, 2 empty columns", result: "12 cards" },
                    { cells: "1 free cell, 3 empty columns", result: "16 cards" },
                  ].map((ex) => (
                    <div key={ex.cells} className="card-inset rounded-lg p-3 flex justify-between items-center text-sm">
                      <span className="text-[#444444]">{ex.cells}</span>
                      <span className="font-mono font-semibold text-[#D4AF37]">{ex.result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Why More Free Cells = Exponentially More Power
                </h3>
                <p>
                  The formula reveals why empty columns are so much more
                  valuable than free cells. Each empty column{" "}
                  <em>doubles</em> your maximum move size because it can serve
                  as a temporary staging area for an entire sequence, not just
                  a single card. This exponential relationship is why the{" "}
                  <Link href="/strategy" className="text-[#D4AF37] hover:underline">
                    strategy guide
                  </Link>{" "}
                  emphasizes keeping columns empty above all else.
                </p>
                <p className="mt-3">
                  In mathematical terms, each free cell adds linearly to your
                  capacity (+1), while each empty column multiplies it
                  (&times;2). Going from 0 to 1 empty column with 4 free
                  cells jumps you from 5 to 10 cards — a 100% increase from
                  a single column. This is why filling your last empty column
                  is often a game-ending mistake.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 6: Famous Game Numbers ── */}
        <section id="famous" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Legendary Deals" id="famous-heading" icon={"\u2665"}>
              Famous Game Numbers
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                Certain FreeCell deal numbers have become legendary in the
                community. These games have been played, analyzed, and
                debated by millions of players worldwide.
              </p>

              <div className="space-y-4">
                {[
                  {
                    number: "#11982",
                    title: "The Impossible Deal",
                    desc: (
                      <>
                        The only provably unsolvable deal among the original
                        32,000 Microsoft FreeCell games. Exhaustive computer
                        analysis confirmed that no sequence of legal moves can
                        win this game. It became a holy grail for FreeCell
                        players worldwide, with thousands attempting it before
                        accepting its impossibility.{" "}
                        <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                          Try it yourself
                        </Link>{" "}
                        and see why.
                      </>
                    ),
                  },
                  {
                    number: "#1",
                    title: "The Most Played Deal",
                    desc: (
                      <>
                        As the first numbered deal in Microsoft FreeCell, Game
                        #1 is by far the most played FreeCell deal in history.
                        It&apos;s a moderately easy deal that most players
                        encounter on their very first session. It has become
                        the de facto benchmark for comparing strategies.{" "}
                        <Link href="/game/1" className="text-[#D4AF37] hover:underline">
                          Play Game #1
                        </Link>
                        .
                      </>
                    ),
                  },
                  {
                    number: "#617",
                    title: "Microsoft\u2019s Original Default",
                    desc: (
                      <>
                        In early versions of Microsoft FreeCell, Game #617 was
                        the default deal that loaded when you opened the game
                        without selecting a number. It&apos;s a well-balanced
                        deal — not too easy, not too hard — making it an ideal
                        introduction.{" "}
                        <Link href="/game/617" className="text-[#D4AF37] hover:underline">
                          Play Game #617
                        </Link>
                        .
                      </>
                    ),
                  },
                ].map((game) => (
                  <div key={game.number} className="card-inset rounded-lg p-5">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className="text-xl font-bold text-[#D4AF37] font-mono"
                      >
                        {game.number}
                      </span>
                      <h3
                        className="text-lg font-semibold text-[#2a2522]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        {game.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#444444] leading-relaxed">{game.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-[#444444] leading-relaxed mt-6">
                Explore more notable deals on our{" "}
                <Link href="/winning-deals" className="text-[#D4AF37] hover:underline">
                  winning deals
                </Link>{" "}
                page, which features curated collections of easy, hard, and
                historically significant game numbers.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 7: Improving Your Win Rate ── */}
        <section id="improving" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Get Better" id="improving-heading" icon={"\u2666"}>
              Improving Your Win Rate
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                Since nearly every FreeCell deal is solvable, improving your
                win rate comes down to developing better habits and deeper
                strategic thinking. Here are proven ways to push your
                percentage higher:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    num: "01",
                    title: "Study the Strategy Guide",
                    body: (
                      <>
                        Our comprehensive{" "}
                        <Link href="/strategy" className="text-[#D4AF37] hover:underline">
                          strategy guide
                        </Link>{" "}
                        covers everything from the three fundamental laws of
                        FreeCell to expert-level endgame techniques. Master
                        the supermove formula, learn when to sacrifice
                        sequences, and understand foundation timing rules.
                      </>
                    ),
                  },
                  {
                    num: "02",
                    title: "Practice with Daily Challenges",
                    body: (
                      <>
                        Our{" "}
                        <Link href="/streak" className="text-[#D4AF37] hover:underline">
                          Streak mode
                        </Link>{" "}
                        challenges you to win consecutive games, building
                        consistency and forcing careful play. Start with a
                        goal of 3 wins in a row, then push for 5, then 10.
                        Streaks punish careless mistakes and reward patient
                        strategy.
                      </>
                    ),
                  },
                  {
                    num: "03",
                    title: "Use Ghost Mode to Learn",
                    body: "Ghost mode lets you see the solver\u2019s recommended moves, helping you understand optimal play patterns. Watch how the solver handles difficult positions, then try to replicate that thinking in your own games. It\u2019s like having a coach watching over your shoulder.",
                  },
                  {
                    num: "04",
                    title: "Apply Quick Tips",
                    body: (
                      <>
                        Check our{" "}
                        <Link href="/tips" className="text-[#D4AF37] hover:underline">
                          tips page
                        </Link>{" "}
                        for bite-sized tactical advice you can immediately
                        apply: always scan the full board before your first
                        move, keep at least one free cell empty, and never
                        fill your last empty column unless it wins the game.
                      </>
                    ),
                  },
                  {
                    num: "05",
                    title: "Use Undo Aggressively",
                    body: "FreeCell has no hidden information, so using undo is not cheating — it\u2019s exploring. Expert players routinely undo 10-20 moves to test different lines of play. Treat undo as a strategic tool for finding the optimal path through difficult positions.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
                      {item.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#2a2522] text-lg mb-2">{item.title}</h3>
                      <p className="text-[#444444] leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 8: FAQ ── */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2663"}>
              Frequently Asked Questions
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {statsFaqs.map((item, i) => (
                <div key={i}>
                  <h3
                    className="font-medium text-[#2a2522] text-lg mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {item.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">
                    {item.answer}
                  </p>
                  {i < statsFaqs.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Test the Statistics Yourself
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                With 99.999% of deals solvable, the question isn&apos;t
                whether you can win — it&apos;s how efficiently you can do it.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                    backgroundSize: "200% 100%",
                    color: "#1a1a0a",
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/game/11982"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Try The Impossible Deal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
