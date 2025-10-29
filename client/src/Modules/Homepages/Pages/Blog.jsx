import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  // Fetch blog posts from backend
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-indigo-600">
          Our Political Insights & Blogs
        </h1>

        {/* Loading & Error States */}
        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg mb-6">{error}</p>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h2 className="font-semibold text-2xl mb-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                      {blog.title}
                    </h2>
                    {blog.subtitle && (
                      <p className="text-gray-600 mb-2">{blog.subtitle}</p>
                    )}
                    <p className="text-gray-700">
                      {blog.content?.length > 120
                        ? blog.content.substring(0, 120) + "..."
                        : blog.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {blog.created_at && (
                        <span>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <p className="text-center text-gray-600 col-span-full">
                No blogs found.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHome;
