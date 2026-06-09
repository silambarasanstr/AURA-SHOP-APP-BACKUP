import { useState, useMemo } from "react";
import { getCategories } from "../services/categoryService";
import CategoryCard from "../components/common/category/CategoryCard";
import Loading from "../components/common/Loading";
import useFetch from "../hooks/useFetch";
import Breadcrumb from "../components/common/Breadcrumb";
import SearchInput from "../components/common/SearchInput";
import SelectField from "../components/common/SelectField";
import { Grid2X2, List } from "lucide-react";
import ViewToggle from "../components/common/ViewToggle";
import usePageTitle from "../hooks/usePageTitle";

const SORT_OPTIONS = [
  { value: "default", label: "Sort: Default" },
  { value: "az", label: "A – Z" },
  { value: "za", label: "Z – A" },
  { value: "most", label: "Most products" },
];

const CategoriesContainer = () => {
  usePageTitle("Categories | My Store");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  const { data: categories, loading } = useFetch(getCategories);

  const activeCategories = useMemo(() => {
    let list = categories?.filter((c) => c.isActive) || [];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (sortBy === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === "most")
      list = [...list].sort((a, b) => (b.productCount ?? 0) - (a.productCount ?? 0));

    return list;
  }, [categories, search, sortBy]);

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop By Category</h1>
        <p className="mt-1 text-gray-500">
          {activeCategories.length} categor{activeCategories.length === 1 ? "y" : "ies"} available
        </p>
      </div>

      {/* Search, sort & view controls */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search categories..." />
        </div>
        <SelectField value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {/* Category grid / empty states */}
      {categories?.filter((c) => c.isActive).length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">Categories will be available soon.</p>
        </div>
      ) : activeCategories.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">No categories match "{search}".</p>
          <button
            onClick={() => setSearch("")}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "flex flex-col gap-4"
          }
        >
          {activeCategories.map((category) => (
            <CategoryCard key={category._id} category={category} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesContainer;
