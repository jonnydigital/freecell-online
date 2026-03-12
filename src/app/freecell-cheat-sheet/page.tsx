import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '../../components/AdUnit';
import ContentLayout from '../../components/ContentLayout';

export const metadata: Metadata = {
  title: 'FreeCell Cheat Sheet — Quick Rules & Move Priorities',
  description:
    'FreeCell cheat sheet: move priority checklist, what to avoid, keyboard shortcuts, and quick recovery tips. Print it, bookmark it, win more games.',
  keywords: [
    'freecell cheat sheet',
    'freecell quick reference',
    'freecell move priority',
    'freecell keyboard shortcuts',
    'freecell tips quick',
    'freecell what to avoid',
    'freecell strategy cheat sheet',
    'freecell shortcuts',
  ],
  openGraph: {
    title: 'FreeCell Cheat Sheet — Quick Rules & Move Priorities',
    description:
      'Skimmable FreeCell reference: move priorities, common mistakes to avoid, keyboard shortcuts, and a stuck-game checklist.',
    url: absoluteUrl('/freecell-cheat-sheet'),
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

export default function FreecellCheatSheetPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Cheat Sheet — Quick Rules & Move Priorities',
      description:
        'A skimmable quick reference for FreeCell Solitaire: move priorities, mistakes to avoid, keyboard shortcuts, and a stuck-game recovery checklist.',
      author: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: '2026-03-12',
      dateModified: '2026-03-12',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl('/freecell-cheat-sheet'),
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
          name: 'FreeCell Cheat Sheet',
          item: absoluteUrl('/freecell-cheat-sheet'),
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
                Quick Reference
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                FreeCell Cheat Sheet
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/70 max-w-3xl">
                Move priorities, traps to avoid, keyboard shortcuts, and a rescue checklist
                &mdash; everything you need at a glance. Bookmark this page and check it
                mid-game.
              </p>
            </div>
          </div>
        </section>

        {/* Setup at a Glance */}
        <section id="setup" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="The Basics" id="setup-heading">Setup at a Glance</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 text-white/70 leading-8">
              <p>
                52 cards dealt face-up into 8 cascades (4 columns of 7, 4 columns of 6). Four
                empty free cells for temporary storage. Four foundation piles where you build
                each suit from Ace to King. That is the entire setup. No stock pile, no draw
                pile, no hidden cards.
              </p>
            </div>
          </div>
        </section>

        {/* Move Priority Checklist */}
        <section id="priorities" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="What to Do First" id="priorities-heading">Move Priority Checklist</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="space-y-3">
                {[
                  {
                    num: 1,
                    text: 'Move Aces and Twos to foundations immediately.',
                    detail: 'They cannot help you in the tableau. Get them out of the way.',
                  },
                  {
                    num: 2,
                    text: 'Uncover buried low cards (3s, 4s, 5s).',
                    detail: 'Foundations stall when low cards are trapped. Freeing them unblocks everything above.',
                  },
                  {
                    num: 3,
                    text: 'Build long descending runs in alternating colors.',
                    detail: 'Consolidating cards into ordered sequences reduces clutter and frees space.',
                  },
                  {
                    num: 4,
                    text: 'Keep free cells empty as long as possible.',
                    detail: 'Every occupied free cell reduces your supermove capacity. Use them as temporary parking only.',
                  },
                  {
                    num: 5,
                    text: 'Create empty cascades — they are more valuable than free cells.',
                    detail: 'An empty cascade doubles your supermove capacity; a free cell only adds one.',
                  },
                  {
                    num: 6,
                    text: 'Plan 3-4 moves ahead before committing.',
                    detail: 'Ask: "What does this move enable?" If the answer is nothing, reconsider.',
                  },
                ].map((item) => (
                  <div key={item.num} className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5 flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                      {item.num}
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.text}</p>
                      <p className="text-white/50 text-sm mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-0" />

        {/* What to Avoid */}
        <section id="avoid" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Common Traps" id="avoid-heading">What to Avoid</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="space-y-3">
                {[
                  {
                    text: 'Filling all free cells in the first 15 moves.',
                    why: 'You lose almost all supermove capacity and can only move one card at a time.',
                  },
                  {
                    text: 'Moving Kings to empty cascades without a plan.',
                    why: 'A King in an empty cascade is semi-permanent. Only Queens can go on top. Make sure it is the right King for the sequences you are building.',
                  },
                  {
                    text: 'Auto-moving high cards to foundations too early.',
                    why: 'A 6 on the foundation cannot help you sequence a 5 in the tableau. Only move cards to foundations when both opposite-color cards of one rank lower are already home.',
                  },
                  {
                    text: 'Ignoring buried Aces while building pretty sequences.',
                    why: 'Aces must reach the foundation before anything else can follow. A buried Ace is the highest-priority problem on the board.',
                  },
                  {
                    text: 'Building long sequences you cannot move.',
                    why: 'Calculate your supermove capacity first: (1 + free cells) \u00d7 2^(empty cascades). If you cannot move the sequence when you need to, do not build it.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.05] border border-red-500/10 rounded-xl p-5 flex gap-4">
                    <span className="text-red-400 font-black text-lg shrink-0 mt-0.5">{'\u2717'}</span>
                    <div>
                      <p className="text-white font-medium">{item.text}</p>
                      <p className="text-white/50 text-sm mt-1">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section id="shortcuts" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Desktop Controls" id="shortcuts-heading">Keyboard Shortcuts</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Key</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: '1 - 8', action: 'Select cascade column 1 through 8' },
                      { key: 'A / S / D / F', action: 'Select free cell 1 through 4' },
                      { key: 'Q / W / E / R', action: 'Move card to foundation 1 through 4' },
                      { key: 'Space or Enter', action: 'Auto-move selected card to best target' },
                      { key: 'Z', action: 'Undo last move' },
                      { key: 'Y', action: 'Redo last undone move' },
                      { key: 'H', action: 'Show hint' },
                      { key: 'N', action: 'Start new game' },
                      { key: 'Escape', action: 'Deselect current card' },
                      { key: '?', action: 'Show keyboard shortcuts guide' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2.5 px-4">
                          <code className="bg-white/[0.08] px-2 py-0.5 rounded text-[#D4AF37] text-xs font-mono">
                            {row.key}
                          </code>
                        </td>
                        <td className="py-2.5 px-4 text-white/70">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-0" />

        {/* Supermove Quick Reference */}
        <section id="supermove" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="The Formula" id="supermove-heading">Supermove Quick Reference</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="bg-[#072907] rounded-xl p-6 text-center mb-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/75 mb-3">
                  Max cards you can move at once
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">
                  (1 + empty free cells) &times; 2<sup>empty cascades</sup>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Free Cells</th>
                      <th className="py-3 px-4 font-semibold text-white/80">0 empty cols</th>
                      <th className="py-3 px-4 font-semibold text-white/80">1 empty col</th>
                      <th className="py-3 px-4 font-semibold text-white/80">2 empty cols</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70 font-medium">4 free</td>
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">20</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70 font-medium">3 free</td>
                      <td className="py-2 px-4">4</td>
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">16</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70 font-medium">2 free</td>
                      <td className="py-2 px-4">3</td>
                      <td className="py-2 px-4">6</td>
                      <td className="py-2 px-4">12</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70 font-medium">1 free</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">4</td>
                      <td className="py-2 px-4">8</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 text-white/70 font-medium">0 free</td>
                      <td className="py-2 px-4">1</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* If You're Stuck */}
        <section id="stuck" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Recovery" id="stuck-heading">If You Are Stuck</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6">
              <div className="space-y-3">
                {[
                  'Press H for a hint. The game may see a move you overlooked.',
                  'Check every free cell. Can any of those cards go to a foundation or a cascade?',
                  'Look for free cells you can empty. A card that has a valid cascade target is wasting space in a free cell.',
                  'Count your empty spaces and calculate your supermove capacity. You may be able to move a bigger sequence than you think.',
                  'Undo back to the point where the board had more room. Try a completely different approach from that position.',
                  'If you are stuck with all free cells filled, focus exclusively on moving one card out of a free cell. Any card. Even an imperfect move that frees a cell can reopen the board.',
                  'Consider whether restarting the same deal (not a new deal) with a different opening line might work better.',
                ].map((tip, i) => (
                  <div key={i} className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-4 flex gap-3">
                    <span className="text-green-400 font-bold shrink-0 mt-0.5">{'\u2713'}</span>
                    <p className="text-white/70 text-sm leading-7">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-0" />

        {/* Related Pages */}
        <section id="related" className="scroll-mt-6">
          <div className={CARD}>
            <SectionHeading sub="Go Deeper">Related Guides</SectionHeading>
            <div className="px-8 sm:px-10 md:px-12 py-6 grid gap-4 md:grid-cols-3">
              <Link href="/freecell-rules" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">FreeCell Rules</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Complete rules reference with setup details and legal move explanations.
                </p>
              </Link>
              <Link href="/strategy" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Strategy Guide</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  In-depth strategy from beginner fundamentals to expert endgame techniques.
                </p>
              </Link>
              <Link href="/tips" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Tips &amp; Tricks</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  25 practical tips to win more games, organized by skill level.
                </p>
              </Link>
              <Link href="/freecell-mistakes-to-avoid" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Mistakes to Avoid</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  The most common errors and how to recognize them before they cost you the game.
                </p>
              </Link>
              <Link href="/" className="rounded-xl border border-white/[0.07] p-5 hover:border-[#D4AF37]/50 transition-colors">
                <h3 className="text-lg font-semibold text-white">Play FreeCell</h3>
                <p className="mt-2 text-sm leading-7 text-white/70">
                  Play online for free with undo, hints, and thousands of deals.
                </p>
              </Link>
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
                Put the Cheat Sheet to Work
              </h2>
              <p className="text-white/40 mb-6 max-w-2xl mx-auto">
                Open a game and keep this page in a second tab. Refer back to the move
                priorities and shortcuts as you play.
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
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Full Strategy Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
