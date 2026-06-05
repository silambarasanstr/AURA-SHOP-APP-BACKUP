import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { useCart } from "../context/CartContext";
import Loading from "../components/common/Loading";
import Pagination from "../components/common/Pagination";
import SearchInput from "../components/common/SearchInput";
import CategoryFilter from "../components/common/CategoryFilter";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ProductContainer = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const pageParam = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const { data: categories } = useFetch(getCategories);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          search: searchParam,
          category,
          page: pageParam,
          limit: 5,
        });

        setProducts(data?.products || []);
        setTotalPages(data?.pages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParam, category, pageParam]);

  // Search
  const handleSearch = (value) => {
    setSearchParams({
      search: value,
      category,
      page: 1,
    });
  };

  // Category change
  const handleCategoryChange = (categoryId) => {
    setSearchParams({
      search: searchParam,
      category: categoryId,
      page: 1,
    });
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setSearchParams({
      search: searchParam,
      category,
      page: newPage,
    });
  };

  return (
    <div className="px-3 py-4 mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full p-3 bg-white border rounded md:w-60 h-fit">
          <h2 className="mb-3 font-semibold">Categories</h2>

          <CategoryFilter
            categories={categories || []}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            allLabel="All Products"
          />
        </aside>

        {/* Main */}
        <main className="flex-1">
          <SearchInput
            value={searchParam}
            onChange={handleSearch}
            placeholder="Search products..."
          />

          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No Products Found 😢</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mt-5 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>

              <Pagination
                page={pageParam}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductContainer;