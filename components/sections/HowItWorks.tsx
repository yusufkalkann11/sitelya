'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { Chat, Code, Palette, Rocket } from '../ui/Icons';

const STEP_ICONS = [Chat, Palette, Code, Rocket];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  // The timeline line fills up as the user scrolls through the steps
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-radial" />

      <div className="container-site relative">
        <SectionHeading eyebrow={t('title')} title={t('subtitle')} />

        <div ref={listRef} className="relative mx-auto mt-16 max-w-xl lg:max-w-none">
          {/* Track — vertical on mobile, horizontal on desktop */}
          <div aria-hidden="true" className="absolute bottom-6 left-[1.6875rem] top-6 w-px bg-white/10 lg:hidden">
            <motion.div style={{ height: fill }} className="w-full bg-gradient-to-b from-brand-light to-brand" />
          </div>
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-white/10 lg:block">
            <motion.div style={{ width: fill }} className="h-full bg-gradient-to-r from-brand to-brand-light" />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Chat;
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-brand/30 bg-[#0b1430] text-brand-light shadow-[0_0_0_6px_rgba(6,10,20,1),0_10px_30px_-10px_rgba(37,99,235,0.7)] transition-all duration-300 group-hover:border-brand-light/70 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="lg:mt-6">
                  <span className="font-display text-xs font-bold tracking-[0.2em] text-brand-light">{step.number}</span>
                  <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 lg:mx-auto lg:max-w-[15rem]">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
