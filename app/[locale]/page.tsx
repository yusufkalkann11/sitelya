import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Sectors from '@/components/sections/Sectors';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Showcase from '@/components/sections/Showcase';
import CTABand from '@/components/sections/CTABand';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Services />
        <HowItWorks />
        <Sectors />
        <CTABand />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
