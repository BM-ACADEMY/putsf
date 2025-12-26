import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/complaints/`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      toast.warn("⚠️ Please fill in all required fields.", {
        className: "font-bold text-slate-800 border-l-4 border-yellow-500",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      toast.success("✅ Complaint submitted successfully!", {
        className: "font-bold text-slate-800 border-l-4 border-green-500",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to submit. Please try again.", {
        className: "font-bold text-slate-800 border-l-4 border-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 relative py-16 md:py-24 overflow-hidden">

        {/* 🏁 Background Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          transition={Slide}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* 📝 Page Title */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#0056b3] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
               We Are Here To Listen
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Grievance <span className="text-[#dc2626]">Redressal</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your voice matters. Submit your complaints or suggestions directly to the federation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {/* 👈 LEFT: Contact Info Sidebar (UPDATED) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#0f172a] text-white rounded-2xl shadow-xl p-8 border-t-8 border-[#0056b3]">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#3b82f6] shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200">Headquarters</h4>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                        NO1, 2nd Cross, Pothigai Nagar, Nawarkulam,<br/>
                        Lawspet Post,<br/>
                        Puducherry – 605008
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#dc2626] shrink-0">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200">Helpline</h4>
                      <a href="tel:+919787721199" className="text-sm text-gray-400 mt-1 hover:text-white transition-colors">
                        +91 97877 21199
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-yellow-400 shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200">Email Us</h4>
                      <a href="mailto:swaminathan933@gmail.com" className="text-sm text-gray-400 mt-1 hover:text-white transition-colors break-all">
                        swaminathan933@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-700">
                   <p className="text-xs text-slate-400 leading-relaxed italic">
                     "We ensure strict confidentiality for all complaints submitted through this portal."
                   </p>
                </div>
              </div>
            </div>

            {/* 👉 RIGHT: Complaint Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-8 border-[#dc2626]">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#dc2626] rounded-full"></span>
                  Submit Your Complaint
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] focus:bg-white outline-none transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] focus:bg-white outline-none transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] focus:bg-white outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] focus:bg-white outline-none transition-colors"
                      placeholder="Briefly state your issue"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Complaint Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-[#0056b3] focus:bg-white outline-none transition-colors resize-none"
                      placeholder="Please describe your issue in detail..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full md:w-auto px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
                        loading ? "bg-slate-400 cursor-not-allowed" : "bg-[#dc2626] hover:bg-[#b91c1c] hover:shadow-red-200"
                      }`}
                    >
                      {loading ? (
                        "Processing..."
                      ) : (
                        <>
                          <FaPaperPlane /> Submit Complaint
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Complaint;
