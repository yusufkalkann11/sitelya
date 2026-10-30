'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { SiteliyaIcon } from './Logo';
import { EMAIL, WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const privacyHref = locale === 'tr' ? `/${locale}/gizlilik` : `/${locale}/privacy`;

  const links = [
    { href: `/${locale}#services`, label: nav('services') },
    { href: `/${locale}#how-it-works`, label: nav('howItWorks') },
    { href: `/${locale}/hakkimizda`, label: nav('about') },
    { href: `/${locale}/iletisim`, label: nav('contact') },
    { href: privacyHref, label: t('privacyPolicy') },
  ];

  return (
    <footer className="bg-[#080d14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo + tagline */}
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5 mb-3">
              <SiteliyaIcon size={26} />
              <span style={{
                fontFamily: 'var(--font-jakarta), Inter, sans-serif',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                paddingRight: '0.12em',
                paddingBottom: '0.05em',
                background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Sitelya
              </span>
            </Link>
            <p className="text-sm text-white/50">{t('tagline')}</p>
          </div>

          {/* Nav links */}
          <div className="md:text-center">
            <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">{t('links')}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">{t('contactTitle')}</h4>
            <a
              href={`mailto:${EMAIL}`}
              className="block text-sm text-white/50 hover:text-white transition-colors"
              translate="no"
            >
              {EMAIL}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="block mt-2 text-sm text-white/50 hover:text-white transition-colors">
              WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="block mt-2 text-sm text-white/50 hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{t('copyright')}</p>
          <Link href={privacyHref} className="text-xs text-white/30 hover:text-white/60 transition-colors">
            {t('privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
