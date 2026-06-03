import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function GET() {
  const dataPath = join(process.cwd(), 'src', 'data', 'freeCellUnsolvableDeals.json');
  const body = await readFile(dataPath, 'utf8');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
