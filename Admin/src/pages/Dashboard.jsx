import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";
import { getOrders, deleteOrder } from "../services/orderService";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      console.log(data, "===>");
    } catch (error) {
      console.error(error);
    }
  };

  const recentOrders = [
    {
      id: "#ORD-1001",
      customer: "Simbu",
      amount: "₹999",
      status: "Delivered",
    },
    {
      id: "#ORD-1002",
      customer: "Kumar",
      amount: "₹1499",
      status: "Pending",
    },
    {
      id: "#ORD-1003",
      customer: "Raj",
      amount: "₹699",
      status: "Delivered",
    },
  ];

   const formatPrice = (n) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-gray-500">Welcome back, Admin 👋</p>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Products</p>
              <h2 className="text-3xl font-bold"> {stats.totalProducts}</h2>
            </div>
            <Package size={40} className="text-blue-500" />
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h2 className="text-3xl font-bold">{stats.totalOrders}</h2>
            </div>
            <ShoppingCart size={40} className="text-green-500" />
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Sales</p>
              <h2 className="text-3xl font-bold">
                ₹{stats.totalRevenue.toLocaleString()}
              </h2>
            </div>
            <IndianRupee size={40} className="text-yellow-500" />
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Customers</p>
              <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
            </div>
            <Users size={40} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
  {/* Recent Orders */}
  <div className="p-5 bg-white shadow rounded-xl">
    <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>

    <div className="space-y-3">
      {orders?.slice(0, 5).map((order) => (
        <div
          key={order._id}
          className="flex items-center justify-between p-3 border rounded-lg"
        >
          <div>
            <h3 className="font-semibold">
               #{order.orderNumber || order._id.slice(-6).toUpperCase()}
            </h3>

            <p className="text-sm text-gray-500">
              {order.items?.length} Item(s)
            </p>

            <p className="text-sm font-medium text-gray-700">
             ₹{formatPrice(order.totalPrice)}
            </p>
          </div>

          <div className="text-right">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Top Products */}
  <div className="p-5 bg-white shadow rounded-xl">
    <h2 className="mb-4 text-xl font-semibold">Top Products</h2>

    <div className="space-y-3">
      {products?.slice(0, 5).map((product) => (
        <div
          key={product._id}
          className="flex items-center gap-3 p-2 border rounded-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-16 h-16 rounded"
          />

          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600">₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  );
};

export default Dashboard;
