import { Address, Communication, Student } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import styled from "styled-components";
import { StudentForm } from "./StudentForm";

type ActionButtonProps = {
  createStudent: (
    student: Omit<Student, "id" | "active"> &
      Omit<Address, "id" | "studentId"> &
      Omit<Communication, "id" | "studentId">
  ) => Promise<{ ok: boolean }>;
};

export function ActionButton({ createStudent }: ActionButtonProps) {
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
    <ActionButtonWrapper>
      <Toast position="top-center" ref={toast} />
      <Tooltip target=".p-speeddial-action" position="left" />
      <SpeedDial
        radius={120}
        type="linear"
        direction="down"
        transitionDelay={50}
        showIcon={PrimeIcons.BARS}
        hideIcon={PrimeIcons.TIMES}
        model={[
          {
            label: "Add",
            icon: PrimeIcons.PLUS,
            command: () => setIsOpen(true),
          },
          {
            label: "Refresh",
            icon: PrimeIcons.REFRESH,
            command: refreshPage,
          },
        ]}
      />
      <Dialog
        header="Add Student"
        visible={isOpen}
        onHide={handleClose}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        style={{ minWidth: "50vw" }}
      >
        <StudentForm
          createStudent={createStudent}
          handleClose={handleClose}
          handleToast={showToast}
        />
      </Dialog>
    </ActionButtonWrapper>
  );
}

const ActionButtonWrapper = styled.div`
  position: relative;
  height: 3rem;
  width: 3rem;

  .p-speeddial-button {
    height: 3rem !important;
    width: 3rem !important;
  }
`;
