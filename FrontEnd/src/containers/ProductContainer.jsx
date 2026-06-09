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
import SelectField from "../components/common/SelectField";
import usePageTitle from "../hooks/usePageTitle";

const SORT_OPTIONS = [
  { value: "", label: "Sort: Default" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" }, // ← add this
];

const ProductContainer = () => {
  usePageTitle("Products | My Store");
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const pageParam = Number(searchParams.get("page")) || 1;
  const sortParam = searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { data: categoriesData } = useFetch(getCategories);

  const activeCategories = categoriesData?.filter((c) => c.isActive) || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(true);

        const data = await getProducts({
          search: searchParam,
          category,
          page: pageParam,
          limit: 8,
          sort: sortParam,
        });

        setProducts(data?.products || []);
        setTotalPages(data?.pages || 1);
        setTotalCount(data?.total || 0); // total from API, not per-page slice
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParam, category, pageParam, sortParam]);

  const updateParams = (updates) => {
    const next = {
      search: searchParam,
      category,
      page: pageParam,
      sort: sortParam,
      ...updates,
    };

    const cleaned = {};
    Object.entries(next).forEach(([key, val]) => {
      const str = String(val);
      // Keep page always, drop empty strings and nulls
      if (key === "page") {
        cleaned[key] = str; // always include page
      } else if (str !== "" && str !== "null" && str !== "undefined") {
        cleaned[key] = str;
      }
    });

    setSearchParams(cleaned);
  };

  const handleSearch = (value) => updateParams({ search: value, page: 1 });
  const handleCategoryChange = (id) => updateParams({ category: id, page: 1 });
  const handlePageChange = (pg) => updateParams({ page: pg });
  const handleSortChange = (val) => updateParams({ sort: val, page: 1 });
  const hasActiveFilters = searchParam !== "" || category !== "";
  const clearFilters = () => setSearchParams({});

  return (
    <div className="px-3 py-4 mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full bg-white border border-gray-200 shadow-sm rounded-xl md:w-64 h-fit">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Categories</h2>
              {category && (
                <button
                  onClick={() => handleCategoryChange("")}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter list */}
            <div className="p-2">
              <CategoryFilter
                categories={activeCategories}
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
                allLabel="All Products"
              />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <h1 className="text-3xl font-bold">Our Products</h1>
              <p className="mt-1 text-sm text-gray-500">Browse our latest collection</p>
            </div>

            {/* Sort */}
            <SelectField value={sortParam} onChange={handleSortChange} options={SORT_OPTIONS} />
          </div>

          {/* Search */}
          <div className="mb-4">
            <SearchInput
              value={searchParam}
              onChange={handleSearch}
              placeholder="Search products..."
            />
          </div>

          {/* Active filters bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {searchParam && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 rounded-full bg-blue-50">
                  Search: "{searchParam}"
                  <button onClick={() => handleSearch("")} className="ml-1 hover:text-blue-900">
                    ✕
                  </button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 rounded-full bg-blue-50">
                  Category: {activeCategories.find((c) => c.slug === category)?.name || category}
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ✕
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-gray-600 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mb-4 text-6xl">📦</div>
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="mt-2 text-gray-500">Try changing your search or category filter.</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Total count from API */}
              <div className="mb-4 text-sm text-gray-500">
                {totalCount > 0
                  ? `Showing ${products.length} of ${totalCount} products`
                  : `${products.length} products found`}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                ))}
              </div>

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
