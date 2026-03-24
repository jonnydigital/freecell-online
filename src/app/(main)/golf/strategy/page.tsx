import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Golf Solitaire Strategy Guide | Score Under Par Every Time",
  description:
    "Master Golf Solitaire with proven strategies for tableau scanning, run building, stock pile timing, and scoring optimization. Learn to avoid Kings, count cards, and finish under par.",
  keywords: [
    "golf solitaire strategy",
    "golf solitaire tips",
    "how to win golf solitaire",
    "golf solitaire card counting",
    "golf solitaire run building",
    "golf solitaire scoring",
    "golf solitaire stock pile strategy",
    "golf solitaire Kings dead ends",
    "golf solitaire winning strategy",
    "golf solitaire advanced techniques",
    "golf solitaire under par",
  ],
  openGraph: {
    title: "Golf Solitaire Strategy Guide | Score Under Par Every Time",
    description:
      "Proven strategies for Golf Solitaire: tableau scanning, run building, stock pile timing, card counting, and scoring optimization.",
    url: absoluteUrl("/golf/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Golf Solitaire?",
    answer:
      "The most impactful strategy is to scan the entire tableau before playing each card from the stock. Look for long runs — sequences of cards that alternate up and down — and plan your removals to chain as many tableau cards as possible on a single stock card. Prioritize uncovering columns with the most buried cards and avoid plays that strand Kings at the top of columns.",
  },
  {
    question: "Why are Kings so dangerous in Golf Solitaire?",
    answer:
      "In standard Golf Solitaire, nothing can be played on top of a King because there is no card with a value of 14. This means a King sent to the waste pile immediately ends your current run. Kings in the tableau are dead ends that block the cards beneath them unless you can remove them with a Queen already on the waste pile. Always plan ahead to handle Kings before they stall your progress.",
  },
  {
    question: "Should I always play a card if I can?",
    answer:
      "Not always. Sometimes you have a choice between two or more playable cards and the order matters significantly. Playing one card might open a long chain of subsequent removals, while playing the other leads to a dead end. Before making an obvious play, scan the columns to see which removal creates the longest cascade. A few seconds of planning can be the difference between finishing under par and getting stuck.",
  },
  {
    question: "How does card counting help in Golf Solitaire?",
    answer:
      "Card counting lets you predict what is left in the stock pile. Since all 35 tableau cards are visible at the start, you know exactly which 17 cards are in the stock. If you need a 7 to continue a run and you can see all four 7s in the tableau, the stock will never provide one — so you need to plan a different path. This knowledge prevents you from waiting for cards that will never come.",
  },
  {
    question: "What is a good score in Golf Solitaire?",
    answer:
      "In Golf Solitaire, each card left in the tableau at the end counts as one stroke over par. Clearing the entire tableau is par (zero). A negative score (under par) means you cleared the tableau with stock cards remaining. Beginners typically finish 10-15 over par. Intermediate players average 4-8 over par. Advanced players regularly finish at par or under, especially on favorable deals. Consistent under-par finishes require strong run-building skills and card counting.",
  },
];

export default function GolfStrategyPage() {
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Golf Solitaire Strategy Guide",
    description: "Master Golf Solitaire with proven strategies for tableau scanning, run building, stock pile timing, and scoring optimization.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    datePublished: "2026-03-24",
    dateModified: "2026-03-24",
    mainEntityOfPage: absoluteUrl("/golf/strategy"),
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
        name: "Golf Solitaire",
        item: absoluteUrl("/golf"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/golf/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Golf Solitaire Strategy Guide"
        kicker={<Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">Golf Solitaire</Link>}
        subtitle="Proven techniques for tableau scanning, run building, stock pile timing, and finishing under par every time."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Golf Solitaire", href: "/golf" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">

          {/* Quick Summary */}
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-white/90 mb-3">Quick Summary</h2>
            <ul className="list-disc pl-5 space-y-2 text-white/70 text-sm leading-relaxed">
              <li><strong className="text-white/90">Scan before you play</strong> — survey all seven columns for the longest possible chain before touching the stock.</li>
              <li><strong className="text-white/90">Build runs, not single plays</strong> — chain multiple tableau cards per stock card to maximize clearance.</li>
              <li><strong className="text-white/90">Kings are dead ends</strong> — nothing plays on a King, so plan around them early.</li>
              <li><strong className="text-white/90">Count cards</strong> — with 35 visible tableau cards, you know exactly which 17 are in the stock.</li>
              <li><strong className="text-white/90">Time your stock draws</strong> — draw only when no more tableau cards can chain off the current waste card.</li>
              <li><strong className="text-white/90">Know when to concede</strong> — some deals are unwinnable; recognizing them early saves time.</li>
            </ul>
          </div>

          {/* Section 1: Tableau Scanning Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tableau Scanning Strategy
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Golf Solitaire begins with 35 cards dealt face-up across seven columns of five cards
                each. Only the bottom card of each column is available for play. This means you have
                exactly seven playable cards at any moment, and each removal exposes the card above it
                in the same column. The entire strategic challenge revolves around one question: in what
                order should you remove these cards to clear the maximum number from the tableau?
              </p>
              <p>
                Before you flip a single stock card, study the layout. Identify which columns contain
                the longest potential runs. A run is a sequence of cards in a column where each card is
                exactly one rank higher or lower than the next. For example, a column containing 5-6-7-8
                from top to bottom is a perfect run — once you start it, all four cards chain off each
                other. Columns with broken sequences or repeated ranks are harder to clear and should
                be deprioritized unless they contain cards you need to unblock elsewhere.
              </p>
              <p>
                Develop a habit of scanning all seven columns systematically before every stock draw.
                Beginners tend to play the first valid card they see, but experienced players check
                whether a different column offers a longer chain. This scanning discipline is the single
                biggest difference between players who score over par and those who consistently finish
                at or under par. For a full overview of the rules and layout, see the{" "}
                <Link href="/golf/how-to-play" className="text-[var(--gold)] hover:text-white transition-colors">
                  Golf Solitaire rules guide
                </Link>.
              </p>
            </div>
          </section>

          {/* Section 2: Run-Building Techniques */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Run-Building Techniques
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                The core mechanic of Golf Solitaire is deceptively simple: you can play any exposed
                tableau card that is exactly one rank higher or lower than the current waste card,
                regardless of suit. A 7 on the waste pile accepts either a 6 or an 8. The skill lies
                in chaining multiple plays together to build long runs that sweep several cards off the
                tableau in a single sequence.
              </p>
              <p>
                Long runs are the key to finishing under par. Every time you chain three or four cards
                off a single stock draw, you are effectively clearing the tableau faster than the stock
                depletes. A player who averages two tableau cards per stock card will clear 34 cards
                before the stock runs out — nearly the entire tableau. A player who averages only one
                card per stock draw will clear just 17 cards, leaving 18 stranded.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Technique: The Zigzag
                </h3>
                <p className="text-sm">
                  The most powerful run pattern in Golf is the zigzag — alternating between two columns
                  whose bottom cards differ by one rank. Suppose column A ends in a 9 and column B ends
                  in a 10. Play the 9, then the 10. If the card now exposed in column A is an 11 (Jack),
                  play it. Then check column B again. This back-and-forth between columns can clear
                  multiple cards from both columns simultaneously. Always look for zigzag opportunities
                  before settling for a single-column play.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-3">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Technique: Saving Bridge Cards
                </h3>
                <p className="text-sm">
                  A bridge card is a tableau card that connects two otherwise separate runs. For example,
                  if you have a 5 at the bottom of one column and a 7 at the bottom of another, a 6
                  anywhere in the tableau is a bridge — it connects the 5-run to the 7-run. Do not play
                  bridge cards prematurely. Wait until you can use them to link the two runs together
                  for maximum chain length.
                </p>
              </div>

              <p>
                The decision of which card to play first in a run often determines whether you clear
                two cards or six. Take time to trace the full chain mentally before committing to the
                first play. This is similar to the look-ahead thinking required in{" "}
                <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
                  FreeCell
                </Link>, where planning several moves ahead separates beginners from experts.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

          {/* Section 3: Stock Pile Timing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stock Pile Timing
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                The stock pile in Golf Solitaire contains 17 cards (52 minus 35 tableau cards). You
                flip one card at a time onto the waste pile, and each flip is irreversible — once a
                stock card is drawn, the previous waste card is buried permanently. This means every
                stock draw has an opportunity cost: you lose access to whatever was on the waste pile
                before.
              </p>
              <p>
                The golden rule of stock timing is simple: <strong className="text-white/90">never draw from the stock
                while a playable tableau card exists</strong>. Every tableau card you can play on the current
                waste card is a free removal that does not cost you a stock draw. Drawing prematurely
                buries the current waste card and might eliminate a chain you could have started.
              </p>

              <div className="bg-white/[0.03] border border-green-500/10 rounded-lg p-5">
                <h3 className="font-semibold text-green-400 mb-3">Draw from the stock when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>No exposed tableau card is within one rank of the current waste card</li>
                  <li>You have exhausted the current run completely — no more chains are possible</li>
                  <li>The waste card is a King (nothing can play on it, so draw immediately)</li>
                  <li>Card counting confirms that drawing now will not bury a card you need later</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5 mt-3">
                <h3 className="font-semibold text-red-400 mb-3">Avoid drawing when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Any tableau card can play on the current waste card</li>
                  <li>You have not fully scanned all seven columns for playable cards</li>
                  <li>The current waste card is a bridge value that might connect a zigzag run</li>
                  <li>You are about to bury a card that is the only way to unlock a deep column</li>
                </ul>
              </div>

              <p>
                Pay special attention to the endgame. When only a few stock cards remain, each draw
                becomes critical. If you have three stock cards left and four tableau cards to clear,
                you need nearly every stock card to start a chain. Misspending even one draw can mean
                the difference between par and two over.
              </p>
            </div>
          </section>

          {/* Section 4: Kings as Dead Ends */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kings as Dead Ends
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Kings are the most dangerous cards in Golf Solitaire. In the standard ruleset, no card
                can be played on top of a King because there is no rank above it. When a King lands on
                the waste pile — whether from the stock or from the tableau — your current run ends
                immediately. You must draw a new stock card to continue.
              </p>
              <p>
                This has two important strategic implications. First, avoid playing a King from the
                tableau unless it is absolutely necessary or unless removing it uncovers a critical card
                beneath it. Playing a King kills your current waste-pile run, so the card exposed
                beneath the King must be valuable enough to justify the cost. Second, when a King
                appears in the stock pile, treat it as a wasted draw — you lose one of your 17 stock
                cards with zero tableau benefit.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Managing Kings in the Tableau
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong className="text-white/80">Kings at the bottom of columns</strong> — remove them only when a Queen is on the waste pile, as that is their only exit path</li>
                  <li><strong className="text-white/80">Kings buried in columns</strong> — you must clear the cards below them first, then pair the King with a waste-pile Queen</li>
                  <li><strong className="text-white/80">Multiple Kings in one column</strong> — a column with two or more Kings is extremely difficult to clear; deprioritize it unless the cards beneath the Kings are essential</li>
                  <li><strong className="text-white/80">Kings in the stock</strong> — count how many Kings are visible in the tableau; the rest are in the stock and will each cost you one draw with no benefit</li>
                </ul>
              </div>

              <p>
                Count the Kings at the start of every game. If you see all four in the tableau, the
                stock contains zero — a significant advantage. If only one or two Kings are visible,
                expect the stock to deliver King dead-draws that interrupt your plans. Factor this into
                your run-building calculations. Games with three or four Kings in the stock are
                substantially harder to win.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

          {/* Section 5: Card Counting for Golf */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Card Counting for Golf Solitaire
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Card counting in Golf is straightforward because the majority of the deck — 35 out of
                52 cards — is visible from the very first moment. You can deduce exactly which 17 cards
                are in the stock by subtracting the visible tableau cards from a complete deck.
              </p>
              <p>
                At the start of each game, do a quick rank count. For each rank (Ace through King),
                note how many copies appear in the tableau. A standard deck has four of each rank. If
                you see three 8s in the tableau, exactly one 8 is in the stock. If all four 8s are
                visible, the stock has none. This takes about 20 seconds with practice and provides
                enormous strategic value.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-3">What Card Counting Reveals</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong className="text-white/80">Run potential</strong> — if you need a 6 to bridge a 5 and a 7, and all four 6s are in the tableau, the stock will never provide one</li>
                  <li><strong className="text-white/80">King count</strong> — knowing how many Kings lurk in the stock tells you how many dead draws to expect</li>
                  <li><strong className="text-white/80">Endgame planning</strong> — when the stock is nearly empty, you know every remaining card and can plan the final sequence precisely</li>
                  <li><strong className="text-white/80">Impossibility detection</strong> — if a column can only be unlocked by a rank that exists nowhere in the stock and is buried in the tableau, that column is stuck</li>
                </ul>
              </div>

              <p>
                As you play through the stock, update your mental count. Each stock card revealed
                narrows the remaining possibilities. By the time you have drawn 10 stock cards, you
                know exactly which 7 remain. This is similar to the counting techniques used in{" "}
                <Link href="/tripeaks" className="text-[var(--gold)] hover:text-white transition-colors">
                  TriPeaks Solitaire
                </Link>, another removal-based game where visible information drives optimal play.
              </p>
            </div>
          </section>

          {/* Section 6: Scoring Optimization */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Scoring Optimization
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                In Golf Solitaire, your score equals the number of tableau cards remaining when the
                stock runs out. Par is zero — a completely cleared tableau. Scores below zero (under
                par) are possible when you clear the tableau with stock cards still remaining, and each
                unused stock card counts as one stroke under par.
              </p>
              <p>
                To optimize your score, focus on maximizing the ratio of tableau cards cleared per stock
                card drawn. The math is simple: you have 17 stock draws to clear 35 tableau cards. That
                means you need to average just over two tableau cards per draw to reach par. Anything
                above that average puts you under par.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-3">Score Benchmarks</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/80 font-medium">Beginner</p>
                    <p>10-15 over par</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Intermediate</p>
                    <p>4-8 over par</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Advanced</p>
                    <p>0-3 over par</p>
                  </div>
                  <div>
                    <p className="text-white/80 font-medium">Expert</p>
                    <p>Under par regularly</p>
                  </div>
                </div>
              </div>

              <p>
                Track your average score across 20 or more games to get a reliable measure of
                improvement. Individual games are too variable — a lucky deal with easy runs might yield
                a -4, while a King-heavy stock might leave you at +12 despite perfect play. The trend
                across many games is what matters. If your 20-game average drops from +10 to +5, your
                strategy is genuinely improving.
              </p>
            </div>
          </section>

          {/* Section 7: When to Concede */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              When to Concede a Deal
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Not every deal in Golf Solitaire is winnable. Some layouts have structural problems
                that make a par score impossible regardless of how well you play. Learning to recognize
                these situations early saves time and frustration.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Signal 1: Too Many Kings in the Stock</h3>
                  <p className="text-sm">
                    If you count only one or zero Kings in the tableau, three or four Kings are in the
                    stock. Each stock King is a dead draw. With three Kings in the stock, you effectively
                    have only 14 productive draws to clear 35 cards — a ratio of 2.5 cards per draw,
                    which requires extremely long runs on every single draw.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Signal 2: Isolated Columns</h3>
                  <p className="text-sm">
                    If a column&apos;s bottom card is a rank with no adjacent ranks exposed anywhere else
                    in the tableau, that column cannot be started from the tableau alone. You need the
                    stock to provide a bridge card. If your count shows zero copies of the needed bridge
                    rank in the stock, that column is permanently stuck.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Signal 3: Repeated Dead-End Patterns</h3>
                  <p className="text-sm">
                    When multiple columns end in the same rank and the adjacent ranks are scarce, you
                    face diminishing returns. Three columns ending in 4s means you need three separate
                    runs through the 3-4 or 4-5 boundary — but if the stock has limited 3s and 5s, you
                    cannot service all three columns.
                  </p>
                </div>
              </div>

              <p>
                Conceding is not giving up — it is efficient play. Professional card players in every
                discipline know that recognizing a losing position early is a skill, not a weakness.
                Concede, deal a fresh layout, and apply your strategy to a game you can actually win.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

          {/* Section 8: Putting It All Together */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Putting It All Together
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Here is a complete pre-game and in-game routine that combines every strategy discussed
                above into a repeatable process.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-3">Pre-Game Routine (20-30 seconds)</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Count Kings in the tableau — determine how many dead draws to expect from the stock</li>
                  <li>Do a quick rank count for ranks you expect to need as bridges (6s, 7s, 8s are the most common bridge values)</li>
                  <li>Identify columns with natural runs and columns with repeated or King-heavy compositions</li>
                  <li>Check for impossible columns — bottom cards with no adjacent rank available anywhere</li>
                  <li>Decide whether the deal is worth playing or should be conceded immediately</li>
                </ol>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-3">
                <h3 className="font-semibold text-green-400 mb-3">In-Game Routine (every stock draw)</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Scan all seven columns for playable cards before drawing</li>
                  <li>If multiple plays exist, trace each chain mentally to find the longest run</li>
                  <li>Look for zigzag opportunities between adjacent columns</li>
                  <li>Save bridge cards until they can connect two separate runs</li>
                  <li>Play Kings only when a Queen is on the waste pile or when the card beneath the King is essential</li>
                  <li>Draw from the stock only when no more plays are possible</li>
                </ol>
              </div>

              <p>
                With practice, this routine becomes second nature. You will scan the tableau
                automatically, spot zigzag patterns instantly, and make stock-timing decisions without
                conscious effort. That is when Golf Solitaire shifts from a casual pastime to a deeply
                satisfying strategic challenge. Ready to practice? Head to the{" "}
                <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">
                  Golf Solitaire game
                </Link>{" "}
                and put these techniques to work.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group" open={i === 0 ? true : undefined}>
                  <summary className="cursor-pointer font-medium text-white/80 text-lg mb-2 list-none flex items-start gap-2">
                    <span className="text-[var(--gold)] mt-1 group-open:rotate-90 transition-transform">&#9654;</span>
                    {faq.question}
                  </summary>
                  <p className="text-white/50 leading-relaxed pl-6 pb-4">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="border-b border-white/10" />
                  )}
                </details>
              ))}
            </div>
          </section>

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/golf/how-to-play" title="How to Play Golf Solitaire" description="Complete rules, setup, and card play mechanics." />
              <ContentLinkCard href="/golf/tips" title="Golf Solitaire Tips" description="Quick tips for faster, smarter play." />
              <ContentLinkCard href="/tripeaks/strategy" title="TriPeaks Strategy" description="Strategy for the sibling removal game." />
            </ContentBody>
          </CardSection>

          {/* CTA Section */}
          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice — play Golf Solitaire online right now, or brush up on the complete rules first."
            primaryLabel="Play Golf Solitaire"
            primaryHref="/golf"
            secondaryLabel="Golf Rules Guide"
            secondaryHref="/golf/how-to-play"
          />

          {/* More Resources */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              More Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ContentLinkCard href="/golf/how-to-play" title="Golf Solitaire Rules" description="Complete setup and rules guide" />
              <ContentLinkCard href="/golf/tips" title="Golf Solitaire Tips" description="Quick tips to improve your score" />
              <ContentLinkCard href="/tripeaks/strategy" title="TriPeaks Strategy" description="Strategy for another removal-based game" />
              <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Compare Golf, FreeCell, Klondike, and more" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy for the classic strategic solitaire" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire — free online" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
