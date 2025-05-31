export const generateOrderNumber = (): string => {
  const prefix = "ORD";
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
};
