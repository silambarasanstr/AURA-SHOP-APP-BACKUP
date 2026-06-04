import useFetch from "../hooks/useFetch";
import { getCategories } from "../services/categoryService";

const HomeContainer = () => {
  const { data: categories, loading, error } = useFetch(getCategories);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-gray-500 animate-pulse">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="px-5 py-10 mx-auto max-w-7xl">
      <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
        {categories?.length ? (
          categories.map((category) => (
            <div
              key={category._id || category.id}
              className="relative overflow-hidden transition-all duration-300 border border-gray-400 shadow-md cursor-pointer group rounded-2xl hover:shadow-xl"
            >
              {/* Image */}
              <div className="overflow-hidden bg-gray-100 h-44">
                <img
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Text */}
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-xs opacity-80">Explore products</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 col-span-full">No categories found.</div>
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
