import { prisma } from "@/server/db/client";
import { Gear, PaymentType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getFullName } from "../utils";
import { addIncome, type IncomeItem } from "./income";
import { getStudentNameById } from "./students";

export async function addGear({
  description,
  price,
  studentId,
  paymentType,
}: Omit<Gear, "id"> & { paymentType: PaymentType }) {
  try {
    // Create Gear
    await prisma.gear.create({
      data: {
        description,
        price,
        studentId,
      },
    });

    // Create Income
    const student = await getStudentNameById(studentId!);
    const incomeData: IncomeItem = {
      amount: price,
      paymentType,
      description: `${getFullName(
        student!.firstName,
        student?.lastName
      )} - ${description}`,
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
