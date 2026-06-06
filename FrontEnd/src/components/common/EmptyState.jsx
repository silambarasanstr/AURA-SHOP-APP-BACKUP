import { Link } from "react-router-dom";

const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink = "/",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 px-4 text-center">
      {icon && <div className="text-gray-400">{icon}</div>}

      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      <p className="text-sm text-gray-500">
        {description}
      </p>

      {buttonText && (
        <Link
          to={buttonLink}
          className="px-4 py-2 mt-2 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;