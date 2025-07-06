-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('onProcess', 'checkout', 'payment');

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "status" "CartStatus" NOT NULL DEFAULT 'onProcess';
