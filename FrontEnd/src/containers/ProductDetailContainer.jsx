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

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="p-6 text-center text-red-500">Product not found</p>;
  }

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to cart!");
  };

  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-10 max-w-7xl">
      {/* PRODUCT SECTION */}
      <div className="grid gap-10 p-6 bg-white border border-gray-200 md:grid-cols-2 rounded-2xl">
        {/* Image */}
        <div className="overflow-hidden border rounded-2xl">
          <img
            src={product?.image || "/no-image.png"}
            alt={product?.name}
            className="w-full h-[400px] object-cover hover:scale-105 transition"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-bold text-green-600">₹ {product.price}</p>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2">
            <div className="text-lg">{renderStars(product.rating || 0)}</div>
            <span className="text-sm text-gray-500">({product.rating || 0}/5)</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

          <p className="text-sm text-gray-500">Category: {product.category?.name || "N/A"}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 pt-4">
            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange("dec")}
                className="flex items-center justify-center w-8 h-8 text-white bg-gray-400 rounded-full hover:bg-gray-500"
              >
                -
              </button>
              <span className="px-4 py-1 font-medium bg-gray-100 rounded">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("inc")}
                className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 text-white transition bg-green-500 hover:bg-green-600 "
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-3 transition border border-gray-300 hover:bg-gray-50"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
