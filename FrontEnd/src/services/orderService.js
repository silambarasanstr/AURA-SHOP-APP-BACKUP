import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/orders";

export const getOrders = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axios.get(API_URL, {
    params: {
      userId: user?._id,
      role: user?.role,
    },
  });

  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};