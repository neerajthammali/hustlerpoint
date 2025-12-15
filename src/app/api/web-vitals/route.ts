import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const file = path.join(dataDir, 'web-vitals.jsonl');
    const line = JSON.stringify({ ...payload, receivedAt: new Date().toISOString() });
    await fs.appendFile(file, line + '\n', 'utf8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
