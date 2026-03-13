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
    const { gameNumber, moves, time, playerName, playerId } = body;

    // Validate required fields
    if (!gameNumber || !moves || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof moves !== 'number' || moves < 1 || moves > 9999) {
      return NextResponse.json({ error: 'Invalid moves' }, { status: 400 });
    }
    if (typeof time !== 'number' || time < 1 || time > 99999) {
      return NextResponse.json({ error: 'Invalid time' }, { status: 400 });
    }

    const name = String(playerName || 'Anonymous').trim().slice(0, 20);
    const sanitizedName = name.replace(/[^a-zA-Z0-9 _-]/g, '') || 'Anonymous';
    const pid = String(playerId || 'unknown').slice(0, 64);

    const db = await getKV();
    if (!db) {
      // No KV configured — return 503 so client falls back to localStorage
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
    const dailyKey = `leaderboard:daily:${today}`;
    const allTimeKey = 'leaderboard:alltime';
    const score = moves * 10000 + time; // composite score

    const member = JSON.stringify({
      playerName: sanitizedName,
      playerId: pid,
      moves,
      time,
      gameNumber,
      date: today,
      timestamp: Date.now(),
    });

    // Remove previous entry from same player (daily)
    const existingDaily = await db.zrange(dailyKey, 0, -1);
    for (const existing of existingDaily) {
      try {
        const parsed = typeof existing === 'string' ? JSON.parse(existing) : existing;
        if (parsed.playerId === pid) {
          await db.zrem(dailyKey, existing);
          break;
        }
      } catch {
        // Skip malformed
      }
    }

    await db.zadd(dailyKey, { score, member });
    await db.expire(dailyKey, 7 * 86400); // 7 day TTL

    // All-time: only keep if it's the player's best
    const existingAllTime = await db.zrange(allTimeKey, 0, -1, { withScores: true });
    let shouldAddAllTime = true;
    for (let i = 0; i < existingAllTime.length; i += 2) {
      try {
        const parsed = typeof existingAllTime[i] === 'string' ? JSON.parse(existingAllTime[i]) : existingAllTime[i];
        if (parsed.playerId === pid) {
          const existingScore = Number(existingAllTime[i + 1]);
          if (score < existingScore) {
            await db.zrem(allTimeKey, existingAllTime[i]);
          } else {
            shouldAddAllTime = false;
          }
          break;
        }
      } catch {
        // Skip
      }
    }
    if (shouldAddAllTime) {
      await db.zadd(allTimeKey, { score, member });
    }

    // Get rank (daily)
    const rank = await db.zrank(dailyKey, member);
    const totalEntries = await db.zcard(dailyKey);

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
