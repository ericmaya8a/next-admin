import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import styled from "styled-components";
import { StudentForm } from "./StudentForm";

export function ActionButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ActionButtonWrapper>
      <Tooltip target=".p-speeddial-action" position="left" />
      <SpeedDial
        radius={120}
        type="linear"
        direction="down"
        transitionDelay={50}
        showIcon={PrimeIcons.BARS}
        hideIcon={PrimeIcons.TIMES}
        // buttonClassName="p-button-outlined"
        model={[
          {
            label: "Add",
            icon: PrimeIcons.PLUS,
            command: () => setIsOpen(true),
          },
          {
            label: "Refresh",
            icon: PrimeIcons.REFRESH,
            command: () => router.refresh(),
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
        <StudentForm onSubmit={handleClose} />
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
