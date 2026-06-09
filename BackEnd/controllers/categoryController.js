import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    let image = "";

    // 1️⃣ file upload
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // 2️⃣ image URL
    if (req.body.imageUrl) {
      image = req.body.imageUrl;
    }

    const data = await Category.create({
      ...req.body,
      image,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().populate("productCount");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).populate(
      "productCount",
    );

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    let image = "";

    // 1️⃣ file upload
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // 2️⃣ image URL (override file if both exist)
    if (req.body.imageUrl) {
      updateData.image = req.body.imageUrl;
    }

    const data = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("productCount");

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
