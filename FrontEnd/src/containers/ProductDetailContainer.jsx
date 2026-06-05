import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

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
        className={index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  const handleQuantityChange = (type) => {
    if (type === "inc" && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }

    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    alert("Product added to cart");
  };

  if (loading) {
    return <div className="py-20 text-xl font-semibold text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="py-20 text-xl font-semibold text-center text-red-500">Product not found</div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <div className="grid gap-10 p-6 bg-white shadow-xl md:grid-cols-2 rounded-3xl">
        {/* LEFT SECTION */}
        <div>
          {/* Main Image */}
          <div className="overflow-hidden border rounded-2xl">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images?.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {[product.image, ...product.images].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition ${
                    selectedImage === img
                      ? "border-green-500 ring-2 ring-green-300"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-bold text-green-600">
              ₹{product.finalPrice || product.price}
            </span>

            {product.discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.price}</span>

                <span className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="text-xl">{renderStars(product.rating || 0)}</div>

            <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              {product.rating || 0}/5
            </span>
          </div>

          {/* Description */}
          <div className="mb-5 leading-relaxed text-gray-600">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>

          {/* Stock */}
          <div className="mb-5">
            {product.stock > 0 ? (
              <span className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity:</span>

            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange("dec")}
                className="px-4 py-2 text-lg hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-6 font-semibold">{quantity}</span>

              <button
                onClick={() => handleQuantityChange("inc")}
                className="px-4 py-2 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Add To Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-3 font-semibold transition border rounded-xl hover:bg-gray-100"
            >
              View Cart
            </button>
          </div>

          {/* Product Info Card */}
          <div className="p-5 mt-2 border bg-gray-50 rounded-2xl">
            <h3 className="mb-4 text-lg font-bold">Product Information</h3>

            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{product.brand || "N/A"}</span>
            </div>

            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product.category?.name || "N/A"}</span>
            </div>

            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-500">SKU</span>
              <span className="font-medium">{product.sku || "N/A"}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-500">Featured</span>
              <span>
                {product.featured ? (
                  <span className="px-3 py-1 text-xs text-white bg-orange-500 rounded-full">
                    Yes
                  </span>
                ) : (
                  "No"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
