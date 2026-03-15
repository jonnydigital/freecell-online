import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from '@/components/content';

export const metadata: Metadata = {
  title: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
  description:
    'Explore every FreeCell variant: classic FreeCell, Baker\'s Game, Eight Off, reduced-cell modes, daily challenges, and competitive speed modes. Find the version that fits your skill level.',
  keywords: [
    'freecell variants',
    'freecell game variations',
    'types of freecell',
    'freecell solitaire versions',
    'freecell game modes',
    'bakers game',
    'eight off solitaire',
    '1 cell freecell',
    '2 cell freecell',
    '3 cell freecell',
    'easy freecell',
    'hard freecell',
    'freecell difficulty levels',
  ],
  openGraph: {
    title: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
    description:
      'Classic FreeCell, Baker\'s Game, Eight Off, reduced-cell modes, daily challenges, and competitive speed modes. Find the variant that fits your skill level.',
    url: absoluteUrl('/freecell-variants'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: absoluteUrl('/freecell-variants'),
  },
};

const faqItems = [
  {
    question: 'What is the easiest FreeCell variant?',
    answer:
      'Easy FreeCell is the most beginner-friendly variant. Aces and 2s start on the foundations, giving you a significant head start. Standard FreeCell with 4 free cells is also very approachable, with a 99.999% solvability rate.',
  },
  {
    question: 'What is the hardest FreeCell variant?',
    answer:
      '1-Cell FreeCell is the hardest variant. With only one free cell for temporary storage, roughly 10% of deals are solvable. It requires perfect planning and deep lookahead to win.',
  },
  {
    question: 'What is the difference between FreeCell and Baker\'s Game?',
    answer:
      'The only difference is the stacking rule on the tableau. FreeCell uses alternating-color stacking (red on black), while Baker\'s Game requires same-suit stacking (hearts on hearts). This makes Baker\'s Game significantly harder despite having the same layout.',
  },
  {
    question: 'How many FreeCell variants can I play here?',
    answer:
      'You can play over 9 distinct FreeCell variants including classic FreeCell, Baker\'s Game, Eight Off, Easy FreeCell, 3-Cell, 2-Cell, and 1-Cell FreeCell. Plus competitive modes like Daily FreeCell, Streak Mode, and Storm Mode.',
  },
  {
    question: 'Are all FreeCell deals solvable in every variant?',
    answer:
      'No. Standard FreeCell has a 99.999% solvability rate (only deal #11982 of the original 32,000 is unsolvable). Reduced-cell variants have much lower solvability rates — 1-Cell FreeCell is only about 10% solvable. Baker\'s Game is around 75% solvable.',
  },
];

export default function FreecellVariantsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
      description:
        'A comprehensive guide to every FreeCell variant, from beginner-friendly Easy FreeCell to expert 1-Cell FreeCell, plus competitive modes.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-15',
      dateModified: '2026-03-15',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-variants'),
      },
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
          name: 'FreeCell Variants',
          item: absoluteUrl('/freecell-variants'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <ContentHero
          kicker="Game Index"
          title="FreeCell Variants"
          subtitle="From beginner-friendly Easy FreeCell to the punishing 1-Cell mode, there are 9+ ways to play. Find the variant that matches your skill level — or try them all."
        />

        {/* Intro */}
        <CardSection variant="dark">
          <ContentBody variant="dark" className="space-y-4">
            <p>
              FreeCell is not a single game — it is a family of solitaire variants that share the
              same core mechanic: open free cells for temporary card storage. By changing the number
              of free cells, the stacking rules, or the starting layout, each variant creates a
              distinct challenge. Some are nearly always solvable. Others will test even the best
              players.
            </p>
            <p>
              This page is your guide to every FreeCell variant available on {siteConfig.siteName},
              plus the competitive modes that add time pressure and daily challenges to the mix.
            </p>
          </ContentBody>
        </CardSection>

        {/* Classic FreeCell Modes */}
        <CardSection id="classic-modes" variant="dark">
          <SectionHeading variant="dark" sub="The Originals" id="classic-modes-heading">
            Classic FreeCell Modes
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/"
                title="FreeCell"
                description="The classic. 4 free cells, 8 cascades, 99.999% solvable."
                icon="♠"
              />
              <ContentLinkCard
                href="/bakers-game"
                title="Baker's Game"
                description="Same-suit stacking. The original FreeCell ancestor."
                icon="♥"
              />
              <ContentLinkCard
                href="/eight-off"
                title="Eight Off"
                description="8 free cells, same-suit stacking. More room, stricter rules."
                icon="♦"
              />
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Difficulty Variants */}
        <CardSection id="difficulty-variants" variant="dark">
          <SectionHeading variant="dark" sub="Adjust the Challenge" id="difficulty-heading">
            Difficulty Variants
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/easy-freecell"
                title="Easy FreeCell"
                description="Aces and 2s start on foundations. Beginner-friendly."
                icon="🟢"
              />
              <ContentLinkCard
                href="/freecell/3-cell"
                title="3-Cell FreeCell"
                description="One fewer free cell. Noticeably harder."
                icon="3️⃣"
              />
              <ContentLinkCard
                href="/freecell/2-cell"
                title="2-Cell FreeCell"
                description="Two free cells. Expert territory."
                icon="2️⃣"
              />
              <ContentLinkCard
                href="/freecell/1-cell"
                title="1-Cell FreeCell"
                description="One free cell. Extreme difficulty. ~10% solvable."
                icon="1️⃣"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* Competitive Modes */}
        <CardSection id="competitive-modes" variant="dark">
          <SectionHeading variant="dark" sub="Test Yourself" id="competitive-heading">
            Competitive Modes
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/daily-freecell"
                title="Daily FreeCell"
                description="Same deal worldwide. Compare your solution."
                icon="📅"
              />
              <ContentLinkCard
                href="/streak"
                title="Streak Mode"
                description="Win consecutive games. How far can you go?"
                icon="🔥"
              />
              <ContentLinkCard
                href="/storm"
                title="Storm Mode"
                description="Speed challenge. Beat the clock."
                icon="⚡"
              />
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Other Solitaire Games */}
        <CardSection id="other-solitaire" variant="dark">
          <SectionHeading variant="dark" sub="Beyond FreeCell" id="other-solitaire-heading">
            Other Solitaire Games
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/spider"
                title="Spider Solitaire"
                description="10 columns, build sequences in suit. A different kind of challenge."
                icon="🕷️"
              />
              <ContentLinkCard
                href="/klondike"
                title="Klondike"
                description="The world's most popular solitaire. Draw from the stock, build on foundations."
                icon="♣"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* Difficulty Comparison Table */}
        <CardSection id="comparison" variant="dark">
          <SectionHeading variant="dark" sub="At a Glance" id="comparison-heading">
            Difficulty Comparison
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-[#D4AF37]">Variant</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Free Cells</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Stacking Rule</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Solvability</th>
                    <th className="py-3 pl-4 font-semibold text-[#D4AF37]">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/" className="hover:text-[#D4AF37] transition-colors">FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">99.999%</td>
                    <td className="py-3 pl-4">⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/easy-freecell" className="hover:text-[#D4AF37] transition-colors">Easy FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~100%</td>
                    <td className="py-3 pl-4">⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/bakers-game" className="hover:text-[#D4AF37] transition-colors">Baker&apos;s Game</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Same suit</td>
                    <td className="py-3 px-4">~75%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/eight-off" className="hover:text-[#D4AF37] transition-colors">Eight Off</Link>
                    </td>
                    <td className="py-3 px-4">8</td>
                    <td className="py-3 px-4">Same suit</td>
                    <td className="py-3 px-4">~89%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/3-cell" className="hover:text-[#D4AF37] transition-colors">3-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">3</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~99%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/2-cell" className="hover:text-[#D4AF37] transition-colors">2-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~85%</td>
                    <td className="py-3 pl-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/1-cell" className="hover:text-[#D4AF37] transition-colors">1-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~10%</td>
                    <td className="py-3 pl-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq-heading">
            Frequently Asked Questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.question} className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm leading-7 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Find Your Perfect Variant"
          body="Whether you want a relaxing game or a brutal challenge, there's a FreeCell variant for you. Jump in — no account needed."
          primaryLabel="Play Classic FreeCell"
          secondaryLabel="Try 1-Cell FreeCell"
          secondaryHref="/freecell/1-cell"
        />

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
          <SectionHeading variant="dark" sub="Keep Reading" id="related-heading">
            Related Pages
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/how-to-play"
                title="How to Play FreeCell"
                description="Learn the rules and mechanics of FreeCell Solitaire from scratch."
              />
              <ContentLinkCard
                href="/strategy"
                title="Strategy Guide"
                description="Advanced techniques for winning more games across all FreeCell variants."
              />
              <ContentLinkCard
                href="/solitaire-types"
                title="Solitaire Types"
                description="Explore the full world of solitaire beyond FreeCell."
              />
              <ContentLinkCard
                href="/is-every-freecell-game-winnable"
                title="Is Every Game Winnable?"
                description="The math behind FreeCell solvability and the famous unsolvable deal #11982."
              />
            </div>
          </ContentBody>
        </CardSection>
      </main>
    </ContentLayout>
  );
}
