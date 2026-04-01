import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Klondike Vegas Scoring Explained | How Casino Solitaire Points Work",
  description:
    "Complete guide to Klondike Solitaire Vegas scoring \u2014 how the $52 buy-in works, how to turn a profit, cumulative vs single-game scoring, and strategies to maximize your score.",
  keywords: [
    "klondike vegas scoring",
    "vegas solitaire scoring",
    "solitaire vegas rules",
    "vegas scoring solitaire",
    "klondike solitaire casino scoring",
    "solitaire $52 buy in",
    "vegas solitaire how to play",
    "solitaire cumulative scoring",
    "klondike vegas mode",
    "vegas solitaire strategy",
    "solitaire scoring systems",
    "casino solitaire rules",
  ],
  openGraph: {
    title: "Klondike Vegas Scoring Explained | How Casino Solitaire Points Work",
    description:
      "How Vegas scoring works in Klondike Solitaire \u2014 the $52 buy-in, $5 per card to foundation, cumulative scoring, and strategies to maximize your return.",
    url: absoluteUrl("/klondike/vegas-scoring"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How does Vegas scoring work in Klondike Solitaire?",
    answer:
      "In Vegas scoring, you start each game with a -$52 balance (your \"buy-in\" to the casino). For every card you move to a foundation pile, you earn $5. Since there are 52 cards in the deck, a perfect game where you move all cards to foundations earns $260, giving you a net profit of $208 ($260 - $52). In practice, most games end with a negative balance because you can't place all cards on foundations.",
  },
  {
    question: "What is cumulative Vegas scoring?",
    answer:
      "Cumulative scoring carries your dollar balance across multiple games instead of resetting to -$52 each time. This mode simulates a real casino session where you track your running total. It makes the experience more engaging because a great game can erase losses from several bad games. You might go down $200 over 10 games, then win it all back with one strong hand that reaches $180+ in foundation cards.",
  },
  {
    question: "Can you actually make money playing Vegas Solitaire?",
    answer:
      "In real casinos, Vegas Solitaire was offered in the mid-20th century with a $52 buy-in and $5 per foundation card. The house edge was significant because with Draw 3 rules, most players averaged only about $15-25 back per game, meaning the casino profited roughly $27-37 per game on average. With Draw 1 rules, skilled players can average closer to break-even, but the casino still holds a statistical edge on most players.",
  },
  {
    question: "What is the maximum score in Vegas Solitaire?",
    answer:
      "The maximum possible score in a single Vegas Solitaire game is +$208. You start at -$52 and earn $5 for each of the 52 cards moved to foundations ($5 \u00d7 52 = $260). So $260 - $52 = $208 maximum profit. Achieving this requires winning the game completely \u2014 all 52 cards on foundations.",
  },
  {
    question: "What\u2019s the difference between Vegas scoring and standard scoring?",
    answer:
      "Standard Klondike scoring awards points for various moves: +10 for each card to foundation, +5 for each card flipped face-up in tableau, -15 for each card moved from foundation back to tableau, and time bonuses. Vegas scoring is simpler: -$52 to start, +$5 per foundation card. Standard scoring rewards exploratory play and card flipping, while Vegas scoring only rewards the outcome \u2014 getting cards to foundations. Vegas scoring is more punishing and strategic.",
  },
  {
    question: "Is Draw 1 or Draw 3 better for Vegas scoring?",
    answer:
      "Draw 1 is significantly better for your Vegas score. With Draw 1 rules, you can access every card in the stock pile individually, giving you maximum flexibility. With Draw 3, you can only access every third card on each pass through the stock, and most Vegas games limit you to a single pass. Expert players average roughly $25-30 back per game with Draw 1 but only $15-20 with Draw 3. If your goal is to maximize Vegas score, always choose Draw 1.",
  },
];

const scoringComparison = [
  { feature: "Starting balance", vegas: "-$52", standard: "0 points" },
  { feature: "Card to foundation", vegas: "+$5", standard: "+10 points" },
  { feature: "Card flipped face-up", vegas: "$0", standard: "+5 points" },
  { feature: "Card from foundation", vegas: "$0", standard: "-15 points" },
  { feature: "Waste to tableau", vegas: "$0", standard: "+5 points" },
  { feature: "Time bonus", vegas: "None", standard: "Yes (timed mode)" },
  { feature: "Maximum score", vegas: "+$208", standard: "Unlimited (with time)" },
  { feature: "Cumulative option", vegas: "Yes (across games)", standard: "No" },
  { feature: "Realism", vegas: "Casino simulation", standard: "Game points" },
];

export default function KlondikeVegasScoringPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Vegas Scoring Explained: How Casino Solitaire Points Work",
      description:
        "A complete guide to Klondike Solitaire Vegas scoring \u2014 the $52 buy-in, foundation payouts, cumulative scoring, draw rules, and strategies to maximize your return.",
      author: { "@type": "Organization", name: siteConfig.siteName },
      publisher: { "@type": "Organization", name: siteConfig.siteName },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/klondike/vegas-scoring"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Klondike Solitaire", item: absoluteUrl("/klondike") },
        { "@type": "ListItem", position: 3, name: "Vegas Scoring", item: absoluteUrl("/klondike/vegas-scoring") },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Vegas Scoring Explained"
        subtitle={
          <>
            Vegas scoring turns Klondike Solitaire into a casino simulation
            &mdash; $52 to play, $5 for every card to the foundation. Can you
            beat the house? Here&apos;s everything you need to know about how
            it works and how to maximize your return.
          </>
        }
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── How It Works ── */}
        <CardSection id="how-it-works">
          <SectionHeading sub="The Basics" id="how-heading" icon={"\ud83c\udccf"}>
            How Vegas Scoring Works
          </SectionHeading>
          <ContentBody className="space-y-5">
            <p>
              Vegas scoring simulates the economics of playing Klondike
              Solitaire in a real casino. The rules are straightforward:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Buy-in: $52.</strong> You pay $52 to start each game.
                Your balance begins at <strong>-$52</strong>.
              </li>
              <li>
                <strong>Payout: $5 per foundation card.</strong> Every card you
                move to a foundation pile earns you $5.
              </li>
              <li>
                <strong>No other scoring.</strong> Flipping cards, moving cards
                between tableau columns, going through the stock &mdash; none
                of these earn or cost money. Only foundation moves matter.
              </li>
            </ul>
            <p>
              This creates a beautifully simple question: can you get enough
              cards to the foundations to earn back your $52 buy-in and turn a
              profit? You need at least <strong>11 cards on foundations</strong>{" "}
              ($55) just to break even. Anything less is a loss.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The Math ── */}
        <CardSection id="the-math">
          <SectionHeading sub="By the Numbers" id="math-heading" icon={"\ud83d\udcb0"}>
            The Math Behind Vegas Scoring
          </SectionHeading>
          <ContentBody className="space-y-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Cards to Foundation</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Earnings</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Net Balance</th>
                    <th className="py-2 pl-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm text-[#2a2522]">0 cards</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$0</td>
                    <td className="py-2 px-3 text-sm font-medium text-red-600">-$52</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Total loss</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm text-[#2a2522]">5 cards</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$25</td>
                    <td className="py-2 px-3 text-sm font-medium text-red-600">-$27</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Significant loss</td>
                  </tr>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm text-[#2a2522]">10 cards</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$50</td>
                    <td className="py-2 px-3 text-sm font-medium text-red-600">-$2</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Near break-even</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm text-[#2a2522] font-medium">11 cards</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$55</td>
                    <td className="py-2 px-3 text-sm font-medium text-green-600">+$3</td>
                    <td className="py-2 pl-3 text-sm text-[#444444] font-medium">Break-even point</td>
                  </tr>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm text-[#2a2522]">20 cards</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$100</td>
                    <td className="py-2 px-3 text-sm font-medium text-green-600">+$48</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Solid profit</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm text-[#2a2522]">52 cards (win)</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">$260</td>
                    <td className="py-2 px-3 text-sm font-medium text-green-600">+$208</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Maximum profit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The break-even point of 11 cards means you need to get about
              one-fifth of the deck to foundations just to not lose money.
              Getting all four Aces and their 2s and 3s (12 cards) barely
              breaks even. This is why Vegas scoring feels so punishing &mdash;
              partial wins that feel decent in standard scoring are actually
              losses in Vegas mode.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Vegas vs Standard Comparison ── */}
        <CardSection id="comparison">
          <SectionHeading sub="Scoring Systems" id="comparison-heading" icon={"\u2660"}>
            Vegas Scoring vs Standard Scoring
          </SectionHeading>
          <ContentBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Feature</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Vegas</th>
                    <th className="py-2 pl-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringComparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-[#B8860B]/[0.03]" : ""}>
                      <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">{row.feature}</td>
                      <td className="py-2 px-3 text-sm text-[#444444]">{row.vegas}</td>
                      <td className="py-2 pl-3 text-sm text-[#444444]">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        {/* ── Cumulative Scoring ── */}
        <CardSection id="cumulative">
          <SectionHeading sub="The Long Game" id="cumulative-heading" icon={"\u2663"}>
            Cumulative Vegas Scoring
          </SectionHeading>
          <ContentBody className="space-y-5">
            <p>
              Cumulative scoring is a variant where your dollar balance carries
              over between games. Instead of resetting to -$52 each hand, you
              keep a running total &mdash; like a real casino session.
            </p>
            <p>
              This changes the psychology of the game dramatically. In single-game
              Vegas scoring, every game stands alone. In cumulative mode, a
              -$52 loss on game 1 puts pressure on game 2 (starting at -$104).
              But a big win (+$208) can erase four bad games in one shot.
            </p>
            <p>
              <strong>Cumulative strategy tip:</strong> Don&apos;t play
              recklessly after a losing streak trying to &quot;win it back.&quot;
              The same fundamentals apply &mdash; get Aces to foundations early,
              build in suit when possible, and don&apos;t get stuck on a single
              column. The math doesn&apos;t change just because you&apos;re
              behind.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Strategies ── */}
        <CardSection id="strategies">
          <SectionHeading sub="Beat the House" id="strategies-heading" icon={"\u2665"}>
            Strategies to Maximize Your Vegas Score
          </SectionHeading>
          <ContentBody className="space-y-5">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Play Draw 1 when available.</strong> Draw 1 lets you
                access every card in the stock on each pass, dramatically
                increasing your ability to place cards on foundations. Draw 3
                limits access to every third card and most Vegas games only
                allow one pass through the stock with Draw 3.
              </li>
              <li>
                <strong>Prioritize Aces and 2s above everything.</strong> In
                Vegas scoring, only foundation cards earn money. Getting all
                four Aces out immediately is critical. Each Ace represents
                potential access to 13 cards of that suit.
              </li>
              <li>
                <strong>Don&apos;t flip cards just to flip them.</strong> In
                standard scoring, flipping face-down cards earns +5 points.
                In Vegas, it earns nothing. Only flip cards when it directly
                helps you get cards to foundations.
              </li>
              <li>
                <strong>Build foundations evenly.</strong> Don&apos;t stack one
                suit up to the 8 while others sit on Ace. Building evenly
                gives you more flexibility and prevents blocking situations
                where you need a card that&apos;s already on a foundation.
              </li>
              <li>
                <strong>Know when to quit.</strong> If you&apos;re stuck with
                only 3&ndash;4 cards on foundations and no productive moves,
                a new game (-$52) is better than wasting time. In cumulative
                mode, cutting losses early preserves your bankroll.
              </li>
            </ol>
          </ContentBody>
        </CardSection>

        {/* ── History ── */}
        <CardSection id="history">
          <SectionHeading sub="Casino Origins" id="history-heading" icon={"\u2666"}>
            The Casino History of Vegas Solitaire
          </SectionHeading>
          <ContentBody className="space-y-5">
            <p>
              Vegas Solitaire wasn&apos;t always a digital game mode &mdash; it
              was a real casino offering. In the mid-20th century, Las Vegas
              casinos would sell a deck of cards for $52 (a dollar per card)
              and pay $5 for every card the player moved to a foundation pile.
            </p>
            <p>
              The rules were strict: Draw 3, one pass through the stock, no
              undos. Under these conditions, the house had a substantial edge.
              The average player would recover only about $15&ndash;25 of their
              $52 investment per game. Even skilled players rarely broke even
              consistently.
            </p>
            <p>
              When Microsoft included Klondike Solitaire in Windows 3.0 (1990),
              Vegas scoring was included as an optional game mode. It became
              a popular way for players to add stakes-like tension to their
              daily solitaire habit without risking real money. Today, Vegas
              scoring remains one of the most popular alternative scoring
              systems in digital solitaire implementations.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>
          <ContentBody className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related ── */}
        <CardSection id="related">
          <SectionHeading sub="Keep Learning" id="related-heading" icon={"\ud83d\udcda"}>
            Related Klondike Guides
          </SectionHeading>
          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/klondike/how-to-play" className="text-[#B8860B] hover:underline text-sm">
                  How to Play Klondike Solitaire &rarr;
                </Link>
              </li>
              <li>
                <Link href="/klondike/strategy" className="text-[#B8860B] hover:underline text-sm">
                  Klondike Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/klondike/draw-1-vs-draw-3" className="text-[#B8860B] hover:underline text-sm">
                  Draw 1 vs Draw 3 Explained &rarr;
                </Link>
              </li>
              <li>
                <Link href="/klondike/tips" className="text-[#B8860B] hover:underline text-sm">
                  Klondike Tips &amp; Tricks &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-klondike" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Klondike &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solitaire-types" className="text-[#B8860B] hover:underline text-sm">
                  All Solitaire Types &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Test Your Vegas Skills"
          body="Play Klondike Solitaire with Vegas scoring and see if you can beat the house \u2014 completely free, no download required."
          primaryLabel="Play Klondike Solitaire"
          primaryHref="/klondike"
        />
      </main>
    </ContentLayout>
  );
}
