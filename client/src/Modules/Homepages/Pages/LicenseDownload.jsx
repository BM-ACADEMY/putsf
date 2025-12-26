// client/src/Modules/Homepages/Pages/LicenseDownload.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaDownload, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../../assets/putsf-logo.jpg";

export default function MembershipDownload() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/putsf/download/`;

  const simulateProgress = () => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 90) current = 90;
      setProgress(Math.round(current));
    }, 200);
    return interval;
  };

  const handleDownload = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit phone number.");
      toast.error("Invalid phone number.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    setProgress(0);

    const interval = simulateProgress();

    try {
      const res = await axios.get(`${API_URL}?phone=${cleanPhone}`, { responseType: "blob", validateStatus: () => true });
      clearInterval(interval);
      setProgress(100);

      if (res.status === 404 || res.status === 400) {
        setErrorMsg("Membership not found or not approved.");
        toast.error("Membership not found.");
      } else if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "membership_certificate.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download successful!");
        setSuccessMsg("Download completed successfully!");
      } else {
        setErrorMsg("Membership not approved.");
        toast.error("Not approved yet.");
      }
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      setErrorMsg("Something went wrong. Try again later.");
      toast.error("Server error.");
    } finally {
      setTimeout(() => { setLoading(false); setProgress(0); }, 1000);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-10">

      {/* 🏁 Background Texture (Dot Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      {/* 🎨 Subtle Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[80px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden border-t-8 border-[#0056b3]"
      >
        <div className="p-8 text-center">

          {/* Logo Section */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              <img src={logo} alt="PUTSF Logo" className="w-28 h-28 object-contain drop-shadow-md rounded-full bg-white p-1" />
              {/* Security Icon Badge */}
              <div className="absolute -bottom-2 -right-2 bg-[#0056b3] text-white p-2 rounded-full shadow-lg border-2 border-white">
                <FaShieldAlt className="text-sm" />
              </div>
            </div>
          </div>

          {/* Header Text */}
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Download <span className="text-[#0056b3]">Certificate</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Please enter your registered mobile number to securely verify and download your official membership card.
          </p>

          {/* Input Field */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Enter 10-digit Phone Number"
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                if (onlyNums.length <= 10) setPhone(onlyNums);
                if (onlyNums.length > 0 && onlyNums.length < 10) {
                  setErrorMsg("Phone number must be 10 digits.");
                  setSuccessMsg("");
                } else setErrorMsg("");
              }}
              maxLength={10}
              className={`w-full bg-slate-50 border-2 ${errorMsg ? "border-[#dc2626] bg-red-50" : "border-slate-200 focus:border-[#0056b3] focus:bg-white"} outline-none px-4 py-4 rounded-xl text-center text-lg font-bold tracking-widest transition-all duration-300 placeholder-gray-400`}
            />
            {phone.length === 10 && !errorMsg && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          {/* Error Message */}
          <div className="h-6 mb-4">
             {errorMsg && <p className="text-[#dc2626] text-xs font-bold animate-pulse">{errorMsg}</p>}
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-slate-100 rounded-full h-2 mb-6 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0056b3] to-[#dc2626] rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 transform
              ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[#dc2626] hover:bg-[#b91c1c] hover:-translate-y-1 hover:shadow-red-200"}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <FaDownload />
                Download Certificate
              </>
            )}
          </button>

          {/* Success Message */}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-green-700 font-bold text-sm flex items-center justify-center gap-2">
                ✅ {successMsg}
              </p>
            </motion.div>
          )}

        </div>

        {/* Footer Strip */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Official Federation Portal
          </p>
        </div>
      </motion.div>
    </section>
  );
}
