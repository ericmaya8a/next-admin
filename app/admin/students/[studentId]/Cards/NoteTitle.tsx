import styled from "styled-components";
import { useRole } from "@/app/hooks/useRole";
import { SmallButton } from "@/app/components/commons/SmallButton";

type NoteTitleProps = {
  onClick: VoidFunction;
};

export function NoteTitle({ onClick }: NoteTitleProps) {
  //#region HOOKS
  const { isAdmin, isSuperAdmin } = useRole();
  //#endregion

  //#region LOGIC
  const hasPermissions = isAdmin || isSuperAdmin;
  //#endregion

  //#region JSX
  return (
    <Container>
      Notes
      {hasPermissions ? (
        <SmallButton label="Add New" onClick={onClick} />
      ) : null}
    </Container>
  );
  //#endregion
}

//#region STYLES
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
//#endregion
