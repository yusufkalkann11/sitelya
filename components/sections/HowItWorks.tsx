'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const STEP_ICONS = ['💬', '🎨', '⚙️', '🚀'];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="how-it-works" className="py-28 bg-[#0a0f1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>
            {t('title')}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">{t('subtitle')}</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px">
            <div className="mx-auto max-w-4xl h-full bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number bubble */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 group-hover:border-[#2563EB]/60"
                    style={{
                      background: 'rgba(37,99,235,0.08)',
                      borderColor: 'rgba(37,99,235,0.2)',
                    }}
                  >
                    <span className="text-2xl mb-0.5">{STEP_ICONS[i]}</span>
                    <span className="text-xs font-black text-[#60a5fa] tracking-wider">{step.number}</span>
                  </motion.div>
                  {/* Connector dot */}
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-3 w-2 h-2 rounded-full bg-[#2563EB]/40 group-last:hidden" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#60a5fa] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed max-w-[200px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
