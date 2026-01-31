import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title:
        "Top 10 Real Estate Investment Tips for First-Time Buyers in Abuja",
      excerpt:
        "Investing in real estate for the first time? Here are essential tips to help you make smart decisions and maximize your returns in Abuja's growing property market.",
      category: "Investment",
      author: "Hilary Moses Luckson",
      date: "January 15, 2025",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      readTime: "5 min read",
    },
    {
      id: 2,
      title:
        "Understanding Property Documentation in Nigeria: A Complete Guide",
      excerpt:
        "Navigate the complex world of property documentation with confidence. Learn about C of O, Right of Occupancy, and other essential legal requirements.",
      category: "Legal",
      author: "Luckson Homes Team",
      date: "January 10, 2025",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      readTime: "8 min read",
    },
    {
      id: 3,
      title:
        "Why Wuye and Katampe Are the Hottest Real Estate Locations in 2025",
      excerpt:
        "Discover why these Abuja neighborhoods are attracting investors and families alike. Explore infrastructure developments and growth projections.",
      category: "Market Trends",
      author: "Hilary Moses Luckson",
      date: "January 5, 2025",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "How to Secure a Mortgage in Nigeria: Step-by-Step Process",
      excerpt:
        "Getting a mortgage doesn't have to be complicated. Learn the requirements, documentation, and strategies to increase your approval chances.",
      category: "Finance",
      author: "Luckson Homes Team",
      date: "December 28, 2024",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Estate Living vs. Individual Plots: Which is Right for You?",
      excerpt:
        "Comparing the benefits and drawbacks of gated estate communities versus standalone properties. Make an informed decision for your lifestyle.",
      category: "Buying Guide",
      author: "Hilary Moses Luckson",
      date: "December 20, 2024",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      readTime: "7 min read",
    },
    {
      id: 6,
      title:
        "Property Maintenance Tips: Protecting Your Real Estate Investment",
      excerpt:
        "Regular maintenance preserves property value and prevents costly repairs. Discover essential upkeep strategies for Nigerian properties.",
      category: "Maintenance",
      author: "Luckson Homes Team",
      date: "December 15, 2024",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
      readTime: "5 min read",
    },
  ];

  // Categories
  const categories = [
    "All",
    "Investment",
    "Legal",
    "Market Trends",
    "Finance",
    "Buying Guide",
    "Maintenance",
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
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
              <BookOpen className="text-navy" size={40} />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Real Estate </span>
              <span className="text-gold">Insights</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Expert advice, market trends, and practical guides to help you
              navigate Nigeria's real estate landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-gold text-navy shadow-gold"
                      : "bg-cream text-navy hover:bg-gold/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-navy">
                {filteredPosts.length}
              </span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && (
                <span className="text-gold"> in {selectedCategory}</span>
              )}
            </p>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-300 group"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative overflow-hidden aspect-video">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-teal hover:text-teal-dark font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Read Article
                      <ArrowRight size={16} />
                    </Link>

                    {/* Read Time */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">
                        ⏱️ {post.readTime}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or category filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-gradient-gold text-navy px-6 py-3 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest real estate insights,
              market updates, and exclusive property listings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-gold text-navy px-8 py-3 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
