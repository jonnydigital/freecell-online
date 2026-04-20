import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { canonicalUrlFor, isOwnedBy } from '@/lib/routeOwnership';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import {
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from '@/components/content';

export const metadata: Metadata = {
  title: 'Fewest Moves to Win Klondike Solitaire: What Counts, What Records Exist',
  description:
    'The answer to "what is the least moves to win Klondike solitaire" depends on how you count. A plain-English guide to move counting, shortest-game records, and how to finish faster in your own play.',
  keywords: [
    'least moves to win solitaire',
    'fewest moves klondike',
    'quickest game of solitaire',
    'shortest klondike game',
    'minimum moves klondike',
    'fastest solitaire win',
    'klondike solitaire record',
  ],
  openGraph: {
    title: 'Fewest Moves to Win Klondike Solitaire',
    description:
      'What is the minimum number of moves to win Klondike? The honest answer depends on how you count — here is the breakdown, with records and tips for faster wins.',
    url: absoluteUrl('/klondike-fewest-moves'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: canonicalUrlFor('/klondike-fewest-moves'),
  },
};

const faqs = [
  {
    question: 'What is the absolute minimum number of moves to win Klondike?',
    answer:
      'There is no single agreed-upon answer because "move" is defined differently in different implementations. Microsoft Solitaire counts every card touch, foundation send, and auto-flip, which inflates totals. Some research solvers count only player-initiated moves, which produces much lower numbers. In most common counting methods, the floor sits somewhere between 50 and 80 moves on a lucky draw-1 deal, but that is a range, not a verified minimum.',
  },
  {
    question: 'What is the quickest possible game of solitaire?',
    answer:
      'If "solitaire" means Klondike, the quickest realistic wins are short draw-1 games where most cards go straight from the stock to the foundations with minimal tableau work. If you mean any solitaire variant, Aces Up and Golf can end in under 20 moves on a favorable layout. Klondike is fundamentally slower than those games because every one of the 52 cards has to reach the foundation and many start buried.',
  },
  {
    question: 'Why do move counts vary so much between apps?',
    answer:
      'Different apps count different things. Some count only manual moves and skip auto-flips of tableau cards. Some count each card sent to the foundation as a separate move even if the game auto-completed. Draw-1 and draw-3 also produce very different totals for the same outcome because draw-3 requires cycling through the stock more times. Always check an app&apos;s definition before comparing your score to a published record.',
  },
  {
    question: 'Is draw-1 or draw-3 faster to win?',
    answer:
      'Draw-1 is dramatically faster on average. In draw-1 every stock card is individually accessible, so finding a usable card takes one move. In draw-3 you often cycle through the stock multiple times searching for a specific card that happens to sit in the middle of a triple. Competitive move-minimization records almost always come from draw-1 play.',
  },
  {
    question: 'How can I finish Klondike games in fewer moves?',
    answer:
      'Three habits matter most. First, do not send cards to the foundation the instant they are legal — holding low cards back gives you a landing pad for tableau play and often saves moves later. Second, plan foundation sends in parallel rather than bouncing between suits. Third, minimize stock cycles by planning before each pass which cards you actually need. Most wasted moves come from cycling the stock without a target.',
  },
];

export default function KlondikeFewestMovesPage() {
  if (!isOwnedBy('/klondike-fewest-moves', siteConfig.key)) notFound();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Fewest Moves to Win Klondike Solitaire: What Counts, What Records Exist',
      description:
        'A plain-English guide to minimum move counts in Klondike, how different apps count moves, and the habits that produce faster wins.',
      url: absoluteUrl('/klondike-fewest-moves'),
      datePublished: '2026-04-19',
      dateModified: '2026-04-19',
      author: { '@type': 'Organization', name: siteConfig.siteName },
      publisher: { '@type': 'Organization', name: siteConfig.siteName },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/klondike-fewest-moves'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fewest Moves to Win Klondike',
          item: absoluteUrl('/klondike-fewest-moves'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm text-[#6B7280] px-2">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="text-[#D4AF37]/70 hover:text-[#D4AF37] hover:underline transition-colors">Home</Link>
              <span className="text-[#6B7280]/40" aria-hidden="true">/</span>
            </li>
            <li className="text-[#6B7280]/70">Fewest Moves to Win Klondike</li>
          </ol>
        </nav>

        <CardSection variant="dark">
          <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
              Move-Count Reference
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Fewest Moves to Win Klondike Solitaire
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
              &ldquo;What is the minimum number of moves to win solitaire?&rdquo; is one of the
              most-searched questions about Klondike, and the answers you find online disagree
              wildly. The reason is simple: different apps define a &ldquo;move&rdquo; differently.
              Once you know what is actually being counted, the landscape makes sense.
            </p>

            <div className="mt-8 bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                The short answer
              </div>
              <p className="text-white leading-7">
                On a favorable draw-1 deal, a skilled player can win Klondike in roughly 60&ndash;90
                moves under typical counting rules. Under strict minimization (research-solver
                rules that count only player-initiated actions), the theoretical floor drops
                further, but no implementation everyone agrees on publishes a single universal
                number. When you see &ldquo;minimum 52 moves&rdquo; claims online, someone is
                counting only the 52 foundation sends and ignoring everything else.
              </p>
            </div>
          </div>
        </CardSection>

        <CardSection id="what-counts" variant="dark">
          <SectionHeading variant="dark" sub="Definitions matter">What Counts as a Move</SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              There is no universal standard for what a &ldquo;move&rdquo; is in Klondike. The
              main things different implementations disagree on:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-white/80">
              <li>
                <strong className="text-white">Auto-flips.</strong> When you move the top card off
                a tableau pile and the card underneath flips face-up, some apps count that flip as
                a separate move. Others treat it as part of the original move.
              </li>
              <li>
                <strong className="text-white">Auto-complete.</strong> When the board reaches a
                state where every remaining card can go to the foundations without choice, most
                apps trigger an auto-complete. Some count each auto-send as a move; some count
                the whole auto-complete as one move.
              </li>
              <li>
                <strong className="text-white">Stock draws.</strong> Each time you click the stock
                and flip a card (or three), that is one move in most counts. But some apps count a
                full pass through the stock as a single move, which dramatically changes the math.
              </li>
              <li>
                <strong className="text-white">Multi-card moves.</strong> Moving a five-card
                sequence from one tableau column to another is one drag in most UIs. Most apps
                count it as one move; some count each card individually.
              </li>
            </ul>
            <p>
              Any claim about &ldquo;fewest moves&rdquo; needs to specify which of these rules are
              in play. Otherwise it is comparing a 60-move game to a 180-move game that reached
              the same result.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="records" variant="dark">
          <SectionHeading variant="dark" sub="What the community tracks">Records and Shortest Games</SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Klondike community has long tracked minimum-move games on favorable deals, but
              records are fragmented across apps because of the counting problem above. A few
              things that are reasonably agreed on:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Draw-1 is the record category</h3>
                <p className="text-sm text-white/75 leading-6">
                  Serious minimum-move play is almost always draw-1. Draw-3 forces cycles through
                  the stock that cannot be optimized away on most deals, so the floor is
                  structurally higher.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Favorable deals matter more than skill</h3>
                <p className="text-sm text-white/75 leading-6">
                  A sub-70-move win generally requires a deal where most Aces, 2s, and 3s are
                  visible or one card deep. Skill gets you to optimal play on a favorable deal; it
                  cannot turn a bad deal into a record.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Solver-proven minimums exist per deal</h3>
                <p className="text-sm text-white/75 leading-6">
                  Research solvers can compute the true minimum move count for any winnable deal.
                  Those numbers are definitive for that deal under the solver&apos;s counting rules
                  &mdash; but they are rarely published for casual play.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Microsoft&apos;s count inflates totals</h3>
                <p className="text-sm text-white/75 leading-6">
                  Microsoft Solitaire Collection and its predecessors count every micro-action,
                  including auto-flips and individual auto-complete sends. Move totals from those
                  apps will always look higher than totals from strict-count apps for the same
                  game.
                </p>
              </div>
            </div>
          </ContentBody>
        </CardSection>

        <CardSection id="faster-wins" variant="dark">
          <SectionHeading variant="dark" sub="Practical tips">How to Finish in Fewer Moves</SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Whatever counting rule your app uses, a few habits consistently reduce move counts.
              They also tend to increase your overall win rate as a side effect.
            </p>
            <ul className="list-disc ml-6 space-y-3 text-white/80 leading-7">
              <li>
                <strong className="text-white">Hold low cards back.</strong> The instinct to send
                Aces and 2s to the foundation the moment they appear is strong and usually wrong.
                Low cards in the tableau are useful landing pads &mdash; you can stack a 2 on an
                Ace, then build on it. Sending them too early forces more tableau shuffles later.
              </li>
              <li>
                <strong className="text-white">Plan before cycling the stock.</strong> Every stock
                cycle is moves. Before you draw, scan the board and identify the specific card you
                need from the next pass. If you do not have a target, do not draw &mdash; work the
                tableau first.
              </li>
              <li>
                <strong className="text-white">Empty columns with a purpose.</strong> An empty
                tableau column is worth a lot, but only if you have a plan for the King that will
                refill it. Emptying a column to move a single card is usually a wasted move.
              </li>
              <li>
                <strong className="text-white">Prefer multi-card moves.</strong> If your app
                supports moving a sequence in one drag, use it. Even when it counts each card
                separately, the planning overhead is lower and you make fewer mistakes.
              </li>
              <li>
                <strong className="text-white">Let auto-complete run.</strong> Once the board is
                clean, finish with auto-complete instead of manually sending each card. Apps that
                count auto-complete as one move reward this; apps that count each send penalize
                manual sends just as much.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection id="other-games" variant="dark">
          <SectionHeading variant="dark" sub="Quicker variants">If You Want Really Short Games</SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike is not the fastest solitaire variant, and that is a feature of the game,
              not a bug &mdash; the long cycle through the stock is part of why Klondike feels
              like a journey. If you want genuinely short wins:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/aces-up"
                title="Aces Up"
                description="Usually wins or loses in under 30 moves. One of the quickest solitaires ever designed."
              />
              <ContentLinkCard
                href="/golf"
                title="Golf Solitaire"
                description="Short, snappy games. A single pass through the stock decides the outcome most of the time."
              />
              <ContentLinkCard
                href="/clock"
                title="Clock Patience"
                description="Pure luck, fast turnover. A full round rarely takes more than a few minutes."
              />
            </div>
          </ContentBody>
        </CardSection>

        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions">Fewest Moves FAQ</SectionHeading>
          <ContentBody variant="dark" className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question}>
                <h3 className="font-medium text-white text-lg mb-2">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                {index < faqs.length - 1 && <div className="mt-6 border-b border-white/[0.07]" />}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <CardSection id="related-guides" variant="dark">
          <SectionHeading variant="dark" sub="Read Next">Related Klondike Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy" description="The core strategic principles that separate winning Klondike play from random clicking." />
            <ContentLinkCard href="/klondike/draw-1-vs-draw-3" title="Draw 1 vs Draw 3" description="Every difference between the two scoring modes and which one rewards skill more." />
            <ContentLinkCard href="/klondike-probability" title="Klondike Probability" description="The math behind winnability, deal quality, and what 'lucky deal' actually means." />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Put your move count to the test"
          body="Play a draw-1 Klondike game and see how few moves you can finish in. Your move counter updates live as you play."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the Strategy Guide"
          secondaryHref="/klondike/strategy"
        />
      </main>
    </ContentLayout>
  );
}
