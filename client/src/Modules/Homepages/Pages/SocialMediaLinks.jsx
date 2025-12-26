import React from "react";

const SocialMediaLinks = () => {

  // Reusable Social Card Component to keep code clean
  const SocialCard = ({ title, icon, color, children, buttonLink, buttonText, buttonColor }) => (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 ${color} hover:-translate-y-2 transition-transform duration-300`}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>

        {/* Embed Container */}
        <div className="flex justify-center mb-6 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
           {children}
        </div>

        {/* Button */}
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg ${buttonColor}`}
        >
          {buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-28 overflow-hidden">

      {/* 🏁 Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* 📝 Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#0056b3] font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
             Stay Connected
           </p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Follow Us on <span className="text-[#0056b3]">Social Media</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0056b3] to-[#dc2626] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Be part of the movement. Join our digital community across all platforms.
            <span className="block mt-2 font-bold text-slate-900">
              “Voice of the Students” 🇮🇳
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* 📘 FACEBOOK SECTION */}
          <SocialCard
            title="Official Page"
            icon="📘"
            color="border-[#1877F2]"
            buttonLink="https://www.facebook.com/swaminathan1105"
            buttonText="Follow on Facebook"
            buttonColor="bg-[#1877F2]"
          >
            <iframe
              title="Facebook Page 1"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fswaminathan1105&tabs=timeline&width=340&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="350"
              className="border-none overflow-hidden"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </SocialCard>

          <SocialCard
            title="Personal Profile"
            icon="👤"
            color="border-[#1877F2]"
            buttonLink="https://www.facebook.com/saminathan.yvone"
            buttonText="Add Friend"
            buttonColor="bg-[#1877F2]"
          >
             <iframe
              title="Facebook Page 2"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsaminathan.yvone&tabs=timeline&width=340&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="350"
              className="border-none overflow-hidden"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </SocialCard>

          {/* 📸 INSTAGRAM SECTION */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#E1306C] max-w-3xl mx-auto hover:-translate-y-2 transition-transform duration-300">
              <div className="p-8 text-center">
                 <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="text-3xl">📸</span>
                    <h3 className="text-2xl font-bold text-slate-800">Instagram Highlights</h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <iframe
                        title="Instagram Profile"
                        src="https://www.instagram.com/c.s.swamynathan/embed"
                        width="320"
                        height="400"
                        className="rounded-lg border-none overflow-hidden"
                        allowTransparency="true"
                      ></iframe>
                    </div>

                    <div className="flex flex-col items-center max-w-xs">
                      <p className="text-gray-600 mb-6 italic">
                        "Catch the latest updates, event photos, and behind-the-scenes moments."
                      </p>
                      <a
                        href="https://www.instagram.com/c.s.swamynathan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                      >
                        Follow on Instagram
                      </a>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* 🎥 YOUTUBE */}
          <SocialCard
            title="YouTube Channel"
            icon="▶️"
            color="border-[#FF0000]"
            buttonLink="https://www.youtube.com/@swaminathan506"
            buttonText="Subscribe Now"
            buttonColor="bg-[#FF0000]"
          >
             <div className="w-[340px] h-[200px] bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <span className="text-sm font-semibold">Watch Our Videos</span>
             </div>
          </SocialCard>

          {/* 🕊 TWITTER (X) */}
          <SocialCard
            title="X (Twitter)"
            icon="✖️"
            color="border-slate-900"
            buttonLink="https://x.com/c_pondy?t=kaIyholWlGDvDTB5xGFqQ&s=09"
            buttonText="Follow on X"
            buttonColor="bg-slate-900"
          >
             <div className="w-[340px] h-[200px] bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <span className="text-sm font-semibold">Latest Updates</span>
             </div>
          </SocialCard>

        </div>

      </div>
    </section>
  );
};

export default SocialMediaLinks;
