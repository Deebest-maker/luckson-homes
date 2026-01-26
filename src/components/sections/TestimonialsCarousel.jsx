import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "../../data/mockData";

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Get initials from name
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Client Testimonials
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
            Hear what our satisfied clients have to say about their experience
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main testimonial card */}
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-gradient-to-br from-cream to-white rounded-3xl p-8 md:p-12 shadow-2xl mx-auto max-w-4xl">
                  {/* Quote icon */}
                  <Quote className="text-gold/20 mb-6" size={60} />

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="text-gold fill-gold" size={24} />
                        </motion.div>
                      ),
                    )}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center mb-8 italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Client info */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Avatar with initials */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-teal flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">
                        {getInitials(testimonials[currentIndex].name)}
                      </span>
                    </div>

                    {/* Name and details */}
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-navy">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentIndex].property}
                      </p>
                      <p className="text-gold text-sm font-medium">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="pointer-events-auto bg-white shadow-lg rounded-full p-3 hover:bg-gold hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="pointer-events-auto bg-white shadow-lg rounded-full p-3 hover:bg-gold hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-gold"
                    : "w-2 bg-gray-300 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
