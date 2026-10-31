'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/site';
import SectionHeading from '../ui/SectionHeading';
import BorderBeam from '../ui/BorderBeam';
import { ArrowRight, Instagram, Mail, WhatsAppGlyph } from '../ui/Icons';

export default function Contact({ defaultPackage = '' }: { defaultPackage?: string }) {
  const t      = useTranslations('contact');
  const s      = useTranslations('services');
  const locale = useLocale();
  const packages = (s.raw('items') as Array<{ name: string; price: string }>);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [kvkk, setKvkk]     = useState(false);
  const [form, setForm]      = useState({
    name: '', email: '', phone: '',
    package: packages.some((p) => p.name === defaultPackage) ? defaultPackage : '',
    message: '',
  });
  const [gotcha, setGotcha] = useState('');

  const nextSteps = t.raw('next') as string[];
  const channels = [
    { href: WHATSAPP_URL, label: 'WhatsApp', value: '+90 507 590 99 15', Icon: WhatsAppGlyph, external: true },
    { href: `mailto:${EMAIL}`, label: t('email'), value: EMAIL, Icon: Mail, external: false },
    { href: INSTAGRAM_URL, label: 'Instagram', value: '@sitelyaweb', Icon: Instagram, external: true },
  ];

  const privacyHref = locale === 'tr' ? `/${locale}/gizlilik` : `/${locale}/privacy`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkk) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          locale,
          source: window.location.pathname + window.location.search,
          kvkk: true,
          _gotcha: gotcha,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 hover:border-white/20 focus:border-brand-light/60 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-brand/20';
  const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400';

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-t" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(37,99,235,0.16), transparent)' }}
      />

      <div className="container-site relative">
        <SectionHeading eyebrow={t('title')} title={t('headline')} text={t('subtext')} />

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Side info ─────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="order-2 space-y-6 lg:order-1 lg:col-span-5"
          >
            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{t('channelsTitle')}</h3>
              <ul className="mt-4 space-y-2">
                {channels.map(({ href, label, value, Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-xl border border-transparent p-2.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-light transition-colors group-hover:border-brand/50">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-slate-500">{label}</span>
                        <span className="block truncate text-sm font-medium text-white" translate="no">{value}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-slate-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{t('nextTitle')}</h3>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/15 font-display text-xs font-bold text-brand-light">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>

          {/* ── Form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2 lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e1730] to-[#0a1122] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-9">
              <BorderBeam size={160} duration={12} />
              {status === 'sent' ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <svg className="h-8 w-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-white" role="status">{t('success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="_gotcha" value={gotcha} onChange={(e) => setGotcha(e.target.value)}
                    style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className={labelClass}>{t('name')}</label>
                      <input
                        id="cf-name" type="text" required autoComplete="name" placeholder={t('namePlaceholder')} value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className={labelClass}>{t('email')}</label>
                      <input
                        id="cf-email" type="email" required autoComplete="email" placeholder={t('emailPlaceholder')} value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-phone" className={labelClass}>{t('phone')}</label>
                      <input
                        id="cf-phone" type="tel" autoComplete="tel" placeholder={t('phonePlaceholder')} value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-package" className={labelClass}>{t('package')}</label>
                      <div className="relative">
                        <select
                          id="cf-package"
                          value={form.package}
                          onChange={(e) => setForm({ ...form, package: e.target.value })}
                          className={`${inputClass} cursor-pointer appearance-none pr-10 [&>option]:bg-[#0b1222]`}
                        >
                          <option value="">{t('packageUndecided')}</option>
                          {packages.map((p) => (
                            <option key={p.name} value={p.name}>{p.name} ({p.price})</option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-message" className={labelClass}>{t('message')}</label>
                    <textarea
                      id="cf-message" required rows={5} placeholder={t('messagePlaceholder')} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <label className="group flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input type="checkbox" required checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="peer sr-only" />
                      <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-light ${kvkk ? 'border-brand bg-brand' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                        {kvkk && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs leading-relaxed text-slate-400">
                      {t('kvkkPrefix')}{' '}
                      <Link href={privacyHref} target="_blank" rel="noopener noreferrer"
                        className="text-brand-light underline underline-offset-2 transition-colors hover:text-white">
                        {t('kvkkLink')}
                      </Link>
                      {t('kvkkSuffix')}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'sending' || !kvkk}
                    className="btn-primary w-full !py-4 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? t('sending') : <>{t('send')} <ArrowRight className="h-4 w-4" /></>}
                  </button>

                  {status === 'error' && (
                    <p className="text-center text-sm text-red-400" role="alert">{t('error')}</p>
                  )}
                </form>
              )}

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-wider text-slate-500">{t('or')}</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#25D366]/70 hover:bg-[#25D366]/20"
              >
                <WhatsAppGlyph className="h-4 w-4 text-[#25D366]" />
                {t('whatsappDirect')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
