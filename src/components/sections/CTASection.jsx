import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { companyInfo } from "../../data/mockData";

const CTASection = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const phone = companyInfo.whatsapp.replace(/\s/g, "");
    const message = encodeURIComponent(
      "Hello! I'm interested in learning more about your properties.",
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${companyInfo.phones[0]}`;
  };

  const handleEmail = () => {
    navigate("/contact");
  };

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us Now",
      action: handleCall,
      detail: companyInfo.phones[0],
      color: "gold",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Chat",
      action: handleWhatsApp,
      detail: "Instant Response",
      color: "teal",
    },
    {
      icon: Mail,
      label: "Send Enquiry",
      action: handleEmail,
      detail: "Get in Touch",
      color: "gold",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')",
          }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-blue-900/95" />

        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#C9A961_1px,transparent_1px)] bg-[length:50px_50px]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-gold/30"
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold font-semibold text-sm">
              AVAILABLE NOW
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Ready to Find Your <span className="text-gold">Dream Home?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto"
          >
            Contact us today and let our experts help you find the perfect
            property that matches your dreams and budget
          </motion.p>

          {/* Urgency line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gold text-lg mb-12"
          >
            Limited properties available • First come, first served
          </motion.p>

          {/* Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {contactMethods.map((method, index) => (
              <motion.button
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    method.color === "gold"
                      ? "0 20px 40px rgba(201, 169, 97, 0.4)"
                      : "0 20px 40px rgba(0, 180, 216, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={method.action}
                className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
                  method.color === "gold"
                    ? "bg-gold text-navy hover:bg-gold-light"
                    : "bg-teal text-white hover:bg-teal-light"
                }`}
              >
                <method.icon size={24} />
                <div className="text-left">
                  <div className="text-sm font-semibold">{method.label}</div>
                  <div className="text-xs opacity-90">{method.detail}</div>
                </div>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Bottom assurance */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <span>Expert Guidance</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
