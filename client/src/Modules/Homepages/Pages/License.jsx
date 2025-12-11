import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Assuming this path is correct:
import logo from "../../../assets/putsf-logo.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the official brand colors for use in the UI
const BRAND_BLUE = "#0A2A70"; // Dark Blue for text/accents
const BRAND_RED = "#D62828"; // Red for secondary accents
const BRAND_YELLOW = "#FECD00"; // Yellow from the logo

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

  /* ---------------------------------------------------------
      LIVE PHONE CHECK
      --------------------------------------------------------- */
  const checkPhone = async (number) => {
    if (number.length !== 10) {
      setPhoneAvailable(null);
      setPhoneMessage("");
      return;
    }

    setChecking(true);

    try {
      const res = await axios.get(
  `${API_BASE_URL}/putsf/check_phone/`,
  { params: { phone: number } }
);


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

  /* ---------------------------------------------------------
      FORM FIELD CHANGE (Aadhar Formatting Added)
      --------------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const clean = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: clean }));
      checkPhone(clean);
      return;
    }

    // AADHAR NUMBER FORMATTING LOGIC
    if (name === "aadhar_number") {
      const cleanNumber = value.replace(/\D/g, "");
      const restrictedNumber = cleanNumber.substring(0, 12);

      setFormData((prev) => ({ ...prev, aadhar_number: restrictedNumber }));
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

  /**
    * Helper function to format the Aadhar number for display (4-4-4 pattern)
    */
  const formatAadhar = (number) => {
      if (!number) return '';
      const parts = [];
      for (let i = 0; i < number.length; i += 4) {
          parts.push(number.substring(i, i + 4));
      }
      return parts.join('-');
  };


  /* ---------------------------------------------------------
      VALIDATE BEFORE SUBMIT
      --------------------------------------------------------- */
  const validate = () => {
    if (!formData.name.trim()) return toast.error("Enter full name");
    if (formData.aadhar_number.length !== 12) return toast.error("Aadhar number must be 12 digits");
    if (formData.phone.length !== 10) return toast.error("Enter 10-digit phone number");
    if (phoneAvailable === false) return toast.error("Phone already registered!");
    if (!formData.address.trim()) return toast.error("Enter address");
    if (!formData.photo) return toast.error("Upload a photo");

    return true;
  };

  /* ---------------------------------------------------------
      SUBMIT FORM → SEND TO BACKEND
      --------------------------------------------------------- */
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

      // Reset form
      setFormData({
        name: "",
        aadhar_number: "",
        phone: "",
        address: "",
        photo: null,
      });

      // Cleanup
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

  /* ---------------------------------------------------------
      UI
      --------------------------------------------------------- */

  // Custom Background Style: Using a subtle repeating pattern derived from brand colors
  // NOTE: In a real project, you would create a small SVG pattern and import it.
  // Here, I use a simple linear gradient for a modern vector feel.
  const customBackgroundStyle = {
    backgroundColor: '#f9fafb', // bg-gray-50 base
  backgroundImage: `
    linear-gradient(to right, rgba(10, 42, 112, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(10, 42, 112, 0.05) 1px, #f9fafb 1px)
  `,
  backgroundSize: '30px 30px', // Adjust size for tighter or looser grid
  minHeight: '100vh',
  };

  return (
    <div
      className="flex items-start md:items-center justify-center py-12 px-4"
      style={customBackgroundStyle}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

          {/* HEADER */}
          <div className="px-6 py-8 border-b border-gray-200" style={{ backgroundColor: BRAND_BLUE }}>
            <div className="flex items-center gap-4">
              {/* Logo Image Integration (uses imported 'logo') */}
              <div
                className="w-16 h-16 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Namathu Makkal Kazhagam Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-white">
                  Membership Card Application
                </h1>
                <p className="text-base mt-1 text-gray-300">
                  Urupinar Attai — உறுப்பினர் அட்டை
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* FORM */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <fieldset className="space-y-6">
                <legend className="sr-only">Personal Information</legend>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Aadhar (Value is formatted) */}
                  <div>
                    <label htmlFor="aadhar_number" className="block text-sm font-semibold text-gray-700 mb-1">Aadhar Number (12 Digits) *</label>
                    <input
                      id="aadhar_number"
                      name="aadhar_number"
                      value={formatAadhar(formData.aadhar_number)}
                      onChange={handleChange}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-sm"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">Enter digits only. Automatically formatted as 4-4-4.</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone (10 Digits) *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="Your mobile number"
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-sm"
                      required
                    />

                    {/* Phone check status with icons */}
                    {phoneMessage && (
                      <div className={`flex items-center text-xs mt-2 font-medium ${
                        phoneAvailable ? "text-green-600" : "text-red-600"
                      }`}>
                        {checking ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : phoneAvailable ? (
                          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                        {checking ? "Checking..." : phoneMessage}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Full Residential Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Street, City, District, Pincode"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-blue-600 focus:border-blue-600 transition duration-150 shadow-sm"
                    required
                  />
                </div>

                {/* Photo upload */}
                <div className="pt-4">
                  <label htmlFor="photo" className="block text-sm font-semibold text-gray-700 mb-2">Upload Passport Photo *</label>
                  <input
                    id="photo"
                    type="file"
                    ref={fileInputRef}
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 cursor-pointer"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG. Max size: 2MB.</p>
                </div>
              </fieldset>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || checking}
                className="w-full md:w-auto mt-6 px-10 py-3 text-white font-bold text-lg rounded-full shadow-xl hover:opacity-90 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>

            {/* PREVIEW (Enhanced Card) */}
            <aside className="lg:col-span-1 h-fit lg:sticky lg:top-8">
              <div className="p-7 bg-gray-800 rounded-2xl shadow-2xl transform transition duration-300 hover:shadow-gray-500/50">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Digital Card Preview</h3>

                {/* Photo Upload Area */}
                <div className="w-full aspect-square max-w-[200px] bg-white/10 border-4 border-dashed rounded-xl mx-auto overflow-hidden flex items-center justify-center p-2 shadow-inner group transition duration-300 border-gray-400">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Applicant Photo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-gray-400 font-medium text-sm group-hover:text-red-300">Upload Photo Here</span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-6 text-left space-y-3">
                  <div className="border-b border-gray-700 pb-2">
                    <p className="text-gray-400 text-sm">Member Name</p>
                    <p className="text-white text-xl font-extrabold truncate">{formData.name || "FULL NAME"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">ID No. (Aadhar)</p>
                    <p className="text-lg font-mono" style={{ color: BRAND_YELLOW }}>{formatAadhar(formData.aadhar_number) || "XXXX-XXXX-XXXX"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Contact Phone</p>
                    <p className="text-gray-200 text-lg font-mono">{formData.phone || "XXXXXXXXXX"}</p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                    *The final card design may vary slightly.
                </p>

              </div>
            </aside>
          </div>

          <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
            **Important Note:** All fields marked with an asterisk (*) are mandatory for application submission.
          </div>
        </div>
      </div>
    </div>
  );
}
