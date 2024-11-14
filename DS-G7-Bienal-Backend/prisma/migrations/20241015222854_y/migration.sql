/*
  Warnings:

  - You are about to drop the column `telefono` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "telefono",
ADD COLUMN     "phoneNumber" TEXT;
