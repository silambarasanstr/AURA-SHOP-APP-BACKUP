import { useState, useCallback } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import DeliveryMethod from "../components/checkout/DeliveryMethod";
import PaymentMethod from "../components/checkout/PaymentMethod";
import usePageTitle from "../hooks/usePageTitle";
const NO_IMAGE = "https://via.placeholder.com/60?text=No+Image";
import ProductImg from "../../assets/product/product1.png";

const CheckoutContainer = () => {
  usePageTitle("Cart | My Store");
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState({
    id: "standard",
    label: "Standard delivery",
    cost: 49,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: "cod",
    codFee: 30,
  });

  const subtotal = cartItems?.totalPrice || 0;
  const discount = cartItems?.discount || 0;
  const totalItems = cartItems?.items?.reduce((acc, item) => acc + item.quantity, 0);

  // Should be
  const grandTotal = (
    subtotal -
    discount +
    (deliveryMethod?.cost ?? 49) +
    (paymentInfo?.codFee ?? 0)
  ).toFixed(2);

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
      totalPrice: grandTotal,
      discount: discount,
      address: {
        fullName,
        city,
        streetAddress,
        phoneNumber: phone,
        pincode,
      },
      deliveryMethod: {
        id: deliveryMethod.id,
        label: deliveryMethod.label,
        cost: deliveryMethod.cost,
      },
      payment: {
        method: paymentInfo.method,
        codFee: paymentInfo.codFee,
      },
    };

    console.log("orderData =>", JSON.stringify(orderData, null, 2));
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

  const handleDeliveryChange = useCallback((data) => {
    setDeliveryMethod(data);
  }, []);

  const handlePaymentChange = useCallback((data) => {
    setPaymentInfo(data);
  }, []);

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
    <div className="min-h-screen px-3 py-4 bg-gray-100">
      <div className="mx-auto max-w-7xl">
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
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mt-5">
                  <DeliveryMethod onDeliveryChange={handleDeliveryChange} />
                  <PaymentMethod onPaymentChange={handlePaymentChange} />
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
                      loading="lazy"
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between mt-2 ">
                  <span className="text-gray-600">Discount</span>
                  <span>- ₹{discount}</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Delivery</span>

                  <span>{deliveryMethod?.cost === 0 ? "FREE" : `₹${deliveryMethod?.cost}`}</span>
                </div>

                {paymentInfo?.method === "cod" && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">COD Fee</span>
                    <span>₹{paymentInfo.codFee}</span>
                  </div>
                )}

                <div className="flex justify-between py-2 text-green-600 border-t">
                  <span className="font-semibold">You Save</span>
                  <span className="font-semibold">₹{cartItems.discount}</span>
                </div>

                <div className="flex justify-between pt-3 mt-3">
                  <span className="font-semibold">Total</span>

                  <span className="text-xl font-bold text-green-600">₹{grandTotal}</span>
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
