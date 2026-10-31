'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';

export default function Sectors() {
  const t = useTranslations('sectors');
  const items = t.raw('items') as Array<{ icon: string; name: string; description: string }>;

  return (
    <section id="sectors" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
      <div className="container-site relative">
        <SectionHeading eyebrow={t('title')} title={t('subtitle')} text={t('text')} />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden bg-ink-900 p-7 transition-colors duration-300 hover:bg-[#0c1428] sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.22), transparent)' }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-2xl shadow-inner shadow-white/5">
                    {item.icon}
                  </span>
                  <span className="font-display text-sm font-bold tabular-nums text-white/15 transition-colors duration-300 group-hover:text-brand-light/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
