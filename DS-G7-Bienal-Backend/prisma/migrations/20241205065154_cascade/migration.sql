-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_sculptureId_fkey";

-- DropForeignKey
ALTER TABLE "Sculpture" DROP CONSTRAINT "Sculpture_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Sculpture" ADD CONSTRAINT "Sculpture_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sculptureId_fkey" FOREIGN KEY ("sculptureId") REFERENCES "Sculpture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
