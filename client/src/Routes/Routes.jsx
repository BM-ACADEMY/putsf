// src/Routes/Routes.jsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your route modules
import HomepagesRoutes from "./HomepagesRoutes";
import AdminRoutes from "./AdminRoutes";
import Gallery from "../Modules/Homepages/Pages/Gallery";
import BlogHome from "../Modules/Homepages/Pages/Blog";
import Layout from "../Modules/Homepages/Layout/Layout";
import License from "../Modules/Homepages/Pages/License";
import LicenseDownload from "../Modules/Homepages/Pages/LicenseDownload";
import Contact from "../Modules/Homepages/Pages/Contact";


const AppRoutes = () => {
  return (
    <Router>
     <Routes>
  {/* Public/Homepages routes wrapped in Layout */}
  <Route 
    path="/*" 
    element={
      <Layout>
        <HomepagesRoutes />
      </Layout>
    } 
  />
  {/* ✅ Add License route separately */}
        <Route
          path="/license"
          element={
            <Layout>
              <License />
            </Layout>
          }
        />
        <Route
          path="/license"
          element={
            <Layout>
              <LicenseDownload/>
            </Layout>
          }
        />
  <Route 
    path="/gallery" 
    element={
      <Layout>
        <Gallery />
      </Layout>
    } 
  />
  <Route 
    path="/blog" 
    element={
      <Layout>
        <BlogHome />
      </Layout>
    } 
  />
  <Route path="contact" element={<Contact />} />
  

  {/* Admin routes – maybe without Layout if admin has a separate design */}
  <Route path="/admin/*" element={<AdminRoutes />} />

  {/* Redirect unknown paths */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </Router>
  );
};

export default AppRoutes;
