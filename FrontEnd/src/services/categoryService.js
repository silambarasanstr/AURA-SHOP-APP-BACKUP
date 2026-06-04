import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/categories";

export const getCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};