import nodemailer from "nodemailer";
import { OrderWithCustomerInfo } from "../types/index.js";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendConfirmationEmail = async (
  order: OrderWithCustomerInfo,
  status: string
): Promise<void> => {
  try {
    const template = getEmailTemplate(order, status);

    console.log("Attempting to send email to:", order.customerInfo.email);
    console.log("Using Mailtrap config:", {
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      user: process.env.MAILTRAP_USER,
    });

    const info = await transporter.sendMail({
      from: "ECommerce Store <noreply@ecommerce.com>",
      to: order.customerInfo.email,
      subject: template.subject,
      html: template.html,
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

const getEmailTemplate = (order: OrderWithCustomerInfo, status: string) => {
  const customerInfo = order.customerInfo;

  switch (status) {
    case "APPROVED":
      return {
        subject: `Order Confirmation - ${order.orderNumber}`,
        html: `
          <h2>Order Confirmed!</h2>
          <p>Hi ${customerInfo.fullName},</p>
          <p>Your order has been successfully processed.</p>
          <h3>Order Details:</h3>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <h3>Items:</h3>
          ${order.items
            .map(
              (item: any) => `
            <p>${item.product.name} x ${item.quantity} - ${item.price}</p>
          `
            )
            .join("")}
          <p>Thank you for your purchase!</p>
        `,
      };

    case "DECLINED":
      return {
        subject: `Payment Declined - ${order.orderNumber}`,
        html: `
          <h2>Payment Declined</h2>
          <p>Hi ${customerInfo.fullName},</p>
          <p>Unfortunately, your payment was declined.</p>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p>Please try again or contact support.</p>
        `,
      };

    case "ERROR":
      return {
        subject: `Payment Error - ${order.orderNumber}`,
        html: `
          <h2>Payment Processing Error</h2>
          <p>Hi ${customerInfo.fullName},</p>
          <p>There was an error processing your payment.</p>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p>Please contact support for assistance.</p>
        `,
      };

    default:
      return {
        subject: `Order Created - ${order.orderNumber}`,
        html: `
          <h2>Order Created</h2>
          <p>Hi ${customerInfo.fullName},</p>
          <p>Your order has been created and is pending payment.</p>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        `,
      };
  }
};
