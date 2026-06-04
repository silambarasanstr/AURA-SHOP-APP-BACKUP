export const fetchCategories = async () => {
  const res = await fetch("http://localhost:5000/api/categories");
  return await res.json();
};