import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import {
  ContentHero,
  JsonLd,
  CtaSection,
  ContentLinkCard,
  CardSection,
  SectionHeading,
  ContentBody,
  RelatedArticles,
} from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire Cheat Sheet — Printable Quick Reference",
  description:
    "A printable Klondike Solitaire cheat sheet: opening moves, Draw 1 vs Draw 3 decision matrix, Vegas scoring payouts, King placement rules, and the 10 most common mistakes.",
  keywords: [
    "klondike solitaire cheat sheet",
    "klondike cheat sheet printable",
    "klondike solitaire quick reference",
    "klondike draw 1 vs draw 3 guide",
    "klondike vegas scoring cheat sheet",
    "klondike king placement",
    "klondike opening moves",
    "solitaire cheat sheet",
    "how to win klondike solitaire",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike-cheat-sheet"),
  },
  openGraph: {
    title: "Klondike Solitaire Cheat Sheet — Printable Quick Reference",
    description:
      "Printable quick reference for Klondike Solitaire: opening moves, Draw 1 vs Draw 3 decisions, Vegas payouts, and common mistakes.",
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
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Klondike Solitaire", item: absoluteUrl("/klondike") },
      { "@type": "ListItem", position: 3, name: "Cheat Sheet", item: absoluteUrl("/klondike-cheat-sheet") },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire Cheat Sheet — Printable Quick Reference",
    description:
      "Printable quick reference for Klondike Solitaire: opening moves, Draw 1 vs Draw 3 decisions, Vegas payouts, and common mistakes.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/klondike-cheat-sheet"),
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <ContentHero
        title="Klondike Solitaire Cheat Sheet"
        subtitle="A one-page reference you can print or bookmark. Opening priorities, Draw 1 vs Draw 3 decisions, Vegas scoring, and the mistakes that cost most players games."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Klondike Solitaire", href: "/klondike" }]}
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-10 text-white/80">
          {/* Intro */}
          <section className="space-y-4 leading-relaxed">
            <p>
              Klondike is the game most people mean when they say &ldquo;Solitaire.&rdquo; Its rules are
              simple but the decision tree is deep, and small opening mistakes compound quickly. This
              cheat sheet is the distilled version of every Klondike strategy page on the site: one
              screen, no fluff, print-friendly.
            </p>
            <p className="text-sm text-white/50">
              Share this page with a Klondike-player friend, or bookmark it and pull it up next time you
              hit a game that feels stuck.
            </p>
          </section>

          {/* Opening priorities */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Opening Priorities (in order)
            </h2>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
              <li>Send any visible Ace to the foundations immediately.</li>
              <li>Send any visible 2 to the foundations if its Ace is already up.</li>
              <li>
                Prefer the move that uncovers a face-down card in the longest column (column 7 first,
                then 6, then 5).
              </li>
              <li>
                Move a King to an empty column only if it uncovers a face-down card AND you have a Queen
                of the opposite color ready.
              </li>
              <li>
                If two moves both uncover a face-down card, pick the move on the column that still has
                the most face-down cards.
              </li>
              <li>Draw from the stock only after all tableau-to-tableau moves are exhausted.</li>
            </ol>
          </section>

          <AdUnit format="horizontal" className="my-2" />

          {/* Draw 1 vs Draw 3 */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Draw 1 vs Draw 3 — Decision Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.05]">
                    <th className="text-left p-3 border border-white/10">Factor</th>
                    <th className="text-left p-3 border border-white/10">Draw 1 (Turn 1)</th>
                    <th className="text-left p-3 border border-white/10">Draw 3 (Turn 3)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-white/10 font-semibold">Expert win rate</td>
                    <td className="p-3 border border-white/10">40-50%</td>
                    <td className="p-3 border border-white/10">10-20%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10 font-semibold">Theoretical ceiling</td>
                    <td className="p-3 border border-white/10">~82% (perfect play)</td>
                    <td className="p-3 border border-white/10">~35% (perfect play)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10 font-semibold">Stock access</td>
                    <td className="p-3 border border-white/10">Every card playable each cycle</td>
                    <td className="p-3 border border-white/10">Only top of each 3-card group</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10 font-semibold">Best for</td>
                    <td className="p-3 border border-white/10">Beginners, casual play, confidence-building</td>
                    <td className="p-3 border border-white/10">Experienced players, tournaments, Vegas</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10 font-semibold">Key extra skill</td>
                    <td className="p-3 border border-white/10">Uncovering face-down cards</td>
                    <td className="p-3 border border-white/10">Counting stock passes, alignment</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Learn on Draw 1 until you hit a 40%+ win rate. Then switch to Draw 3 — the harder version
              is what most of the historical Solitaire canon and Vegas rule sets assume.
            </p>
          </section>

          {/* Vegas scoring */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vegas Scoring Quick Reference
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.05]">
                    <th className="text-left p-3 border border-white/10">Event</th>
                    <th className="text-left p-3 border border-white/10">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-white/10">Start of game (&ldquo;buy the deck&rdquo;)</td>
                    <td className="p-3 border border-white/10">&minus;$52</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Each card played to foundation</td>
                    <td className="p-3 border border-white/10">+$5</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Full board cleared (all 52 to foundation)</td>
                    <td className="p-3 border border-white/10">+$260 gross → +$208 net profit</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Stock passes allowed (strict Vegas)</td>
                    <td className="p-3 border border-white/10">1 pass only</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Stock passes allowed (common variant)</td>
                    <td className="p-3 border border-white/10">3 passes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Realistic profit rate (skilled, single pass)</td>
                    <td className="p-3 border border-white/10">5-10% of hands</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Vegas rewards conservative play. Do not send a card to the foundation if you will need it
              to build a tableau sequence within the next few moves — that $5 costs you more than it pays.
            </p>
          </section>

          <AdUnit format="auto" className="my-2" />

          {/* King placement */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              King Placement Checklist
            </h2>
            <p className="leading-relaxed mb-3">Before moving a King to an empty column, confirm:</p>
            <ul className="space-y-2 leading-relaxed">
              <li>✅ It uncovers at least one face-down card, OR</li>
              <li>✅ You have an opposite-color Queen ready to build on it, OR</li>
              <li>✅ It frees a trapped card that will let you reach an Ace or 2.</li>
              <li>❌ Otherwise: leave the King where it is.</li>
            </ul>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Empty columns are most valuable when they are empty. Do not fill them with a King just
              because you can — an empty column is the most powerful tempo tool in the game.
            </p>
          </section>

          {/* Color choice */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Which Color King Goes in the Empty Column?
            </h2>
            <ul className="space-y-2 leading-relaxed">
              <li>
                <strong className="text-white/90">Red King (♥ or ♦):</strong> you will build Black Queen,
                Red Jack, Black 10, Red 9, etc. Pick the red King when you have more black Queens than
                red Queens available.
              </li>
              <li>
                <strong className="text-white/90">Black King (♠ or ♣):</strong> you will build Red Queen,
                Black Jack, Red 10, Black 9, etc. Pick the black King when you have more red Queens
                than black Queens available.
              </li>
            </ul>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              This sounds minor but determines whether your next 10 moves flow or stall. Look at the
              tableau and stock before committing.
            </p>
          </section>

          {/* Common mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 10 Mistakes That Cost Most Games
            </h2>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
              <li>Playing Aces and 2s to the foundation too eagerly when they were still useful as tableau anchors.</li>
              <li>Filling an empty column with the first available King instead of the right-color one.</li>
              <li>Moving a card just because you can, without checking whether it uncovers a face-down card.</li>
              <li>Drawing from the stock before exhausting tableau-to-tableau moves.</li>
              <li>Failing to count remaining stock cards in Draw 3 — missing the last-pass planning window.</li>
              <li>Building long mixed-color sequences in a column you will need to unstack later.</li>
              <li>Ignoring a face-down card in the shortest column because the longer columns looked more promising.</li>
              <li>Sending a 3 or 4 to the foundation when you still needed it to anchor a 2 of the opposite color.</li>
              <li>Not restarting a deal that is clearly dead — sunk-cost bias.</li>
              <li>Playing every new deal identically instead of reading what the deal gives you first.</li>
            </ol>
          </section>

          {/* Print tip */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Print this page
            </h2>
            <p className="text-white/60 leading-relaxed">
              Use your browser&apos;s Print command (Ctrl/Cmd + P) to print this cheat sheet. The page is
              laid out as a single column so it prints cleanly on a single sheet of paper. Tape it next
              to your monitor if you are grinding through a Klondike run.
            </p>
          </section>

          <RelatedArticles cluster="klondike" heading="Go Deeper on Klondike" />

          <CtaSection
            heading="Ready to Play?"
            body="Put the cheat sheet to work. Play Klondike Solitaire online free — Draw 1 or Draw 3, unlimited undo, instant new deals."
            primaryLabel="Play Klondike Solitaire"
            primaryHref="/klondike"
            secondaryLabel="Read the Full Strategy Guide"
            secondaryHref="/klondike/strategy"
          />

          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard
                href="/klondike"
                title="Play Klondike Solitaire"
                description="Free online, no download"
              />
              <ContentLinkCard
                href="/klondike/how-to-play"
                title="How to Play Klondike"
                description="Complete rules and setup"
              />
              <ContentLinkCard
                href="/klondike/strategy"
                title="Klondike Strategy"
                description="Full strategy deep dive"
              />
              <ContentLinkCard
                href="/klondike/faq"
                title="Klondike FAQ"
                description="Quick answers to common questions"
              />
              <ContentLinkCard
                href="/klondike/draw-1-vs-draw-3"
                title="Draw 1 vs Draw 3"
                description="Pick the right mode"
              />
              <ContentLinkCard
                href="/klondike/vegas-scoring"
                title="Vegas Scoring Rules"
                description="Play the casino variant"
              />
            </div>
          </section>

          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Other quick references">
              More Cheat Sheets
            </SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/freecell-cheat-sheet"
                title="FreeCell Cheat Sheet"
                description="Opening moves, supermoves, endgame checklist."
              />
              <ContentLinkCard
                href="/klondike-fewest-moves"
                title="Fewest-Move Klondike"
                description="The record-fewest solves and how to spot one."
              />
              <ContentLinkCard
                href="/solitaire-difficulty-ranking"
                title="Difficulty Ranking"
                description="All 28 solitaire variants ranked."
              />
            </ContentBody>
          </CardSection>
        </article>
      </main>
    </ContentLayout>
  );
}
