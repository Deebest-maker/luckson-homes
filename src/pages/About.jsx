import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Shield,
  Heart,
  CheckCircle,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../components/common/Modal";
import BackButton from "../components/BackButton";

const About = () => {
  const [selectedDirector, setSelectedDirector] = useState(null);

  // Board of Directors Data - REDUCED TO 2 MEMBERS
  const directors = [
    {
      id: 1,
      name: "Hilary Moses Luckson",
      position: "Chief Executive Officer & Founder",
      image: null,
      bio: "Hilary Moses Luckson is the visionary founder and CEO of Luckson Homes. With a background in Analytical Chemistry and extensive experience in quality control and data analysis, he brings a unique analytical approach to real estate development. His commitment to excellence and transparent business practices has positioned Luckson Homes as a trusted name in Abuja's real estate market.",
      education:
        "BSc Chemistry (Second Class Upper), University of Maiduguri | Analytical Chemistry (In View), Nigeria Defense Academy",
      experience:
        "Founder & CEO of Luckson Homes since 2020, delivering premium residential estates and exceptional property solutions across Abuja.",
      linkedin: "#",
      email: "hilarymss3@gmail.com",
    },
    {
      id: 2,
      name: "Dr. Dauda Madubu",
      position: "Director, Strategic Planning",
      image: null,
      bio: "Dr. Dauda Madubu brings decades of strategic leadership experience to Luckson Homes. As former State Coordinator at the World Health Organization, he has a proven track record of managing large-scale projects and building sustainable systems. His expertise in strategic planning and organizational development drives Luckson Homes' growth strategy.",
      education: "PhD in Public Health Administration",
      experience:
        "Retired State Coordinator, World Health Organization | 25+ years in project management and strategic development",
      linkedin: "#",
      email: "info@lucksonhomes.com",
    },
  ];

  // Company Values
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in every transaction.",
      color: "gold",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We are committed to delivering premium quality properties and exceptional customer service.",
      color: "teal",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "Your dreams and satisfaction are at the heart of everything we do.",
      color: "gold",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We embrace modern solutions and creative approaches to real estate development.",
      color: "teal",
    },
  ];

  // Company Stats
  const stats = [
    { number: "2020", label: "Founded" },
    { number: "2", label: "Estate Projects" },
    { number: "50+", label: "Happy Families" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-navy py-20 overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80')",
            opacity: 0.5,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-gold-lg p-4"
            >
              <img
                src="/luckson-logo.png"
                alt="Luckson Homes"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="text-gold">Luckson Homes</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Building dreams, creating value, and transforming lives through
              premium real estate solutions in Abuja, Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-navy mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020,{" "}
                  <span className="font-bold text-gold">Luckson Homes</span>{" "}
                  emerged from a vision to make quality housing accessible to
                  families in Abuja and beyond. What started as a passion for
                  creating beautiful, affordable living spaces has grown into a
                  trusted name in Nigeria's real estate sector.
                </p>
                <p>
                  Under the leadership of our founder and CEO,{" "}
                  <Link
                    to="/director-portfolio"
                    className="font-bold text-teal hover:text-teal-dark underline"
                  >
                    Hilary Moses Luckson
                  </Link>
                  , we have developed premium estates in strategic locations,
                  offering a range of properties from terraces to fully detached
                  duplexes.
                </p>
                <p>
                  Our commitment to transparency, quality construction, and
                  exceptional customer service has earned us the trust of over
                  50 families who now call our estates "home."
                </p>
              </div>

              <div className="mt-8">
                <Link to="/director-portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-gold text-navy px-8 py-3 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300"
                  >
                    Meet Our CEO
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
                  alt="Luckson Homes Estate"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4">
                  <Target className="text-navy" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide affordable, high-quality residential properties that
                meet the housing needs of Nigerian families, while maintaining
                the highest standards of integrity, professionalism, and
                customer satisfaction.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center mr-4">
                  <Eye className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become Nigeria's most trusted real estate company, renowned
                for transforming communities through innovative property
                development and exceptional service delivery across the nation.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-3xl font-bold text-navy text-center mb-12">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-premium transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-${value.color} rounded-full flex items-center justify-center mb-4 mx-auto`}
                  >
                    <value.icon className="text-navy" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-navy text-center mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 uppercase text-sm tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors - NOW ONLY 2 MEMBERS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">
              Leadership Team
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our leadership combines expertise in real estate development and
              strategic planning to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {directors.map((director, index) => (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedDirector(director)}
              >
                {/* Avatar/Image */}
                <div className="aspect-square bg-gradient-navy flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-lg">
                    <span className="text-5xl font-bold text-navy">
                      {director.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {director.name}
                  </h3>
                  <p className="text-sm text-gold font-semibold mb-4">
                    {director.position}
                  </p>
                  <button className="text-teal hover:text-teal-dark font-semibold text-sm flex items-center justify-center mx-auto gap-2 group">
                    View Profile
                    <motion.div className="group-hover:translate-x-1 transition-transform">
                      →
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Bio Modal */}
      <Modal
        isOpen={selectedDirector !== null}
        onClose={() => setSelectedDirector(null)}
        title={selectedDirector?.name || ""}
        size="lg"
      >
        {selectedDirector && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-6 pb-6 border-b-2 border-cream">
              <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-lg flex-shrink-0">
                <span className="text-4xl font-bold text-navy">
                  {selectedDirector.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-navy mb-1">
                  {selectedDirector.name}
                </h3>
                <p className="text-gold font-semibold mb-3">
                  {selectedDirector.position}
                </p>
                <div className="flex gap-3">
                  {selectedDirector.linkedin !== "#" && (
                    <a
                      href={selectedDirector.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-teal rounded-full flex items-center justify-center hover:bg-teal-dark transition-colors"
                    >
                      <Linkedin size={16} className="text-white" />
                    </a>
                  )}
                  <a
                    href={`mailto:${selectedDirector.email}`}
                    className="w-8 h-8 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors"
                  >
                    <Mail size={16} className="text-navy" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <Users size={20} className="text-gold" />
                Biography
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedDirector.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <Award size={20} className="text-teal" />
                Education
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedDirector.education}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <CheckCircle size={20} className="text-gold" />
                Professional Experience
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedDirector.experience}
              </p>
            </div>

            {/* CTA for CEO */}
            {selectedDirector.id === 1 && (
              <div className="bg-gradient-navy p-6 rounded-xl text-center">
                <p className="text-white mb-4">
                  View the complete professional portfolio of our CEO
                </p>
                <Link to="/director-portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDirector(null)}
                    className="bg-gradient-gold text-navy px-6 py-3 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300"
                  >
                    View Full Portfolio
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Ready to Own a Piece of the Earth?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join over 50 satisfied families who have made their real estate
              dreams come true with Luckson Homes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/properties">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300"
                >
                  View Properties
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-navy text-navy px-8 py-4 rounded-lg font-bold hover:bg-navy hover:text-white transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
