import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "../../utils/helpers";
import Badge from "./Badge";
import Button from "./Button";

const PropertyCard = ({ property, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Determine badge variant based on badge text
  const getBadgeVariant = (badgeText) => {
    const text = badgeText.toLowerCase();
    if (text.includes("hot")) return "hot";
    if (text.includes("new")) return "new";
    if (text.includes("featured")) return "featured";
    if (text.includes("exclusive")) return "exclusive";
    if (text.includes("trending")) return "trending";
    if (text.includes("premium")) return "premium";
    return "default";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {property.badge && (
          <div className="absolute top-4 right-4">
            <Badge
              text={property.badge}
              variant={getBadgeVariant(property.badge)}
            />
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-navy"
            } transition-colors`}
          />
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Price & Location */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-3xl font-bold text-gold">
            {formatPrice(property.price)}
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
          </motion.div>
        </div>

        {/* Property Name */}
        <h3 className="text-xl font-bold text-navy mb-2 line-clamp-1">
          {property.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin size={18} className="text-gold flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-gold" />
            <span className="text-sm text-gray-600">{property.beds}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-gold" />
            <span className="text-sm text-gray-600">{property.baths}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={18} className="text-gold" />
            <span className="text-sm text-gray-600">{property.size} SQM</span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          variant="secondary"
          size="md"
          icon={ChevronRight}
          iconPosition="right"
          fullWidth
          className="mt-6"
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          VIEW DETAILS
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
