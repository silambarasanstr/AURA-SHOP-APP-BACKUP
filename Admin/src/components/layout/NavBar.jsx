import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "text-gray-500 hover:text-black";

  return (
    <div className="bg-white shadow ">
      <div className="container mx-auto p-5 ">
        
        <nav className="space-x-6  ">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
