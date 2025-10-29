import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  // Fetch gallery images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load gallery images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-indigo-600">
          Gallery
        </h1>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white font-semibold text-lg md:text-xl p-2 text-center">
                  {img.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && images.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-gray-300"
            >
              &times;
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
            >
              &#8249;
            </button>

            <div className="max-w-4xl max-h-full mx-auto p-4 flex flex-col items-center">
              <img
                src={images[currentIndex].image_url}
                alt={images[currentIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
              />
              <p className="text-indigo-600 mt-4 font-semibold text-lg md:text-xl text-center">
                {images[currentIndex].title}
              </p>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-5xl font-bold hover:text-gray-300"
            >
              &#8250;
            </button>

            {/* Thumbnail strip */}
            <div className="flex space-x-3 overflow-x-auto mt-8 max-w-full py-2">
              {images.map((img, index) => (
                <img
                  key={img._id}
                  src={img.image_url}
                  alt={img.title}
                  className={`h-24 w-24 object-cover rounded-lg cursor-pointer border-2 ${
                    currentIndex === index
                      ? "border-indigo-500"
                      : "border-transparent"
                  } hover:border-indigo-400 transition`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeGallery;
