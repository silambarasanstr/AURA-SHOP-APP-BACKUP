import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useCart } from "../../context/CartContext";
import { useState, useRef, useEffect } from "react";

import { User, ChevronDown, Package, Heart, LogOut, ShoppingCart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { cartItems } = useCart();
  const cartCount = cartItems?.items?.length || 0;
  const wishlistItems = useSelector((state) => state.wishlist || []);
  const itemCount = wishlistItems.length;
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          AURA <span className="text-blue-600">Shop</span>
        </NavLink>

        {/* Navigation */}
        <NavBar />

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart size={24} />  Cart
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-5 px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
          >
            <Heart size={24} />

            {itemCount > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-5 px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

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

                      <Link to="/profile" className="font-semibold text-blue-600 hover:underline">
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

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <Package size={18} />
                        <span>Orders</span>
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <Heart size={18} />
                        <span>Wishlist</span>
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
