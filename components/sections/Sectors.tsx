'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Sectors() {
  const t = useTranslations('sectors');
  const items = t.raw('items') as Array<{ icon: string; name: string; description: string }>;

  return (
    <section id="sectors" className="py-28 relative overflow-hidden" style={{ background: '#0a0f1a' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>{t('title')}</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">{t('subtitle')}</h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">{t('text')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 border border-white/[0.07] hover:border-[#2563EB]/40 transition-colors duration-300 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[#2563EB]/10 border border-[#2563EB]/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#60a5fa] transition-colors duration-300">{item.name}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
