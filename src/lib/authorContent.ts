import fs from "fs";
import path from "path";
import matter from "gray-matter";

const AUTHORS_DIR = path.join(process.cwd(), "src/content/authors");

export interface AuthorMdx {
  slug: string;
  content: string;
  frontmatter: Record<string, unknown>;
}

/**
 * Loads the long-form MDX body for an author profile. Returns null if
 * the file does not exist so pages can fall back to `bioFull` from
 * `src/lib/authors.ts`.
 */
export function getAuthorMdx(slug: string): AuthorMdx | null {
  const filePath = path.join(AUTHORS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    frontmatter: data,
  };
}
