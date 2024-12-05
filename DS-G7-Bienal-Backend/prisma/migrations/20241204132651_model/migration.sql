-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "sculptureId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "calification" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_key" ON "Vote"("id");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_sculptureId_fkey" FOREIGN KEY ("sculptureId") REFERENCES "Sculpture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
