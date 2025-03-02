import Order from "../models/Order.model.js";
import Customer from "../models/Customer.model.js";
import SKU from "../models/Sku.model.js";
import { io } from "../../app.js";

const createOrder = async (req, res) => {
  try {
    const { customer_id, sku_id, quantity, rate } = req.body;
    const userId = req.user.id;

    const customer = await Customer.findOne({ customerId: customer_id, user: userId }).select("name");
    if (!customer) return res.status(400).json({ message: "Invalid customer ID" });

    const sku = await SKU.findOne({ sku_id }).select("sku_name tax_rate");
    if (!sku) return res.status(400).json({ message: "Invalid SKU ID" });

    const totalAmount = quantity * rate * (1 + sku.tax_rate / 100);

    const lastOrder = await Order.findOne().sort({ createdAt: -1 }).select("orderId");
    const lastOrderId = lastOrder ? parseInt(lastOrder.orderId.replace("OD-", ""), 10) : 0;
    const newOrderId = `OD-${String(lastOrderId + 1).padStart(5, "0")}`;

    const newOrder = new Order({
      orderId: newOrderId,
      customer: customer._id,
      sku: sku._id,
      user: userId,
      quantity,
      rate,
      totalAmount,
    });

    await newOrder.save();

    io.emit("newOrder", {
      message: "New order placed",
      order_id: newOrder.orderId,
      user: req.user.username,
      customer: customer.name,
      sku: sku.sku_name,
      total_amount: totalAmount,
      timestamp: newOrder.createdAt,
    });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };

    const orders = await Order.find(filter)
      .populate("customer", "name address")
      .populate("sku", "sku_name unit_of_measurement tax_rate")
      .select("orderId quantity rate totalAmount createdAt");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?._id; 

    const orders = await Order.find({ user: userId }).select("-__v").populate("user", "username");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

export { createOrder, getOrders , getUserOrders};
