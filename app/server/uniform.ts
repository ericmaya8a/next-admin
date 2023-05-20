import { PaymentType, Uniform } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";
import { getStudentNameById } from "./students";

export async function addUniform({
  type,
  brand,
  price,
  size,
  studentId,
  paymentType,
}: Omit<Uniform, "id"> & { paymentType: PaymentType }) {
  try {
    // Create Uniform
    await prisma.uniform.create({
      data: {
        type,
        brand,
        price,
        size,
        studentId,
      },
    });

    // Create Income record
    const student = await getStudentNameById(studentId!);
    await prisma.income.create({
      data: {
        date: new Date(),
        amount: price,
        paymentType,
        description: `${student?.firstName} ${student?.lastName} - Uniform /  ${type} - ${brand} (${size})`,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Errror",
      }),
      { status: 500 }
    );
  }
}
