import Order from "../models/Order.model.js";
import { io } from "../../app.js";

const generateOrderSummary = async () => {
  try {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const orders = await Order.find({ createdAt: { $gte: oneHourAgo } });

    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const summary = {
      message: "Hourly Order Summary",
      total_orders: totalOrders,
      total_amount: totalAmount,
      timestamp: new Date().toISOString(),
    };
    io.emit("orderSummary", summary);

  } catch (error) {
    console.error("Error generating order summary:", error.message);
  }
};

export default generateOrderSummary;
