import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './lib/session';

const intl = createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always'
});

// www, asıl alan adına kalıcı olarak yönlendirilir.
// TODO: sitelyaweb.com her ağdan erişilebilir olunca 'sitelya.vercel.app' da eklenecek.
const CANONICAL_HOST = 'sitelyaweb.com';
const REDIRECT_HOSTS = new Set(['www.sitelyaweb.com']);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const host = request.headers.get('host')?.toLowerCase();
  if (host && REDIRECT_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.host = CANONICAL_HOST;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname === '/admin/login') return NextResponse.next();
    const ok = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    return ok ? NextResponse.next() : NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return intl(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
