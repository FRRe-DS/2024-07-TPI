-- CreateTable
CREATE TABLE "Sculpture" (
    "id" SERIAL NOT NULL,
    "scultorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qr" TEXT,

    CONSTRAINT "Sculpture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "sculptureId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- AddForeignKey
ALTER TABLE "Sculpture" ADD CONSTRAINT "Sculpture_scultorId_fkey" FOREIGN KEY ("scultorId") REFERENCES "Sculptor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sculptureId_fkey" FOREIGN KEY ("sculptureId") REFERENCES "Sculpture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
