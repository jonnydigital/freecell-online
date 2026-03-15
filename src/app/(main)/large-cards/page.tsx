import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

export const metadata: Metadata = {
  title: 'Large Cards Mode — Bigger, Easier-to-Read Solitaire Cards',
  description:
    'Enable Large Cards mode for bigger, easier-to-read cards in FreeCell, Klondike, and Spider Solitaire. Perfect for seniors, low-vision players, and tablet users.',
  keywords: [
    'large cards freecell',
    'large cards solitaire',
    'big cards freecell',
    'big cards solitaire',
    'freecell large cards mode',
    'solitaire accessibility',
    'bigger solitaire cards',
    'freecell for low vision',
    'easy to read card game',
    'solitaire tablet cards',
  ],
  openGraph: {
    title: 'Large Cards Mode — Bigger, Easier-to-Read Solitaire Cards',
    description:
      'Enable Large Cards mode for bigger, easier-to-read cards in FreeCell, Klondike, and Spider Solitaire. Ideal for seniors and low-vision players.',
    url: absoluteUrl('/large-cards'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
};



export default function LargeCardsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Large Cards Mode — Bigger, Easier-to-Read Solitaire Cards',
      description:
        'How to enable Large Cards mode for bigger, easier-to-read cards in FreeCell, Klondike, and Spider Solitaire. Designed for accessibility and comfort.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-14',
      dateModified: '2026-03-14',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/large-cards'),
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
          name: 'Large Cards Mode',
          item: absoluteUrl('/large-cards'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I make the cards bigger in FreeCell?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Open the Settings panel (gear icon), go to the Accessibility section, and toggle on Large Cards. The cards will immediately increase in size by 30%.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Large Cards mode work in all solitaire games?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Large Cards mode works in FreeCell, Klondike, and Spider Solitaire. The setting applies across all game modes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will Large Cards mode affect my game progress?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Toggling Large Cards on or off does not reset your game. Your cards, moves, and progress remain exactly where they are.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use Large Cards on a phone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but Large Cards is most beneficial on tablets and desktops where there is more screen space. On phones, the cards may overlap more in landscape mode.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Large Cards mode the same as zooming in my browser?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Browser zoom enlarges everything on the page, including buttons and text, and can break the layout. Large Cards mode only increases the card size within the game board, keeping everything else properly sized.',
          },
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <CardSection variant="dark">
            <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 block mb-3">
                Accessibility
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Large Cards Mode
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Struggling to read card values or distinguish suits? Large Cards mode increases the
                size of every card on the board, making ranks and suits clearer and easier to tap.
                Available in FreeCell, Klondike, and Spider Solitaire.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">30%</div>
                  <div className="text-sm text-white/50 mt-1">Larger Cards</div>
                  <p className="text-xs text-white/40 mt-2">Cards scale up by 30% in FreeCell and Klondike, 20% in Spider.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-white/50 mt-1">Game Modes</div>
                  <p className="text-xs text-white/40 mt-2">Works across FreeCell, Klondike, and Spider Solitaire.</p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-white/50 mt-1">Toggle</div>
                  <p className="text-xs text-white/40 mt-2">One setting. Instant effect. No page reload needed.</p>
                </div>
              </div>
            </div>
        </CardSection>

        {/* Why Large Cards Matter */}
        <CardSection id="why-large-cards" variant="dark">
            <SectionHeading variant="dark" sub="Readability" id="why-large-cards-heading">Why Large Cards Matter</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Standard card sizes in digital solitaire games are designed for sharp-eyed players
                on large monitors. But many people play on tablets, older laptops, or smaller screens
                where card values become hard to read. Even on a good screen, distinguishing a 6 from
                an 8 or a club from a spade can strain your eyes after a few games.
              </p>
              <p>
                Large Cards mode solves this by scaling every card up within the game board. The ranks
                and suit symbols become noticeably clearer, reducing eye strain and making the game
                more comfortable to play for extended sessions. You spend less time squinting and more
                time thinking about your next move.
              </p>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Who benefits most</h3>
                <ul className="space-y-3 text-sm leading-7">
                  <li><strong className="text-white">Older adults:</strong> Age-related vision changes make smaller text and symbols harder to read. Larger cards compensate naturally.</li>
                  <li><strong className="text-white">Low-vision players:</strong> Anyone with reduced visual acuity benefits from bigger, bolder card faces.</li>
                  <li><strong className="text-white">Tablet users:</strong> Touch targets are easier to hit when cards are larger, reducing mis-taps.</li>
                  <li><strong className="text-white">Casual players:</strong> If you play to relax, bigger cards simply feel more comfortable and less like work.</li>
                </ul>
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* How to Enable */}
        <CardSection id="how-to-enable" variant="dark">
            <SectionHeading variant="dark" sub="Setup" id="how-to-enable-heading">How to Enable Large Cards</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Turning on Large Cards takes about three seconds. The setting persists across sessions,
                so you only need to do it once.
              </p>
              <div className="space-y-4">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 1: Open Settings</h3>
                  <p className="text-sm leading-7">
                    Click or tap the gear icon in the top-right corner of the game toolbar. This opens
                    the Settings panel.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 2: Find Accessibility</h3>
                  <p className="text-sm leading-7">
                    Scroll down to the Accessibility section. You will see several options for
                    customizing your play experience.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Step 3: Toggle Large Cards</h3>
                  <p className="text-sm leading-7">
                    Flip the Large Cards toggle to on. The cards on your board will immediately
                    resize &mdash; no need to start a new game or refresh the page. Your current game
                    state is preserved.
                  </p>
                </div>
              </div>
            </ContentBody>
        </CardSection>

        {/* Across All Game Modes */}
        <CardSection id="all-game-modes" variant="dark">
            <SectionHeading variant="dark" sub="Universal" id="all-game-modes-heading">Works Across All Game Modes</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <p>
                Large Cards is not limited to a single game. The setting applies to every solitaire
                variant available on {siteConfig.siteName}.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">FreeCell</h3>
                  <p className="text-sm leading-7">
                    Cards scale up by 30%. With 8 columns and 4 free cells, the larger cards
                    remain well-spaced and easy to read.
                  </p>
                </Link>
                <Link href="/klondike" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Klondike</h3>
                  <p className="text-sm leading-7">
                    Cards scale up by 30%. The 7-column layout gives plenty of room for
                    larger cards without crowding.
                  </p>
                </Link>
                <Link href="/spider" className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">Spider</h3>
                  <p className="text-sm leading-7">
                    Cards scale up by 20%. Spider uses 10 columns, so a slightly smaller
                    increase keeps the board readable.
                  </p>
                </Link>
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Benefits by Audience */}
        <CardSection id="benefits" variant="dark">
            <SectionHeading variant="dark" sub="For You" id="benefits-heading">Benefits for Different Players</SectionHeading>
            <ContentBody variant="dark" className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Seniors &amp; Older Adults</h3>
                  <p className="text-sm leading-7">
                    Pair Large Cards with our other{' '}
                    <Link href="/freecell-for-seniors" className="text-[#D4AF37] hover:underline">
                      senior-friendly features
                    </Link>{' '}
                    like unlimited undo, no time pressure, and keyboard shortcuts. The combination
                    creates a comfortable, low-stress card game experience.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Vision-Impaired Players</h3>
                  <p className="text-sm leading-7">
                    Larger card faces mean bolder rank numbers and bigger suit symbols. Combined
                    with high-contrast card styles and theme options, Large Cards mode makes the
                    game accessible to players with reduced visual acuity.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Tablet &amp; Touch Users</h3>
                  <p className="text-sm leading-7">
                    Bigger cards mean bigger touch targets. Dragging and tapping becomes more
                    precise, reducing frustrating mis-taps and accidental moves. Especially helpful
                    on 8- to 10-inch tablets.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">Small-Screen Laptops</h3>
                  <p className="text-sm leading-7">
                    Playing on a 13-inch laptop? Cards can feel tiny at default size. Large Cards
                    mode makes them significantly more readable without needing to zoom your
                    entire browser window.
                  </p>
                </div>
              </div>
            </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
            <SectionHeading variant="dark" sub="Common Questions" id="faq-heading">Frequently Asked Questions</SectionHeading>
            <ContentBody variant="dark" className="space-y-4">
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">How do I make the cards bigger in FreeCell?</h3>
                <p className="text-sm leading-7 text-white/70">
                  Open the Settings panel (gear icon), go to the Accessibility section, and toggle on
                  Large Cards. The cards will immediately increase in size by 30%.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Does Large Cards mode work in all solitaire games?</h3>
                <p className="text-sm leading-7 text-white/70">
                  Yes. Large Cards mode works in FreeCell, Klondike, and Spider Solitaire. The
                  setting applies across all game modes and persists between sessions.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Will Large Cards mode affect my game progress?</h3>
                <p className="text-sm leading-7 text-white/70">
                  No. Toggling Large Cards on or off does not reset your game. Your cards, moves,
                  and progress remain exactly where they are. The board just redraws at the new size.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Can I use Large Cards on a phone?</h3>
                <p className="text-sm leading-7 text-white/70">
                  Yes, but Large Cards is most beneficial on tablets and desktops where there is more
                  screen space. On phones, the larger cards may cause more overlap between columns,
                  especially in landscape mode.
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">Is Large Cards mode the same as zooming in my browser?</h3>
                <p className="text-sm leading-7 text-white/70">
                  No. Browser zoom enlarges everything on the page, including buttons and text, and
                  can break the layout. Large Cards mode only increases the card size within the game
                  board, keeping everything else properly sized and positioned.
                </p>
              </div>
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
            <SectionHeading variant="dark" sub="Keep Reading" id="related-heading">Related Guides</SectionHeading>
            <ContentBody variant="dark">
              <div className="grid gap-4 md:grid-cols-2">
                <ContentLinkCard href="/freecell-for-seniors" title="FreeCell for Seniors" description="Why FreeCell is the ideal brain-training card game for older adults, with tips on getting started." />
                <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" description="A complete tutorial covering the rules, mechanics, and strategies of FreeCell Solitaire." />
                <ContentLinkCard href="/strategy" title="Strategy Guide" description="Advanced techniques for winning more games, from opening moves to endgame play." />
                <ContentLinkCard href="/tips" title="Tips &amp; Tricks" description="Quick, practical advice to improve your game one tip at a time." />
              </div>
            </ContentBody>
        </CardSection>        <CtaSection
          heading="Try Large Cards Now"
          body="Open any game, flip one toggle, and see the difference immediately. No account needed."
          secondaryLabel="Learn the Rules First"
          secondaryHref="/how-to-play"
        />
      </main>
    </ContentLayout>
  );
}
