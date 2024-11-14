-- CreateTable
CREATE TABLE "Tematic" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tematic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "tematicId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "lugar" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tematic_name_key" ON "Tematic"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tematicId_fkey" FOREIGN KEY ("tematicId") REFERENCES "Tematic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
