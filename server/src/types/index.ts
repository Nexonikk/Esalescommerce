import {
  Order as PrismaOrder,
  Product as PrismaProduct,
  CustomerInfo as PrismaCustomerInfo,
  OrderItem as PrismaOrderItem,
  Payment as PrismaPayment,
} from "@prisma/client";

export interface OrderItem {
  productId: string;
  quantity: number;
  variant: any;
  price: number;
}

export interface CustomerInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CheckoutRequest {
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo;
  [key: string]: any;
}

export type PaymentStatus = "APPROVED" | "DECLINED" | "ERROR";

interface PaymentInfo {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export interface PaymentData {
  amount: number;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PaymentResult {
  status: "APPROVED" | "DECLINED";
  transactionId: string | null;
  message: string;
}

export type PaymentStatusType = "APPROVED" | "DECLINED";

export interface OrderWithItems extends PrismaOrderItem {
  product: PrismaProduct;
}

export interface OrderWithCustomerInfo extends PrismaOrder {
  customerInfo: PrismaCustomerInfo;
  items: OrderWithItems[];
}

export interface OrderWithRelations extends PrismaOrder {
  customerInfo: PrismaCustomerInfo;
  items: Array<
    PrismaOrderItem & {
      product: PrismaProduct;
    }
  >;
  Payment: PrismaPayment[];
}

export interface OrderData {
  items: OrderItem[];
  customerInfo: CustomerInfo;
  total: number;
}

export const isOrderWithCustomerInfo = (
  order: PrismaOrder
): order is OrderWithCustomerInfo => {
  return (order as OrderWithCustomerInfo).customerInfo !== undefined;
};
