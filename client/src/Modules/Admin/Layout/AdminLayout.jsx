// src/Modules/Admin/Layout/AdminLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// ⚠️ Ensure these paths match where you saved the components
import Sidebar from "../../Admin/Pages/Dashboard/Sidebar";
import Breadcrumbs from "../../Admin/Pages/Dashboard/Breadcrumbs";

// ⚠️ Ensure 'removeTokens' is imported (renamed from clearAuth if you used my auth.js)
import API from "../../../api";

const AdminLayout = () => {
  const navigate = useNavigate();

  /* ----------------- Auto Logout Handler ----------------- */
  const handleForceLogout = () => {
    removeTokens(); // Using the helper from utils/auth.js
    navigate("/admin/login", { replace: true });
  };

  /* ----------------- Silent Auto Refresh Logic ----------------- */
  useEffect(() => {
    // Run this check every 3.5 minutes to keep session alive
    const interval = setInterval(async () => {
      const refresh = getRefreshToken();
      if (!refresh) return;

      try {
        // Using API ensures proper Authorization & refresh queue 🌟
        const res = await API.post("/admin/refresh/", { refresh });

        if (res.data?.access) {
          // Use setTokens to update access + refresh if available
          setTokens({
            access: res.data.access,
            refresh: res.data.refresh,
          });
        }
      } catch (err) {
        console.error("Session expired, logging out...");
        handleForceLogout();
      }
    }, 3.5 * 60 * 1000); // 3.5 minutes

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">

      {/* 👈 Fixed Sidebar */}
      {/* The Sidebar component now handles its own logout UI */}
      <Sidebar />

      {/* 👉 Main Content Wrapper */}
      {/* md:ml-72 pushes content right to not hide behind fixed sidebar */}
      <main className="flex-1 md:ml-72 transition-all duration-300 relative bg-slate-50 min-h-screen flex flex-col">

        {/* 🥖 Sticky Header Strip */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">

          {/* Breadcrumbs */}
          <div className="pt-1">
             <Breadcrumbs />
          </div>

          {/* Right Side Status Badge */}
          <div className="hidden md:flex items-center gap-3 bg-slate-100 py-1.5 px-3 rounded-full border border-slate-200">
             <span className="relative flex h-2.5 w-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
             </span>
             <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">System Live</span>
          </div>
        </header>

        {/* 📄 Page Content Injection */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
           <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;
