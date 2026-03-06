// src/pages/admin/Dashboard.jsx - UPDATED WITH ADMINLAYOUT
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    projects: 0,
    blogPosts: 0,
    inquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats from Firestore
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Count properties
        const propertiesSnapshot = await getDocs(collection(db, "properties"));
        const propertiesCount = propertiesSnapshot.size;

        // Count projects (when we build it)
        const projectsSnapshot = await getDocs(
          collection(db, "projects"),
        ).catch(() => ({ size: 0 }));
        const projectsCount = projectsSnapshot.size;

        // Count blog posts (when we build it)
        const blogSnapshot = await getDocs(collection(db, "blog")).catch(
          () => ({ size: 0 }),
        );
        const blogCount = blogSnapshot.size;

        // Count inquiries (when we build it)
        const inquiriesSnapshot = await getDocs(
          collection(db, "inquiries"),
        ).catch(() => ({ size: 0 }));
        const inquiriesCount = inquiriesSnapshot.size;

        setStats({
          properties: propertiesCount,
          projects: projectsCount,
          blogPosts: blogCount,
          inquiries: inquiriesCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-navy mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage your website content, properties, and settings from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Properties"
            value={loading ? "..." : stats.properties}
            icon="🏠"
            color="bg-blue-500"
            link="/admin/properties"
          />
          <StatCard
            title="Projects"
            value={loading ? "..." : stats.projects}
            icon="🏗️"
            color="bg-green-500"
          />
          <StatCard
            title="Blog Posts"
            value={loading ? "..." : stats.blogPosts}
            icon="📝"
            color="bg-purple-500"
          />
          <StatCard
            title="Inquiries"
            value={loading ? "..." : stats.inquiries}
            icon="📧"
            color="bg-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-navy mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionLink
              to="/admin/properties/add"
              title="Add Property"
              icon="➕"
              description="List a new property"
            />
            <QuickActionButton
              title="Add Project"
              icon="🏗️"
              description="Create a new project"
              onClick={() => alert("Project management coming soon!")}
            />
            <QuickActionButton
              title="Write Blog Post"
              icon="✍️"
              description="Create new blog content"
              onClick={() => alert("Blog management coming soon!")}
            />
            <QuickActionButton
              title="View Inquiries"
              icon="📬"
              description="Check customer messages"
              onClick={() => alert("Inquiries management coming soon!")}
            />
            <QuickActionButton
              title="Settings"
              icon="⚙️"
              description="Configure website settings"
              onClick={() => alert("Settings coming soon!")}
            />
            <QuickActionButton
              title="Media Library"
              icon="🖼️"
              description="Manage images and files"
              onClick={() => alert("Media library coming soon!")}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-navy mb-4">Recent Activity</h3>
          <p className="text-gray-500 text-center py-8">
            No recent activity yet. Start by adding some content!
          </p>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

// Stat Card Component (now with optional link)
const StatCard = ({ title, value, icon, color, link }) => {
  const CardContent = (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-navy mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </>
  );

  if (link) {
    return (
      <Link to={link}>
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white rounded-xl shadow-md p-6 border-l-4 cursor-pointer transition-shadow hover:shadow-lg"
          style={{ borderColor: color.replace("bg-", "") }}
        >
          {CardContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md p-6 border-l-4"
      style={{ borderColor: color.replace("bg-", "") }}
    >
      {CardContent}
    </motion.div>
  );
};

// Quick Action Link Component (for actual links)
const QuickActionLink = ({ to, title, icon, description }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-left transition-colors border border-gray-200 cursor-pointer"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-navy mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  </Link>
);

// Quick Action Button Component (for alerts/coming soon)
const QuickActionButton = ({ title, icon, description, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-left transition-colors border border-gray-200"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold text-navy mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.button>
);

export default AdminDashboard;
