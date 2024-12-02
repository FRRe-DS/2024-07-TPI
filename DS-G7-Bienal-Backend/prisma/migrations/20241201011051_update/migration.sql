/*
  Warnings:

  - Added the required column `eventId` to the `Sculpture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sculpture" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sculpture" ADD CONSTRAINT "Sculpture_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
