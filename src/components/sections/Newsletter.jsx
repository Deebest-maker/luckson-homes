import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    // Set loading state
    setStatus("loading");

    // Simulate API call (replace with actual newsletter service later)
    setTimeout(() => {
      setStatus("success");
      setMessage("Thank you! You've been subscribed to our newsletter.");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex p-4 bg-gold/20 backdrop-blur-sm rounded-2xl mb-6"
          >
            <Mail className="text-gold" size={48} />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Stay Updated on New Properties
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter and be the first to know about new
            listings, exclusive deals, and real estate insights in Abuja
          </motion.p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Email Input */}
              <div className="flex-1 relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email address"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white text-navy placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    status === "error"
                      ? "ring-2 ring-red-500"
                      : "focus:ring-gold"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={status === "idle" ? { scale: 1.05 } : {}}
                whileTap={status === "idle" ? { scale: 0.95 } : {}}
                className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gold text-navy hover:bg-gold-light"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === "loading" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Send size={20} />
                  </motion.div>
                )}
                {status === "success" && <CheckCircle size={20} />}
                {(status === "idle" || status === "error") && (
                  <Send size={20} />
                )}

                <span>
                  {status === "loading" && "Subscribing..."}
                  {status === "success" && "Subscribed!"}
                  {(status === "idle" || status === "error") && "Subscribe"}
                </span>
              </motion.button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 flex items-center justify-center gap-2 ${
                    status === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy assurance */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 text-sm text-white/60"
            >
              🔒 We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: "📬", text: "New Property Alerts" },
              { icon: "💰", text: "Exclusive Deals" },
              { icon: "📊", text: "Market Insights" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <div className="text-sm font-medium">{benefit.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
