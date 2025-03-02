import express from "express";
import { createSKU, getSKUs } from "../controllers/sku.Controller.js";
import { authenticateUser , authorizeUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser,authorizeUser, createSKU);
router.get("/", authenticateUser, authorizeUser,getSKUs);

export default router;
