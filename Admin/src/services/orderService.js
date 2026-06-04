import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/orders";

export const getOrders = async (page = 1, limit = 10) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const params = {
      page,
      limit,
      userId: user?._id,
      role: user?.role,
    };

    const res = await axios.get(API_URL, { params });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    throw error;
  }
};

export const updateOrder = async (id, updates) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updates);
    return res.data;
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw error;
  }
};

export const getOrderStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/stats`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch order stats:", error);
    throw error;
  }
};