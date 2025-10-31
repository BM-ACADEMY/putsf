import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/* ----------------------- Admin Gallery ----------------------- */
const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  const dropRef = useRef(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  /* -------- Fetch all images -------- */
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      showAlert("Failed to fetch images.", "error");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* -------- Drag & Drop -------- */
  useEffect(() => {
    const div = dropRef.current;
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    };
    const handleDragOver = (e) => e.preventDefault();
    div.addEventListener("drop", handleDrop);
    div.addEventListener("dragover", handleDragOver);
    return () => {
      div.removeEventListener("drop", handleDrop);
      div.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  /* -------- Alert System -------- */
  const showAlert = (message, type = "info") => {
    const colors = {
      success: "from-[#0033A0] via-[#D62828] to-black text-white",
      error: "from-red-600 via-[#D62828] to-black text-white",
      info: "from-blue-600 via-[#0033A0] to-black text-white",
    };
    setAlert({ message, color: colors[type] });
    setTimeout(() => setAlert(null), 3500);
  };

  /* -------- Handle Upload -------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      showAlert("Please provide both title and image.", "error");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) =>
          setProgress(Math.round((event.loaded * 100) / event.total)),
      });
      setTitle("");
      setFile(null);
      setPreview(null);
      setProgress(0);
      fetchImages();
      showAlert("✅ Image uploaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showAlert("❌ Upload failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* -------- Handle Delete -------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setImages((prev) => prev.filter((img) => img._id !== id));
    try {
      await axios.delete(`${API_URL}${id}/`);
      showAlert("🗑️ Image deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showAlert("Failed to delete image.", "error");
      fetchImages();
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Gallery</h1>

      {/* 🔔 Alert Message */}
      {alert && (
        <div
          className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${alert.color} shadow-lg text-center font-semibold transition-all duration-500`}
        >
          {alert.message}
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-[#D62828] focus:outline-none"
        />
        <div
          ref={dropRef}
          className="border-2 border-dashed border-gray-300 p-4 rounded-lg w-full md:w-auto text-center cursor-pointer hover:border-[#0033A0] hover:bg-gray-100 transition"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              setPreview(selected ? URL.createObjectURL(selected) : null);
            }}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer text-gray-600">
            {file ? "Change Image" : "Select or Drop Image"}
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition font-semibold"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Progress Bar */}
      {loading && progress > 0 && (
        <div className="w-full bg-gray-200 h-2 rounded mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mb-6 flex justify-center">
          <div className="border rounded-lg overflow-hidden shadow-md">
            <img src={preview} alt="Preview" className="w-64 h-48 object-cover" />
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <GalleryCard
            key={img._id}
            img={img}
            onDelete={handleDelete}
            onUpdated={fetchImages}
            API_URL={API_URL}
            showAlert={showAlert}
          />
        ))}
      </div>
    </div>
  );
};

/* ----------------------- Gallery Card ----------------------- */
const GalleryCard = ({ img, onDelete, onUpdated, API_URL, showAlert }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(img.title);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(img.image_url);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("image", file);
    try {
      await axios.patch(`${API_URL}${img._id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsEditing(false);
      onUpdated();
      showAlert("✅ Image updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showAlert("Failed to update image.", "error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img src={preview} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const newFile = e.target.files[0];
                setFile(newFile);
                if (newFile) setPreview(URL.createObjectURL(newFile));
              }}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black text-white px-3 py-1 rounded hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">{img.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(img._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
