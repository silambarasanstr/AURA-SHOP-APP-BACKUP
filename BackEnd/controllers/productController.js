import Product from "../models/Product.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";

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
    const category = req.query.category || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    let query = {};

    // ---------------- SEARCH FILTER ----------------
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ---------------- CATEGORY FILTER (FIXED) ----------------
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category = category;
      } else {
        // slug fallback
        const cat = await Category.findOne({ slug: category });

        if (cat) {
          query.category = cat._id;
        }
      }
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
