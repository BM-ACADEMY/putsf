import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/* ----------------------- Banner Card ----------------------- */
const BannerCard = ({ banner, onDelete }) => {
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img
        src={banner.image_url || `${MEDIA_URL}${banner.image}`}
        alt="Banner"
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex justify-between">
        <button
          onClick={() => onDelete(banner._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

/* ----------------------- Banner Admin ----------------------- */
const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const dropRef = useRef(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;

  /* -------- Fetch all banners -------- */
  const fetchBanners = async () => {
    setFetching(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setBanners(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch banners.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* -------- Handle drag & drop -------- */
  useEffect(() => {
    const div = dropRef.current;
    if (!div) return;

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

  /* -------- Handle file change -------- */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  /* -------- Handle upload -------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      setFile(null);
      setPreview(null);
      setProgress(0);
      fetchBanners();
    } catch (err) {
      console.error(err);
      setError("Failed to upload banner.");
    } finally {
      setLoading(false);
    }
  };

  /* -------- Handle delete -------- */
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    setBanners((prev) => prev.filter((b) => b._id !== _id));
    try {
      await axios.delete(`${API_URL}${_id}/`);
    } catch (err) {
      console.error(err);
      setError("Failed to delete banner.");
      fetchBanners();
    }
  };

  /* ----------------------- UI ----------------------- */
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center md:text-left">
        Manage Banners
      </h1>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
      >
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
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold w-full md:w-auto"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Upload Progress Bar */}
      {loading && progress > 0 && (
        <div className="w-full bg-gray-200 h-2 rounded mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-2 rounded"
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

      {/* Banner Grid */}
      {fetching ? (
        <p className="text-gray-500 text-center">Loading banners...</p>
      ) : banners.length === 0 ? (
        <p className="text-gray-500 text-center">No banners available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <BannerCard key={banner._id} banner={banner} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;
