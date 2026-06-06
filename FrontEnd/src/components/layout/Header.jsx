import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useCart } from "../../context/CartContext";
import UserMenu from "./UserMenu";
import useDropdown from "../../hooks/useDropdown";
import { User, ChevronDown, Heart, ShoppingCart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isOpen: showMenu, dropdownRef: menuRef, toggleDropdown } = useDropdown();
  
  const cartCount = cartItems?.items?.length || 0;
  const wishlistItems = useSelector((state) => state.wishlist || []);
  const itemCount = wishlistItems.length;
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

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
            <ShoppingCart size={24} /> Cart
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
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"
                >
                  <User size={20} />
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>

                {showMenu && <UserMenu handleLogout={handleLogout} />}
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
