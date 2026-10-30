'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function AboutContent() {
  const t      = useTranslations('about');
  const locale = useLocale();
  const why    = t.raw('why') as Array<{ icon: string; title: string; text: string }>;

  return (
    <div style={{ background: '#080d1a' }}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/75 pointer-events-none" />
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(37,99,235,0.12) 0%, transparent 65%)' }}
        />
        <motion.div
          {...fadeUp()}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: '#60a5fa' }}>
            {t('title')}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            {t('heroHeadline')}
          </h1>
          <p className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtext')}
          </p>
        </motion.div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { titleKey: 'missionTitle', textKey: 'missionText', delay: 0 },
              { titleKey: 'visionTitle',  textKey: 'visionText',  delay: 0.1 },
            ] as const).map(({ titleKey, textKey, delay }) => (
              <motion.div
                key={titleKey}
                {...fadeUp(delay)}
                className="rounded-2xl p-8 border"
                style={{ background: '#0f172a', borderColor: '#1e293b' }}
              >
                <p className="text-2xl font-black text-white mb-3">{t(titleKey)}</p>
                <p className="text-white/60 leading-relaxed">{t(textKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Sitelya ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#060b14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>
              {t('whyTitle')}
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{t('whyTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {why.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl p-6 border cursor-default"
                style={{ background: '#0f172a', borderColor: '#1e293b' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              {t('ctaHeadline')}
            </h2>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #3b82f6 100%)' }}
            >
              {t('ctaButton')} →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
