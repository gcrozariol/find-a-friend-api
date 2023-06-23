-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('NEWBORN', 'JUNIOR', 'TEEN', 'FULL_GROWN');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateEnum
CREATE TYPE "PetIndependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PetRequiredEnvironment" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" VARCHAR(300),
    "age" "PetAge" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energyLevel" "PetEnergyLevel" NOT NULL,
    "independencyLevel" "PetIndependencyLevel" NOT NULL,
    "requiredEnvironment" "PetRequiredEnvironment" NOT NULL,
    "photos" TEXT[],
    "adoptionRequests" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "addressId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" DECIMAL(65,30) NOT NULL,
    "town" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_id_key" ON "pets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_addressId_key" ON "users"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "addresses"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
