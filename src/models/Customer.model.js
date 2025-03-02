import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerId: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


export default mongoose.model("Customer", customerSchema);
