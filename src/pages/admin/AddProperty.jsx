// src/pages/admin/AddProperty.jsx - WITH PROJECT DROPDOWN
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";
import ComboBox from "../../components/admin/ComboBox";

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    city: "",
    propertyType: "Duplex",
    status: "For Sale",
    bedrooms: "",
    bathrooms: "",
    size: "",
    features: [],
    isFeatured: false,
    badge: "",
    images: [],
    projectId: "", // NEW: Link to project
    projectName: "", // NEW: For display
  });

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          location: doc.data().location,
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle project selection
  const handleProjectChange = (e) => {
    const selectedProjectId = e.target.value;
    const selectedProject = projects.find((p) => p.id === selectedProjectId);

    setFormData((prev) => ({
      ...prev,
      projectId: selectedProjectId,
      projectName: selectedProject ? selectedProject.name : "",
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
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.price ||
        !formData.location ||
        !formData.city
      ) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (formData.images.length === 0) {
        setError("Please upload at least one property image");
        setLoading(false);
        return;
      }

      // Create property object
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        size: parseInt(formData.size) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        inquiries: 0,
      };

      // Add to Firestore
      await addDoc(collection(db, "properties"), propertyData);

      // Success! Redirect to properties list
      navigate("/admin/properties");
    } catch (err) {
      console.error("Error adding property:", err);
      setError("Failed to add property. Please try again.");
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
          <h1 className="text-3xl font-bold text-navy">Add New Property</h1>
          <p className="text-gray-600 mt-2">
            Fill in the property details below
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

          {/* Project/Estate Selection - NEW! */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy border-b pb-2">
              Project/Estate
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link to Project/Estate (Optional)
              </label>
              {loadingProjects ? (
                <div className="text-sm text-gray-500">Loading projects...</div>
              ) : (
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleProjectChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="">None (Standalone Property)</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name} - {project.location}
                    </option>
                  ))}
                </select>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Select a project/estate to link this property to. This will show
                the property under that project's details page.
              </p>
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
                  Adding Property...
                </span>
              ) : (
                "Add Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProperty;
