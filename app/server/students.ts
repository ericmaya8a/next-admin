import { prisma } from "@/server/db/client";
import { dateToString } from "./utils";

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
