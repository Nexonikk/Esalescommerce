import { Request, Response } from "express";
import * as paymentService from "../services/payment.service.js";
import * as orderService from "../services/order.service.js";
import * as emailService from "../services/email.service.js";

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentData } = req.body;
    console.log("Received payment data:", paymentData);
    console.log("Received orderId:", orderId);

    const paymentResult = await paymentService.processPayment(
      paymentData,
      orderId
    );

    await orderService.updateOrderStatus(
      orderId,
      paymentResult.status === "APPROVED" ? "CONFIRMED" : "FAILED"
    );

    const order = await orderService.getOrderById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    await emailService.sendConfirmationEmail(order, paymentResult.status);

    res.json(paymentResult);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
