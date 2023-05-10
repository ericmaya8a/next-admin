-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "lineOne" TEXT NOT NULL,
    "lineTwo" TEXT,
    "exteriorNumber" TEXT NOT NULL,
    "interiorNumber" TEXT,
    "suburb" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_studentId_key" ON "Address"("studentId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
