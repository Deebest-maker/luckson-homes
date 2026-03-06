// src/pages/Blog.jsx - READS FROM FIRESTORE
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

// Loading Skeleton Component
const BlogSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="aspect-video bg-gray-300" />
    <div className="p-6">
      <div className="flex gap-4 mb-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
      <div className="h-6 bg-gray-300 rounded w-full mb-3" />
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-32" />
    </div>
  </div>
);

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);

  // Fetch blog posts from Firestore
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(postsData);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(postsData.map((post) => post.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Recent";

    // Handle Firestore Timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-navy py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
            opacity: 0.5,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

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
          {!loading && (
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
          )}

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
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
                        src={
                          // Handle both array and string formats
                          (Array.isArray(post.featuredImage)
                            ? post.featuredImage[0]
                            : post.featuredImage) ||
                          post.image ||
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";
                        }}
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-gold text-navy px-3 py-1 rounded-full text-xs font-bold">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.createdAt || post.date)}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + "..."}
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
                    {post.readTime && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500">
                          ⏱️ {post.readTime}
                        </span>
                      </div>
                    )}
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
              <div className="text-6xl mb-4">
                {blogPosts.length === 0 ? "📝" : "🔍"}
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                {blogPosts.length === 0
                  ? "No articles yet"
                  : "No articles found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {blogPosts.length === 0
                  ? "Check back soon for real estate insights and tips!"
                  : "Try adjusting your search or category filter"}
              </p>
              {blogPosts.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="bg-gradient-gold text-navy px-6 py-3 rounded-lg font-bold shadow-gold hover:shadow-gold-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
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
