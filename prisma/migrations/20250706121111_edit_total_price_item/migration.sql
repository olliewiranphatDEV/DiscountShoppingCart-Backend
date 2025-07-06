/*
  Warnings:

  - The values [checkout] on the enum `CartStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `totalPriceProduct` on the `productonorder` table. All the data in the column will be lost.
  - Added the required column `totalPriceItem` to the `productonorder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CartStatus_new" AS ENUM ('onProcess', 'payment');
ALTER TABLE "cart" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "cart" ALTER COLUMN "status" TYPE "CartStatus_new" USING ("status"::text::"CartStatus_new");
ALTER TYPE "CartStatus" RENAME TO "CartStatus_old";
ALTER TYPE "CartStatus_new" RENAME TO "CartStatus";
DROP TYPE "CartStatus_old";
ALTER TABLE "cart" ALTER COLUMN "status" SET DEFAULT 'onProcess';
COMMIT;

-- AlterTable
ALTER TABLE "productonorder" DROP COLUMN "totalPriceProduct",
ADD COLUMN     "totalPriceItem" DECIMAL(10,1) NOT NULL;
