import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

// In-memory rate limiting (per-instance, resets on redeploy)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const lastSubmission = rateLimitMap.get(ip);
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_MS) {
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Please wait 5 minutes between feedback submissions.' },
      { status: 429 }
    );
  }

  let body: {
    message?: string;
    email?: string;
    context?: Record<string, unknown>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { message, email, context } = body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (message.length > 2000) {
    return NextResponse.json({ error: 'Message too long (max 2000 chars)' }, { status: 400 });
  }

  const feedback = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    message: message.trim(),
    email: email?.trim() || null,
    context: context || {},
    ip: ip.substring(0, 20), // Truncate for privacy
  };

  try {
    const dataDir = join(process.cwd(), 'data');
    const filePath = join(dataDir, 'feedback.json');

    await mkdir(dataDir, { recursive: true });

    let feedbackList: unknown[] = [];
    try {
      const existing = await readFile(filePath, 'utf-8');
      feedbackList = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    feedbackList.push(feedback);
    await writeFile(filePath, JSON.stringify(feedbackList, null, 2));

    rateLimitMap.set(ip, Date.now());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback. Please try again later.' },
      { status: 500 }
    );
  }
}
