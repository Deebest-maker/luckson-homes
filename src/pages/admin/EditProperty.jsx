// src/pages/admin/EditProperty.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    city: "Abuja FCT",
    propertyType: "Duplex",
    status: "For Sale",
    bedrooms: "",
    bathrooms: "",
    size: "",
    features: [],
    isFeatured: false,
    badge: "",
    images: [],
  });

  // Available options
  const cities = ["Abuja FCT", "Lagos", "Port Harcourt", "Kano", "Ibadan"];
  const locations = {
    "Abuja FCT": [
      "Katampe",
      "Life Camp",
      "Lokogoma",
      "Gwarinpa",
      "Maitama",
      "Jahi",
      "Wuye",
      "Asokoro",
      "Garki",
      "Wuse",
      "Karshi",
      "Sheretti",
    ],
    Lagos: ["Lekki", "Victoria Island", "Ikoyi", "Ajah", "Ikeja"],
    "Port Harcourt": ["GRA", "Trans Amadi", "Rumuola"],
    Kano: ["Nassarawa", "Fagge", "Gwale"],
    Ibadan: ["Bodija", "Agodi", "Jericho"],
  };
  const propertyTypes = [
    "Duplex",
    "Semi-Detached",
    "Terrace",
    "Mansion",
    "Villa",
    "Apartment",
    "Bungalow",
    "Land",
  ];
  const statuses = ["For Sale", "For Rent", "Sold"];
  const badges = [
    "",
    "HOT OFFER",
    "FEATURED",
    "NEW",
    "EXCLUSIVE",
    "PRICE REDUCED",
  ];

  const availableFeatures = [
    "Swimming Pool",
    "24hr Security",
    "Gym",
    "Parking",
    "Garden",
    "Power Supply",
    "Water Supply",
    "Good Road Network",
    "Serene Environment",
    "Gated Estate",
    "Shopping Mall Nearby",
    "Schools Nearby",
    "Hospitals Nearby",
  ];

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            location: data.location || "",
            city: data.city || "Abuja FCT",
            propertyType: data.propertyType || "Duplex",
            status: data.status || "For Sale",
            bedrooms: data.bedrooms || "",
            bathrooms: data.bathrooms || "",
            size: data.size || "",
            features: data.features || [],
            isFeatured: data.isFeatured || false,
            badge: data.badge || "",
            images: data.images || [],
          });
        } else {
          setError("Property not found");
          setTimeout(() => navigate("/admin/properties"), 2000);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.price || !formData.location) {
        setError("Please fill in all required fields");
        setSaving(false);
        return;
      }

      if (formData.images.length === 0) {
        setError("Please add at least one property image");
        setSaving(false);
        return;
      }

      // Update property object
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        size: parseInt(formData.size) || 0,
        updatedAt: serverTimestamp(),
      };

      // Update in Firestore
      const docRef = doc(db, "properties", id);
      await updateDoc(docRef, propertyData);

      // Success! Redirect to properties list
      navigate("/admin/properties");
    } catch (err) {
      console.error("Error updating property:", err);
      setError("Failed to update property. Please try again.");
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
            <p className="text-gray-600">Loading property...</p>
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
            onClick={() => navigate("/admin/properties")}
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
            Back to Properties
          </button>
          <h1 className="text-3xl font-bold text-navy">Edit Property</h1>
          <p className="text-gray-600 mt-2">Update property details below</p>
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
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Luxury 4 Bedroom Duplex in Katampe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the property features, location benefits, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="25000000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Area <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="">Select Location</option>
                  {locations[formData.city]?.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size (SQM)
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="300"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge (Optional)
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  {badges.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge || "None"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Features & Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableFeatures.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Property Images */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Property Images <span className="text-red-500">*</span>
            </h2>

            <ImageUpload
              images={formData.images}
              onChange={handleImagesChange}
              maxImages={10}
            />
          </div>

          {/* Featured */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Display Options
            </h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 text-gold border-gray-300 rounded focus:ring-gold"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Featured Property
                </span>
                <p className="text-sm text-gray-500">
                  Show this property on homepage
                </p>
              </div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
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

export default EditProperty;
