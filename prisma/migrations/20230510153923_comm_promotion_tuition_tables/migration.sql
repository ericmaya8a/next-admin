-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('BLANCA', 'AMARILLA', 'NARANJA', 'VERDE', 'AZUL', 'MORADA', 'CAFE', 'ROJA', 'NEGRA', 'DAN_1', 'DAN_2', 'DAN_3', 'DAN_4', 'DAN_5', 'DAN_6', 'DAN_7', 'DAN_8', 'DAN_9', 'DAN_10');

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "cellPhone" TEXT,
    "email" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rank" "Rank" NOT NULL DEFAULT 'BLANCA',
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tuition" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Tuition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communication_studentId_key" ON "Communication"("studentId");

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tuition" ADD CONSTRAINT "Tuition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
