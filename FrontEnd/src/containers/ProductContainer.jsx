import { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { FourSquare } from "react-loading-indicators";
import { useCart } from "../context/CartContext";

const ProductContainer = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ---------------- FETCH CATEGORIES ----------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          search,
          category: selectedCategory,
          page,
          limit: 8,
        });

        setProducts(data?.products || []);
        setTotalPages(data?.pages || 1);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, page, selectedCategory]);

  // ---------------- FILTER PRODUCTS ----------------
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter((product) => product?.category?._id === selectedCategory);
  }, [products, selectedCategory]);

  // ---------------- SEARCH ----------------
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // ---------------- CATEGORY ----------------
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setPage(1);
  };

  return (
    <div className="px-3 py-4 mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* LEFT SIDEBAR */}
        <aside className="w-full p-3 bg-white border border-gray-200 rounded shadow-sm md:w-60 h-fit">
          <h2 className="mb-3 text-base font-semibold text-gray-800">Categories</h2>

          <div className="flex flex-col gap-1">
            {/* ALL PRODUCTS */}
            <button
              onClick={() => handleCategoryChange("")}
              className={`px-3 py-2 text-sm rounded-md text-left transition ${
                selectedCategory === "" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              All Products
            </button>

            {/* CATEGORY LIST */}
            {categories?.length ? (
              categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat._id)}
                  className={`px-3 py-2 text-sm rounded-md text-left transition ${
                    selectedCategory === cat._id
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))
            ) : (
              <p className="py-4 text-sm text-center text-gray-500">Categories Not Found 😢</p>
            )}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1">
          {/* SEARCH */}
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <FourSquare color="#000000" size="small" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-[40vh]">
              <p className="text-sm text-gray-500">No Products Found 😢</p>
            </div>
          ) : (
            <>
              {/* PRODUCTS */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1.5 text-sm border rounded-md transition ${
                        page === p ? "bg-black text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductContainer;
