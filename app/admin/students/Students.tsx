"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useRole } from "@/app/hooks/useRole";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { IncativeStudentsTable } from "./IncativeStudentsTable";
import { ActiveStudentsTable } from "./ActiveStudentsTable";
import { ActionButton } from "./ActionButton";
import {
  BackendResponse,
  CreateStudentT,
  EditStudentT,
  StudentProvider,
} from "./student-context";
import { StudentModal } from "./StudentModal";

type StudentsProps<T> = {
  students: T;
  createStudent: (student: CreateStudentT) => BackendResponse;
  editStudent: (student: EditStudentT) => BackendResponse;
};

export function Students<T>(props: StudentsProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useRef<Toast>(null);
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
  };

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
      <ActiveStudentsTable students={props.students} handleEdit={handleOpen} />
      <IncativeStudentsTable
        students={props.students}
        handleEdit={handleOpen}
      />

      <Toast position="top-center" ref={toast} />
      <StudentModal
        isOpen={isOpen}
        handleClose={handleClose}
        showToast={showToast}
      />
    </StudentProvider>
  );
}
