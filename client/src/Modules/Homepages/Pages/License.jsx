import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../../assets/putsf-logo.jpg";
import { FaUser, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaUpload } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });

  const [checking, setChecking] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneAvailable, setPhoneAvailable] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Live Phone Check
  const checkPhone = async (number) => {
    if (number.length !== 10) {
      setPhoneAvailable(null);
      setPhoneMessage("");
      return;
    }
    setChecking(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/putsf/check_phone/`, { params: { phone: number } });
      if (res.data.available) {
        setPhoneAvailable(true);
        setPhoneMessage("Phone number is available");
      } else {
        setPhoneAvailable(false);
        setPhoneMessage("This phone number is already registered");
      }
    } catch {
      setPhoneAvailable(false);
      setPhoneMessage("Server error checking number");
    }
    setChecking(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const clean = value.replace(/\D/g, "");
      if (clean.length <= 10) {
          setFormData((prev) => ({ ...prev, phone: clean }));
          checkPhone(clean);
      }
      return;
    }

    if (name === "aadhar_number") {
      const cleanNumber = value.replace(/\D/g, "");
      if (cleanNumber.length <= 12) {
          setFormData((prev) => ({ ...prev, aadhar_number: cleanNumber }));
      }
      return;
    }

    if (name === "photo") {
      const file = files?.[0] || null;
      setFormData((prev) => ({ ...prev, photo: file }));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatAadhar = (number) => {
      if (!number) return '';
      const parts = [];
      for (let i = 0; i < number.length; i += 4) {
          parts.push(number.substring(i, i + 4));
      }
      return parts.join('-');
  };

  const validate = () => {
    if (!formData.name.trim()) return toast.error("Enter full name");
    if (formData.aadhar_number.length !== 12) return toast.error("Aadhar number must be 12 digits");
    if (formData.phone.length !== 10) return toast.error("Enter 10-digit phone number");
    if (phoneAvailable === false) return toast.error("Phone already registered!");
    if (!formData.address.trim()) return toast.error("Enter address");
    if (!formData.photo) return toast.error("Upload a photo");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v ?? ""));

    try {
      await axios.post(`${API_BASE_URL}/putsf/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Membership application submitted!");
      setFormData({ name: "", aadhar_number: "", phone: "", address: "", photo: null });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setPhoneMessage("");
      setPhoneAvailable(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(err.response?.data?.error || "Submission failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen py-16 px-4 flex justify-center bg-slate-50 relative overflow-hidden">

      {/* 🏁 Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 📝 FORM SECTION */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-[#0056b3]">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
                <h1 className="text-2xl font-black text-slate-900">Membership Application</h1>
                <p className="text-sm text-gray-500 font-medium">Join the Official Student Body</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FaUser className="text-[#0056b3]" /> Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-[#0056b3] focus:ring-0 transition-colors outline-none font-semibold text-slate-800"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aadhar */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <FaIdCard className="text-[#0056b3]" /> Aadhar Number
                </label>
                <input
                  name="aadhar_number"
                  value={formatAadhar(formData.aadhar_number)}
                  onChange={handleChange}
                  placeholder="XXXX-XXXX-XXXX"
                  maxLength={14}
                  className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-[#0056b3] outline-none font-mono text-slate-800 tracking-wider"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <FaPhoneAlt className="text-[#0056b3]" /> Phone Number
                </label>
                <div className="relative">
                    <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={`w-full border-2 px-4 py-3 rounded-xl outline-none font-mono font-bold tracking-widest ${
                        phoneAvailable === false ? "border-red-500 bg-red-50" :
                        phoneAvailable === true ? "border-green-500 bg-green-50" :
                        "border-slate-200 focus:border-[#0056b3]"
                    }`}
                    required
                    />
                    {checking && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                {phoneMessage && (
                    <p className={`text-xs mt-1 font-bold ${phoneAvailable ? "text-green-600" : "text-red-600"}`}>
                        {phoneMessage}
                    </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#0056b3]" /> Residential Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Street, City, District, Pincode"
                className="w-full border-2 border-slate-200 px-4 py-3 rounded-xl focus:border-[#0056b3] outline-none text-slate-800 resize-none"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FaUpload className="text-[#0056b3]" /> Upload Photo
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                <input
                    type="file"
                    ref={fileInputRef}
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                />
                <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-[#0056b3]">
                    <FaUpload className="text-3xl mb-2" />
                    <p className="font-medium">{formData.photo ? formData.photo.name : "Click to upload passport size photo"}</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 2MB)</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || checking}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all transform hover:-translate-y-1
                ${submitting ? "bg-slate-400 cursor-not-allowed" : "bg-[#dc2626] hover:bg-[#b91c1c] hover:shadow-red-200"}`}
            >
              {submitting ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>
        </div>

        {/* 🪪 PREVIEW CARD SECTION */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0f172a] text-white rounded-2xl shadow-2xl p-6 sticky top-8 border border-slate-800">
                <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                    <h3 className="font-bold text-lg">Live ID Preview</h3>
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-bold uppercase">Active</span>
                </div>

                {/* ID Card Mockup */}
                <div className="bg-gradient-to-br from-white to-slate-100 text-slate-900 rounded-xl overflow-hidden shadow-lg relative">
                    {/* Header Strip */}
                    <div className="h-2 bg-[#dc2626] w-full"></div>
                    <div className="bg-[#0056b3] p-3 flex items-center gap-3">
                        <img src={logo} alt="Logo" className="w-10 h-10 bg-white rounded-full p-1" />
                        <div>
                            <h4 className="text-white font-black text-sm leading-tight">PUTSF</h4>
                            <p className="text-blue-200 text-[10px] font-bold uppercase">Official Member Card</p>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col items-center">
                        <div className="w-28 h-28 bg-slate-200 rounded-lg overflow-hidden border-2 border-slate-300 shadow-inner mb-4">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs text-center p-2">
                                    Photo Preview
                                </div>
                            )}
                        </div>

                        <h2 className="text-xl font-black text-slate-900 text-center uppercase leading-tight mb-1">
                            {formData.name || "YOUR NAME"}
                        </h2>
                        <p className="text-xs font-bold text-[#dc2626] uppercase tracking-widest mb-4">Student Member</p>

                        <div className="w-full space-y-2 text-sm border-t border-slate-200 pt-3">
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-semibold">ID No:</span>
                                <span className="font-mono font-bold">{formatAadhar(formData.aadhar_number) || "XXXX-XXXX"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-semibold">Phone:</span>
                                <span className="font-mono font-bold">{formData.phone || "XXXXXXXXXX"}</span>
                            </div>
                        </div>
                    </div>
                    {/* Footer Strip */}
                    <div className="bg-slate-900 text-center py-1">
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest">Authorized Signature</p>
                    </div>
                </div>

                <p className="text-xs text-slate-500 text-center mt-6">
                    * This is a preview. Your actual card may contain a QR code and official hologram.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}
