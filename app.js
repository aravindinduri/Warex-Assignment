import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import cron from "node-cron";

import authRoutes from "./src/routes/auth.route.js";
import skuRoutes from "./src/routes/sku.route.js";
import customerRoutes from "./src/routes/customer.route.js";
import orderRoutes from "./src/routes/order.route.js";

import { initializeWebSocket } from "./src/utils/websocket.util.js";
import  generateOrderSummary  from "./src/cron/orderSummaryJob.js";
import connectDB from "./src/config/db.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
app.use("/api/auth", authRoutes);
app.use("/api/skus", skuRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

initializeWebSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

cron.schedule(process.env.CRON_SCHEDULE, async () => {
  await generateOrderSummary();
  console.log("Hourly order summary generated");
});
export { io };
