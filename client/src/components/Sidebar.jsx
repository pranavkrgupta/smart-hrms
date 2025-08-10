import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ links, title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or any auth data from localStorage or context
    localStorage.removeItem("token");
    // Redirect to login page or home
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen sticky top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-yellow-300"
                  : "block hover:text-yellow-200"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button at the bottom */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
