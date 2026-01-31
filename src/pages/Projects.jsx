import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Home,
  TrendingUp,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Button from "../components/common/Button";
import BackButton from "../components/BackButton";
import { projects } from "../data/mockData";
import { formatPrice } from "../utils/helpers";

const Projects = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Page Header with Background Image */}
      <section className="relative bg-navy py-16 overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
            opacity: 0.5,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-gold">Projects</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Explore our premium estate developments across Abuja's most
              desirable locations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {/* Project Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={project.masterPlan}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                      <CheckCircle size={18} />
                      {project.status}
                    </div>
                  </div>

                  {/* View Details Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="primary" size="lg">
                      View Estate Details
                    </Button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8">
                  {/* Name & Location */}
                  <h2 className="text-3xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={18} className="text-gold" />
                    <span>{project.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y-2 border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy mb-1">
                        {project.totalUnits}
                      </div>
                      <div className="text-sm text-gray-600">Total Units</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold mb-1">
                        {project.availableUnits.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Property Types
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal mb-1">
                        {formatPrice(project.startingPrice).replace(
                          /₦|,000,000/g,
                          (m) => (m === "₦" ? "₦" : "M"),
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Starting From</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 mb-6">
                    <h3 className="font-semibold text-navy mb-3">
                      Key Features:
                    </h3>
                    {project.amenities.slice(0, 4).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle
                          className="text-gold flex-shrink-0"
                          size={16}
                        />
                        <span>{amenity}</span>
                      </div>
                    ))}
                    {project.amenities.length > 4 && (
                      <div className="text-gold text-sm font-semibold">
                        +{project.amenities.length - 4} more amenities
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="secondary"
                    fullWidth
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}
                  >
                    EXPLORE ESTATE
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gradient-to-br from-navy to-blue-900 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our team can help you find the perfect property that matches your
              needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/properties")}
              >
                View All Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
