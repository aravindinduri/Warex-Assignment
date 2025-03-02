import mongoose from "mongoose";

const skuSchema = new mongoose.Schema(
  {
    sku_id: { type: String, unique: true },
    sku_name: { type: String, required: true },
    unit_of_measurement: { type: String, required: true },
    tax_rate: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

skuSchema.pre("save", async function (next) {
  if (!this.sku_id) {
    const lastSKU = await mongoose.model("SKU").findOne().sort({ createdAt: -1 });
    const lastId = lastSKU ? parseInt(lastSKU.sku_id.replace("SKU", ""), 10) : 0;
    this.sku_id = `SKU${String(lastId + 1).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("SKU", skuSchema);
