'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { WIN_RATES } from '@/lib/winRateData';
import { featuredGames, faqItems } from '@/lib/hubContent';
import GameErrorBoundary from './GameErrorBoundary';
import StaticBoardPlaceholder from './StaticBoardPlaceholder';
import AuthorByline from './content/AuthorByline';
import AuthorBio from './content/AuthorBio';

const DomGameShell = dynamic(() => import('./dom-freecell/DomGameShell'), {
  ssr: false,
  loading: () => <StaticBoardPlaceholder />,
});

export default function SolitaireHubHome() {
  useEffect(() => {
    // Override global overflow:hidden so the page can scroll past the game
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <>
      {/* Game above the fold */}
      <div className="h-dvh relative" data-scroll-role="hub-game-viewport">
        <GameErrorBoundary>
          <DomGameShell />
        </GameErrorBoundary>
      </div>

      {/* SEO content below the fold */}
      <div className="felt-bg relative z-10" data-scroll-role="hub-below-fold-content">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* ── Intro + personal story ── */}
          <h1
            className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Play Solitaire Online for Free
          </h1>
          <div className="mx-auto mt-6 flex max-w-3xl justify-center">
            <AuthorByline
              authorSlug="editorial-team"
              publishedDate="2026-04-05"
              updatedDate="2026-04-05"
            />
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-7 text-white/70">
            <p>
              Solitaire Stack is a growing collection of free solitaire card games you can play
              right in your browser. Start with FreeCell above — every card is visible from the
              first deal, so every game is a fair puzzle you can solve with the right moves.
            </p>
            <p>
              We built this because the best solitaire sites are either buried in ads or stuck in
              2005. Solitaire Stack is fast, clean, and works on any device. All your stats, streaks,
              and achievements save automatically in your browser — no account required.
            </p>
            <p>
              Beyond FreeCell, you can play <Link href="/spider" className="text-[#d4af37] hover:text-[#f5df97]">Spider Solitaire</Link> in
              three difficulty levels, <Link href="/bakers-game" className="text-[#d4af37] hover:text-[#f5df97]">Baker&apos;s Game</Link> for
              a stricter challenge, and <Link href="/eight-off" className="text-[#d4af37] hover:text-[#f5df97]">Eight Off</Link> for
              a different tactical feel. More games are on the way.
            </p>
            <p>
              Whether you&apos;re killing five minutes or chasing a personal best, there&apos;s
              something here for you. All{' '}
              <Link href="/solitaire-types" className="text-[#d4af37] hover:text-[#f5df97]">28 solitaire variants</Link>{' '}
              are documented in our catalog, with new playable games and{' '}
              <Link href="/strategy" className="text-[#d4af37] hover:text-[#f5df97]">strategy guides</Link>{' '}
              shipping regularly.
            </p>
          </div>

          {/* ── Section 1: What Solitaire Stack Is ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              What {siteConfig.brandName} Is
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
              <p>
                {siteConfig.brandName} is not a FreeCell clone and it is not another
                Klondike-focused site with a reskinned engine. It is the place where the
                solitaire tradition actually lives under one roof. We publish 28 distinct
                variants — cascade games, discard games, patience games, two-deck
                games, and the oddball specialists — and we give each one the same
                editorial depth: researched win rates, canonical rules, honest difficulty
                ratings, and strategy that has been tested at the table. You can think of
                the site as a reference library that happens to be playable.
              </p>
              <p>
                What we do differently comes down to four decisions. First, we publish
                deeper supporting content per game than anyone else on the open web
                — how-to pages with illustrated boards, strategy guides with
                worked examples, and history pieces sourced from Parlett and the old
                Hoyles. Second, we put researched win rates next to every variant, show
                the methodology, and mark estimates as estimates. Third, every article
                carries an editorial byline from one of our five desks (Strategy,
                History, Rules, Research, or the Editorial Team) so you know who wrote
                it and what they are accountable for. Fourth, we do not run ads during
                gameplay. Ads go below the fold, outside the play surface, and never
                interrupt a deal in progress.
              </p>
              <p>
                Who is this for? Players who want variety beyond the three games
                Microsoft shipped. Players deciding which variant fits their mood
                tonight. Writers, researchers, and classroom teachers who need reliable
                rules and statistics. Families who want something safe, fast, and ad-lite
                to hand to a grandparent or a kid. If any of that sounds like you, our{' '}
                <Link href="/about" className="text-[#d4af37] hover:text-[#f5df97]">
                  about page
                </Link>{' '}
                explains the broader project, and the{' '}
                <Link href="/authors" className="text-[#d4af37] hover:text-[#f5df97]">
                  authors page
                </Link>{' '}
                introduces the desks that actually write the content you read here.
              </p>
            </div>
          </section>

          {/* ── Section 2: 28 Games Under One Roof ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              28 Solitaire Games Under One Roof
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
              <p>
                Solitaire is not a single game. It is a family with at least four distinct
                branches: the cascade tradition (FreeCell, Klondike, Yukon), the packer
                tradition (Spider, Scorpion), the discard tradition (Pyramid, TriPeaks,
                Golf), and the patience tradition of matching and pairing (Gaps, Accordion,
                Clock). Below is a curated taxonomy of the variants we cover most deeply,
                with researched win rates drawn from our Research Desk and published
                sources.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03]">
              <table className="w-full min-w-[640px] text-left text-sm text-white/75">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-[#d4af37]/80">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Game</th>
                    <th className="px-4 py-3 font-semibold">Family</th>
                    <th className="px-4 py-3 font-semibold">Difficulty</th>
                    <th className="px-4 py-3 font-semibold">Win Rate</th>
                    <th className="px-4 py-3 font-semibold">Skill / Luck</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { href: '/freecell', name: 'FreeCell', family: 'Cascade', diff: 'Moderate', rateKey: 'freecell', lean: 'Pure skill' },
                    { href: '/klondike', name: 'Klondike (Draw 1)', family: 'Cascade', diff: 'Moderate', rateKey: 'klondike-draw-1', lean: 'Skill + luck' },
                    { href: '/klondike', name: 'Klondike (Draw 3)', family: 'Cascade', diff: 'Hard', rateKey: 'klondike-draw-3', lean: 'Skill + luck' },
                    { href: '/spider', name: 'Spider (1 suit)', family: 'Packer', diff: 'Easy', rateKey: 'spider-1-suit', lean: 'Mostly skill' },
                    { href: '/spider', name: 'Spider (2 suit)', family: 'Packer', diff: 'Moderate', rateKey: 'spider-2-suit', lean: 'Skill lean' },
                    { href: '/spider', name: 'Spider (4 suit)', family: 'Packer', diff: 'Very hard', rateKey: 'spider-4-suit', lean: 'Skill + luck' },
                    { href: '/yukon', name: 'Yukon', family: 'Cascade', diff: 'Moderate', rateKey: 'yukon', lean: 'Pure skill' },
                    { href: '/pyramid', name: 'Pyramid', family: 'Discard', diff: 'Very hard', rateKey: 'pyramid', lean: 'Luck heavy' },
                    { href: '/tripeaks', name: 'TriPeaks', family: 'Discard', diff: 'Moderate', rateKey: 'tripeaks', lean: 'Pattern recognition' },
                    { href: '/golf', name: 'Golf', family: 'Discard', diff: 'Hard', rateKey: 'golf', lean: 'Luck heavy' },
                    { href: '/forty-thieves', name: 'Forty Thieves', family: 'Two-deck', diff: 'Very hard', rateKey: 'forty-thieves', lean: 'Skill + luck' },
                    { href: '/canfield', name: 'Canfield', family: 'Cascade', diff: 'Moderate', rateKey: 'canfield', lean: 'Luck lean' },
                    { href: '/bakers-game', name: "Baker's Game", family: 'Cascade', diff: 'Hard', rateKey: 'bakers-game', lean: 'Pure skill' },
                    { href: '/eight-off', name: 'Eight Off', family: 'Cascade', diff: 'Easy', rateKey: 'eight-off', lean: 'Pure skill' },
                    { href: '/seahaven', name: 'Seahaven Towers', family: 'Cascade', diff: 'Moderate', rateKey: 'seahaven', lean: 'Pure skill' },
                  ].map((row) => {
                    const entry = WIN_RATES[row.rateKey];
                    const rate = entry ? `${entry.winRatePercent}%` : '—';
                    return (
                      <tr key={row.name} className="hover:bg-white/[0.04]">
                        <td className="px-4 py-3 font-medium">
                          <Link href={row.href} className="text-[#d4af37] hover:text-[#f5df97]">
                            {row.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-white/60">{row.family}</td>
                        <td className="px-4 py-3 text-white/60">{row.diff}</td>
                        <td className="px-4 py-3 tabular-nums text-white/75">{rate}</td>
                        <td className="px-4 py-3 text-white/60">{row.lean}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-white/55">
              The full directory of all 28 games lives on our{' '}
              <Link href="/games" className="text-[#d4af37] hover:text-[#f5df97]">
                games index
              </Link>
              . Win rates reflect optimal play with unlimited undo where applicable;
              human win rates sit well below the theoretical ceiling for all but the
              easiest variants.
            </p>
          </section>

          {/* ── Section 3: How to Choose Your Solitaire Game ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Choose Your Solitaire Game
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
              <p>
                The most common message we get is some variation of: &quot;I don&apos;t
                know which one to play.&quot; Twenty-eight variants is a lot, and the
                standard answer — &quot;just try a few&quot; — is
                unsatisfying if you have twenty minutes and want to spend them playing,
                not browsing. So here is a decision guide organized around what you
                actually want out of the next hour.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  label: 'I want a pure logic puzzle',
                  pick: 'FreeCell',
                  href: '/freecell',
                  why: `All 52 cards are visible from the opening deal, so there is no hidden information and no luck in the outcome. Around 99.9987% of random deals are solvable with optimal play, which means if you lose, you lost the puzzle, not the deal. FreeCell is the closest solitaire gets to chess: every move is a decision you own.`,
                },
                {
                  label: 'I want the classic',
                  pick: 'Klondike (Draw 1)',
                  href: '/klondike',
                  why: `This is the game most English speakers actually mean when they say &quot;Solitaire.&quot; Seven columns, three face-down rows, a stock you flip one card at a time. It shipped with Windows 3.0 in 1990, which is the single largest reason billions of people recognize a tableau on sight. Start here if you want the canonical experience.`,
                },
                {
                  label: 'I want something relaxing for a short break',
                  pick: 'TriPeaks or Golf',
                  href: '/tripeaks',
                  why: `Discard-family games play fast — typically five to ten minutes per deal — and the decision load is low. You clear cards one at a time from a layout by matching values one above or below the waste card. TriPeaks is the friendlier of the two; Golf is stricter. Either works as a meditative palette cleanser between harder games.`,
                },
                {
                  label: 'I want a real challenge',
                  pick: '4-suit Spider or Forty Thieves',
                  href: '/spider',
                  why: `Both games punish impatience. Spider 4-suit asks you to build complete 13-card runs in matching suits across ten crowded columns; Forty Thieves deals two decks into a strict same-suit tableau and gives you almost no slack. Expected human win rates sit in the 10-25% band even for strong players. Bring coffee.`,
                },
                {
                  label: 'I want to finish quickly but feel skilled',
                  pick: 'Yukon or Canfield',
                  href: '/yukon',
                  why: `Yukon deals all cards face-up like FreeCell but without free cells, which forces you to think in terms of long movable groups rather than individual cards. Canfield is faster — a 13-card reserve, a tight tableau, and constant stock cycling. Both reward decisive play, and both fit comfortably into a fifteen-minute window.`,
                },
                {
                  label: 'I want something exotic and brain-stretching',
                  pick: 'La Belle Lucie or Pyramid',
                  href: '/la-belle-lucie',
                  why: `La Belle Lucie spreads the deck into eighteen three-card fans and asks you to build foundations from the scraps. Pyramid is a matching puzzle where every King is free but everything else is a careful extraction problem. Neither game resembles the Microsoft canon; both reward players who enjoy lateral thinking more than raw sequencing.`,
                },
              ].map((archetype) => (
                <div
                  key={archetype.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]/80">
                    {archetype.label}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    Play{' '}
                    <Link href={archetype.href} className="text-[#d4af37] hover:text-[#f5df97]">
                      {archetype.pick}
                    </Link>
                  </div>
                  <p
                    className="mt-2 text-sm leading-6 text-white/65"
                    dangerouslySetInnerHTML={{ __html: archetype.why }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Section 4: The Solitaire Family Tree ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Solitaire Family Tree
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
              <p>
                Solitaire is roughly 250 years old, give or take a decade. The earliest
                documented patience games appeared in late-eighteenth-century northern
                Europe, most likely in Germany or Scandinavia, where they circulated in
                hand-copied rulebooks before the first printed collections arrived. The
                German term &quot;Patience-Spiele&quot; — patience games
                — is the oldest label we have, and the tradition traveled from
                there into France, England, and Russia during the early nineteenth
                century. By the time Lady Adelaide Cadogan published her Illustrated
                Games of Patience in the 1870s, dozens of variants already had settled
                names and stable rules.
              </p>
              <p>
                One persistent story deserves careful handling: the claim that Napoleon
                invented or popularized patience while exiled on St. Helena. David
                Parlett, whose Oxford Guide to Card Games remains the most careful
                secondary source in English, treats this as legend. There is no
                contemporary evidence Napoleon designed a game, and the variants
                sometimes attributed to him (Napoleon at St. Helena, St. Helena, and
                others) are almost certainly nineteenth-century inventions named for
                his memory rather than his hand. Some patience games do have French
                names and likely French origins, but Bonaparte himself is a marketing
                embellishment.
              </p>
              <p>
                The real fork in the family tree came with Klondike, which took its
                name from the Yukon gold rush of the 1890s. The game existed before the
                rush under other names, but the new label stuck, traveled back to the
                eastern United States, and — crucially — became the
                default version of solitaire people taught their children. By the
                mid-twentieth century, &quot;Solitaire&quot; meant Klondike in most
                English-speaking homes.
              </p>
              <p>
                FreeCell belongs to a different lineage. The game traces back to Paul
                Alfille, who implemented it on the PLATO computing system at the
                University of Illinois around 1978. Alfille was building on older
                patience variants (most notably Eight Off and Baker&apos;s Game), but
                his decision to expose all 52 cards and allow four free cells created a
                new kind of puzzle. The Microsoft Entertainment Pack shipped a FreeCell
                client in 1991, and Windows 95 bundled it. That single distribution
                decision pushed FreeCell from a university curiosity to a
                hundred-million-player game inside a decade.
              </p>
              <p>
                Spider is older than FreeCell and more argued over. Parlett flags
                multiple competing origin stories, none conclusive, and the game
                existed in print collections by the mid-twentieth century. Windows ME
                shipped Microsoft Spider in 2000, which did for Spider what the
                Entertainment Pack did for FreeCell. Spider has since branched into
                Scorpion (looser movement rules) and Wasp (shorter deal), and the
                three-suit-count variants (1, 2, 4) are a Microsoft-era innovation that
                became canonical.
              </p>
              <p>
                The discard family — Pyramid, TriPeaks, Golf — sits
                on a different branch entirely. These games do not build sequences;
                they extract cards from a fixed layout by matching values. They play
                faster, reward pattern recognition over planning, and have their own
                regional traditions (Pyramid in Europe, TriPeaks and Golf in the
                twentieth-century American tradition).
              </p>
              <p>
                Why does variety matter? Because each branch tests a different skill.
                Cascade games train sequencing and long-horizon planning. Packer games
                train suit management under pressure. Discard games train pattern
                recognition and probabilistic thinking. Patience games train memory
                and risk assessment. A player who only knows Klondike has touched one
                branch of a much larger tree — and the other branches are
                where the interesting puzzles live.
              </p>
            </div>
          </section>

          {/* ── Section 5: The Solitaire Skill Ladder ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Solitaire Skill Ladder
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
              <p>
                Most people learn solitaire the way they learned to swim: dropped into
                Klondike Draw 1 and told to figure it out. That works, eventually, but
                there is a better path. The ladder below moves from gentlest to
                hardest, and each rung teaches a concept the next rung builds on. You
                do not have to climb it in order, but if you want to get genuinely good
                at solitaire, this is the path we would recommend.
              </p>
            </div>
            <ol className="mt-6 space-y-4">
              {[
                {
                  n: 'Rung 1',
                  title: 'Easy cascade games',
                  games: 'Klondike 1-suit, Spider 1-suit, Eight Off (1-cell FreeCell style)',
                  desc: 'Learn the cascade concept — descending alternating-color stacks — and get comfortable with the idea that the top card is the only one you can move. You are building hand-eye fluency here, not strategy.',
                  ready: `You are ready to climb when you finish a deal without using a hint and you stop confusing foundation piles with tableau columns.`,
                },
                {
                  n: 'Rung 2',
                  title: 'Classic Klondike Draw 3',
                  games: 'Klondike Draw 3 (the hard Windows default)',
                  desc: 'Learn waste management: how to cycle the stock, when to commit a card from the waste pile, how to plan around cards you cannot reach this pass. Draw 3 is a different game than Draw 1, and most players never realize it.',
                  ready: `You are ready to climb when you can win Klondike Draw 1 consistently and you can name the three cards currently buried in the waste pile without looking.`,
                },
                {
                  n: 'Rung 3',
                  title: 'Standard FreeCell',
                  games: 'FreeCell (four free cells, alternating-color tableau)',
                  desc: 'Learn supermoves — the math of moving multi-card groups through free cells and empty columns — and full-information strategy. FreeCell is where you start actually planning, because you can see everything from move one.',
                  ready: `You are ready to climb when you win 80% of random FreeCell deals and you can explain why empty columns are worth more than free cells.`,
                },
                {
                  n: 'Rung 4',
                  title: '2-suit Spider',
                  games: 'Spider Solitaire (2-suit mode)',
                  desc: 'Learn suit matching and group movement across ten columns. 2-suit Spider is the sweet spot most experienced Spider players settle into — tight enough to punish sloppy play, loose enough to reward strategy. The skill: knowing when to stop building and when to deal from stock.',
                  ready: `You are ready to climb when you win 2-suit Spider more than you lose and you can feel which columns are &quot;safe&quot; without counting.`,
                },
                {
                  n: 'Rung 5',
                  title: 'Forty Thieves and 4-suit Spider',
                  games: 'Forty Thieves, Spider 4-suit',
                  desc: 'Learn advanced patience and high frustration tolerance. These games demand perfect move selection and still lose frequently because the deal determines outcomes in ways cascade games do not. You are learning when to concede a deal and when to push.',
                  ready: `You are ready to climb when you can tell within the first ten moves whether a Forty Thieves deal is winnable.`,
                },
                {
                  n: 'Rung 6',
                  title: 'Obscure variants',
                  games: "La Belle Lucie, Cruel, Flower Garden, Baker's Dozen",
                  desc: 'Learn the specialist games. These variants have non-standard structures, unusual movement rules, and their own micro-strategies. Few players beyond the patience community ever touch them, which is exactly why they stay interesting.',
                  ready: `You have reached the top of the ladder. Start comparing your win rates against our Research Desk figures and reach out if you disagree.`,
                },
              ].map((rung) => (
                <li
                  key={rung.n}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]/80">
                      {rung.n}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{rung.title}</h3>
                  </div>
                  <p className="mt-1 text-xs italic text-white/55">{rung.games}</p>
                  <p
                    className="mt-3 text-sm leading-6 text-white/70"
                    dangerouslySetInnerHTML={{ __html: rung.desc }}
                  />
                  <p className="mt-3 text-sm leading-6 text-[#d4af37]/80">
                    <strong className="font-semibold">Ready to climb when:</strong>{' '}
                    <span className="text-white/70">{rung.ready}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Featured games ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Games You Can Play Right Now
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredGames.map((game) => (
                <Link
                  key={game.label}
                  href={game.href}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#d4af37]/30 hover:bg-white/[0.07]"
                >
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f5df97]">
                    {game.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{game.description}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[#d4af37] group-hover:text-white">
                    Play now &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── How to play (condensed) ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              How to Play FreeCell
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/65">
              <p>
                FreeCell is a solitaire card game played with a single 52-card deck. All cards are
                dealt face-up into eight tableau columns, so you can see everything from the start.
                Your goal is to move all 52 cards to four foundation piles, one per suit, building
                each from Ace up to King.
              </p>
              <p>
                You have four free cells (top-left) that act as temporary storage — each holds one
                card at a time. On the tableau, you build columns in descending order with alternating
                colors (a black 6 goes on a red 7). Only the top card of each column is movable,
                though you can move sequences of cards if enough free cells and empty columns are
                available to support the move.
              </p>
              <p>
                The key strategic principles: keep free cells open as long as possible, build long
                descending sequences before moving to foundations, and plan several moves ahead.
                Empty columns are extremely valuable — treat them like extra free cells.
              </p>
              <p>
                For a complete walkthrough with illustrations, see our{' '}
                <Link href="/how-to-play" className="text-[#d4af37] hover:text-[#f5df97]">full FreeCell rules guide</Link>.
                New to the game? Start with our{' '}
                <Link href="/freecell-for-beginners" className="text-[#d4af37] hover:text-[#f5df97]">beginner&apos;s guide</Link>{' '}
                or try an{' '}
                <Link href="/easy-freecell-games" className="text-[#d4af37] hover:text-[#f5df97]">easy deal</Link>{' '}
                to build confidence.
              </p>
            </div>
          </section>

          {/* ── Features ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Features
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Unlimited Undo & Redo', desc: 'Step backward and forward through your entire move history. Experiment freely.' },
                { title: 'Smart Hints', desc: 'Press H anytime for an AI-suggested move. Learn why certain plays are stronger.' },
                { title: 'Numbered Deals', desc: 'Every game has a number. Share it with friends and compare strategies on the same layout.' },
                { title: 'Daily Challenge', desc: 'A new deal every day, the same for all players. Compete on the global leaderboard.' },
                { title: 'Streak Tracking', desc: 'Track consecutive wins across sessions. How high can you go?' },
                { title: 'Full Statistics', desc: 'Win rate, average time, move counts, and more — all tracked locally and privately.' },
                { title: 'Achievements', desc: 'Unlock milestones for speed, streaks, and skill. 20+ achievements to earn.' },
                { title: 'Ghost Mode', desc: 'Watch the solver play your current deal. Study optimal play in real time.' },
                { title: 'Works Everywhere', desc: 'Desktop, tablet, phone. Touch or mouse. No download needed.' },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                  <h3 className="font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/55">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ (hub-specific) ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Questions About {siteConfig.brandName}
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Questions that come up specifically because we cover a network of
              solitaire games rather than a single title. For rules and strategy on
              any individual game, see that game&apos;s dedicated page.
            </p>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  <summary className="cursor-pointer px-5 py-4 text-base font-semibold text-white hover:text-[#f5df97] [&::-webkit-details-marker]:hidden list-none">
                    <span className="flex items-center justify-between">
                      {item.q}
                      <span className="ml-3 text-white/40 transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-7 text-white/60">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Guides & Strategy links ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Guides &amp; Strategy
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Deep-dive articles to help you win more games and understand how solitaire works.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: '/how-to-play', title: 'How to Play FreeCell', desc: 'Complete rules, card mechanics, and step-by-step setup guide.' },
                { href: '/strategy', title: 'FreeCell Strategy', desc: 'Advanced tactics: column management, free cell discipline, and move sequencing.' },
                { href: '/freecell-for-beginners', title: 'FreeCell for Beginners', desc: 'A gentler introduction for first-time players.' },
                { href: '/spider/how-to-play', title: 'How to Play Spider', desc: 'Rules for 1-suit, 2-suit, and 4-suit Spider Solitaire.' },
                { href: '/spider/strategy', title: 'Spider Strategy', desc: 'Stock management, column building, and suit completion tactics.' },
                { href: '/tips', title: '25 Quick Tips', desc: 'Bite-sized advice to improve your win rate immediately.' },
                { href: '/freecell-vs-klondike', title: 'FreeCell vs Klondike', desc: 'How these two solitaire classics differ in rules, luck, and skill.' },
                { href: '/freecell-vs-spider', title: 'FreeCell vs Spider', desc: 'Comparing difficulty, strategy, and why players prefer one over the other.' },
                { href: '/spider/1-suit-vs-2-suit-vs-4-suit', title: 'Spider Difficulty Levels', desc: 'Which Spider variant should you play? A breakdown by difficulty.' },
                { href: '/freecell-hints-explained', title: 'Hints Explained', desc: 'How the hint system works and how to use it to learn, not lean on it.' },
                { href: '/is-every-freecell-game-winnable', title: 'Is Every Deal Winnable?', desc: 'The story of Deal #11982 and what we know about solvability.' },
                { href: '/solitaire-types', title: 'All Solitaire Types', desc: 'A catalog of 20+ solitaire variants with rules and history.' },
                { href: '/glossary', title: 'Solitaire Glossary', desc: 'Definitions for tableau, foundation, stock, cascade, and more.' },
                { href: '/history', title: 'History of FreeCell', desc: 'From Paul Alfille to Microsoft Windows to the modern web.' },
                { href: '/freecell-world-records', title: 'World Records', desc: 'The fastest times, longest streaks, and competitive FreeCell milestones.' },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-[#d4af37]/25 hover:bg-white/[0.06]"
                >
                  <h3 className="font-bold text-white group-hover:text-[#f5df97]">{card.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/50">{card.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── About ── */}
          <section className="mt-16">
            <h2
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              About Solitaire Stack
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/60">
              <p>
                Solitaire Stack is an independent project built because we wanted a better place to
                play solitaire online. No bloat, no pop-ups, no account walls — just well-made card
                games that run fast in your browser.
              </p>
              <p>
                The site currently features four playable games — FreeCell, Spider Solitaire,
                Baker&apos;s Game, and Eight Off — with more on the way. Each game includes hints,
                unlimited undo, numbered deals for replay, and automatic stat tracking that stores
                everything locally on your device.
              </p>
              <p>
                We also publish a growing library of strategy guides, comparison articles, and
                explainer pages to help players of all levels. From{' '}
                <Link href="/freecell-for-beginners" className="text-[#d4af37] hover:text-[#f5df97]">absolute beginners</Link>{' '}
                learning the rules to experienced players studying{' '}
                <Link href="/hard-freecell-games" className="text-[#d4af37] hover:text-[#f5df97]">difficult deals</Link>,
                there&apos;s content here for every skill level.
              </p>
              <p>
                {siteConfig.brandName} is part of a network that includes{' '}
                <strong className="text-white/80">playfreecellonline.com</strong> for dedicated
                FreeCell players, with more specialist domains launching as the game catalog grows.
                Learn more on our{' '}
                <Link href="/about" className="text-[#d4af37] hover:text-[#f5df97]">about page</Link>,
                or read our{' '}
                <Link href="/editorial-standards" className="text-[#d4af37] hover:text-[#f5df97]">editorial standards</Link>{' '}
                to see how articles move from research to publication.
              </p>
            </div>
            <div className="mt-8">
              <AuthorBio authorSlug="editorial-team" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
