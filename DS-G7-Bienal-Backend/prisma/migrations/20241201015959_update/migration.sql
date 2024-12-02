/*
  Warnings:

  - You are about to drop the column `scultorId` on the `Sculpture` table. All the data in the column will be lost.
  - Added the required column `sculptorId` to the `Sculpture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sculpture" DROP CONSTRAINT "Sculpture_scultorId_fkey";

-- AlterTable
ALTER TABLE "Sculpture" DROP COLUMN "scultorId",
ADD COLUMN     "sculptorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sculpture" ADD CONSTRAINT "Sculpture_sculptorId_fkey" FOREIGN KEY ("sculptorId") REFERENCES "Sculptor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
