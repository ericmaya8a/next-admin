import { Rank, Student } from "@prisma/client";
import { SelectItemOptionsType } from "primereact/selectitem";
import { StudentT } from "./admin/students/page";

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
  promotions: StudentT[0]["promotion"] = []
) {
  const availableRanks = Object.keys(Rank).filter(
    (rank) => !promotions.map((p) => p.rank).includes(rank as Rank)
  );

  return availableRanks.map((rank) => ({
    label: capitalizeEnum(rank),
    value: rank,
  })) as SelectItemOptionsType;
}

export function handleInvalidClassName(message?: string) {
  return message ? "p-invalid" : undefined;
}

export function setSeverity(matchPath: boolean) {
  return matchPath ? undefined : "secondary";
}

export function capitalizeFirstChar(word: string) {
  return word.charAt(0).toUpperCase();
}

export function getInitials(firstName: string, lastName?: string) {
  if (!lastName) return capitalizeFirstChar(firstName);
  return `${capitalizeFirstChar(firstName)}${capitalizeFirstChar(lastName)}`;
}

export function getInitialsFromFullName(name: string) {
  const words = name.split(" ");
  return getInitials(words[0], words[1]);
}
