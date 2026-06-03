import * as fs from 'fs';
import * as path from 'path';
import { AUTHORS } from '../authors';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const VALID_AUTHOR_SLUGS = new Set(Object.keys(AUTHORS));

function* walk(absDir: string): Generator<string> {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const absPath = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(absPath);
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      yield absPath;
    }
  }
}

describe('author slug references', () => {
  it('all AuthorByline and AuthorBio slug literals resolve to known authors', () => {
    const sourceFiles = [...walk(path.join(REPO_ROOT, 'src/app')), ...walk(path.join(REPO_ROOT, 'src/components'))];
    const invalidReferences: string[] = [];

    for (const file of sourceFiles) {
      const relPath = path.relative(REPO_ROOT, file);
      const source = fs.readFileSync(file, 'utf8');
      const matches = source.matchAll(/\b(?:authorSlug|reviewedBySlug)="([^"]+)"/g);

      for (const match of matches) {
        const slug = match[1];
        if (!VALID_AUTHOR_SLUGS.has(slug)) {
          invalidReferences.push(`${relPath}: ${slug}`);
        }
      }
    }

    expect(invalidReferences).toEqual([]);
  });
});
