import React, { useState } from "react";

const Bar = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "எங்களை பற்றி" },
    { id: "vision", label: "நோக்கம்" },
    { id: "mission", label: "பணிக்குறிப்பு" },
  ];

  return (
    <div className="w-full font-sans text-gray-900">
      {/* 🇮🇳 Top Political Header */}
      <div className="bg-gradient-to-r from-[#164A9E] via-white to-[#D72B2B] py-5 shadow-xl text-center border-b-4 border-[#D72B2B]">
        <p className="text-xl md:text-2xl font-extrabold tracking-wide text-black">
          🇮🇳 மக்கள் முன்னேற்றம் எங்கள் நோக்கம் —{" "}
          <span className="text-[#D72B2B] font-extrabold">PUTSF.COM</span> 🇮🇳
        </p>
      </div>

      {/* 🧭 Tab Navigation */}
      <div className="relative bg-[#0F0F0F] flex justify-center flex-wrap gap-4 py-5 shadow-inner border-t-4 border-[#164A9E]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ${
              activeTab === tab.id
                ? "text-white bg-gradient-to-r from-[#164A9E] to-[#D72B2B] shadow-lg scale-105"
                : "text-white/80 hover:text-white hover:scale-105 border border-white/10 backdrop-blur-sm"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[3px] w-3/4 bg-gradient-to-r from-[#164A9E] to-[#D72B2B] rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* 📜 Tab Content */}
      <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-[#F1F1F1] py-16 px-6 md:px-20 overflow-hidden">
        {/* 🌈 Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#164A9E] to-[#D72B2B] shadow-md"></div>

        {/* ✨ Background Glow */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gradient-to-tr from-[#164A9E]/20 to-[#D72B2B]/20 blur-3xl rounded-full"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-bl from-[#D72B2B]/15 to-[#164A9E]/15 blur-3xl rounded-full"></div>

        {/* ⚙️ Content */}
        <div className="relative z-10 text-center animate-fadeIn">
          {activeTab === "about" && (
            <>
              <h2 className="text-4xl font-extrabold text-[#164A9E] mb-4 drop-shadow-sm">
                மக்கள் முன்னேற்றப் பாசறை
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-800 max-w-3xl mx-auto">
                PUTSF தளம் சமூக மாற்றத்திற்கும் இளம் தலைமுறையின் அரசியல்
                விழிப்புணர்விற்கும் ஒரு சக்திவாய்ந்த குரல்.
              </p>
            </>
          )}

          {activeTab === "vision" && (
            <>
              <h2 className="text-4xl font-extrabold text-[#164A9E] mb-4 drop-shadow-sm">
                எங்கள் நோக்கம்
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-800 max-w-3xl mx-auto">
                நம் நாட்டின் வளர்ச்சிக்கான பாதை மக்களின் ஒற்றுமையில் இருக்கிறது.
                PUTSF மக்கள் முன்னேற்றத்தை நோக்கி வழிகாட்டுகிறது.
              </p>
              <p className="mt-6 font-semibold text-[#D72B2B] text-xl italic">
                “நம் ஊர் வளர — நம் மக்கள் உயர” 🇮🇳
              </p>
            </>
          )}

          {activeTab === "mission" && (
            <>
              <h2 className="text-4xl font-extrabold text-[#164A9E] mb-4 drop-shadow-sm">
                எங்கள் பணிக்குறிப்பு
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-800 max-w-3xl mx-auto">
                கல்வி, வேலைவாய்ப்பு மற்றும் சமூக நீதி வழியாக ஒவ்வொருவரின்
                முன்னேற்றத்தை உறுதி செய்வதே எங்கள் பணி.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Bar;
