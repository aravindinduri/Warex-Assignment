import express from "express";
import { createCustomer, getCustomers } from "../controllers/customer.Controller.js";
import { authenticateUser , authorizeUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser ,authorizeUser, createCustomer);
router.get("/", authenticateUser,authorizeUser, getCustomers);

export default router;
