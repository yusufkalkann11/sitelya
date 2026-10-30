'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const ICONS = ['🚀', '⚡', '🛍️', '🏢'];

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  const items = t.raw('items') as Array<{
    name: string; price: string; description: string; features: string[]; popular?: boolean;
  }>;

  return (
    <section id="services" className="py-28 relative overflow-hidden" style={{ background: '#080d1a' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#2563EB]/10 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>{t('title')}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">{t('subtitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-6 flex flex-col cursor-default transition-shadow duration-300 ${
                item.popular ? 'border-2 border-[#2563EB]' : 'border border-white/8 hover:border-[#2563EB]/40'
              }`}
              style={{
                background: item.popular
                  ? 'linear-gradient(135deg, #1d4ed8 0%, #2563EB 60%, #3b82f6 100%)'
                  : 'rgba(255,255,255,0.03)',
                boxShadow: item.popular ? '0 20px 60px rgba(37,99,235,0.35)' : undefined,
              }}
            >
              {item.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-white text-[#2563EB] text-xs font-black rounded-full shadow-lg">{t('popular')}</span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${item.popular ? 'bg-white/15' : 'bg-[#2563EB]/10'}`}>
                {ICONS[i]}
              </div>

              <div className="mb-5">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${item.popular ? 'text-blue-200' : 'text-white/40'}`}>{item.name}</p>
                <p className="text-4xl font-black text-white mb-2">{item.price}</p>
                <p className={`text-sm leading-relaxed ${item.popular ? 'text-white/80' : 'text-white/45'}`}>{item.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${item.popular ? 'bg-white/20' : 'bg-[#2563EB]/20'}`}>
                      <svg className={`w-2.5 h-2.5 ${item.popular ? 'text-white' : 'text-[#60a5fa]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className={item.popular ? 'text-white/90' : 'text-white/65'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/iletisim?paket=${encodeURIComponent(item.name)}`}
                className={`block text-center text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${
                  item.popular
                    ? 'bg-white text-[#2563EB] hover:bg-blue-50'
                    : 'bg-[#2563EB]/10 text-white border border-[#2563EB]/25 hover:bg-[#2563EB] hover:border-[#2563EB] hover:shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                {t('getStarted')} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
