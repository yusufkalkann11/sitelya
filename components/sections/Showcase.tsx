'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { BrowserFrame, ClinicScreen, RestaurantScreen, ShopScreen } from '../ui/Mockups';
import { Check } from '../ui/Icons';

const ACCENTS = ['text-amber-300', 'text-teal-300', 'text-violet-300'];
const GLOWS = ['rgba(245,158,11,0.18)', 'rgba(45,212,191,0.16)', 'rgba(167,139,250,0.18)'];
const URLS = ['restoraniniz.com', 'kliniginiz.com', 'magazaniz.com'];

export default function Showcase() {
  const t = useTranslations('showcase');
  const items = t.raw('items') as Array<{ tag: string; title: string; description: string; features: string[] }>;

  const screens = [
    <RestaurantScreen key="r" l={{ brand: t('mock.restaurantBrand'), headline: t('mock.restaurantHeadline'), cta: t('mock.restaurantCta'), menu: t('mock.restaurantMenu') }} />,
    <ClinicScreen key="c" l={{ brand: t('mock.clinicBrand'), headline: t('mock.clinicHeadline'), cta: t('mock.clinicCta'), slot: t('mock.clinicSlot') }} />,
    <ShopScreen key="s" l={{ brand: t('mock.shopBrand'), headline: t('mock.shopHeadline'), cta: t('mock.shopCta'), cart: t('mock.shopCart') }} />,
  ];

  return (
    <section id="work" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots opacity-40 mask-radial" />
      <div className="container-site relative">
        <SectionHeading eyebrow={t('title')} title={t('subtitle')} text={t('text')} />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group card relative flex flex-col overflow-hidden p-3 transition-colors duration-300 hover:border-white/15 ${
                i === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(closest-side, ${GLOWS[i]}, transparent)` }}
              />
              <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
                <BrowserFrame url={URLS[i]}>{screens[i]}</BrowserFrame>
                <span className="absolute bottom-2 right-2 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur">
                  {t('note')}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col px-3 pb-3 pt-6">
                <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${ACCENTS[i]}`}>{item.tag}</span>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.features.map((f) => (
                    <li key={f} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                      <Check className={`h-3 w-3 ${ACCENTS[i]}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
