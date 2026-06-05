import { Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import CategoryCard from "../components/common/category/CategoryCard";
import Loading from "../components/common/Loading";
import useFetch from "../hooks/useFetch";


const CategoriesContainer = () => {
  const { data: categories, loading } = useFetch(getCategories);

  if (loading) {
    return <Loading />;
  }

  const activeCategories =
    categories?.filter((category) => category.isActive) || [];

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-2xl font-bold">Shop By Category</h1>

      {activeCategories.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">Categories will be available soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {activeCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesContainer;
