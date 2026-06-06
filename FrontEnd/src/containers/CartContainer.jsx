import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";
import Loading from "../components/common/Loading";
import CartItemCard from "../components/CartItemCard";
import EmptyState from "../components/common/EmptyState";
import { ShoppingCart } from "lucide-react";

const NO_IMAGE = "https://via.placeholder.com/80?text=No+Image";

const CartContainer = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  // Loading
  if (!cartItems) {
    return <Loading />;
  }

  // Empty
  if (!cartItems.items.length) {
    return (
      <EmptyState
        icon={<ShoppingCart size={48} />}
        title="No items in cart"
        description="Your selected items will appear here."
        buttonText="Continue Shopping"
        buttonLink="/"
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Your Cart</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.items.map((item) => {
              if (!item?.product) return null;

              return (
                <CartItemCard
                  key={item.product._id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div>
            <div className="sticky p-6 bg-white border border-gray-200 shadow-sm rounded-xl top-5">
              <h2 className="pb-3 mb-4 text-lg font-semibold border-b">Order Summary</h2>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Items</span>
                <span>{cartItems.items.length}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Total Price</span>
                <span>₹{cartItems.totalPrice}</span>
              </div>

              <div className="flex justify-between pt-3 mt-3 border-t">
                <span className="font-semibold">Grand Total</span>
                <span className="text-xl font-bold text-green-600">₹{cartItems.totalPrice}</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </button>

                <Link to="/checkout">
                  <button className="w-full py-3 mt-5 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
