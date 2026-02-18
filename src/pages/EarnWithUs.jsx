import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  TrendingUp,
  Gift,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { companyInfo } from "../data/mockData";
import BackButton from "../components/BackButton";

const EarnWithUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referralType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        referralType: "",
        message: "",
      });
    }, 5000);
  };

  // Benefits
  const benefits = [
    {
      icon: DollarSign,
      title: "Generous Commissions",
      description:
        "Earn competitive commissions on every successful referral. The more you refer, the more you earn!",
      color: "gold",
    },
    {
      icon: Users,
      title: "No Limit on Referrals",
      description:
        "Refer as many clients as you want. There's no cap on your earning potential with Luckson Homes.",
      color: "teal",
    },
    {
      icon: TrendingUp,
      title: "Lifetime Earnings",
      description:
        "Earn on repeat purchases! When your referrals buy again, you earn again. Build passive income streams.",
      color: "gold",
    },
    {
      icon: Gift,
      title: "Exclusive Bonuses",
      description:
        "Top performers receive special bonuses, gifts, and recognition in our monthly rewards program.",
      color: "teal",
    },
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description:
        "Fill out the form below to join our affiliate program. It's completely free to register!",
    },
    {
      number: "02",
      title: "Get Your Unique Link",
      description:
        "Receive a personalized referral link and marketing materials to share with your network.",
    },
    {
      number: "03",
      title: "Share with Friends",
      description:
        "Spread the word! Share your link on social media, WhatsApp, email, or directly with friends and family.",
    },
    {
      number: "04",
      title: "Earn Commissions",
      description:
        "When someone purchases a property through your link, you earn a commission. It's that simple!",
    },
  ];

  // Commission structure
  const commissions = [
    {
      type: "Terrace",
      commission: "5-10%",
      properties: "Commission on Sale Value",
    },
    {
      type: "Semi-Detached",
      commission: "5-10%",
      properties: "Commission on Sale Value",
    },
    {
      type: "Fully Detached",
      commission: "5-10%",
      properties: "Commission on Sale Value",
    },
  ];

  // Who can join
  const eligibleReferrers = [
    "Real Estate Agents",
    "Social Media Influencers",
    "Friends & Family",
    "Business Owners",
    "Content Creators",
    "Professional Networks",
    "Community Leaders",
    "Anyone with a Network!",
  ];

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-navy py-20 overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1758519291494-4e0ba9b21b0a?w=1920&q=80')",
            opacity: 0.7,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full mb-6 shadow-gold-lg"
            >
              <DollarSign className="text-navy" size={40} />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Earn </span>
              <span className="text-gold">With Us</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Turn your network into income! Join our referral program and earn
              generous commissions by recommending Luckson Homes properties to
              friends, family, and colleagues.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300 flex items-center gap-2"
              >
                Join Now - It's Free!
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">
              Why Join Our Program?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of partnering with Luckson Homes as an
              affiliate marketer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-cream p-6 rounded-xl shadow-lg hover:shadow-premium transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-${benefit.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <benefit.icon className="text-navy" size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in 4 simple steps. No experience needed!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-6xl font-bold text-gold/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-gold" size={32} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Commission Structure
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Earn competitive commissions based on property type. The more
              valuable the property, the higher your earnings!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {commissions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl text-center shadow-premium"
              >
                <h3 className="text-2xl font-bold text-navy mb-2">
                  {item.type}
                </h3>
                <div className="text-4xl font-bold text-gold my-4">
                  {item.commission}
                </div>
                <p className="text-gray-600">{item.properties}</p>
                <div className="mt-6 pt-6 border-t-2 border-cream">
                  <CheckCircle
                    className="inline-block text-teal mb-2"
                    size={24}
                  />
                  <p className="text-sm text-gray-600">
                    Paid within 7 days after sale completion
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gold font-bold text-xl">
              💰 Average Affiliate Earnings: ₦300,000 - ₦1,500,000/month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">Who Can Join?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our program is open to everyone! If you have a network, you can
              earn.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {eligibleReferrers.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-cream p-4 rounded-xl text-center font-semibold text-navy hover:bg-gold hover:text-white transition-all duration-300 cursor-default"
              >
                ✓ {role}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section id="signup" className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get you set up within 24 hours!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-premium p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle
                  className="mx-auto text-green-500 mb-4"
                  size={64}
                />
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for joining our affiliate program! We'll contact you
                  within 24 hours with your unique referral link and materials.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-teal hover:text-teal-dark font-semibold"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-navy font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-navy font-semibold mb-2">
                    How will you refer clients?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="referralType"
                    value={formData.referralType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="social-media">Social Media</option>
                    <option value="whatsapp">WhatsApp Groups</option>
                    <option value="personal-network">Personal Network</option>
                    <option value="real-estate-agent">
                      I'm a Real Estate Agent
                    </option>
                    <option value="content-creator">
                      Content Creator/Influencer
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-navy font-semibold mb-2">
                    Tell us about yourself (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your experience, network size, or any questions..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Join the Program
                  <ArrowRight size={20} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-300 mb-8">
              Our team is ready to help you get started and succeed as an
              affiliate partner.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href={`tel:${companyInfo.phones[0]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300 flex items-center gap-2"
              >
                <Phone size={20} />
                Call Us
              </motion.a>
              <motion.a
                href={`https://wa.me/${companyInfo.phones[0].replace(
                  /[^0-9]/g,
                  "",
                )}?text=Hi, I'm interested in joining the Luckson Homes affiliate program.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold hover:bg-gold hover:text-navy transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare size={20} />
                WhatsApp
              </motion.a>
              <motion.a
                href={`mailto:${companyInfo.email}?subject=Affiliate Program Inquiry`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold hover:bg-gold hover:text-navy transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={20} />
                Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EarnWithUs;
