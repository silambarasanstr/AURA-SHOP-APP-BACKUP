import BannerSlider from "../components/common/BannerSlider";
import HomeContainer from "../containers/HomeContainer";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const bannerImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1503602642458-232111445657",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  ];

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products || []);
    });
  }, []);

  console.log(products);

  return (
    <div>
      <BannerSlider images={bannerImages} />

      <div className="bg-gray-100">
        <div className="px-5 py-10 mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold">Shop by Products</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} showText={true} />
            ))}
          </div>
        </div>
      </div>

      <HomeContainer />
    </div>
  );
};

export default Home;
