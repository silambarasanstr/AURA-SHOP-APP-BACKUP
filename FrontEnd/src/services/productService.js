import api from "./api";

export const getProducts = async ({ search = "", page = 1, limit = 12, category = "" } = {}) => {
  const { data } = await api.get("/products", {
    params: { search, page, limit, category },
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
