import styled from "styled-components";
import { useRole } from "@/app/hooks/useRole";
import { SmallButton } from "@/app/components/commons/SmallButton";

type NoteTitleProps = {
  onClick: VoidFunction;
};

export function NoteTitle({ onClick }: NoteTitleProps) {
  const { isAdmin, isSuperAdmin } = useRole();
  const hasPermissions = isAdmin || isSuperAdmin;

  return (
    <Container>
      Notes
      {hasPermissions ? (
        <SmallButton label="Add New" onClick={onClick} />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
