import { NextResponse } from 'next/server';
import { db, isDbConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basit IP başına sınır: 10 dakikada en fazla 5 gönderim.
// Sunucusuz ortamda her örnek kendi sayacını tutar; kaba bir spam freni olarak yeterli.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function str(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Bal küpü alanı: botlar doldurur, insanlar görmez. Botu uyandırmamak için başarılı dön.
  if (str(body._gotcha, 200)) return NextResponse.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const lead = {
    name: str(body.name, 120),
    email: str(body.email, 200).toLowerCase(),
    phone: str(body.phone, 40) || null,
    package: str(body.package, 60) || null,
    message: str(body.message, 5000),
    locale: body.locale === 'en' ? 'en' : 'tr',
    source: str(body.source, 200) || null,
  };

  if (!lead.name || !lead.message || !EMAIL_RE.test(lead.email) || body.kvkk !== true) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  if (!isDbConfigured()) {
    console.error('[contact] Supabase ortam değişkenleri tanımlı değil.');
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const { error } = await db().from('leads').insert(lead);
  if (error) {
    console.error('[contact] insert failed:', error.message);
    return NextResponse.json({ error: 'db' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
