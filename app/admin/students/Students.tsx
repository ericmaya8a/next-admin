"use client";

import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";

type StudentsProps<T> = {
  students: T;
};

export function Students<T>({ students }: StudentsProps<T>) {
  return (
    <>
      <ActiveStudentsTable students={students} />
      <IncativeStudentsTable students={students} />
    </>
  );
}
