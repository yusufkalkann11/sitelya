// Admin oturumu: "<bitiş zamanı>.<HMAC imzası>" biçiminde imzalı bir çerez.
// Web Crypto kullanır, böylece hem middleware (edge) hem sunucu tarafında çalışır.

export const SESSION_COOKIE = 'sitelya_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

const encoder = new TextEncoder();

async function hmac(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET en az 32 karakter olmalı.');
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function safeEqual(a: string, b: string) {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < Math.max(ab.length, bb.length); i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  return `${expires}.${await hmac(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  try {
    return safeEqual(sig, await hmac(expires));
  } catch {
    return false;
  }
}
