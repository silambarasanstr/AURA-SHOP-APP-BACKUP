import api from "./api";

// Get All Categories
export const fetchCategories = async () => {
  const { data } = await api.get("/categories");

  return data;
};
