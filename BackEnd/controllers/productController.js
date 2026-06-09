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

    let image = "";

    // 1️⃣ If file uploaded (multer)
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // 2️⃣ If image URL provided in body
    if (req.body.imageUrl) {
      image = req.body.imageUrl;
    }

    const productData = {
      ...req.body,
      image,
    };

    const data = await Product.create(productData);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    // Only active products on the storefront
    let query = {};

    // Search filter
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter — supports both ObjectId and slug
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

    // Sort map
    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
      rating: { rating: -1 },
    };
    const sortQuery = sortMap[sort] || { createdAt: -1 };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("category")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

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
    const updateData = {
      ...req.body,
    };

    let image = "";

    // 1️⃣ If new file uploaded → override image
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // 2️⃣ If image URL provided → override image
    if (req.body.imageUrl) {
      updateData.image = req.body.imageUrl;
    }

    const data = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
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
