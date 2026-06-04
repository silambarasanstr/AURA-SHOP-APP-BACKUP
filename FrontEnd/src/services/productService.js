import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/products",
});

export const getProducts = async ({
  search = "",
  page = 1,
  limit = 12,
} = {}) => {
  const { data } = await api.get("/", {
    params: { search, page, limit },
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/${id}`);
  return data;
};