import React from "react";
import HeroImage from "../../../assets/PutsfHero.jpg";

const About = () => {
  return (
    <section className="relative w-full bg-white py-20 md:py-32 overflow-hidden">

      {/* 🏁 Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* 🏆 HERO INTRO */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#dc2626] font-bold tracking-widest uppercase text-sm mb-2 block">
              Who We Are
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              புதுச்சேரி யூனியன் பிரதேச <br />
              <span className="text-[#0056b3]">மாணவர்கள் கூட்டமைப்பு</span>
            </h1>

            {/* Quote Box */}
            <div className="bg-slate-50 border-l-4 border-[#0056b3] p-6 mb-8 rounded-r-xl">
              <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic">
                "படிப்பால் அறிவு பெறுவோம்! <br />
                உழைப்பால் உயர்வு பெறுவோம்!! <br />
                <span className="text-[#dc2626]">போராட்டத்தால் உரிமைப் பெறுவோம்!!!"</span>
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-medium text-justify">
              மாணவர்களின் உரிமை, சமூக நீதி, அரசியல் விழிப்புணர்வு
              ஆகியவற்றை மையமாகக் கொண்டு உருவான
              <strong className="text-slate-900"> அரசியல் சார்பற்ற மாணவர் இயக்கமே </strong>
              புதுச்சேரி யூனியன் பிரதேச மாணவர்கள் கூட்டமைப்பு (PUTSF).
            </p>
          </div>

          {/* Image Frame */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute top-4 -right-4 w-full h-full border-2 border-[#dc2626] rounded-2xl hidden md:block"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#0056b3]/10 rounded-2xl hidden md:block"></div>
              <img
                src={HeroImage}
                alt="PUTSF Movement"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>

        {/* 📜 HISTORY TIMELINE SECTION */}
        <div className="relative border-l-4 border-slate-200 ml-4 md:ml-10 space-y-16">

          {/* 1. ORIGIN (2006) */}
          <div className="relative pl-8 md:pl-16">
            {/* Timeline Dot */}
            <div className="absolute -left-[10px] top-0 w-5 h-5 bg-[#0056b3] rounded-full border-4 border-white shadow-md"></div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-[#0056b3] font-bold rounded text-sm">2006</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  அமைப்பின் தோற்றம்
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                கடந்த 2006 ஆம் ஆண்டு, அம்பேத்கர் சட்டக் கல்லூரியில் ஏற்பட்ட பிரச்சினையில் நீதி கோரி,
                <strong className="text-slate-900"> சீ.சு. சுவாமிநாதன் </strong> அவர்கள்
                தனிநபராக முன்னெடுத்த போராட்டத்தின் விளைவாக இது உருவானது.
                அரசியல் சுயலாபங்களுக்காக பலியாகும் மாணவர்களை பாதுகாக்கவும்,
                சரியான அரசியல் புரிதலை வழங்கவும் இந்த அமைப்பு உருவாக்கப்பட்டது.
              </p>
            </div>
          </div>

          {/* 2. IDEOLOGY */}
          <div className="relative pl-8 md:pl-16">
            <div className="absolute -left-[10px] top-0 w-5 h-5 bg-[#dc2626] rounded-full border-4 border-white shadow-md"></div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              {/* Decorative Background Icon */}
              <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10">⚖️</div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white relative z-10">
                சித்தாந்தமும் பயணமும்
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
                கல்வி உரிமை மற்றும் வேலைவாய்ப்பு மட்டுமின்றி, மாணவர்களை ஜனநாயக அரசியலுக்கு வழிநடத்தும் பயணம்.
              </p>

              {/* Value Pills */}
              <div className="flex flex-wrap gap-3 relative z-10">
                {["பகுத்தறிவு", "சுயமரியாதை", "சமத்துவம்", "சகோதரத்துவம்", "சுதந்திரம்"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. STRUGGLES (Eelam & Hunger Strike) */}
          <div className="relative pl-8 md:pl-16">
            <div className="absolute -left-[10px] top-0 w-5 h-5 bg-[#0056b3] rounded-full border-4 border-white shadow-md"></div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                ஈழம் & வரலாற்று போராட்டங்கள்
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="min-w-[4px] h-full bg-[#dc2626] rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">2008: ஆளுநர் மாளிகை முற்றுகை</h3>
                    <p className="text-gray-600 leading-relaxed">
                      பத்தாயிரத்துக்கும் மேற்பட்ட மாணவர்களை திரட்டி, தங்களது ரத்தத்தால் கையொப்பமிட்டு
                      ஈழப்போரை நிறுத்த வலியுறுத்திய போராட்டம்.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="min-w-[4px] h-full bg-[#dc2626] rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">2010: 17 நாட்கள் உண்ணா விரதம்</h3>
                    <p className="text-gray-600 leading-relaxed">
                      ஈழத்திற்காக 17 நாட்கள் தொடர் உண்ணா நிலை போராட்டம்.
                      சிறை, வழக்குகள் என ஒடுக்க முயன்றபோதும், சிறையிலேயே போராடி அரசை அஞ்சி நடுங்கச் செய்தது எமது இயக்கம்.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. SERVICE */}
          <div className="relative pl-8 md:pl-16">
            <div className="absolute -left-[10px] top-0 w-5 h-5 bg-green-600 rounded-full border-4 border-white shadow-md"></div>

            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 flex items-center gap-3">
                <span>🤝</span> சேவை & பேரிடர் கால செயல்பாடுகள்
              </h2>
              <p className="text-lg text-green-900/80 leading-relaxed mb-4">
                தானே புயலின் போது <strong>5 டன் அரிசி</strong> மற்றும் கொரோனா காலத்தில்
                <strong> 3000 குடும்பங்களுக்கு</strong> உணவுப் பொருட்கள் வழங்கி,
                அரசியல் கட்சிகளுக்கே முன்னுதாரணமாகத் திகழ்ந்தது.
              </p>
            </div>
          </div>

        </div>

        {/* 🏁 CONCLUSION */}
        <div className="mt-24 text-center max-w-4xl mx-auto">
          <div className="w-24 h-1 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
            "மாணவர் உரிமை, சமூக நீதி, அடித்தட்டு மக்களின் உரிமை போராட்டங்களில்
            சமரசம் இன்றி உழைத்து வெற்றி கண்ட வரலாறுடன், <br />
            <span className="text-[#0056b3]">புதுச்சேரி யூனியன் பிரதேச மாணவர்கள் கூட்டமைப்பு</span>
            இன்று தலை நிமிர்ந்து நிற்கிறது."
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
