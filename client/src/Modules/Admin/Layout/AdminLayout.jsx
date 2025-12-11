// src/Modules/Admin/Layout/AdminLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Breadcrumbs from "../Pages/Dashboard/Breadcrumbs";
import { clearAuth, getRefreshToken, setTokens } from "../../../utils/auth";
import API from "../../../api";

const AdminLayout = () => {
  const navigate = useNavigate();

  /* ----------------- Logout Handler ----------------- */
  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login", { replace: true });
  };

  /* ----------------- Silent Auto Refresh ----------------- */
  useEffect(() => {
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
            refresh: res.data.refresh, // may or may not exist depending on rotation settings
          });
        }
      } catch (err) {
        // Refresh failed → force logout
        clearAuth();
        navigate("/admin/login", { replace: true });
      }
    }, 3.5 * 60 * 1000); // refresh slightly before access token expires

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6 bg-gray-100 min-h-screen transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <Breadcrumbs />
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
