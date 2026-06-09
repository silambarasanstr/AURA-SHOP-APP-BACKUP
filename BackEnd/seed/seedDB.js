import dotenv from "dotenv";
import connectDB from "../config/db.js";
import slugify from "slugify";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import categories from "./categories.json" with { type: "json" };
import products from "./products.json" with { type: "json" };

dotenv.config();

// // 🏷️ CATEGORY DATA
// const categories = [
//   {
//     name: "Electronics",
//     slug: "electronics",
//     image:
//       "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     name: "Fashion",
//     slug: "fashion",
//     image:
//       "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     name: "Home & Living",
//     slug: "home-living",
//     image:
//       "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800&auto=format&fit=crop",
//   },
// ];

// // 📦 PRODUCT DATA
// const products = [
//   {
//     name: "Nova X1 Wireless Headphones",
//     price: 299.99,
//     category: "Electronics",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Experience unparalleled sound quality with active noise cancellation and 40-hour battery life.",
//     featured: true,
//     rating: 4.8,
//     reviews: 124,
//   },
//   {
//     name: "Aura Smart Watch Series 5",
//     price: 399.0,
//     category: "Electronics",
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30e?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Keep track of your health and stay connected with the most advanced smart watch.",
//     featured: true,
//     rating: 4.9,
//     reviews: 89,
//   },
//   {
//     name: "Classic Leather Weekend Bag",
//     price: 185.0,
//     category: "Fashion",
//     image:
//       "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Handcrafted from premium Italian leather, perfect for your short getaways.",
//     featured: false,
//     rating: 4.7,
//     reviews: 56,
//   },
//   {
//     name: "Eco-Comfort Ergo Chair",
//     price: 450.0,
//     category: "Home & Living",
//     image:
//       "https://images.unsplash.com/photo-1505843490701-5be550b13e5e?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Designed for maximum comfort and posture support during long working hours.",
//     featured: true,
//     rating: 4.6,
//     reviews: 210,
//   },
//   {
//     name: "Minimalist Desktop Lamp",
//     price: 89.0,
//     category: "Home & Living",
//     image:
//       "https://images.unsplash.com/photo-1534073828943-f801091bb270?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Sleek design with adjustable brightness and color temperature for any task.",
//     featured: false,
//     rating: 4.5,
//     reviews: 78,
//   },
//   {
//     name: "Knit Wool Sweater",
//     price: 120.0,
//     category: "Fashion",
//     image:
//       "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
//     description:
//       "Soft, warm, and sustainably sourced wool for those chilly evening walks.",
//     featured: false,
//     rating: 4.8,
//     reviews: 45,
//   },
// ];

const seedDB = async () => {
  try {
    await connectDB();
    console.log("DB Connected 🚀");

    await Category.deleteMany();
    await Product.deleteMany();

    // 🌱 insert categories
    const createdCategories = await Category.insertMany(categories);

    // 🔥 map category name → ObjectId
    const categoryMap = Object.fromEntries(
      createdCategories.map((cat) => [cat.name, cat._id]),
    );

    // 📦 attach category ObjectId
    const productData = products.map((p) => {
      if (!categoryMap[p.category]) {
        throw new Error(`Category not found: ${p.category}`);
      }

      return {
        ...p,
        slug: slugify(p.name, { lower: true, strict: true }),
        category: categoryMap[p.category],
      };
    });

    await Product.insertMany(productData);

    console.log("🔥 Seed Completed Successfully");
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Products: ${productData.length}`);

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error);
    process.exit(1);
  }
};

seedDB();
