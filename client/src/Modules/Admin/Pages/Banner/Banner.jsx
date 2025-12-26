// src/Modules/Admin/Pages/BannerAdmin.jsx

import React, { useState, useEffect, useRef } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaTrash, FaTimes, FaImage } from "react-icons/fa";

/* ----------------------- Banner Card Component ----------------------- */
const BannerCard = ({ banner, onDelete }) => {
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
        <img
          src={banner.image_url || `${MEDIA_URL}${banner.image}`}
          alt="Banner"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Action Footer */}
      <div className="p-4 flex items-center justify-between bg-white relative z-10">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Banner ID: {banner.id || "..."}</span>
        <button
          onClick={() => onDelete(banner)}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-[#dc2626] text-sm font-bold rounded-lg border border-red-100 hover:bg-[#dc2626] hover:text-white transition-all shadow-sm"
        >
          <FaTrash size={12} /> Delete
        </button>
      </div>
    </motion.div>
  );
};

/* ----------------------- Main Page Component ----------------------- */
const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const dropRef = useRef(null);
  const API_URL = `/banners/`;

  /* -------- Fetch Banners -------- */
  const fetchBanners = async () => {
    setFetching(true);
    try {
      const res = await API.get(API_URL);
      setBanners(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load banners");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* -------- Drag & Drop Logic -------- */
  useEffect(() => {
    const div = dropRef.current;
    if (!div) return;

    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e) => {
      e.preventDefault(); e.stopPropagation(); setIsDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
      } else {
        toast.warn("⚠️ Please drop a valid image file.");
      }
    };

    div.addEventListener("dragenter", handleDragEnter);
    div.addEventListener("dragleave", handleDragLeave);
    div.addEventListener("dragover", handleDragOver);
    div.addEventListener("drop", handleDrop);

    return () => {
      div.removeEventListener("dragenter", handleDragEnter);
      div.removeEventListener("dragleave", handleDragLeave);
      div.removeEventListener("dragover", handleDragOver);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  /* -------- File Selection -------- */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  /* -------- Upload Handler -------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn("⚠️ Please select an image first");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      setFile(null);
      setPreview(null);
      setProgress(0);
      toast.success("✅ Banner uploaded successfully!");
      fetchBanners();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload banner");
    } finally {
      setLoading(false);
    }
  };

  /* -------- Delete Handler -------- */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      setBanners((prev) => prev.filter((b) => b._id !== deleteTarget._id));
      toast.success("🗑️ Banner deleted successfully!");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete banner");
    }
  };

  return (
    <div className="relative">

      {/* 🏁 Background Texture (for standalone look inside layout) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} transition={Slide} />

      {/* 📝 Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-black text-slate-900">
          Website <span className="text-[#0056b3]">Banners</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Manage the sliding banners displayed on the homepage.
        </p>
      </div>

      {/* 📤 Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-10 relative z-10">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FaCloudUploadAlt className="text-[#0056b3] text-xl" /> Upload New Banner
        </h2>

        <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Drop Zone */}
          <div className="lg:col-span-2">
            <div
              ref={dropRef}
              className={`border-3 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${isDragOver
                ? "border-[#0056b3] bg-blue-50 scale-[1.01]"
                : "border-slate-300 hover:border-[#0056b3] hover:bg-slate-50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg p-2" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mb-3">
                      <FaImage size={20} />
                    </div>
                    <span className="text-slate-600 font-bold">Click to Select or Drag Image Here</span>
                    <span className="text-xs text-slate-400 mt-1">Supports JPG, PNG (Max 5MB)</span>
                  </>
                )}
              </label>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-[#0056b3] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Action Side */}
          <div className="flex flex-col justify-center">
            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1
              ${loading || !file ? "bg-slate-300 cursor-not-allowed" : "bg-[#0056b3] hover:bg-[#004494]"}`}
            >
              {loading ? `Uploading ${progress}%...` : "Publish Banner"}
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">
              *Ensure images are high resolution (1920x600 recommended).
            </p>
          </div>

        </form>
      </div>

      {/* 🖼 Gallery Grid */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-slate-800 mb-6 border-l-4 border-[#dc2626] pl-3">
          Active Banners
        </h3>

        {fetching ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-dashed border-slate-300">
            <p className="text-gray-500">No banners found. Upload one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {banners.map((banner) => (
                <BannerCard key={banner._id} banner={banner} onDelete={setDeleteTarget} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 🗑️ Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 text-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Confirm Deletion</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Are you sure you want to remove this banner? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2.5 bg-[#dc2626] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition shadow-lg shadow-red-500/30"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BannerAdmin;
