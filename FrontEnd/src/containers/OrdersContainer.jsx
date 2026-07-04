import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";
import { ShoppingBag } from "lucide-react";
import EmptyState from "../components/common/EmptyState";
import OrderCard from "../components/orders/OrderCard";
import usePageTitle from "../hooks/usePageTitle";

const OrdersContainer = () => {
  usePageTitle("Orders | My Store");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const role = user?.role;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    getOrders(userId, role)
      .then((data) => setOrders(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, role]);

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(err?.message || "Failed to cancel order");
    }
  };

  const handleView = (order) => {
    navigate(`/orders/${order._id}`);
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

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onView={handleView} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
