import Link from 'next/link';
import ContentLayout from './ContentLayout';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const featuredGames = [
  {
    href: siteConfig.primaryGamePath,
    label: 'FreeCell',
    eyebrow: 'Live now',
    description:
      'Pure skill solitaire with all 52 cards visible from the start, plus numbered deals, hints, and stat tracking.',
    accent: 'from-[#f5e1a4] via-[#d4af37] to-[#9f7b16]',
  },
  {
    href: '/spider',
    label: 'Spider Solitaire',
    eyebrow: 'Live now',
    description:
      'Three difficulty levels, two-deck play, and a deeper challenge curve once you want more pressure than FreeCell.',
    accent: 'from-[#f9cab4] via-[#dd8b55] to-[#8b3d1d]',
  },
  {
    href: '/bakers-game',
    label: "Baker's Game",
    eyebrow: 'Live now',
    description:
      'A stricter FreeCell cousin where you build by suit instead of alternating colors. Cleaner, harsher, more tactical.',
    accent: 'from-[#d4ecb2] via-[#89b05c] to-[#375e1d]',
  },
  {
    href: '/eight-off',
    label: 'Eight Off',
    eyebrow: 'Live now',
    description:
      'An open-information variant with eight reserve cells and a slightly different rhythm for sequence building.',
    accent: 'from-[#c6ddff] via-[#6e97d9] to-[#1f4e95]',
  },
];

const learnCards = [
  {
    href: '/freecell-for-beginners',
    title: 'FreeCell for Beginners',
    description: 'A simpler on-ramp for new players who want the basics without drowning in jargon.',
  },
  {
    href: '/spider/how-to-play',
    title: 'How to Play Spider',
    description: 'Rules, stock timing, and the difference between 1-suit, 2-suit, and 4-suit games.',
  },
  {
    href: '/freecell-vs-klondike',
    title: 'FreeCell vs Klondike',
    description: 'A head-to-head comparison of luck, skill, difficulty, and why the games feel so different.',
  },
  {
    href: '/solitaire-types',
    title: 'Solitaire Types',
    description: 'A map of the broader category so the hub can grow into more than one flagship game.',
  },
];

const roadmapItems = [
  'Klondike will get its own launch path, content cluster, and dedicated spoke once the game is ready.',
  'Spider will keep expanding with difficulty-specific strategy, comparisons, and variant explainers.',
  'The hub will publish broader evergreen content that can rank and feed players into the specialist game pages.',
];

export default function SolitaireHubHome() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: absoluteUrl('/'),
    description: siteConfig.defaultDescription,
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured solitaire games',
    itemListElement: featuredGames.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: game.label,
      url: absoluteUrl(game.href),
    })),
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <main id="main-content" className="relative overflow-hidden px-6 pb-20 pt-10 sm:pt-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at top left, rgba(212,175,55,0.22), transparent 28%), radial-gradient(circle at 80% 20%, rgba(110,151,217,0.16), transparent 24%), radial-gradient(circle at bottom right, rgba(221,139,85,0.18), transparent 26%)',
          }}
        />

        <section className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5df97]">
              Solitaire hub in buildout
            </span>
            <h1
              className="max-w-4xl text-5xl font-black leading-[0.92] text-white sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              One home for sharp solitaire games and the content that feeds them.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Solitaire Stack is the portfolio hub. It gives you a cleaner front door for
              FreeCell, Spider Solitaire, and the deeper strategy guides that will support the
              specialist sites as they come online.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={siteConfig.primaryGamePath}
                className="inline-flex items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#1c1605] transition-transform hover:-translate-y-0.5 hover:bg-[#e2bf56]"
              >
                Play FreeCell
              </Link>
              <Link
                href="/spider"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#d4af37]/40 hover:text-[#f5df97]"
              >
                Play Spider
              </Link>
              <Link
                href="/solitaire-types"
                className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white/68 transition-colors hover:text-white"
              >
                Explore the catalog
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black/18 p-6 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d4af37]/75">
                Portfolio posture
              </div>
              <p className="mt-3 text-2xl font-bold text-white">Hub now, spokes as they earn it.</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                The domain portfolio is bought. The execution priority is content depth and brand
                separation, not flipping every domain live on day one.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/18 p-6 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d4af37]/75">
                Best live bets
              </div>
              <p className="mt-3 text-2xl font-bold text-white">FreeCell and Spider first.</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Those are the games with the strongest current product depth and the clearest
                content clusters already forming in the repo.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/18 p-6 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d4af37]/75">
                Content engine
              </div>
              <p className="mt-3 text-2xl font-bold text-white">Guides, comparisons, and intent pages.</p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                The hub exists to rank for broad solitaire terms and hand traffic to the best-fit
                game page, not to publish filler.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-16 max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/75">
                Featured games
              </p>
              <h2
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Live games worth sending traffic to right now
              </h2>
            </div>
            <Link
              href="/solitaire-types"
              className="hidden text-sm font-semibold text-white/58 transition-colors hover:text-white md:block"
            >
              See the wider catalog
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredGames.map((game) => (
              <Link
                key={game.label}
                href={game.href}
                className="group rounded-[1.75rem] border border-white/10 bg-black/18 p-6 transition-transform hover:-translate-y-1 hover:border-white/18"
              >
                <div className={`h-2 w-28 rounded-full bg-gradient-to-r ${game.accent}`} />
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
                  {game.eyebrow}
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">{game.label}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{game.description}</p>
                <div className="mt-6 text-sm font-semibold text-[#f3de96] transition-colors group-hover:text-white">
                  Open game {'>'}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative mx-auto mt-20 max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#08160e]/80 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/75">
                Learn and compare
              </p>
              <h2
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Content that can rank and convert
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {learnCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#d4af37]/25 hover:bg-white/[0.05]"
                  >
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">{card.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/18 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/75">
                Build sequence
              </p>
              <h2
                className="mt-3 text-3xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                What ships next from here
              </h2>
              <ul className="mt-6 space-y-4">
                {roadmapItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/68"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-3xl border border-[#d4af37]/18 bg-[#d4af37]/8 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f3de96]">
                  Parked assets
                </div>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  <strong className="text-white">playklondikeonline.com</strong> and
                  <strong className="text-white"> playspidersolitaireonline.com</strong> are owned,
                  but they stay parked until the game pages and content clusters are ready to stand
                  on their own.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
