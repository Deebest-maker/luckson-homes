import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: "Abuja FCT",
    location: "",
    size: "",
    priceRange: "",
  });

  // Available locations in Abuja (REAL LUCKSON HOMES LOCATIONS)
  const locations = [
    "All Locations",
    "Ijaida Estate, Karshi",
    "The Highland City, Sheretti, Kabusa",
  ];

  // Property sizes (REAL SIZES)
  const sizes = [
    "Any Size",
    "150 SQM",
    "200 SQM",
    "250 SQM",
    "350 SQM",
    "450 SQM",
    "500 SQM",
    "750 SQM",
  ];

  // Price ranges (REAL PRICE RANGES)
  const priceRanges = [
    "Any Price",
    "Under ₦5M",
    "₦5M - ₦10M",
    "₦10M - ₦20M",
    "₦20M - ₦30M",
    "Above ₦30M",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to properties page with search params
    const params = new URLSearchParams();
    if (searchData.location && searchData.location !== "All Locations") {
      params.append("location", searchData.location);
    }
    if (searchData.size && searchData.size !== "Any Size") {
      params.append("size", searchData.size);
    }
    if (searchData.priceRange && searchData.priceRange !== "Any Price") {
      params.append("price", searchData.priceRange);
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative bg-navy text-white min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-50 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-blue-900/90" />

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#C9A961_1px,transparent_1px)] bg-[length:50px_50px]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-gold">LUCKSON</span>{" "}
            <span className="text-white">HOMES</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl mb-4 text-white/90 font-medium"
          >
            REAL ESTATE | INVESTMENT | PROJECT MANAGEMENT
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            Your Dream Property Awaits in Abuja's Premium Locations
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="max-w-5xl mx-auto"
        >
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* City Selector */}
              <div className="relative">
                <select
                  value={searchData.city}
                  onChange={(e) =>
                    setSearchData({ ...searchData, city: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-all appearance-none text-navy font-medium bg-white cursor-pointer"
                >
                  <option>Abuja FCT</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>

              {/* Location Selector */}
              <div className="relative">
                <select
                  value={searchData.location}
                  onChange={(e) =>
                    setSearchData({ ...searchData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-all appearance-none text-navy font-medium bg-white cursor-pointer"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>

              {/* Property Size */}
              <div className="relative">
                <select
                  value={searchData.size}
                  onChange={(e) =>
                    setSearchData({ ...searchData, size: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-all appearance-none text-navy font-medium bg-white cursor-pointer"
                >
                  <option value="">Property Size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(201, 169, 97, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                SEARCH
              </motion.button>
            </div>

            {/* Price Range (Full Width Below) */}
            <div className="relative mt-4">
              <select
                value={searchData.priceRange}
                onChange={(e) =>
                  setSearchData({ ...searchData, priceRange: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-all appearance-none text-navy font-medium bg-white cursor-pointer"
              >
                <option value="">Select Price Range</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </form>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-sm">Scroll to explore</span>
            <ChevronDown className="text-gold" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
