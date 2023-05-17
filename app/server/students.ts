import { prisma } from "@/server/db/client";
import { Address, Communication, Promotion, Student } from "@prisma/client";
import { NextResponse } from "next/server";
import { dateToString, getDateInNumbers, getDayNumber } from "./utils";

export async function getStudents() {
  const students = await prisma.student.findMany({
    orderBy: [{ active: "desc" }, { inscriptionDate: "asc" }],
    include: {
      communication: true,
      address: true,
      promotion: true,
    },
  });

  return students.map((st) => ({
    ...st,
    name: `${st.firstName} ${st.lastName}`,
    birthDate: dateToString(st.birthDate),
    inscriptionDate: dateToString(st.inscriptionDate),
    promotion: st.promotion
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((prom) => ({
        ...prom,
        date: dateToString(prom.date),
      })),
  }));
}

export async function getStudentsNextPayment() {
  const MID_DAY_NUMBER = 15;
  const date = getDateInNumbers(new Date());
  const isBeginigOfMonth: boolean = date.day < MID_DAY_NUMBER;

  const currentMonthPayedTuitions = await prisma.tuition.findMany({
    where: { month: date.month, year: date.year },
    select: { studentId: true },
  });

  const mappedCurrentMonthPayedTuitions = currentMonthPayedTuitions.map(
    ({ studentId }) => studentId
  );

  const students = await prisma.student.findMany({
    where: { active: true, id: { notIn: mappedCurrentMonthPayedTuitions } },
    orderBy: { lastName: "asc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      inscriptionDate: true,
    },
  });

  return students
    .filter(({ inscriptionDate }) => {
      const day = getDayNumber(inscriptionDate);
      return isBeginigOfMonth ? day < MID_DAY_NUMBER : day >= MID_DAY_NUMBER;
    })
    .map(({ inscriptionDate, id, firstName, lastName }) => ({
      id,
      name: `${firstName} ${lastName}`,
      inscriptionDate: dateToString(inscriptionDate),
    }));
}

export async function updateStudent({
  id,
  firstName,
  lastName,
  birthDate,
  gender,
  height,
  weight,
  inscriptionDate,
  lineOne,
  lineTwo,
  exteriorNumber,
  interiorNumber,
  suburb,
  municipality,
  zipCode,
  phone,
  cellPhone,
  email,
  active,
}: Student &
  Omit<Address, "id" | "studentId"> &
  Omit<Communication, "id" | "studentId">) {
  try {
    await prisma.student.update({
      where: { id },
      data: {
        firstName,
        lastName,
        birthDate,
        gender,
        height,
        weight,
        inscriptionDate,
        active,
        address: {
          update: {
            lineOne,
            lineTwo,
            exteriorNumber,
            interiorNumber,
            suburb,
            municipality,
            zipCode,
          },
        },
        communication: {
          update: {
            phone,
            cellPhone,
            email: email.toLowerCase(),
          },
        },
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

export async function addStudent({
  firstName,
  lastName,
  birthDate,
  gender,
  height,
  weight,
  inscriptionDate,
  lineOne,
  lineTwo,
  exteriorNumber,
  interiorNumber,
  suburb,
  municipality,
  zipCode,
  phone,
  cellPhone,
  email,
}: Omit<Student, "id" | "active"> &
  Omit<Address, "id" | "studentId"> &
  Omit<Communication, "id" | "studentId">) {
  // validate if student exists
  const commStudent = await prisma.communication.findUnique({
    where: { email },
  });

  if (commStudent) {
    return new NextResponse(
      JSON.stringify({
        error: `Student with email: ${email} already exists`,
      }),
      { status: 400 }
    );
  }

  // Create student
  await prisma.student.create({
    data: {
      firstName,
      lastName,
      birthDate,
      gender,
      height,
      weight,
      inscriptionDate,
      address: {
        create: {
          lineOne,
          lineTwo,
          exteriorNumber,
          interiorNumber,
          suburb,
          municipality,
          zipCode,
        },
      },
      communication: {
        create: {
          phone,
          cellPhone,
          email,
        },
      },
      promotion: {
        create: {
          date: inscriptionDate,
        },
      },
    },
  });

  return NextResponse.json({
    ok: true,
  });
}

export async function addPromotion({
  date,
  rank,
  studentId,
}: Omit<Promotion, "id">) {
  try {
    await prisma.promotion.create({
      data: {
        date,
        rank,
        studentId,
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
