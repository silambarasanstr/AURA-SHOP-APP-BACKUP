import { useMemo, useEffect } from "react";
import { ShoppingBag, Tag, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BannerSlider from "../components/common/BannerSlider";
import StatsCard from "../components/home/StatsCard";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/common/category/CategoryCard";
import Loading from "../components/common/Loading";
import useFetch from "../hooks/useFetch";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";
const img1 = new URL("../../assets/banner/bannerimg1.jpg", import.meta.url).href;
const img2 = new URL("../../assets/banner/bannerimg2.jpg", import.meta.url).href;
const bannerImages = [img1, img2];
const SectionLabel = ({ children }) => (
  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">{children}</span>
);
const SectionHeader = ({ label, title, viewAllLink }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h2
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-gray-900 leading-[1.1] mt-1"
      >
        {title}
      </h2>
    </div>
    {viewAllLink && (
      <Link
        to={viewAllLink}
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="text-[0.72rem] tracking-[0.1em] text-gray-900 flex items-center gap-1.5 no-underline border-b border-gray-900 pb-px transition-opacity duration-200"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        VIEW ALL <ArrowRight size={12} />
      </Link>
    )}
  </div>
);
const Divider = () => <div className="h-px mx-5 bg-gray-200" />;
const Home = () => {
  const { data: productData, loading: productsLoading } = useFetch(getProducts);
  const { data: categories, loading: categoriesLoading } = useFetch(getCategories);
  const activeProducts = useMemo(
    () => productData?.products?.filter((p) => p.isActive) ?? [],
    [productData]
  );
  const activeCategories = useMemo(() => categories?.filter((c) => c.isActive) ?? [], [categories]);
  // ✅ useMemo add பண்ணோம் — direct compute இல்லை
  const featuredProducts = useMemo(
    () => activeProducts.filter((p) => p.featured),
    [activeProducts]
  );
  const previewProducts = useMemo(() => activeProducts.slice(0, 8), [activeProducts]);
  const previewCategories = useMemo(() => activeCategories.slice(0, 8), [activeCategories]);
  useEffect(() => {
    document.title = "Home | My Store";
  }, []);
  return (
    <>
      {/* Banner */}
      <div className="relative">
        <BannerSlider images={bannerImages} />
      </div>
      {/* Stats */}
      {!productsLoading && !categoriesLoading && (
        <div className="bg-white border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3 px-5 py-3 mx-auto max-w-7xl">
            <StatsCard
             
              count={activeProducts.length}
              label="Products"
            
            />
            <StatsCard
             
              count={activeCategories.length}
              label="Categories"
             
            />
          </div>
        </div>
      )}
      {/* Featured Products */}
      {!productsLoading && featuredProducts.length > 0 && (
        <>
          <section className="px-5 py-14 bg-gray-50">
            <div className="mx-auto max-w-7xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-gray-50 rounded-full font-mono text-[0.62rem] tracking-[0.15em] uppercase mb-3">
                <Sparkles size={10} /> Featured
              </span>
              <SectionHeader
                label="Handpicked for you"
                title="Top Picks"
                viewAllLink={featuredProducts.length > 4 ? "/products?featured=true" : null}
              />
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product._id || product.id} product={product} showText={false} />
                ))}
              </div>
            </div>
          </section>
          <Divider />
        </>
      )}
      {/* All Products */}
      <section className="px-5 bg-white py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label={!productsLoading ? `${activeProducts.length} items available` : "Loading…"}
            title="Shop Products"
            viewAllLink={activeProducts.length > 8 ? "/products" : null}
          />
          {productsLoading ? (
            <Loading />
          ) : previewProducts.length > 0 ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {previewProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} showText={false} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-sm text-gray-400">
              <ShoppingBag size={36} className="opacity-30" />
              <p>Products will be available soon.</p>
            </div>
          )}
        </div>
      </section>
      {/* Categories */}
      <section className="px-5 bg-gray-900 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-500">
                {!categoriesLoading ? `${activeCategories.length} categories` : "Loading…"}
              </span>
              <h2 className="font-extrabold text-[clamp(1.5rem,3vw,2.25rem)] text-gray-50 leading-[1.1] mt-1">
                Shop by Category
              </h2>
            </div>
            {activeCategories.length > 4 && (
              <Link
                to="/categories"
                className="text-[0.72rem] tracking-[0.1em] text-gray-50 flex items-center gap-1.5 no-underline border-b border-white/40 pb-px transition-opacity duration-200 hover:opacity-60"
              >
                VIEW ALL <ArrowRight size={12} />
              </Link>
            )}
          </div>
          {categoriesLoading ? (
            <Loading />
          ) : previewCategories.length > 0 ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {previewCategories.map((category) => (
                <CategoryCard key={category._id || category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-sm text-gray-400">
              <Tag size={36} className="opacity-30" />
              <p>Categories will be available soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default Home;
