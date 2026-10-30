'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FORMSPREE_URL, WHATSAPP_URL } from '@/lib/site';

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

  const privacyHref = locale === 'tr' ? `/${locale}/gizlilik` : `/${locale}/privacy`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkk) return;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          package: form.package || t('packageUndecided'),
          language: locale,
          _subject: 'Sitelya - Yeni İletişim Formu',
          _kvkk: 'accepted',
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition-all duration-200 border border-[#1e293b]';

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: '#080d1a' }}>
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.08) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#60a5fa' }}>
            {t('title')}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            {t('headline')}
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">{t('subtext')}</p>
        </motion.div>

        {/* Centered form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[600px] mx-auto"
        >
          <div className="rounded-2xl p-6 sm:p-10"style={{ background: '#0f172a', border: '1px solid #1e293b' }}>
            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wide">{t('name')}</label>
                    <input
                      type="text" required placeholder={t('namePlaceholder')} value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass} style={{ background: '#1e293b' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wide">{t('email')}</label>
                    <input
                      type="email" required placeholder={t('emailPlaceholder')} value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass} style={{ background: '#1e293b' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wide">{t('phone')}</label>
                    <input
                      type="tel" placeholder={t('phonePlaceholder')} value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass} style={{ background: '#1e293b' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wide">{t('package')}</label>
                    <select
                      value={form.package}
                      onChange={(e) => setForm({ ...form, package: e.target.value })}
                      className={`${inputClass} appearance-none cursor-pointer`} style={{ background: '#1e293b' }}
                    >
                      <option value="">{t('packageUndecided')}</option>
                      {packages.map((p) => (
                        <option key={p.name} value={p.name}>{p.name} ({p.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wide">{t('message')}</label>
                  <textarea
                    required rows={5} placeholder={t('messagePlaceholder')} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`} style={{ background: '#1e293b' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending' || !kvkk}
                  className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #3b82f6 100%)' }}
                >
                  {status === 'sending' ? t('sending') : `${t('send')} →`}
                </button>

                {status === 'error' && (
                  <p className="text-sm text-red-400 text-center">{t('error')}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input type="checkbox" required checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="sr-only" />
                    <div className={`w-4 h-4 rounded border transition-all duration-200 ${kvkk ? 'bg-[#2563EB] border-[#2563EB]' : 'bg-white/5 border-white/20 group-hover:border-white/40'} flex items-center justify-center`}>
                      {kvkk && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-white/35 leading-relaxed">
                    {t('kvkkPrefix')}{' '}
                    <Link href={privacyHref} target="_blank" rel="noopener noreferrer"
                      className="text-[#60a5fa] hover:text-white underline underline-offset-2 transition-colors">
                      {t('kvkkLink')}
                    </Link>
                    {t('kvkkSuffix')}
                  </span>
                </label>
              </form>
            )}

            <div className="flex items-center gap-3 my-6">
              <span className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30 uppercase tracking-wider">{t('or')}</span>
              <span className="flex-1 h-px bg-white/10" />
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/70 transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              {t('whatsappDirect')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
