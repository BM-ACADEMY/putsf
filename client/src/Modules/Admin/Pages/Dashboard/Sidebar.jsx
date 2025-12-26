// src/Modules/Admin/components/Sidebar.jsx

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiMenuAlt2,
  HiX,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
  HiOutlineExclamationCircle,
  HiLogout,
  HiShieldCheck
} from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: Direct Logout Logic
  const handleLogout = () => {
    // 1. Clear all storage items
    localStorage.clear();
    sessionStorage.clear();

    // 2. Redirect to Login
    navigate("/admin/login");

    // 3. Optional: Reload page to ensure all states are reset
    // window.location.href = "/admin/login";
  };

  const links = [
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList /> },
    { to: "/admin/complaints", label: "Complaints", icon: <HiOutlineExclamationCircle /> },
  ];

  return (
    <>
      {/* 📱 Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white text-slate-900 rounded-md shadow-lg border border-gray-200"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
        </button>
      </div>

      {/* 🧭 Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#020617] text-white flex flex-col
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out z-[50] border-r border-gray-800`}
      >

        {/* 🔴 Header Branding */}
        <div className="h-24 flex items-center px-8 border-b border-gray-800/60 bg-[#020617]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#dc2626] flex items-center justify-center bg-red-500/10 text-[#dc2626]">
              <HiShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white leading-none">
                PUTSF
              </h2>
              <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mt-1">
                Admin Console
              </p>
            </div>
          </div>
        </div>

        {/* 🔴 Navigation List */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
            Core Modules
          </div>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-lg text-sm font-bold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#dc2626] to-[#991b1b] text-white shadow-lg shadow-red-900/30 translate-x-1"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 🔴 User / Logout Section */}
        <div className="p-6 bg-[#0f172a]">
          <div className="bg-[#1e293b] rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-300">
                AD
              </div>
              <div>
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-[10px] text-gray-400">admin@gmail.com</p>
              </div>
            </div>

            {/* ✅ LOGOUT BUTTON */}
            <button
              type="button" // Ensure it's not a submit button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-lg border border-gray-600 hover:border-red-500 hover:text-red-400 text-xs font-bold text-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <HiLogout className="text-sm" />
              Secure Logout
            </button>
          </div>
        </div>

      </aside>

      {/* 📱 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[40] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
