import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Users,
  UsersRound,
  Package,
  ChevronsLeft,
  ChevronDown,
  Mail,
  Star,
} from "lucide-react";

const SideBar = ({ collapsed, setCollapsed }) => {
  const [expandedSections, setExpandedSections] = useState({
    ecommerce: false,
    email: false,
    admin: false,
  });

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
      type: "section",
      children: [
        {
          id: "admin",
          label: "Admin",
          icon: Users,
          children: [
            {
              id: "products",
              label: "Products",
              icon: Package,
              href: "/products",
            },
            {
              id: "add-products",
              label: "Add Products",
              icon: Package,
              href: "/add-products",
            },
            {
              id: "orders",
              label: "Orders",
              icon: ShoppingCart,
              href: "/orders",
            },
          ],
        },
        {
          id: "customer",
          label: "Customer",
          icon: UsersRound,
          children: [
            {
              id: "carts",
              label: "Carts",
              icon: ShoppingCart,
              href: "/carts", // ✅ Added href
            },
          ],
        },
      ],
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      type: "section",
      children: [
        {
          id: "events",
          label: "Events",
          icon: Star,
          href: "/events", // ✅ Added href
        },
      ],
    },
  ];

  const renderMenu = (items, level = 0) => {
    return items.map((item) => {
      
      const Icon = item.icon;
      const isExpanded = expandedSections[item.id];
      const paddingLeft = 12 + level * 16;

      // ✅ Item with children (expandable)
      if (item.children && item.children.length > 0) {
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleSection(item.id)}
              className="flex items-center w-full gap-3 px-3 py-2 text-sm text-gray-700 transition-colors duration-150 rounded-lg hover:bg-gray-100"
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {Icon && <Icon size={18} className="flex-shrink-0" />}
              {!collapsed && (
                <span className="flex-1 font-medium text-left">
                  {item.label}
                </span>
              )}
              {!collapsed && (
                <ChevronDown
                  size={14}
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                />
              )}
            </button>

            {/* ✅ Render children when expanded */}
            {isExpanded && !collapsed && (
              <div className="space-y-1">
                {renderMenu(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      }

      // ✅ Leaf item (no children, has href)
      return (
        <Link
          key={item.id}
          to={item.href || "#"}
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 transition-colors duration-150 rounded-lg hover:text-gray-900 hover:bg-gray-100"
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {Icon && <Icon size={16} className="flex-shrink-0" />}
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
          <h2 className="text-sm font-semibold text-gray-900">Navigation</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeft
            size={18}
            className={`text-gray-600 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Home Link */}
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}

        {/* Apps Section Label */}
        {!collapsed && (
          <div className="px-3 py-3 mt-4">
            <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Apps
            </p>
          </div>
        )}

        {/* App Sections */}
        <div className="space-y-1">
          {appSections.map((section) => {
            const isExpanded = expandedSections[section.id];
            const Icon = section.icon;

            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="flex-1 font-medium text-left">
                      {section.label}
                    </span>
                  )}
                  {!collapsed && (
                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  )}
                </button>

                {/* Render nested children */}
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
