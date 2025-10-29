import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/PutsfHero.jpg"; // ✅ Local image import

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 py-20 md:py-28 border-t-8 border-[#D62828]">
      {/* 🔥 Subtle Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0]/10 via-[#D62828]/10 to-black/10 mix-blend-multiply"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* 🩸 Left Section - Text */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent drop-shadow-md mb-4 leading-tight">
            மக்கள் முன்னேற்றப் பாசறை
          </h1>

          <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
            மக்கள் ஒன்றிணைவதே முன்னேற்றத்தின் பாதை.  
            PUTSF தளம் சமூக மாற்றத்திற்கும் இளைய தலைமுறையின் அரசியல் விழிப்புணர்விற்கும்  
            ஒரு சக்திவாய்ந்த குரல் ஆகும்.
          </p>

          <p className="text-md md:text-lg font-semibold text-gray-700 mb-8 italic">
            “நம் ஊர் வளர — நம் மக்கள் உயர” 🇮🇳
          </p>

          {/* ⚡ CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/join"
              className="bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] text-white font-bold px-10 py-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:opacity-90 hover:scale-105 transition-transform"
            >
              இயக்கத்தில் சேரவும்
            </Link>

            <Link
              to="/about"
              className="border-2 border-[#0033A0] text-[#0033A0] font-semibold px-10 py-3 rounded-full hover:bg-blue-50 hover:scale-105 transition-transform"
            >
              மேலும் அறிய
            </Link>
          </div>
        </div>

        {/* 🇮🇳 Right Section - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md md:max-w-lg overflow-hidden rounded-3xl shadow-2xl border-[6px] border-[#D62828]">
            <img
              src={HeroImage}
              alt="PUTSF Movement"
              className="w-full h-auto object-cover transform hover:scale-105 transition duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
