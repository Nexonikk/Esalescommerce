import { PaymentData, PaymentResult } from "@/types/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const processPayment = async (
  paymentData: PaymentData,
  orderId: string
): Promise<PaymentResult> => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const randomOutcome = Math.random() < 0.8 ? "APPROVED" : "DECLINED";

  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount: paymentData.amount,
      status: randomOutcome,
      transactionId: randomOutcome === "APPROVED" ? `TXN_${Date.now()}` : null,
    },
    include: {
      order: true,
    },
  });

  return {
    status: payment.status === "APPROVED" ? "APPROVED" : "DECLINED",
    transactionId: payment.transactionId,
    message: getStatusMessage(randomOutcome),
  };
};

const getStatusMessage = (status: string): string => {
  switch (status) {
    case "APPROVED":
      return "Payment processed successfully";
    case "DECLINED":
      return "Payment declined by bank";
    default:
      return "Unknown payment status";
  }
};
