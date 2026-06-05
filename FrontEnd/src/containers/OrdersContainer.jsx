import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../services/orderService";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  Pending: { bg: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  Delivered: { bg: "bg-green-50 text-green-700", dot: "bg-green-400" },
  Cancelled: { bg: "bg-red-50 text-red-600", dot: "bg-red-400" },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] ?? { bg: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${style.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
};

const OrdersContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);

        // show empty state instead of error page
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id); // FIX 2: set confirm state
  };

  const confirmDelete = async (id) => {
    try {
      await deleteOrder(id);
      toast.success("Order deleted successfully ✅");
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      setError("Could not delete the order. Please try again."); // FIX 3
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (amount = 0) => {
    return Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3">
        <div className="w-5 h-5 border-2 border-gray-300 rounded-full border-t-gray-600 animate-spin" />
        <p className="text-sm text-gray-500">Loading orders…</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center px-4">
        <p className="text-2xl">⚠️</p>
        <p className="font-medium text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 text-center px-4">
        <p className="text-4xl">🛍️</p>
        <h2 className="text-xl font-semibold text-gray-800">No orders yet</h2>
        <p className="text-sm text-gray-500">Your placed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 py-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">My orders</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {orders.length} recent purchase{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Error toast (delete errors) */}
        {error && (
          <div className="flex items-center justify-between px-4 py-3 mb-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-3 text-red-400 hover:text-red-600"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* Orders list */}
        <div className="space-y-4 ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden transition-shadow bg-white border border-gray-300 shadow-sm rounded-2xl hover:shadow-md"
            >
              {/* Card header */}
              <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                    Order ID
                  </p>
                  <p className="font-mono text-xs font-medium leading-snug text-gray-700 break-all">
                    #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <div className="flex items-center flex-shrink-0 gap-2">
                  <span className="text-xs text-gray-400">
                    {order.items?.length || 0} item
                    {(order.items?.length || 0) !== 1 ? "s" : ""}
                  </span>
                  <StatusBadge status={order.status} /> {/* FIX 4 */}
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Date</p>
                  <p className="text-xs text-gray-700">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 ">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Items
                </p>

                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name || "Product"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty || 0}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        ₹{formatPrice(item.price * (item.qty || 0))} {/* FIX 5 */}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex flex-col gap-4 pt-4 mt-4 border-t border-gray-100 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                      Delivery address
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {order.address?.fullName || "Customer"}
                    </p>
                    <p className="text-xs text-gray-500">{order.address?.city || "N/A"}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{formatPrice(order.totalPrice || 0)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
                  {deletingId === order._id ? (
                    /* FIX 2: inline confirmation instead of window.confirm */
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Delete this order?</span>
                      <button
                        onClick={() => confirmDelete(order._id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Confirm delete"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Cancel delete"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                      aria-label={`Delete order ${order._id}`} // FIX 6
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                      Delete order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
