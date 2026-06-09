import React from "react";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderCard = ({ order, onView, onDelete }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-800">Order #{order.orderNumber}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}
        >
          {order.status}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Items:</p>
        <div className="mt-2 space-y-2">
          {order.items.slice(0, 3).map((item) => (
            <div key={item._id} className="flex items-center gap-3">
              <img
                src={item.image || "https://via.placeholder.com/60?text=No+Image"}
                alt={item.name}
                loading="lazy"
                className="object-cover bg-white border rounded-lg w-14 h-14"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.qty}</p>
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 mt-2 border-t">
        <div>
          <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
          <p className="text-sm font-bold text-green-600">₹{order.totalPrice}</p>
        </div>
        <button
          onClick={() => onDelete(order._id)}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Cancel Order
        </button>
        <button
          onClick={() => onView(order)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
