import { getTranslations } from 'next-intl/server';
import { alternatesFor } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/sections/Contact';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} | Sitelya`,
    description: t('subtitle'),
    alternates: alternatesFor(locale, '/iletisim'),
  };
}

export default function ContactPage({ searchParams }: { searchParams: { paket?: string } }) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Contact defaultPackage={searchParams.paket} />
      </main>
      <Footer />
    </>
  );
}
