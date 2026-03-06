// src/pages/admin/AdminMedia.jsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Upload,
  Search,
  Trash2,
  Copy,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

const AdminMedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    totalSize: 0,
  });

  // Fetch media
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const q = query(collection(db, "media"), orderBy("uploadedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const mediaData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMedia(mediaData);

      // Calculate stats
      const totalSize = mediaData.reduce(
        (sum, item) => sum + (item.size || 0),
        0,
      );
      setStats({
        total: mediaData.length,
        totalSize: (totalSize / (1024 * 1024)).toFixed(2), // Convert to MB
      });
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    setUploading(true);

    try {
      for (const file of files) {
        // Convert to base64
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target.result;

          // Create media object
          const mediaData = {
            url: base64,
            name: file.name,
            type: file.type,
            size: file.size,
            uploadedAt: serverTimestamp(),
          };

          // Add to Firestore
          await addDoc(collection(db, "media"), mediaData);
        };
        reader.readAsDataURL(file);
      }

      // Refresh media list
      setTimeout(() => {
        fetchMedia();
        setUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "media", deleteModal.id));
      setMedia(media.filter((m) => m.id !== deleteModal.id));
      setDeleteModal({ show: false, id: null });

      // Recalculate stats
      const updatedMedia = media.filter((m) => m.id !== deleteModal.id);
      const totalSize = updatedMedia.reduce(
        (sum, item) => sum + (item.size || 0),
        0,
      );
      setStats({
        total: updatedMedia.length,
        totalSize: (totalSize / (1024 * 1024)).toFixed(2),
      });

      if (selectedImage?.id === deleteModal.id) {
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

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
            <p className="text-gray-600">Loading media...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-navy">Media Library</h1>
            <p className="text-gray-600 mt-1">Manage your images and files</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ImageIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Size</p>
                <p className="text-3xl font-bold text-navy mt-2">
                  {stats.totalSize} MB
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
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gold transition-colors"
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">Upload Media</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-gold hover:bg-[#D4AF37] text-white rounded-lg font-semibold cursor-pointer transition-colors"
            >
              {uploading ? "Uploading..." : "Choose Files"}
            </label>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search media by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">
                No Media Yet
              </h3>
              <p className="text-gray-600">
                Upload your first image to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gold transition-colors"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item.id, item.url);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} className="text-navy" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModal({ show: true, id: item.id });
                      }}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Details Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-navy">Image Details</h2>
                <button
                  onClick={() => setSelectedImage(null)}
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

              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full rounded-lg mb-6"
              />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Filename
                  </label>
                  <p className="text-navy">{selectedImage.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Type
                  </label>
                  <p className="text-navy">{selectedImage.type}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Size
                  </label>
                  <p className="text-navy">
                    {formatFileSize(selectedImage.size)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Uploaded
                  </label>
                  <p className="text-navy">
                    {formatDate(selectedImage.uploadedAt)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedImage.url}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    />
                    <button
                      onClick={() =>
                        handleCopyUrl(selectedImage.id, selectedImage.url)
                      }
                      className="px-4 py-2 bg-gold hover:bg-[#D4AF37] text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      {copiedId === selectedImage.id ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setDeleteModal({ show: true, id: selectedImage.id });
                    setSelectedImage(null);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Delete Image
                </button>
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
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">
                  Delete Image?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this image? This action cannot
                  be undone.
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

export default AdminMedia;
