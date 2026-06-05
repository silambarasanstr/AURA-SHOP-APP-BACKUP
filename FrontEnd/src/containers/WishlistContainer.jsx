import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

const NO_IMAGE = "https://via.placeholder.com/300?text=No+Image";

const WishlistContainer = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist || []);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  // Empty
  if (!wishlist.length || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2 text-center px-4">
        <p className="text-4xl">❤️ </p>
        <h2 className="text-xl font-semibold text-gray-800">No items in wishlist</h2>
        <p className="text-sm text-gray-500">Your selected items will appear here.</p>
        <Link
          to="/"
          className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-3 py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Wishlist ({wishlist.length})</h1>

        <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((product) => (
          <div
            key={product?._id}
            className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <Link to={`/products/${product?._id}`}>
              <div className="overflow-hidden bg-gray-100 h-52">
                <img
                  src={product?.image || NO_IMAGE}
                  alt={product?.name || "Product"}
                  className="object-cover w-full h-full transition duration-300 hover:scale-105"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product?._id}`}>
                <h3 className="mb-2 font-semibold text-gray-800 line-clamp-1">{product?.name}</h3>
              </Link>

              <p className="mb-4 text-xl font-bold text-green-600">
                ₹{Number(product?.price || 0).toLocaleString("en-IN")}
              </p>

              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600 active:scale-95"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistContainer;
