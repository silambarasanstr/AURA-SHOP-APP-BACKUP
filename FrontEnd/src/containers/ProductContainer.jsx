import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/common/ProductSkeleton";
import Pagination from "../components/common/Pagination";
import SearchInput from "../components/common/SearchInput";
import CategoryFilter from "../components/common/CategoryFilter";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { useCart } from "../context/CartContext";
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
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParam, category, pageParam]);

  const handleSearch = (value) => {
    setSearchParams({
      search: value,
      category,
      page: 1,
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSearchParams({
      search: searchParam,
      category: categoryId,
      page: 1,
    });
  };

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
        <aside className="w-full p-4 bg-white border rounded-lg shadow-sm md:w-64 h-fit">
          <h2 className="mb-3 text-lg font-semibold">Categories</h2>

          <CategoryFilter
            categories={categories || []}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            allLabel="All Products"
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Our Products</h1>
            <p className="mt-1 text-gray-500">Browse our latest collection</p>
          </div>

          {/* Search */}
          <div className="mb-5">
            <SearchInput
              value={searchParam}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center">
              <div className="mb-4 text-6xl">📦</div>

              <h2 className="text-2xl font-semibold">No Products Found</h2>

              <p className="mt-2 text-gray-500">Try changing your search or category filter.</p>
            </div>
          ) : (
            <>
              {/* Product Count */}
              <div className="mb-4 text-sm text-gray-500">{products.length} products found</div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} addToCart={addToCart} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  page={pageParam}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductContainer;
