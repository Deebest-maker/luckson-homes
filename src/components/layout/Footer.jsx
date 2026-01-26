import { motion } from "framer-motion";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { companyInfo } from "../../data/mockData";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Projects", path: "/projects" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: companyInfo.social.facebook },
    { name: "Instagram", icon: Instagram, url: companyInfo.social.instagram },
    { name: "Twitter", icon: Twitter, url: companyInfo.social.twitter },
    { name: "LinkedIn", icon: Linkedin, url: companyInfo.social.linkedin },
  ];

  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/">
              <motion.div
                className="mb-6 cursor-pointer bg-white p-4 rounded-full shadow-lg inline-block"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(201, 169, 97, 0.3)",
                }}
              >
                <img
                  src="/luckson-logo.png"
                  alt="Luckson Homes - Own a piece of the earth"
                  className="h-16 w-auto"
                />
              </motion.div>
            </Link>
            <p className="text-white/70 mb-4 leading-relaxed">
              Your trusted partner in finding the perfect property in Abuja's
              premium locations.
            </p>
            <p className="text-gold text-sm font-semibold">
              {companyInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>
                    <motion.div
                      whileHover={{ x: 5, color: "#C9A961" }}
                      className="text-white/70 hover:text-gold transition-colors cursor-pointer"
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                <span className="text-white/70">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold flex-shrink-0" size={20} />
                <div className="flex flex-col">
                  {companyInfo.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="text-white/70 hover:text-gold transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold flex-shrink-0" size={20} />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours & Social */}
          <div>
            <h3 className="text-xl font-bold text-gold mb-6">Office Hours</h3>
            <div className="space-y-2 mb-6">
              <p className="text-white/70">
                {companyInfo.officeHours.weekdays}
              </p>
              <p className="text-white/70">
                {companyInfo.officeHours.saturday}
              </p>
              <p className="text-white/70">{companyInfo.officeHours.sunday}</p>
            </div>

            {/* Social Media */}
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gold/10 p-3 rounded-full hover:bg-gold transition-colors group"
                >
                  <social.icon
                    className="text-gold group-hover:text-navy transition-colors"
                    size={20}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Luckson Homes. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy">
                <motion.span
                  whileHover={{ color: "#C9A961" }}
                  className="text-white/50 hover:text-gold transition-colors cursor-pointer"
                >
                  Privacy Policy
                </motion.span>
              </Link>
              <Link to="/terms">
                <motion.span
                  whileHover={{ color: "#C9A961" }}
                  className="text-white/50 hover:text-gold transition-colors cursor-pointer"
                >
                  Terms of Service
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
