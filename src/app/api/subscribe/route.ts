import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'subscribers.json');

    await fs.mkdir(dataDir, { recursive: true });

    let current: { email: string; subscribedAt: string }[] = [];
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      current = JSON.parse(raw || '[]');
    } catch (e) {
      current = [];
    }

    // simple dedupe
    if (!current.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
      current.push({ email, subscribedAt: new Date().toISOString() });
      await fs.writeFile(filePath, JSON.stringify(current, null, 2), 'utf8');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
