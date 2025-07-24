import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ links, title }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen sticky top-0">
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
  );
}

export default Sidebar;
