import { Server } from "socket.io";

let io;

const initializeWebSocket = (ioInstance) => {
  io = ioInstance; 

  io.on("connection", (socket) => {
    console.log("🔗 Admin connected to WebSocket");

    socket.on("disconnect", () => {
      console.log("❌ Admin disconnected from WebSocket");
    });
  });
};

const sendOrderNotification = (order) => {
  if (io) {
    io.emit("newOrder", {
      message: "New order placed",
      order_id: order.orderId,
      user: order.user.username,
      customer: order.customer.name,
      sku: order.sku.sku_id,
      total_amount: order.totalAmount,
      timestamp: order.createdAt,
    });
  } else {
    console.error("⚠️ WebSocket not initialized. Cannot send notification.");
  }
};

export { initializeWebSocket, sendOrderNotification };
