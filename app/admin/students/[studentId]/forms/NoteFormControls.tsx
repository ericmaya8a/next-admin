import styled from "styled-components";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { useRole } from "@/app/hooks/useRole";

type NoteFormControlsProps = {
  date?: string;
  onEdit: VoidFunction;
  onRemove: VoidFunction;
};

export function NoteFormControls({
  date,
  onEdit,
  onRemove,
}: NoteFormControlsProps) {
  //#region HOOKS
  const { isAdmin, isSuperAdmin } = useRole();
  //#endregion

  //#region LOGIC
  const hasPermissions = isAdmin || isSuperAdmin;
  //#endregion

  //#region JSX
  if (!hasPermissions) {
    return null;
  }

  return (
    <Controls>
      <small>{date}</small>
      <ButtonWrapper>
        <RoundButton
          type="button"
          icon={PrimeIcons.PENCIL}
          onClick={onEdit}
          rounded
          outlined
        />
        <RoundButton
          type="button"
          icon={PrimeIcons.TRASH}
          severity="danger"
          onClick={onRemove}
          rounded
          outlined
        />
      </ButtonWrapper>
    </Controls>
  );
  //#endregion
}

//#region STYLES
const Controls = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  small {
    color: var(--surface-500);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const RoundButton = styled(Button)`
  height: 2rem !important;
  width: 2rem !important;
`;
//#endregion
