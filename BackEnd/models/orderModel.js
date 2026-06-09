import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    items: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
        qty: Number,
      },
    ],

    totalPrice: Number,
    discount: Number,

    address: {
      fullName: String,
      city: String,
      streetAddress: String,
      phoneNumber: String,
      pincode: String,
    },

    deliveryMethod: {
      id: String,
      label: String,
      cost: Number,
    },

    payment: {
      method: { type: String, default: "cod" },
      codFee: { type: Number, default: 0 },
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
