-- CreateEnum
CREATE TYPE "UniformBrand" AS ENUM ('ASIANA', 'BYAKKO', 'OTHER');

-- CreateEnum
CREATE TYPE "UniformType" AS ENUM ('COMPETITION', 'DOBOK', 'KARATEGI', 'KENPOGI', 'OTHER');

-- CreateTable
CREATE TABLE "Uniform" (
    "id" TEXT NOT NULL,
    "type" "UniformType" NOT NULL DEFAULT 'KARATEGI',
    "brand" "UniformBrand" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "Uniform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gear" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Uniform" ADD CONSTRAINT "Uniform_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gear" ADD CONSTRAINT "Gear_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
