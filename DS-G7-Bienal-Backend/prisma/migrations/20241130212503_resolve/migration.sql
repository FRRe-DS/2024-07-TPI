-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_createdAt_key" ON "Token"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
