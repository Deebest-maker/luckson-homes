import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Calendar,
  Hash,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import PropertyCard from "../components/common/PropertyCard";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import BackButton from "../components/BackButton";
import { properties, companyInfo } from "../data/mockData";
import { formatPrice, shareOnSocial } from "../utils/helpers";

const SingleProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mortgage Calculator State
  const [loanAmount, setLoanAmount] = useState(property?.price * 0.8 || 0);
  const [interestRate, setInterestRate] = useState(15);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in ${property?.name}. Please contact me with more details.`,
  });
  const [formStatus, setFormStatus] = useState("idle");

  if (!property) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Property Not Found
          </h2>
          <Button onClick={() => navigate("/properties")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  // Similar properties
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location === property.location ||
          Math.abs(p.price - property.price) < 5000000),
    )
    .slice(0, 3);

  // Calculate mortgage
  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setMonthlyPayment(Math.round(payment));
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");

    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  // Handle WhatsApp contact
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ${property.name} (${property.propertyId}) priced at ${formatPrice(property.price)}. Can you provide more details?`,
    );
    window.open(
      `https://wa.me/${companyInfo.whatsapp.replace(/\s/g, "")}?text=${message}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Image Gallery */}
      <section className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4 group">
            <img
              src={property.images[currentImageIndex]}
              alt={property.name}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex - 1 + property.images.length) %
                        property.images.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={24} className="text-navy" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (currentImageIndex + 1) % property.images.length,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} className="text-navy" />
                </button>
              </>
            )}

            {/* Lightbox Button */}
            <button
              onClick={() => setShowLightbox(true)}
              className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-lg text-navy font-semibold"
            >
              View All Photos ({property.images.length})
            </button>

            {/* Favorite & Share */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/90 p-3 rounded-full shadow-lg"
              >
                <Heart
                  size={24}
                  className={
                    isFavorite ? "fill-red-500 text-red-500" : "text-navy"
                  }
                />
              </button>
              <button
                onClick={() =>
                  shareOnSocial("whatsapp", window.location.href, property.name)
                }
                className="bg-white/90 p-3 rounded-full shadow-lg"
              >
                <Share2 size={24} className="text-navy" />
              </button>
            </div>

            {/* Badge */}
            {property.badge && (
              <div className="absolute top-4 left-4 bg-gold text-navy px-4 py-2 rounded-full font-bold shadow-lg">
                {property.badge}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {property.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-4 transition-all ${
                    index === currentImageIndex
                      ? "border-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Property Details */}
            <div className="flex-1">
              {/* Property Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-navy mb-2">
                      {property.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={20} className="text-gold" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gold">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {property.status}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t-2 border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Bed className="text-gold" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                      <div className="font-bold text-navy">{property.beds}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Bath className="text-gold" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                      <div className="font-bold text-navy">
                        {property.baths}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Maximize className="text-gold" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Size</div>
                      <div className="font-bold text-navy">
                        {property.size} SQM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Car className="text-gold" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Parking</div>
                      <div className="font-bold text-navy">
                        {property.parking}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} className="text-gold" />
                    <span className="text-sm">
                      Year Built: <strong>{property.yearBuilt}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Hash size={18} className="text-gold" />
                    <span className="text-sm">
                      ID: <strong>{property.propertyId}</strong>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-navy mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mortgage Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Mortgage Calculator
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Loan Amount (₦)
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Interest Rate (% per year)
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Loan Term (years)
                    </label>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                    />
                  </div>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={calculateMortgage}
                  >
                    Calculate Monthly Payment
                  </Button>
                  {monthlyPayment > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gold/10 rounded-xl p-6 text-center"
                    >
                      <div className="text-sm text-gray-600 mb-2">
                        Estimated Monthly Payment
                      </div>
                      <div className="text-3xl font-bold text-gold">
                        {formatPrice(monthlyPayment)}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-navy mb-6">
                    Similar Properties
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onClick={() => navigate(`/properties/${prop.id}`)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Contact Form (Sticky) */}
            <div className="lg:w-96 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h3 className="text-xl font-bold text-navy mb-4">
                  Interested in this property?
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    required
                  />
                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading"
                      ? "Sending..."
                      : formStatus === "success"
                        ? "Sent Successfully!"
                        : "Send Enquiry"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t-2 border-gray-100">
                  <div className="text-sm text-gray-600 mb-4 text-center">
                    Or contact us directly:
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        (window.location.href = `tel:${companyInfo.phones[0]}`)
                      }
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
                    >
                      <Phone size={18} />
                      Call Now
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal text-white rounded-lg hover:bg-teal-light transition-colors"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        title={property.name}
        size="xl"
      >
        <div className="grid grid-cols-1 gap-4">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${property.name} - ${index + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SingleProperty;
