import Product from "../models/Product.js";
import Category from "../models/Category.js";

// ✅ Create Product
export const createProduct = async (req, res) => {
  try {
    // 🔥 Validate Category
    const categoryExists = await Category.findById(req.body.category);

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Products (Search + Pagination + Category FIXED)
export const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    // 🔥 Category search
    const categories = await Category.find({
      name: { $regex: search, $options: "i" },
    });

    const categoryIds = categories.map((cat) => cat._id);

    let query = {};

    if (search) {
      const conditions = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

      if (categoryIds.length > 0) {
        conditions.push({ category: { $in: categoryIds } });
      }

      query = { $or: conditions };
    }

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      products,
    });

    console.log("🔍 SEARCH:", search);
    console.log("📂 CATEGORY IDS:", categoryIds);
    console.log("🧠 FINAL QUERY:", JSON.stringify(query, null, 2));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get Single Product
export const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // ✅ important
    ).populate("category");

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
