import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyContent from '@/components/sections/PrivacyContent';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'tr' ? 'Gizlilik Politikası & KVKK | Sitelya' : 'Privacy Policy | Sitelya',
    description: locale === 'tr'
      ? 'Sitelya kişisel veri işleme politikası ve KVKK aydınlatma metni.'
      : 'Sitelya personal data processing policy.',
    alternates: alternatesFor(locale, { tr: '/gizlilik', en: '/privacy' }),
  };
}

export default function GizlilikPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
