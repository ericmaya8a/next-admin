import { prisma } from "@/server/db/client";
import { Gear, PaymentType } from "@prisma/client";
import { NextResponse } from "next/server";
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
    await prisma.income.create({
      data: {
        date: new Date(),
        amount: price,
        paymentType,
        description: `${student?.firstName} ${student?.lastName} - ${description}`,
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
