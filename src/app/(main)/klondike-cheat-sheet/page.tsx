import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

export const metadata: Metadata = {
  title: "Klondike Solitaire Cheat Sheet — Quick Rules Reference",
  description:
    "Printable Klondike Solitaire cheat sheet covering setup, card movement rules, Draw 1 vs Draw 3 differences, scoring systems, keyboard shortcuts, and a decision flowchart. Bookmark this quick reference.",
  keywords: [
    "klondike solitaire cheat sheet",
    "solitaire quick reference",
    "klondike rules cheat sheet",
    "solitaire card movement rules",
    "klondike scoring system",
    "draw 1 vs draw 3 cheat sheet",
    "solitaire keyboard shortcuts",
    "klondike strategy quick tips",
    "solitaire win rate statistics",
    "klondike decision flowchart",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike-cheat-sheet"),
  },
  openGraph: {
    title: "Klondike Solitaire Cheat Sheet — Quick Rules Reference",
    description:
      "Scannable quick reference for Klondike Solitaire: setup, movement rules, Draw 1 vs Draw 3 comparison, scoring, shortcuts, and a decision flowchart.",
    url: absoluteUrl("/klondike-cheat-sheet"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function KlondikeCheatSheetPage() {
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
        name: "Cheat Sheet",
        item: absoluteUrl("/klondike-cheat-sheet"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Klondike Solitaire Cheat Sheet"
        kicker={<><Link href="/klondike" className="hover:text-white transition-colors">Klondike Solitaire</Link> / Cheat Sheet</>}
        subtitle="Every rule, shortcut, and strategy tip on one page. Bookmark this quick reference and never second-guess a move again."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Klondike Solitaire", href: "/klondike" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          <AuthorByline authorSlug="rules-desk" publishedDate="2026-04-12" />

          {/* ── Setup at a Glance ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Setup at a Glance
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike uses a single standard 52-card deck. Deal seven tableau
                columns from left to right: column one gets one card, column two
                gets two, and so on through column seven with seven cards. The top
                card of each column is face-up; every card beneath it is face-down.
                That accounts for 28 cards. The remaining 24 cards form the stock
                pile, placed face-down above the tableau.
              </p>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  Quick Setup Summary
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li><strong className="text-white/90">Deck:</strong> 52 cards, no jokers</li>
                  <li><strong className="text-white/90">Tableau:</strong> 7 columns (1-2-3-4-5-6-7 cards each)</li>
                  <li><strong className="text-white/90">Face-up cards:</strong> 7 (one per column top)</li>
                  <li><strong className="text-white/90">Face-down cards:</strong> 21 (hidden beneath)</li>
                  <li><strong className="text-white/90">Stock pile:</strong> 24 cards remaining</li>
                  <li><strong className="text-white/90">Foundations:</strong> 4 empty piles (one per suit)</li>
                  <li><strong className="text-white/90">Waste pile:</strong> starts empty, receives drawn cards</li>
                </ul>
              </div>
              <p>
                The goal is to move all 52 cards onto the four foundation piles,
                building each suit from Ace through King. For full setup instructions,
                see our{" "}
                <Link href="/klondike/how-to-play" className="text-[#D4AF37] hover:underline">
                  How to Play Klondike
                </Link>{" "}
                guide.
              </p>
            </div>
          </section>

          {/* ── Card Movement Rules ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Card Movement Rules
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Every move in Klondike follows a small set of strict rules.
                Understanding them removes guesswork and speeds up your play.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">
                    Tableau Rules
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>Build columns in <strong className="text-white/90">descending rank</strong></li>
                    <li>Alternate <strong className="text-white/90">red and black</strong> suits</li>
                    <li>Move single cards or ordered sequences</li>
                    <li>Only a <strong className="text-white/90">King</strong> (or King-led sequence) can fill an empty column</li>
                    <li>Flipping a face-down card is automatic after uncovering it</li>
                  </ul>
                </div>

                <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">
                    Foundation Rules
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>Build in <strong className="text-white/90">ascending rank</strong> (Ace to King)</li>
                    <li>Each pile is <strong className="text-white/90">one suit only</strong></li>
                    <li>Must start with the <strong className="text-white/90">Ace</strong></li>
                    <li>Cards can be moved back to the tableau (in most digital versions)</li>
                    <li>Game is won when all four foundations reach King</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  Stock and Waste Rules
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li>Draw from the stock to the waste pile</li>
                  <li>Only the <strong className="text-white/90">top card</strong> of the waste pile is playable</li>
                  <li>When the stock is empty, flip the waste pile to recycle the stock</li>
                  <li>Unlimited redeals in standard rules; limited in Vegas scoring</li>
                </ul>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Draw 1 vs Draw 3 Differences ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Draw 1 vs Draw 3 Differences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The single biggest variable in Klondike is how many cards you
                flip from the stock at a time. This table summarizes everything
                that changes between the two modes.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-white/[0.06] border-b border-white/10">
                      <th className="px-4 py-3 font-semibold text-[#D4AF37]">Feature</th>
                      <th className="px-4 py-3 font-semibold text-emerald-400">Draw 1</th>
                      <th className="px-4 py-3 font-semibold text-amber-400">Draw 3</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Cards flipped per draw</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">3</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Stock cards accessible per pass</td>
                      <td className="px-4 py-3">All 24</td>
                      <td className="px-4 py-3">~8 of 24</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Difficulty</td>
                      <td className="px-4 py-3">Easier</td>
                      <td className="px-4 py-3">Significantly harder</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Skill vs luck balance</td>
                      <td className="px-4 py-3">More skill</td>
                      <td className="px-4 py-3">More luck</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Expert win rate</td>
                      <td className="px-4 py-3">~79-82%</td>
                      <td className="px-4 py-3">~25-33%</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Recommended for</td>
                      <td className="px-4 py-3">Beginners and strategy focus</td>
                      <td className="px-4 py-3">Experienced players seeking challenge</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white/80">Key advanced skill</td>
                      <td className="px-4 py-3">Tableau optimization</td>
                      <td className="px-4 py-3">Stock cycle tracking</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                For a deeper analysis of both modes, read our full{" "}
                <Link href="/klondike/draw-1-vs-draw-3" className="text-[#D4AF37] hover:underline">
                  Draw 1 vs Draw 3 comparison
                </Link>.
              </p>
            </div>
          </section>

          {/* ── Foundation Building Rules ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Building Rules
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The foundations are where you ultimately need every card. Building
                them correctly is straightforward, but the timing of when to send
                cards up is what separates beginners from experienced players.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  Foundation Rules at a Glance
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li>Each foundation starts empty and must begin with an <strong className="text-white/90">Ace</strong></li>
                  <li>Build up in <strong className="text-white/90">sequential order</strong>: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</li>
                  <li>Each pile accepts only <strong className="text-white/90">one suit</strong> (Spades, Hearts, Diamonds, or Clubs)</li>
                  <li>A foundation is complete when it reaches <strong className="text-white/90">King</strong></li>
                  <li>All four foundations complete = you win</li>
                </ul>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Timing tip:</strong> Do not rush cards to the foundations.
                  A Red 6 on a foundation means you cannot use it to hold a Black 5
                  on the tableau. Always ask: &quot;Will I need this card as a
                  tableau building target before I can safely send it up?&quot; Aces
                  and Twos are always safe to send immediately.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* ── Key Strategy Tips ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Key Strategy Tips
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                These ten principles cover the most impactful decisions in
                Klondike. Memorize them and apply them in order of priority.
              </p>

              <ol className="list-decimal list-inside space-y-3 text-white/70 text-sm">
                <li>
                  <strong className="text-white/90">Always uncover face-down cards first.</strong>{" "}
                  Every hidden card is information you cannot use. Prioritize moves
                  that flip face-down cards over moves that rearrange face-up cards.
                </li>
                <li>
                  <strong className="text-white/90">Send Aces and Twos to foundations immediately.</strong>{" "}
                  These cards have no tableau building value. Holding them gains nothing.
                </li>
                <li>
                  <strong className="text-white/90">Keep foundation piles balanced.</strong>{" "}
                  Do not build one suit to 8 while another is on 2. Unbalanced
                  foundations lock cards you need for tableau building.
                </li>
                <li>
                  <strong className="text-white/90">Prefer longer columns for Kings.</strong>{" "}
                  When you have a choice of empty columns, place Kings that can
                  immediately accept other cards into the largest available space.
                </li>
                <li>
                  <strong className="text-white/90">Do not empty a column without a King ready.</strong>{" "}
                  An empty column that stays empty is a wasted resource. Only clear a
                  column when you have a King (or King-led sequence) to fill it.
                </li>
                <li>
                  <strong className="text-white/90">Think two moves ahead before drawing from the stock.</strong>{" "}
                  Exhaust all productive tableau moves before turning to the stock.
                  Every card you play from the tableau changes what the stock can offer.
                </li>
                <li>
                  <strong className="text-white/90">Alternate color placement matters.</strong>{" "}
                  When two cards of the same rank but different colors can go on the
                  same target, choose the one that uncovers more face-down cards.
                </li>
                <li>
                  <strong className="text-white/90">Track the stock in Draw 3.</strong>{" "}
                  Note which cards are in positions 1, 2, and 3 of each group. A card
                  in position 2 or 3 becomes accessible if you play the card above it.
                </li>
                <li>
                  <strong className="text-white/90">Avoid building long descending sequences on the tableau too early.</strong>{" "}
                  A column with K-Q-J-10-9-8-7-6-5-4-3-2 looks impressive but locks
                  twelve cards that cannot reach the foundation until the Ace appears.
                </li>
                <li>
                  <strong className="text-white/90">Recognize when a game is stuck.</strong>{" "}
                  If cycling the stock produces no new playable cards and no tableau
                  moves exist, the game is unwinnable. Starting a new deal is better
                  than forcing moves that go nowhere.
                </li>
              </ol>

              <p>
                For deeper exploration of these concepts, see our{" "}
                <Link href="/klondike/strategy" className="text-[#D4AF37] hover:underline">
                  Klondike Strategy Guide
                </Link>{" "}
                and{" "}
                <Link href="/klondike/tips" className="text-[#D4AF37] hover:underline">
                  Tips and Tricks
                </Link>{" "}
                page.
              </p>
            </div>
          </section>

          {/* ── Win Rate Statistics ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Win Rate Statistics
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                These numbers come from large-scale simulations and aggregated
                player data. They give you a realistic benchmark for measuring
                your own performance.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-white/[0.06] border-b border-white/10">
                      <th className="px-4 py-3 font-semibold text-[#D4AF37]">Skill Level</th>
                      <th className="px-4 py-3 font-semibold text-emerald-400">Draw 1 Win Rate</th>
                      <th className="px-4 py-3 font-semibold text-amber-400">Draw 3 Win Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Beginner</td>
                      <td className="px-4 py-3">25-35%</td>
                      <td className="px-4 py-3">2-5%</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Intermediate</td>
                      <td className="px-4 py-3">45-60%</td>
                      <td className="px-4 py-3">10-15%</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Advanced</td>
                      <td className="px-4 py-3">60-75%</td>
                      <td className="px-4 py-3">15-25%</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Expert</td>
                      <td className="px-4 py-3">79-82%</td>
                      <td className="px-4 py-3">25-33%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white/80">Theoretical maximum (solver)</td>
                      <td className="px-4 py-3">~82%</td>
                      <td className="px-4 py-3">~78-82%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Note:</strong> The theoretical maximum for Draw 3 is
                  similar to Draw 1 because a perfect solver with unlimited
                  lookahead can access the same cards through stock cycling. The
                  enormous gap at the human level exists because human memory and
                  planning cannot replicate solver-level stock tracking.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Scoring Systems ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Scoring Systems: Standard vs Vegas
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike supports two common scoring systems. Which one you play
                affects strategy because the incentive structure changes.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-white/[0.06] border-b border-white/10">
                      <th className="px-4 py-3 font-semibold text-[#D4AF37]">Action</th>
                      <th className="px-4 py-3 font-semibold text-emerald-400">Standard Scoring</th>
                      <th className="px-4 py-3 font-semibold text-amber-400">Vegas Scoring</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Card to foundation</td>
                      <td className="px-4 py-3">+10 points</td>
                      <td className="px-4 py-3">+$5</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Card from waste to tableau</td>
                      <td className="px-4 py-3">+5 points</td>
                      <td className="px-4 py-3">$0</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Flip face-down card</td>
                      <td className="px-4 py-3">+5 points</td>
                      <td className="px-4 py-3">$0</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Card from foundation to tableau</td>
                      <td className="px-4 py-3">-15 points</td>
                      <td className="px-4 py-3">$0</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80">Stock recycle</td>
                      <td className="px-4 py-3">-20 points (Draw 1) / $0 (Draw 3)</td>
                      <td className="px-4 py-3">N/A (limited redeals)</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80">Starting balance</td>
                      <td className="px-4 py-3">0 points</td>
                      <td className="px-4 py-3">-$52 (you &quot;buy&quot; the deck)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white/80">Perfect game</td>
                      <td className="px-4 py-3">~700-760 points</td>
                      <td className="px-4 py-3">+$208 profit ($260 - $52)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                In Standard scoring, recycling the stock costs points, which
                encourages efficient play. In Vegas scoring, you pay $52 upfront
                and earn $5 per foundation card, so every card matters and redeals
                are typically limited to one or three passes. For a complete
                breakdown, visit our{" "}
                <Link href="/klondike/vegas-scoring" className="text-[#D4AF37] hover:underline">
                  Vegas Scoring guide
                </Link>.
              </p>
            </div>
          </section>

          {/* ── Keyboard Shortcuts ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Keyboard Shortcuts
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Playing with keyboard shortcuts is faster than clicking or
                dragging. These shortcuts work in our online Klondike game.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-white/[0.06] border-b border-white/10">
                      <th className="px-4 py-3 font-semibold text-[#D4AF37]">Shortcut</th>
                      <th className="px-4 py-3 font-semibold text-white/80">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60">
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80"><code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">Space</code> or <code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">D</code></td>
                      <td className="px-4 py-3">Draw from stock</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80"><code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">U</code> or <code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">Ctrl+Z</code></td>
                      <td className="px-4 py-3">Undo last move</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80"><code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">N</code></td>
                      <td className="px-4 py-3">New game</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white/80"><code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">R</code></td>
                      <td className="px-4 py-3">Restart current deal</td>
                    </tr>
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-4 py-3 font-medium text-white/80"><code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-xs">H</code></td>
                      <td className="px-4 py-3">Show hint</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-white/80">Double-click a card</td>
                      <td className="px-4 py-3">Auto-move to foundation (if valid)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Speed tip:</strong> Double-clicking is the fastest way
                  to send cards to foundations. Combine it with the draw shortcut
                  to play entire stock cycles without touching your mouse.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* ── Decision Flowchart ── */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Decision Flowchart: When to Draw vs When to Move
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Use this step-by-step checklist before every draw from the stock.
                Work through it from top to bottom. If any step yields a move,
                make that move before considering the stock.
              </p>

              <div className="space-y-3">
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                    Before Drawing from Stock
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-white/70 text-sm">
                    <li>
                      <strong className="text-white/90">Check for Aces and Twos.</strong>{" "}
                      Send any Ace or Two to the foundation immediately. These moves
                      are always free and always correct.
                    </li>
                    <li>
                      <strong className="text-white/90">Look for face-down card reveals.</strong>{" "}
                      Can any single move expose a hidden card? If yes, make that move.
                      Information is the most valuable resource in Klondike.
                    </li>
                    <li>
                      <strong className="text-white/90">Check for foundation-safe cards.</strong>{" "}
                      A card is safe to send to the foundation if both cards of the
                      opposite color and one rank lower are already on foundations.
                      Example: sending a Red 6 up is safe when both Black 5s are
                      already on foundations.
                    </li>
                    <li>
                      <strong className="text-white/90">Look for productive tableau reorganization.</strong>{" "}
                      Can you consolidate columns to free up a space for a waiting King?
                      Can you move a sequence to uncover a card needed elsewhere?
                    </li>
                    <li>
                      <strong className="text-white/90">Check for empty column opportunities.</strong>{" "}
                      Do you have a King ready to fill an empty column? If not, avoid
                      creating empty columns just for the sake of it.
                    </li>
                  </ol>
                </div>

                <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">
                    When to Draw
                  </h3>
                  <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                    <li>No tableau moves uncover face-down cards</li>
                    <li>No cards are safe to send to foundations</li>
                    <li>No productive reorganization is available</li>
                    <li>You need a specific card to continue and it might be in the stock</li>
                  </ul>
                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                    Draw 3 Extra Consideration
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    In Draw 3, sometimes making a less-than-ideal tableau move is
                    correct if it shifts the stock cycle to bring a needed card into
                    the accessible position. Before drawing, ask: &quot;If I play
                    this waste card, will the next draw reveal something I need?&quot;
                    This stock-manipulation awareness is the main skill separating
                    intermediate and advanced Draw 3 players.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard href="/klondike/how-to-play" title="How to Play Klondike" description="Complete rules and setup guide for beginners." />
              <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="In-depth principles for higher win rates." />
              <ContentLinkCard href="/klondike/tips" title="Tips and Tricks" description="Quick, practical tips for every skill level." />
              <ContentLinkCard href="/klondike-for-beginners" title="Klondike for Beginners" description="Step-by-step beginner walkthrough." />
            </ContentBody>
          </CardSection>

          <CtaSection
            heading="Put the Cheat Sheet to Work"
            body="Apply these rules and strategies in a real game. Our Klondike Solitaire plays in your browser with no downloads and no sign-up required."
            primaryLabel="Play Klondike Solitaire"
            primaryHref="/klondike"
            secondaryLabel="Read the Strategy Guide"
            secondaryHref="/klondike/strategy"
          />

          <AdUnit format="horizontal" className="-my-1" />
        </article>
      </main>
    </ContentLayout>
  );
}
