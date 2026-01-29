// client/src/Modules/Homepages/Pages/LicenseCardPdf.jsx
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../../../api";
import { toast } from "react-toastify";
import signature from "../../../assets/banner/Untitled design (4).png";
import personImage from "../../../assets/banner/Untitled design (1).png";
import qrcode from "../../../assets/banner/qrcode.svg";
import logo from "../../../assets/putsf-logo.jpg";

export default function LicenseCardPdf({ license = {} }) {
  const cardRef = useRef();
  const [loading, setLoading] = useState(false);

  const sanitize = (str) =>
    !str || typeof str !== "string"
      ? "Member"
      : str.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/\s+/g, "_");
  const safeName = sanitize(license.name);

  const downloadPdf = async () => {
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [650, 420] });
      pdf.addImage(imgData, "JPEG", 0, 0, 650, 420);
      pdf.save(`PUTSF_${safeName}.pdf`);
    } catch (err) {
      toast.error("PDF generation failed");
    }
  };

  const approveAndUpload = async () => {
    try {
      setLoading(true);
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [650, 420] });
      pdf.addImage(imgData, "JPEG", 0, 0, 650, 420);

      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("pdf_file", pdfBlob, `PUTSF_${safeName}.pdf`);

      const res = await API.post(`/putsf/${license._id}/upload_pdf/`, formData, { headers: { "Content-Type": "multipart/form-data" } });

      const whatsLink = res.data?.whatsapp_link;
      toast.success("Approved successfully!");
      if (whatsLink) {
        try { navigator.clipboard.writeText(whatsLink); toast.info("WhatsApp link copied!"); } catch { }
        setTimeout(() => window.open(whatsLink, "_blank", "noopener,noreferrer"), 200);
      }
    } catch (err) {
      toast.error("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const photo = license.photo || "/static/default_photo.jpg";
  const name = license.name || "Member";
  const education = license.education || "Education";
  const phone = license.phone || "9xxxxxxxxx";
  const address = license.address || "Address";

  return (
    <div className="p-8">
      <div ref={cardRef} style={{ width: 650, height: 420, background: "#fff", border: "1px solid #0a0a0aad", position: "relative", overflow: "hidden", fontFamily: "Poppins, sans-serif" }}>

        {/* Header */}
        <div style={{ height: 90, display: "flex", alignItems: "center", paddingLeft: 20, paddingRight: 20, background: "linear-gradient(to bottom, #014f94)", borderBottom: "1px solid #0a0a0aad" }}>

          {/* Left: Logo - Added flexShrink: 0 to prevent squashing */}
          <div style={{ width: 75, height: 75, minWidth: 75, flexShrink: 0, borderRadius: "50%", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 15 }}>
            <img src={logo} crossOrigin="anonymous" style={{ width: 65, height: 65, borderRadius: "50%" }} alt="logo" />
          </div>

          {/* Center: Text - Added flex-grow to take up available space properly */}
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "white", lineHeight: "1.2" }}>Puducherry Union Territory Student's Federation</h1>
            <p style={{ margin: 0, fontSize: 13, textAlign: "center", fontWeight: 600, color: "white" }}>Official Membership Identification Card</p>
          </div>

          {/* Right: Founder Image - Added flexShrink: 0 and minWidth to prevent squashing */}
          <div style={{ width: 75, height: 75, minWidth: 75, flexShrink: 0, borderRadius: "50%", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 15 }}>
            <img src={personImage} crossOrigin="anonymous" style={{ width: 65, height: 65, borderRadius: "50%", objectFit: "cover" }} alt="Founder" />
          </div>

        </div>

        {/* small title */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span style={{ padding: "4px 15px", borderRadius: 15, color: "red", fontWeight: 700, fontSize: 12 }}>Membership Card</span>
        </div>

        {/* Body */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 22px", height: 275 }}>
          {/* watermark */}
          <div style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1, opacity: 0.06, pointerEvents: "none" }}>
            <img src={logo} alt="watermark" crossOrigin="anonymous" style={{ width: 300, height: 300, objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", gap: 65 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: 160, height: 185, borderRadius: 5, overflow: "hidden", border: "1px solid black" }}>
                <img src={photo} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="photo" />
              </div>
              <img src={qrcode} alt="QR" crossOrigin="anonymous" style={{ width: 60, height: 60, marginTop: 5 }} />
            </div>

            <div style={{ padding: "10px 12px", borderRadius: 10, width: 320, height: 185, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>Name</span>
                <span>{name}</span>
              </div>

              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>Education</span>
                <span>{education}</span>
              </div>

              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>Phone</span>
                <span>{phone}</span>
              </div>

              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>Address</span>
                <span style={{ maxWidth: 220 }}>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Signature only */}
        <div style={{ position: "absolute", bottom: 10, width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", padding: "0 20px", fontSize: 12, color: "#3a3939ad", fontWeight: 500 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <div style={{ position: "relative", width: 200, height: 150 }}>
              <div style={{ position: "absolute", bottom: -22, right: -110, display: "flex", zIndex: 99, flexDirection: "column", alignItems: "center" }}>
                <img src={signature} alt="signature" style={{ width: 110, objectFit: "contain" }} />
                <div style={{ color: "#0033A0", fontWeight: 600, marginTop: -2 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={downloadPdf} className="px-5 py-2 bg-red-600 text-white rounded-md">Download PDF</button>
        <button onClick={approveAndUpload} disabled={loading} className="px-5 py-2 bg-green-600 text-white rounded-md">{loading ? "Approving..." : "Approve & Upload"}</button>
      </div>
    </div>
  );
}
