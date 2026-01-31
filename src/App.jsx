import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import SingleProperty from "./pages/SingleProperty";
import Projects from "./pages/Projects";
import SingleProject from "./pages/SingleProject";
import About from "./pages/About";
import DirectorPortfolio from "./pages/DirectorPortfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SingleBlogPost from "./pages/SingleBlogPost";
import EarnWithUs from "./pages/EarnWithUs";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-cream flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />

            {/* Properties Pages */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<SingleProperty />} />

            {/* Projects/Estates Pages */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<SingleProject />} />

            {/* About & Director Portfolio */}
            <Route path="/about" element={<About />} />
            <Route path="/director-portfolio" element={<DirectorPortfolio />} />

            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />

            {/* Blog Pages */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<SingleBlogPost />} />

            {/* Earn With Us (Affiliate Program) */}
            <Route path="/earn-with-us" element={<EarnWithUs />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gold mb-4">404</h1>
      <h2 className="text-4xl font-bold text-navy mb-4">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="bg-gradient-gold text-navy px-8 py-3 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 inline-block"
      >
        Back to Home
      </a>
    </div>
  </div>
);

export default App;
