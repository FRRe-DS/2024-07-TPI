-- DropForeignKey
ALTER TABLE "Sculptor" DROP CONSTRAINT "Sculptor_userId_fkey";

-- AddForeignKey
ALTER TABLE "Sculptor" ADD CONSTRAINT "Sculptor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
