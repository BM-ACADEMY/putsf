import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/complaints/`; // ✅ Your Django API endpoint

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.warn("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      toast.success("Complaint submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0033A0]/10 via-white to-[#D62828]/10 py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-8 border-[#D62828]">
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent">
          Submit a Complaint
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We value your feedback and take all concerns seriously. Please share your issue below 👇
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#D62828] focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#D62828] focus:outline-none"
              placeholder="Complaint subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2">Complaint Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0] focus:outline-none"
              placeholder="Describe your complaint..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:opacity-90 hover:scale-105 transition-transform disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Complaint;
