/*
  Warnings:

  - You are about to drop the `_CustomerInfoToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerInfoId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CustomerInfoToOrder" DROP CONSTRAINT "_CustomerInfoToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerInfoToOrder" DROP CONSTRAINT "_CustomerInfoToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerInfoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CustomerInfoToOrder";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerInfoId_fkey" FOREIGN KEY ("customerInfoId") REFERENCES "CustomerInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
