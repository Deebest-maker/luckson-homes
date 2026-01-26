import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  // Variant styles
  const variants = {
    primary: "bg-gold text-navy hover:bg-gold-light",
    secondary: "bg-navy text-white hover:bg-navy-light",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-navy",
    ghost: "text-navy hover:bg-cream",
    white: "bg-white text-navy hover:bg-gray-100",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Combine classes
  const baseClasses =
    "font-bold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={20} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={20} />}
    </motion.button>
  );
};

export default Button;
