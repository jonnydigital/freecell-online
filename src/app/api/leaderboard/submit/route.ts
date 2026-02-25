import { NextRequest, NextResponse } from 'next/server';

// Vercel KV - lazy import to avoid crash if not configured
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let kv: any = null;
async function getKV() {
  if (!process.env.KV_REST_API_URL) return null;
  if (!kv) {
    const mod = await import('@vercel/kv');
    kv = mod.kv;
  }
  return kv;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameNumber, moves, time, playerName } = body;

    // Validate
    if (!gameNumber || !moves || !time || !playerName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof moves !== 'number' || moves < 1 || moves > 9999) {
      return NextResponse.json({ error: 'Invalid moves' }, { status: 400 });
    }
    if (typeof time !== 'number' || time < 1 || time > 99999) {
      return NextResponse.json({ error: 'Invalid time' }, { status: 400 });
    }
    const name = String(playerName).trim().slice(0, 20);
    if (!name || !/^[a-zA-Z0-9 ]+$/.test(name)) {
      return NextResponse.json({ error: 'Invalid name (alphanumeric + spaces, 1-20 chars)' }, { status: 400 });
    }

    const db = await getKV();
    if (!db) {
      return NextResponse.json({ error: 'Leaderboard not configured' }, { status: 503 });
    }

    // Rate limit: 10 per IP per hour
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rateLimitKey = `ratelimit:leaderboard:${ip}`;
    const current = await db.incr(rateLimitKey);
    if (current === 1) {
      await db.expire(rateLimitKey, 3600);
    }
    if (current > 10) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Store in sorted set (lower score = better)
    const today = new Date().toISOString().split('T')[0];
    const key = `leaderboard:daily:${today}`;
    const score = moves * 10000 + time; // composite score
    const member = JSON.stringify({
      playerName: name,
      moves,
      time,
      gameNumber,
      timestamp: Date.now(),
    });

    await db.zadd(key, { score, member });
    await db.expire(key, 7 * 86400); // 7 day TTL

    // Get rank
    const rank = await db.zrank(key, member);
    const totalEntries = await db.zcard(key);

    // Track global stats
    await db.incr('stats:totalGames');

    return NextResponse.json({
      rank: (rank ?? 0) + 1,
      totalEntries,
    });
  } catch (error) {
    console.error('Leaderboard submit error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
