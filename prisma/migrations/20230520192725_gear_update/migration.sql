/*
  Warnings:

  - Added the required column `price` to the `Gear` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gear" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
