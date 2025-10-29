import React, { useEffect } from "react";

const SocialMediaLinks = () => {
  useEffect(() => {
    const fbScript = document.createElement("script");
    fbScript.src = "https://www.embedista.com/j/fbwidget.js";
    fbScript.async = true;
    document.body.appendChild(fbScript);

    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    const ytScript = document.createElement("script");
    ytScript.src = "https://www.embedista.com/j/ytchannel.js";
    ytScript.async = true;
    document.body.appendChild(ytScript);

    return () => {
      document.body.removeChild(fbScript);
      document.body.removeChild(twitterScript);
      document.body.removeChild(ytScript);
    };
  }, []);

  // 🎨 Brand color map
  const brandColors = {
    facebook: { bg: "bg-blue-100", text: "text-blue-700", hover: "hover:bg-blue-600", glow: "hover:shadow-blue-400/50" },
    instagram: { bg: "bg-pink-100", text: "text-pink-700", hover: "hover:bg-pink-600", glow: "hover:shadow-pink-400/50" },
    twitter: { bg: "bg-sky-100", text: "text-sky-700", hover: "hover:bg-sky-600", glow: "hover:shadow-sky-400/50" },
    youtube: { bg: "bg-red-100", text: "text-red-700", hover: "hover:bg-red-600", glow: "hover:shadow-red-400/50" },
  };

  // 🧩 Reusable social button
  const SocialButton = ({ href, platform, children }) => {
    const c = brandColors[platform];
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${c.bg} ${c.text} ${c.hover} ${c.glow} inline-flex items-center justify-center px-6 py-2 mt-4 rounded-full font-semibold transition-all duration-300 shadow-sm hover:text-white hover:shadow-md`}
      >
        {children}
      </a>
    );
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-12">
        {/* ===== Header ===== */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Follow Us on Social Media
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Stay connected with us across all our social platforms.
          </p>
        </div>

        {/* ===== Facebook Section ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mb-10">
            Facebook Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
            {/* Page 1 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Facebook Page 1
              </h3>
              <iframe
                title="Facebook Page 1"
                frameBorder="0"
                width="340"
                height="300"
                src="https://www.facebook.com/v9.0/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fswaminathan1105&tabs=timeline&width=340&height=300"
                className="rounded-lg shadow-md"
                allow="encrypted-media"
              ></iframe>
              <SocialButton
                href="https://www.facebook.com/swaminathan1105"
                platform="facebook"
              >
                Visit Facebook
              </SocialButton>
            </div>

            {/* Page 2 */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Facebook Page 2
              </h3>
              <iframe
                title="Facebook Page 2"
                frameBorder="0"
                width="340"
                height="300"
                src="https://www.facebook.com/v9.0/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsaminathan.yvone&tabs=timeline&width=340&height=300"
                className="rounded-lg shadow-md"
                allow="encrypted-media"
              ></iframe>
              <SocialButton
                href="https://www.facebook.com/saminathan.yvone"
                platform="facebook"
              >
                Visit Facebook
              </SocialButton>
            </div>
          </div>
        </div>

        {/* ===== Instagram + Twitter ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-10">
            Instagram & Twitter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
            {/* Instagram */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-pink-600 mb-4">
                Instagram Profile
              </h3>
              <iframe
                title="Instagram Profile"
                src="https://www.instagram.com/c.s.swamynathan/embed"
                width="340"
                height="400"
                className="rounded-lg shadow-md border border-gray-200"
                allowTransparency="true"
              ></iframe>
              <SocialButton
                href="https://www.instagram.com/c.s.swamynathan/?utm_source=qr"
                platform="instagram"
              >
                Visit Instagram
              </SocialButton>
            </div>

            {/* Twitter */}
            <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-sky-500 mb-4">
                Twitter (X) Profile
              </h3>
              <iframe
                title="Twitter Feed"
                src="https://twitframe.com/show?url=https://twitter.com/c_pondy"
                width="340"
                height="400"
                className="rounded-lg shadow-md border border-gray-200"
              ></iframe>
              <SocialButton href="https://twitter.com/c_pondy" platform="twitter">
                Visit Twitter
              </SocialButton>
            </div>
          </div>
        </div>

        {/* ===== YouTube ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-red-600 text-center mb-10">
            YouTube Channel
          </h2>
          <div className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Swaminathan YouTube Channel
            </h3>
            <iframe
              frameBorder="0"
              src="https://www.youtube.com/subscribe_embed?usegapi=1&channel=https://youtube.com/@swaminathan506"
              className="mb-6 rounded-md"
              width="300"
              height="80"
              title="YouTube Subscribe Button"
            ></iframe>
            <SocialButton
              href="https://youtube.com/@swaminathan506?si=ytinXCskHEJnPz6n"
              platform="youtube"
            >
              Visit YouTube
            </SocialButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
