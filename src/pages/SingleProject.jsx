import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  CheckCircle,
  Bed,
  Bath,
  Maximize,
  ArrowLeft,
  Phone,
  MessageCircle,
} from "lucide-react";
import Button from "../components/common/Button";
import { projects, companyInfo } from "../data/mockData";
import { formatPrice } from "../utils/helpers";

const SingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  const [selectedUnit, setSelectedUnit] = useState(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Project Not Found
          </h2>
          <Button onClick={() => navigate("/projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const handleWhatsApp = (unitType = null) => {
    const message = encodeURIComponent(
      unitType
        ? `Hi! I'm interested in the ${unitType} at ${project.name} (${project.location}). Can you provide more details?`
        : `Hi! I'm interested in ${project.name} (${project.location}). Can you provide more details about available units?`,
    );
    window.open(
      `https://wa.me/${companyInfo.whatsapp.replace(/\s/g, "")}?text=${message}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Back Button */}
      <section className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => navigate("/projects")}
            className="text-white hover:text-gold"
          >
            Back to Projects
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <CheckCircle size={18} />
                {project.status}
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {project.name}
            </h1>
            <div className="flex items-center gap-3 text-xl text-white/80 mb-6">
              <MapPin size={24} className="text-gold" />
              <span>{project.fullAddress}</span>
            </div>
            <p className="text-lg text-white/90 max-w-4xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Master Plan */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-navy mb-8">
              Estate Master Plan
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={project.masterPlan}
                alt={`${project.name} Master Plan`}
                className="w-full h-[600px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Units", value: project.totalUnits, icon: Home },
              {
                label: "Property Types",
                value: project.availableUnits.length,
                icon: Home,
              },
              {
                label: "Starting Price",
                value: formatPrice(project.startingPrice).replace(
                  /,000,000/g,
                  "M",
                ),
                icon: Home,
              },
              {
                label: "Amenities",
                value: project.amenities.length,
                icon: Home,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-3xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-navy mb-8">
              Available Property Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.availableUnits.map((unit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-cream rounded-xl p-6 shadow-lg cursor-pointer group"
                  onClick={() => setSelectedUnit(unit)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                        {unit.type}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {unit.available} units available
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gold">
                        {formatPrice(unit.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 py-4 border-t-2 border-gray-200">
                    <div className="flex items-center gap-2">
                      <Bed className="text-gold" size={20} />
                      <span className="text-gray-700">{unit.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="text-gold" size={20} />
                      <span className="text-gray-700">{unit.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="text-gold" size={20} />
                      <span className="text-gray-700">{unit.size} SQM</span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    fullWidth
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(unit.type);
                    }}
                  >
                    Enquire About This Unit
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-4xl font-bold text-navy mb-8">
              Estate Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <CheckCircle className="text-gold flex-shrink-0" size={20} />
                  <span>{amenity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Plans */}
      {project.paymentPlans && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-navy mb-8">
                Payment Plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.paymentPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gold/10 to-teal/10 rounded-xl p-6 text-center"
                  >
                    <div className="text-5xl mb-4">💰</div>
                    <div className="font-semibold text-navy">{plan}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Secure Your Unit in {project.name}?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contact us today to schedule a site visit or get more information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={Phone}
                onClick={() =>
                  (window.location.href = `tel:${companyInfo.phones[0]}`)
                }
              >
                Call Now
              </Button>
              <Button
                variant="white"
                size="lg"
                icon={MessageCircle}
                onClick={() => handleWhatsApp()}
              >
                WhatsApp Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SingleProject;
