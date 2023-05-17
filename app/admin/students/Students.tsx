"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastMessage } from "primereact/toast";
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
  const toast = useRef<Toast>(null);
  const { isAdmin, isSuperAdmin } = useRole();
  const hasActionsPermission = isAdmin || isSuperAdmin;

  const refreshPage = () => router.refresh();

  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toast.current?.show(message);
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
            <ActionButton refreshPage={refreshPage} />
          ) : undefined
        }
      />
      <ActiveStudentsTable students={props.students} />
      <IncativeStudentsTable students={props.students} />

      <Toast position="top-center" ref={toast} />
      <StudentModal showToast={showToast} />
    </StudentProvider>
  );
}
