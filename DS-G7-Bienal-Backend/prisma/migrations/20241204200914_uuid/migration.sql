/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Sculpture` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sculpture" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sculpture_uuid_key" ON "Sculpture"("uuid");
