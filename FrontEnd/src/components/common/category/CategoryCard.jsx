import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import ProductImg from "../../../../assets/product/product1.png";

const CategoryCard = ({ category, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <Link
        to={`/products?category=${category.slug}`}
        className="flex items-center gap-4 overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 group"
      >
        {/* Thumbnail */}
        <div className="h-24 overflow-hidden w-28 shrink-0">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-3">
          <h2 className="text-base font-semibold text-gray-900 truncate">{category.name}</h2>
          <p className="mt-0.5 text-sm text-gray-500 truncate">
            {category.description || `Browse ${category.name} products`}
          </p>
          {category.productCount != null && (
            <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              <Tag size={10} />
              {category.productCount} products
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="pr-4 text-gray-300 transition-colors duration-200 shrink-0 group-hover:text-blue-500">
          <ArrowRight size={18} />
        </div>
      </Link>
    );
  }

  // Grid mode (default)
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-semibold leading-snug text-gray-900">{category.name}</h2>
          {category.productCount != null && (
            <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              <Tag size={10} />
              {category.productCount} products
            </span>
          )}
        </div>

        <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {category.description || `Browse ${category.name} products`}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 transition-all duration-200 group-hover:gap-2">
          Browse
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
