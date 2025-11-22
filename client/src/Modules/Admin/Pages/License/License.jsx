import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, Trash2, Download, Clock } from "lucide-react";

export default function LicenseAdmin() {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/license/`;

  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------------- Fetch Licenses ---------------- */
  const fetchLicenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setLicenses(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("❌ Failed to fetch licenses", { className: "toast-error" });
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  /* ---------------- Approve License ---------------- */
  const handleApprove = async (id) => {
    try {
      const res = await axios.post(`${API_URL}${id}/approve/`);
      toast.success("✅ License approved successfully!", { className: "toast-success" });

      fetchLicenses();

      // ✅ If WhatsApp link is available
      if (res.data?.whatsapp_link) {
        toast.info(
          <div className="flex flex-col gap-1">
            <span>📱 Click below to share via WhatsApp:</span>
            <a
              href={res.data.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 underline font-semibold"
            >
              Open WhatsApp
            </a>
          </div>,
          { autoClose: 8000, className: "toast-info" }
        );
      }
    } catch (err) {
      toast.error("❌ Failed to approve license", { className: "toast-error" });
    }
  };

  /* ---------------- Delete License ---------------- */
  const confirmDelete = (license) => {
    setDeleteTarget(license);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`${API_URL}${deleteTarget._id}/`);
      toast.success("🗑️ License deleted successfully!", { className: "toast-success" });
      setDeleteTarget(null);
      fetchLicenses();
    } catch (err) {
      toast.error("❌ Failed to delete license", { className: "toast-error" });
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* 🟩 Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        transition={Slide}
      />

      {/* 🟦 Toast Styles */}
      <style>{`
        .Toastify__toast {
          font-weight: 600;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
        }
        .toast-success {
          background: linear-gradient(to right, #0033A0, #000000);
          color: #fff;
        }
        .toast-error {
          background: linear-gradient(to right, #D62828, #000000);
          color: #fff;
        }
        .toast-info {
          background: linear-gradient(to right, #0033A0, #D62828);
          color: #fff;
        }
      `}</style>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">License Requests</h1>

      {licenses.length === 0 ? (
        <p className="text-gray-500">No license requests found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5"
            >
              <div className="flex items-center gap-4">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt="photo"
                    className="w-20 h-20 object-cover rounded-xl border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                    No Photo
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.phone}</p>
                  <p className="text-xs text-gray-500">{item.aadhar_number}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Address:</span> {item.address}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    item.is_approved ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {item.is_approved ? (
                    <>
                      <CheckCircle size={16} /> Approved
                    </>
                  ) : (
                    <>
                      <Clock size={16} /> Pending
                    </>
                  )}
                </span>

                <div className="flex gap-2">
                  {!item.is_approved && (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black text-white text-sm rounded-lg cursor-pointer hover:opacity-90"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => confirmDelete(item)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {item.is_approved && item.license_pdf && (
                <a
                  href={`http://127.0.0.1:8000${item.license_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Download size={16} className="mr-1" /> Download License
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🟥 Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            <h3 className="text-xl font-bold text-[#D62828] mb-3">⚠️ Delete Confirmation</h3>
            <p className="text-gray-700 mb-5">
              Are you sure you want to delete <br />
              <span className="font-semibold text-[#0033A0]">“{deleteTarget.name}”</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-gradient-to-r from-[#D62828] to-[#000000] text-white rounded-lg font-semibold hover:opacity-90"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
