import React, { useState } from "react";

const Bar = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    {
      id: "about",
      label: "எங்களை பற்றி",
      sub: "About Us",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      )
    },
    {
      id: "vision",
      label: "நோக்கம்",
      sub: "Our Vision",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      id: "mission",
      label: "சித்தாந்தம்",
      sub: "Ideology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      id: "slogan",
      label: "சாதனைகள்",
      sub: "Achievements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.25 2.25 0 11-4.5 0v3.375m7.5 0v2.25m-10.5 0v2.25" />
        </svg>
      )
    },
  ];

  return (
    <section className="w-full bg-slate-50 relative pb-20">

      {/* ⬛ DARK NAVIGATION BAR */}
      <div className="w-full bg-[#0f172a] shadow-2xl relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4">

            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative h-[160px] md:h-[200px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${/* Vertical Divider Lines */
                      !isActive && index !== tabs.length - 1 ? "border-r border-white/10" : ""}
                    ${/* ✅ Active: BLUE | Inactive: Dark | Hover: Darker Blue */
                      isActive
                        ? "bg-[#0056b3] shadow-[0_10px_40px_-10px_rgba(0,86,179,0.5)] scale-[1.05] z-10 rounded-b-lg"
                        : "bg-[#0f172a] hover:bg-[#004494]"
                    }
                  `}
                >
                  {/* Icon */}
                  <div className={`mb-4 transition-transform duration-300 ${isActive ? "scale-110 text-white" : "text-white/70 group-hover:text-white group-hover:-translate-y-1"}`}>
                    {tab.icon}
                  </div>

                  {/* Label */}
                  <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider text-center px-2 transition-colors ${isActive ? "text-white" : "text-white/90 group-hover:text-white"}`}>
                    {tab.label}
                  </h3>

                  {/* Sub-Label */}
                  <p className={`text-xs uppercase tracking-[0.2em] font-medium mt-2 transition-all duration-300
                    ${isActive
                        ? "text-white/80 opacity-100"
                        : "text-white/60 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}>
                    {tab.sub}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* 📜 CONTENT AREA */}
      <div className="container mx-auto px-4 md:px-12 mt-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-14 min-h-[400px] flex items-center justify-center text-center animate-fadeIn relative overflow-hidden">

          {/* Subtle Background Watermark */}
          <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none transform rotate-12">
             {tabs.find(t => t.id === activeTab)?.icon && React.cloneElement(tabs.find(t => t.id === activeTab).icon, { className: "w-80 h-80" })}
          </div>

          <div className="max-w-4xl relative z-10">

            {/* ABOUT CONTENT */}
            {activeTab === "about" && (
              <div className="animate-slideUp">
                {/* Changed Orange Text to Blue */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-6">
                  புதுச்சேரி யூனியன் பிரதேச <span className="text-[#0056b3]">மாணவர்கள் கூட்டமைப்பு</span>
                </h2>
                {/* Changed Orange Divider to Blue */}
                <div className="w-24 h-1.5 bg-[#0056b3] mx-auto mb-8 rounded-full"></div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                  <span className="text-[#0f172a] font-bold">ஏப்ரல் 14, 2006</span> ஆம் ஆண்டு புதுச்சேரி யூனியன் பிரதேச
                  மாணவர்களின் உரிமை, கல்வி மற்றும் சமூக நீதி நோக்கமாக கொண்டு
                  <br className="hidden md:block"/>
                  தொடங்கப்பட்ட மாபெரும் மாணவர் இயக்கம் இது.
                </p>
              </div>
            )}

            {/* VISION CONTENT */}
            {activeTab === "vision" && (
              <div className="animate-slideUp">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-8">
                  எங்கள் <span className="text-[#0056b3]">நோக்கம்</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {[
                    "அனைவர்க்கும் சம கல்வி உரிமை",
                    "அனைவர்க்கும் வேலைவாய்ப்பு",
                    "சமூக நீதி மற்றும் சுயமரியாதை",
                    "ஜனநாயக மாண்புகளை பாதுகாத்தல்"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-slate-50 border-l-4 border-[#0056b3] hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0056b3] font-bold text-xl">
                        {i + 1}
                      </div>
                      <span className="text-lg text-gray-800 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MISSION CONTENT */}
            {activeTab === "mission" && (
              <div className="animate-slideUp">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-10">
                  எங்கள் <span className="text-[#0056b3]">சித்தாந்தம்</span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                  {[
                    // Changed Red colors to Blue/Neutral to match request
                    { emoji: "✊", title: "சமத்துவம்", color: "text-[#0056b3]", border: "border-blue-100" },
                    { emoji: "🤝", title: "சகோதரத்துவம்", color: "text-[#0056b3]", border: "border-blue-100" },
                    { emoji: "🕊️", title: "சுதந்திரம்", color: "text-[#0056b3]", border: "border-blue-100" }
                  ].map((item) => (
                    <div key={item.title} className={`flex flex-col items-center gap-4 p-8 bg-white border-2 ${item.border} shadow-lg rounded-2xl hover:-translate-y-2 transition-transform duration-300 w-full md:w-1/3`}>
                      <span className="text-5xl md:text-7xl">{item.emoji}</span>
                      <span className={`text-xl md:text-2xl font-black ${item.color} uppercase tracking-wider`}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS CONTENT */}
            {activeTab === "slogan" && (
              <div className="animate-slideUp">
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-8">
                  அமைப்பு <span className="text-[#0056b3]">சாதனை</span>
                </h2>
                {/* Changed Red BG/Border to Blue */}
                <div className="bg-blue-50 p-10 rounded-2xl border border-blue-100 shadow-sm relative">
                  <span className="absolute top-4 left-4 text-6xl text-blue-200 font-serif leading-none">“</span>
                  <p className="text-xl text-gray-800 leading-relaxed font-medium italic relative z-10">
                    கல்வி, வேலைவாய்ப்பு, சம வேலை, சம ஊதியம், மதச்சார்பற்ற கல்வி,
                    சாதி வெறுப்புக்கு எதிரான போராட்டங்கள் மூலம்
                    மாணவர்களின் உரிமைகளுக்காக தொடர்ந்து களமாடும் முதன்மை இயக்கம்.
                  </p>
                  <span className="absolute bottom-[-20px] right-4 text-6xl text-blue-200 font-serif leading-none">”</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}
      </style>
    </section>
  );
};

export default Bar;
