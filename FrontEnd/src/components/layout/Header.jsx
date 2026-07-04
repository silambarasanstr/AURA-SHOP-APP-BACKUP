import { memo, useState, useEffect, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, ChevronDown, Heart, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../../services/authService";
import { useCart } from "../../context/CartContext";
import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import useDropdown from "../../hooks/useDropdown";
const Header = memo(() => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isOpen: showMenu, dropdownRef: menuRef, toggleDropdown } = useDropdown();
  const cartCount = cartItems?.items?.length || 0;
  // ✅ Specific selector — count மட்டும், array இல்லை
  const itemCount = useSelector((state) => state.wishlist?.length || 0);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);
  // ✅ useCallback — every render-ல் recreate ஆகாது
  const handleLogout = useCallback(() => {
    logoutUser();
    toast.success("Logged Out Successfully");
    navigate("/login");
  }, [navigate]);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-5 mx-auto max-w-7xl">
        <NavLink to="/" className="text-2xl font-bold tracking-widest text-gray-900 uppercase">
          AU<span className="text-amber-500">R</span>A
        </NavLink>
        <NavBar />
        <div className="flex items-center gap-1">
          <Link
            to="/wishlist"
            className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <Heart size={20} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center text-[10px] font-bold text-white bg-amber-500 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center text-[10px] font-bold text-white bg-amber-500 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="w-px h-5 mx-2 bg-gray-200" />
          <div className="relative" ref={menuRef}>
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 transition-all border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300"
                >
                  <User size={16} />
                  <span>{user.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`}
                  />
                </button>
                {showMenu && <UserMenu handleLogout={handleLogout} />}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 transition-all border border-gray-200 rounded-lg hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
