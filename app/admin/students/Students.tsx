"use client";

import { Address, Communication, Student } from "@prisma/client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";
import { ActionButton } from "./ActionButton";
import { StudentForm } from "./StudentForm";

type StudentsProps<T> = {
  students: T;
  createStudent: (
    student: Omit<Student, "id" | "active"> &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => Promise<{ ok: boolean }>;
};

export function Students<T>(props: StudentsProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useRef<Toast>(null);

  const handleClose = () => setIsOpen(false);

  const refreshPage = () => router.refresh();

  const showToast = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
    });
    refreshPage();
  };

  return (
    <>
      <PageHeader
        title="Students"
        actions={
          <ActionButton
            handleOpenDialog={() => setIsOpen(true)}
            refreshPage={refreshPage}
          />
        }
      />
      <ActiveStudentsTable students={props.students} />
      <IncativeStudentsTable students={props.students} />

      <Toast position="top-center" ref={toast} />
      <Dialog
        header="Add Student"
        visible={isOpen}
        onHide={handleClose}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        style={{ minWidth: "50vw" }}
      >
        <StudentForm
          createStudent={props.createStudent}
          handleClose={handleClose}
          handleToast={showToast}
        />
      </Dialog>
    </>
  );
}
