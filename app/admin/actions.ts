'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db, LEAD_STATUSES, type LeadStatus } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin';
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, safeEqual } from '@/lib/session';

// Kaba kuvvet denemelerine karşı IP başına 15 dakikada 10 hatalı giriş.
const failedLogins = new Map<string, number[]>();

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (failedLogins.get(ip) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 10) return { error: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' };

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.ADMIN_SESSION_SECRET) {
    return { error: 'Sunucuda ADMIN_PASSWORD veya ADMIN_SESSION_SECRET tanımlı değil.' };
  }

  const password = String(formData.get('password') ?? '');
  if (!safeEqual(password, expected)) {
    failedLogins.set(ip, [...recent, now]);
    await new Promise((r) => setTimeout(r, 600));
    return { error: 'Şifre hatalı.' };
  }

  failedLogins.delete(ip);
  cookies().set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  redirect('/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}

function refresh(id?: string) {
  revalidatePath('/admin', 'layout');
  if (id) revalidatePath(`/admin/leads/${id}`);
}

export async function updateStatus(id: string, status: LeadStatus) {
  await requireAdmin();
  if (!LEAD_STATUSES.includes(status)) throw new Error('Geçersiz durum');
  const { error } = await db().from('leads').update({ status, is_read: true }).eq('id', id);
  if (error) throw new Error(error.message);
  refresh(id);
}

export async function setRead(id: string, isRead: boolean) {
  await requireAdmin();
  const { error } = await db().from('leads').update({ is_read: isRead }).eq('id', id);
  if (error) throw new Error(error.message);
  refresh(id);
}

export async function saveNotes(id: string, notes: string) {
  await requireAdmin();
  const { error } = await db().from('leads').update({ notes: notes.slice(0, 10000) }).eq('id', id);
  if (error) throw new Error(error.message);
  refresh(id);
}

export async function deleteLead(id: string) {
  await requireAdmin();
  const { error } = await db().from('leads').delete().eq('id', id);
  if (error) throw new Error(error.message);
  refresh();
  redirect('/admin/leads');
}

export async function bulkUpdate(ids: string[], action: 'read' | 'unread' | LeadStatus | 'delete') {
  await requireAdmin();
  if (!ids.length) return;
  const q = db().from('leads');
  const { error } =
    action === 'delete' ? await q.delete().in('id', ids)
    : action === 'read' || action === 'unread' ? await q.update({ is_read: action === 'read' }).in('id', ids)
    : LEAD_STATUSES.includes(action) ? await q.update({ status: action }).in('id', ids)
    : { error: { message: 'Geçersiz işlem' } };
  if (error) throw new Error(error.message);
  refresh();
}
