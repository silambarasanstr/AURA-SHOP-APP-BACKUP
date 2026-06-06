import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import EmptyState from "../components/common/EmptyState";

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

  // Empty
  if (!cartItems.items.length || cartItems.items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart size={48} />}
        title="No items in Checkout"
        description="Your selected items will appear here."
        buttonText="Continue Shopping"
        buttonLink="/"
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT SIDE - FORM */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h2 className="mb-6 text-xl font-semibold text-gray-800">Shipping Details</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">City</label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>

                  <textarea
                    rows={4}
                    placeholder="Enter complete address"
                    className="w-full px-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Pincode</label>

                  <input
                    type="text"
                    placeholder="Enter pincode"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div>
            <div className="sticky p-5 bg-white border border-gray-200 shadow-sm rounded-xl top-5">
              <h2 className="pb-3 mb-4 text-lg font-semibold border-b">Order Summary</h2>

              <div className="space-y-3 max-h-[350px] overflow-y-auto">
                {cartItems.items.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-3">
                    <img
                      src={item.product.image || NO_IMAGE}
                      alt={item.product.name}
                      className="object-contain w-16 h-16 p-1 bg-white border rounded-md"
                      onError={(e) => {
                        e.target.src = NO_IMAGE;
                      }}
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 line-clamp-2">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <p className="text-sm font-semibold">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Items</span>
                  <span>{cartItems.totalItems}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3 mt-3 border-t">
                  <span className="font-semibold">Total</span>

                  <span className="text-xl font-bold text-green-600">₹{cartItems.totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full py-3 mt-5 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
