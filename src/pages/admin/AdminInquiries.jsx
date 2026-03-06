// src/pages/admin/AdminInquiries.jsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, contact, property, newsletter
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    contact: 0,
    property: 0,
    newsletter: 0,
  });

  // Fetch inquiries
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const q = query(
        collection(db, "inquiries"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const inquiriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInquiries(inquiriesData);

      // Calculate stats
      setStats({
        total: inquiriesData.length,
        unread: inquiriesData.filter((i) => !i.read).length,
        contact: inquiriesData.filter((i) => i.type === "contact").length,
        property: inquiriesData.filter((i) => i.type === "property").length,
        newsletter: inquiriesData.filter((i) => i.type === "newsletter").length,
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "inquiries", id), { read: true });
      setInquiries(
        inquiries.map((i) => (i.id === id ? { ...i, read: true } : i)),
      );
      setStats((prev) => ({ ...prev, unread: prev.unread - 1 }));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "inquiries", deleteModal.id));
      const updatedInquiries = inquiries.filter((i) => i.id !== deleteModal.id);
      setInquiries(updatedInquiries);
      setDeleteModal({ show: false, id: null });

      // Recalculate stats
      setStats({
        total: updatedInquiries.length,
        unread: updatedInquiries.filter((i) => !i.read).length,
        contact: updatedInquiries.filter((i) => i.type === "contact").length,
        property: updatedInquiries.filter((i) => i.type === "property").length,
        newsletter: updatedInquiries.filter((i) => i.type === "newsletter")
          .length,
      });

      if (selectedInquiry?.id === deleteModal.id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "all") return true;
    return inquiry.type === filter;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inquiries...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-navy">Inquiries</h1>
          <p className="text-gray-600 mt-1">
            Manage contact forms, property inquiries, and newsletter subscribers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unread</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.unread}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Contact</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.contact}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Property</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.property}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Newsletter</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.newsletter}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "all"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("contact")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "contact"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            Contact ({stats.contact})
          </button>
          <button
            onClick={() => setFilter("property")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "property"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            Property ({stats.property})
          </button>
          <button
            onClick={() => setFilter("newsletter")}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "newsletter"
                ? "text-gold border-b-2 border-gold"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            Newsletter ({stats.newsletter})
          </button>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📬</div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                No Inquiries Yet
              </h3>
              <p className="text-gray-600">
                Contact forms and inquiries will appear here
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !inquiry.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {!inquiry.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        <h3 className="font-semibold text-navy text-lg">
                          {inquiry.name || inquiry.email}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.type === "contact"
                              ? "bg-green-100 text-green-800"
                              : inquiry.type === "property"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {inquiry.type}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-2">
                        {inquiry.email}
                      </p>

                      {inquiry.phone && (
                        <p className="text-gray-600 text-sm mb-2">
                          📞 {inquiry.phone}
                        </p>
                      )}

                      {inquiry.message && (
                        <p className="text-gray-700 line-clamp-2 mb-2">
                          {inquiry.message}
                        </p>
                      )}

                      {inquiry.propertyTitle && (
                        <p className="text-gray-600 text-sm">
                          <strong>Property:</strong> {inquiry.propertyTitle}
                        </p>
                      )}

                      <p className="text-gray-500 text-xs mt-2">
                        {formatDate(inquiry.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!inquiry.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(inquiry.id);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as read"
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
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal({ show: true, id: inquiry.id });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-navy">
                  Inquiry Details
                </h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-500 hover:text-navy"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Type
                  </label>
                  <p className="text-navy">{selectedInquiry.type}</p>
                </div>

                {selectedInquiry.name && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Name
                    </label>
                    <p className="text-navy">{selectedInquiry.name}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Email
                  </label>
                  <p className="text-navy">{selectedInquiry.email}</p>
                </div>

                {selectedInquiry.phone && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Phone
                    </label>
                    <p className="text-navy">{selectedInquiry.phone}</p>
                  </div>
                )}

                {selectedInquiry.message && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Message
                    </label>
                    <p className="text-navy whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>
                )}

                {selectedInquiry.propertyTitle && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Property
                    </label>
                    <p className="text-navy">{selectedInquiry.propertyTitle}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Received
                  </label>
                  <p className="text-navy">
                    {formatDate(selectedInquiry.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {!selectedInquiry.read && (
                  <button
                    onClick={() => {
                      handleMarkAsRead(selectedInquiry.id);
                      setSelectedInquiry(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gold hover:bg-[#D4AF37] text-white rounded-lg font-semibold transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteModal({ show: false, id: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Delete Inquiry?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this inquiry? This action
                  cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteModal({ show: false, id: null })}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminInquiries;
