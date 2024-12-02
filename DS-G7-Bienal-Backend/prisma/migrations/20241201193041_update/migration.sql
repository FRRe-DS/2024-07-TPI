-- DropForeignKey
ALTER TABLE "Sculpture" DROP CONSTRAINT "Sculpture_sculptorId_fkey";

-- AddForeignKey
ALTER TABLE "Sculpture" ADD CONSTRAINT "Sculpture_sculptorId_fkey" FOREIGN KEY ("sculptorId") REFERENCES "Sculptor"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
