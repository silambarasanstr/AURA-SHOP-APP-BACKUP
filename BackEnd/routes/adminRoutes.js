import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllProducts } from "../controllers/productController.js";
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();

// Admin Products
router.get("/products", getAllProducts);
router.get("/stats",  getAdminStats);

export default router;