import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db, isDbConfigured, LEAD_STATUSES, type Lead, type LeadStatus } from '@/lib/supabase';
import { STATUS_META, formatDate } from '@/lib/admin';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

function csvCell(value: string | null | undefined) {
  let v = value ?? '';
  // Excel'de formül enjeksiyonunu önle
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  return `"${v.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  if (!(await verifySessionToken(cookies().get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isDbConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const sp = new URL(request.url).searchParams;
  const status = sp.get('status') ?? '';
  const pkg = sp.get('package') ?? '';
  const read = sp.get('read') ?? '';
  const q = (sp.get('q') ?? '').replace(/[,()*%\\]/g, ' ').trim().slice(0, 100);

  let query = db().from('leads').select('*');
  if (q) query = query.or(['name', 'email', 'phone', 'message', 'notes'].map((c) => `${c}.ilike.*${q}*`).join(','));
  if (LEAD_STATUSES.includes(status as LeadStatus)) query = query.eq('status', status);
  else query = query.neq('status', 'spam');
  if (pkg === '__none') query = query.is('package', null);
  else if (pkg) query = query.eq('package', pkg);
  if (read === 'read' || read === 'unread') query = query.eq('is_read', read === 'read');

  const { data, error } = await query.order('created_at', { ascending: false }).limit(10000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const header = ['Tarih', 'Ad Soyad', 'E-posta', 'Telefon', 'Paket', 'Durum', 'Okundu', 'Dil', 'Mesaj', 'Notlar', 'Sayfa'];
  const rows = (data as Lead[]).map((l) => [
    formatDate(l.created_at), l.name, l.email, l.phone, l.package,
    STATUS_META[l.status]?.label ?? l.status, l.is_read ? 'Evet' : 'Hayır',
    l.locale.toUpperCase(), l.message, l.notes, l.source,
  ].map(csvCell).join(';'));

  // BOM + ";" ayırıcı: Türkçe Excel'de doğrudan doğru açılır
  const csv = '﻿' + [header.map(csvCell).join(';'), ...rows].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="sitelya-talepler-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
