import { motion } from "framer-motion";
import {
  Award,
  Home,
  DollarSign,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: Award,
      title: "Trusted Expertise",
      description:
        "With proven experience and successful property transactions, we bring unmatched market knowledge and professional guidance to every deal.",
      color: "gold",
    },
    {
      id: 2,
      icon: Home,
      title: "Premium Properties",
      description:
        "We handpick only the finest properties in Abuja's most desirable locations, ensuring exceptional value and quality for our clients.",
      color: "teal",
    },
    {
      id: 3,
      icon: Shield,
      title: "Transparent Pricing",
      description:
        "No hidden fees, no surprises. We believe in complete transparency throughout the buying process, ensuring you know exactly what you're paying for.",
      color: "gold",
    },
    {
      id: 4,
      icon: Users,
      title: "Lifetime Support",
      description:
        "Our relationship doesn't end at purchase. We provide ongoing support and guidance, ensuring your property investment continues to deliver value.",
      color: "teal",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Why Choose Us
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
            What sets us apart in Abuja's competitive real estate market
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow:
                  reason.color === "gold"
                    ? "0 25px 50px rgba(201, 169, 97, 0.2)"
                    : "0 25px 50px rgba(0, 180, 216, 0.2)",
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group"
            >
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`flex-shrink-0 p-3 rounded-xl ${
                    reason.color === "gold"
                      ? "bg-gradient-to-br from-gold/20 to-gold/10"
                      : "bg-gradient-to-br from-teal/20 to-teal/10"
                  }`}
                >
                  <reason.icon
                    className={
                      reason.color === "gold" ? "text-gold" : "text-teal"
                    }
                    size={32}
                    strokeWidth={2}
                  />
                </motion.div>

                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                    {reason.title}
                  </h3>
                </div>

                {/* Check mark indicator */}
                <CheckCircle
                  className={`flex-shrink-0 ${
                    reason.color === "gold" ? "text-gold" : "text-teal"
                  } opacity-0 group-hover:opacity-100 transition-opacity`}
                  size={24}
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={`h-1 mt-6 rounded-full ${
                  reason.color === "gold"
                    ? "bg-gradient-gold"
                    : "bg-gradient-to-r from-teal to-teal-light"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full shadow-lg">
            <Star className="text-gold fill-gold" size={24} />
            <span className="text-navy font-bold text-lg">
              Join 1200+ satisfied clients who trusted us with their property
              dreams
            </span>
            <Star className="text-gold fill-gold" size={24} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
