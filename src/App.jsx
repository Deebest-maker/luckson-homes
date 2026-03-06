// src/App.jsx - FINAL CLEAN VERSION (NO MEDIA)
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import SeasonalPreloader from "./components/SeasonalPreloader";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Public Pages
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

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProperties from "./pages/admin/Properties";
import AddProperty from "./pages/admin/AddProperty";
import EditProperty from "./pages/admin/EditProperty";
import AdminProjects from "./pages/admin/AdminProjects";
import AddProject from "./pages/admin/AddProject";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminBlog from "./pages/admin/AdminBlog";
import AddBlogPost from "./pages/admin/AddBlogPost";
import EditBlogPost from "./pages/admin/EditBlogPost";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPages from "./pages/admin/AdminPages";

function App() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (location.pathname === "/") {
      setShowPreloader(true);
      setIsLoading(true);
    } else {
      setShowPreloader(false);
      setIsLoading(false);
    }
  }, [location.pathname]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <AuthProvider>
      <ScrollToTop />

      {showPreloader && (
        <SeasonalPreloader onComplete={handlePreloaderComplete} />
      )}

      {!isLoading && (
        <>
          {/* Public Routes */}
          {!isAdminRoute && (
            <div className="min-h-screen bg-cream flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<SingleProperty />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<SingleProject />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/director-portfolio"
                    element={<DirectorPortfolio />}
                  />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<SingleBlogPost />} />
                  <Route path="/earn-with-us" element={<EarnWithUs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          )}

          {/* Admin Routes */}
          {isAdminRoute && (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Properties Routes */}
              <Route
                path="/admin/properties"
                element={
                  <ProtectedRoute>
                    <AdminProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/properties/add"
                element={
                  <ProtectedRoute>
                    <AddProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/properties/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditProperty />
                  </ProtectedRoute>
                }
              />
              {/* Projects Routes */}
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/add"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />
              {/* Inquiries Route */}
              <Route
                path="/admin/inquiries"
                element={
                  <ProtectedRoute>
                    <AdminInquiries />
                  </ProtectedRoute>
                }
              />
              {/* Blog Routes */}
              <Route
                path="/admin/blog"
                element={
                  <ProtectedRoute>
                    <AdminBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/add"
                element={
                  <ProtectedRoute>
                    <AddBlogPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/blog/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditBlogPost />
                  </ProtectedRoute>
                }
              />
              {/* Pages Route */}
              <Route
                path="/admin/pages"
                element={
                  <ProtectedRoute>
                    <AdminPages />
                  </ProtectedRoute>
                }
              />
              {/* Settings Route */}
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </AuthProvider>
  );
}

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
