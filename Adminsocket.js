import { io } from "socket.io-client";

const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5, 
  timeout: 5000, 
});

socket.on("connect", () => {
  console.log(" Connected to WebSocket server", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("WebSocket Connection Error:", err.message);
});

socket.on("newOrder", (data) => {
  console.log("New Order Notification Received:", data);
});
socket.on("orderSummary", (data) => {
  console.log("hourly summary:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});
