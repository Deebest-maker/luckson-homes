// src/pages/admin/AddProject.jsx - WITH COMBOBOX FOR CITY & LOCATION
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";
import ComboBox from "../../components/admin/ComboBox";

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    city: "",
    status: "Ongoing",
    numberOfUnits: "",
    startingPrice: "",
    completionDate: "",
    features: [],
    paymentPlans: [],
    isFeatured: false,
    images: [],
  });

  // Available options
  const cities = [
    "Abuja FCT",
    "Lagos",
    "Port Harcourt",
    "Kano",
    "Ibadan",
    "Enugu",
    "Kaduna",
    "Benin City",
  ];

  // Suggested locations per city
  const locationsByCity = {
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
      "Lugbe",
      "Jikwoyi",
      "Nyanya",
      "Kuje",
      "Dutse",
      "Kubwa",
    ],
    Lagos: [
      "Lekki",
      "Victoria Island",
      "Ikoyi",
      "Ajah",
      "Ikeja",
      "Surulere",
      "Yaba",
      "Maryland",
      "Magodo",
    ],
    "Port Harcourt": ["GRA", "Trans Amadi", "Rumuola", "Eliozu", "Rumuokoro"],
    Kano: ["Nassarawa", "Fagge", "Gwale", "Tarauni"],
    Ibadan: ["Bodija", "Agodi", "Jericho", "Mokola", "Dugbe"],
    Enugu: ["GRA", "Independence Layout", "New Haven", "Trans-Ekulu"],
    Kaduna: ["GRA", "Barnawa", "Sabon Tasha", "Ungwar Rimi"],
    "Benin City": ["GRA", "Ikpoba Hill", "Sapele Road", "Airport Road"],
  };

  const statuses = ["Ongoing", "Completed", "Upcoming"];

  const availableFeatures = [
    "Gated Estate",
    "24hr Security",
    "Good Road Network",
    "Power Supply",
    "Water Supply",
    "Recreation Center",
    "Children Playground",
    "Shopping Mall",
    "Schools Nearby",
    "Hospitals Nearby",
    "Parks & Gardens",
    "Swimming Pool",
    "Gym & Fitness",
    "Sports Facilities",
    "Smart Homes",
    "Solar Power",
  ];

  const defaultPaymentPlans = [
    "Outright Payment",
    "Initial Deposit + Installments (6 months)",
    "Initial Deposit + Installments (12 months)",
    "Initial Deposit + Installments (24 months)",
    "Flexible Payment Plan",
  ];

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

  const handlePaymentPlanToggle = (plan) => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: prev.paymentPlans.includes(plan)
        ? prev.paymentPlans.filter((p) => p !== plan)
        : [...prev.paymentPlans, plan],
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
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.location ||
        !formData.city ||
        !formData.startingPrice
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (formData.images.length === 0) {
        setError("Please upload at least one project image");
        setLoading(false);
        return;
      }

      // Create project object
      const projectData = {
        ...formData,
        startingPrice: parseFloat(formData.startingPrice),
        numberOfUnits: parseInt(formData.numberOfUnits) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        inquiries: 0,
      };

      // Add to Firestore
      await addDoc(collection(db, "projects"), projectData);

      // Success! Redirect to projects list
      navigate("/admin/projects");
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/projects")}
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
            Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-navy">Add New Project</h1>
          <p className="text-gray-600 mt-2">
            Fill in the project details below
          </p>
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
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Highland City Estate"
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
                placeholder="Describe the project features, amenities, location benefits, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Starting Price (₦) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  required
                  placeholder="15000000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Units
                </label>
                <input
                  type="number"
                  name="numberOfUnits"
                  value={formData.numberOfUnits}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Location - WITH COMBOBOX */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComboBox
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                suggestions={cities}
                placeholder="Type or select city"
                required
              />

              <ComboBox
                label="Location/Area"
                name="location"
                value={formData.location}
                onChange={handleChange}
                suggestions={
                  formData.city ? locationsByCity[formData.city] || [] : []
                }
                placeholder="Type or select location"
                required
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Project Details
            </h2>

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
                  Expected Completion Date
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Estate Features & Amenities
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

          {/* Payment Plans */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Payment Plans
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultPaymentPlans.map((plan) => (
                <label
                  key={plan}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.paymentPlans.includes(plan)}
                    onChange={() => handlePaymentPlanToggle(plan)}
                    className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <span className="text-sm text-gray-700">{plan}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Project Images */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Project Images <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600">
              Upload master plan, site photos, renders, and completed units
            </p>

            <ImageUpload
              images={formData.images}
              onChange={handleImagesChange}
              maxImages={15}
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
                  Featured Project
                </span>
                <p className="text-sm text-gray-500">
                  Show this project on homepage
                </p>
              </div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gold/50 cursor-not-allowed"
                  : "bg-gold hover:bg-[#D4AF37] shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
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
                  Adding Project...
                </span>
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProject;
