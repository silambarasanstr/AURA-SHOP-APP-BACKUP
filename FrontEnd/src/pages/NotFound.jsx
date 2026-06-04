import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center space-y-6">
        {/* 404 Text */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800">404</h1>

        {/* Message */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 text-lg">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Illustration (using text emoji) */}
        <div className="text-6xl">🔍</div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 justify-center sm:flex-row">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link to="#" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
