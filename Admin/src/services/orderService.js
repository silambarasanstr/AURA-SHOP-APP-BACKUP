import api from "./api";

// Get All Orders
export const getOrders = async (page = 1, limit = 10) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data } = await api.get("/orders", {
    params: {
      page,
      limit,
      userId: user?._id,
      role: user?.role,
    },
  });

  return data;
};

// Get Order By Id
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);

  return data;
};

// Update Order
export const updateOrder = async (id, updates) => {
  const { data } = await api.put(`/orders/${id}`, updates);

  return data;
};

// Get Order Stats
export const getOrderStats = async () => {
  const { data } = await api.get("/orders/stats");

  return data;
};

// Delete Order
export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);

  return data;
};
