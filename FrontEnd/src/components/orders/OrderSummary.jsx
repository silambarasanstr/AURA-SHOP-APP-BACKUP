import React from 'react'

const OrderSummary = ({ order }) => {
    const item = order.items[0];
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
      <img
        src={item.image}
        alt={item.name}
        className="object-cover w-16 h-16 border border-gray-300 rounded-lg shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="m-0 text-sm font-semibold text-gray-900 truncate">{item.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          Qty: {item.qty} · ₹{item.price}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {order.address.streetAddress}, {order.address.city} — {order.address.pincode}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="m-0 text-sm font-bold text-gray-900">₹{order.totalPrice}</p>
        <p className="mt-0.5 text-xs text-green-600">−₹{order.discount} off</p>
      </div>
    </div>
  )
}

export default OrderSummary
