import { useEffect, useState } from "react";
import BannerSlider from "../components/common/BannerSlider";
import ProductCard from "../components/ProductCard";
import Categories from "../containers/CategoriesContainer";
import { getProducts } from "../services/productService";

const bannerImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1503602642458-232111445657",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <BannerSlider images={bannerImages} />

      <div className="bg-gray-100">
        <div className="px-5 py-10 mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold">Shop by Products</h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} showText={true} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-500">Products will be available soon.</p>
            </div>
          )}
        </div>
      </div>

      <Categories />
    </div>
  );
};

export default Home;
