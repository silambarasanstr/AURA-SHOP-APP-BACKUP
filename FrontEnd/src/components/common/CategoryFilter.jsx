const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  allLabel = "All Products",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => onCategoryChange("")}
        className={`px-3 py-2 text-sm rounded-md text-left transition ${
          selectedCategory === ""
            ? "bg-black text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {allLabel}
      </button>

      {categories.length ? (
        categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onCategoryChange(cat._id)}
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
        <p className="py-4 text-sm text-center text-gray-500">
          Categories Not Found 😢
        </p>
      )}
    </div>
  );
};

export default CategoryFilter;