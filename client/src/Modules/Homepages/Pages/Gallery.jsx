import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearchPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        // Ensure we handle the response correctly
        setImages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load gallery images.");
      }
    };
    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">

      {/* 🏁 Background Texture (Dot Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="relative container mx-auto px-6 md:px-12 lg:px-16 z-10">

        {/* --- Title Section --- */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#0056b3] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
             Visual Journey
           </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Our <span className="text-[#dc2626]">Gallery</span> Highlights
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            A glimpse into our movement — moments of unity, progress, and change.{" "}
            <span className="text-slate-900 font-bold block mt-2">
              People’s Progressive Spirit in Action.
            </span>
          </p>
        </motion.div>

        {error && (
          <div className="text-center py-8 bg-red-50 rounded-xl border border-red-100 max-w-lg mx-auto mb-8">
             <p className="text-[#dc2626] font-medium">{error}</p>
          </div>
        )}

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {images.map((img, index) => (
            <motion.div
              key={img._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md cursor-pointer border-2 border-transparent hover:border-[#0056b3] hover:shadow-xl transition-all duration-300 h-64 md:h-72"
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 p-4 text-center">
                <div className="w-12 h-12 bg-[#dc2626] rounded-full flex items-center justify-center mb-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                   <FaSearchPlus className="text-xl" />
                </div>
                <h2 className="text-sm font-bold tracking-wide uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {img.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Lightbox Modal --- */}
        <AnimatePresence>
          {lightboxOpen && images.length > 0 && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full"
              >
                <FaTimes className="text-2xl" />
              </button>

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center w-full h-full max-h-[80vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>

                {/* Prev Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#0056b3] transition p-3 bg-black/20 rounded-full hover:bg-white"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>

                {/* The Image */}
                <div className="relative">
                   <motion.img
                    key={images[currentIndex]._id}
                    src={images[currentIndex].image_url}
                    alt={images[currentIndex].title}
                    className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Title Caption */}
                  <div className="absolute -bottom-12 left-0 w-full text-center">
                    <p className="text-white font-bold text-xl tracking-wide">
                      {images[currentIndex].title}
                    </p>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#0056b3] transition p-3 bg-black/20 rounded-full hover:bg-white"
                >
                  <FaChevronRight className="text-2xl" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center px-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex space-x-3 overflow-x-auto py-2 px-4 max-w-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {images.map((img, index) => (
                    <img
                      key={img._id}
                      src={img.image_url}
                      alt={img.title}
                      className={`h-16 w-16 object-cover rounded-md cursor-pointer transition-all duration-300 border-2 ${
                        currentIndex === index
                          ? "border-[#0056b3] opacity-100 scale-110"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeGallery;
