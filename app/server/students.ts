import { prisma } from "@/server/db/client";
import {
  Address,
  Communication,
  PaymentType,
  Promotion,
  Student,
} from "@prisma/client";
import { NextResponse } from "next/server";
import {
  dateToString,
  getAge,
  getDateInNumbers,
  getDayNumber,
  getFullName,
  sortByDate,
  sortByUpdatedAt,
} from "../utils";
import { addIncome, type IncomeItem } from "./income";

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
    promotion: sortByDate(st.promotion),
  }));
}

export async function getStudentNameById(studentId: string) {
  return await prisma.student.findUnique({
    where: { id: studentId },
    select: { firstName: true, lastName: true },
  });
}

export async function getStudentInfo(studentId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        address: true,
        communication: true,
        promotion: true,
        uniform: true,
        gear: true,
        note: true,
      },
    });

    if (student) {
      return {
        ...student,
        name: getFullName(student.firstName, student.lastName),
        birthDate: dateToString(student.birthDate),
        age: getAge(student.birthDate),
        inscriptionDate: dateToString(student.inscriptionDate),
        seniority: getAge(student.inscriptionDate),
        promotion: sortByDate(student.promotion),
        note: sortByUpdatedAt(student.note, "DD MMM YYYY HH:mm"),
        uniform: sortByDate(student.uniform, "DD/MMM/YY"),
        gear: sortByDate(student.gear, "DD/MMM/YY"),
      };
    }

    return null;
  } catch (error) {
    return null;
  }
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
  price,
  paymentType,
}: Omit<Promotion, "id"> & { price: number; paymentType: PaymentType }) {
  try {
    // Create Promotion
    await prisma.promotion.create({
      data: {
        date,
        rank,
        studentId,
      },
    });

    // Create Income record
    const student = await getStudentNameById(studentId);
    const incomeData: IncomeItem = {
      date,
      amount: price,
      paymentType,
      description: `${getFullName(
        student!.firstName,
        student?.lastName
      )} - ${rank} - promotion. (${dateToString(date, "DD/MMM/YYYY")})`,
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
