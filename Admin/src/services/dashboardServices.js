import api from "./api";

export const getAdminProduct = async () => {
  const { data } = await api.get("/admin/products");
  return data;
};

export const getAdminStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

export const getAdminOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};
