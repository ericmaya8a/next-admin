"use client";

import { Address, Communication, Student } from "@prisma/client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useRole } from "@/app/hooks/useRole";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";
import { ActionButton } from "./ActionButton";
import { StudentForm } from "./StudentForm";

export type CurrentStudent = Omit<Student, "id"> &
  Omit<Address, "id" | "studentId"> &
  Omit<Communication, "id" | "studentId">;

export type RowStudent = Student & {
  address: Omit<Address, "id" | "studentId">;
  communication: Omit<Communication, "id" | "studentId">;
};

type StudentsProps<T> = {
  students: T;
  createStudent: (student: CurrentStudent) => Promise<{ ok: boolean }>;
  editStudent: (
    student: Student &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => Promise<{ ok: boolean }>;
};

export function Students<T>(props: StudentsProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<RowStudent>();
  const toast = useRef<Toast>(null);
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStudent(undefined);
  };

  const refreshPage = () => router.refresh();

  const handleEdit = (data: RowStudent) => {
    setCurrentStudent(data);
    handleOpen();
  };

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
          hasActionsPermission ? (
            <ActionButton
              handleOpenDialog={handleOpen}
              refreshPage={refreshPage}
            />
          ) : undefined
        }
      />
      <ActiveStudentsTable students={props.students} handleEdit={handleEdit} />
      <IncativeStudentsTable
        students={props.students}
        handleEdit={handleEdit}
      />

      <Toast position="top-center" ref={toast} />
      <Dialog
        header={`${Boolean(currentStudent) ? "Edit" : "Add"} Student`}
        visible={isOpen}
        onHide={handleClose}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        style={{ minWidth: "50vw" }}
      >
        <StudentForm
          createStudent={props.createStudent}
          handleClose={handleClose}
          handleToast={showToast}
          currentStudent={currentStudent}
          editStudent={props.editStudent}
        />
      </Dialog>
    </>
  );
}
