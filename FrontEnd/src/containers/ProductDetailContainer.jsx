import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";
import WishlistButton from "../components/WishlistButton";
import ProductImg from "../../assets/product/product1.png";

const ProductDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cartItems, addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product) {
      document.title = `${product.slug} | My Store`;
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const existingItem = cartItems?.items?.find((i) => i?.product?._id === product._id);
      setQuantity(existingItem ? existingItem.quantity : 1);
    }
  }, [product, cartItems]);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res);
        setSelectedImage(res.image);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
      >
        ★
      </span>
    ));
  };

  const handleIncreaseQuantity = () =>
    setQuantity((prev) => (prev >= product.stock ? prev : prev + 1));

  const handleDecreaseQuantity = () => setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Added to cart");
    setQuantity(1);
  };

  if (loading) return <Loading />;

  if (!product)
    return (
      <div className="py-20 text-xl font-semibold text-center text-red-500">Product not found</div>
    );

  // ✅ Correct price logic using API fields
  const currentPrice = product.price;
  const originalPrice = product.oldPrice || null;
  const hasDiscount = product.discount > 0 && originalPrice;
  const isOutOfStock = product.stock === 0;

  const allImages =
    product.images?.length > 0
      ? [product.image, ...product.images.filter((img) => img !== product.image)]
      : [product.image];

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <div className="grid gap-10 p-6 bg-white border border-gray-300 shadow-xl md:grid-cols-2 rounded-3xl">
        {/* LEFT — Images */}
        <div>
          <div className="overflow-hidden border border-gray-100 rounded-2xl bg-gray-50">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-[480px] object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 pb-1 mt-4 overflow-x-auto">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`View ${index + 1}`}
                  loading="lazy"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer flex-shrink-0 transition-all duration-150 ${
                    selectedImage === img
                      ? "border-green-500 ring-2 ring-green-200 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Details */}
        <div className="flex flex-col justify-center gap-5">
          {/* Title */}
          <div>
            <p className="mb-1 text-sm font-medium tracking-wide text-gray-400 uppercase">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold leading-snug text-gray-900">{product.name}</h1>
          </div>

          {/* Rating + Reviews */}
          <div className="flex items-center gap-3">
            <div className="flex">{renderStars(product.rating || 0)}</div>
            <span className="text-sm font-semibold text-gray-700">{product.rating || 0}</span>
            {product.reviews > 0 && (
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-green-600">
              ₹{Number(currentPrice).toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ₹{Number(originalPrice).toLocaleString("en-IN")}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div
            className="text-sm leading-relaxed prose text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Stock */}
          <div>
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Out of Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                In Stock ({product.stock} available)
              </span>
            )}
          </div>

          {/* Quantity */}
          {!isOutOfStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-600">Quantity</span>
              <div className="flex items-center overflow-hidden border border-gray-200 rounded-xl">
                <button
                  onClick={handleDecreaseQuantity}
                  className="w-10 h-10 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-12 font-semibold text-center text-gray-800">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="w-10 h-10 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              {quantity >= product.stock && (
                <span className="text-xs text-amber-600">Max stock reached</span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all active:scale-95 ${
                isOutOfStock ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-3 font-semibold text-gray-700 transition-all border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95"
            >
              View Cart
            </button>

            {/* ✅ WishlistButton inline with action buttons */}
            <WishlistButton product={product} showText={false} />
          </div>

          {/* Product Info */}
          <div className="p-5 border border-gray-100 bg-gray-50 rounded-2xl">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Product Details
            </h3>
            {[
              { label: "Brand", value: product.brand || "N/A" },
              { label: "Category", value: product.category?.name || "N/A" },
              { label: "SKU", value: product.sku || "N/A" },
              {
                label: "Featured",
                value: product.featured ? (
                  <span className="px-2.5 py-0.5 text-xs font-semibold text-white bg-orange-500 rounded-full">
                    Yes
                  </span>
                ) : (
                  <span className="text-gray-500">No</span>
                ),
              },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={`flex justify-between items-center py-2.5 ${
                  i < arr.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
