// client/src/Modules/Homepages/Pages/LicenseDownload.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../../assets/putsf-logo.jpg";
import BlogBg from "../../../assets/banner/blog_bg_1.jpg";

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
        setSuccessMsg("Download completed!");
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
    <section className="min-h-[90vh] flex items-center justify-center bg-[#FFF200]/20" style={{ backgroundImage: `url(${BlogBg})` }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-5 border-[#FF0000]">
        <div className="flex justify-center"><img src={logo} alt="Logo" className="w-34 h-34 drop-shadow-lg" /></div>

        <h1 className="text-3xl font-extrabold text-[#0033A0] mb-3">Membership Certificate Download</h1>
        <p className="text-gray-700 mb-6">Enter your registered phone number to download your membership card.</p>

        <input type="text" placeholder="Enter your 10-digit phone number" value={phone} onChange={(e) => { const onlyNums = e.target.value.replace(/\D/g, ""); if (onlyNums.length <= 10) setPhone(onlyNums); if (onlyNums.length > 0 && onlyNums.length < 10) { setErrorMsg("Phone number must be 10 digits."); setSuccessMsg(""); } else setErrorMsg(""); }} maxLength={10} className={`border-2 ${errorMsg ? "border-[#FF0000]" : "border-[#0033A0]/40 focus:border-[#0033A0]"} outline-none p-3 rounded-lg w-full mb-2 text-center`} />

        {errorMsg && <p className="text-[#FF0000] text-sm mb-3">{errorMsg}</p>}

        {loading && (<div className="w-full bg-gray-200 rounded-full h-3 mb-5 relative overflow-hidden"><div className="h-3 rounded-full bg-green-500" style={{ width: `${progress}%` }}></div><span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-white">{progress}%</span></div>)}

        <button onClick={handleDownload} disabled={loading} className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF0000] hover:bg-[#cc0000]"}`}>
          <FaDownload />
          {loading ? "Downloading..." : "Download Certificate"}
        </button>

        {successMsg && <p className="text-green-600 font-semibold mt-4">{successMsg}</p>}
      </motion.div>
    </section>
  );
}
