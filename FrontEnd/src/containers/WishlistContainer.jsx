import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Heart, Share2, ShoppingCart, ArrowRight, Bell, Check } from "lucide-react";
import { removeFromWishlist, clearWishlist } from "../features/wishlist/wishlistSlice";
import EmptyState from "../components/common/EmptyState";
import usePageTitle from "../hooks/usePageTitle";
import ProductImg from "../../assets/product/product1.png";
import SelectField from "../components/common/SelectField";
import WishlistCard from "../components/wishlist/WishlistCard";
import Toast from "../components/wishlist/Toast";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Date Added" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name" },
];

// --- Main Component ---
const WishlistContainer = ({ onAddToCart }) => {
  usePageTitle("Wishlist | My Store");
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist || []);

  const [sortBy, setSortBy] = useState("date_desc");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  // Sorted wishlist
  const sortedWishlist = useMemo(() => {
    const list = [...wishlist];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price_desc":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name_asc":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "date_desc":
      default:
        return list.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    }
  }, [wishlist, sortBy]);

  const availableItems = useMemo(
    () => sortedWishlist.filter((p) => p?.stock !== 0 && p?.status !== "out_of_stock"),
    [sortedWishlist]
  );

  const totalValue = useMemo(
    () => availableItems.reduce((sum, p) => sum + Number(p?.price || 0), 0),
    [availableItems]
  );

  // Selection
  const allSelected = selectedIds.size === sortedWishlist.length && sortedWishlist.length > 0;

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedWishlist.map((p) => p._id)));
    }
  };

  // Actions
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    showToast("Removed from wishlist");
  };

  const handleClearAll = () => {
    dispatch(clearWishlist());
    setSelectedIds(new Set());
    showToast("Wishlist cleared");
  };

  const handleAddToCart = (product) => {
    onAddToCart?.(product);
    showToast(`"${product.name}" added to cart`);
  };

  const handleMoveToCart = (product) => {
    onAddToCart?.(product);
    dispatch(removeFromWishlist(product._id));
    showToast(`"${product.name}" moved to cart`);
  };

  const handleAddSelected = () => {
    const selected = sortedWishlist.filter((p) => selectedIds.has(p._id));
    selected.forEach((p) => onAddToCart?.(p));
    showToast(`${selected.length} item${selected.length > 1 ? "s" : ""} added to cart`);
    setSelectedIds(new Set());
  };

  const handleAddAll = () => {
    availableItems.forEach((p) => onAddToCart?.(p));
    showToast(`${availableItems.length} items added to cart`);
  };

  const handleShare = () => {
    const ids = wishlist.map((p) => p._id).join(",");
    const url = `${window.location.origin}/wishlist?items=${ids}`;
    navigator.clipboard.writeText(url).then(() => showToast("Wishlist link copied!"));
  };

  // Empty state
  if (!wishlist.length) {
    return (
      <EmptyState
        icon={<Heart size={48} />}
        title="No items in Wishlist"
        description="Your selected items will appear here."
        buttonText="Continue Shopping"
        buttonLink="/"
      />
    );
  }

  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 text-sm text-red-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
          >
            <Trash2 size={14} />
            Clear all
          </button>
          <Link to="/" className="ml-1 text-sm font-medium text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by</span>

          <SelectField value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="rounded cursor-pointer accent-blue-600"
            />
            Select all
          </label>
          {selectedIds.size > 0 && (
            <button
              onClick={handleAddSelected}
              className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              <ShoppingCart size={14} />
              Add {selectedIds.size} to cart
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedWishlist.map((product) => (
          <WishlistCard
            key={product._id}
            product={product}
            selected={selectedIds.has(product._id)}
            onSelect={toggleSelect}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
            onMoveToCart={handleMoveToCart}
          />
        ))}
      </div>

      {/* Summary bar */}
      {availableItems.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 mt-6 border border-gray-200 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{availableItems.length} items</span>{" "}
            available · Total{" "}
            <span className="font-semibold text-gray-800">
              ₹{totalValue.toLocaleString("en-IN")}
            </span>
          </p>
          <button
            onClick={handleAddAll}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-95"
          >
            <ShoppingCart size={14} />
            Add all to cart
          </button>
        </div>
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};

export default WishlistContainer;
