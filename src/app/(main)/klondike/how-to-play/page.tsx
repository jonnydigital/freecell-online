import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import ContentLayout from '@/components/ContentLayout';
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from '@/components/content';
import AdUnit from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'How to Play Klondike Solitaire | Complete Rules & Setup Guide',
  description:
    'Learn how to play Klondike Solitaire — the classic card game everyone calls "Solitaire." Complete rules, setup instructions, dealing variants, scoring systems, and beginner tips.',
  keywords: [
    'how to play klondike solitaire',
    'klondike solitaire rules',
    'klondike rules',
    'solitaire rules',
    'how to play solitaire',
    'klondike solitaire rules for beginners',
    'how to set up klondike solitaire',
  ],
  alternates: {
    canonical: absoluteUrl('/klondike/how-to-play'),
  },
  openGraph: {
    title: 'How to Play Klondike Solitaire | Complete Rules & Setup Guide',
    description:
      'The definitive guide to Klondike Solitaire — rules, setup, dealing variants, scoring, and tips for beginners.',
    url: absoluteUrl('/klondike/how-to-play'),
    siteName: siteConfig.brandName,
    type: 'article',
  },
};

export default function KlondikeHowToPlayPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Play Klondike Solitaire — Complete Rules & Setup Guide',
    description: 'Learn how to play Klondike Solitaire with complete rules, setup instructions, dealing variants, and beginner tips.',
    author: { '@type': 'Organization', name: siteConfig.brandName },
    publisher: { '@type': 'Organization', name: siteConfig.brandName },
    mainEntityOfPage: absoluteUrl('/klondike/how-to-play'),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Solitaire Types', item: absoluteUrl('/solitaire-types') },
      { '@type': 'ListItem', position: 3, name: 'Klondike: How to Play', item: absoluteUrl('/klondike/how-to-play') },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's the difference between Klondike and Solitaire?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the United States and Canada, "Solitaire" almost always refers to Klondike — they\'re the same game. Klondike is the proper name for the specific card game with 7 tableau columns, a stock pile, and 4 foundation piles. There are actually hundreds of different solitaire card games (FreeCell, Spider, Pyramid, etc.), but Klondike became so dominant that people dropped the specific name.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many cards do you deal in Klondike?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You deal 28 cards across 7 columns. Column 1 gets 1 card, column 2 gets 2 cards, column 3 gets 3, and so on up to column 7 which gets 7 cards. Only the top card of each column is face-up; the rest are face-down. The remaining 24 cards form the stock pile.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you move any card to an empty column in Klondike?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No — only Kings can be moved to empty columns in Klondike. This is one of the most common rules people get wrong. In FreeCell, any card can fill an empty column, but in Klondike, empty columns are reserved exclusively for Kings (and any cards built on top of them).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the odds of winning Klondike?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Win rates vary significantly by variant and skill. With Draw-1 (turning one card at a time from the stock), skilled players win around 40-50% of games, and computer analysis suggests a theoretical maximum around 79-82%. With Draw-3, win rates drop to 10-20% for most players. Vegas scoring with limited passes is even harder. Unlike FreeCell (which is 99.999% solvable), many Klondike deals are genuinely unwinnable regardless of play.',
        },
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <ContentHero
        title="How to Play Klondike Solitaire"
        kicker={<><Link href="/" className="hover:text-white/60 transition-colors">Home</Link>{" "}&rsaquo;{" "}<Link href="/solitaire-types" className="hover:text-white/60 transition-colors">Solitaire Types</Link>{" "}&rsaquo;{" "}Klondike: How to Play</>}
        subtitle={'The classic card game everyone calls "Solitaire." Complete rules, setup, dealing variants, and everything you need to start playing.'}
      />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-white/[0.03] border border-white/10 rounded-xl">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#what-is-klondike" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">What Is Klondike? (And Why You Call It &quot;Solitaire&quot;)</a></li>
            <li><a href="#setup" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Setting Up the Game</a></li>
            <li><a href="#how-to-play" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">How to Play</a></li>
            <li><a href="#dealing-variants" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Dealing Variants: Draw 1 vs. Draw 3</a></li>
            <li><a href="#scoring" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Scoring Systems</a></li>
            <li><a href="#klondike-vs-freecell" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Klondike vs. FreeCell</a></li>
            <li><a href="#tips" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">Tips for Your First Game</a></li>
            <li><a href="#faq" className="text-[#8B6914] hover:text-[#e8c54a] transition-colors">FAQ</a></li>
          </ul>
        </nav>

        {/* What Is Klondike */}
        <section id="what-is-klondike" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Is Klondike? (And Why You Call It &quot;Solitaire&quot;)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            If you&apos;ve ever played &quot;Solitaire&quot; on a computer, you&apos;ve played Klondike. It&apos;s the card game that came pre-installed on every Windows computer since 1990 — the one where you deal seven columns of cards and try to build four piles from Ace to King.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The name &quot;Klondike&quot; likely comes from the Klondike Gold Rush of 1897, when prospectors in the Yukon Territory popularized the game to pass time. But most people never learned the proper name. When Microsoft shipped Windows 3.0 with a solitaire game in 1990, they just called it &quot;Solitaire&quot; — and the name stuck.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            Here&apos;s the thing: &quot;solitaire&quot; actually refers to <em>any</em> card game played alone. There are{' '}
            <Link href="/solitaire-types" className="text-[#8B6914] hover:underline">hundreds of solitaire variants</Link>
            {' '}— <Link href="/how-to-play" className="text-[#8B6914] hover:underline">FreeCell</Link>, <Link href="/spider/how-to-play" className="text-[#8B6914] hover:underline">Spider</Link>, Pyramid, Canfield, and many more. Klondike just became so dominant that people dropped the specific name.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-4">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">Quick Facts</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><span className="text-white/40">Also called:</span> Solitaire (US/Canada), Patience (UK), Canfield (historical)</li>
              <li><span className="text-white/40">Players:</span> 1</li>
              <li><span className="text-white/40">Deck:</span> Standard 52 cards</li>
              <li><span className="text-white/40">Difficulty:</span> Moderate (win rate ~18-50% depending on variant)</li>
              <li><span className="text-white/40">First known rules:</span> 1907 edition of <em>Hoyle&apos;s Games</em></li>
              <li><span className="text-white/40">Windows debut:</span> 1990 (designed by intern Wes Cherry, card backs by Susan Kare)</li>
              <li><span className="text-white/40">Monthly active players (Microsoft):</span> 35 million (as of 2020)</li>
            </ul>
          </div>
        </section>

        <AdUnit className="-my-1" />

        {/* Setting Up the Game */}
        <section id="setup" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Setting Up the Game
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Klondike uses a single standard 52-card deck. No jokers. Shuffle thoroughly, then deal.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">The Tableau: 7 Columns</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Deal seven columns from left to right. The first column gets 1 card, the second gets 2, the third gets 3, and so on — up to 7 cards in the seventh column. This uses 28 cards total.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            <strong className="text-white/90">Critical rule:</strong> Only the top card of each column is face-up. Every card underneath is face-down. You can&apos;t see or use face-down cards until the cards above them are moved.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6 font-mono text-sm text-white/50">
            <div className="text-white/30 text-xs mb-3">TABLEAU LAYOUT (⬜ = face-up, ▪ = face-down)</div>
            <div className="space-y-1">
              <div>Col 1: ⬜</div>
              <div>Col 2: ▪ ⬜</div>
              <div>Col 3: ▪ ▪ ⬜</div>
              <div>Col 4: ▪ ▪ ▪ ⬜</div>
              <div>Col 5: ▪ ▪ ▪ ▪ ⬜</div>
              <div>Col 6: ▪ ▪ ▪ ▪ ▪ ⬜</div>
              <div>Col 7: ▪ ▪ ▪ ▪ ▪ ▪ ⬜</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white/90">The Stock Pile</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            The remaining 24 cards go face-down in a pile called the <strong className="text-white/90">stock</strong> (sometimes called the &quot;draw pile&quot; or &quot;talon&quot;). You&apos;ll draw from this pile during the game when you run out of moves on the tableau.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">The Foundations: 4 Empty Piles</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Above or beside the tableau, designate space for 4 foundation piles — one for each suit (Clubs ♣, Diamonds ♦, Hearts ♥, Spades ♠). These start empty. Your goal is to build each foundation from Ace to King.
          </p>
        </section>

        {/* How to Play */}
        <section id="how-to-play" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            How to Play
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The goal is simple: move all 52 cards to the four foundation piles, building each from Ace up to King by suit. Here&apos;s how the moves work.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Moving Cards on the Tableau</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            On the tableau, you build <strong className="text-white/90">downward in alternating colors</strong>. A black 6 can go on a red 7. A red Queen can go on a black King. Color must alternate, rank must descend by one.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            You can also move entire sequences of properly ordered cards at once. If you have a red 5 → black 4 → red 3 stacked correctly, you can move all three as a group onto a black 6.
          </p>

          <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5 mb-6">
            <h4 className="text-sm font-bold text-emerald-400 mb-2">Example Move</h4>
            <p className="text-white/60 text-sm">
              You have a <span className="text-red-400">♥7</span> at the bottom of column 3. Column 5 has a <span className="text-white">♠8</span> showing. You can move the <span className="text-red-400">♥7</span> onto the <span className="text-white">♠8</span> because red goes on black, and 7 is one less than 8.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Revealing Hidden Cards</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Whenever you move a card off a face-down card, that face-down card flips over. Revealing hidden cards is the key to winning — every face-down card is information you don&apos;t have and can&apos;t use. Good players prioritize moves that expose face-down cards.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Using the Stock Pile</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            When you can&apos;t (or don&apos;t want to) make any more moves on the tableau, draw from the stock pile. In <strong className="text-white/90">Draw 1</strong>, you flip one card at a time. In <strong className="text-white/90">Draw 3</strong>, you flip three cards but can only play the top one. Drawn cards go to a <strong className="text-white/90">waste pile</strong> — if you can&apos;t use the current card, it stays there until you cycle through the stock again.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Building the Foundations</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Move Aces to the foundation as soon as they appear, then build up in suit: A♥ → 2♥ → 3♥ → ... → K♥. Each foundation must be a single suit, built in order. You win when all four foundations are complete (Ace through King).
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Empty Columns: Kings Only</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            When a tableau column becomes empty, <strong className="text-white/90">only a King</strong> (or a sequence starting with a King) can be placed there. This is one of the most commonly confused rules — in{' '}
            <Link href="/how-to-play" className="text-[#8B6914] hover:underline">FreeCell</Link>, any card can fill an empty column. In Klondike, it&apos;s Kings only.
          </p>
        </section>

        <AdUnit className="-my-1" />

        {/* Dealing Variants */}
        <section id="dealing-variants" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Dealing Variants: Draw 1 vs. Draw 3
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The biggest difference in how people play Klondike comes down to how you draw from the stock pile.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">Draw 1 (Turn 1)</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>✅ Flip one card at a time from stock</li>
                <li>✅ See every card in the deck each cycle</li>
                <li>✅ Unlimited passes through the stock</li>
                <li>✅ Win rate: <strong className="text-white/80">~40-50%</strong> for skilled players</li>
                <li>✅ Best for beginners and casual play</li>
              </ul>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-bold text-amber-400 mb-3">Draw 3 (Turn 3)</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>⚡ Flip three cards, only the top one is playable</li>
                <li>⚡ 2/3 of cards are blocked each cycle</li>
                <li>⚡ Typically unlimited passes (some variants limit to 3)</li>
                <li>⚡ Win rate: <strong className="text-white/80">~10-20%</strong> for most players</li>
                <li>⚡ The &quot;traditional&quot; and competitive variant</li>
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            Draw 3 is significantly harder because you can only access every third card in the stock. Strategic sequencing — knowing when <em>not</em> to play a card so you can reach the one behind it — becomes critical.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Vegas Rules</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            The strictest variant. Draw 3, but you can only go through the stock pile <strong className="text-white/90">once</strong> (or sometimes three times). You &quot;buy&quot; the deck for $52 and earn $5 for each card placed on the foundations. If you clear all 52 cards, you profit $208. This is the variant you&apos;d find in actual casinos.
          </p>
        </section>

        {/* Scoring */}
        <section id="scoring" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Scoring Systems
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Standard Scoring (Windows-style)</h3>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">Action</th>
                  <th className="text-right px-5 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5">Move card to foundation</td>
                  <td className="px-5 py-2.5 text-right font-mono text-emerald-400">+10</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5">Move card from waste to tableau</td>
                  <td className="px-5 py-2.5 text-right font-mono text-emerald-400">+5</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5">Turn over a face-down tableau card</td>
                  <td className="px-5 py-2.5 text-right font-mono text-emerald-400">+5</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5">Move card from foundation back to tableau</td>
                  <td className="px-5 py-2.5 text-right font-mono text-red-400">−15</td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5">Recycle waste pile (Draw 3 only)</td>
                  <td className="px-5 py-2.5 text-right font-mono text-red-400">−20</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-white/90">Vegas Scoring</h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Start at −$52 (your &quot;buy-in&quot;). Earn $5 per card placed on a foundation. Maximum payout: $208 profit (all 52 cards × $5 = $260, minus the $52 buy-in). In practice, most games result in a net loss — just like real Vegas.
          </p>
        </section>

        <AdUnit className="-my-1" />

        {/* Klondike vs FreeCell */}
        <section id="klondike-vs-freecell" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Klondike vs. FreeCell: Key Differences
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Both games build foundations from Ace to King, but they play very differently.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">Feature</th>
                  <th className="text-left px-5 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">Klondike</th>
                  <th className="text-left px-5 py-3 text-white/40 font-bold uppercase text-xs tracking-wider">FreeCell</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Hidden cards</td>
                  <td className="px-5 py-2.5">Yes (21 face-down)</td>
                  <td className="px-5 py-2.5">None (all face-up)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Stock pile</td>
                  <td className="px-5 py-2.5">Yes (24 cards)</td>
                  <td className="px-5 py-2.5">No</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Temporary storage</td>
                  <td className="px-5 py-2.5">None</td>
                  <td className="px-5 py-2.5">4 free cells</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Tableau stacking</td>
                  <td className="px-5 py-2.5">Alternating colors</td>
                  <td className="px-5 py-2.5">Alternating colors</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Empty columns</td>
                  <td className="px-5 py-2.5">Kings only</td>
                  <td className="px-5 py-2.5">Any card</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-5 py-2.5 text-white/80">Win rate</td>
                  <td className="px-5 py-2.5">18-50%</td>
                  <td className="px-5 py-2.5">~82% (99.999% solvable)</td>
                </tr>
                <tr>
                  <td className="px-5 py-2.5 text-white/80">Luck vs. skill</td>
                  <td className="px-5 py-2.5">~50/50</td>
                  <td className="px-5 py-2.5">~90% skill</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            The biggest difference: <strong className="text-white/90">information</strong>. In FreeCell, every card is visible from the start — it&apos;s a pure strategy game. In Klondike, 21 cards are hidden, so luck plays a much larger role. No matter how well you play, some Klondike deals are simply unwinnable.
          </p>
          <p className="text-white/70 leading-relaxed">
            If you enjoy Klondike but want a game where skill matters more, give{' '}
            <Link href="/" className="text-[#8B6914] hover:underline">FreeCell</Link> a try.
            For a deeper comparison, see our{' '}
            <Link href="/freecell-vs-klondike" className="text-[#8B6914] hover:underline">FreeCell vs. Klondike</Link> guide.
          </p>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Tips for Your First Game
          </h2>
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">1. Always play Aces and Twos to foundations immediately</h3>
              <p className="text-sm text-white/60">
                There&apos;s never a reason to hold an Ace or a Two on the tableau. Move them up right away.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">2. Prioritize revealing face-down cards</h3>
              <p className="text-sm text-white/60">
                When choosing between two valid moves, prefer the one that flips over a face-down card. More information = better decisions.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">3. Don&apos;t empty a column without a King ready</h3>
              <p className="text-sm text-white/60">
                Only Kings can fill empty columns. If you clear a column without a King to place there, you&apos;ve just wasted valuable space.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">4. Start with Draw 1</h3>
              <p className="text-sm text-white/60">
                Draw 3 is significantly harder. Learn the game with Draw 1 first, where you can see every card in the stock each cycle.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-400 mb-2">5. Target the longest face-down columns</h3>
              <p className="text-sm text-white/60">
                Columns 6 and 7 have the most hidden cards. Focus early efforts on uncovering those columns — they hold the most information and free up the most options.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                What&apos;s the difference between Klondike and Solitaire?
              </h3>
              <p className="text-white/60 leading-relaxed">
                They&apos;re the same game. In the US and Canada, &quot;Solitaire&quot; almost always means Klondike — the specific game with 7 tableau columns, a stock pile, and 4 foundations. &quot;Solitaire&quot; technically refers to any single-player card game (there are hundreds), but Klondike became so popular that people use the names interchangeably.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                How many cards do you deal in Klondike?
              </h3>
              <p className="text-white/60 leading-relaxed">
                28 cards across 7 columns (1+2+3+4+5+6+7 = 28). Only the top card of each column is face-up. The remaining 24 cards form the stock pile.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                Can you move any card to an empty column in Klondike?
              </h3>
              <p className="text-white/60 leading-relaxed">
                No — <strong className="text-white/80">only Kings</strong> can fill empty columns. This is one of the biggest rule differences between Klondike and{' '}
                <Link href="/how-to-play" className="text-[#8B6914] hover:underline">FreeCell</Link>,
                {' '}where any card can go in an empty column.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white/90 mb-2">
                What are the odds of winning Klondike?
              </h3>
              <p className="text-white/60 leading-relaxed">
                It depends on the variant. With Draw 1 and unlimited passes, skilled players win around 40-50% of games (computer analysis suggests a theoretical ceiling around 79-82%). Draw 3 drops to 10-20%. Vegas rules (single pass) can be as low as 5-10%. For comparison,{' '}
                <Link href="/statistics" className="text-[#8B6914] hover:underline">FreeCell is 99.999% solvable</Link>
                {' '}— almost every deal can be won with perfect play.
              </p>
            </div>
          </div>
        </section>

        <CtaSection
          heading="Ready to Improve?"
          body="Now that you know the rules, learn the 7 strategies that separate consistent winners from casual players."
          primaryLabel="Read the Klondike Strategy Guide"
          primaryHref="/klondike/strategy"
        />

        {/* Related Pages */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white/40" style={{ fontFamily: 'var(--font-playfair)' }}>
            Related Guides
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ContentLinkCard href="/klondike" title="Play Klondike Solitaire" />
            <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" />
            <ContentLinkCard href="/klondike/faq" title="Klondike FAQ" />
            <ContentLinkCard href="/freecell-vs-klondike" title="FreeCell vs. Klondike" />
            <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" />
            <ContentLinkCard href="/spider/how-to-play" title="How to Play Spider" />
            <ContentLinkCard href="/solitaire-types" title="Solitaire Types" />
            <ContentLinkCard href="/klondike/tips" title="Klondike Tips & Tricks" />
            <ContentLinkCard href="/klondike/winning-strategies" title="Klondike Winning Strategies" />
            <ContentLinkCard href="/strategy" title="FreeCell Strategy" />
            <ContentLinkCard href="/" title="Play FreeCell Online" />
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
