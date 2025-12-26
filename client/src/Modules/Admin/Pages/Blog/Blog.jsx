// src/Modules/Admin/Pages/BlogAdmin.jsx

import React, { useEffect, useState, useRef } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenNib, FaTrash, FaEdit, FaImage, FaTimes, FaPlus } from "react-icons/fa";

const BlogAdmin = () => {
  const API_URL = `/blog/posts/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileInputRef = useRef(null);

  /* ---------------- Fetch Blogs ---------------- */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get(API_URL);
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("❌ Failed to load blogs");
      setLoading(false);
    }
  };

  /* ---------------- Handle Input Changes ---------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ---------------- Submit Form ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      if (isEditing) {
        await API.patch(`${API_URL}${form._id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Blog updated successfully!");
      } else {
        await API.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Blog created successfully!");
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      toast.error("❌ Error saving blog");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- Edit / Delete ---------------- */
  const handleEdit = (blog) => {
    setForm({
      _id: blog._id,
      title: blog.title,
      subtitle: blog.subtitle,
      content: blog.content,
      image: null,
    });
    setPreview(blog.image_url);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      setBlogs((prev) => prev.filter((b) => b._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success("🗑️ Blog deleted successfully!");
    } catch (err) {
      toast.error("❌ Failed to delete blog");
    }
  };

  const resetForm = () => {
    setForm({ _id: "", title: "", subtitle: "", content: "", image: null });
    setPreview(null);
    setIsEditing(false);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative">

      {/* 🏁 Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} transition={Slide} />

      {/* 📝 Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-black text-slate-900">
          Blog <span className="text-[#0056b3]">Manager</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Create, edit, and manage news and articles.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">

        {/* ✍️ EDITOR COLUMN (Left) */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <FaPenNib className="text-[#0056b3]" />
                {isEditing ? "Edit Article" : "Write New Article"}
              </h2>
              {isEditing && (
                <button onClick={resetForm} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wide">
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                   <input
                     type="text"
                     name="title"
                     placeholder="Article Headline"
                     value={form.title}
                     onChange={handleChange}
                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] outline-none font-bold text-slate-800"
                     required
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Category</label>
                   <input
                     type="text"
                     name="subtitle"
                     placeholder="e.g. Political Updates"
                     value={form.subtitle}
                     onChange={handleChange}
                     className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] outline-none font-medium text-slate-600"
                   />
                </div>
              </div>

              {/* Content Editor */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                 <textarea
                   name="content"
                   placeholder="Write your story here..."
                   rows="12"
                   value={form.content}
                   onChange={handleChange}
                   className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] outline-none text-slate-700 leading-relaxed resize-y min-h-[200px]"
                   required
                 ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Featured Image</label>
                 <div
                   onClick={() => fileInputRef.current.click()}
                   className="border-2 border-dashed border-slate-300 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#0056b3] hover:bg-blue-50 transition-colors relative overflow-hidden group"
                 >
                   <input
                     type="file"
                     ref={fileInputRef}
                     name="image"
                     accept="image/*"
                     onChange={handleChange}
                     className="hidden"
                   />

                   {preview ? (
                     <>
                       <img src={preview} alt="Preview" className="h-full w-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="bg-white/90 px-4 py-2 rounded-lg font-bold text-slate-800 shadow-md">Change Image</span>
                       </div>
                     </>
                   ) : (
                     <>
                       <FaImage className="text-3xl text-slate-300 mb-2 group-hover:text-[#0056b3] transition-colors" />
                       <span className="text-slate-500 font-medium group-hover:text-[#0056b3]">Click to upload cover image</span>
                     </>
                   )}
                 </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                 <button
                   type="submit"
                   disabled={submitting}
                   className={`flex-1 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1
                   ${submitting ? "bg-slate-300 cursor-not-allowed" : "bg-[#0056b3] hover:bg-[#004494]"}`}
                 >
                   {submitting ? "Saving..." : (isEditing ? "Update Article" : "Publish Article")}
                 </button>

                 {isEditing && (
                   <button
                     type="button"
                     onClick={resetForm}
                     className="px-6 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition"
                   >
                     Cancel
                   </button>
                 )}
              </div>
            </form>
          </div>
        </div>

        {/* 📚 LIST COLUMN (Right) */}
        <div className="xl:col-span-1 space-y-6">
           <h3 className="text-lg font-bold text-slate-800 border-l-4 border-[#dc2626] pl-3">
             Recent Articles
           </h3>

           {loading ? (
             <div className="flex justify-center py-10">
               <div className="w-8 h-8 border-4 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div>
             </div>
           ) : blogs.length === 0 ? (
             <div className="bg-white p-8 rounded-xl text-center border border-dashed border-slate-300 text-gray-400">
               No blogs found.
             </div>
           ) : (
             <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
               <AnimatePresence>
                 {blogs.map((blog) => (
                   <motion.div
                     layout
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     key={blog._id}
                     className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                   >
                     <div className="flex gap-4">
                       <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                         <img
                           src={blog.image_url || `${MEDIA_URL}/blog/default.jpg`}
                           alt={blog.title}
                           className="w-full h-full object-cover"
                         />
                       </div>
                       <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-slate-800 text-sm truncate leading-tight mb-1" title={blog.title}>
                           {blog.title}
                         </h4>
                         <p className="text-xs text-[#0056b3] font-semibold mb-2">{blog.subtitle || "General"}</p>
                         <div className="flex items-center gap-2">
                           <button
                             onClick={() => handleEdit(blog)}
                             className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-[#0056b3] hover:text-white transition-colors flex items-center gap-1"
                           >
                             <FaEdit /> Edit
                           </button>
                           <button
                             onClick={() => setDeleteTarget(blog)}
                             className="text-xs font-bold bg-red-50 text-red-500 px-2 py-1 rounded hover:bg-[#dc2626] hover:text-white transition-colors flex items-center gap-1"
                           >
                             <FaTrash />
                           </button>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
           )}
        </div>

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
                <h3 className="text-xl font-black text-slate-900 mb-2">Delete Article?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Are you sure you want to delete <span className="font-bold text-slate-800">"{deleteTarget.title}"</span>? This action cannot be undone.
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

export default BlogAdmin;
