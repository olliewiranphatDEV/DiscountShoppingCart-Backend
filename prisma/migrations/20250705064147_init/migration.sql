-- CreateEnum
CREATE TYPE "DiscountCampaign" AS ENUM ('fixedAmount', 'percentage', 'percentageByProduct', 'points', 'specialSeasonal');

-- CreateEnum
CREATE TYPE "DiscountCategory" AS ENUM ('coupon', 'onTop', 'seasonal');

-- CreateTable
CREATE TABLE "user" (
    "userID" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passWord" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "product" (
    "productID" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productCate" TEXT NOT NULL,
    "price" DECIMAL(2,1) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "cart" (
    "cartID" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cartID")
);

-- CreateTable
CREATE TABLE "productoncart" (
    "productID" INTEGER NOT NULL,
    "cartID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "productoncart_pkey" PRIMARY KEY ("productID","cartID")
);

-- CreateTable
CREATE TABLE "productonorder" (
    "orderID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "discountID" INTEGER,
    "discountedPrice" DECIMAL(2,1),
    "finalPrice" DECIMAL(2,1) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "productonorder_pkey" PRIMARY KEY ("productID","orderID")
);

-- CreateTable
CREATE TABLE "order" (
    "orderID" SERIAL NOT NULL,
    "finalPrice" DECIMAL(10,2) NOT NULL,
    "orderDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "discount" (
    "discountID" SERIAL NOT NULL,
    "campaign" "DiscountCampaign" NOT NULL,
    "category" "DiscountCategory" NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "fixedAmount" INTEGER,
    "percentage" INTEGER,
    "everyX" INTEGER,
    "discountY" INTEGER,
    "productCate" TEXT NOT NULL DEFAULT 'ALL',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("discountID")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoncart" ADD CONSTRAINT "productoncart_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("productID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoncart" ADD CONSTRAINT "productoncart_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "cart"("cartID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productonorder" ADD CONSTRAINT "productonorder_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "order"("orderID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productonorder" ADD CONSTRAINT "productonorder_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("productID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productonorder" ADD CONSTRAINT "productonorder_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "discount"("discountID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
