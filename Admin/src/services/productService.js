import api from "./api";

// Get All Products
export const fetchProducts = async (params = {}) => {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
};

// Create Product
export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};

// Update Product
export const updateProductApi = async (id, updatedData) => {
  const { data } = await api.put(`/products/${id}`, updatedData);

  return data;
};

// Get Product By Id
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};
