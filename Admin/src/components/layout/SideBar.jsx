import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Users,
  Package,
  ChevronsLeft,
  ChevronDown,
} from "lucide-react";

const SideBar = ({ collapsed, setCollapsed }) => {
  const [expandedSections, setExpandedSections] = useState({
    ecommerce: true,
    admin: true,
  });

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/",
    },
  ];

  const appSections = [
    {
      id: "ecommerce",
      label: "E commerce",
      icon: ShoppingCart,
      children: [
        {
          id: "admin",
          label: "Admin",
          icon: Users,
          children: [
            {
              id: "admin-products",
              label: "Products",
              icon: Package,
              href: "/products",
            },
            {
              id: "admin-add-products",
              label: "Add Products",
              icon: Package,
              href: "/add-products",
            },

            // Admin only
            ...(role === "admin"
              ? [
                  {
                    id: "admin-orders",
                    label: "Orders",
                    icon: ShoppingCart,
                    href: "/orders",
                  },
                ]
              : []),
          ],
        },
      ],
    },
  ];

  const renderMenu = (items, level = 0) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isExpanded = expandedSections[item.id];
      const paddingLeft = 12 + level * 16;

      if (item.children && item.children.length > 0) {
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleSection(item.id)}
              className="flex items-center w-full gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {Icon && <Icon size={18} />}
              {!collapsed && (
                <span className="flex-1 font-medium text-left">
                  {item.label}
                </span>
              )}

              {!collapsed && (
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                />
              )}
            </button>

            {isExpanded && !collapsed && (
              <div className="space-y-1">
                {renderMenu(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={item.id}
          to={item.href}
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {Icon && <Icon size={16} />}
          {!collapsed && <span>{item.label}</span>}
        </Link>
      );
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && (
          <h2 className="text-sm font-semibold text-gray-900">
            AURA-SHOP-APP
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          <ChevronsLeft
            size={18}
            className={`transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <item.icon size={20} />
            {!collapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </Link>
        ))}

        {!collapsed && (
          <div className="px-3 py-3 mt-4">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Apps
            </p>
          </div>
        )}

        <div className="space-y-1">
          {appSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];

            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <Icon size={20} />

                  {!collapsed && (
                    <span className="flex-1 font-medium text-left">
                      {section.label}
                    </span>
                  )}

                  {!collapsed && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  )}
                </button>

                {isExpanded && !collapsed && (
                  <div className="space-y-1">
                    {renderMenu(section.children, 1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;