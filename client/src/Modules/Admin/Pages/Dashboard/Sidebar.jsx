import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiHome,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
} from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <HiHome /> },
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-100 text-gray-800 p-2 rounded shadow focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-xl
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:fixed z-40`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-800 to-black p-4 text-center border-b border-gray-700">
          <h1 className="text-2xl font-extrabold tracking-wide uppercase">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-300">PUTSF Management</p>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col justify-between h-[calc(100%-5rem)]">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md mx-2 transition-colors duration-200
                     ${
                       isActive
                         ? "bg-red-700 text-white"
                         : "text-gray-300 hover:bg-gray-800 hover:text-white"
                     }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="text-sm text-gray-400 text-center p-4 border-t border-gray-700">
            © {new Date().getFullYear()} <br />
            <span className="text-red-500 font-semibold">PUTSF</span> Admin
            <br />
            All Rights Reserved.
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
