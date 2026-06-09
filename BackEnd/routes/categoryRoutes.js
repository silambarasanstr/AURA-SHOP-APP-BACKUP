import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import multer from "multer";
const router = express.Router();




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Optional: filter only images
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
});



// api/categories
router.get("/", getCategories);

// api/categories/:id
router.get("/:id", getCategoryById);

// api/categories
router.post("/", upload.single("image"), createCategory);

// api/categories/:id
router.put("/:id", upload.single("image"), updateCategory);

// api/categories/:id
router.delete("/:id", deleteCategory);

export default router;
