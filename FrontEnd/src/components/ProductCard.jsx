import { memo } from "react";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import { Trash2, Heart, Share2, ShoppingCart, ArrowRight, Bell, Check } from "lucide-react";
import ProductImg from "../../assets/product/product1.png";

const NO_IMAGE = "https://via.placeholder.com/300?text=No+Image";

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

const ProductCard = ({ product, onAddToCart, showText }) => {
  const isOutOfStock = product?.stock === 0 || product?.status === "out_of_stock";
  const originalPrice = product?.originalPrice || null;
  const currentPrice = Number(product?.price || 0);

  return (
    <div className="relative overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* {showText && (
        
      )} */}

      <div className="absolute z-10 top-2 right-2">
        <WishlistButton showText={showText} product={product} />
      </div>

      {/* Image */}
      <Link to={`/products/${product?._id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            //src={ProductImg}
            src={product?.image || NO_IMAGE}
            alt={product?.name}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <StockBadge product={product} />
        </div>
      </Link>

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

        {/* Actions */}

        {onAddToCart && (
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
