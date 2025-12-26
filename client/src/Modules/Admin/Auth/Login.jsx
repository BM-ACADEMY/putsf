// C:\Users\ADMIN\Desktop\Project\Putsf\client\src\Modules\Admin\Auth\Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import Logo from "../../../assets/putsf-logo.jpg";
import { setTokens } from "../../../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/admin/login/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setTokens({
        access: res.data.access,
        refresh: res.data.refresh,
      });

      navigate("/admin/gallery");
    } catch (err) {
      console.error(err);
      setError("Access Denied. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white">

      {/* 🟦 LEFT PANEL: Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0f172a] relative overflow-hidden flex-col items-center justify-center text-white p-12">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0056b3] rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#dc2626] rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full inline-block mb-8 shadow-2xl border border-white/10">
            <img
              src={Logo}
              alt="PUTSF Logo"
              className="w-24 h-24 object-contain rounded-full"
            />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-4">
            PUTSF <span className="text-[#3b82f6]">Admin</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            Welcome to the official administration portal. Manage members, update content, and oversee operations securely.
          </p>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-8 text-xs text-gray-500 font-medium tracking-widest uppercase">
          Authorized Personnel Only
        </div>
      </div>

      {/* ⬜ RIGHT PANEL: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">

        {/* Mobile Header (Only shows on mobile) */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
           <img src={Logo} alt="Logo" className="w-10 h-10" />
           <span className="font-bold text-slate-900">PUTSF Admin</span>
        </div>

        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Sign In</h2>
            <p className="text-gray-500">Enter your credentials to access the dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-[#dc2626] px-4 py-3 rounded-lg border border-red-100 text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0056b3] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 bg-gray-50 focus:bg-white"
                  placeholder="admin@putsf.org"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-[#0056b3] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#0056b3] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full group bg-slate-900 hover:bg-[#0056b3] text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
              {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </button>

          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} PUTSF. Secure Server.
          </p>
        </div>
      </div>
    </div>
  );
}
