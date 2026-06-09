import React from "react";

const StockBadge = ({ product }) => {
  if (product?.stock === 0 || product?.status === "out_of_stock") {
    return (
      <span className="absolute top-2 left-2 text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
        Out of stock
      </span>
    );
  }
  if (product?.stock > 0 && product?.stock <= 5) {
    return (
      <span className="absolute top-2 left-2 text-[11px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
        Only {product.stock} left
      </span>
    );
  }
  if (product?.discount > 0) {
    return (
      <span className="absolute top-2 left-2 text-[11px] font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
        {product.discount}% off
      </span>
    );
  }
  return null;
};

export default StockBadge;
