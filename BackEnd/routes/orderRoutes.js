import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,       // ✅ new
  updateOrderStatus,
  getOrderStats,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/stats", getOrderStats);  // ⚠️ must be BEFORE /:id
router.get("/:id", getOrderById);     // ✅ new
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
