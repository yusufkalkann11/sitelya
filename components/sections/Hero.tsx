'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const p = useTranslations('promises');
  const locale = useLocale();

  const promises = p.raw('items') as Array<{ icon: string; title: string; description: string }>;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080d1a', backgroundImage: "url('/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-48 -right-32 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 40, -10, 0], y: [0, -20, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)' }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 right-20 w-14 h-14 border border-blue-500/15 rounded-xl"
        />
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [45, 60, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-40 left-24 w-10 h-10 border border-white/8 rotate-45"
        />
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-48 left-20 w-3 h-3 rounded-full bg-blue-500/40"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-56 right-28 w-2 h-2 rounded-full bg-sky-400/50"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-16 w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: 'rgba(37,99,235,0.12)', borderColor: 'rgba(37,99,235,0.3)', color: '#60a5fa' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            {t('badge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[2.5rem] min-[400px]:text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6 text-white"
        >
          {t('headline').split(' ').slice(0, -2).join(' ')}{' '}
          <span style={{
            background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('headline').split(' ').slice(-2).join(' ')}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <Link
            href={`/${locale}/iletisim`}
            className="group px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 text-sm"
          >
            {t('cta1')}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <Link
            href={`/${locale}#services`}
            className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 text-sm"
          >
            {t('cta2')}
          </Link>
        </motion.div>

        {/* Promise cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl p-4 text-left border transition-colors duration-300 cursor-default"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
              <div className="text-xs text-white/45 leading-relaxed">{item.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080d14] to-transparent pointer-events-none" />

    </section>
  );
}
