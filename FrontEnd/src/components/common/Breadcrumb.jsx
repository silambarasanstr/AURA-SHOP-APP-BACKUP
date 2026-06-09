import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center mb-4 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== items.length - 1 ? (
            <>
              <Link
                to={item.path}
                className="transition-colors hover:text-blue-600"
              >
                {item.label}
              </Link>
              <span className="mx-2">/</span>
            </>
          ) : (
            <span className="font-medium text-gray-900">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;