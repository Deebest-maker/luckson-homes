// ULTIMATE PREMIUM PRELOADER - Logo Center + Building Background
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SeasonalPreloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0A1128 0%, #1a2744 50%, #0A1128 100%)",
          }}
        >
          {/* Building Background - Blended */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
              opacity: 0.2,
              filter: "blur(2px)",
            }}
          />

          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/70 to-navy/80" />

          {/* Radial light beams - luxury rays */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: 800,
                  height: 2,
                  background: `linear-gradient(90deg, rgba(201, 169, 97, 0.3), transparent)`,
                  transform: `rotate(${i * 30}deg)`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Ambient glow - layered */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(201, 169, 97, 0.2) 0%, transparent 60%)",
            }}
          />

          {/* Floating geometric patterns - luxury elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gold dust particles - premium shimmer */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                initial={{
                  opacity: 0,
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1920),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 1080),
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: `+=${Math.random() * 100 - 50}`,
                  x: `+=${Math.random() * 50 - 25}`,
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: Math.random() * 3 + 2,
                  height: Math.random() * 3 + 2,
                  borderRadius: "50%",
                  background: "#C9A961",
                  boxShadow:
                    "0 0 15px rgba(201, 169, 97, 0.8), 0 0 30px rgba(201, 169, 97, 0.4)",
                }}
              />
            ))}

            {/* Floating diamonds - elegant shapes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`diamond-${i}`}
                initial={{
                  opacity: 0,
                  x: `${20 + i * 12}%`,
                  y: `${30 + (i % 3) * 20}%`,
                  rotate: 45,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  rotate: [45, 225, 405],
                  y: `+=${Math.random() * 80 - 40}`,
                }}
                transition={{
                  duration: Math.random() * 4 + 5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  background:
                    "linear-gradient(135deg, rgba(201, 169, 97, 0.3), rgba(212, 175, 55, 0.2))",
                  border: "1px solid rgba(201, 169, 97, 0.4)",
                  boxShadow: "0 0 20px rgba(201, 169, 97, 0.3)",
                }}
              />
            ))}

            {/* Thin lines - elegant accents */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                initial={{
                  opacity: 0,
                  x: `${10 + i * 15}%`,
                  y: "20%",
                  rotate: Math.random() * 90,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: "80%",
                  rotate: `+=${Math.random() * 180}`,
                }}
                transition={{
                  duration: Math.random() * 4 + 6,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  width: 1,
                  height: 40,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(201, 169, 97, 0.5), transparent)",
                  boxShadow: "0 0 10px rgba(201, 169, 97, 0.4)",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-4">
            {/* Logo in Circular Frame - CENTERPIECE */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="mb-12 relative"
            >
              {/* Outer rotating glow ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: 240,
                  height: 240,
                  border: "2px solid rgba(201, 169, 97, 0.3)",
                  borderRadius: "50%",
                  boxShadow: "0 0 60px rgba(201, 169, 97, 0.3)",
                }}
              />

              {/* Middle rotating ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: -360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: 210,
                  height: 210,
                  border: "2px solid rgba(201, 169, 97, 0.4)",
                  borderRadius: "50%",
                  boxShadow: "0 0 40px rgba(201, 169, 97, 0.4)",
                }}
              />

              {/* Main circular frame with logo - WHITE BACKGROUND, BIGGER SIZE */}
              <motion.div
                className="relative mx-auto"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(201, 169, 97, 0.5)",
                    "0 0 80px rgba(201, 169, 97, 0.8)",
                    "0 0 40px rgba(201, 169, 97, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  border: "4px solid #C9A961",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Logo */}
                <motion.img
                  src="/luckson-logo.png"
                  alt="Luckson Homes"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "75%",
                    height: "75%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </motion.div>

              {/* Pulsing center glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(201, 169, 97, 0.4) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Brand name - ultra elegant reveal */}
            <motion.div className="mb-6">
              <div className="flex justify-center items-center">
                {["L", "U", "C", "K", "S", "O", "N"].map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1 + index * 0.1,
                      ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                    className="inline-block text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em]"
                    style={{
                      color: "#C9A961",
                      fontFamily:
                        "'Cormorant Garamond', 'Playfair Display', serif",
                      textShadow: `
                        0 0 40px rgba(201, 169, 97, 0.5),
                        0 0 80px rgba(201, 169, 97, 0.3),
                        0 2px 10px rgba(0, 0, 0, 0.8)
                      `,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Animated separator - premium */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="relative h-px mx-auto mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 6,
                  height: 6,
                  background: "#C9A961",
                  borderRadius: "50%",
                  boxShadow: "0 0 20px rgba(201, 169, 97, 0.8)",
                }}
              />
            </motion.div>

            {/* Tagline with glow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="text-sm md:text-base tracking-[0.3em] uppercase mb-8"
              style={{
                color: "#F5F3EF",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                textShadow:
                  "0 0 20px rgba(201, 169, 97, 0.3), 0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              Own a Piece of the Earth
            </motion.p>

            {/* Progress bar - minimal elegant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="relative max-w-xs mx-auto"
            >
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A961] to-[#D4AF37] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Progress percentage - subtle */}
              <motion.p
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 text-xs tracking-widest"
                style={{ color: "rgba(201, 169, 97, 0.6)" }}
              >
                {progress}%
              </motion.p>
            </motion.div>
          </div>

          {/* Vignette effect - adds depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(10, 17, 40, 0.8) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SeasonalPreloader;
