import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  PlusCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const SideBar = ({ collapsed, setCollapsed }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
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
      className={`
    fixed top-0 left-0 z-50
    h-screen
    bg-gradient-to-b from-[#172554] via-[#000514] to-[#172554]
    border-r border-blue-900
    shadow-xl
    transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
  `}
    >
      {/* Header */}
      <div
        className={`
          flex items-center
          h-16
          border-b border-slate-700
          ${collapsed ? "justify-center" : "justify-between px-4"}
        `}
      >
        {/* Logo */}
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold tracking-wide text-white">
              AURA SHOP
            </h1>

            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        )}

        {/* Collapse Button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center transition-all duration-200 rounded-lg w-9 h-9 text-slate-400 hover:bg-slate-700 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-5">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                      group
                      flex items-center
                      ${collapsed ? "justify-center" : "gap-3"}
                      w-full
                      px-3 py-2.5
                      rounded-lg
                      transition-all duration-200

                      ${
                        isActive
                          ? `bg-blue-800/60 text-white shadow-lg shadow-blue-950/30
                          `
                          : `text-blue-100 hover:bg-blue-800/60 hover:text-white
                          `
                      }
                    `
                  }
                >
                  <Icon size={19} strokeWidth={2} className="flex-shrink-0" />

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
