// src/pages/Home.jsx
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
  );
};

export default Home;
