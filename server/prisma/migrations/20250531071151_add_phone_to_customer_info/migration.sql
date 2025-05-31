/*
  Warnings:

  - Added the required column `phone` to the `CustomerInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerInfo" ADD COLUMN     "phone" TEXT NOT NULL;
