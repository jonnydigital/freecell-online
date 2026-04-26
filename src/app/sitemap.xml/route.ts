import { absoluteUrl, isHubSite, siteConfig } from '@/lib/siteConfig';
import { sitemapGameNumbers, isHighPriorityDeal } from '@/lib/curatedDeals';
import { getAllPosts } from '@/lib/blog';
import { ownerOf } from '@/lib/routeOwnership';
import { AUTHORS, type AuthorSlug } from '@/lib/authors';

/**
 * Stable lastmod timestamp — evaluated once at module load (i.e. per deploy /
 * cold start) rather than on every crawl. Google's anti-spam heuristics flag
 * static content whose lastmod updates on every request.
 */
const LASTMOD = new Date().toISOString();

/**
 * Dynamic XML sitemap served at /sitemap.xml via route handler.
 * Moved from convention-based sitemap.ts to free up /sitemap for the HTML sitemap page.
 *
 * Each site's sitemap only lists routes it is the PRIMARY owner of, so Google
 * sees one canonical URL per piece of content across the 4-domain network.
 */

const contentPages = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  ...(isHubSite ? [{ path: '/freecell', changeFrequency: 'daily', priority: 0.9 }] : []),
  { path: '/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/strategy', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/glossary', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/history', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-types', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-difficulty-ranking', changeFrequency: 'monthly', priority: 0.7 },
  // Hub pillar pages (Wave 8-HUB)
  { path: '/solitaire-games-guide', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solitaire-strategy', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solitaire-history', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-for-every-mood', changeFrequency: 'monthly', priority: 0.7 },
  // Hub long-form research (Wave 10-F)
  { path: '/how-solitaire-changed-windows', changeFrequency: 'yearly', priority: 0.7 },
  // Hub E-E-A-T methodology pages
  { path: '/how-we-test-solitaire-games', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/our-solitaire-methodology', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/editorial-standards', changeFrequency: 'yearly', priority: 0.6 },
  // Hub research / linkbait
  { path: '/solitaire-win-rates', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/popular-solitaire-by-state', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-game-finder', changeFrequency: 'monthly', priority: 0.7 },
  // Author masthead (E-E-A-T)
  { path: '/authors', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/winning-deals', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-game', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eight-off', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/easy-freecell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/spider', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell-vs-spider', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-vs-klondike', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-vs-bakers-game', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-vs-eight-off', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/klondike-vs-spider', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider-vs-scorpion', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike-vs-pyramid', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-rules-by-country', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-opening-strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/how-freecell-supermoves-work', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-endgame-strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/why-freecell-is-almost-always-solvable', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/famous-freecell-game-numbers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/statistics', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/deals', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/solver', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/streak', changeFrequency: 'daily', priority: 0.6 },
  { path: '/storm', changeFrequency: 'daily', priority: 0.6 },
  { path: '/stats', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/achievements', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/leaderboard', changeFrequency: 'daily', priority: 0.6 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/daily-freecell', changeFrequency: 'daily', priority: 0.7 },
  { path: '/daily-freecell/calendar', changeFrequency: 'daily', priority: 0.6 },
  { path: '/freecell-for-beginners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/is-every-freecell-game-winnable', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/easy-freecell-games', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/hard-freecell-games', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-mistakes-to-avoid', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/famous-freecell-deals', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-game-11982', changeFrequency: 'yearly', priority: 0.7 },
  // Hub striking-distance target (Wave 8-STR)
  { path: '/freecell-no-ads', changeFrequency: 'monthly', priority: 0.7 },
  // FreeCell spoke pillar + research pages
  { path: '/freecell-mastery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell-solvability', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/unsolvable-freecell-deals', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/spider/how-to-play', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/1-suit-vs-2-suit-vs-4-suit', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/is-spider-solitaire-winnable', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/how-to-empty-a-column', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/faq', changeFrequency: 'monthly', priority: 0.7 },
  // Spider spoke pillar pages (Wave 8-SP)
  { path: '/spider-mastery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/spider-suit-strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider-column-tactics', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider-winnability', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider-variants', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-hints-explained', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-world-records', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/klondike/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/klondike/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/winning-strategies', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/draw-1-vs-draw-3', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/vegas-scoring', changeFrequency: 'monthly', priority: 0.7 },
  // Klondike spoke pillar pages (Wave 8-KL)
  { path: '/klondike-mastery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/klondike-vegas-scoring', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike-probability', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike-variants', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike-cheat-sheet', changeFrequency: 'monthly', priority: 0.8 },
  // Klondike striking-distance target (Wave 8-STR)
  { path: '/klondike-fewest-moves', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pyramid', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pyramid/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pyramid/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pyramid/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tripeaks', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tripeaks/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/golf', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/golf/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/canfield', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/canfield/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/forty-thieves', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/forty-thieves/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tripeaks/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tripeaks/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/golf/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/golf/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/yukon', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/yukon/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/yukon/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/canfield/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/canfield/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/forty-thieves/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/forty-thieves/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/scorpion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/scorpion/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/scorpion/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/seahaven', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/seahaven/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/seahaven/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/yukon/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/scorpion/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/seahaven/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/beleaguered-castle', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/beleaguered-castle/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/beleaguered-castle/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/beleaguered-castle/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/penguin', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/penguin/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/penguin/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/penguin/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/clock', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/clock/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/clock/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/clock/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/cruel', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cruel/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cruel/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/cruel/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/accordion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accordion/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accordion/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/accordion/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/la-belle-lucie', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/la-belle-lucie/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/la-belle-lucie/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/la-belle-lucie/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/flower-garden', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/flower-garden/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/flower-garden/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/flower-garden/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/calculation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/calculation/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/calculation/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/calculation/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/monte-carlo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/monte-carlo/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/monte-carlo/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/monte-carlo/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bristol', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bristol/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bristol/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bristol/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bisley', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bisley/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bisley/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bisley/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/aces-up', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aces-up/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aces-up/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/aces-up/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-dozen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-dozen/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-dozen/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-dozen/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gaps', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gaps/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gaps/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gaps/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/games', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell-rules', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-for-seniors', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/large-cards', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-cheat-sheet', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-probability', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-variants', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/microsoft-freecell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/download', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-game/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-game/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-game/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/eight-off/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eight-off/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/eight-off/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell/1-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell/2-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell/3-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/embed', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/embed-generator', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/patience-solitaire', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/solitaire-for-beginners', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/best-freecell-apps', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/sitemap', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

/**
 * Returns true when the given path is owned (primary) by the current site.
 * Non-primary owners still serve the page (200 OK), but only the primary
 * owner's sitemap lists it to avoid duplicate canonical signals to Google.
 */
function isPrimaryOwnerOfPath(path: string): boolean {
  return ownerOf(path).primaryOwner === siteConfig.key;
}

function buildXml(): string {
  const staticEntries = contentPages
    .filter((p) => isPrimaryOwnerOfPath(p.path))
    .map(
      (p) =>
        `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${p.changeFrequency}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    );

  // Author profile pages (E-E-A-T signals, masthead)
  const authorEntries = isPrimaryOwnerOfPath('/authors/[slug]')
    ? (Object.keys(AUTHORS) as AuthorSlug[]).map(
        (slug) =>
          `  <url>\n    <loc>${absoluteUrl(`/authors/${slug}`)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`
      )
    : [];

  const gameEntries = isPrimaryOwnerOfPath('/game/[number]')
    ? sitemapGameNumbers.map(
        (num) =>
          `  <url>\n    <loc>${absoluteUrl(`/game/${num}`)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>${isHighPriorityDeal(num) ? 0.6 : 0.4}</priority>\n  </url>`
      )
    : [];

  const blogEntries: string[] = [];
  if (isPrimaryOwnerOfPath('/blog')) {
    blogEntries.push(
      `  <url>\n    <loc>${absoluteUrl('/blog')}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }
  if (isPrimaryOwnerOfPath('/blog/[slug]')) {
    const blogPosts = getAllPosts();
    for (const post of blogPosts) {
      blogEntries.push(
        `  <url>\n    <loc>${absoluteUrl(`/blog/${post.slug}`)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...authorEntries, ...blogEntries, ...gameEntries].join('\n')}
</urlset>`;
}

export async function GET() {
  return new Response(buildXml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
