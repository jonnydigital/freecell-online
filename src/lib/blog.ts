import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from './siteConfig';
import type { SiteKey } from './siteConfig';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Valid SiteKey values — kept in sync with siteConfig.SiteKey. Used for
 * runtime validation of MDX `sites:` frontmatter arrays.
 */
const VALID_SITE_KEYS: readonly SiteKey[] = [
  'playfreecellonline',
  'solitairestack',
  'playklondikeonline',
  'playspidersolitaireonline',
];

/** Default primary owner when a post declares no `sites` array. */
const DEFAULT_PRIMARY_OWNER: SiteKey = 'solitairestack';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  content: string;
  /**
   * Which sites in the network should serve this post. The FIRST entry is
   * treated as the canonical primary owner for rel=canonical signalling.
   * Undefined means hub-only (equivalent to ['solitairestack']).
   *
   * Wave 11 adds this field as infrastructure only — the filter is not yet
   * flipped, so every site continues to render every post. Canonicals now
   * point to the primary owner so Google sees ownership before the filter
   * rolls on ~4 weeks after canonicals ship.
   */
  sites?: SiteKey[];
}

/** Legacy alias for backwards compatibility with existing imports. */
export type Post = BlogPost;

interface GetAllPostsOptions {
  /**
   * If provided, only return posts whose `sites` array includes this site.
   * If omitted, every post is returned (current pre-filter behavior).
   */
  site?: SiteKey;
}

/**
 * Normalise the raw `sites` frontmatter value into a `SiteKey[]`. Unknown
 * values are dropped silently so a typo in one post doesn't break the build.
 * Returns undefined if no valid sites were declared.
 */
function normaliseSitesField(raw: unknown): SiteKey[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const cleaned = raw.filter(
    (value): value is SiteKey =>
      typeof value === 'string' && (VALID_SITE_KEYS as readonly string[]).includes(value),
  );
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Return all blog posts, optionally filtered to those owned by a given site.
 *
 * Without options: returns every post (preserves pre-Wave-11 behavior so the
 * canonical-first rollout can ship without changing which pages render where).
 *
 * With `{ site }`: returns only posts whose `sites` frontmatter array
 * includes that site. Posts with no `sites` frontmatter are treated as
 * hub-only (i.e. only returned when site === 'solitairestack').
 */
export function getAllPosts(options?: GetAllPostsOptions): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || filename.replace(/\.mdx$/, ''),
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      author: data.author || siteConfig.siteName,
      tags: data.tags || [],
      content,
      sites: normaliseSitesField(data.sites),
    };
  });

  // Sort newest first.
  const sorted = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (!options?.site) return sorted;

  const targetSite = options.site;
  return sorted.filter((post) => {
    const sites = post.sites ?? [DEFAULT_PRIMARY_OWNER];
    return sites.includes(targetSite);
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * Return the canonical SiteKey for a post — the first entry in its `sites`
 * array, falling back to 'solitairestack' (the hub) when the post declares
 * no sites. This is what rel=canonical tags should point to so that each
 * cross-posted article has a single primary owner in the network.
 */
export function getCanonicalSiteForPost(
  post: Pick<BlogPost, 'sites'> | undefined,
): SiteKey {
  if (!post || !post.sites || post.sites.length === 0) {
    return DEFAULT_PRIMARY_OWNER;
  }
  return post.sites[0];
}
