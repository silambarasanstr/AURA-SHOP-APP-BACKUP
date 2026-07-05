import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("=======>MODE:", import.meta.env.MODE);
console.log("=======>API_URL:", import.meta.env.VITE_API_URL);

export default api;
