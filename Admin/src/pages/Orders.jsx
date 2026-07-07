import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiDownload,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  getOrders,
  deleteOrder,
  getOrderStats,
} from "../services/orderService";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });

  const STATUS_COLORS = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();
    getOrderStats();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      const ordersArray = Array.isArray(data) ? data : data.orders || [];
      setOrders(ordersArray);
      setFilteredOrders(ordersArray);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getOrderStats();

      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    let filtered = orders;

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.address?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.address?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, orders]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await deleteOrder(orderId);
      await fetchOrders();
      await fetchStats();

      setError(null);
    } catch (err) {
      setError("Failed to delete order");
      console.error(err);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredOrders, null, 2);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr)
    );
    element.setAttribute("download", `orders-${Date.now()}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Orders</h1>
          <p className="mb-6 text-gray-500">
            Manage all customer orders in one place 👋
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Total Orders */}
          <div className="p-5 transition-all duration-300 border border-gray-300 rounded shadow-sm cursor-pointer bg-gradient-to-br from-blue-50 to-white hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Orders
                </p>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  {stats.totalOrders}
                </h2>
              </div>
              <div className="flex items-center justify-center w-12 h-12 text-xl bg-blue-100 rounded-xl">
                📦
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="p-5 transition-all duration-300 border border-gray-300 rounded shadow-sm cursor-pointer bg-gradient-to-br from-yellow-50 to-white hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <h2 className="mt-2 text-4xl font-bold text-yellow-600">
                  {stats.pendingOrders}
                </h2>
              </div>
              <div className="flex items-center justify-center w-12 h-12 text-xl bg-yellow-100 rounded-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="p-5 transition-all duration-300 border border-gray-300 rounded shadow-sm cursor-pointer bg-gradient-to-br from-green-50 to-white hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <h2 className="mt-2 text-4xl font-bold text-green-600">
                  {stats.deliveredOrders}
                </h2>
              </div>
              <div className="flex items-center justify-center w-12 h-12 text-xl bg-green-100 rounded-xl">
                ✅
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="p-5 transition-all duration-300 border border-gray-300 rounded shadow-sm cursor-pointer bg-gradient-to-br from-purple-50 to-white hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <h2 className="mt-2 text-3xl font-bold text-purple-600">
                  ₹{stats.totalRevenue.toLocaleString()}
                </h2>
              </div>
              <div className="flex items-center justify-center w-12 h-12 text-xl bg-purple-100 rounded-xl">
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        {/* Filters Section */}
        <div className="p-6 mb-6 bg-white border border-gray-300 rounded shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Search Orders
              </label>
              <div className="relative">
                <FiSearch
                  className="absolute text-gray-400 left-3 top-3"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, order ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              <FiDownload size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden bg-white border border-gray-300 rounded shadow">
          {paginatedOrders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-md">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order, idx) => (
                    <tr
                      key={order._id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-sm text-gray-900">
                        #
                        {order.orderNumber || order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.address?.fullName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.address?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{order.totalPrice?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            STATUS_COLORS[order.status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/order-details/${order._id}`)
                            }
                            className="p-2 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="p-2 text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={18} />
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
