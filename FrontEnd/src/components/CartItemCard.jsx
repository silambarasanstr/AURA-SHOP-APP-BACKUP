import { Minus, Plus } from "lucide-react";

const NO_IMAGE = "https://via.placeholder.com/150";
import ProductImg from "../../assets/product/product1.png";

const CartItemCard = ({ item, updateQuantity, removeFromCart }) => {
  const product = item?.product;

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Product Image */}
      <img
        src={product?.image || NO_IMAGE}
        alt={product?.name}
        loading="lazy"
        className="object-cover w-16 h-16 bg-white border border-gray-300 rounded-md"
      />

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-gray-800 truncate">{product?.name}</h2>

        <p className="mt-1 text-xs text-gray-500">₹{product?.price || 0}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(product?._id, "dec")}
            disabled={!product?._id}
            className="flex items-center justify-center w-8 h-8 text-gray-700 transition bg-gray-100 border rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-[40px] text-center py-1 text-sm font-medium border rounded-md bg-white">
            {item?.quantity ?? 0}
          </span>

          <button
            onClick={() => updateQuantity(product?._id, "inc")}
            disabled={!product?._id}
            className="flex items-center justify-center w-8 h-8 text-white transition bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="text-right">
        <p className="text-sm font-bold text-green-600">
          ₹{(product?.price || 0) * (item?.quantity || 0)}
        </p>

        <button
          onClick={() => removeFromCart(product?._id)}
          className="mt-2 text-xs text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
