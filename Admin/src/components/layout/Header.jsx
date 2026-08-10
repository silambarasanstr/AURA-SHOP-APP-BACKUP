import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { toast } from "react-hot-toast";
import {
  User,
  ChevronDown,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    logoutUser();
    setShowMenu(false);

    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 shadow-sm rounded-xl">
            <ShoppingCart size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Product Management
            </h1>

            <p className="text-xs text-gray-500">
              Dashboard
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 transition rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full">
                    <User size={18} />
                  </div>

                  <span className="hidden font-medium sm:block">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      showMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 overflow-hidden bg-white border border-gray-200 shadow-xl w-72 rounded-xl">
                    {/* User Info */}
                    <div className="px-4 py-4 border-b bg-gray-50">
                      <p className="text-sm text-gray-500">
                        Hello,
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {user.name}
                      </p>

                      {user.email && (
                        <p className="mt-1 text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 transition rounded-lg hover:bg-gray-100"
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center w-full gap-3 px-3 py-3 text-sm text-left text-red-500 transition rounded-lg hover:bg-red-50"
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
                className="flex items-center gap-2 px-3 py-2 font-medium text-gray-700 transition rounded-lg hover:bg-gray-100 hover:text-blue-600"
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