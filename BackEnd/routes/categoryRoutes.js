import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// api/categories
router.get("/", getCategories);

// api/categories/:id
router.get("/:id", getCategoryById);

// api/categories
router.post("/", createCategory);

// api/categories/:id
router.put("/:id", updateCategory);

// api/categories/:id
router.delete("/:id", deleteCategory);

export default router;
