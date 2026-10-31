'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteliyaIcon } from './Logo';
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/site';
import { ArrowRight, Instagram, Mail, WhatsAppGlyph } from './ui/Icons';

export default function Header() {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const pathname = usePathname();

  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDropdownOpen(false); setMenuOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const switchLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    let pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    if (pathWithoutLocale === '/gizlilik' || pathWithoutLocale === '/privacy') {
      pathWithoutLocale = nextLocale === 'tr' ? '/gizlilik' : '/privacy';
    }
    window.location.href = `/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  const navLinks = [
    { href: `/${locale}#services`,     label: t('services') },
    { href: `/${locale}#work`,         label: t('work') },
    { href: `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: `/${locale}#faq`,          label: t('faq') },
    { href: `/${locale}/hakkimizda`,   label: t('about') },
  ];

  const dropdownItems = [
    { Icon: WhatsAppGlyph, label: t('dropdownWhatsapp'),  href: WHATSAPP_URL,         external: true },
    { Icon: Instagram,     label: t('dropdownInstagram'), href: INSTAGRAM_URL,        external: true },
    { Icon: Mail,          label: t('dropdownForm'),      href: `/${locale}/iletisim`, external: false },
  ];

  const isActive = (href: string) => !href.includes('#') && pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'h-14 max-w-5xl border-white/10 bg-[#0a1020]/75 px-3 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-4'
            : 'h-16 max-w-site border-transparent bg-transparent px-1 sm:px-3 lg:h-[4.5rem]'
        }`}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 rounded-lg" aria-label="Sitelya">
          <SiteliyaIcon size={scrolled ? 26 : 30} />
          <span className="font-display text-[1.2rem] font-extrabold leading-none tracking-[-0.05em] pb-[0.05em] pr-[0.12em] gradient-text">
            Sitelya
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/[0.05] hover:text-white ${
                isActive(link.href) ? 'text-white' : 'text-slate-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={switchLocale}
            aria-label={locale === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            className="rounded-lg px-3 py-2 text-xs font-bold tracking-wider text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Contact dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className="btn-primary !px-4 !py-2.5"
            >
              {t('contact')}
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0b1222]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
                >
                  {dropdownItems.map(({ Icon, label, href, external }) => (
                    <Link
                      key={label}
                      role="menuitem"
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-light">
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={switchLocale}
            aria-label={locale === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            className="rounded-lg px-2.5 py-2 text-xs font-bold tracking-wider text-slate-300 hover:bg-white/[0.06]"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2.5 text-slate-200 hover:bg-white/[0.06]"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span className={`h-0.5 rounded bg-current transition-all duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 rounded bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 rounded bg-current transition-all duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a1020]/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[0.95rem] font-medium text-slate-200 transition-colors hover:bg-white/[0.05]"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
              {dropdownItems.map(({ Icon, label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-3 text-center text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.07]"
                >
                  <Icon className="h-5 w-5 text-brand-light" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
