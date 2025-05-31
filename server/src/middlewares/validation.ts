import { Request, Response, NextFunction } from "express";
import { CheckoutRequest } from "../types/index.js";

export const validateEmail = (email: string = ""): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string = ""): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCardNumber = (cardNumber: string = ""): boolean => {
  const cardRegex = /^\d{16}$/;
  return cardRegex.test(cardNumber.replace(/\s/g, ""));
};

export const validateExpiryDate = (expiry: string = ""): boolean => {
  const [month, year] = expiry.split("/").map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

export const validateCVV = (cvv: string = ""): boolean => {
  const cvvRegex = /^\d{3}$/;
  return cvvRegex.test(cvv);
};
export const validateCheckoutData = (
  req: Request<{}, {}, CheckoutRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { customerInfo, paymentInfo } = req.body;
  const errors: string[] = [];

  if (!customerInfo?.fullName?.trim()) {
    errors.push("Full name is required");
  }

  if (!validateEmail(customerInfo?.email)) {
    errors.push("Valid email is required");
  }

  if (!validatePhone(customerInfo?.phone)) {
    errors.push("Valid phone number is required");
  }

  if (!customerInfo?.address?.trim()) {
    errors.push("Address is required");
  }

  if (!validateCardNumber(paymentInfo?.cardNumber)) {
    errors.push("Valid 16-digit card number is required");
  }

  if (!validateExpiryDate(paymentInfo?.expiry)) {
    errors.push("Valid future expiry date is required");
  }

  if (!validateCVV(paymentInfo?.cvv)) {
    errors.push("Valid 3-digit CVV is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  }

  next();
};
