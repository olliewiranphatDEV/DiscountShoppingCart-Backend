/*
  Warnings:

  - You are about to drop the column `finalPrice` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `discountID` on the `productonorder` table. All the data in the column will be lost.
  - You are about to drop the column `discountedPrice` on the `productonorder` table. All the data in the column will be lost.
  - You are about to drop the column `finalPrice` on the `productonorder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `productonorder` table. All the data in the column will be lost.
  - Added the required column `orderFinalPrice` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceProduct` to the `productonorder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "productonorder" DROP CONSTRAINT "productonorder_discountID_fkey";

-- AlterTable
ALTER TABLE "discount" ADD COLUMN     "points" INTEGER;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "finalPrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "orderFinalPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "productonorder" DROP COLUMN "discountID",
DROP COLUMN "discountedPrice",
DROP COLUMN "finalPrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "totalPriceProduct" DECIMAL(10,1) NOT NULL;

-- CreateTable
CREATE TABLE "discountonorder" (
    "orderID" INTEGER NOT NULL,
    "discounID" INTEGER NOT NULL,
    "priceAfterDiscount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discountonorder_pkey" PRIMARY KEY ("discounID","orderID")
);

-- AddForeignKey
ALTER TABLE "discountonorder" ADD CONSTRAINT "discountonorder_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "order"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discountonorder" ADD CONSTRAINT "discountonorder_discounID_fkey" FOREIGN KEY ("discounID") REFERENCES "discount"("discountID") ON DELETE CASCADE ON UPDATE CASCADE;
