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
  title: "Spider Solitaire FAQ — Common Questions Answered",
  description:
    "Answers to the most common Spider Solitaire questions — 1-suit vs 2-suit vs 4-suit, winnability, empty columns, stock rules, and how to beat tough deals.",
  keywords: [
    "spider solitaire faq",
    "spider solitaire questions",
    "spider solitaire common questions",
    "is spider solitaire winnable",
    "spider solitaire 1 suit vs 2 suit vs 4 suit",
    "spider solitaire empty column",
    "spider solitaire stock rules",
    "spider solitaire win rate",
    "how to beat spider solitaire",
  ],
  alternates: {
    canonical: absoluteUrl("/spider/faq"),
  },
  openGraph: {
    title: "Spider Solitaire FAQ — Common Questions Answered",
    description:
      "Answers to the most common Spider Solitaire questions — 1/2/4-suit, winnability, empty columns, and how to beat tough deals.",
    url: absoluteUrl("/spider/faq"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "Is every Spider Solitaire game winnable?",
    answer: [
      "No. Unlike FreeCell — where roughly 99.999% of deals are solvable with perfect play — Spider Solitaire has a much lower solvability rate, and a meaningful percentage of deals are simply unwinnable no matter how skillfully you play.",
      "Win rates vary sharply by suit count. In 1-suit Spider, expert players win close to 99% of games. In 2-suit, experts land in the 50-60% range. In 4-suit Spider, even the strongest players typically win only 10-35% of deals. The gap between a beginner and an expert at 4-suit Spider is enormous, but no matter how well you play, you cannot reach 100% — a portion of deals are mathematically dead.",
    ],
  },
  {
    question: "What is the difference between 1-suit, 2-suit, and 4-suit Spider?",
    answer: [
      "The difference is simply how many different suits appear in the deck. In 1-suit Spider all 104 cards are Spades, so every same-rank difference card can move as a group. In 2-suit Spider the deck is Spades plus Hearts, which breaks perfect groups roughly half the time. In 4-suit Spider all four suits are present, and only same-suit runs can move as a block.",
      "The scoring rules and goal are identical — you still need to build eight complete King-to-Ace same-suit runs to win. But in 2-suit and especially 4-suit, suit-breaks force you to unstack cards one at a time, which burns moves and makes it harder to open empty columns. Most players learn on 1-suit, graduate to 2-suit once they can win consistently, and attempt 4-suit only after they are comfortable with empty-column tactics.",
    ],
  },
  {
    question: "Why is an empty column so valuable in Spider Solitaire?",
    answer: [
      "An empty column is the single most valuable resource in Spider. It works like a universal temporary holding slot: you can drop any card there, park a problem card while you rearrange the tableau, or use it to split a mixed-suit run into two same-suit runs you can actually move.",
      "Skilled Spider players essentially optimize around creating and protecting empty columns. Two rules to internalize: first, every empty column roughly doubles your options for the next several moves; second, never spend an empty column on a move that does not meaningfully progress the board. Dropping a random King onto an empty column is almost always worse than using that column as a workspace.",
    ],
  },
  {
    question: "When can you deal new cards from the stock?",
    answer: [
      "You can deal a new row from the stock at any time, with one critical restriction: every one of the 10 tableau columns must contain at least one card. If any column is empty when you click the stock, the deal is illegal and will be blocked.",
      "This rule is the reason experienced players hesitate to deal from the stock while they still hold an empty column — the empty column is worth more than the ten new cards. Plan ahead: before you deal, ask whether your next few moves will be easier with the new cards or with the empty column. Once the stock is empty, you can only win by completing sequences from what is already on the tableau.",
    ],
  },
  {
    question: "Can you move a mixed-suit sequence as a group?",
    answer: [
      "No. Spider only lets you move a group of cards as a single unit when every card in that group is the same suit and forms a descending sequence. A 7♠-6♠-5♠ can move together; a 7♠-6♥-5♠ cannot, even though the ranks are descending correctly.",
      "You can build mixed-suit sequences on the tableau — the rules allow you to place any card onto a card one rank higher regardless of suit — but a mixed-suit stack has to be moved one card at a time. That is why 4-suit Spider is so much harder than 1-suit: almost every useful-looking tableau sequence is mixed, so moving it requires breaking it down first.",
    ],
  },
  {
    question: "What is the best first move in Spider Solitaire?",
    answer: [
      "There is no single best opening — the right first move depends on what the initial deal gave you — but there are strong general principles. Scan for same-suit pairs that are one rank apart: those are the cheapest, safest moves because they create a mini same-suit sequence that can move as a group later. Prioritize moves that uncover a face-down card, especially in the four longer columns (5, 6, 7, 8, 9, 10) where most hidden information lives.",
      "Avoid mixed-suit stacking in the opening if you can avoid it. Every mixed-suit placement you make early will cost you extra moves to untangle later. If the deal gives you very few useful moves, it is better to deal a second row from the stock and reassess than to waste moves building a mixed sequence you will have to break apart.",
    ],
  },
  {
    question: "How do I beat 4-suit Spider Solitaire?",
    answer: [
      "Expect to lose more games than you win. Even strong players hover around 20-30% at 4-suit, and that is normal. Focus on three habits: first, create at least one empty column before you deal from the stock; second, prefer moves that both uncover a face-down card AND keep a same-suit sequence intact; third, accept that some deals are dead, and do not burn an hour trying to force a won position where no winning line exists.",
      "Two tactical tools matter most at 4-suit: parking cards in an empty column to split a mixed run into two same-suit runs, and timing your stock deals so they land when the board is best prepared (often: right after you have just cleared a sequence to the foundations, since the new row will stack onto a simplified tableau).",
    ],
  },
  {
    question: "Is Spider harder than FreeCell or Klondike?",
    answer: [
      "It depends on what you mean by harder. By raw win rate, 4-suit Spider is the hardest of the three — expert win rates sit around 20-35% in 4-suit Spider versus 80-90%+ in FreeCell and 40-50% in Klondike Draw 1. On pure luck-vs-skill balance, 1-suit Spider is easier than both, because you rarely lose to bad luck at 1-suit.",
      "FreeCell is the purest skill game of the three: every card is visible, every deal is almost certainly winnable, so every loss is a mistake. Klondike has hidden face-down cards and a stock that can deadlock you. Spider has hidden face-down cards, mixed-suit friction, and the empty-column discipline. Most solitaire players find the transition from Klondike to 4-suit Spider harder than the transition from Klondike to FreeCell.",
    ],
  },
  {
    question: "Can I undo moves in Spider Solitaire?",
    answer: [
      "Yes — our online Spider Solitaire supports unlimited undo, including across stock deals. You can step backward through every move and explore alternate lines, which is an excellent learning tool. Whether undo counts is a matter of personal preference: purists treat a win with any undo as invalid; most players treat undo as a pattern-recognition tool that speeds up skill development.",
      "If you want a real measure of your skill, play a stretch of games with undo disabled and compare your win rate. Most players lose 10-20 percentage points when they remove undo — that gap is roughly the value of being able to reverse a planning mistake.",
    ],
  },
  {
    question: "How long does an average Spider game take?",
    answer: [
      "1-suit Spider games usually finish in 6-10 minutes for experienced players. 2-suit averages 10-15 minutes. 4-suit games can run 15-30 minutes when they are close, because the move count is much higher — every same-suit unstack counts. Quick losses (stuck boards where no legal progress exists) can end in 2-3 minutes regardless of suit count.",
      "If you are playing Spider to fill a 10-minute break, 1-suit or 2-suit is the right fit. 4-suit is better treated as a longer focused session where you commit to thinking ahead several moves at a time.",
    ],
  },
];

export default function SpiderFaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.join(" "),
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
      { "@type": "ListItem", position: 3, name: "FAQ", item: absoluteUrl("/spider/faq") },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Spider Solitaire FAQ"
        subtitle="Answers to the most common questions about Spider Solitaire — 1/2/4-suit differences, winnability, empty columns, and the tactical questions players ask most."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Spider Solitaire", href: "/spider" }]}
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {faqs.map((faq, i) => (
            <section key={i}>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {faq.question}
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                {faq.answer.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
              {i === 2 && <AdUnit format="horizontal" className="mt-8" />}
              {i === 5 && <AdUnit format="auto" className="mt-8" />}
              {i === 7 && <AdUnit format="auto" className="mt-8" />}
            </section>
          ))}

          <AdUnit format="horizontal" className="-my-1" />

          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/spider/how-to-play"
                title="How to Play Spider Solitaire"
                description="Complete rules and setup for 1/2/4-suit Spider."
              />
              <ContentLinkCard
                href="/spider/strategy"
                title="Spider Strategy Guide"
                description="Empty columns, same-suit discipline, and stock timing."
              />
              <ContentLinkCard
                href="/spider/tips"
                title="Spider Tips & Tricks"
                description="Quick tactical advice to lift your 4-suit win rate."
              />
            </ContentBody>
          </CardSection>

          <RelatedArticles cluster="spider" heading="Go Deeper on Spider Solitaire" />

          <CtaSection
            heading="Ready to Play?"
            body="Try Spider Solitaire online for free — choose 1-suit, 2-suit, or 4-suit. Unlimited undo, daily challenges, no download required."
            primaryLabel="Play Spider Solitaire"
            primaryHref="/spider"
          />

          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/spider" title="Play Spider Solitaire" description="Free online, no download" />
              <ContentLinkCard
                href="/spider/1-suit-vs-2-suit-vs-4-suit"
                title="1 vs 2 vs 4 Suit Spider"
                description="Difficulty and win-rate comparison"
              />
              <ContentLinkCard
                href="/spider/is-spider-solitaire-winnable"
                title="Is Spider Winnable?"
                description="Which deals are solvable and why"
              />
              <ContentLinkCard
                href="/spider/how-to-empty-a-column"
                title="How to Empty a Column"
                description="The single biggest edge at 4-suit"
              />
              <ContentLinkCard href="/scorpion" title="Scorpion Solitaire" description="Spider's harder cousin" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 variants compared" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
