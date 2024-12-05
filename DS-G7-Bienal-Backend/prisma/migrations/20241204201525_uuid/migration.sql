/*
  Warnings:

  - Made the column `uuid` on table `Sculpture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sculpture" ALTER COLUMN "uuid" SET NOT NULL;
