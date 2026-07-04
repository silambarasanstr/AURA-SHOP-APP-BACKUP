import api from "./api"; // your axios instance

export const getOrders = async (userId, role) => {
  const res = await api.get("/orders", {
    params: { userId, role }, // ✅ sends ?userId=xxx&role=admin
  });
  return res.data;
};

// ✅ new
export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.put(`/orders/${id}`, { status });
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};
