// src/pages/SingleProject.jsx - READS FROM FIRESTORE
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
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
import { formatPrice } from "../utils/helpers";

const SingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchProjectAndProperties = async () => {
      try {
        // Fetch project details
        const projectDoc = await getDoc(doc(db, "projects", id));

        if (projectDoc.exists()) {
          setProject({ id: projectDoc.id, ...projectDoc.data() });

          // Fetch properties linked to this project
          const propertiesQuery = query(
            collection(db, "properties"),
            where("projectId", "==", id),
          );
          const propertiesSnapshot = await getDocs(propertiesQuery);
          const propertiesData = propertiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProperties(propertiesData);
        }

        // Fetch contact info
        const contactDoc = await getDoc(doc(db, "pages", "contact"));
        if (contactDoc.exists()) {
          setContactData(contactDoc.data());
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndProperties();
  }, [id]);

  const handleWhatsApp = (propertyTitle = null) => {
    const whatsappNumber = contactData?.whatsapp || "+234 800 000 0000";
    const message = encodeURIComponent(
      propertyTitle
        ? `Hi! I'm interested in the ${propertyTitle} at ${project.name}. Can you provide more details?`
        : `Hi! I'm interested in ${project.name}. Can you provide more details about available units?`,
    );
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\s/g, "")}?text=${message}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-navy text-lg">Loading project...</p>
        </div>
      </div>
    );
  }

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
            {project.status && (
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                  <CheckCircle size={18} />
                  {project.status}
                </div>
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {project.name}
            </h1>
            <div className="flex items-center gap-3 text-xl text-white/80 mb-6">
              <MapPin size={24} className="text-gold" />
              <span>{project.fullAddress || project.location}</span>
            </div>
            <p className="text-lg text-white/90 max-w-4xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Master Plan */}
      {(project.images?.[0] || project.masterPlan) && (
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
                  src={
                    project.images?.[0] ||
                    project.masterPlan ||
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  }
                  alt={`${project.name} Master Plan`}
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Units",
                value: project.totalUnits || "N/A",
                icon: Home,
              },
              {
                label: "Property Types",
                value: properties.length || "N/A",
                icon: Home,
              },
              {
                label: "Starting Price",
                value: project.startingPrice
                  ? formatPrice(project.startingPrice).replace(/,000,000/g, "M")
                  : "Contact",
                icon: Home,
              },
              {
                label: "Amenities",
                value: project.amenities?.length || 0,
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

      {/* Available Units - FROM FIRESTORE */}
      {properties.length > 0 && (
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
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-cream rounded-xl p-6 shadow-lg cursor-pointer group"
                    onClick={() => navigate(`/properties/${property.id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                          {property.title || property.propertyType}
                        </h3>
                        <div className="text-sm text-gray-600">
                          {property.status || "Available"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gold">
                          {formatPrice(property.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 py-4 border-t-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        <Bed className="text-gold" size={20} />
                        <span className="text-gray-700">
                          {property.bedrooms || property.beds} Beds
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="text-gold" size={20} />
                        <span className="text-gray-700">
                          {property.bathrooms || property.baths} Baths
                        </span>
                      </div>
                      {property.size && (
                        <div className="flex items-center gap-2">
                          <Maximize className="text-gold" size={20} />
                          <span className="text-gray-700">
                            {property.size} SQM
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="secondary"
                      fullWidth
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsApp(property.title);
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
      )}

      {/* Amenities */}
      {project.amenities && project.amenities.length > 0 && (
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
                    <CheckCircle
                      className="text-gold flex-shrink-0"
                      size={20}
                    />
                    <span>{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Payment Plans */}
      {project.paymentPlans && project.paymentPlans.length > 0 && (
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
                  (window.location.href = `tel:${contactData?.phonePrimary || "+234 800 000 0000"}`)
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
