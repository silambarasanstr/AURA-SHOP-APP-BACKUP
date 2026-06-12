import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/orderService"; // ✅ uses your axios instance
import OrderSummary from "../components/orders/OrderSummary";
import MapEmbed from "../components/orders/MapEmbed";
import OrderSkeleton from "../components/orders/OrderSkeleton";
import { formatDate, formatTime } from "../utils/dateUtils";
import { ALL_STEPS } from "../constants/orderSteps";
import TrackingStep from "../components/orders/TrackingStep";

function buildSteps(currentStatus) {
  const activeIndex = ALL_STEPS.findIndex((s) => s.key === currentStatus);
  return ALL_STEPS.map((step, i) => ({
    ...step,
    status: i < activeIndex ? "done" : i === activeIndex ? "active" : "pending",
  }));
}

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data = await getOrderById(id); // ✅ uses axios, inherits auth headers
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const steps = order ? buildSteps(order.status) : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-6 py-8 mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 mb-6 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Back to orders
        </button>

        <div className="mb-7">
          <h1 className="m-0 text-2xl font-extrabold text-gray-900">
            {order ? order.orderNumber : id ? `Order #${id}` : "Order not found"}
          </h1>
          {order && (
            <p className="mt-1.5 text-sm text-gray-500">
              Payment via{" "}
              <span className="font-semibold text-orange-500">
                {order.payment.method === "cod" ? "Cash on Delivery" : order.payment.method}
              </span>
              {" · "}
              {order.deliveryMethod.label}
              {" · "}
              {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
            </p>
          )}
        </div>

        {loading && <OrderSkeleton />}

        {error && (
          <div className="px-6 py-5 text-sm text-red-600 border border-red-200 bg-red-50 rounded-2xl">
            Failed to load order: {error}
          </div>
        )}

        {!loading && !error && order && (
          <div className="grid grid-cols-2 overflow-hidden bg-white shadow-sm rounded-2xl">
            <div className="flex flex-col gap-4 p-5 border-r border-gray-100">
              <MapEmbed address={order.address} />
              <OrderSummary order={order} />
            </div>
            <div className="py-8 px-7">
              <p className="m-0 mb-6 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Tracking
              </p>

              {steps.map((step, index) => (
                <TrackingStep key={step.id} step={step} isLast={index === steps.length - 1} />
              ))}

              <div className="pt-6 mt-8 border-t border-gray-100">
                <p className="m-0 mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Deliver to
                </p>
                <p className="m-0 text-sm font-semibold text-gray-900">{order.address.fullName}</p>
                <p className="mt-0.5 text-xs text-gray-500">{order.address.streetAddress}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {order.address.city}, {order.address.pincode}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">📞 {order.address.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
