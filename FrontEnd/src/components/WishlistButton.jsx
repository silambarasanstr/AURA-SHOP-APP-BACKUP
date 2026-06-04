import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

const WishlistButton = ({ product, showText = false }) => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const isInWishlist = wishlist.some(
    (item) => item._id === product._id
  );

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
      className={`border border-[#fefcfc5c] text-sm px-2 py-2 rounded-md flex items-center gap-2 bg-[#12131698]
      ${
        isInWishlist
          ? "text-red-500 hover:text-red-600"
          : "text-gray-200"
      }`}
    >
      <Heart
        className={`w-4 h-4 ${
          isInWishlist ? "fill-red-500 text-red-500" : ""
        }`}
      />

      {showText && (
        <span>
          {isInWishlist ? "Remove Wishlist" : "Add Wishlist"}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;