import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiTrash } from "react-icons/hi";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/complaints/`;

  // 🔹 Fetch Complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      setComplaints(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load complaints. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Complaint
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      toast.success("Complaint deleted successfully!");
      setComplaints((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete complaint.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
        Complaints Management
      </h2>

      {/* States */}
      {loading ? (
        <p className="text-gray-600">Loading complaints...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-600">No complaints found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border text-left">Name</th>
                <th className="px-4 py-3 border text-left">Phone</th>
                <th className="px-4 py-3 border text-left">Message</th>
                <th className="px-4 py-3 border text-center">Date</th>
                <th className="px-4 py-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-all border-b"
                >
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3">{item.name || "N/A"}</td>
                  <td className="px-4 py-3">{item.phone || "N/A"}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.message}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <HiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Complaints;
