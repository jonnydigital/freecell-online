import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import { SectionHeading, CardSection, ContentBody, CtaSection, ContentLinkCard, JsonLd } from '@/components/content';

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
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <CardSection variant="dark">
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
        </CardSection>

        {/* Setup at a Glance */}
        <CardSection id="setup" variant="dark">
            <SectionHeading variant="dark" sub="The Basics" id="setup-heading">Setup at a Glance</SectionHeading>
            <ContentBody variant="dark">
              <p>
                52 cards dealt face-up into 8 cascades (4 columns of 7, 4 columns of 6). Four
                empty free cells for temporary storage. Four foundation piles where you build
                each suit from Ace to King. That is the entire setup. No stock pile, no draw
                pile, no hidden cards.
              </p>
            </ContentBody>
        </CardSection>

        {/* Move Priority Checklist */}
        <CardSection id="priorities" variant="dark">
            <SectionHeading variant="dark" sub="What to Do First" id="priorities-heading">Move Priority Checklist</SectionHeading>
            <ContentBody variant="dark">
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
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* What to Avoid */}
        <CardSection id="avoid" variant="dark">
            <SectionHeading variant="dark" sub="Common Traps" id="avoid-heading">What to Avoid</SectionHeading>
            <ContentBody variant="dark">
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
            </ContentBody>
        </CardSection>

        {/* Keyboard Shortcuts */}
        <CardSection id="shortcuts" variant="dark">
            <SectionHeading variant="dark" sub="Desktop Controls" id="shortcuts-heading">Keyboard Shortcuts</SectionHeading>
            <ContentBody variant="dark">
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
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Supermove Quick Reference */}
        <CardSection id="supermove" variant="dark">
            <SectionHeading variant="dark" sub="The Formula" id="supermove-heading">Supermove Quick Reference</SectionHeading>
            <ContentBody variant="dark">
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
            </ContentBody>
        </CardSection>

        {/* If You're Stuck */}
        <CardSection id="stuck" variant="dark">
            <SectionHeading variant="dark" sub="Recovery" id="stuck-heading">If You Are Stuck</SectionHeading>
            <ContentBody variant="dark">
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
            </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
            <SectionHeading variant="dark" sub="Go Deeper">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/freecell-rules" title="FreeCell Rules" description="Complete rules reference with setup details and legal move explanations." />
              <ContentLinkCard href="/strategy" title="Strategy Guide" description="In-depth strategy from beginner fundamentals to expert endgame techniques." />
              <ContentLinkCard href="/tips" title="Tips &amp; Tricks" description="25 practical tips to win more games, organized by skill level." />
              <ContentLinkCard href="/freecell-mistakes-to-avoid" title="Mistakes to Avoid" description="The most common errors and how to recognize them before they cost you the game." />
              <ContentLinkCard href="/freecell-probability" title="Probability &amp; Math" description="The combinatorics behind FreeCell — why 99.999% of deals are solvable." />
              <ContentLinkCard href="/" title="Play FreeCell" description="Play online for free with undo, hints, and thousands of deals." />
            </ContentBody>
        </CardSection>        <CtaSection
          heading="Put the Cheat Sheet to Work"
          body="Open a game and keep this page in a second tab. Refer back to the move priorities and shortcuts as you play."
          secondaryLabel="Full Strategy Guide"
          secondaryHref="/strategy"
        />
      </main>
    </ContentLayout>
  );
}
