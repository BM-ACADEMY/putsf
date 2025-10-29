import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../../../api";
import { CheckCircle, Trash2, Download, Clock } from "lucide-react";

export default function LicenseAdmin() {
  const [licenses, setLicenses] = useState([]);

  const fetchLicenses = async () => {
    try {
      const res = await API.get("/license/");
      setLicenses(res.data);
    } catch {
      toast.error("Failed to fetch licenses");
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await API.post(`/license/${id}/approve/`);
      toast.success("License approved!");
      fetchLicenses();

      // ✅ Show WhatsApp link (optional)
      if (res.data?.whatsapp_link) {
        window.open(res.data.whatsapp_link, "_blank");
      }
    } catch {
      toast.error("Failed to approve license");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this license?")) return;
    try {
      await API.delete(`/license/${id}/`);
      toast.success("License deleted");
      fetchLicenses();
    } catch {
      toast.error("Failed to delete license");
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
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
                    src={`http://127.0.0.1:8000${item.photo}`}
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
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
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
    </div>
  );
}
