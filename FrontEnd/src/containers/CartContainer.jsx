import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loading from "../components/common/Loading";
import CartItemCard from "../components/CartItemCard";
import EmptyState from "../components/common/EmptyState";
import { ShoppingCart } from "lucide-react";
import { Grid2X2, List } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const CartContainer = () => {
  usePageTitle("Cart | My Store");
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const items = cartItems?.items || [];
  const subtotal = cartItems?.totalPrice || 0;
  const discount = cartItems?.discount || 0;
  
  const totalItems = cartItems?.items?.reduce((acc, item) => acc + item.quantity, 0);
  
  const grandTotal = (cartItems.totalPrice - cartItems.discount).toFixed(2);

  // Loading
  if (!cartItems) return <Loading />;

  // Empty
  if (!items.length) {
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
    <div className="min-h-screen px-3 py-4 bg-gray-100">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Your Cart</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
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

          {/* RIGHT */}
          <div>
            <div className="sticky p-6 bg-white border rounded-xl top-5">
              <h2 className="pb-3 mb-4 text-lg font-semibold border-b">Order Summary</h2>

              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Discount</span>
                <span>- ₹{discount}</span>
              </div>

              {/* <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">
                  {cartItems.totalPrice > 500 ? "FREE" : "₹49"}
                </span>
              </div> */}

              <div className="flex justify-between py-2 text-green-600 border-t">
                <span className="font-medium">You Save</span>
                <span className="font-bold">₹{cartItems.discount}</span>
              </div>

              <div className="flex justify-between pt-3 mt-3 ">
                <span className="font-semibold">Grand Total</span>
                <span className="text-xl font-bold text-green-600">₹{grandTotal}</span>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-white bg-red-500 rounded-lg"
                >
                  Clear Cart
                </button>

                <Link to="/checkout">
                  <button className="w-full py-3 mt-5 text-white bg-blue-600 rounded-lg">
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
