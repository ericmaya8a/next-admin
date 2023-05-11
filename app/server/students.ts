import { prisma } from "@/server/db/client";
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
