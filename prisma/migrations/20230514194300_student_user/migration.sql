/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Communication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Tuition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tuition" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Communication_email_key" ON "Communication"("email");
