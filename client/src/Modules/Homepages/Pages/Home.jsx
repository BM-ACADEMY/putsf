import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        // Ensure we get data, fallback to empty array if error
        setImages(res.data ? res.data.slice(0, 4) : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery preview.");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">

      {/* 🏁 Background Texture (Dot Grid Pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* 📝 Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
           <p className="text-[#0056b3] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
             Our Memories
           </p>
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
             Gallery <span className="text-[#dc2626]">Highlights</span>
           </h2>
           <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>
           <p className="text-lg text-gray-600 leading-relaxed">
             A glimpse into our movement — moments of unity, progress, and change.
             <span className="block mt-2 font-semibold text-slate-900 italic">
               “People’s Progressive Spirit” 🇮🇳
             </span>
           </p>
        </div>

        {/* 🌀 Loading / Error State */}
        {loading && (
          <div className="flex justify-center py-10">
             <div className="w-10 h-10 border-4 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 max-w-lg mx-auto">
             <p className="text-[#dc2626] font-medium">{error}</p>
          </div>
        )}

        {/* 🖼️ Gallery Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {images.map((img) => (
              <div
                key={img._id}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white cursor-pointer border-2 border-transparent hover:border-[#0056b3] transition-all duration-300 h-[280px]"
                onClick={() => setSelectedImage(img.image_url)}
              >
                {/* Image */}
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay (Dark Gradient on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-lg font-bold leading-tight">
                      {img.title}
                    </h3>
                    <div className="w-10 h-1 bg-[#dc2626] mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔗 View More Button */}
        {!loading && !error && (
           <div className="text-center mt-12 md:mt-16">
             <Link
               to="/gallery"
               className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
             >
               View Full Gallery
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
               </svg>
             </Link>
           </div>
        )}

        {/* 🌌 Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scaleIn border border-white/10"
              />
            </div>
          </div>
        )}
      </div>

      {/* 📩 Floating Complaint Box Button */}
      <Link
        to="/complaint"
        className="fixed bottom-8 right-8 z-40 group flex items-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-red-900/30 hover:-translate-y-1 transition-all duration-300"
      >
        <span className="text-2xl animate-bounce">🗳️</span>
        <span className="font-bold tracking-wide">Complaint Box</span>
      </Link>

      {/* ✨ CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        `}
      </style>
    </section>
  );
};

export default Home;
