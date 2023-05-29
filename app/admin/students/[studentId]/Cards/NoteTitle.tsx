import styled from "styled-components";
import { SmallButton } from "@/app/components/commons/SmallButton";

type NoteTitleProps = {
  onClick: VoidFunction;
};

export function NoteTitle({ onClick }: NoteTitleProps) {
  return (
    <Container>
      Notes
      <SmallButton label="Add New" onClick={onClick} />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
