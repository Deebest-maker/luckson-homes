// src/components/SeasonalPreloader.jsx - UPDATED PREMIUM VERSION
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SeasonalPreloader = ({ onComplete }) => {
  const [season, setSeason] = useState("default");
  const [isVisible, setIsVisible] = useState(true);

  // Detect season - Check admin override first, then auto-detect
  useEffect(() => {
    const detectSeason = () => {
      // Check if admin has set a manual season override in localStorage
      const adminSeason = localStorage.getItem("luckson_preloader_season");
      if (adminSeason && adminSeason !== "auto") {
        return adminSeason;
      }

      // Auto-detect based on date
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      if (month === 12) return "christmas";
      if (month === 1 && day <= 7) return "newyear";
      if (month === 2 && day >= 10 && day <= 14) return "valentine";
      if ((month === 3 && day >= 28) || (month === 4 && day <= 12))
        return "easter";
      if (month === 6 && day >= 10 && day <= 14) return "democracy";
      if ((month === 9 && day >= 28) || (month === 10 && day <= 5))
        return "independence";
      if ((month === 2 && day >= 17) || (month === 3 && day <= 20))
        return "ramadan";
      if (month === 5 && day >= 25 && day <= 28) return "eid";

      return "default";
    };

    setSeason(detectSeason());
  }, []);

  // Play sound effect
  useEffect(() => {
    const playSound = () => {
      try {
        const audio = new Audio(`/sounds/${season}-sound.mp3`);
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch (error) {}
    };

    if (isVisible) {
      playSound();
    }
  }, [season, isVisible]);

  // Auto-hide after 4.5 seconds (FASTER - under 5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 5000); // 4.5 seconds total

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Get season-specific colors (using brand colors as base)
  const getSeasonColors = () => {
    const brandGold = "#C9A961";
    const brandNavy = "#0A1128";

    switch (season) {
      case "christmas":
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #1a2744 50%, #0A1128 100%)",
          primary: "#C9A961",
          secondary: "#FFD700",
          accent: "#FFFFFF",
          glow: "rgba(201, 169, 97, 0.3)",
        };
      case "newyear":
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #2a1810 50%, #0A1128 100%)",
          primary: "#FFD700",
          secondary: "#C9A961",
          accent: "#FFFFFF",
          glow: "rgba(255, 215, 0, 0.3)",
        };
      case "valentine":
        return {
          bg: "linear-gradient(135deg, #1a0a14 0%, #2a1420 50%, #1a0a14 100%)",
          primary: "#FFB6C1",
          secondary: "#C9A961",
          accent: "#FF69B4",
          glow: "rgba(255, 182, 193, 0.3)",
        };
      case "easter":
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #1a1a2e 50%, #0A1128 100%)",
          primary: "#C9A961",
          secondary: "#E6B8FF",
          accent: "#98FB98",
          glow: "rgba(201, 169, 97, 0.3)",
        };
      case "ramadan":
      case "eid":
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #0d1f1a 50%, #0A1128 100%)",
          primary: "#C9A961",
          secondary: "#00AA66",
          accent: "#FFFFFF",
          glow: "rgba(201, 169, 97, 0.4)",
        };
      case "independence":
      case "democracy":
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #0d2f1a 50%, #0A1128 100%)",
          primary: "#C9A961",
          secondary: "#008751",
          accent: "#FFFFFF",
          glow: "rgba(201, 169, 97, 0.3)",
        };
      default:
        return {
          bg: "linear-gradient(135deg, #0A1128 0%, #1a2030 50%, #0A1128 100%)",
          primary: "#C9A961",
          secondary: "#D4AF37",
          accent: "#F5F3EF",
          glow: "rgba(201, 169, 97, 0.4)",
        };
    }
  };

  const colors = getSeasonColors();

  // Get background image from localStorage (set by admin) or use default
  const getBackgroundImage = () => {
    const adminBgImage = localStorage.getItem("luckson_preloader_bg_image");
    // Default fallback image - you can change this to any luxury building image
    return adminBgImage || "/images/luxury-building-bg.jpg";
  };

  const SeasonalParticles = () => {
    switch (season) {
      case "christmas":
        return <ChristmasSnow colors={colors} />;
      case "newyear":
        return <NewYearConfetti colors={colors} />;
      case "valentine":
        return <ValentineHearts colors={colors} />;
      case "easter":
        return <EasterElements colors={colors} />;
      case "ramadan":
      case "eid":
        return <RamadanStars colors={colors} />;
      case "independence":
      case "democracy":
        return <NigerianConfetti colors={colors} />;
      default:
        return <LuxuryGoldDust colors={colors} />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: colors.bg }}
        >
          {/* Background Image with 45% opacity blended into gradient */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${getBackgroundImage()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.45,
              mixBlendMode: "luminosity",
            }}
          />

          {/* Dark overlay to blend image better */}
          <div
            className="absolute inset-0"
            style={{
              background: colors.bg,
              opacity: 0.7,
            }}
          />

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, transparent 70%)`,
            }}
          />

          {/* Seasonal Particles */}
          <SeasonalParticles />

          {/* Logo Container */}
          <div className="relative z-10 text-center px-4">
            {/* Welcome Text - FASTER animation */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="mb-8"
            >
              <h2
                className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase"
                style={{
                  color: colors.accent,
                  textShadow: `0 0 20px ${colors.glow}`,
                }}
              >
                Welcome To
              </h2>
            </motion.div>

            {/* LUCKSON - FASTER Letter by letter animation */}
            <motion.div className="mb-4">
              <div className="flex justify-center items-center">
                {["L", "U", "C", "K", "S", "O", "N"].map((letter, index) => (
                  <motion.span
                    key={`luckson-${index}`}
                    initial={{ opacity: 0, y: 80, scale: 0.5, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.06, // FASTER
                      ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                    className="inline-block font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{
                      color: colors.primary,
                      textShadow: `
                        0 0 40px ${colors.glow},
                        0 0 80px ${colors.glow},
                        0 4px 12px rgba(0,0,0,0.5)
                      `,
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* HOMES - FASTER Letter by letter animation */}
            <motion.div className="mb-10">
              <div className="flex justify-center items-center">
                {["H", "O", "M", "E", "S"].map((letter, index) => (
                  <motion.span
                    key={`homes-${index}`}
                    initial={{ opacity: 0, y: 80, scale: 0.5, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.0 + index * 0.06, // FASTER
                      ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                    className="inline-block font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{
                      color: colors.primary,
                      textShadow: `
                        0 0 40px ${colors.glow},
                        0 0 80px ${colors.glow},
                        0 4px 12px rgba(0,0,0,0.5)
                      `,
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tagline - FASTER */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.6,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="text-base md:text-xl font-light tracking-[0.2em] uppercase mb-8"
              style={{
                color: colors.accent,
                textShadow: `0 0 10px ${colors.glow}`,
              }}
            >
              Own a Piece of the Earth
            </motion.p>

            {/* Loading Bar - FASTER */}
            <div className="relative w-64 md:w-96 h-0.5 mx-auto bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, delay: 0.3, ease: "easeInOut" }} // FASTER
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
                  boxShadow: `0 0 20px ${colors.glow}`,
                }}
              />
            </div>
          </div>

          {/* Radial glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, transparent 50%)`,
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===== PREMIUM PARTICLE COMPONENTS (Same as before but optimized) =====

const ChristmasSnow = ({ colors }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
            x: `+=${Math.random() * 100 - 50}`,
          }}
          transition={{
            duration: Math.random() * 5 + 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: colors.accent,
            boxShadow: `0 0 10px ${colors.accent}, 0 0 20px ${colors.accent}`,
          }}
        />
      ))}
    </div>
  );
};

const NewYearConfetti = ({ colors }) => {
  const confettiColors = [
    colors.primary,
    colors.secondary,
    colors.accent,
    "#FF6B6B",
    "#4ECDC4",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 1,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            rotate: Math.random() * 720 + 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            backgroundColor:
              confettiColors[Math.floor(Math.random() * confettiColors.length)],
            width: Math.random() * 10 + 5,
            height: Math.random() * 20 + 10,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            boxShadow: `0 0 10px currentColor`,
          }}
        />
      ))}
    </div>
  );
};

const ValentineHearts = ({ colors }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.5],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 8,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 20 + 20}px`,
            filter: `drop-shadow(0 0 10px ${colors.accent})`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const EasterElements = ({ colors }) => {
  const emojis = ["🥚", "🐰", "🌸", "🌷", "🦋"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 7 + 10,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 15 + 25}px`,
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
};

const RamadanStars = ({ colors }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            scale: 0,
            opacity: 0,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1080),
          }}
          animate={{
            scale: [0, 1.5, 1, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 15 + 25}px`,
            filter: `drop-shadow(0 0 10px ${colors.primary})`,
          }}
        >
          {i % 2 === 0 ? "⭐" : "☪️"}
        </motion.div>
      ))}
    </div>
  );
};

const NigerianConfetti = ({ colors }) => {
  const nigerianColors = [colors.secondary, "#FFFFFF"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            rotate: 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            backgroundColor:
              nigerianColors[Math.floor(Math.random() * nigerianColors.length)],
            width: Math.random() * 12 + 8,
            height: Math.random() * 20 + 10,
            borderRadius: "2px",
            boxShadow: `0 0 10px currentColor`,
          }}
        />
      ))}
    </div>
  );
};

const LuxuryGoldDust = ({ colors }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating gold particles */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: typeof window !== "undefined" ? window.innerHeight + 20 : 1080,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.9, 0.9, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
            boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.glow}`,
          }}
        />
      ))}

      {/* Sparkle effects */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            scale: 0,
            opacity: 0,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1920),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1080),
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 10 + 15}px`,
            filter: `drop-shadow(0 0 10px ${colors.primary})`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default SeasonalPreloader;
