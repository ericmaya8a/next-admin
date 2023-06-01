import { prisma } from "@/server/db/client";
import { Tuition } from "@prisma/client";
import { NextResponse } from "next/server";
import { dateToString, getDateInNumbers, getFullName } from "../utils";
import { getStudentNameById } from "./students";

export async function addTuition({
  amount,
  date,
  paymentType,
  studentId,
}: Omit<Tuition, "id" | "month" | "year">) {
  try {
    // Create Tuition
    const { month, year } = getDateInNumbers(date);
    await prisma.tuition.create({
      data: {
        date,
        amount,
        studentId,
        paymentType,
        month,
        year,
      },
    });

    // Create Income record
    const student = await getStudentNameById(studentId);
    await prisma.income.create({
      data: {
        date,
        amount,
        paymentType,
        description: `${getFullName(
          student!.firstName,
          student?.lastName
        )} - ${dateToString(date, "MMM - YYYY")}`,
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
