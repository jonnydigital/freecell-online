import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';

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

const CARD = 'rounded-xl bg-white/[0.04] border border-white/[0.07] overflow-hidden';

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
    <div className="px-8 sm:px-10 md:px-12 pt-6 sm:pt-8 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-white scroll-mt-6"
      >
        {children}
      </h2>
      <div className="mt-4 h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
    </div>
  );
}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <section>
          <div className={CARD}>
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
          </div>
        </section>

        {/* Why Large Cards Matter */}
        <section id="why-large-cards" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Readability" id="why-large-cards-heading">Why Large Cards Matter</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
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
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* How to Enable */}
        <section id="how-to-enable" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Setup" id="how-to-enable-heading">How to Enable Large Cards</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
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
            </div>
          </div>
        </section>

        {/* Across All Game Modes */}
        <section id="all-game-modes" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Universal" id="all-game-modes-heading">Works Across All Game Modes</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
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
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Benefits by Audience */}
        <section id="benefits" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="For You" id="benefits-heading">Benefits for Different Players</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-5 text-white/70 leading-8">
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
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Common Questions" id="faq-heading">Frequently Asked Questions</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 space-y-4">
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
            </div>
          </div>
        </section>

        <AdUnit className="my-4" />

        {/* Related Pages */}
        <section id="related" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Keep Reading" id="related-heading">Related Guides</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/freecell-for-seniors" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">FreeCell for Seniors</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Why FreeCell is the ideal brain-training card game for older adults, with tips on getting started.
                  </p>
                </Link>
                <Link href="/how-to-play" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">How to Play FreeCell</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    A complete tutorial covering the rules, mechanics, and strategies of FreeCell Solitaire.
                  </p>
                </Link>
                <Link href="/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Strategy Guide</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Advanced techniques for winning more games, from opening moves to endgame play.
                  </p>
                </Link>
                <Link href="/tips" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                  <h3 className="text-lg font-semibold text-white">Tips &amp; Tricks</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Quick, practical advice to improve your game one tip at a time.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div
            className={CARD}
            style={{
              background: 'linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)',
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                Try Large Cards Now
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                Open any game, flip one toggle, and see the difference immediately. No account needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)',
                    backgroundSize: '200% 100%',
                    color: '#1a1a0a',
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Learn the Rules First
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
