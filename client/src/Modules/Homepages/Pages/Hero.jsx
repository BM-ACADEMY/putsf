// src/Modules/Homepages/Layout/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/PutsfHero.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-32">

      {/* 🎨 Background Decor (Subtle Brand Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* 📝 Left Section: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fadeInUp">

            {/* Tagline Badge */}
            <div className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-[#0056b3] text-sm font-bold tracking-wider uppercase">
                Est. 2006 • Official Student Body
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.15] mb-6">
              மாணவர்களின் உரிமையும் <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056b3] to-[#dc2626]">
                வளர்ச்சியும் எங்கள் நோக்கம்
              </span>
            </h1>


            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              மாணவர்கள் ஒன்றிணைவதே முன்னேற்றத்தின் பாதை.
              <span className="font-semibold text-slate-900"> PUTSF </span> தளம் சமூக மாற்றத்திற்கும் இளைய தலைமுறையின் அரசியல் விழிப்புணர்விற்கும்
              ஒரு சக்திவாய்ந்த குரல் ஆகும்.
            </p>

            {/* Quote */}
            <p className="text-md md:text-lg font-medium text-gray-500 mb-10 italic flex items-center justify-center lg:justify-start gap-2">
              <span className="w-8 h-[2px] bg-[#dc2626]"></span>
              “நம் ஊர் வளர — நம் மாணவர்கள் உயர” 🇮🇳
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              {/* Join Button (Primary Blue) */}
              <Link
                to="/license"
                className="bg-[#0056b3] hover:bg-[#004494] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                TO JOIN PUTSF
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>

              {/* About Button (Outline) */}
              <Link
                to="/about"
                className="bg-white border-2 border-slate-200 hover:border-[#0056b3] text-slate-700 hover:text-[#0056b3] font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
              >
                எங்களை பற்றி
              </Link>
            </div>
          </div>

          {/* 🖼️ Right Section: Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">

            {/* Decorative blob behind image */}
            <div className="absolute top-10 right-10 w-full h-full bg-gradient-to-tr from-[#0056b3]/10 to-[#dc2626]/10 rounded-[3rem] transform rotate-6 scale-95 pointer-events-none"></div>

            {/* The Image Card */}
            <div className="relative w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border-4 border-white animate-fadeInUp delay-200 group">
              <img
                src={HeroImage}
                alt="PUTSF Movement"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

          </div>

        </div>
      </div>

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
        `}
      </style>
    </section>
  );
};

export default Hero;
