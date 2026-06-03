#!/usr/bin/env node
/**
 * AdSense recovery audit.
 *
 * Checks the repo-side invariants that matter for the solitairestack.com
 * "Low value content" recovery: no fabricated social proof in source, no
 * broken author bylines, and no hub variant detail pages or hub network blocks
 * that preserve the scaled/template footprint.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SRC_ROOTS = ['src/app', 'src/components', 'src/lib'];
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx']);
const FORBIDDEN_SOURCE_PATTERNS = [
  { label: 'StarRatingWidget', regex: /\bStarRatingWidget\b/ },
  { label: 'PlayerTestimonials', regex: /\bPlayerTestimonials\b/ },
  { label: 'AggregateRating', regex: /\bAggregateRating\b/ },
  { label: 'Review structured data type', regex: /["@']@type["@']\s*:\s*["']Review["']/ },
  { label: 'schema.org Review microdata', regex: /schema\.org\/Review\b/i },
  { label: 'reviewRating structured data field', regex: /\breviewRating\b/ },
  { label: 'ratingValue structured data field', regex: /\bratingValue\b/ },
  { label: 'bestRating structured data field', regex: /\bbestRating\b/ },
  { label: 'worstRating structured data field', regex: /\bworstRating\b/ },
  { label: 'hardcoded 3,241 rating count', regex: /\b3,241\b/ },
  { label: 'What Players Say testimonial block', regex: /What Players Say/i },
];
const VARIANT_DETAIL_PAGE_REGEX =
  /^src\/app\/\(main\)\/[^/]+\/(?:how-to-play|strategy|tips)\/page\.tsx$/;
const TEMPLATE_FAQ_PROMPTS = [
  {
    label: 'generic "What makes [game] different from other solitaire games?" FAQ prompt',
    regex: /\b(?:question|name):\s*["']What makes [^"']+ different from other solitaire games\?/g,
  },
  {
    label: 'generic "Is [game] harder than FreeCell?" FAQ prompt',
    regex: /\b(?:question|name):\s*["']Is [^"']+ harder than FreeCell\?/g,
  },
  {
    label: 'generic "Is [game] easier or harder than FreeCell?" FAQ prompt',
    regex: /\b(?:question|name):\s*["']Is [^"']+ easier or harder than FreeCell\?/g,
  },
];
const HUB_DETAIL_PATHS = [
  '/accordion/how-to-play',
  '/bisley/strategy',
  '/cruel/tips',
  '/flower-garden/how-to-play',
  '/la-belle-lucie/how-to-play',
];
const TRUST_POLICY_PAGES = [
  'src/app/(main)/editorial-standards/page.tsx',
  'src/app/(main)/fact-checking-policy/page.tsx',
  'src/app/(main)/correction-policy/page.tsx',
];

function* walk(absDir) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const absPath = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(absPath);
    } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      yield absPath;
    }
  }
}

function read(relPath) {
  return fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

function fail(message, failures) {
  failures.push(message);
}

function checkForbiddenSourcePatterns(failures) {
  for (const root of SRC_ROOTS) {
    for (const absFile of walk(path.join(REPO_ROOT, root))) {
      const relPath = path.relative(REPO_ROOT, absFile);
      const source = fs.readFileSync(absFile, 'utf8');

      for (const { label, regex } of FORBIDDEN_SOURCE_PATTERNS) {
        regex.lastIndex = 0;
        const match = regex.exec(source);
        if (match) {
          fail(`${relPath}:${lineNumber(source, match.index)} contains ${label}`, failures);
        }
      }
    }
  }
}

function checkTemplateFaqPrompts(failures) {
  for (const absFile of walk(path.join(REPO_ROOT, 'src/app'))) {
    const relPath = path.relative(REPO_ROOT, absFile);
    if (!VARIANT_DETAIL_PAGE_REGEX.test(relPath)) continue;

    const source = fs.readFileSync(absFile, 'utf8');
    for (const { label, regex } of TEMPLATE_FAQ_PROMPTS) {
      regex.lastIndex = 0;
      const match = regex.exec(source);
      if (match) {
        fail(`${relPath}:${lineNumber(source, match.index)} contains ${label}`, failures);
      }
    }
  }
}

function checkSearchIndexingPolicy(failures) {
  const policy = read('src/lib/searchIndexing.ts');
  if (!policy.includes("const VARIANT_DETAIL_SEGMENTS = new Set(['how-to-play', 'strategy', 'tips'])")) {
    fail('src/lib/searchIndexing.ts does not declare the variant detail segments', failures);
  }
  if (!policy.includes("return shouldIndexPath(path, siteKey) ? null : 'noindex, follow'")) {
    fail('src/lib/searchIndexing.ts does not emit noindex, follow for non-indexable paths', failures);
  }

  const proxy = read('src/proxy.ts');
  if (!proxy.includes("response.headers.set('X-Robots-Tag', robotsHeader)")) {
    fail('src/proxy.ts does not set X-Robots-Tag from the indexing policy', failures);
  }

  const sitemap = read('src/app/sitemap.xml/route.ts');
  if (!sitemap.includes('shouldIncludeInSitemap(path: string)')) {
    fail('src/app/sitemap.xml/route.ts is not filtering sitemap entries through shouldIncludeInSitemap', failures);
  }

  const indexingTest = read('src/lib/__tests__/searchIndexing.test.ts');
  for (const pathToCheck of HUB_DETAIL_PATHS) {
    if (!indexingTest.includes(pathToCheck)) {
      fail(`search indexing tests do not cover ${pathToCheck}`, failures);
    }
  }
}

function checkWinRateDataset(failures) {
  const data = JSON.parse(read('src/data/winRates.json'));
  if (!Array.isArray(data.entries) || data.entries.length < 15) {
    fail('src/data/winRates.json does not expose a substantial win-rate dataset', failures);
  }
  if (!data.methodologyBreakdown || !data.methodologyBreakdown.exhaustive) {
    fail('src/data/winRates.json does not disclose methodology breakdown', failures);
  }

  const page = read('src/app/(main)/solitaire-win-rates/page.tsx');
  if (!page.includes('absoluteUrl("/solitaire-win-rates.json")')) {
    fail('/solitaire-win-rates Dataset JSON-LD does not point at the JSON download route', failures);
  }
  if (!page.includes('absoluteUrl("/freecell-unsolvable-deals.json")')) {
    fail('/solitaire-win-rates Dataset JSON-LD does not point at the FreeCell unsolvable deals JSON route', failures);
  }
  if (!page.includes('href="/solitaire-win-rates.json"')) {
    fail('/solitaire-win-rates page does not link to the JSON dataset', failures);
  }
  if (!page.includes('href="/freecell-unsolvable-deals.json"')) {
    fail('/solitaire-win-rates page does not link to the FreeCell unsolvable deals JSON dataset', failures);
  }

  const route = read('src/app/solitaire-win-rates.json/route.ts');
  if (!route.includes("'Content-Type': 'application/json; charset=utf-8'")) {
    fail('/solitaire-win-rates.json route does not serve JSON content type', failures);
  }

  const unsolvable = JSON.parse(read('src/data/freeCellUnsolvableDeals.json'));
  if (!Array.isArray(unsolvable.entries) || unsolvable.entries.length !== 8) {
    fail('src/data/freeCellUnsolvableDeals.json does not expose the 8 known impossible FreeCell deals', failures);
  }
  if (unsolvable.population?.solvabilityPercent !== 99.9992) {
    fail('src/data/freeCellUnsolvableDeals.json does not disclose the first-million solvability percentage', failures);
  }

  const unsolvableRoute = read('src/app/freecell-unsolvable-deals.json/route.ts');
  if (!unsolvableRoute.includes("'Content-Type': 'application/json; charset=utf-8'")) {
    fail('/freecell-unsolvable-deals.json route does not serve JSON content type', failures);
  }
}

function checkAuthorSlugs(failures) {
  const authorsSource = read('src/lib/authors.ts');
  const slugs = new Set([...authorsSource.matchAll(/^\s+'([^']+)': \{/gm)].map((match) => match[1]));

  for (const slug of slugs) {
    const profilePath = path.join(REPO_ROOT, 'src/content/authors', `${slug}.mdx`);
    if (!fs.existsSync(profilePath)) {
      fail(`src/lib/authors.ts defines "${slug}" without src/content/authors/${slug}.mdx`, failures);
    }
  }

  for (const root of ['src/app', 'src/components']) {
    for (const absFile of walk(path.join(REPO_ROOT, root))) {
      const relPath = path.relative(REPO_ROOT, absFile);
      const source = fs.readFileSync(absFile, 'utf8');

      for (const match of source.matchAll(/\b(?:authorSlug|reviewedBySlug)="([^"]+)"/g)) {
        if (!slugs.has(match[1])) {
          fail(`${relPath}:${lineNumber(source, match.index)} references unknown author slug "${match[1]}"`, failures);
        }
      }
    }
  }
}

function checkTrustPageAttribution(failures) {
  for (const relPath of TRUST_POLICY_PAGES) {
    const source = read(relPath);
    if (!source.includes('authorSlug="j-foye"')) {
      fail(`${relPath} is not visibly attributed to the real founder/editor profile`, failures);
    }
    if (!source.includes('"@type": "Person"') || !source.includes('url: absoluteUrl("/authors/j-foye")')) {
      fail(`${relPath} Article schema is not attributed to /authors/j-foye as a Person`, failures);
    }
  }
}

function checkHubNetworkLinks(failures) {
  const component = read('src/components/NetworkCrossLinks.tsx');
  if (!component.includes('if (isHubSite) return null;')) {
    fail('src/components/NetworkCrossLinks.tsx still renders the cross-network block on hub pages', failures);
  }
}

function checkHubAdSenseSuppression(failures) {
  const adSenseScript = read('src/components/AdSenseScript.tsx');
  if (!adSenseScript.includes('HUB_ADSENSE_SUPPRESSED')) {
    fail('src/components/AdSenseScript.tsx does not define hub AdSense suppression', failures);
  }
  if (!adSenseScript.includes("process.env.NEXT_PUBLIC_ADSENSE_APPROVED !== 'true'")) {
    fail('src/components/AdSenseScript.tsx does not gate hub AdSense on NEXT_PUBLIC_ADSENSE_APPROVED', failures);
  }
  if (!adSenseScript.includes('if (HUB_ADSENSE_SUPPRESSED || !enabled) return null;')) {
    fail('src/components/AdSenseScript.tsx can still load AdSense on the unapproved hub', failures);
  }

  const adUnit = read('src/components/AdUnit.tsx');
  if (!adUnit.includes('HUB_ADS_SUPPRESSED')) {
    fail('src/components/AdUnit.tsx does not suppress hub ad units before approval', failures);
  }

  const adsterraScript = read('src/components/AdsterraScript.tsx');
  if (!adsterraScript.includes('HUB_ADSTERRA_SUPPRESSED')) {
    fail('src/components/AdsterraScript.tsx does not suppress hub Adsterra before approval', failures);
  }

  const growScript = read('src/components/MediavineGrowScript.tsx');
  if (!growScript.includes('HUB_GROW_SUPPRESSED')) {
    fail('src/components/MediavineGrowScript.tsx does not suppress hub Grow before approval', failures);
  }

  const consentHook = read('src/hooks/useCookieConsent.ts');
  if (!consentHook.includes('useSyncExternalStore')) {
    fail('src/hooks/useCookieConsent.ts does not use a stable subscription for consent state', failures);
  }
}

const failures = [];
checkForbiddenSourcePatterns(failures);
checkTemplateFaqPrompts(failures);
checkSearchIndexingPolicy(failures);
checkWinRateDataset(failures);
checkAuthorSlugs(failures);
checkTrustPageAttribution(failures);
checkHubNetworkLinks(failures);
checkHubAdSenseSuppression(failures);

if (failures.length > 0) {
  console.error('FAIL: AdSense recovery audit found issues:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: AdSense recovery invariants are satisfied.');
