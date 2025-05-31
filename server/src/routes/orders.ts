import { Router } from "express";
import {
  createOrder,
  getOrderByNumber,
} from "../controllers/order.controller.js";
import { validateCheckoutData } from "../middlewares/validation.js";

const router = Router();

router.post("/", validateCheckoutData, createOrder);
router.get("/:orderNumber", getOrderByNumber);

export default router;
