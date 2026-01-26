import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Director Portfolio", path: "/director-portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Earn With Us", path: "/earn-with-us" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if current path matches nav item
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-navy shadow-2xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="cursor-pointer bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(201, 169, 97, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/luckson-logo.png"
                alt="Luckson Homes - Own a piece of the earth"
                className="h-14 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <motion.div
                  className={`relative group ${
                    isActive(item.path) ? "text-gold" : "text-white"
                  } hover:text-gold transition-colors font-medium cursor-pointer`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <Link key={item.name} to={item.path}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-lg ${
                        isActive(item.path)
                          ? "bg-gold text-navy"
                          : "text-white hover:bg-navy-light"
                      } transition-colors font-medium cursor-pointer`}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Header;
