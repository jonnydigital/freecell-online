import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '../../../components/AdUnit';
import ContentLayout from '../../../components/ContentLayout';

export const metadata: Metadata = {
  title: 'Spider Solitaire: 1-Suit vs 2-Suit vs 4-Suit Compared',
  description:
    'Compare Spider Solitaire difficulty levels — 1-suit, 2-suit, and 4-suit. Learn the rule differences, strategy changes, win rates, and which mode fits your skill level.',
  keywords: [
    'spider solitaire 1 suit vs 4 suit',
    'spider solitaire difficulty levels',
    'spider solitaire 1 suit',
    'spider solitaire 2 suit',
    'spider solitaire 4 suit',
    'spider solitaire comparison',
    'spider solitaire win rate',
  ],
  openGraph: {
    title: 'Spider Solitaire: 1-Suit vs 2-Suit vs 4-Suit Compared',
    description:
      'A complete comparison of Spider Solitaire difficulty levels — rules, strategy, win rates, and which mode is right for you.',
    url: absoluteUrl('/spider/1-suit-vs-2-suit-vs-4-suit'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const CARD = 'card-panel';
const CARD_TOP: React.CSSProperties = {
  borderTop: '1px solid rgba(184, 134, 11, 0.08)',
};

const faqs = [
  {
    question: 'What is the difference between 1-suit, 2-suit, and 4-suit Spider Solitaire?',
    answer:
      'The core rules are the same in all three modes. The difference is how many suits are in play. 1-suit uses only Spades, 2-suit uses Spades and Hearts, and 4-suit uses all four suits. More suits means more complexity and a lower win rate.',
  },
  {
    question: 'Which Spider Solitaire mode is easiest?',
    answer:
      '1-suit Spider Solitaire is the easiest mode. Because every card is the same suit, any card can stack on any other card of higher rank. There are no color or suit conflicts, so the game is primarily about sequencing and column management.',
  },
  {
    question: 'What is the win rate for 4-suit Spider Solitaire?',
    answer:
      'Win rates for 4-suit Spider Solitaire vary widely by skill level. Experienced players report win rates in the range of 20% to 40%, while casual players may win fewer than 1 in 10 games. The theoretical solvability rate is higher, but finding the solution is extremely difficult.',
  },
  {
    question: 'Should beginners start with 1-suit Spider Solitaire?',
    answer:
      'Yes. 1-suit mode teaches the fundamental mechanics — dealing from the stock, building sequences, clearing columns, and completing full runs — without the added complexity of suit matching. Once those skills are automatic, moving to 2-suit is a natural next step.',
  },
  {
    question: 'Is 2-suit Spider Solitaire a good middle ground?',
    answer:
      'Absolutely. 2-suit mode introduces suit awareness without the full chaos of four suits. You learn to manage mixed-suit stacks and prioritize same-suit runs, which are the core strategic skills you need for 4-suit play.',
  },
  {
    question: 'How does Spider Solitaire compare to FreeCell?',
    answer:
      'Spider Solitaire and FreeCell are both skill-based solitaire games, but they play quite differently. FreeCell has free cells for temporary storage and all cards visible from the start. Spider uses a stock pile and requires completing full 13-card runs. See our detailed comparison for more.',
  },
];

function SectionHeading({
  children,
  id,
  sub,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
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
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function SpiderSuitComparisonPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Spider Solitaire: 1-Suit vs 2-Suit vs 4-Suit Compared',
      description:
        'A detailed comparison of Spider Solitaire difficulty levels — rules, strategy differences, win rates, and guidance on which mode suits your skill level.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-07',
      dateModified: '2026-03-07',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/spider/1-suit-vs-2-suit-vs-4-suit'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Spider Solitaire',
          item: absoluteUrl('/spider'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: '1-Suit vs 2-Suit vs 4-Suit',
          item: absoluteUrl('/spider/1-suit-vs-2-suit-vs-4-suit'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        <section>
          <div className={CARD}>
            <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 block mb-3">
                Spider Solitaire Guide
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-[#2a2522] leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                1-Suit vs 2-Suit vs 4-Suit Spider Solitaire
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#444444] max-w-3xl">
                Spider Solitaire comes in three difficulty levels, all using the same basic rules
                but with a dramatically different feel. The number of suits changes everything:
                how you stack, how you plan, how often you win, and how much patience the game
                demands.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.15fr,0.85fr]">
                <div className="card-inset rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-3">
                    The core difference
                  </div>
                  <p className="text-[#2a2522] leading-7">
                    In 1-suit mode, every card is the same suit so stacking conflicts never arise.
                    In 2-suit mode, you manage two colors. In 4-suit mode, all four suits are in
                    play and only same-suit sequences can be moved as a group or completed. More
                    suits means more decisions, more dead ends, and a steeper skill curve.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Quick comparison
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>1-suit: relaxing, high win rate, great for learning</li>
                    <li>2-suit: moderate challenge, suit awareness required</li>
                    <li>4-suit: punishing, low win rate, deep strategy</li>
                    <li>Same rules, completely different games</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="rules-comparison" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="How They Differ">Rules Across All Three Modes</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                The basic{' '}
                <Link href="/spider/how-to-play" className="text-[#D4AF37] hover:underline">
                  Spider Solitaire rules
                </Link>{' '}
                are the same regardless of difficulty: ten tableau columns, a stock pile that deals
                one card to each column, and the goal of building complete King-to-Ace runs that
                are removed from the board. The difference is in the suits.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-[#e5e0d8] p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">1-Suit (Spades only)</h3>
                  <p className="text-[#444444] text-sm leading-7">
                    All 104 cards are Spades. Every card stacks on every higher card. Every
                    sequence is automatically same-suit, so every sequence can be moved as a group.
                    Completing a King-to-Ace run is straightforward because suit conflicts do not
                    exist.
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5e0d8] p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">2-Suit (Spades + Hearts)</h3>
                  <p className="text-[#444444] text-sm leading-7">
                    The deck uses two suits. You can still stack any card on a higher card regardless
                    of suit, but only same-suit sequences can be moved together. This means
                    mixed-suit stacks become immovable dead weight unless you break them apart
                    card by card.
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5e0d8] p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">4-Suit (all four)</h3>
                  <p className="text-[#444444] text-sm leading-7">
                    All four suits are in play. The odds of two adjacent cards being the same suit
                    drop to 25%, so natural same-suit sequences are rare. Building a complete
                    same-suit run from King to Ace requires careful planning and extensive
                    reorganization.
                  </p>
                </div>
              </div>
              <p>
                The critical rule: only same-suit sequences can be moved as a group. In 1-suit
                mode this is trivially satisfied. In 4-suit mode it is the central strategic
                constraint that shapes every decision.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        <section id="strategy-differences" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Different Games, Different Thinking">Strategy by Difficulty Level</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                Strategy shifts dramatically as you add suits. What works in 1-suit can actively
                hurt you in 4-suit. Here is how your thinking needs to change at each level.
              </p>

              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">1-Suit Strategy</h3>
                <p className="text-sm leading-7 mb-3">
                  Focus on creating empty columns and building long sequences. Since every stack is
                  same-suit by default, your main concern is sequencing — getting cards in the right
                  order so runs complete naturally. Empty columns are your primary resource for
                  rearranging cards.
                </p>
                <ul className="space-y-2 text-sm leading-7">
                  <li>Prioritize clearing columns over building long sequences.</li>
                  <li>Use empty columns as temporary staging areas for reorganization.</li>
                  <li>Delay dealing from the stock until you have maximized the current layout.</li>
                </ul>
              </div>

              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">2-Suit Strategy</h3>
                <p className="text-sm leading-7 mb-3">
                  Suit awareness becomes essential. You can still stack mixed suits when needed, but
                  every mixed-suit stack costs you mobility. The key skill is knowing when a
                  mixed-suit temporary placement is worth it and when it will cripple your position
                  later.
                </p>
                <ul className="space-y-2 text-sm leading-7">
                  <li>Prefer same-suit placements whenever possible, even at the cost of a slower opening.</li>
                  <li>Track which suits you are closest to completing and focus resources there.</li>
                  <li>Empty columns are even more valuable because they let you break apart mixed stacks.</li>
                </ul>
              </div>

              <div className="card-inset rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#2a2522] mb-3">4-Suit Strategy</h3>
                <p className="text-sm leading-7 mb-3">
                  This is where Spider Solitaire becomes a serious puzzle. With four suits, natural
                  same-suit sequences are rare. You need to think several moves ahead, manage
                  multiple partial runs simultaneously, and accept that many games will end in
                  defeat no matter how well you play. Read our full{' '}
                  <Link href="/spider/strategy" className="text-[#D4AF37] hover:underline">
                    Spider strategy guide
                  </Link>{' '}
                  for deeper coverage.
                </p>
                <ul className="space-y-2 text-sm leading-7">
                  <li>Focus on one or two suits to complete first rather than spreading effort across all four.</li>
                  <li>Treat mixed-suit stacking as a last resort, not a default move.</li>
                  <li>Plan stock deals carefully — dealing onto a cluttered board is often game-ending.</li>
                  <li>Accept a lower win rate. Even strong players lose most 4-suit games.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="win-rates" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="What To Expect">Win Rates by Difficulty Level</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                Win rates are the most dramatic difference between the three modes. The numbers
                below are approximate and based on community reports and solver analyses.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-[#e5e0d8] p-5 text-center">
                  <div className="text-3xl font-bold text-[#2a2522] mb-1" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>~90%+</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-2">1-Suit Win Rate</div>
                  <p className="text-[#444444] text-sm leading-7">
                    Most 1-suit deals are solvable and forgiving. Experienced players can sustain
                    win rates above 90%. Beginners typically win 60% to 80% of games.
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5e0d8] p-5 text-center">
                  <div className="text-3xl font-bold text-[#2a2522] mb-1" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>~40-60%</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-2">2-Suit Win Rate</div>
                  <p className="text-[#444444] text-sm leading-7">
                    A significant step up. Skilled players report win rates in the 40% to 60%
                    range. The suit-matching requirement filters out many otherwise clean
                    positions.
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5e0d8] p-5 text-center">
                  <div className="text-3xl font-bold text-[#2a2522] mb-1" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>~10-35%</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8860B]/65 mb-2">4-Suit Win Rate</div>
                  <p className="text-[#444444] text-sm leading-7">
                    The hardest mode. Even experienced players report win rates between 10% and
                    35%. Many deals are theoretically solvable but practically beyond human reach.
                  </p>
                </div>
              </div>
              <p>
                These numbers highlight an important truth: the same game at different difficulty
                levels can feel like completely different games. If you are winning 90% of your
                1-suit games, do not expect to carry that rate into 4-suit.
              </p>
            </div>
          </div>
        </section>

        <section id="which-to-play" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Choose Your Level">Which Mode Should You Play?</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-8">
              <p>
                There is no wrong answer. Each mode serves a different purpose and appeals to a
                different mindset. Here is a quick guide to help you choose.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="card-inset rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Play 1-suit if...</h3>
                  <ul className="space-y-2 text-sm leading-7 text-[#444444]">
                    <li>You are new to Spider Solitaire</li>
                    <li>You want a relaxing session with high win odds</li>
                    <li>You are learning the basic mechanics</li>
                    <li>You enjoy the satisfaction of completing runs often</li>
                  </ul>
                </div>
                <div className="card-inset rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Play 2-suit if...</h3>
                  <ul className="space-y-2 text-sm leading-7 text-[#444444]">
                    <li>1-suit feels too easy and you want more challenge</li>
                    <li>You want to develop suit-management skills</li>
                    <li>You prefer a balanced win rate (not too easy, not brutal)</li>
                    <li>You are preparing for the jump to 4-suit</li>
                  </ul>
                </div>
                <div className="card-inset rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#2a2522] mb-2">Play 4-suit if...</h3>
                  <ul className="space-y-2 text-sm leading-7 text-[#444444]">
                    <li>You want the hardest version of the game</li>
                    <li>You enjoy strategic depth over quick wins</li>
                    <li>You are comfortable with a low win rate</li>
                    <li>You like puzzles that demand long-term planning</li>
                  </ul>
                </div>
              </div>
              <p>
                Many players rotate between modes depending on their mood. A 1-suit game to warm
                up, a 4-suit game when you want a real fight. There is no rule that says you have
                to pick one and stick with it.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        <section id="related" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Keep Reading">Related Guides</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 grid gap-4 md:grid-cols-3">
              <Link href="/spider" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">Play Spider Solitaire</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Jump into a game and put these comparisons to the test.
                </p>
              </Link>
              <Link href="/spider/how-to-play" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">How To Play Spider</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  Learn the full rules, mechanics, and terminology.
                </p>
              </Link>
              <Link href="/freecell-vs-spider" className="rounded-xl border border-[#e5e0d8] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-[#2a2522]">FreeCell vs Spider</h3>
                <p className="mt-2 text-sm leading-7 text-[#444444]">
                  See how Spider compares to FreeCell in rules, strategy, and feel.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions">Spider Solitaire Difficulty FAQ</SectionHeading>
            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {faqs.map((faq, index) => (
                <div key={faq.question}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">{faq.question}</h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {index < faqs.length - 1 && <div className="mt-6 border-b border-[#e5e0d8]" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background: 'linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)',
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Pick Your Difficulty and Play
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Start with 1-suit to learn the ropes, or jump straight into 4-suit if you want the
                full challenge. The same game, three very different experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/spider"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play Spider Solitaire
                </Link>
                <Link
                  href="/spider/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Read Spider Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
