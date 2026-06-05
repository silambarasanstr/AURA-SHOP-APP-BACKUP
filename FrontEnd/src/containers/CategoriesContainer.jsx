import { Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import CategoryCard from "../components/common/category/CategoryCard";
import Loading from "../components/common/Loading";
import useFetch from "../hooks/useFetch";


const CategoriesContainer = () => {
  
  const { data: categories, loading, error } = useFetch(getCategories);

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold">Shop By Category</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories
          ?.filter((category) => category.isActive)
          .map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
      </div>
    </div>
  );
};

export default CategoriesContainer;
