import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Use API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post(`${API_BASE_URL}/license/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Membership card application submitted successfully!");
      console.log("License created:", res.data);

      // Reset form
      setFormData({
        name: "",
        aadhar_number: "",
        phone: "",
        address: "",
        photo: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting license:", error);
      if (error.response?.data) {
        toast.error(
          error.response.data.detail ||
            JSON.stringify(error.response.data, null, 2)
        );
      } else {
        toast.error("❌ Failed to submit membership form. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-center text-red-700 uppercase tracking-wide">
        Membership Card Application <br />
        <span className="text-gray-700 text-lg">(Urupinar Attai)</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg p-6 rounded-lg border-t-4 border-red-600"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="aadhar_number"
          placeholder="Aadhar Number"
          value={formData.aadhar_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          ref={fileInputRef}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded font-semibold text-lg"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
