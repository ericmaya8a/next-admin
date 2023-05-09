"use client";

import { Student } from "@prisma/client";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";

type StudentsProps = {
  students: Student[];
};

export function Students({ students }: StudentsProps) {
  return (
    <>
      <ActiveStudentsTable students={students} />
      <IncativeStudentsTable students={students} />
    </>
  );
}
