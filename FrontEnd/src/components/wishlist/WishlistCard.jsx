import { useEffect, useState } from "react";
import { Trash2, ShoppingCart, ArrowRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";

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

const WishlistCard = ({ product, selected, onSelect, onRemove, onAddToCart, onMoveToCart }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isOutOfStock = product?.stock === 0 || product?.status === "out_of_stock";

  const originalPrice = product?.originalPrice || null;
  const currentPrice = Number(product?.price || 0);

  const formatDate = (timestamp) => {
    if (!timestamp) return null;

    const addedTime = new Date(timestamp).getTime();
    const diff = now - addedTime;

    const days = Math.floor(diff / 86400000);

    if (days <= 0) return "Added today";
    if (days === 1) return "Added yesterday";
    if (days < 7) return `Added ${days} days ago`;
    if (days < 14) return "Added 1 week ago";

    return `Added ${Math.floor(days / 7)} weeks ago`;
  };

  return (
    <div
      className={`group relative bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
        selected ? "border-blue-400 ring-1 ring-blue-300" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Select checkbox */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(product._id)}
          className="w-4 h-4 transition-opacity rounded opacity-0 cursor-pointer accent-blue-600 group-hover:opacity-100"
          style={{ opacity: selected ? 1 : undefined }}
          aria-label={`Select ${product?.name}`}
        />
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(product._id)}
        className="absolute z-10 flex items-center justify-center transition-opacity bg-white border border-gray-200 rounded-full opacity-0 top-2 right-2 w-7 h-7 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200"
        aria-label="Remove from wishlist"
      >
        <Trash2 size={13} className="text-gray-400 hover:text-red-500" />
      </button>

      {/* Image */}
      <Link to={`/products/${product?._id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product?.image}
            alt={product?.name || "Product"}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <StockBadge product={product} />
        </div>
      </Link>

      {/* Body */}
      <div className="p-3.5">
        <Link to={`/products/${product?._id}`}>
          <h3 className="mb-1 text-sm font-semibold text-gray-800 truncate transition-colors hover:text-blue-600">
            {product?.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className={`text-base font-bold ${isOutOfStock ? "text-gray-400" : "text-gray-900"}`}
          >
            ₹{currentPrice.toLocaleString("en-IN")}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{Number(originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Date added */}
        {product?.addedAt && (
          <p className="text-[11px] text-gray-400 mb-3">{formatDate(product.addedAt)}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          {isOutOfStock ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-gray-100 text-gray-400 border border-gray-200 rounded-lg py-2 cursor-not-allowed"
            >
              <Bell size={13} />
              Notify me
            </button>
          ) : (
            <>
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-700 active:scale-95 transition-all"
              >
                <ShoppingCart size={13} />
                Add to cart
              </button>
              <button
                onClick={() => onMoveToCart(product)}
                title="Move to cart"
                className="px-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-95 transition-all text-gray-500"
              >
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
