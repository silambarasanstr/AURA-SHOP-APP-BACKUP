import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="grid grid-cols-2 overflow-hidden bg-white shadow-sm rounded-2xl animate-pulse">
      <div className="p-5 border-r border-gray-100">
        <div className="bg-gray-200 rounded-xl" style={{ minHeight: 380 }} />
      </div>
      <div className="py-8 space-y-8 px-7">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
            <div className="flex-1 pt-1 space-y-2">
              <div className="w-1/2 h-3 bg-gray-200 rounded" />
              <div className="w-3/4 h-2 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSkeleton;
