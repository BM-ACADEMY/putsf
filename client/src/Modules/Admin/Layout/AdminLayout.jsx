// src/Modules/Admin/Layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Breadcrumbs from "../Pages/Dashboard/Breadcrumbs";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6 bg-gray-100 min-h-screen transition-all duration-300">
        <Breadcrumbs />
        <Outlet /> {/* Renders Dashboard, Banner, Gallery, etc. */}
      </div>
    </div>
  );
};

export default AdminLayout;
