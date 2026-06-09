import { useState, useEffect } from "react";

const deliveryOptions = [
  { id: "express",  label: "Express delivery",  sub: "Delivered in 1–2 days",      cost: 99 },
  { id: "standard", label: "Standard delivery", sub: "Delivered in 3–5 days",      cost: 49 },
  { id: "pickup",   label: "Store pickup",       sub: "Ready in 2 hrs · Chennai",  cost: 0  },
];

const DeliveryMethod = ({ onDeliveryChange }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  // Fire initial value to parent on mount
  useEffect(() => {
    const initial = deliveryOptions.find((o) => o.id === "standard");
    onDeliveryChange?.({ id: initial.id, label: initial.label, cost: initial.cost });
  }, []);

  const handleSelect = (id) => {
    setDeliveryMethod(id);
    const selected = deliveryOptions.find((o) => o.id === id);
    onDeliveryChange?.({ id: selected.id, label: selected.label, cost: selected.cost });
  };

  return (
    <div className="mb-6">
      <p className="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase">
        Delivery Method
      </p>

      {deliveryOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => handleSelect(option.id)}
          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer mb-2 transition ${
            deliveryMethod === option.id
              ? "border-green-500 bg-green-50 ring-1 ring-green-300"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {/* Radio */}
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              deliveryMethod === option.id
                ? "border-green-600 bg-green-600"
                : "border-gray-300"
            }`}
          >
            {deliveryMethod === option.id && (
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>

          {/* Label */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{option.label}</p>
            <p className="text-xs text-gray-500">{option.sub}</p>
          </div>

          {/* Price */}
          {option.cost === 0 ? (
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              FREE
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-700">₹{option.cost}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryMethod;