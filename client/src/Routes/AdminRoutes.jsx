// src/Routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AdminLayout from "../Modules/Admin/Layout/AdminLayout.jsx";

// Pages
import Login from "../Modules/Admin/Auth/Login.jsx";
import Dashboard from "../Modules/Admin/Pages/Dashboard/Dashboard.jsx";
import Gallery from "../Modules/Admin/Pages/Gallery/Gallery.jsx";
import BannerAdmin from "../Modules/Admin/Pages/Banner/Banner.jsx";
import BlogAdmin from "../Modules/Admin/Pages/Blog/Blog.jsx";
import LicenseAdmin from "../Modules/Admin/Pages/License/License.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public login route */}
      <Route path="login" element={<Login />} />

      {/* Protected admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="banner" element={<BannerAdmin />} />
        <Route path="blogs" element={<BlogAdmin />} />
        <Route path="license" element={<LicenseAdmin />} />

        {/* Redirect unknown admin paths to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
