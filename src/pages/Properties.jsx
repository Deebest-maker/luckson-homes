import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3x3, List, X, ChevronDown } from "lucide-react";
import PropertyCard from "../components/common/PropertyCard";
import Button from "../components/common/Button";
import BackButton from "../components/BackButton";
import { properties } from "../data/mockData";
import { filterProperties, sortProperties } from "../utils/helpers";

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minSize: "",
    maxSize: "",
    status: "",
  });

  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const locations = [
    "All Locations",
    "Ijaida Estate, Karshi",
    "The Highland City, Sheretti, Kabusa",
  ];

  const propertyTypes = [
    "All Types",
    "Terrace",
    "Semi-Detached Duplex",
    "Fully Detached Duplex",
    "Terrace Duplex",
    "Apartment Complex",
  ];

  const bedroomOptions = ["Any", "2", "3", "4", "5", "6+"];
  const bathroomOptions = ["Any", "2", "3", "4", "5", "6+"];

  useEffect(() => {
    let result = properties;

    if (filters.location && filters.location !== "All Locations") {
      result = result.filter((p) => p.location.includes(filters.location));
    }

    if (filters.type && filters.type !== "All Types") {
      result = result.filter((p) => p.type === filters.type);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms && filters.bedrooms !== "Any") {
      const beds = filters.bedrooms === "6+" ? 6 : parseInt(filters.bedrooms);
      result = result.filter((p) =>
        filters.bedrooms === "6+" ? p.beds >= beds : p.beds === beds,
      );
    }

    if (filters.bathrooms && filters.bathrooms !== "Any") {
      const baths =
        filters.bathrooms === "6+" ? 6 : parseInt(filters.bathrooms);
      result = result.filter((p) =>
        filters.bathrooms === "6+" ? p.baths >= baths : p.baths === baths,
      );
    }

    if (filters.minSize) {
      result = result.filter((p) => p.size >= parseInt(filters.minSize));
    }

    if (filters.maxSize) {
      result = result.filter((p) => p.size <= parseInt(filters.maxSize));
    }

    if (filters.status && filters.status !== "All Status") {
      result = result.filter((p) => p.status === filters.status);
    }

    result = sortProperties(result, sortBy);

    setFilteredProperties(result);
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      minSize: "",
      maxSize: "",
      status: "",
    });
    setSortBy("default");
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Page Header with Background Image */}
      <section className="relative bg-navy py-16 overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')",
            opacity: 0.5,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-gold">Properties</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Browse our complete collection of premium properties in Abuja's
              finest locations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  icon={SlidersHorizontal}
                  fullWidth
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 1024) && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="text-gold" size={24} />
                        <h3 className="text-xl font-bold text-navy">Filters</h3>
                      </div>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gray-600 hover:text-gold transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    {/* Location Filter */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Location
                      </label>
                      <select
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                      >
                        {locations.map((loc) => (
                          <option
                            key={loc}
                            value={loc === "All Locations" ? "" : loc}
                          >
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Property Type */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Property Type
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) =>
                          handleFilterChange("type", e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                      >
                        {propertyTypes.map((type) => (
                          <option
                            key={type}
                            value={type === "All Types" ? "" : type}
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Price Range (₦)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) =>
                            handleFilterChange("minPrice", e.target.value)
                          }
                          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            handleFilterChange("maxPrice", e.target.value)
                          }
                          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Bedrooms */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Bedrooms
                      </label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) =>
                          handleFilterChange("bedrooms", e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                      >
                        {bedroomOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bathrooms */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Bathrooms
                      </label>
                      <select
                        value={filters.bathrooms}
                        onChange={(e) =>
                          handleFilterChange("bathrooms", e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                      >
                        {bathroomOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Size Range */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Size Range (SQM)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minSize}
                          onChange={(e) =>
                            handleFilterChange("minSize", e.target.value)
                          }
                          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxSize}
                          onChange={(e) =>
                            handleFilterChange("maxSize", e.target.value)
                          }
                          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Properties Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="text-gray-600">
                  Showing{" "}
                  <span className="font-bold text-navy">
                    {filteredProperties.length}
                  </span>{" "}
                  properties
                </div>

                {/* Sort & View Options */}
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none"
                  >
                    <option value="default">Sort By</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>

                  <div className="hidden sm:flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-gold text-navy"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      <Grid3x3 size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-gold text-navy"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              {filteredProperties.length > 0 ? (
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      : "flex flex-col gap-6"
                  }
                >
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PropertyCard
                        property={property}
                        onClick={() => handlePropertyClick(property.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
