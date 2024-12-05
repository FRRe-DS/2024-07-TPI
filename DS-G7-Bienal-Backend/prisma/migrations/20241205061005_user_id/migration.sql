-- DropIndex
DROP INDEX "Vote_id_key";

-- AlterTable
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");
