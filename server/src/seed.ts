import { PrismaClient } from "@prisma/client";
import { sampleProducts } from "./products.js";
const prisma = new PrismaClient();

export async function main() {
  console.log("Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
