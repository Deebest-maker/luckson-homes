import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { companyInfo } from "../data/mockData";
import BackButton from "../components/BackButton";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Office coordinates (Wuye, Abuja - approximate)
  const officePosition = [9.0574, 7.4864];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      setFormStatus({
        type: "success",
        message:
          "Thank you for contacting us! We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setFormStatus({ type: "", message: "" });
      }, 5000);
    }, 1500);
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      info: companyInfo.phones,
      action: `tel:${companyInfo.phones[0]}`,
      color: "gold",
    },
    {
      icon: Mail,
      title: "Email Us",
      info: [companyInfo.email],
      action: `mailto:${companyInfo.email}`,
      color: "teal",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      info: [companyInfo.phones[0]],
      action: `https://wa.me/${companyInfo.phones[0].replace(/[^0-9]/g, "")}`,
      color: "gold",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: [companyInfo.address],
      action: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        companyInfo.address,
      )}`,
      color: "teal",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://facebook.com/lucksonhomes",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/lucksonhomes",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/lucksonhomes",
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/company/lucksonhomes",
      color: "bg-blue-700 hover:bg-blue-800",
    },
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
              "url('https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80')",
            opacity: 0.5,
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
              <MessageSquare className="text-navy" size={40} />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Get in </span>
              <span className="text-gold">Touch</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Have a question about our properties? Want to schedule a viewing?
              We're here to help you find your dream home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <motion.a
                key={index}
                href={card.action}
                target={card.action.startsWith("http") ? "_blank" : "_self"}
                rel={
                  card.action.startsWith("http") ? "noopener noreferrer" : ""
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-cream p-6 rounded-xl shadow-lg hover:shadow-premium transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 bg-gradient-${card.color} rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <card.icon className="text-navy" size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy text-center mb-3">
                  {card.title}
                </h3>
                <div className="text-center space-y-1">
                  {card.info.map((item, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-navy mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                      formStatus.type === "success"
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-red-50 border-2 border-red-200"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle
                        className="text-green-600 flex-shrink-0 mt-0.5"
                        size={20}
                      />
                    ) : (
                      <AlertCircle
                        className="text-red-600 flex-shrink-0 mt-0.5"
                        size={20}
                      />
                    )}
                    <p
                      className={`text-sm ${
                        formStatus.type === "success"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  </motion.div>
                )}

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

                  <div className="grid sm:grid-cols-2 gap-4">
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Property Inquiry"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-navy border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Office Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                    <Clock className="text-navy" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-semibold text-navy">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaflet Map */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-[400px] relative z-0">
                  <MapContainer
                    center={officePosition}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={officePosition}>
                      <Popup>
                        <div className="text-center p-2">
                          <strong className="text-navy font-bold">
                            Luckson Homes
                          </strong>
                          <p className="text-sm text-gray-600 mt-1">
                            {companyInfo.address}
                          </p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              companyInfo.address,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal hover:text-teal-dark text-sm font-semibold mt-2 inline-block"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-navy mb-2">Our Office</h4>
                  <p className="text-gray-600 flex items-start gap-2 mb-3">
                    <MapPin
                      size={18}
                      className="text-gold mt-1 flex-shrink-0"
                    />
                    {companyInfo.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      companyInfo.address,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal hover:text-teal-dark font-semibold text-sm transition-colors"
                  >
                    Open in Google Maps
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-navy mb-6">Follow Us</h3>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
                      title={social.name}
                    >
                      <social.icon className="text-white" size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-300 mb-8">
              Our team is available to answer your questions and schedule
              property viewings.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href={`tel:${companyInfo.phones[0]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300 flex items-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </motion.a>
              <motion.a
                href={`https://wa.me/${companyInfo.phones[0].replace(
                  /[^0-9]/g,
                  "",
                )}?text=Hello, I'm interested in learning more about your properties.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold hover:bg-gold hover:text-navy transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare size={20} />
                WhatsApp Chat
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
