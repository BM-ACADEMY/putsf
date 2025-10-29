import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogAdmin = () => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;
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
  const [error, setError] = useState("");

  /* ---------------- Fetch Blogs ---------------- */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load blogs");
      setLoading(false);
    }
  };

  /* ---------------- Handle Input Changes ---------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ---------------- Submit Form ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      if (isEditing) {
        await axios.patch(`${API_URL}${form._id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert("Error saving blog");
      console.error(err);
    }
  };

  /* ---------------- Edit Blog ---------------- */
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
  };

  /* ---------------- Delete Blog ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  /* ---------------- Reset Form ---------------- */
  const resetForm = () => {
    setForm({
      _id: "",
      title: "",
      subtitle: "",
      content: "",
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
  };

  /* ---------------- UI ---------------- */
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isEditing ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <textarea
            name="content"
            placeholder="Content"
            rows="4"
            value={form.content}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          ></textarea>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-48 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {isEditing ? "Update" : "Create"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blog List */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Blog Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow p-4 border hover:shadow-lg transition"
            >
              <img
                src={blog.image_url || `${MEDIA_URL}/blog/default.jpg`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.subtitle}</p>
              <p className="text-gray-500 mt-2 text-sm line-clamp-3">{blog.content}</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
