/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // LUCKSON HOMES Brand Colors
        navy: "#0A1128",
        gold: "#C9A961",
        cream: "#F5F3EF",
        teal: "#00B4D8", // From logo - modern, fresh accent
        "gold-light": "#E5D5A8",
        "gold-dark": "#A68B4D",
        "navy-light": "#1A2142",
        "navy-dark": "#050814",
        "teal-light": "#48CAE4",
        "teal-dark": "#0096C7",
      },
      fontFamily: {
        sans: ["Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(201, 169, 97, 0.39)",
        "gold-lg": "0 10px 40px 0 rgba(201, 169, 97, 0.5)",
        navy: "0 4px 14px 0 rgba(10, 17, 40, 0.39)",
        "navy-lg": "0 10px 40px 0 rgba(10, 17, 40, 0.5)",
        premium: "0 20px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #C9A961 0%, #E5D5A8 100%)",
        "gradient-navy": "linear-gradient(135deg, #0A1128 0%, #1A2142 100%)",
        "gradient-premium": "linear-gradient(135deg, #0A1128 0%, #C9A961 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
