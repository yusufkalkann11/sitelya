import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SITE_URL, EMAIL, INSTAGRAM_URL, LOCALES, alternatesFor } from '@/lib/site';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-jakarta',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isTr = locale === 'tr';
  const title = isTr
    ? 'Sitelya – Profesyonel Web Tasarım Ajansı'
    : 'Sitelya – Professional Web Design Agency';
  const description = isTr
    ? 'Modern, hızlı ve dönüşüm odaklı web siteleri tasarlıyoruz. İşletmenizi dijital dünyada öne çıkarın.'
    : 'We design modern, fast, and conversion-focused websites. Stand out in the digital world.';
  const ogImage = isTr ? '/post-tr.png' : '/post-en.png';

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s' },
    description,
    keywords: isTr
      ? 'web tasarım, web sitesi, dijital ajans, e-ticaret, SEO'
      : 'web design, website, digital agency, e-commerce, SEO',
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
    },
    alternates: alternatesFor(locale),
    openGraph: {
      title: isTr ? 'Sitelya – Profesyonel Web Tasarım' : 'Sitelya – Professional Web Design',
      description: isTr
        ? 'İşletmeniz için profesyonel web sitesi'
        : 'Professional websites for your business',
      url: `/${locale}`,
      siteName: 'Sitelya',
      locale: isTr ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, alt: 'Sitelya' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();

  const messages = await getMessages();
  const faqItems = (messages.faq as { items: Array<{ q: string; a: string }> }).items;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Sitelya',
      url: `${SITE_URL}/${locale}`,
      logo: `${SITE_URL}/logo-square.png`,
      image: `${SITE_URL}/logo-square.png`,
      email: EMAIL,
      telephone: '+905075909915',
      sameAs: [INSTAGRAM_URL],
      areaServed: 'TR',
      priceRange: '$65 - $120',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-inter bg-navy text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
