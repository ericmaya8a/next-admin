import { Message } from "primereact/message";
import styled from "styled-components";
import { SmallButton } from "@/app/components/commons/SmallButton";

type NoMessagesProps = {
  onClick: VoidFunction;
};

export function NoMessages({ onClick }: NoMessagesProps) {
  return (
    <StyledMessage
      severity="info"
      text={
        <>
          <span>No notes so far</span>
          <SmallButton label="Add note" onClick={onClick} rounded outlined />
        </>
      }
    />
  );
}

const StyledMessage = styled(Message)`
  justify-content: flex-start;
  width: 100%;

  .p-inline-message-text {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: inherit;

    .pi {
      color: var(--primary-color);
      cursor: pointer;
      font-size: 1.5rem;
    }
  }
`;
