import { NavLink } from "react-router-dom";

import { memo } from "react";

// ✅ Component outside — never recreates
const linkClass = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
    isActive ? "text-blue-600" : "text-gray-600 hover:text-black"
  }`;

const NavBar = memo(() => {
  return (
    <nav className="flex items-center gap-6">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/products" className={linkClass}>
        Products
      </NavLink>
      <NavLink to="/categories" className={linkClass}>
        Categories
      </NavLink>
      <NavLink to="/orders" className={linkClass}>
        Orders
      </NavLink>
    </nav>
  );
});

NavBar.displayName = "NavBar";
export default NavBar;
