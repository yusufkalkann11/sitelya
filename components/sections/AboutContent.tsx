'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Reveal from '../ui/Reveal';
import BorderBeam from '../ui/BorderBeam';
import { ArrowRight } from '../ui/Icons';

export default function AboutContent() {
  const t       = useTranslations('about');
  const locale  = useLocale();
  const why     = t.raw('why') as Array<{ icon: string; title: string; text: string }>;
  const process = t.raw('process') as Array<{ number: string; title: string; text: string }>;
  const values  = t.raw('values.items') as string[];

  return (
    <div className="bg-ink">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid mask-radial" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[56rem] max-w-[140vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.3), transparent)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="container-site relative text-center"
        >
          <span className="eyebrow">{t('title')}</span>
          <h1 className="heading-xl mx-auto mt-6 max-w-4xl text-balance text-white">{t('heroHeadline')}</h1>
          <p className="lead mx-auto mt-6 max-w-2xl text-pretty">{t('heroSubtext')}</p>
        </motion.div>
      </section>

      {/* ── Who + Mission & Vision ────────────────────────────────── */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container-site grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="card relative overflow-hidden p-8 lg:col-span-3 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white lg:col-span-4 lg:text-3xl">{t('who.title')}</h2>
              <p className="text-base leading-relaxed text-slate-300 lg:col-span-8 lg:text-lg">{t('who.text')}</p>
            </div>
          </Reveal>
          {([
            { titleKey: 'missionTitle', textKey: 'missionText', delay: 0 },
            { titleKey: 'visionTitle',  textKey: 'visionText',  delay: 0.08 },
          ] as const).map(({ titleKey, textKey, delay }) => (
            <Reveal key={titleKey} delay={delay} className="card relative overflow-hidden p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
              <p className="relative font-display text-xl font-bold text-white">{t(titleKey)}</p>
              <p className="relative mt-3 leading-relaxed text-slate-400">{t(textKey)}</p>
            </Reveal>
          ))}
          <Reveal delay={0.16} className="card p-8">
            <p className="font-display text-xl font-bold text-white">{t('values.title')}</p>
            <ul className="mt-4 space-y-2.5">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-light" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Why Sitelya ───────────────────────────────────────────── */}
      <section className="relative bg-ink-900 py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
        <div className="container-site">
          <Reveal className="text-center">
            <span className="eyebrow">Sitelya</span>
            <h2 className="heading-lg mt-5 text-white">{t('whyTitle')}</h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="card group p-6 transition-colors duration-300 hover:border-brand/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-2xl">
                  {item.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32">
        <div className="container-site">
          <Reveal className="text-center">
            <h2 className="heading-lg text-white">{t('processTitle')}</h2>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-ink p-7"
              >
                <span className="font-display text-3xl font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(96,165,250,0.6)]">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="pb-24 sm:pb-32">
        <div className="container-site">
          <Reveal className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-[#0f1d42] via-[#0b1430] to-[#070c1c] px-6 py-14 text-center sm:px-12 sm:py-20">
            <BorderBeam size={200} duration={10} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-radial" />
            <div className="relative">
              <h2 className="heading-lg mx-auto max-w-3xl text-balance text-white">{t('ctaHeadline')}</h2>
              <Link href={`/${locale}/iletisim`} className="btn-primary group mt-9 !px-7 !py-4">
                {t('ctaButton')}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
