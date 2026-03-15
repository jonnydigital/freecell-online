import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { expertDeals } from '@/lib/curatedDeals';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'Hard FreeCell Games: What Makes A Deal Difficult?',
  description:
    'Learn what makes a FreeCell game hard, how to recognize narrow tactical positions early, and how to play difficult deals without burning all your space.',
  keywords: [
    'hard freecell games',
    'difficult freecell deals',
    'why is freecell hard',
    'hard freecell strategy',
    'freecell difficult positions',
  ],
  openGraph: {
    title: 'Hard FreeCell Games: What Makes A Deal Difficult?',
    description:
      'A practical guide to the board patterns that make FreeCell hard and the tactics that keep difficult deals alive.',
    url: absoluteUrl('/hard-freecell-games'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};


const faqs = [
  {
    question: 'What makes a FreeCell game hard?',
    answer:
      'Hard deals usually bury low cards, restrict empty columns, and create positions where one wrong opening sequence can close off the winning line.',
  },
  {
    question: 'Does hard mean unsolvable?',
    answer:
      'No. Most hard FreeCell deals are still solvable. They simply leave less margin for error and require more careful space management.',
  },
  {
    question: 'How should I approach a difficult FreeCell game?',
    answer:
      'Start with a slower scan, protect empty columns, avoid filling every free cell, and think about mobility before beauty. Difficult deals reward patience more than speed.',
  },
  {
    question: 'What is the most famous impossible FreeCell deal?',
    answer:
      'The most famous one is Microsoft FreeCell deal #11982. It is a useful reference point because it reminds players that truly impossible deals are rare.',
  },
];


export default function HardFreecellGamesPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Hard FreeCell Games: What Makes A Deal Difficult?',
      description:
        'A guide to the patterns that make FreeCell deals difficult, plus tactics for surviving narrow positions.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-07',
      dateModified: '2026-03-13',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/hard-freecell-games'),
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
          name: 'Hard FreeCell Games',
          item: absoluteUrl('/hard-freecell-games'),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        <CardSection variant="dark">
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Advanced FreeCell
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              >
                Hard FreeCell Games
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Difficult FreeCell deals are not hard because the rules change. They are hard
                because the board gives you less room, fewer forgiving lines, and more chances to
                mistake motion for progress.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60 mb-3">
                    The core idea
                  </div>
                  <p className="text-white leading-7">
                    Hard deals restrict mobility. The more the board forces you to spend free cells
                    and delay low-card progress, the narrower the winning line becomes.
                  </p>
                </div>

                <div className="rounded-xl bg-[#072907] p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                    Key takeaways
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-white/75">
                    <li>Buried aces and twos make deals harder fast.</li>
                    <li>Empty columns matter more than tidy-looking stacks.</li>
                    <li>Hard games punish wasteful free-cell usage immediately.</li>
                    <li>Most hard deals are still solvable with cleaner sequencing.</li>
                  </ul>
                </div>
              </div>
            </div>
        </CardSection>

        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="The Patterns">What Makes A FreeCell Deal Difficult</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Buried low cards</h3>
                <p className="text-white/70 text-sm leading-7">
                  If aces, twos, and threes are trapped under long mixed stacks, the foundations
                  stall and the whole board stays heavier for longer.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">No easy empty column</h3>
                <p className="text-white/70 text-sm leading-7">
                  Difficult deals often deny you a clean column. Without that space, every rebuild
                  becomes more expensive and every mistake costs more.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Conflicting color ladders</h3>
                <p className="text-white/70 text-sm leading-7">
                  Hard games create stacks that look useful but block the exact color alternation
                  you need for a clean release later.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] p-5">
                <h3 className="text-lg font-semibold text-white mb-2">False-choice openings</h3>
                <p className="text-white/70 text-sm leading-7">
                  The opening move is not always obviously wrong. Hard deals often give you several
                  plausible starts, but only one preserves the board&apos;s future flexibility.
                </p>
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Do Not Confuse Them">Hard Versus Impossible</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                A hard deal gives you a narrow path. An impossible deal gives you none. That
                distinction matters because players routinely label a deal &quot;impossible&quot; after
                wasting all their space and getting stuck in a damaged position.
              </p>
              <p>
                The famous{" "}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">
                  Game #11982
                </Link>{" "}
                is useful precisely because it is so unusual. It is the reminder that impossible
                deals exist, but they are rare enough that your default assumption should still be:
                there is probably a line here if I manage space better.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">A better question to ask mid-game</h3>
                <p className="text-sm leading-7">
                  Instead of asking &quot;Is this deal impossible?&quot; ask &quot;What resource did I lose?&quot; Most
                  hard positions get ugly because you lost an empty column, buried a critical low
                  card again, or spent a free cell to make a move that looked active but reduced mobility.
                </p>
              </div>
            </ContentBody>
        </CardSection>

        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Practical Tactics">How To Attack Hard Deals</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Scan longer before move one</h3>
                <p className="text-white/70 text-sm leading-7">
                  Hard deals reward patience at the start. Locate every ace, low card, and nearly
                  clear column before you commit to a sequence.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Protect free cells</h3>
                <p className="text-white/70 text-sm leading-7">
                  In tough positions, free cells are not for decoration. They are tactical reserve.
                  Spend them only when they open something more valuable.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Value mobility over beauty</h3>
                <p className="text-white/70 text-sm leading-7">
                  A pretty descending stack can be a trap. Favor lines that create room and expose
                  low cards, even if the tableau looks less elegant in the short term.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Study failed positions</h3>
                <p className="text-white/70 text-sm leading-7">
                  Use undo, hints, and the{" "}
                  <Link href="/solver" className="text-[#D4AF37] hover:underline">
                    solver
                  </Link>{" "}
                  to find the first move where your space management went wrong. That is where the
                  learning lives.
                </p>
              </div>
            </ContentBody>
        </CardSection>

        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Test Your Skills">Try These Expert Challenge Deals</SectionHeading>
            <ContentBody variant="dark">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {expertDeals.map((deal) => (
                  <Link
                    key={deal.number}
                    href={`/game/${deal.number}`}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.05] p-5 hover:border-[#D4AF37]/50 transition-colors text-center"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-red-500/20 text-red-400 mb-3">
                      Hard
                    </span>
                    <div className="text-2xl font-bold text-white mb-1">#{deal.number}</div>
                    <div className="text-sm text-white/60">{deal.label}</div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <Link href="/famous-freecell-deals" className="text-[#D4AF37] hover:underline text-sm font-medium">
                  See all famous deals &rarr;
                </Link>
                <Link href="/deals" className="text-[#D4AF37] hover:underline text-sm font-medium">
                  Browse all deals &rarr;
                </Link>
              </div>
            </ContentBody>
        </CardSection>

        <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Read Next">Build The Full Difficulty Cluster</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard href="/easy-freecell-games" title="Easy FreeCell Games" description="Learn what a forgiving deal looks like and why easier boards are ideal for practice." />
              <ContentLinkCard href="/is-every-freecell-game-winnable" title="Is Every Game Winnable?" description="Separate truly impossible deals from solvable boards that only look dead." />
              <ContentLinkCard href="/tips" title="Tips and Tricks" description="Pair this page with a quicker tactical checklist you can use during live play." />
              <ContentLinkCard href="/famous-freecell-deals" title="Famous FreeCell Deals" description="Explore the iconic games that define FreeCell difficulty — from the notoriously hard to the proven impossible." />
            </ContentBody>
        </CardSection>

        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions">Hard FreeCell Games FAQ</SectionHeading>
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

        <CtaSection
          heading="Try A Deal That Makes You Think"
          body="Tough FreeCell games are where discipline shows up. Play one, lose with purpose, and use the position to sharpen your next opening scan."
          secondaryLabel="Study Full Strategy"
          secondaryHref="/strategy"
        />
      </main>
    </ContentLayout>
  );
}
