import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // virtuals appear in res.json()
    toObject: { virtuals: true }, // virtuals appear in .toObject()
  },
);

categorySchema.virtual("productCount", {
  ref: "Product", // must match your mongoose.model("Product", ...)
  localField: "_id",
  foreignField: "category", // must match the field name in your Product schema
  count: true,
});

export default mongoose.model("Category", categorySchema);
