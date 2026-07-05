
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import slugify from "slugify";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import categories from "./categories.json" with { type: "json" };
import products from "./products.json" with { type: "json" };



dotenv.config();
console.log(process.env.MONGO_URI,"====>simbu");


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