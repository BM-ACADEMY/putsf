import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const dropRef = useRef(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
    else setPreview(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError("Provide title and image.");
      return;
    }
    setLoading(true);
    setError("");
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
    } catch (err) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    setImages((prev) => prev.filter((img) => img._id !== id));
    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (err) {
      console.error(err);
      setError("Failed to delete image.");
      fetchImages();
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Gallery</h1>
      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

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
          className="border p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <div
          ref={dropRef}
          className="border-2 border-dashed border-gray-300 p-4 rounded-lg w-full md:w-auto text-center cursor-pointer hover:border-blue-400 hover:bg-gray-100 transition"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading && progress > 0 && (
        <div className="w-full bg-gray-200 h-2 rounded mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

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
          />
        ))}
      </div>
    </div>
  );
};

const GalleryCard = ({ img, onDelete, onUpdated, API_URL }) => {
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
    } catch (err) {
      console.error(err);
      alert("Failed to update image.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
