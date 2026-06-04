export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`http://localhost:5000/api/products?${query}`);

  const data = await res.json();
  return data;
};

export const createProduct = async (productData) => {
  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const updateProductApi = async (id, updatedData) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  return data;
};

export const fetchProductById = async (id) => {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}`
  );

  return await res.json();
};
