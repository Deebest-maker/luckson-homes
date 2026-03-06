// src/components/admin/AdminLayout.jsx - REMOVED MEDIA
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/admin/login");
    }
  };

  // Navigation items - REMOVED MEDIA
  const navItems = [
    { icon: "📊", label: "Dashboard", path: "/admin/dashboard" },
    { icon: "🏠", label: "Properties", path: "/admin/properties" },
    { icon: "🏗️", label: "Projects", path: "/admin/projects" },
    { icon: "✍️", label: "Blog", path: "/admin/blog" },
    { icon: "📄", label: "Pages", path: "/admin/pages" },
    { icon: "📧", label: "Inquiries", path: "/admin/inquiries" },
    { icon: "⚙️", label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy border-r border-gold/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gold/20">
          <Link to="/admin/dashboard">
            <h1
              className="text-2xl font-bold text-gold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              LUCKSON
            </h1>
            <p className="text-cream/60 text-xs mt-1">Admin Panel</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-gold/20 text-gold"
                  : "text-cream/80 hover:bg-white/5 hover:text-cream"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gold/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-cream text-sm font-medium truncate">
                {user?.email}
              </p>
              <p className="text-cream/60 text-xs">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-cream rounded-lg transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-navy">
                {navItems.find((item) => isActive(item.path))?.label ||
                  "Admin Panel"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gold transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Website
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
