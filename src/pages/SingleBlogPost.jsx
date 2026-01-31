import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SingleBlogPost = () => {
  const { id } = useParams();

  // Full blog post data (in production, fetch from API)
  const blogPost = {
    id: 1,
    title: "Top 10 Real Estate Investment Tips for First-Time Buyers in Abuja",
    category: "Investment",
    author: "Hilary Moses Luckson",
    date: "January 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    content: `
      <p>Investing in real estate for the first time can be both exciting and overwhelming. Abuja's property market offers tremendous opportunities for first-time buyers, but success requires careful planning and informed decision-making.</p>

      <h2>1. Understand Your Budget</h2>
      <p>Before you start house hunting, establish a realistic budget. Consider not just the property price, but also:</p>
      <ul>
        <li>Legal fees and documentation costs</li>
        <li>Agent commissions</li>
        <li>Renovation and furnishing expenses</li>
        <li>Ongoing maintenance costs</li>
      </ul>

      <h2>2. Research Locations Thoroughly</h2>
      <p>Location is everything in real estate. Popular areas in Abuja include Wuye, Katampe Extension, Lokogoma, and Gwarinpa. Consider proximity to:</p>
      <ul>
        <li>Your workplace</li>
        <li>Schools and hospitals</li>
        <li>Shopping centers and amenities</li>
        <li>Public transportation</li>
      </ul>

      <h2>3. Verify Property Documentation</h2>
      <p>This is crucial! Ensure all documents are genuine and up-to-date. Key documents include:</p>
      <ul>
        <li>Certificate of Occupancy (C of O)</li>
        <li>Survey plan</li>
        <li>Deed of Assignment</li>
        <li>Building approval</li>
      </ul>

      <h2>4. Inspect the Property Personally</h2>
      <p>Never buy property sight unseen. Visit during different times of the day to assess:</p>
      <ul>
        <li>Structural integrity</li>
        <li>Water and power supply</li>
        <li>Security situation</li>
        <li>Neighborhood quality</li>
      </ul>

      <h2>5. Work with Trusted Professionals</h2>
      <p>Partner with reputable real estate companies like Luckson Homes. A trustworthy agent will:</p>
      <ul>
        <li>Show you verified properties only</li>
        <li>Handle documentation properly</li>
        <li>Negotiate fair prices on your behalf</li>
        <li>Provide post-purchase support</li>
      </ul>

      <h2>6. Consider Future Development</h2>
      <p>Buy in areas with growth potential. Look for:</p>
      <ul>
        <li>Ongoing infrastructure projects</li>
        <li>New government or commercial developments</li>
        <li>Areas attracting young professionals</li>
      </ul>

      <h2>7. Understand Payment Options</h2>
      <p>Explore different payment methods:</p>
      <ul>
        <li>Outright purchase (often comes with discounts)</li>
        <li>Installment plans (spread payments over time)</li>
        <li>Mortgage financing (requires down payment)</li>
      </ul>

      <h2>8. Don't Rush the Decision</h2>
      <p>Take your time! A property is a long-term investment. Compare multiple options, sleep on it, and consult family or financial advisors before committing.</p>

      <h2>9. Factor in Appreciation Potential</h2>
      <p>Consider the property's potential to increase in value over time. Properties near major roads, estates with good amenities, and well-planned neighborhoods typically appreciate faster.</p>

      <h2>10. Start Small if Necessary</h2>
      <p>You don't have to buy a mansion on your first try! Starting with a smaller, affordable property allows you to:</p>
      <ul>
        <li>Enter the market sooner</li>
        <li>Build equity</li>
        <li>Upgrade later when finances improve</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Investing in real estate is one of the best financial decisions you can make. By following these tips and working with trusted professionals like Luckson Homes, you'll be well on your way to becoming a successful property owner in Abuja.</p>

      <p><strong>Ready to start your real estate journey?</strong> Contact Luckson Homes today for expert guidance and access to premium properties across Abuja.</p>
    `,
  };

  // Related posts
  const relatedPosts = [
    {
      id: 2,
      title: "Understanding Property Documentation in Nigeria",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    },
    {
      id: 3,
      title: "Why Wuye and Katampe Are Hot Locations",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    },
  ];

  // Share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>

        {/* Back Button */}
        <Link
          to="/blog"
          className="absolute top-8 left-8 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold mb-4">
              {blogPost.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center gap-4 pb-8 border-b-2 border-gray-200"
          >
            <span className="font-semibold text-navy flex items-center gap-2">
              <Share2 size={20} />
              Share:
            </span>
            <button
              onClick={() => handleShare("facebook")}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              title="Share on Facebook"
            >
              <Facebook size={18} className="text-white" />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
              title="Share on Twitter"
            >
              <Twitter size={18} className="text-white" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin size={18} className="text-white" />
            </button>
          </motion.div>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
            style={{
              color: "#374151",
              lineHeight: "1.8",
            }}
          />

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-navy rounded-2xl"
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-navy">
                  {blogPost.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  About {blogPost.author}
                </h3>
                <p className="text-gray-300 mb-4">
                  CEO and Founder of Luckson Homes, bringing expertise in real
                  estate development, investment strategies, and market
                  analysis. Passionate about helping Nigerians achieve their
                  property ownership dreams.
                </p>
                <Link
                  to="/director-portfolio"
                  className="text-gold hover:text-gold-light font-semibold inline-flex items-center gap-2"
                >
                  View Full Profile →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="group block bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Invest in Real Estate?
            </h2>
            <p className="text-gray-300 mb-8">
              Let Luckson Homes guide you through your property investment
              journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/properties">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300"
                >
                  View Properties
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold hover:bg-gold hover:text-navy transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add custom styles for article content */}
      <style>{`
        .prose h2 {
          color: #0A1128;
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          color: #374151;
        }
        .prose ul {
          list-style-type: disc;
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          color: #374151;
        }
        .prose strong {
          color: #C9A961;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default SingleBlogPost;
