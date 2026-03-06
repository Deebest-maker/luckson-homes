// src/pages/admin/AdminPages.jsx - COMPLETE WITH CONTACT TAB
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUpload from "../../components/admin/ImageUpload";
import { Trash2, Plus } from "lucide-react";

const AdminPages = () => {
  const [activeTab, setActiveTab] = useState("homepage");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Homepage Data
  const [homepage, setHomepage] = useState({
    heroHeadline: "Find Your Dream Home",
    heroSubheadline: "Discover luxury properties in prime locations",
    heroCTA: "Explore Properties",
    heroImage: [],
    statsPropertiesSold: "150+",
    statsHappyClients: "200+",
    statsYearsExperience: "5+",
    statsAwardsWon: "10+",
  });

  // About Page Data - NO SOCIAL MEDIA
  const [about, setAbout] = useState({
    heroTitle: "About Luckson Homes",
    heroDescription: "Building Dreams, Creating Homes",
    companyStory: "",
    ceoImage: [],
    mission: "",
    vision: "",
    leadershipTeam: [
      {
        id: 1,
        name: "Hilary Moses Luckson",
        position: "Chief Executive Officer & Founder",
        bio: "",
        education: "",
        experience: "",
        linkedin: "",
        email: "hilarymss3@gmail.com",
        image: [],
      },
    ],
  });

  // Contact Page Data - NEW!
  const [contact, setContact] = useState({
    officeAddress: "Wuye District, Abuja FCT, Nigeria",
    mapLatitude: 9.0574,
    mapLongitude: 7.4864,
    phonePrimary: "+234 800 000 0000",
    phoneSecondary: "+234 800 000 0001",
    emailPrimary: "info@lucksonhomes.com",
    whatsapp: "+234 800 000 0000",
    officeHours: [
      { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    socialMedia: {
      facebook: "https://facebook.com/lucksonhomes",
      instagram: "https://instagram.com/lucksonhomes",
      twitter: "https://twitter.com/lucksonhomes",
      linkedin: "https://linkedin.com/company/lucksonhomes",
    },
  });

  // Director Portfolio Data
  const [director, setDirector] = useState({
    name: "Hilary Moses Luckson",
    title: "CEO/MD",
    tagline: "Own a piece of the earth",
    location: "Abuja, Nigeria",
    email: "hilarymss3@gmail.com",
    phone: "08134101409",
    photo: [],
    professionalSummary: "",
  });

  // Fetch all pages data
  useEffect(() => {
    fetchPagesData();
  }, []);

  const fetchPagesData = async () => {
    try {
      const homepageDoc = await getDoc(doc(db, "pages", "homepage"));
      if (homepageDoc.exists()) {
        setHomepage({ ...homepage, ...homepageDoc.data() });
      }

      const aboutDoc = await getDoc(doc(db, "pages", "about"));
      if (aboutDoc.exists()) {
        setAbout({ ...about, ...aboutDoc.data() });
      }

      const contactDoc = await getDoc(doc(db, "pages", "contact"));
      if (contactDoc.exists()) {
        setContact({ ...contact, ...contactDoc.data() });
      }

      const directorDoc = await getDoc(doc(db, "pages", "director"));
      if (directorDoc.exists()) {
        setDirector({ ...director, ...directorDoc.data() });
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    setSuccess(false);

    try {
      if (activeTab === "homepage") {
        await setDoc(doc(db, "pages", "homepage"), homepage);
      } else if (activeTab === "about") {
        await setDoc(doc(db, "pages", "about"), about);
      } else if (activeTab === "contact") {
        await setDoc(doc(db, "pages", "contact"), contact);
      } else if (activeTab === "director") {
        await setDoc(doc(db, "pages", "director"), director);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving page:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Leadership Team Functions
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: "",
      position: "",
      bio: "",
      education: "",
      experience: "",
      linkedin: "",
      email: "",
      image: [],
    };
    setAbout({
      ...about,
      leadershipTeam: [...about.leadershipTeam, newMember],
    });
  };

  const updateTeamMember = (id, field, value) => {
    setAbout({
      ...about,
      leadershipTeam: about.leadershipTeam.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    });
  };

  const deleteTeamMember = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setAbout({
        ...about,
        leadershipTeam: about.leadershipTeam.filter(
          (member) => member.id !== id,
        ),
      });
    }
  };

  // Office Hours Functions
  const updateOfficeHours = (index, field, value) => {
    const newHours = [...contact.officeHours];
    newHours[index][field] = value;
    setContact({ ...contact, officeHours: newHours });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Pages Management</h1>
          <p className="text-gray-600 mt-2">Edit your website content</p>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-center gap-2"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Page saved successfully!
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("homepage")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "homepage"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            🏠 Homepage
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "about"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            ℹ️ About Us
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "contact"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            📞 Contact
          </button>
          <button
            onClick={() => setActiveTab("director")}
            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
              activeTab === "director"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            👔 Director
          </button>
        </div>

        {/* Homepage Tab */}
        {activeTab === "homepage" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Hero Section
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={homepage.heroHeadline}
                  onChange={(e) =>
                    setHomepage({ ...homepage, heroHeadline: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheadline
                </label>
                <input
                  type="text"
                  value={homepage.heroSubheadline}
                  onChange={(e) =>
                    setHomepage({
                      ...homepage,
                      heroSubheadline: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={homepage.heroCTA}
                  onChange={(e) =>
                    setHomepage({ ...homepage, heroCTA: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image
                </label>
                <ImageUpload
                  images={homepage.heroImage}
                  onChange={(imgs) =>
                    setHomepage({ ...homepage, heroImage: imgs })
                  }
                  maxImages={1}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Stats Section
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Properties Sold
                  </label>
                  <input
                    type="text"
                    value={homepage.statsPropertiesSold}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        statsPropertiesSold: e.target.value,
                      })
                    }
                    placeholder="150+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    value={homepage.statsHappyClients}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        statsHappyClients: e.target.value,
                      })
                    }
                    placeholder="200+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="text"
                    value={homepage.statsYearsExperience}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        statsYearsExperience: e.target.value,
                      })
                    }
                    placeholder="5+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Awards Won
                  </label>
                  <input
                    type="text"
                    value={homepage.statsAwardsWon}
                    onChange={(e) =>
                      setHomepage({
                        ...homepage,
                        statsAwardsWon: e.target.value,
                      })
                    }
                    placeholder="10+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab - NO SOCIAL MEDIA */}
        {activeTab === "about" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                About Page Hero
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={about.heroTitle}
                  onChange={(e) =>
                    setAbout({ ...about, heroTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={about.heroDescription}
                  onChange={(e) =>
                    setAbout({ ...about, heroDescription: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Company Story
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Our Story
                </label>
                <textarea
                  value={about.companyStory}
                  onChange={(e) =>
                    setAbout({ ...about, companyStory: e.target.value })
                  }
                  rows={8}
                  placeholder="Tell your company's story..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEO/Company Image (beside story)
                </label>
                <ImageUpload
                  images={about.ceoImage || []}
                  onChange={(imgs) => setAbout({ ...about, ceoImage: imgs })}
                  maxImages={1}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Mission & Vision
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement
                </label>
                <textarea
                  value={about.mission}
                  onChange={(e) =>
                    setAbout({ ...about, mission: e.target.value })
                  }
                  rows={4}
                  placeholder="Our mission..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement
                </label>
                <textarea
                  value={about.vision}
                  onChange={(e) =>
                    setAbout({ ...about, vision: e.target.value })
                  }
                  rows={4}
                  placeholder="Our vision..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            {/* Leadership Team */}
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-bold text-navy">Leadership Team</h2>
                <button
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-[#D4AF37] text-white rounded-lg font-semibold transition-colors"
                >
                  <Plus size={20} />
                  Add Member
                </button>
              </div>

              <div className="space-y-6">
                {about.leadershipTeam &&
                  about.leadershipTeam.map((member, index) => (
                    <div
                      key={member.id}
                      className="border border-gray-200 rounded-lg p-6 space-y-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-navy">
                          Team Member #{index + 1}
                        </h3>
                        <button
                          onClick={() => deleteTeamMember(member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) =>
                              updateTeamMember(
                                member.id,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Hilary Moses Luckson"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                          </label>
                          <input
                            type="text"
                            value={member.position}
                            onChange={(e) =>
                              updateTeamMember(
                                member.id,
                                "position",
                                e.target.value,
                              )
                            }
                            placeholder="CEO & Founder"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) =>
                              updateTeamMember(
                                member.id,
                                "email",
                                e.target.value,
                              )
                            }
                            placeholder="email@lucksonhomes.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            value={member.linkedin}
                            onChange={(e) =>
                              updateTeamMember(
                                member.id,
                                "linkedin",
                                e.target.value,
                              )
                            }
                            placeholder="https://linkedin.com/in/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Biography
                        </label>
                        <textarea
                          value={member.bio}
                          onChange={(e) =>
                            updateTeamMember(member.id, "bio", e.target.value)
                          }
                          rows={4}
                          placeholder="Professional biography..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Education
                        </label>
                        <textarea
                          value={member.education}
                          onChange={(e) =>
                            updateTeamMember(
                              member.id,
                              "education",
                              e.target.value,
                            )
                          }
                          rows={2}
                          placeholder="Educational background..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience
                        </label>
                        <textarea
                          value={member.experience}
                          onChange={(e) =>
                            updateTeamMember(
                              member.id,
                              "experience",
                              e.target.value,
                            )
                          }
                          rows={2}
                          placeholder="Professional experience..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Image
                        </label>
                        <ImageUpload
                          images={member.image || []}
                          onChange={(imgs) =>
                            updateTeamMember(member.id, "image", imgs)
                          }
                          maxImages={1}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab - NEW! */}
        {activeTab === "contact" && (
          <div className="space-y-8">
            {/* Office Location */}
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Office Location
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Address
                </label>
                <textarea
                  value={contact.officeAddress}
                  onChange={(e) =>
                    setContact({ ...contact, officeAddress: e.target.value })
                  }
                  rows={2}
                  placeholder="Wuye District, Abuja FCT, Nigeria"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Map Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={contact.mapLatitude}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        mapLatitude: parseFloat(e.target.value),
                      })
                    }
                    placeholder="9.0574"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Map Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={contact.mapLongitude}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        mapLongitude: parseFloat(e.target.value),
                      })
                    }
                    placeholder="7.4864"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500">
                💡 Tip: Use{" "}
                <a
                  href="https://www.latlong.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline"
                >
                  latlong.net
                </a>{" "}
                to find coordinates for your office location
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Phone
                  </label>
                  <input
                    type="tel"
                    value={contact.phonePrimary}
                    onChange={(e) =>
                      setContact({ ...contact, phonePrimary: e.target.value })
                    }
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Phone
                  </label>
                  <input
                    type="tel"
                    value={contact.phoneSecondary}
                    onChange={(e) =>
                      setContact({ ...contact, phoneSecondary: e.target.value })
                    }
                    placeholder="+234 800 000 0001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contact.emailPrimary}
                    onChange={(e) =>
                      setContact({ ...contact, emailPrimary: e.target.value })
                    }
                    placeholder="info@lucksonhomes.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={contact.whatsapp}
                    onChange={(e) =>
                      setContact({ ...contact, whatsapp: e.target.value })
                    }
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Office Hours
              </h2>

              <div className="space-y-4">
                {contact.officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day(s)
                      </label>
                      <input
                        type="text"
                        value={schedule.day}
                        onChange={(e) =>
                          updateOfficeHours(index, "day", e.target.value)
                        }
                        placeholder="Monday - Friday"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hours
                      </label>
                      <input
                        type="text"
                        value={schedule.hours}
                        onChange={(e) =>
                          updateOfficeHours(index, "hours", e.target.value)
                        }
                        placeholder="8:00 AM - 5:00 PM"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Social Media Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={contact.socialMedia?.facebook || ""}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        socialMedia: {
                          ...contact.socialMedia,
                          facebook: e.target.value,
                        },
                      })
                    }
                    placeholder="https://facebook.com/lucksonhomes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={contact.socialMedia?.instagram || ""}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        socialMedia: {
                          ...contact.socialMedia,
                          instagram: e.target.value,
                        },
                      })
                    }
                    placeholder="https://instagram.com/lucksonhomes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter/X
                  </label>
                  <input
                    type="url"
                    value={contact.socialMedia?.twitter || ""}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        socialMedia: {
                          ...contact.socialMedia,
                          twitter: e.target.value,
                        },
                      })
                    }
                    placeholder="https://twitter.com/lucksonhomes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={contact.socialMedia?.linkedin || ""}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        socialMedia: {
                          ...contact.socialMedia,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    placeholder="https://linkedin.com/company/lucksonhomes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Director Tab */}
        {activeTab === "director" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Director Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={director.name}
                    onChange={(e) =>
                      setDirector({ ...director, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title/Position
                  </label>
                  <input
                    type="text"
                    value={director.title}
                    onChange={(e) =>
                      setDirector({ ...director, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={director.email}
                    onChange={(e) =>
                      setDirector({ ...director, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={director.phone}
                    onChange={(e) =>
                      setDirector({ ...director, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={director.location}
                    onChange={(e) =>
                      setDirector({ ...director, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={director.tagline}
                    onChange={(e) =>
                      setDirector({ ...director, tagline: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <ImageUpload
                  images={director.photo}
                  onChange={(imgs) => setDirector({ ...director, photo: imgs })}
                  maxImages={1}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-xl font-bold text-navy border-b pb-2">
                Professional Summary
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary/Objective
                </label>
                <textarea
                  value={director.professionalSummary}
                  onChange={(e) =>
                    setDirector({
                      ...director,
                      professionalSummary: e.target.value,
                    })
                  }
                  rows={8}
                  placeholder="Professional summary..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all ${
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
                Saving...
              </span>
            ) : (
              `Save ${activeTab === "homepage" ? "Homepage" : activeTab === "about" ? "About Page" : activeTab === "contact" ? "Contact Page" : "Director Info"}`
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
