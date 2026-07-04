import { memo, useCallback } from "react";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
const WishlistButton = memo(({ product, showText = false }) => {
  const dispatch = useDispatch();
  // ✅ Whole array-ஐ subscribe பண்ணாம் — specific product மட்டும்
  const isInWishlist = useSelector((state) =>
    state.wishlist.some((item) => item._id === product._id)
  );
  const toggleWishlist = useCallback(() => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  }, [isInWishlist, product, dispatch]);
  return (
    <button
      onClick={toggleWishlist}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex items-center gap-1.5 rounded-full transition-all duration-200 active:scale-90
        ${showText ? "px-3 py-1.5 text-sm border" : "p-2"}
        ${
          isInWishlist
            ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
            : "text-gray-400 border-gray-200 bg-white/80 hover:text-red-400 hover:bg-red-50 hover:border-red-200"
        }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${isInWishlist ? "fill-red-500 text-red-500 scale-110" : ""}`}
      />
      {showText && (
        <span className="font-medium">{isInWishlist ? "Wishlisted" : "Add to Wishlist"}</span>
      )}
    </button>
  );
});
WishlistButton.displayName = "WishlistButton";
export default WishlistButton;
