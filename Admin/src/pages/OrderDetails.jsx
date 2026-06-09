import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit2,
  FiPrinter,
  FiDownload,
  FiCheckCircle,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import { getOrders, updateOrder } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const STATUS_COLORS = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Processing: "bg-blue-100 text-blue-800 border-blue-300",
    Completed: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  const STATUS_ICONS = {
    Pending: <FiClock className="inline mr-2" size={20} />,
    Processing: <FiTruck className="inline mr-2" size={20} />,
    Completed: <FiCheckCircle className="inline mr-2" size={20} />,
    Cancelled: <FiArrowLeft className="inline mr-2" size={20} />,
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      const ordersArray = Array.isArray(data) ? data : data.orders || [];
      const foundOrder = ordersArray.find((o) => o._id === id || o.id === id);

      if (foundOrder) {
        setOrder(foundOrder);
        setNewStatus(foundOrder.status);
        setError(null);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError("Failed to load order details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateOrder(id, { status: newStatus });
      setOrder({ ...order, status: newStatus });
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update order status");
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented with a PDF library");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen p-4 bg-gray-50 md:p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700"
          >
            <FiArrowLeft />
            Back to Orders
          </button>
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <p className="text-lg text-gray-500">Order not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6 print:bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
          >
            <FiArrowLeft />
            Back to Orders
          </button>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              <FiPrinter />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FiDownload />
              Download
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        {/* Order Header Card */}
        <div className="p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Order Details
              </h1>
              <p className="text-gray-600">
                Order ID:{" "}
                <span className="font-mono font-semibold">
                  {" "}
                  #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                </span>
              </p>
              <p className="mt-1 text-gray-600">
                Date: {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              {isEditing ? (
                <div className="flex w-full gap-2 md:w-auto">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewStatus(order.status);
                    }}
                    className="px-4 py-2 text-gray-700 transition bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {STATUS_ICONS[order.status]}
                    {order.status}
                  </span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 mt-3 font-medium text-blue-600 hover:text-blue-700 print:hidden"
                  >
                    <FiEdit2 size={16} />
                    Edit Status
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {/* Billing Address */}
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Billing Address
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.address?.fullName || order.address?.fullName}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.address?.streetAddress || "3/19 Pilliyar Koil St"}{" "}
                {order.address?.city || "Chennai"},{" "}
                {order.address?.state || "Tamil Nadu"}{" "}
              </p>
              <p>
                {order.address?.city},{order.address?.state}
                {order.address?.zipCode}
              </p>
              <p>{order.address?.country}</p>
              <p className="pt-2 border-t">
                <span className="font-semibold">Email:</span>{" "}
                {order.address?.email || "admin@example.com"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>
                {order.address?.phone || "123-456-7890"}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Shipping Address
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.address?.fullName || order.address?.fullName}
              </p>

              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.address?.streetAddress || "3/19 Pilliyar Koil St"}{" "}
                {order.address?.city || "Chennai"},{" "}
                {order.address?.state || "Tamil Nadu"}{" "}
              </p>
              <p>
                <span className="font-semibold">Phone Number:</span>{" "}
                {order.address?.phoneNumber || "123-456-7890"}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{" "}
                {order.address?.pincode || "632517"}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Order Items</h2>
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">
                    Product
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center text-gray-900">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center text-gray-900">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <p className="font-medium">{item.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      ₹{item.price?.toLocaleString() || 0}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">
                      {item.qty}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-300">
            <span className="text-lg font-bold text-gray-900">
              Total Amount:
            </span>
            <span className="text-3xl font-bold text-blue-600">
              ₹{order.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default OrderDetails;
