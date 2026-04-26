import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
  ContentLinkCard,
  AuthorByline,
} from "@/components/content";

const PAGE_PATH = "/spider-cheat-sheet";
const PUBLISHED_DATE = "2026-04-12";
const UPDATED_DATE = "2026-04-12";

export const metadata: Metadata = {
  title: `Spider Solitaire Cheat Sheet — Quick Reference Card | ${siteConfig.siteName}`,
  description:
    "A printable quick-reference cheat sheet for Spider Solitaire: setup rules, move rules, dealing rules, win conditions by suit count, strategy tips, key statistics, keyboard shortcuts, and common patterns.",
  keywords: [
    "spider solitaire cheat sheet",
    "spider solitaire rules quick reference",
    "spider solitaire quick guide",
    "spider solitaire move rules",
    "spider solitaire win conditions",
    "spider solitaire keyboard shortcuts",
    "spider solitaire deal rules",
    "spider solitaire strategy tips",
    "spider solitaire reference card",
  ],
  openGraph: {
    title: "Spider Solitaire Cheat Sheet — Quick Reference Card",
    description:
      "Everything you need to play Spider Solitaire on one page: setup, move rules, dealing, win conditions, strategy tips, keyboard shortcuts, and key statistics by suit count.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderCheatSheetPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Cheat Sheet — Quick Reference Card",
      description:
        "A scannable quick-reference card covering Spider Solitaire setup, move rules, dealing rules, win conditions by suit count, strategy tips, common patterns, key statistics, and keyboard shortcuts.",
      author: {
        "@type": "Organization",
        name: "The Rules Desk",
        url: absoluteUrl("/authors/the-rules-desk"),
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        { "@type": "ListItem", position: 3, name: "Cheat Sheet", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Solitaire Cheat Sheet"
        subtitle="Every rule, shortcut, and stat on one page. Bookmark this and never wonder mid-game again."
        kicker="Quick Reference"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-rules-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Quick Setup Summary */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Basics" id="setup" icon={"\u2660"}>
            Quick setup summary
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                <strong className="text-white">Deck:</strong> Two standard
                52-card decks shuffled together (104 cards total).
              </li>
              <li>
                <strong className="text-white">Tableau:</strong> 10 columns.
                The first four columns receive 6 cards each; the remaining
                six columns receive 5 cards each. Only the top card in each
                column is dealt face-up.
              </li>
              <li>
                <strong className="text-white">Stock:</strong> The 50
                remaining cards sit in a stock pile, divided into five
                groups of 10 cards each, dealt on demand.
              </li>
              <li>
                <strong className="text-white">Foundations:</strong> Eight
                foundation slots (one per completed suit run). Cards move
                there automatically when a full King-to-Ace sequence of the
                same suit is assembled in a tableau column.
              </li>
              <li>
                <strong className="text-white">Suit count:</strong> You
                choose 1-suit, 2-suit, or 4-suit before dealing. This
                controls how many distinct suits appear in the double deck
                and determines the difficulty.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Move Rules at a Glance */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="What You Can and Cannot Do" id="move-rules" icon={"\u2665"}>
            Move rules at a glance
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Action</th>
                    <th className="text-left py-2 text-[#D4AF37] font-semibold">Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Place a card on another</td>
                    <td className="py-2">The card being placed must be exactly one rank lower than
                      the card it lands on. Suit does not matter for single-card moves.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Move a group of cards</td>
                    <td className="py-2">All cards in the group must form a descending sequence of
                      the <em>same suit</em>. Mixed-suit sequences cannot be moved as a group.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Place on an empty column</td>
                    <td className="py-2">Any single card or any same-suit descending group can be
                      placed on an empty column. There is no rank restriction.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Complete a suit run</td>
                    <td className="py-2">When a column contains a full 13-card descending sequence
                      (King through Ace) of the same suit, it is automatically moved to a foundation.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Flip a face-down card</td>
                    <td className="py-2">When a face-down card becomes the top card in a column, it
                      is flipped face-up automatically. You cannot flip cards manually.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        {/* Dealing Rules */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Stock Deals" id="dealing-rules" icon={"\u2666"}>
            Dealing rules
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                Click the stock to deal one card face-up onto every tableau
                column (10 cards per deal, 5 deals total = 50 stock cards).
              </li>
              <li>
                <strong className="text-white">Empty-column restriction:</strong>{" "}
                You cannot deal from the stock while any tableau column is
                empty. Fill every empty column first.
              </li>
              <li>
                Stock deals cannot be undone in most implementations. Treat
                each deal as a one-way gate.
              </li>
              <li>
                After the fifth and final stock deal, no more cards enter
                the game. You win or lose with what is on the tableau.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Win Conditions by Suit Count */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Difficulty Modes" id="win-conditions" icon={"\u2663"}>
            Win conditions by suit count
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The win condition is identical across all modes: move all 104
              cards to the foundations by completing eight same-suit
              King-to-Ace runs. What changes is how many distinct suits
              appear in the deck, which controls how often random
              placements match suit.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Mode</th>
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Suits in Deck</th>
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Suit-Match Probability</th>
                    <th className="text-left py-2 text-[#D4AF37] font-semibold">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">1-Suit</td>
                    <td className="py-2 pr-4">1 (e.g., all Spades)</td>
                    <td className="py-2 pr-4">100%</td>
                    <td className="py-2">Beginner</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">2-Suit</td>
                    <td className="py-2 pr-4">2 (e.g., Spades + Hearts)</td>
                    <td className="py-2 pr-4">~50%</td>
                    <td className="py-2">Intermediate</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">4-Suit</td>
                    <td className="py-2 pr-4">4 (all suits)</td>
                    <td className="py-2 pr-4">~25%</td>
                    <td className="py-2">Expert</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-sm">
              Suit-match probability = the chance that a randomly placed
              card matches the suit of the card above it. This single
              number explains most of the difficulty difference between
              modes.
            </p>
          </ContentBody>
        </CardSection>

        {/* Strategy Quick Tips */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Short Version" id="strategy-tips" icon={"\u2660"}>
            Strategy quick tips
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                <strong className="text-white">Expose face-down cards first.</strong>{" "}
                Every hidden card is information you cannot use. Prioritize
                moves that flip face-downs over moves that rearrange
                face-up cards.
              </li>
              <li>
                <strong className="text-white">Protect empty columns.</strong>{" "}
                An empty column is the most powerful resource in Spider. Do
                not fill it casually. Use it as temporary workspace for
                sorting, then restore it.
              </li>
              <li>
                <strong className="text-white">Build same-suit runs when possible.</strong>{" "}
                A mixed-suit descending sequence still organizes the
                tableau, but only a same-suit sequence can be moved as a
                group or completed to a foundation.
              </li>
              <li>
                <strong className="text-white">Delay stock deals.</strong>{" "}
                Every stock deal adds 10 cards to the tableau and can bury
                your progress. Make every possible useful move before
                dealing.
              </li>
              <li>
                <strong className="text-white">Focus on one or two columns.</strong>{" "}
                Trying to organize all 10 columns at once spreads your
                resources too thin. Pick one or two columns to clear and
                channel your moves toward them.
              </li>
              <li>
                <strong className="text-white">Kings block columns.</strong>{" "}
                A King can only be placed in an empty column (nothing is
                higher than a King). Avoid placing Kings in columns unless
                you plan to build a full run on them.
              </li>
              <li>
                <strong className="text-white">Track suits mentally in 4-suit.</strong>{" "}
                In 4-suit mode, mentally note which suits dominate each
                column. This helps you plan group moves several steps
                ahead.
              </li>
              <li>
                <strong className="text-white">Complete suit runs early when possible.</strong>{" "}
                Finishing a King-to-Ace run removes 13 cards from the
                tableau and frees space. If you are close to completing a
                run, it is usually worth the effort to finish it before
                dealing.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* Common Patterns to Watch For */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Recognize These" id="common-patterns" icon={"\u2665"}>
            Common patterns to watch for
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <ul className="list-disc list-inside space-y-3 text-white/80">
              <li>
                <strong className="text-white">The temporary off-suit bridge.</strong>{" "}
                Sometimes placing a card of the wrong suit on a descending
                run is the right move, because it lets you access a
                face-down card underneath. Plan to undo the bridge later
                using an empty column.
              </li>
              <li>
                <strong className="text-white">The cascading reveal.</strong>{" "}
                Moving a group from one column can expose a card that
                enables a move in a second column, which flips a card in a
                third. Scan the full tableau before each move to spot these
                chains.
              </li>
              <li>
                <strong className="text-white">The pre-deal cleanup.</strong>{" "}
                Before every stock deal, look for moves that extend
                same-suit runs, clear columns, or flip face-downs. Stock
                deals lock in the current state, so every improvement you
                make beforehand carries forward.
              </li>
              <li>
                <strong className="text-white">The King trap.</strong>{" "}
                A column with a King at the bottom and non-matching cards
                above it is effectively dead space until you can empty it.
                Recognize King traps early and avoid making them worse.
              </li>
              <li>
                <strong className="text-white">The near-complete run.</strong>{" "}
                If a column has 10 or more cards of the same suit in
                descending order, prioritize finding the remaining cards
                to complete it. The 13-card payoff (clearing the full
                run to the foundation) is worth significant effort.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* Key Statistics */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Know the Numbers" id="key-stats" icon={"\u2666"}>
            Key statistics
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Statistic</th>
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">1-Suit</th>
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">2-Suit</th>
                    <th className="text-left py-2 text-[#D4AF37] font-semibold">4-Suit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Theoretical winnability</td>
                    <td className="py-2 pr-4">~99%</td>
                    <td className="py-2 pr-4">~85-92%</td>
                    <td className="py-2">~45-60%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Beginner win rate</td>
                    <td className="py-2 pr-4">60-75%</td>
                    <td className="py-2 pr-4">30-45%</td>
                    <td className="py-2">1-5%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Intermediate win rate</td>
                    <td className="py-2 pr-4">85-92%</td>
                    <td className="py-2 pr-4">60-70%</td>
                    <td className="py-2">8-15%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Expert win rate</td>
                    <td className="py-2 pr-4">92-96%</td>
                    <td className="py-2 pr-4">70-80%</td>
                    <td className="py-2">30-40%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Average game length</td>
                    <td className="py-2 pr-4">8-12 min</td>
                    <td className="py-2 pr-4">12-20 min</td>
                    <td className="py-2">15-30 min</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Average moves per win</td>
                    <td className="py-2 pr-4">85-110</td>
                    <td className="py-2 pr-4">110-150</td>
                    <td className="py-2">140-200+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-sm">
              Win-rate figures are estimates drawn from community data and
              solver research. Actual rates vary with player experience and
              play speed. For detailed methodology, see our{" "}
              <Link href="/spider-winnability" className="text-[#D4AF37] hover:underline">
                Spider Winnability
              </Link>{" "}
              page.
            </p>
          </ContentBody>
        </CardSection>

        {/* Keyboard Shortcuts */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Play Faster" id="keyboard-shortcuts" icon={"\u2663"}>
            Keyboard shortcuts
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Key</th>
                    <th className="text-left py-2 text-[#D4AF37] font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Ctrl + Z / Cmd + Z</td>
                    <td className="py-2">Undo the last move</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">Ctrl + Y / Cmd + Shift + Z</td>
                    <td className="py-2">Redo an undone move</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">D</td>
                    <td className="py-2">Deal from stock (when available)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">N</td>
                    <td className="py-2">Start a new game</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">H</td>
                    <td className="py-2">Show a hint (highlights a suggested move)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-white font-medium">1-9, 0</td>
                    <td className="py-2">Select column 1 through 10 (0 = column 10)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-sm">
              Shortcuts may vary between implementations. The keys listed
              above apply to our Spider Solitaire game. Check the help
              menu in other versions for their specific bindings.
            </p>
          </ContentBody>
        </CardSection>

        {/* When to Deal vs When to Wait */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Critical Decision" id="deal-vs-wait" icon={"\u2660"}>
            When to deal vs. when to wait
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The stock deal is the highest-stakes decision in Spider.
              Getting it right separates intermediate players from
              strong ones.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#D4AF37] font-semibold">Deal now if...</th>
                    <th className="text-left py-2 text-[#D4AF37] font-semibold">Wait if...</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4">No more useful moves exist on the current tableau.</td>
                    <td className="py-2">You can still flip a face-down card with existing moves.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">All face-down cards in reachable columns are blocked by long mixed-suit sequences.</td>
                    <td className="py-2">An empty column is available and you have not used it to sort yet.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">You have multiple near-complete same-suit runs that need specific cards to finish.</td>
                    <td className="py-2">You can extend a same-suit run by rearranging face-up cards.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Your tableau is heavily tangled and new cards might unblock existing sequences.</td>
                    <td className="py-2">You are close to completing a full King-to-Ace run (fewer than 3 cards away).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The general principle: exhaust all productive moves before
              dealing. A &ldquo;productive move&rdquo; is any move that
              flips a face-down card, extends a same-suit run, or creates
              an empty column. Moves that merely rearrange face-up cards
              without achieving one of those three outcomes are usually
              not worth delaying a deal for.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* Related Pages */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Go Deeper" id="related" icon={"\u2665"}>
            Related Spider guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider/how-to-play"
              title="How to Play Spider Solitaire"
              description="Full rules walkthrough with illustrated examples for every suit count."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Solitaire Strategy"
              description="In-depth strategy guide covering openings, mid-game planning, and endgame technique."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/tips"
              title="Spider Solitaire Tips"
              description="Practical tips to raise your win rate across 1-suit, 2-suit, and 4-suit modes."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-winnability"
              title="Spider Winnability Data"
              description="Research-backed win-rate data and solver analysis for every difficulty mode."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Put the cheat sheet to work"
          body={
            <>
              Rules are easier to remember when you use them. Open a game
              and keep this page in a second tab until the patterns become
              second nature.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the full strategy guide"
          secondaryHref="/spider/strategy"
        />
      </main>
    </ContentLayout>
  );
}
