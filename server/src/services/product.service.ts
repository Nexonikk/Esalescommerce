import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const updateInventory = async (
  id: string,
  quantity: number
): Promise<Product> => {
  return await prisma.product.update({
    where: { id },
    data: {
      inventory: {
        decrement: quantity,
      },
    },
  });
};
