import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MembershipDownload() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Use API base URL from .env
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/license-download/`;

  const handleDownload = async () => {
    if (!phone.trim()) {
      toast.warn("Please enter your registered phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?phone=${phone}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "membership_certificate.pdf");
      document.body.appendChild(link);
      link.click();

      toast.success("🎉 Membership Certificate downloaded successfully!");
    } catch (error) {
      toast.error("❌ Membership not found or not approved yet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-yellow-50 via-red-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-8 border-red-600 relative overflow-hidden"
      >
        {/* 🌟 Decorative glowing orbs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-tr from-yellow-400 to-red-500 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-bl from-red-400 to-yellow-300 rounded-full blur-2xl opacity-30"></div>

        <h1 className="text-3xl font-extrabold text-red-700 mb-3">
          Download Your Membership Certificate
        </h1>
        <p className="text-gray-700 mb-6 text-base md:text-lg">
          Enter your registered phone number to securely download your official{" "}
          <span className="text-red-600 font-semibold">
            PUTSF Membership Certificate.
          </span>
        </p>

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-2 border-red-300 focus:border-red-600 outline-none p-3 rounded-lg w-full mb-5 text-center text-gray-800 transition-all duration-300"
        />

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-600 to-yellow-500 hover:scale-[1.03] hover:shadow-xl"
          }`}
        >
          <FaDownload />
          {loading ? "Processing..." : "Download Certificate"}
        </button>

        <p className="text-sm text-gray-600 mt-6 italic">
          “For our village to grow — our people must rise.” 🇮🇳
        </p>
      </motion.div>
    </section>
  );
}
