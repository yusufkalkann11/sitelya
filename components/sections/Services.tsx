'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import BorderBeam from '../ui/BorderBeam';
import { ArrowRight, Bolt, Check, Globe, Rocket, Sparkle } from '../ui/Icons';

const ICONS = [Rocket, Sparkle, Bolt, Globe];

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  const items = t.raw('items') as Array<{
    name: string; price: string; description: string; features: string[]; popular?: boolean;
  }>;

  return (
    <section id="services" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[30rem] w-[56rem] max-w-[120vw] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.14), transparent)' }}
      />

      <div className="container-site relative">
        <SectionHeading eyebrow={t('title')} title={t('subtitle')} />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Rocket;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`group relative flex flex-col rounded-2xl p-6 transition-colors duration-300 ${
                  item.popular
                    ? 'border border-brand/50 bg-gradient-to-b from-brand/[0.18] via-[#0d1730] to-[#0b1222] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.7)] lg:-my-3 lg:py-9'
                    : 'card hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                {item.popular && (
                  <>
                    <BorderBeam size={140} duration={7} />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand to-brand-light px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-brand/40">
                      {t('popular')}
                    </span>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    item.popular ? 'border-brand-light/40 bg-brand/25 text-white' : 'border-white/10 bg-white/[0.04] text-brand-light'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.name}</span>
                </div>

                <p className="mt-7 font-display text-5xl font-extrabold tracking-tight text-white">{item.price}</p>
                <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-slate-400">{item.description}</p>

                <div className="my-6 h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent" />

                <ul className="flex-1 space-y-3">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        item.popular ? 'bg-brand text-white' : 'bg-brand/15 text-brand-light'
                      }`}>
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/iletisim?paket=${encodeURIComponent(item.name)}`}
                  className={`mt-8 w-full ${item.popular ? 'btn-primary' : 'btn-secondary group-hover:border-brand/50 group-hover:bg-brand/15'}`}
                >
                  {t('getStarted')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
