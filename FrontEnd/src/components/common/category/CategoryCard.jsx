import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="overflow-hidden transition-all duration-300 bg-white border border-gray-300 shadow-md rounded-xl hover:shadow-xl group"
    >
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{category.name}</h2>

        <p className="mt-1 text-sm text-gray-500">
          Browse {category.name} products
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;