"use client";

import { Address, Communication, Student } from "@prisma/client";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";
import { ActionButton } from "./ActionButton";

type StudentsProps<T> = {
  students: T;
  createStudent: (
    student: Omit<Student, "id" | "active"> &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => Promise<{ ok: boolean }>;
};

export function Students<T>(props: StudentsProps<T>) {
  return (
    <>
      <PageHeader
        title="Students"
        actions={<ActionButton createStudent={props.createStudent} />}
      />
      <ActiveStudentsTable students={props.students} />
      <IncativeStudentsTable students={props.students} />
    </>
  );
}
