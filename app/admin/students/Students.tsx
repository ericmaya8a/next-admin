"use client";

import { PageHeader } from "@/app/components/commons/PageHeader";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";

type StudentsProps<T> = {
  students: T;
};

export function Students<T>({ students }: StudentsProps<T>) {
  return (
    <>
      <PageHeader title="Students" />
      <ActiveStudentsTable students={students} />
      <IncativeStudentsTable students={students} />
    </>
  );
}
