import LandingHero from '../components/LandingHero';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';
import FooterSection from '../components/FooterSection';

export default function Home({ darkMode }) {
  return (
    <>
      <LandingHero darkMode={darkMode} />
      <FeatureSection darkMode={darkMode} />
      <TestimonialSection darkMode={darkMode} />
      <PricingSection darkMode={darkMode} />
      <CtaSection darkMode={darkMode} />
      <FooterSection darkMode={darkMode} />
    </>
  );
}