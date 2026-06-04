import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";

const NO_IMAGE = "https://via.placeholder.com/80?text=No+Image";

const CartContainer = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  // Loading
  if (!cartItems) {
    return (
      <div className="flex items-center justify-center h-52">
        <p className="text-sm font-medium text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  // Empty Cart
  if (!cartItems.items || cartItems.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-60">
        <p className="text-lg font-semibold text-gray-600">Your cart is empty 🛒</p>

        <Link
          to="/"
          className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-3 py-4 mx-auto">
      {/* Heading */}
      <h1 className="mb-5 text-2xl font-bold text-center text-gray-800">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-3">
        {cartItems.items.map((item) => {
          if (!item?.product) return null;
          return (
            <div
              key={item.product._id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-xl"
            >
              <img
                src={item.product.image || NO_IMAGE}
                alt={item.product.name}
                className="object-cover w-16 h-16 bg-white border border-gray-300 rounded-md"
              />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-gray-800 truncate">
                  {item.product.name}
                </h2>

                <p className="mt-1 text-xs text-gray-500">₹{item.product.price} / item</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item?.product?._id, "dec")}
                    disabled={!item?.product?._id}
                    className="flex items-center justify-center w-8 h-8 text-gray-700 transition bg-gray-100 border rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-[40px] text-center py-1 text-sm font-medium border rounded-md bg-white">
                    {item?.quantity ?? 0}
                  </span>

                  <button
                    onClick={() => updateQuantity(item?.product?._id, "inc")}
                    disabled={!item?.product?._id}
                    className="flex items-center justify-center w-8 h-8 text-white transition bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">
                  ₹{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="mt-2 text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Section */}
      <div className="p-4 mt-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Total Amount</h2>

          <p className="text-xl font-bold text-green-700">₹{cartItems.totalPrice}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={clearCart}
            className="w-full px-4 py-3 text-sm text-white transition bg-red-500 hover:bg-red-600"
          >
            Clear Cart
          </button>

          <Link to="/checkout" className="w-full">
            <button className="w-full px-4 py-3 text-sm text-white transition bg-blue-600 hover:bg-blue-700">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
