"use client";

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
import {
  BackendResponse,
  CreateStudentT,
  EditStudentT,
  RowStudent,
  StudentProvider,
} from "./student-context";

type StudentsProps<T> = {
  students: T;
  createStudent: (student: CreateStudentT) => BackendResponse;
  editStudent: (student: EditStudentT) => BackendResponse;
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
    <StudentProvider
      createStudent={props.createStudent}
      editStudent={props.editStudent}
    >
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
          handleClose={handleClose}
          handleToast={showToast}
          currentStudent={currentStudent}
        />
      </Dialog>
    </StudentProvider>
  );
}
