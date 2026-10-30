import { getTranslations } from 'next-intl/server';
import { alternatesFor } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutContent from '@/components/sections/AboutContent';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} | Sitelya`,
    description: t('subtitle'),
    alternates: alternatesFor(locale, '/hakkimizda'),
  };
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
