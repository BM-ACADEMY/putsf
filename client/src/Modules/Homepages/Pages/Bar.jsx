import React, { useState } from "react";

const Bar = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "எங்களை பற்றி" },
    { id: "vision", label: "நோக்கம்" },
    { id: "mission", label: "பணிக்குறிப்பு" },
    { id: "slogan", label: "சொற்றொடர்" },
  ];

  return (
    <div className="w-full font-sans text-gray-900 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 px-4 md:px-12 py-8">

      {/* 🌈 Top Banner */}
      <div className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black text-white text-center py-4 rounded-xl shadow-lg">
        <p className="text-lg md:text-xl font-semibold tracking-wide">
          🇮🇳 மாணவர்கள் முன்னேற்றம் எங்கள் நோக்கம் —{" "}
          <span className="text-yellow-400 font-extrabold drop-shadow-md">
            PUTSF.COM
          </span>{" "}
          🇮🇳
        </p>
      </div>

      {/* 🟦 Tabs Section */}
      <div className="flex justify-start md:justify-center gap-4 overflow-x-auto whitespace-nowrap bg-white border-b border-gray-200 py-3 mt-6 rounded-lg shadow-sm px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm md:text-base font-medium cursor-pointer transition-all duration-300 flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black text-white shadow-md scale-105"
                : "text-gray-700 hover:text-[#D62828]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📜 Tab Content */}
      <div className="text-center py-10 px-5 md:px-16 relative bg-white rounded-2xl shadow-lg mt-6">

        {activeTab === "about" && (
          <>
            <h2 className="text-3xl p-2 md:text-4xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent mb-3 drop-shadow-md">
              மாணவர்கள் முன்னேற்றப் கூட்டமைப்பு
            </h2>
            <div className="mx-auto w-28 h-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black rounded-full mb-6 shadow-lg"></div>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              PUTSF தளம் சமூக மாற்றத்திற்கும் இளம் தலைமுறையின் அரசியல்
              விழிப்புணர்விற்கும் ஒரு சக்திவாய்ந்த குரல்.
            </p>
          </>
        )}

        {activeTab === "vision" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent mb-3 drop-shadow-md">
              எங்கள் நோக்கம்
            </h2>
            <div className="mx-auto w-28 h-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black rounded-full mb-6 shadow-lg"></div>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              நம் நாட்டின் வளர்ச்சிக்கான பாதை மாணவர்களின் ஒற்றுமையில் இருக்கிறது.
              PUTSF மாணவர்கள் முன்னேற்றத்தை நோக்கி வழிகாட்டுகிறது.
            </p>
            <p className="mt-4 font-semibold text-[#D62828] italic">
              “நம் ஊர் வளர — நம் மாணவர்கள் உயர” 🇮🇳
            </p>
          </>
        )}

        {activeTab === "mission" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent mb-3 drop-shadow-md">
              எங்கள் பணிக்குறிப்பு
            </h2>
            <div className="mx-auto w-28 h-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black rounded-full mb-6 shadow-lg"></div>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              கல்வி, வேலைவாய்ப்பு மற்றும் சமூக நீதி வழியாக ஒவ்வொரு மாணவரின்
              முன்னேற்றத்தை உறுதி செய்வதே எங்கள் பணி.
            </p>
          </>
        )}

        {activeTab === "slogan" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent mb-3 drop-shadow-md">
              சொற்றொடர்
            </h2>
            <div className="mx-auto w-28 h-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black rounded-full mb-6 shadow-lg"></div>
            <div className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed space-y-3">
              <p>📘 படிப்பால் அறிவு பெறுவோம்</p>
              <p>💪 உடற்பயிற்சியால் உடல் பெறுவோம்</p>
              <p>💰 பொருளாதாரத்தால் உயிரை பெறுவோம்</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Bar;
