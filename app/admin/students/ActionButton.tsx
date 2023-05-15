import { PrimeIcons } from "primereact/api";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import styled from "styled-components";

type ActionButtonProps = {
  handleOpenDialog: VoidFunction;
  refreshPage: VoidFunction;
};

export function ActionButton({
  handleOpenDialog,
  refreshPage,
}: ActionButtonProps) {
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
            command: handleOpenDialog,
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

const ActionButtonWrapper = styled.div`
  position: relative;
  height: 3rem;
  width: 3rem;

  .p-speeddial-button {
    height: 3rem !important;
    width: 3rem !important;
  }
`;
