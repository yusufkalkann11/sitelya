'use client';

import { useTranslations } from 'next-intl';
import { WHATSAPP_URL } from '@/lib/site';
import { WhatsAppGlyph } from './ui/Icons';

export default function WhatsAppButton() {
  const t = useTranslations();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappFloat')}
      title={t('whatsappFloat')}
      className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] ring-1 ring-white/20 transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 motion-safe:animate-ping [animation-duration:2.8s]" />
      <WhatsAppGlyph className="relative h-7 w-7" />
    </a>
  );
}
