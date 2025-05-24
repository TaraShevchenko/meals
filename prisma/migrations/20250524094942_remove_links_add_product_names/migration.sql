/*
  Warnings:

  - You are about to drop the column `atbLink` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `silpoLink` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "atbLink",
DROP COLUMN "silpoLink",
ADD COLUMN     "productNames" TEXT[];
