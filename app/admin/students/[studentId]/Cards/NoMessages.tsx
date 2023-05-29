import { Message } from "primereact/message";
import styled from "styled-components";
import { useRole } from "@/app/hooks/useRole";
import { SmallButton } from "@/app/components/commons/SmallButton";

type NoMessagesProps = {
  onClick: VoidFunction;
};

export function NoMessages({ onClick }: NoMessagesProps) {
  const { isAdmin, isSuperAdmin } = useRole();
  const hasPermissions = isAdmin || isSuperAdmin;

  return (
    <StyledMessage
      severity="info"
      text={
        <>
          <span>No notes so far</span>
          {hasPermissions ? (
            <SmallButton label="Add note" onClick={onClick} rounded outlined />
          ) : null}
        </>
      }
    />
  );
}

//#region STYLES
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
//#endregion
