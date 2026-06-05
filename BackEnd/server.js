import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// admin
app.use("/api/admin", adminRoutes);



app.get("/api/auth/login", (req, res) => {
  res.send("Login API is working ✅");
});

// ❗ 404 Middleware (must be AFTER routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❗ Error Middleware (last)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// ✅ correct way
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port...: ${PORT}`);
    });
  } catch (error) {
    console.log("Server failed:", error.message);
    process.exit(1);
  }
};

startServer();
