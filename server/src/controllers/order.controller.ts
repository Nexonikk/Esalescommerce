import { Request, Response } from "express";
import * as orderService from "../services/order.service.js";
import * as emailService from "../services/email.service.js";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderData = req.body;
    console.log("Received order data:", orderData);
    const order = await orderService.createOrder(orderData);

    await emailService.sendConfirmationEmail(order, "PENDING");

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderByNumber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await orderService.getOrderByNumber(req.params.orderNumber);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
