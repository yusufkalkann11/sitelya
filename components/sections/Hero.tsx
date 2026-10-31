'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Bolt, Check, Mobile, Search, Shield } from '../ui/Icons';
import { BrowserFrame, Line, PhoneFrame } from '../ui/Mockups';

const PROMISE_ICONS = [Bolt, Mobile, Shield, Search];

export default function Hero() {
  const t = useTranslations('hero');
  const p = useTranslations('promises');
  const locale = useLocale();
  const promises = p.raw('items') as Array<{ icon: string; title: string; description: string }>;

  const words = t('headline').split(' ');
  const plain = words.slice(0, -2).join(' ');
  const accent = words.slice(-2).join(' ');

  // Mockup tilts back to flat as it scrolls into view
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'start 35%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  // CSS entrance (not JS) so the headline paints before hydration — better LCP
  const fade = (delay: number) => ({
    className: 'animate-fade-up',
    style: { animationDelay: `${delay}s` },
  });

  return (
    <section className="relative overflow-hidden bg-ink pb-20 sm:pb-28">
      {/* ── Background ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-radial" />
        {/* Spotlight beams */}
        <div
          className="absolute -top-[30%] left-1/2 h-[80rem] w-[80rem] -translate-x-1/2 opacity-70"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(37,99,235,0.0) 140deg, rgba(96,165,250,0.22) 170deg, rgba(37,99,235,0.35) 180deg, rgba(96,165,250,0.22) 190deg, transparent 220deg, transparent 360deg)',
            WebkitMaskImage: 'radial-gradient(closest-side, #000 20%, transparent 75%)',
            maskImage: 'radial-gradient(closest-side, #000 20%, transparent 75%)',
          }}
        />
        <motion.div
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[22rem] h-[34rem] w-[60rem] max-w-[140vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.35), transparent)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ── Copy ───────────────────────────────────────────────── */}
      <div className="container-site relative z-10 pt-32 text-center sm:pt-40">
        <div {...fade(0)}>
          <span className="eyebrow">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-light" />
            </span>
            {t('badge')}
          </span>
        </div>

        <h1 style={fade(0.08).style} className="animate-fade-up heading-xl mx-auto mt-7 max-w-5xl text-balance text-white">
          {plain}{' '}
          <span className="gradient-text whitespace-nowrap pr-1">{accent}</span>
        </h1>

        <p style={fade(0.16).style} className="animate-fade-up lead mx-auto mt-6 max-w-2xl text-pretty">
          {t('subtext')}
        </p>

        <div style={fade(0.24).style} className="animate-fade-up mt-9 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center">
          <Link href={`/${locale}/iletisim`} className="btn-primary group !px-7 !py-4">
            {t('cta1')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link href={`/${locale}#services`} className="btn-secondary !px-7 !py-4">
            {t('cta2')}
          </Link>
        </div>

        {/* Trust row — what every package includes */}
        <div style={fade(0.32).style} className="animate-fade-up mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t('trustLabel')}</p>
          <ul className="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-7">
            {promises.map((item, i) => {
              const Icon = PROMISE_ICONS[i] ?? Check;
              return (
                <li key={item.title} className="flex items-center gap-2 text-left text-sm text-slate-300" title={item.description}>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand-light">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Product stage ──────────────────────────────────────── */}
      <div ref={stageRef} className="container-site relative z-10 mt-16 sm:mt-20" style={{ perspective: 1400 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, scale, transformOrigin: 'center top' }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Glow behind frame */}
          <div aria-hidden="true" className="absolute -inset-x-6 -inset-y-4 rounded-[2rem] bg-brand/20 blur-3xl" />

          <BrowserFrame url="isletmeniz.com" className="relative">
            <HeroScreen />
          </BrowserFrame>

          {/* Phone overlapping the browser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-10 -right-1 w-[27%] max-w-[190px] sm:-bottom-8 sm:-right-6 sm:w-[24%] lg:-right-10"
          >
            <PhoneFrame>
              <PhoneScreen />
            </PhoneFrame>
          </motion.div>

          {/* Floating chips (tablet and up — too crowded on phones) */}
          <Chip className="hidden sm:flex sm:-left-10 sm:top-[64%] lg:-left-16" delay={1}>{t('mock.chipMobile')}</Chip>
          <Chip className="hidden sm:flex sm:-bottom-5 sm:left-[12%]" delay={1.15}>{t('mock.chipSeo')}</Chip>
          <Chip className="hidden sm:flex sm:-top-4 sm:right-[28%]" delay={1.3}>{t('mock.chipSecure')}</Chip>
        </motion.div>
      </div>
    </section>
  );

  function HeroScreen() {
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-b from-[#0d1730] to-[#0a1124] p-4 text-left sm:p-8">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-xs font-bold text-white sm:text-sm">
            <span className="h-4 w-4 rounded-md bg-gradient-to-br from-brand-light to-brand sm:h-5 sm:w-5" />
            {t('mock.brand')}
          </span>
          <div className="hidden gap-5 sm:flex">
            <Line w="42px" /><Line w="42px" /><Line w="42px" />
          </div>
          <span className="rounded-md bg-brand px-2 py-1 text-[9px] font-semibold text-white sm:px-3 sm:text-[11px]">{t('mock.cta')}</span>
        </div>

        <div className="mt-5 grid grid-cols-12 gap-4 sm:mt-10 sm:gap-6">
          <div className="col-span-7">
            <p className="font-display text-base font-extrabold leading-[1.1] tracking-tight text-white min-[400px]:text-lg sm:text-3xl lg:text-4xl">
              {t('mock.headline')}
            </p>
            <p className="mt-2 text-[10px] text-slate-400 sm:mt-4 sm:text-sm">{t('mock.sub')}</p>
            <div className="mt-3 flex gap-2 sm:mt-6">
              <span className="rounded-md bg-brand px-2.5 py-1 text-[9px] font-semibold text-white sm:px-4 sm:py-2 sm:text-xs">{t('mock.cta')}</span>
              <span className="rounded-md border border-white/15 px-2.5 py-1 text-[9px] text-slate-300 sm:px-4 sm:py-2 sm:text-xs">→</span>
            </div>
          </div>
          <div className="col-span-5">
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(96,165,250,0.55),rgba(37,99,235,0.25)_40%,transparent_70%)]">
              <div className="absolute inset-x-3 bottom-3 rounded-md border border-white/10 bg-[#0b1222]/80 p-2 backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-3">
                <Line w="60%" className="bg-white/25" />
                <Line w="85%" className="mt-1.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden grid-cols-3 gap-4 sm:mt-8 sm:grid">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
              <div className="h-6 w-6 rounded-md bg-brand/30" />
              <Line w="70%" className="mt-3 bg-white/20" />
              <Line w="90%" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function PhoneScreen() {
    return (
      <div className="aspect-[9/19] bg-gradient-to-b from-[#0d1730] to-[#0a1124] px-3 pb-3 pt-7 text-left">
        <div className="flex items-center justify-between">
          <span className="h-3 w-3 rounded bg-gradient-to-br from-brand-light to-brand" />
          <span className="flex flex-col gap-0.5">
            <span className="h-0.5 w-3 rounded bg-white/50" />
            <span className="h-0.5 w-3 rounded bg-white/50" />
          </span>
        </div>
        <p className="mt-4 font-display text-[11px] font-extrabold leading-tight text-white sm:text-xs">{t('mock.phoneTitle')}</p>
        <Line w="90%" className="mt-2" />
        <Line w="70%" className="mt-1" />
        <div className="mt-3 aspect-[4/3] rounded-md bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.6),rgba(37,99,235,0.2)_50%,transparent_75%)]" />
        <div className="mt-3 space-y-1.5">
          <div className="h-5 rounded-md bg-white/[0.05]" />
          <div className="h-5 rounded-md bg-white/[0.05]" />
        </div>
        <span className="mt-3 block rounded-md bg-[#25D366] py-1 text-center text-[8px] font-bold text-white">{t('mock.phoneCta')}</span>
      </div>
    );
  }
}

function Chip({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b1222]/85 py-1.5 pl-1.5 pr-3 text-[11px] font-semibold text-white shadow-xl shadow-black/40 backdrop-blur-md sm:text-xs ${className}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
        <Check className="h-3 w-3" />
      </span>
      {children}
    </motion.div>
  );
}
