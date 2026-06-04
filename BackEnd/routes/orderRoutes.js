import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderStats,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);
router.get("/stats", getOrderStats);
router.delete("/:id", deleteOrder);

export default router;
