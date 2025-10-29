// src/Modules/Homepages/Layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/putsf-logo.jpg";

const Footer = () => {
  const menuItems = ["Home", "Gallery", "Blog", "Contact"];

  return (
    <footer className="px-6 border-t border-gray-200 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-gray-700 bg-gray-20 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
        {/* Logo + Description */}
        <div className="flex flex-col gap-3">
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
          <p className="text-gray-600 text-sm md:text-base">
            The Puducherry Union Territory Student's Federation (PUTSF) is an independent student organization focused on advocating for student rights and needs within the Union Territory.
          </p>
        </div>

        {/* Empty Middle Column */}
        <div></div>

        {/* Footer Navigation Links */}
        <div className="flex flex-col text-sm space-y-2.5">
          <h2 className="font-semibold mb-5 text-indigo-600">Quick Links</h2>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center border-t mt-6 border-gray-200 text-gray-500">
        Copyright {new Date().getFullYear()} © <br />
        <a
          href="https://bmtechx.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600"
        >
          bmtechx.in
        </a>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
