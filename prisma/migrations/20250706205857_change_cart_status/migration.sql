/*
  Warnings:

  - The values [checkout] on the enum `CartStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CartStatus_new" AS ENUM ('onProcess', 'checkoutDone', 'payment');
ALTER TABLE "cart" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "cart" ALTER COLUMN "status" TYPE "CartStatus_new" USING ("status"::text::"CartStatus_new");
ALTER TYPE "CartStatus" RENAME TO "CartStatus_old";
ALTER TYPE "CartStatus_new" RENAME TO "CartStatus";
DROP TYPE "CartStatus_old";
ALTER TABLE "cart" ALTER COLUMN "status" SET DEFAULT 'onProcess';
COMMIT;
