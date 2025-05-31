import { PrismaClient, Order, OrderStatus } from "@prisma/client";
import { generateOrderNumber } from "../utils/helpers.js";
import { OrderData, OrderWithCustomerInfo } from "../types/index.js";

const prisma = new PrismaClient();

export const createOrder = async (
  orderData: OrderData
): Promise<OrderWithCustomerInfo> => {
  const { items, customerInfo, total } = orderData;

  const customer = await prisma.customerInfo.upsert({
    where: { email: customerInfo.email },
    create: {
      fullName: customerInfo.fullName || "",
      email: customerInfo.email || "",
      address: customerInfo.address || "",
      phone: customerInfo.phone || "",
    },
    update: {
      fullName: customerInfo.fullName || "",
      address: customerInfo.address || "",
      phone: customerInfo.phone || "",
    },
  });

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      total,
      customerInfoId: customer.id,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          variant: item.variant,
          price: item.price,
        })),
      },
      status: "PENDING",
    },
    include: {
      customerInfo: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};

export const getOrderByNumber = async (
  orderNumber: string
): Promise<OrderWithCustomerInfo | null> => {
  return await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      customerInfo: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      customerInfo: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order> => {
  return await prisma.order.update({
    where: { id },
    data: { status },
  });
};
