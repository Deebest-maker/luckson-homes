// src/pages/Home.jsx
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import StatsSection from "../components/sections/StatsSection";
import FeaturedProperties from "../components/sections/FeaturedProperties";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel";
import CTASection from "../components/sections/CTASection";
import Newsletter from "../components/sections/Newsletter";

const Home = () => {
  return (
    <>
      <SEO
        title="Luckson Homes - Own a Piece of the Earth"
        description="Premium real estate development in Abuja, Nigeria. Discover affordable luxury estates in strategic locations including Wuye, Katampe, Karshi, and Sheretti. Flexible payment plans available."
        keywords="real estate Abuja, property Nigeria, luxury estates Abuja, buy land Abuja, Wuye property, Katampe estate, affordable housing Nigeria, real estate investment"
        url="https://luckson-homes.vercel.app/earn-with-us/"
      />

      <div className="min-h-screen bg-cream">
        <Hero />
        <StatsSection />
        <FeaturedProperties />
        <ServicesSection />
        <WhyChooseUs />
        <TestimonialsCarousel />
        <CTASection />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
