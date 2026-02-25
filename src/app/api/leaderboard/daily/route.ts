import { NextRequest, NextResponse } from 'next/server';

let kv: any = null;
async function getKV() {
  if (!process.env.KV_REST_API_URL) return null;
  if (!kv) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const db = await getKV();
    if (!db) {
      return NextResponse.json({ date, entries: [] });
    }

    const key = `leaderboard:daily:${date}`;
    const raw = await db.zrange(key, 0, 49, { withScores: true });

    // Parse results: raw is [member, score, member, score, ...]
    const entries: any[] = [];
    for (let i = 0; i < raw.length; i += 2) {
      try {
        const data = typeof raw[i] === 'string' ? JSON.parse(raw[i]) : raw[i];
        entries.push({
          rank: Math.floor(i / 2) + 1,
          playerName: data.playerName,
          moves: data.moves,
          time: data.time,
          gameNumber: data.gameNumber,
        });
      } catch {
        // Skip malformed entries
      }
    }

    return NextResponse.json({ date, entries }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    console.error('Leaderboard daily error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
