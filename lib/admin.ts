import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from './session';
export { STATUS_META } from './lead-status';

export async function requireAdmin() {
  if (!(await verifySessionToken(cookies().get(SESSION_COOKIE)?.value))) {
    redirect('/admin/login');
  }
}


export function formatDate(iso: string, withTime = true) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit', month: 'short', year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: 'Europe/Istanbul',
  }).format(new Date(iso));
}

export function timeAgo(iso: string) {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return 'şimdi';
  if (minutes < 60) return `${minutes} dk önce`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} sa önce`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} gün önce`;
  return formatDate(iso, false);
}

export function whatsappLink(phone: string | null) {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `90${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith('5')) digits = `90${digits}`;
  return digits.length >= 10 ? `https://wa.me/${digits}` : null;
}
