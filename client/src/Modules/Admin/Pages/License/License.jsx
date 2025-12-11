// client/src/Modules/Admin/Pages/License/License.jsx
import React, { useEffect, useState } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, Trash2, Download, Clock } from "lucide-react";

export default function LicenseAdmin() {
  const API_URL = `/putsf/`; // backend collection root

  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchLicenses = async () => {
    try {
      const res = await API.get(API_URL);
      setLicenses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("❌ Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const handleApprove = (license) => {
    // open the PDF preview/approval page (same flow as Nehru)
    window.location.href = `/#/admin/putsf/pdf/${license._id}`;
  };

  const confirmDelete = (license) => setDeleteTarget(license);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      toast.success("Deleted successfully!");
      setDeleteTarget(null);
      fetchLicenses();
    } catch (err) {
      toast.error("❌ Failed to delete");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading requests...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000} transition={Slide} />

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Membership Requests</h1>

      {licenses.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((item) => (
            <div key={item._id} className="bg-white border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                {item.photo ? (
                  <img src={item.photo} alt="photo" className="w-20 h-20 object-cover rounded-xl border" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">No Photo</div>
                )}

                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.phone}</p>
                  <p className="text-xs text-gray-500">{item.education}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700"><span className="font-medium">Address:</span> {item.address}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className={`flex items-center gap-1 text-sm font-medium ${item.is_approved ? "text-green-600" : "text-yellow-600"}`}>
                  {item.is_approved ? <><CheckCircle size={16} /> Approved</> : <><Clock size={16} /> Pending</>}
                </span>

                <div className="flex gap-2">
                  {!item.is_approved && (
                    <button onClick={() => handleApprove(item)} className="px-3 py-1.5 text-white rounded-lg bg-gradient-to-r from-[#0033A0] to-[#D62828] text-sm">
                      Approve
                    </button>
                  )}

                  <button onClick={() => confirmDelete(item)} className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {item.is_approved && item.certificate_pdf && (
                <a href={item.certificate_pdf} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center text-blue-600 text-sm">
                  <Download size={16} className="mr-1" /> Download Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            <h3 className="text-xl font-bold text-[#D62828] mb-3">⚠️ Delete Confirmation</h3>
            <p className="text-gray-700 mb-5">Are you sure you want to delete <br /><span className="font-semibold text-[#0033A0]">“{deleteTarget.name}”</span>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="px-5 py-2 bg-gradient-to-r from-[#D62828] to-[#000] text-white rounded-lg">Yes, Delete</button>
              <button onClick={() => setDeleteTarget(null)} className="px-5 py-2 bg-gray-300 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
