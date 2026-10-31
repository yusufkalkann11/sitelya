'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { WHATSAPP_URL } from '@/lib/site';
import Reveal from '../ui/Reveal';
import BorderBeam from '../ui/BorderBeam';
import { ArrowRight, WhatsAppGlyph } from '../ui/Icons';

export default function CTABand() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="relative bg-ink py-20 sm:py-24">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-[#0f1d42] via-[#0b1430] to-[#070c1c] px-6 py-14 text-center sm:px-12 sm:py-20">
          <BorderBeam size={220} duration={10} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-radial" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] max-w-[140%] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(96,165,250,0.35), transparent)' }}
          />
          <div className="relative">
            <h2 className="heading-lg mx-auto max-w-3xl text-balance text-white">{t('title')}</h2>
            <p className="lead mx-auto mt-5 max-w-xl text-pretty text-slate-300">{t('text')}</p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center">
              <Link href={`/${locale}/iletisim`} className="btn-primary group !px-7 !py-4">
                {t('primary')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-7 !py-4">
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                {t('secondary')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
