'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { SiteliyaIcon } from './Logo';
import { EMAIL, WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/site';
import { ArrowRight, Instagram, Mail, WhatsAppGlyph } from './ui/Icons';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const privacyHref = locale === 'tr' ? `/${locale}/gizlilik` : `/${locale}/privacy`;

  const links = [
    { href: `/${locale}#services`, label: nav('services') },
    { href: `/${locale}#work`, label: nav('work') },
    { href: `/${locale}#how-it-works`, label: nav('howItWorks') },
    { href: `/${locale}#faq`, label: nav('faq') },
    { href: `/${locale}/hakkimizda`, label: nav('about') },
    { href: `/${locale}/iletisim`, label: nav('contact') },
  ];

  const socials = [
    { href: `mailto:${EMAIL}`, label: EMAIL, Icon: Mail, external: false },
    { href: WHATSAPP_URL, label: 'WhatsApp', Icon: WhatsAppGlyph, external: true },
    { href: INSTAGRAM_URL, label: 'Instagram', Icon: Instagram, external: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#04070f]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.18), transparent)' }}
      />

      <div className="container-site relative py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Logo + tagline + CTA */}
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5">
              <SiteliyaIcon size={28} />
              <span className="font-display text-[1.2rem] font-extrabold leading-none tracking-[-0.05em] pb-[0.05em] pr-[0.12em] gradient-text">
                Sitelya
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{t('tagline')}</p>
            <div className="mt-7">
              <p className="font-display text-lg font-bold text-white">{t('ctaTitle')}</p>
              <Link href={`/${locale}/iletisim`} className="btn-primary mt-4">
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t('links')}</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t('contactTitle')}</h4>
            <ul className="mt-4 space-y-3">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    translate="no"
                    className="group inline-flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-colors group-hover:border-brand/50 group-hover:text-brand-light">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">{t('copyright')}</p>
          <Link href={privacyHref} className="text-xs text-slate-500 transition-colors hover:text-slate-300">
            {t('privacyPolicy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
