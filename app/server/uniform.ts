import { PaymentType, Uniform } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { NextResponse } from "next/server";
import { getFullName } from "../utils";
import { addIncome, type IncomeItem } from "./income";
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
    const incomeData: IncomeItem = {
      amount: price,
      description: `${getFullName(
        student!.firstName,
        student?.lastName
      )} - Uniform /  ${type} - ${brand} (${size})`,
      paymentType,
    };
    await addIncome(incomeData);

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
