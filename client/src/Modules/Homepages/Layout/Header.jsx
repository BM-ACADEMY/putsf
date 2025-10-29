import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/putsf-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuItems = ["Home", "Gallery", "Blog", "Contact"];

  return (
    <nav className="sticky top-0 z-50 h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D]">
      
      {/* Logo + Text */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={Logo}
          alt="PUTSF Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
        <span className="text-indigo-600 font-bold text-sm md:text-lg lg:text-xl">
          Puducherry Union Territory Student's Federation
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 font-medium">
        {menuItems.map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="px-3 py-1 rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white"
          >
            {item}
          </Link>
        ))}

        {/* Join Us Button */}
        <button
          onClick={() => navigate("/license")}
          className="ml-4 bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
        >
          Join Us
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path d="M 3 7 H 27 M 3 15 H 27 M 3 23 H 27" stroke="#000" strokeWidth="2" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 shadow-md md:hidden">
          <ul className="flex flex-col space-y-4 text-base font-medium">
            {menuItems.map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center"
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Join Us Button (Mobile) */}
            <li className="text-center mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/license");
                }}
                className="bg-green-600 text-white w-full py-2 rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
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
