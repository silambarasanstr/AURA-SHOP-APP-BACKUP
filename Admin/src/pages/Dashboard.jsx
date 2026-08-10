import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";
import { getAdminProduct, getAdminStats } from "../services/dashboardServices";
import { getOrders } from "../services/orderService";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [productsRes, statsRes, ordersRes] = await Promise.allSettled([
          getAdminProduct(),
          getAdminStats(),
          getOrders(),
        ]);

        // Products
        if (productsRes.status === "fulfilled") {
          setProducts(productsRes.value?.products || []);
        } else {
          console.error("Products Error:", productsRes.reason);
        }

        // Stats
        if (statsRes.status === "fulfilled") {
          setStats(
            statsRes.value || {
              totalUsers: 0,
              totalOrders: 0,
              totalProducts: 0,
              totalRevenue: 0,
            }
          );
        } else {
          console.error("Stats Error:", statsRes.reason);
        }

        // Orders
        if (ordersRes.status === "fulfilled") {
          setOrders(ordersRes.value?.orders || ordersRes.value || []);
        } else {
          console.error("Orders Error:", ordersRes.reason);
        }

        // Show error only if every request failed
        if (
          productsRes.status === "rejected" &&
          statsRes.status === "rejected" &&
          ordersRes.status === "rejected"
        ) {
          setError("Failed to load dashboard data.");
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const formatPrice = (n = 0) =>
    Number(n).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Orders */}
        <div className="p-5 transition duration-200 bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>

              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </h2>

              <p className="mt-1 text-xs text-gray-400">All orders</p>
            </div>

            <div className="flex items-center justify-center w-12 h-12 text-blue-600 transition rounded-xl bg-blue-50 group-hover:bg-blue-100">
              <ShoppingCart size={23} />
            </div>
          </div>
        </div>

        {/* Total Sales */}
        <div className="p-5 transition duration-200 bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>

              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                ₹{formatPrice(stats.totalRevenue)}
              </h2>

              <p className="mt-1 text-xs text-gray-400">Total revenue</p>
            </div>

            <div className="flex items-center justify-center w-12 h-12 text-green-600 transition rounded-xl bg-green-50 group-hover:bg-green-100">
              <IndianRupee size={23} />
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="p-5 transition duration-200 bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:border-purple-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Customers</p>

              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {stats.totalUsers}
              </h2>

              <p className="mt-1 text-xs text-gray-400">Registered customers</p>
            </div>

            <div className="flex items-center justify-center w-12 h-12 text-purple-600 transition rounded-xl bg-purple-50 group-hover:bg-purple-100">
              <Users size={23} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Recent Orders
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Latest customer orders
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/orders")}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              View All
            </button>
          </div>

          {/* Orders */}
          <div className="p-4">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-full">
                  <ShoppingCart size={22} className="text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  No orders found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Recent orders will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.slice(0, 5).map((order) => {
                  const status = order.status || "Pending";

                  const statusStyles = {
                    Completed: "bg-green-50 text-green-600 ring-green-100",
                    Pending: "bg-yellow-50 text-yellow-600 ring-yellow-100",
                    Cancelled: "bg-red-50 text-red-600 ring-red-100",
                    Processing: "bg-blue-50 text-blue-600 ring-blue-100",
                    Shipped: "bg-purple-50 text-purple-600 ring-purple-100",
                  };

                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between px-4 py-3 transition duration-200 border border-gray-100 rounded-lg group bg-gray-50/50 hover:border-blue-100 hover:bg-blue-50/30"
                    >
                      {/* Order Info */}
                      <div className="flex items-center min-w-0 gap-3">
                        {/* Order Icon */}
                        <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-lg shrink-0">
                          <ShoppingCart size={18} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 truncate">
                            #
                            {order.orderNumber ||
                              order._id.slice(-6).toUpperCase()}
                          </h3>

                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{order.items?.length || 0} Item(s)</span>

                            <span className="text-gray-300">•</span>

                            <span className="font-medium text-gray-700">
                              ₹{formatPrice(order.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                          statusStyles[status] ||
                          "bg-gray-50 text-gray-600 ring-gray-100"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Recent Products
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Latest products added
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              View All
            </button>
          </div>

          {/* Products */}
          <div className="p-4">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-full">
                  <Package size={22} className="text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-600">
                  No products found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Recently added products will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-3 transition duration-200 border border-gray-100 rounded-lg group bg-gray-50/50 hover:border-blue-100 hover:bg-blue-50/30"
                  >
                    {/* Product Info */}
                    <div className="flex items-center min-w-0 gap-3">
                      {/* Product Image */}
                      <div className="w-12 h-12 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full transition duration-200 group-hover:scale-105"
                        />
                      </div>

                      {/* Name + Price */}
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-green-600">
                          ₹{formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Product Status / Arrow */}
                    <div className="ml-3 shrink-0">
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 ring-1 ring-green-100">
                        Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
