/*
  Warnings:

  - Added the required column `totalExpenses` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseByCategory" ADD COLUMN     "totalExpenses" DOUBLE PRECISION NOT NULL;
