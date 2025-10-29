// src/Modules/Admin/Pages/BlogAdmin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogAdmin = ({ userToken }) => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL + "/blog/posts/";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Token ${userToken}` },
      });
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
    setStatus("published");
    setImageFile(null);
    setPreviewImage(null);
    setEditingBlog(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else setPreviewImage(null);
  };

  const handleCreateOrEdit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingBlog) {
        await axios.put(`${API_URL}${editingBlog._id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${userToken}`,
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${userToken}`,
          },
        });
      }
      fetchBlogs();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}${blogId}/`, {
        headers: { Authorization: `Token ${userToken}` },
      });
      setBlogs((prev) => prev.filter((b) => String(b._id) !== blogId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSubtitle(blog.subtitle || "");
    setContent(blog.content);
    setStatus(blog.status);
    setPreviewImage(blog.image_url || null);
    setShowModal(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Blog Admin Panel</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        {editingBlog ? "Edit Blog" : "+ Create New Blog"}
      </button>

      {/* ✅ Elegant Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 w-full max-w-3xl p-8 animate-slideUp">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {editingBlog ? "Edit Blog" : "Create Blog"}
            </h2>

            <form onSubmit={handleCreateOrEdit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              {/* Image Upload */}
              <div
                className="w-full h-44 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 transition"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  "Click to select image"
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
              >
                {loading ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow transform hover:-translate-y-1 flex flex-col"
          >
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-xl mb-1">{blog.title}</h2>
              {blog.subtitle && (
                <p className="text-gray-600 text-sm mb-3">{blog.subtitle}</p>
              )}
              <div className="flex justify-end mt-auto">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✨ Modal Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default BlogAdmin;
