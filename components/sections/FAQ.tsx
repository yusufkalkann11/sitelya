'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { WHATSAPP_URL } from '@/lib/site';
import Reveal from '../ui/Reveal';
import { WhatsAppGlyph } from '../ui/Icons';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
      <div className="container-site relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">{t('title')}</span>
            <h2 className="heading-lg mt-5 text-balance text-white">{t('subtitle')}</h2>
            <div className="card mt-8 hidden p-6 lg:block">
              <p className="text-sm text-slate-400">{t('more')}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4 w-full">
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                {t('ask')}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={`text-base font-semibold transition-colors sm:text-lg ${isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {item.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-white/15 text-slate-300 group-hover:border-white/30'
                        }`}
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-12 text-[0.95rem] leading-relaxed text-slate-400">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-slate-400 lg:hidden">
            {t('more')}{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-light transition-colors hover:text-white">
              {t('ask')} →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
