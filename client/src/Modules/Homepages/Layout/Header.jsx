import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../assets/putsf-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuItems = ["Home", "About", "Gallery", "Blog", "Contact"];

  // ✅ Scroll-to-top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Logo click → navigate if needed, then scroll
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      setTimeout(scrollToTop, 300);
    }
  };

  // ✅ Home button click → same behavior
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      setTimeout(scrollToTop, 300);
    }
  };

  return (
    // <nav> switched to Dark Theme (Slate-900)
    <nav className="sticky top-0 z-50 h-[80px] w-full px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between bg-slate-900 text-white shadow-lg border-b border-white/10">

      {/* ✅ Logo + Text */}
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-3 focus:outline-none cursor-pointer group"
      >
        <img
          src={Logo}
          alt="PUTSF Logo"
          className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full border-2 border-white/20 group-hover:border-[#dc2626] transition-all"
        />
        {/* Text */}
        <span className="font-bold text-sm md:text-lg lg:text-xl text-left leading-tight text-white group-hover:text-[#3b82f6] transition-colors">
          Puducherry Union Territory <br className="hidden md:block lg:hidden" />
          Student's Federation
        </span>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {menuItems.map((item) => {
          const isHome = item === "Home";
          // Check if this path is currently active (simple check)
          const isActive = isHome
            ? location.pathname === "/"
            : location.pathname.startsWith(`/${item.toLowerCase()}`);

          return (
            <Link
              key={item}
              to={isHome ? "/" : `/${item.toLowerCase()}`}
              onClick={(e) => {
                if (isHome) handleHomeClick(e);
              }}
              // ✅ UPDATED HOVER COLOR HERE: hover:text-[#dc2626]
              className={`text-[15px] transition-colors duration-300 ${
                isActive ? "text-[#dc2626] font-bold" : "text-gray-300 hover:text-[#dc2626]"
              }`}
            >
              {item}
            </Link>
          );
        })}

        {/* Divider */}
        <span className="h-6 w-px bg-white/20 mx-2"></span>

        {/* Download ID – secondary */}
        <button
          onClick={() => navigate("/license/download")}
          className="text-sm px-4 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
        >
          Download ID
        </button>

        {/* Join Us – primary */}
        <button
          onClick={() => navigate("/license")}
          className="bg-[#dc2626] hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all hover:-translate-y-1"
        >
          Join Us
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={toggleMobileMenu}
        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path d="M 3 7 H 27 M 3 15 H 27 M 3 23 H 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-slate-800 border-t border-white/10 p-6 shadow-2xl md:hidden flex flex-col items-center animate-in slide-in-from-top-2">
          <ul className="flex flex-col space-y-4 text-lg font-medium w-full max-w-sm">
            {menuItems.map((item) => {
              const isHome = item === "Home";
              return (
                <li key={item} className="w-full">
                  <Link
                    to={isHome ? "/" : `/${item.toLowerCase()}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (isHome) handleHomeClick(e);
                    }}
                    className="block w-full text-center px-4 py-3 rounded-lg text-gray-200 hover:bg-[#dc2626] hover:text-white transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}

            {/* Download ID (Mobile) */}
            <li className="w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/license/download");
                }}
                className="w-full py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
              >
                Download ID
              </button>
            </li>

            {/* Join Us (Mobile – highlight) */}
            <li className="w-full pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/license");
                }}
                className="w-full py-3 rounded-full font-bold text-white bg-[#dc2626] shadow-lg hover:bg-red-700 transition"
              >
                Join Us
              </button>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
