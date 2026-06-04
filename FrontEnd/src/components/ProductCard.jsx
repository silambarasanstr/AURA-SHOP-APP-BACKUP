import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

const NO_IMAGE = "https://via.placeholder.com/300?text=No+Image";

const ProductCard = ({ product, addToCart, showText }) => {
  return (
    <div className="relative overflow-hidden transition duration-300 bg-white border border-gray-200 shadow-sm hover:shadow-md">
      <div className="absolute top-2 right-2">
         <WishlistButton showText={true} product={product} />
      </div>

      {/* Product Link */}
      <Link to={`/products/${product._id}`} className="block">
        {/* Image */}
        <div className="flex items-center justify-center overflow-hidden bg-gray-100 h-44">
          <img
            src={product?.image || NO_IMAGE}
            alt={product?.name}
            className="object-cover w-full h-full transition duration-300 "
          />
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product?.name}</h3>

          {/* Price */}
          <p className="mt-1 text-lg font-bold text-green-600">₹{product?.price}</p>
        </div>
      </Link>

      {/* Button */}
      {addToCart && (
        <div className="px-3 pb-3">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2 text-sm font-medium text-white transition bg-green-500 hover:bg-green-600 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
