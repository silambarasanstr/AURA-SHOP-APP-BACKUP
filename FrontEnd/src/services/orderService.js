import api from "./api";

export const getOrders = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await api.get("/orders", {
    params: {
      userId: user?._id,
      role: user?.role,
    },
  });

  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};
