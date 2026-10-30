import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './lib/session';

const intl = createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
