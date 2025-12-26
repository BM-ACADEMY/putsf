import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify"; // 1. Import Toast
import "react-toastify/dist/ReactToastify.css"; // 2. Import CSS

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // 3. ✨ Share Functionality
  const handleShare = async (e, blog) => {
    e.stopPropagation(); // Prevent clicking the card behind it

    // Construct the shareable link (You can append blog._id if you have specific pages)
    const shareUrl = window.location.href;
    const shareData = {
      title: blog.title,
      text: blog.subtitle || `Check out this post: ${blog.title}`,
      url: shareUrl,
    };

    // Attempt Native Share (Mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled or failed", err);
      }
    } else {
      // Fallback: Copy to Clipboard (Desktop)
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
        toast.success("📋 Link copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          transition: Slide,
        });
      } catch (err) {
        toast.error("❌ Failed to copy link.");
      }
    }
  };

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">

      {/* 4. Add Toast Container */}
      <ToastContainer />

      {/* 🏁 Background Texture (Dot Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* 📝 Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#dc2626] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
             Latest Updates
           </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Political <span className="text-[#0056b3]">Insights</span> & Blogs
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover thoughts, insights, and stories shaping our political vision and social change.
          </p>
        </div>

        {/* 🌀 Loading & Error */}
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

        {/* 📰 Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => {
              const isExpanded = expandedId === blog._id;

              return (
                <motion.div
                  key={blog._id || index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full group"
                >
                  {/* 🖼 Image Header */}
                  {blog.image_url && (
                    <div className="relative overflow-hidden h-56 shrink-0">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm z-20">
                         {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "Update"}
                      </div>
                    </div>
                  )}

                  {/* ✍️ Content Body */}
                  <div className="p-6 flex flex-col flex-1">

                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#0056b3] transition-colors">
                      {blog.title}
                    </h3>

                    {blog.subtitle && (
                      <p className="text-sm text-[#dc2626] font-semibold mb-4 uppercase tracking-wide">
                        {blog.subtitle}
                      </p>
                    )}

                    {/* Scrollable / Expandable Text */}
                    <div className="relative">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key="content"
                          initial={{ height: "auto" }}
                          animate={{ height: isExpanded ? 200 : 80 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className={`overflow-hidden text-gray-600 leading-relaxed text-sm relative ${isExpanded ? "overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200" : ""}`}
                        >
                          {blog.content}
                        </motion.div>
                      </AnimatePresence>

                      {/* Fade Overlay for collapsed state */}
                      {!isExpanded && (
                         <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                      )}
                    </div>

                    {/* Footer / Action */}
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                      <button
                        onClick={() => toggleExpand(blog._id)}
                        className="text-[#0056b3] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        {isExpanded ? "Show Less" : "Read Full Story"}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>

                      {/* ✨ 5. Working Share Button */}
                      <button
                        onClick={(e) => handleShare(e, blog)}
                        className="text-slate-400 hover:text-[#dc2626] hover:bg-red-50 p-2 rounded-full transition-all cursor-pointer"
                        title="Share this post"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">

                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })
          ) : (
            !loading && (
              <div className="col-span-full py-12 text-center bg-white rounded-xl shadow-sm border border-slate-200">
                <p className="text-gray-500 text-lg">No updates available at the moment.</p>
              </div>
            )
          )}
        </div>

        {/* View All Button */}
        {blogs.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold rounded-lg transition-all shadow-sm hover:shadow-lg">
              View All Posts
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default BlogHome;
