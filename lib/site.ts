export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sitelya.vercel.app').replace(/\/$/, '');
export const WHATSAPP_URL = 'https://wa.me/905075909915';
export const INSTAGRAM_URL = 'https://www.instagram.com/sitelya.agency/';
export const EMAIL = 'hello.sitelya@outlook.com';
export const LOCALES = ['tr', 'en'] as const;

type LocalizedPath = string | { tr: string; en: string };

export function alternatesFor(locale: string, path: LocalizedPath = '') {
  const paths = typeof path === 'string' ? { tr: path, en: path } : path;
  return {
    canonical: `/${locale}${locale === 'en' ? paths.en : paths.tr}`,
    languages: { tr: `/tr${paths.tr}`, en: `/en${paths.en}`, 'x-default': `/tr${paths.tr}` },
  };
}
