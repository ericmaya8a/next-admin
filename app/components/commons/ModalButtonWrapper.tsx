import styled from "styled-components";

type ModalButtonWrapperProps = {
  children: React.ReactNode;
};

export function ModalButtonWrapper({ children }: ModalButtonWrapperProps) {
  return <ButtonWrapper>{children}</ButtonWrapper>;
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
`;
