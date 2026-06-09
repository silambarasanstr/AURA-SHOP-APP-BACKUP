import BannerSlider from "../components/common/BannerSlider";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/common/category/CategoryCard";
import Loading from "../components/common/Loading";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";
import { ShoppingBag, Tag, ArrowRight, Sparkles } from "lucide-react";
import React, { useEffect } from "react";
import img1 from "../../assets/banner/bannerimg1.jpg";
import img2 from "../../assets/banner/bannerimg2.jpg";

const bannerImages = [img1, img2];

const SectionLabel = ({ children }) => (
  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-400">{children}</span>
);
const SectionHeader = ({ label, title, viewAllLink }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <SectionLabel>{label}</SectionLabel>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
        className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-gray-900 leading-[1.1] mt-1"
      >
        {title}
      </h2>
    </div>
    {viewAllLink && (
      <Link
        to={viewAllLink}
        style={{
          fontFamily: "'DM Mono', monospace",
        }}
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

  const activeProducts = productData?.products?.filter((p) => p.isActive) || [];
  const activeCategories = categories?.filter((c) => c.isActive) || [];
  const featuredProducts = activeProducts.filter((p) => p.featured);
  const previewProducts = activeProducts.slice(0, 8);
  const previewCategories = activeCategories.slice(0, 4);

  useEffect(() => {
    document.title = "Home | My Store";
  }, []);

  return (
    <>
      <div>
        <div className="relative">
          <BannerSlider images={bannerImages} />
        </div>

        <div>
          {/* Stats bar — floats below banner */}
          {!productsLoading && !categoriesLoading && (
            <div className="bg-white border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3 py-3 mx-auto max-w-7xl">
                <div className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-[11px] tracking-[0.08em] font-mono text-gray-700 bg-white hover:border-gray-900 hover:shadow-sm transition-all">
                  <ShoppingBag size={12} className="text-emerald-600" />
                  <strong className="font-semibold text-gray-900">
                    {activeProducts.length}
                  </strong>{" "}
                  Products
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-[11px] tracking-[0.08em] font-mono text-gray-700 bg-white hover:border-gray-900 hover:shadow-sm transition-all">
                  <Tag size={12} className="text-blue-600" />
                  <strong className="font-semibold text-gray-900">
                    {activeCategories.length}
                  </strong>{" "}
                  Categories
                </div>
              </div>
            </div>
          )}
        </div>

        {!productsLoading && featuredProducts.length > 0 && (
          <>
            <section className="px-5 py-14 bg-gray-50">
              <div className="mx-auto max-w-7xl">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-gray-50 rounded-full font-mono text-[0.62rem] tracking-[0.15em] uppercase mb-3">
                    <Sparkles size={10} /> Featured
                  </span>
                </div>
                <SectionHeader
                  label="Handpicked for you"
                  title="Top Picks"
                  viewAllLink={featuredProducts.length > 4 ? "/products?featured=true" : null}
                />
                <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      showText={false}
                    />
                  ))}
                </div>
              </div>
            </section>
            <Divider />
          </>
        )}

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

        <section className="px-5 bg-gray-900 py-14">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="cat-section-label text-[0.65rem] tracking-[0.2em] uppercase text-gray-500">
                  {!categoriesLoading ? `${activeCategories.length} categories` : "Loading…"}
                </span>
                <h2 className="font-extrabold text-[clamp(1.5rem,3vw,2.25rem)] cat-label text-gray-50 leading-[1.1] mt-1">
                  Shop by Category
                </h2>
              </div>
              {activeCategories.length > 4 && (
                <Link
                  to="/categories"
                  className="cat-view-all text-[0.72rem] tracking-[0.1em] text-gray-50 flex items-center gap-1.5 no-underline border-b border-white/40 pb-px transition-opacity duration-200 hover:opacity-60"
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
      </div>
    </>
  );
};

export default Home;
