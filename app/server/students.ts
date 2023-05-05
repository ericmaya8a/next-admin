import { prisma } from "@/server/db/client";

export async function getStudents() {
  return await prisma.student.findMany({
    orderBy: [{ active: "desc" }, { birthDate: "asc" }],
  });
}
