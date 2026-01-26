import { motion } from "framer-motion";
import { Home, TrendingUp, Building2, ChevronRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Real Estate",
      icon: Home,
      description:
        "From residential properties to commercial spaces, we offer a diverse portfolio of premium real estate across Abuja's most sought-after locations.",
      features: [
        "Property Sales & Acquisition",
        "Property Rentals & Leasing",
        "Property Valuation Services",
        "Real Estate Consultancy",
      ],
      color: "gold",
    },
    {
      id: 2,
      title: "Investment Opportunities",
      icon: TrendingUp,
      description:
        "Maximize your returns with our carefully curated investment opportunities. We provide expert guidance on property investments with proven ROI.",
      features: [
        "Property Investment Advisory",
        "Portfolio Management",
        "ROI Analysis & Projections",
        "Off-Plan Investment Options",
      ],
      color: "teal",
    },
    {
      id: 3,
      title: "Project Management",
      icon: Building2,
      description:
        "End-to-end project management services ensuring your development projects are delivered on time, within budget, and to the highest quality standards.",
      features: [
        "Construction Oversight",
        "Quality Control & Assurance",
        "Budget Management",
        "Timeline Coordination",
      ],
      color: "gold",
    },
  ];

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-navy mb-4"
          >
            Our Services
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-gold via-teal to-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Comprehensive real estate solutions tailored to your needs
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow:
                  service.color === "gold"
                    ? "0 20px 60px rgba(201, 169, 97, 0.25)"
                    : "0 20px 60px rgba(0, 180, 216, 0.25)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-cream rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-default group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex p-4 rounded-2xl mb-6 ${
                  service.color === "gold"
                    ? "bg-gradient-to-br from-gold/20 to-gold/10"
                    : "bg-gradient-to-br from-teal/20 to-teal/10"
                }`}
              >
                <service.icon
                  className={
                    service.color === "gold" ? "text-gold" : "text-teal"
                  }
                  size={40}
                  strokeWidth={2}
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <ChevronRight
                      className={`flex-shrink-0 mt-0.5 ${
                        service.color === "gold" ? "text-gold" : "text-teal"
                      }`}
                      size={18}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Hover indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                className={`h-1 mt-6 rounded-full ${
                  service.color === "gold" ? "bg-gold" : "bg-teal"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
