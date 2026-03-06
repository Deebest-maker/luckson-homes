// src/components/sections/FeaturedProperties.jsx - UPDATED FOR FIRESTORE
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../common/PropertyCard";
import Button from "../common/Button";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured properties from Firestore
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        // Try to get featured properties first
        const featuredQuery = query(
          collection(db, "properties"),
          where("isFeatured", "==", true),
          limit(6),
        );

        let querySnapshot = await getDocs(featuredQuery);

        // If no featured properties, get the latest 6 properties
        if (querySnapshot.empty) {
          const latestQuery = query(collection(db, "properties"), limit(6));
          querySnapshot = await getDocs(latestQuery);
        }

        const propertiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Map Firestore fields to your existing structure
          name: doc.data().title,
          beds: doc.data().bedrooms,
          baths: doc.data().bathrooms,
          featured: doc.data().isFeatured,
        }));

        setFeaturedProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (featuredProperties.length === 0) {
    return (
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-navy mb-4">
              Featured Properties
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-gold via-teal to-gold mx-auto mb-6"
            />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Discover our exclusive collection of premium properties
            </p>
            <div className="py-12">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-gray-500 mb-6">No properties available yet</p>
              <p className="text-sm text-gray-400">
                Check back soon for exciting listings!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Featured Properties
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
            Discover our handpicked selection of premium properties in Abuja's
            most sought-after locations
          </motion.p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProperties.map((property, index) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard
                property={property}
                onClick={() => handlePropertyClick(property.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Button
            variant="secondary"
            size="lg"
            icon={ChevronRight}
            iconPosition="right"
            onClick={() => navigate("/properties")}
          >
            VIEW ALL PROPERTIES
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
