"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Toast, ToastMessage } from "primereact/toast";
import { useRole } from "@/app/hooks/useRole";
import { CONSTANTS } from "@/app/constatnts";
import { AppBreadCrumb } from "@/app/components/commons/AppBreadCrumb";
import { PageHeader } from "@/app/components/commons/PageHeader";
import { StudentT } from "./page";
import {
  BackendResponse,
  CreateStudentT,
  EditStudentT,
  GearT,
  PromotionT,
  StudentProvider,
  UniformT,
} from "./student-context";
import { ActiveStudentsTable } from "./tables/ActiveStudentsTable";
import { IncativeStudentsTable } from "./tables/IncativeStudentsTable";
import { BuyGearModal } from "./modals/BuyGearModal";
import { BuyUniformModal } from "./modals/BuyUniformModal";
import { PromotionModal } from "./modals/PromotionModal";
import { StudentModal } from "./modals/StudentModal";
import { ActionButton } from "./ActionButton";

type StudentsProps = {
  students: StudentT;
  createPromotion: (promotion: PromotionT) => BackendResponse;
  createStudent: (student: CreateStudentT) => BackendResponse;
  createUniform: (uniform: UniformT) => BackendResponse;
  createGear: (gear: GearT) => BackendResponse;
  editStudent: (student: EditStudentT) => BackendResponse;
};

export function Students(props: StudentsProps) {
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
      createPromotion={props.createPromotion}
      createStudent={props.createStudent}
      createUniform={props.createUniform}
      createGear={props.createGear}
      editStudent={props.editStudent}
    >
      <PageHeader
        title={
          <AppBreadCrumb
            model={[
              { label: "Admin", url: CONSTANTS.urls.ADMIN },
              { label: "Students" },
            ]}
            style={{ marginBottom: 0 }}
          />
        }
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
      <PromotionModal showToast={showToast} />
      <BuyUniformModal showToast={showToast} />
      <BuyGearModal showToast={showToast} />
    </StudentProvider>
  );
}
