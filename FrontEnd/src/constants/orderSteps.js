// src/constants/orderSteps.js

export const ALL_STEPS = [
  {
    id: 1,
    label: "Order Placed",
    description: "Your order has been placed successfully.",
    icon: "✓",
    key: "Pending",
  },
  {
    id: 2,
    label: "Confirmed",
    description: "Seller has confirmed your order.",
    icon: "✓",
    key: "Confirmed",
  },
  {
    id: 3,
    label: "Processing",
    description: "Your order is being prepared.",
    icon: "🚚",
    key: "Processing",
  },
  {
    id: 4,
    label: "Shipped",
    description: "Your order is on the way.",
    icon: "📦",
    key: "Shipped",
  },
  {
    id: 5,
    label: "Delivered",
    description: "Order delivered successfully.",
    icon: "🏠",
    key: "Delivered",
  },
];
