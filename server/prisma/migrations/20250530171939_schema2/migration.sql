/*
  Warnings:

  - You are about to drop the column `customerInfo` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerInfo";

-- CreateTable
CREATE TABLE "CustomerInfo" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "CustomerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerInfoToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CustomerInfoToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInfo_email_key" ON "CustomerInfo"("email");

-- CreateIndex
CREATE INDEX "_CustomerInfoToOrder_B_index" ON "_CustomerInfoToOrder"("B");

-- AddForeignKey
ALTER TABLE "_CustomerInfoToOrder" ADD CONSTRAINT "_CustomerInfoToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "CustomerInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerInfoToOrder" ADD CONSTRAINT "_CustomerInfoToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
