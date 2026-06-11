import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { toast } from "react-hot-toast";
import { Search, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold"
      : "text-gray-500 hover:text-black transition";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        {/* Logo */}
        <h2 className="text-2xl font-semibold tracking-tight">
          Product Management<span className="text-blue-600"> Dashboard</span>
        </h2>

        {/* Search */}
        <div className="items-center hidden w-64 px-3 py-2 bg-gray-100 rounded-lg md:flex">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 text-sm bg-transparent outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={menuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
                >
                  <User size={20} />
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>

                {showMenu && (
                  <div className="absolute right-0 z-50 mt-3 bg-white border shadow-xl w-72 rounded-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <span className="text-gray-600">Hello,</span>

                      <Link
                        to="/profile"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        My Profile
                      </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-3 px-4 py-3 text-left text-red-500 hover:bg-gray-100"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
              >
                <User size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
