import { Link } from "react-router-dom";
import { User, Package, Heart, LogOut, ShoppingCart } from "lucide-react";

const menuItems = [
  {
    label: "My Profile",
    icon: User,
    path: "/profile",
  },
  {
    label: "Orders",
    icon: Package,
    path: "/orders",
  },
  {
    label: "Wishlist",
    icon: Heart,
    path: "/wishlist",
  },
  {
    label: "Checkout",
    icon: ShoppingCart,
    path: "/checkout",
  },
];

const UserMenu = ({ handleLogout }) => {
  return (
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
        {menuItems.map(({ label, path, icon: Icon }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-left text-red-500 hover:bg-gray-100"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
