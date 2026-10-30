'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteliyaIcon } from './Logo';
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/site';

export default function Header() {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const pathname = usePathname();

  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    window.location.href = `/${nextLocale}${pathWithoutLocale}`;
  };

  const navLinks = [
    { href: `/${locale}#services`,    label: t('services') },
    { href: `/${locale}#how-it-works`, label: t('howItWorks') },
    { href: `/${locale}#faq`,          label: t('faq') },
    { href: `/${locale}/hakkimizda`,  label: t('about') },
  ];

  const dropdownItems = [
    { icon: '📱', label: t('dropdownWhatsapp'), href: WHATSAPP_URL,                    external: true },
    { icon: '📸', label: t('dropdownInstagram'), href: INSTAGRAM_URL,                  external: true },
    { icon: '✉️', label: t('dropdownForm'),      href: `/${locale}/iletisim`,           external: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <SiteliyaIcon size={30} />
            <span style={{
              fontFamily: 'var(--font-jakarta), Inter, sans-serif',
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              paddingRight: '0.12em',
              paddingBottom: '0.05em',
              background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sitelya
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={switchLocale}
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5"
            >
              {locale === 'tr' ? 'EN' : 'TR'}
            </button>

            {/* Contact dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 bg-[#2563EB] rounded-lg text-white hover:bg-blue-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
              >
                {t('contact')}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-2xl shadow-black/40"
                    style={{ background: '#0f172a', border: '1px solid #1e293b' }}
                  >
                    {dropdownItems.map(({ icon, label, href, external }) => (
                      <Link
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>{icon}</span>
                        {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile top bar */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="text-sm font-semibold text-white/70 hover:text-white px-2.5 py-1 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            >
              {locale === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/70 hover:text-white py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                {dropdownItems.map(({ icon, label, href, external }) => (
                  <Link
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-white py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    <span>{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
