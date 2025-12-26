// src/Modules/Admin/Pages/Complaints/Complaints.jsx

import React, { useEffect, useState } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  Search,
  MessageSquare,
  Phone,
  User,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Complaints = () => {
  const API_URL = `/complaints/`;

  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* -------- Fetch Data -------- */
  const fetchComplaints = async () => {
    try {
      const response = await API.get(API_URL);
      const data = Array.isArray(response.data) ? response.data : [];
      setComplaints(data);
      setFilteredComplaints(data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* -------- Search Logic -------- */
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = complaints.filter((item) => {
      const name = String(item.name || "").toLowerCase();
      const phone = String(item.phone || "");
      const msg = String(item.message || "").toLowerCase();

      return name.includes(lowerTerm) || phone.includes(searchTerm) || msg.includes(lowerTerm);
    });
    setFilteredComplaints(filtered);
  }, [searchTerm, complaints]);

  /* -------- Delete Logic -------- */
  const handleDelete = async () => {
    if (!deleteTarget) return;

    // Support both _id (Mongo) and id (SQL) just in case
    const targetId = deleteTarget._id || deleteTarget.id;

    try {
      await API.delete(`${API_URL}${targetId}/`);
      setComplaints((prev) => prev.filter((item) => (item._id || item.id) !== targetId));
      toast.success("🗑️ Complaint deleted successfully!");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete complaint.");
    }
  };

  return (
    <div className="relative">

      {/* 🏁 Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>

      <ToastContainer position="top-right" autoClose={2000} transition={Slide} />

      {/* 📝 Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 relative z-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Public <span className="text-[#dc2626]">Grievances</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            Review and manage submitted complaints.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search name, phone, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 📊 Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden relative z-10">

        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-10 h-10 border-4 border-[#dc2626] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <MessageSquare size={48} className="text-slate-200 mb-4" />
            <p>No complaints found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Submitted By</th>
                  <th className="px-6 py-4">Message Content</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredComplaints.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-red-50/30 transition-colors group">

                    {/* User Info */}
                    <td className="px-6 py-4 w-64 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 mt-1">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{item.name || "Anonymous"}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <Phone size={12} /> {item.phone || "No Phone"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4 align-top">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {item.subject && (
                          <p className="text-xs font-bold text-[#dc2626] uppercase mb-1 tracking-wide">
                            {item.subject}
                          </p>
                        )}
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {item.message}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 align-top w-40">
                      <p className="text-xs font-medium text-slate-500 flex items-center gap-2 mt-2">
                        <Calendar size={14} />
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Unknown"}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 align-top text-right w-24">
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-2 mt-1 rounded-lg bg-white border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-[#dc2626] hover:border-red-200 transition-all shadow-sm"
                        title="Delete Complaint"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🗑️ Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 text-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Delete Complaint?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Are you sure you want to delete the message from <br/>
                  <span className="font-bold text-slate-900">"{deleteTarget.name}"</span>?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2.5 bg-[#dc2626] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition shadow-lg shadow-red-500/30"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Complaints;
