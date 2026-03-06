// src/pages/admin/EditBlogPost.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featuredImage: [],
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    author: "Admin",
  });

  // Available categories
  const categories = [
    "Real Estate Tips",
    "Market Trends",
    "Investment Guide",
    "Property News",
    "Home Buying",
    "Home Selling",
    "Interior Design",
    "Legal Advice",
    "Company News",
  ];

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blog", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            category: data.category || "",
            tags: Array.isArray(data.tags)
              ? data.tags.join(", ")
              : data.tags || "",
            featuredImage: data.featuredImage ? [data.featuredImage] : [],
            status: data.status || "draft",
            seoTitle: data.seoTitle || "",
            seoDescription: data.seoDescription || "",
            author: data.author || "Admin",
          });
        } else {
          setError("Post not found");
          setTimeout(() => navigate("/admin/blog"), 2000);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  const handleImageChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.content) {
        setError("Please fill in title and content");
        setSaving(false);
        return;
      }

      // Update post object
      const postData = {
        ...formData,
        featuredImage: formData.featuredImage[0] || "",
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updatedAt: serverTimestamp(),
      };

      // Update in Firestore
      const docRef = doc(db, "blog", id);
      await updateDoc(docRef, postData);

      // Success! Redirect to blog list
      navigate("/admin/blog");
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/blog")}
            className="text-navy hover:text-gold mb-4 inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </button>
          <h1 className="text-3xl font-bold text-navy">Edit Post</h1>
          <p className="text-gray-600 mt-2">Update your blog post</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-8"
        >
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Top 10 Real Estate Investment Tips for 2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug{" "}
                <span className="text-gray-500 text-xs">(Auto-generated)</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="top-10-real-estate-investment-tips-2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt{" "}
                <span className="text-gray-500 text-xs">(Brief summary)</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Short description of the post (will appear in previews)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags{" "}
                  <span className="text-gray-500 text-xs">
                    (Comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="real estate, investment, tips"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Post Content
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                placeholder="Write your blog post content here... (Supports line breaks and basic formatting)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use line breaks to separate paragraphs
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Featured Image
            </h2>

            <ImageUpload
              images={formData.featuredImage}
              onChange={handleImageChange}
              maxImages={1}
            />
          </div>

          {/* SEO */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              SEO Settings
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title{" "}
                <span className="text-gray-500 text-xs">
                  (Optional - defaults to post title)
                </span>
              </label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="Custom title for search engines"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Description{" "}
                <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Description for search engines (150-160 characters recommended)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Publishing
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              >
                <option value="draft">Draft (Save for later)</option>
                <option value="published">Published (Live on website)</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/blog")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                saving
                  ? "bg-gold/50 cursor-not-allowed"
                  : "bg-gold hover:bg-[#D4AF37] shadow-lg hover:shadow-xl"
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving Changes...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditBlogPost;
