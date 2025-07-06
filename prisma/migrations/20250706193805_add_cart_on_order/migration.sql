/*
  Warnings:

  - You are about to drop the column `status` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "caartonorder" (
    "orderID" INTEGER NOT NULL,
    "cartID" INTEGER NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'onProcess',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "caartonorder_pkey" PRIMARY KEY ("orderID","cartID")
);

-- AddForeignKey
ALTER TABLE "caartonorder" ADD CONSTRAINT "caartonorder_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "order"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caartonorder" ADD CONSTRAINT "caartonorder_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "cart"("cartID") ON DELETE CASCADE ON UPDATE CASCADE;
