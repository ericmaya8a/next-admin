import { Student } from "@prisma/client";

export const clientUtils = {
  fetching: {
    async post<T>(url: string, body: T) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body }),
      });

      return await response.json();
    },
  },
};

export function mapStudents(students: Student[]) {
  return students.map(
    ({ firstName, lastName, birthDate, inscriptionDate, ...other }) => ({
      name: `${firstName} ${lastName}`,
      birthDate: birthDate.toLocaleDateString("es-MX", { dateStyle: "medium" }),
      inscriptionDate: inscriptionDate.toLocaleDateString("es-MX", {
        dateStyle: "medium",
      }),
      ...other,
    })
  );
}

export type MapStudentsT = ReturnType<typeof mapStudents>;
