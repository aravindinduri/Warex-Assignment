import express from "express";
import { createOrder, getOrders ,getUserOrders } from "../controllers/order.Controller.js";
import { authenticateUser , authorizeAdmin , authorizeUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser,authorizeUser, createOrder);
router.get("/userOrders",authenticateUser,authorizeUser,getUserOrders);
router.get("/", authenticateUser, authorizeAdmin, getOrders);

export default router;
