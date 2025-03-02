import SKU from "../models/Sku.model.js";
const createSKU = async (req, res) => {
  try {
    const { sku_name, unit_of_measurement, tax_rate } = req.body;
    const userId = req.user?._id;

    if (!sku_name || !unit_of_measurement || tax_rate === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingSKU = await SKU.findOne({ sku_name, user: userId });
    if (existingSKU) {
      return res.status(400).json({ message: "SKU with this name already exists" });
    }

    const newSKU = new SKU({ sku_name, unit_of_measurement, tax_rate, user: userId });
    await newSKU.save();

    res.status(201).json({ message: "SKU created successfully", sku: newSKU });
  } catch (error) {
    res.status(500).json({ message: "Error creating SKU", error: error.message });
  }
};

const getSKUs = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const skus = await SKU.find(filter).select("sku_name unit_of_measurement tax_rate user");
    res.status(200).json(skus);
  } catch (error) {
    console.error("Error fetching SKUs:", error);
    res.status(500).json({ message: "Error fetching SKUs", error: error.message });
  }
};

export default getSKUs;




export { createSKU, getSKUs };
