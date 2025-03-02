import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    sku: { type: mongoose.Schema.Types.ObjectId, ref: "SKU", required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


export default mongoose.model("Order", orderSchema);
