import { PrimeIcons } from "primereact/api";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import styled from "styled-components";
import { useStudent } from "./student-context";

type ActionButtonProps = {
  refreshPage: VoidFunction;
};

export function ActionButton({ refreshPage }: ActionButtonProps) {
  const { setIsOpenStudentModal } = useStudent();

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
        model={[
          {
            label: "Add",
            icon: PrimeIcons.PLUS,
            command: () => setIsOpenStudentModal(true),
          },
          {
            label: "Refresh",
            icon: PrimeIcons.REFRESH,
            command: refreshPage,
          },
        ]}
      />
    </ActionButtonWrapper>
  );
}

//#region STYLES
const ActionButtonWrapper = styled.div`
  position: relative;
  height: 3rem;
  width: 3rem;

  .p-speeddial-button {
    height: 3rem !important;
    width: 3rem !important;
  }
`;
//#endregion
