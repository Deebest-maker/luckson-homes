import { motion } from "framer-motion";
import { Building2, Users, Award, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Stats data - YOU CAN UPDATE THESE WITH REAL NUMBERS
  const stats = [
    {
      icon: Building2,
      number: 50,
      suffix: "+",
      label: "Properties Sold",
      color: "text-gold",
    },
    {
      icon: Users,
      number: 50,
      suffix: "+",
      label: "Happy Clients",
      color: "text-teal",
    },
    {
      icon: Award,
      number: 2,
      suffix: "+",
      label: "Years Experience",
      color: "text-gold",
    },
    {
      icon: TrendingUp,
      number: 98,
      suffix: "%",
      label: "Success Rate",
      color: "text-teal",
    },
  ];

  // Animated counter hook
  const useCountUp = (end, duration = 2000, isVisible) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - percentage, 3);
        setCount(Math.floor(end * easeOut));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return count;
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Individual stat card component
const StatCard = ({ stat, isVisible, itemVariants }) => {
  const count = useCountUp(stat.number, 2000, isVisible);

  // Animated counter hook (defined inside component to use in StatCard)
  function useCountUp(end, duration = 2000, isVisible) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        const easeOut = 1 - Math.pow(1 - percentage, 3);
        setCount(Math.floor(end * easeOut));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return count;
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.03 }}
      className="text-center group cursor-default"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gold/10 to-teal/10 p-4 rounded-full group-hover:shadow-lg transition-shadow"
        >
          <stat.icon className={`${stat.color}`} size={40} strokeWidth={2} />
        </motion.div>
      </div>

      {/* Number */}
      <div className="text-5xl font-bold text-navy mb-2">
        {count}
        <span className={stat.color}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
    </motion.div>
  );
};

export default StatsSection;
