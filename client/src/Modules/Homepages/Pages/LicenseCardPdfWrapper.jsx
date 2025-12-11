// client/src/Modules/Homepages/Pages/LicenseCardPdfWrapper.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api";
import LicenseCardPdf from "./LicenseCardPdf";

export default function LicenseCardPdfWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/putsf/${id}/`)
      .then((res) => {
        setLicense(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load error:", err);
        setLoading(false);
        alert("Failed to load record");
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-600"><p>Loading details...</p></div>;
  if (!license) return <div className="p-10 text-center text-red-600"><p>Record not found</p><button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Go Back</button></div>;

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md">← Back</button>
      <LicenseCardPdf license={license} />
    </div>
  );
}
