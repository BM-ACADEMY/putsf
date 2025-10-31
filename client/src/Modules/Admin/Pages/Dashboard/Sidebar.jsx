import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
  HiLogout,
  HiOutlineExclamationCircle, // ✅ New icon for Complaints
} from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList /> },
    { to: "/admin/complaints", label: "Complaints", icon: <HiOutlineExclamationCircle /> }, // ✅ Added Complaints
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <>
      {/* 📱 Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* 🧭 Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white flex flex-col justify-between
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 text-center">
          <h1 className="text-xl font-bold tracking-wide text-white">
            PUTSF Admin
          </h1>
          <p className="text-xs text-gray-400 mt-1">Management Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🔻 Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <HiLogout className="text-lg" />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-800 bg-gray-900">
          © {new Date().getFullYear()} PUTSF
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
