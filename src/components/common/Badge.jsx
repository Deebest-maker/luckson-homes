import { motion } from "framer-motion";

const Badge = ({ text, variant = "default", className = "" }) => {
  // Variant styles
  const variants = {
    default: "bg-gold text-navy",
    hot: "bg-red-500 text-white",
    new: "bg-green-500 text-white",
    featured: "bg-blue-500 text-white",
    exclusive: "bg-purple-500 text-white",
    trending: "bg-orange-500 text-white",
    premium: "bg-gradient-gold text-navy",
    sold: "bg-gray-500 text-white",
  };

  const variantClass = variants[variant.toLowerCase()] || variants.default;

  return (
    <motion.span
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`px-3 py-1 rounded-full font-bold text-xs uppercase shadow-lg ${variantClass} ${className}`}
    >
      {text}
    </motion.span>
  );
};

export default Badge;
