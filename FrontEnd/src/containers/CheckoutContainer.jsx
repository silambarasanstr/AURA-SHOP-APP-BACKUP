import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const NO_IMAGE = "https://via.placeholder.com/60?text=No+Image";

const CheckoutContainer = () => {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!fullName.trim() || !city.trim()) {
      toast.error("Please fill all fields ⚠️");
      return;
    }

    const orderItems = cartItems.items.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      qty: item.quantity,
    }));

    const orderData = {
      userId: user._id,
      items: orderItems,
      totalPrice: cartItems.totalPrice,
      address: {
        fullName,
        city,
      },
    };

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);

      toast.success("Order Placed Successfully ✅");

      clearCart();

      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Order Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Empty Cart
  if (!cartItems.items || cartItems.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-60">
        <p className="text-lg font-semibold text-gray-600">Your checkout is empty 🛒</p>

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
    <div className="min-h-screen px-3 py-4 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
        {/* Heading */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center text-gray-800">Checkout</h2>

          <p className="mt-1 text-sm text-center text-gray-500">Complete your order</p>
        </div>

        {/* Order Summary */}
        <div className="p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Order Summary</h3>

          <div className="space-y-3">
            {cartItems.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
              >
                {/* Product Image */}
                <img
                  src={item.product.image || NO_IMAGE}
                  alt={item.product.name}
                  className="object-contain p-1 bg-white border rounded-md w-14 h-14"
                  onError={(e) => {
                    e.target.src = NO_IMAGE;
                  }}
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{item.product.name}</p>

                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold text-gray-700">
                  ₹{item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-3 mt-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Total Amount</p>

              <p className="text-xl font-bold text-green-600">₹{cartItems.totalPrice}</p>
            </div>
          </div>

          {/* Address Form */}
          <div className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-green-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              placeholder="City"
              className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-green-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full py-2.5 mt-5 text-sm font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
