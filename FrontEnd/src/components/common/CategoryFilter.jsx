// components/common/CategoryFilter.jsx
const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  allLabel = "All Products",
}) => {
  return (
    <div className="flex flex-col gap-0.5">

      {/* All Products */}
      <button
        onClick={() => onCategoryChange("")}
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
          selectedCategory === ""
            ? "bg-blue-50 text-blue-700 font-medium"
            : "hover:bg-gray-50 text-gray-600"
        }`}
      >
        <span>{allLabel}</span>
        {selectedCategory === "" && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
        )}
      </button>

      {categories.length ? (
        categories.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <span>{cat.name}</span>
              <span className="flex items-center gap-1.5">
                {cat.productCount != null && (
                  <span className={`text-xs ${isActive ? "text-blue-500" : "text-gray-400"}`}>
                    {cat.productCount}
                  </span>
                )}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </span>
            </button>
          );
        })
      ) : (
        <p className="py-4 text-sm text-center text-gray-400">
          No categories found
        </p>
      )}

    </div>
  );
};

export default CategoryFilter;