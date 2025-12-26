import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.length > 0) {
          setBanner(res.data[res.data.length - 1]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load banner.");
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  // ✅ Light Theme Loading
  if (loading) {
    return (
      <section className="w-full h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-gray-500 font-medium tracking-wide animate-pulse">LOADING CONTENT...</p>
        </div>
      </section>
    );
  }

  // ✅ Light Theme Error
  if (error || !banner) {
    return (
      <section className="w-full h-[50vh] bg-white flex items-center justify-center">
        <p className="text-gray-500">No banner available.</p>
      </section>
    );
  }

  const imageSrc = banner.image_url
    ? banner.image_url
    : `${MEDIA_URL}${banner.image}`;

  return (
    // ✅ Full Screen Height Section - White Background
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-white">

      {/* 🖼️ Background Image - NO DARK OVERLAY */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageSrc}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
        {/* Optional: Very subtle white wash at bottom just to help text definition if image is busy */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
      </div>

      {/* 📝 Central Content - Dark Text */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl mt-10">

        
        {/* Main Title - Dark Slate Color */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-6 drop-shadow-lg animate-fadeInUp delay-200">
          {banner.title}
        </h2>

        {/* Subtitle - Medium Gray */}
        {banner.subtitle && (
          // Added mb-16 for better spacing since buttons are gone
          <p className="text-lg md:text-2xl text-gray-800 mb-16 font-medium leading-relaxed max-w-3xl mx-auto animate-fadeInUp delay-300 drop-shadow-md">
            {banner.subtitle}
          </p>
        )}

        {/* 🚫 BUTTONS REMOVED HERE 🚫 */}

      </div>

      {/* 🚫 SCROLL INDICATOR REMOVED HERE 🚫 */}

      {/* ✨ CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
        `}
      </style>
    </section>
  );
};

export default Banner;
