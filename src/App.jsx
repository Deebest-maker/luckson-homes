import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import StatsSection from "./components/sections/StatsSection";
import FeaturedProperties from "./components/sections/FeaturedProperties";
import ServicesSection from "./components/sections/ServicesSection";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import TestimonialsCarousel from "./components/sections/TestimonialsCarousel";
import CTASection from "./components/sections/CTASection";
import Newsletter from "./components/sections/Newsletter";
import Properties from "./pages/Properties";
import SingleProperty from "./pages/SingleProperty";

// Homepage Component
const HomePage = () => (
  <>
    <Hero />
    <StatsSection />
    <FeaturedProperties />
    <ServicesSection />
    <WhyChooseUs />
    <TestimonialsCarousel />
    <CTASection />
    <Newsletter />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<SingleProperty />} />
          {/* More routes will be added here */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
