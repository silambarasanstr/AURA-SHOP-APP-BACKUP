import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";
import { ShoppingBag } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import OrderCard from "../components/orders/OrderCard";
import usePageTitle from "../hooks/usePageTitle";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrdersContainer = () => {
  usePageTitle("Orders | My Store");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // for detail view

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Order cancelled");
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <Loading />;

  if (!orders.length) {
    return (
      <EmptyState
        icon={<ShoppingBag size={48} />}
        title="No orders yet"
        description="Your placed orders will appear here."
        buttonText="Start Shopping"
        buttonLink="/"
      />
    );
  }

  // ---------- DETAIL VIEW ----------
  if (selected) {
    return (
      <div className="min-h-screen px-4 py-8 bg-gray-100">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 mb-6 text-sm text-gray-500 hover:text-gray-800"
          >
            ← Back to orders
          </button>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b">
              <div>
                <p className="text-xs text-gray-400">Order number</p>
                <p className="font-semibold text-gray-800">{selected.orderNumber}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(selected.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${STATUS_STYLES[selected.status] || "bg-gray-100 text-gray-600"}`}
              >
                {selected.status}
              </span>
            </div>

            {/* Items */}
            <p className="mb-3 text-sm font-medium text-gray-700">Items</p>
            <div className="mb-5 space-y-3">
              {selected.items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image || "https://via.placeholder.com/60?text=No+Image"}
                    alt={item.name}
                    className="object-cover bg-white border rounded-lg w-14 h-14"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="p-4 mb-5 space-y-2 text-sm bg-gray-50 rounded-xl">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>
                  ₹
                  {(
                    selected.totalPrice -
                    selected.deliveryMethod.cost +
                    selected.discount -
                    selected.payment.codFee
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="text-green-600">- ₹{selected.discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery ({selected.deliveryMethod.label})</span>
                <span>
                  {selected.deliveryMethod.cost === 0 ? "FREE" : `₹${selected.deliveryMethod.cost}`}
                </span>
              </div>
              {selected.payment.method === "cod" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">COD Fee</span>
                  <span>₹{selected.payment.codFee}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 font-semibold border-t">
                <span>Total</span>
                <span className="text-green-600">₹{selected.totalPrice}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mb-5">
              <p className="mb-2 text-sm font-medium text-gray-700">Delivery Address</p>
              <div className="p-4 text-sm leading-relaxed text-gray-600 bg-gray-50 rounded-xl">
                <p className="font-medium text-gray-800">{selected.address.fullName}</p>
                <p>{selected.address.streetAddress}</p>
                <p>
                  {selected.address.city} - {selected.address.pincode}
                </p>
                <p>📞 {selected.address.phoneNumber}</p>
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="mb-1 text-xs text-gray-400">Payment</p>
                <p className="text-sm font-medium text-gray-800 uppercase">
                  {selected.payment.method}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="mb-1 text-xs text-gray-400">Delivery</p>
                <p className="text-sm font-medium text-gray-800">{selected.deliveryMethod.label}</p>
              </div>
            </div>

            {/* Cancel Button */}
            {selected.status === "Pending" && (
              <button
                onClick={() => handleDelete(selected._id)}
                className="w-full py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onView={setSelected} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
