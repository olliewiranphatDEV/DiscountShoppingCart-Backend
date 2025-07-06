/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `cart` table. All the data in the column will be lost.
  - Added the required column `totalPriceItem` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPriceItem" DECIMAL(10,2) NOT NULL;
