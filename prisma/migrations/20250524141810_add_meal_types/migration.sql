/*
  Warnings:

  - You are about to drop the `_MenuToMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- DropForeignKey
ALTER TABLE "_MenuToMeal" DROP CONSTRAINT "_MenuToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuToMeal" DROP CONSTRAINT "_MenuToMeal_B_fkey";

-- DropTable
DROP TABLE "_MenuToMeal";

-- CreateTable
CREATE TABLE "MenuMeal" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MenuMeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuMeal_menuId_mealId_key" ON "MenuMeal"("menuId", "mealId");

-- AddForeignKey
ALTER TABLE "MenuMeal" ADD CONSTRAINT "MenuMeal_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuMeal" ADD CONSTRAINT "MenuMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
