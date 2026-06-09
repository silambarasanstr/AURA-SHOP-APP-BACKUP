import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";


const WishlistButton = ({ product, showText = false }) => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center gap-1.5 rounded-full transition-all duration-200 active:scale-90
        ${showText
          ? "px-3 py-1.5 text-sm border"
          : "p-2"
        }
        ${isInWishlist
          ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
          : "text-gray-400 border-gray-200 bg-white/80 hover:text-red-400 hover:bg-red-50 hover:border-red-200"
        }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          isInWishlist ? "fill-red-500 text-red-500 scale-110" : ""
        }`}
      />
      {showText && (
        <span className="font-medium">
          {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;