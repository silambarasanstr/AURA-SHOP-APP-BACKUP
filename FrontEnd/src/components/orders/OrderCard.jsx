import React from "react";
import { MapPin, ShoppingBag, ArrowRight } from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-orange-100 text-orange-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const OrderCard = ({ order, onView, onDelete }) => {
  const firstItem = order.items[0];
  const extraCount = order.items.length - 1;

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ShoppingBag size={18} className="text-gray-400" />
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {" · "}
              {order.deliveryMethod.label}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}
        >
          {order.status}
        </span>
      </div>

      {/* Item strip */}
      <div className="flex items-center gap-3 py-3 border-t border-b border-gray-100">
        <img
          src={firstItem.image || "https://via.placeholder.com/60?text=No+Image"}
          alt={firstItem.name}
          className="object-cover rounded-lg w-11 h-11 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{firstItem.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Qty: {firstItem.qty}
            {extraCount > 0 && <span className="ml-2 text-gray-400">+{extraCount} more</span>}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-semibold text-gray-900">₹{order.totalPrice}</p>
          {order.discount > 0 && (
            <p className="text-xs text-green-600 mt-0.5">−₹{order.discount} off</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin size={13} />
          <span>
            {order.address.fullName}, {order.address.city}
          </span>
        </div>
        <div className="flex gap-2">
          {order.status === "Pending" && (
            <button
              onClick={() => onDelete(order._id)}
              className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onView(order)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Track order <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
