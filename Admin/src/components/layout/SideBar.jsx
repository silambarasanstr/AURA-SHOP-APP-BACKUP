import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, ShoppingCart, PlusCircle } from "lucide-react";

const SideBar = ({ collapsed, setCollapsed }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/products",
    },
    {
      id: "add-products",
      label: "Add Products",
      icon: PlusCircle,
      href: "/add-products",
    },

    ...(role === "admin"
      ? [
          {
            id: "orders",
            label: "Orders",
            icon: ShoppingCart,
            href: "/orders",
          },
        ]
      : []),
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        {!collapsed && (
          <div>
            <h1 className="font-bold text-blue-600 text-md">AURA SHOP</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 transition rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M11 19l-7-7 7-7M20 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded px-2 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
