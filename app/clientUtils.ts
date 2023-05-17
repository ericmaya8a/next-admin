import { Rank, Student } from "@prisma/client";
import { SelectItemOptionsType } from "primereact/selectitem";
import { MappedStudent } from "./admin/students/student-context";

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

export function capitalizeEnum(enumValue: string) {
  const words = enumValue
    .replaceAll("_", " ")
    .toLowerCase()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`);

  return words.join(" ");
}

export function createOptionsFromEnum(enumValue: {}): SelectItemOptionsType {
  return Object.keys(enumValue).map((value) => ({
    label: capitalizeEnum(value),
    value,
  }));
}

export function createAvailableRanks(
  promotions: MappedStudent["promotion"] = []
) {
  const availableRanks = Object.keys(Rank).filter(
    (rank) => !promotions.map((p) => p.rank).includes(rank as Rank)
  );

  return availableRanks.map((rank) => ({
    label: capitalizeEnum(rank),
    value: rank,
  })) as SelectItemOptionsType;
}
