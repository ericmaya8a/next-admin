import styled from "styled-components";

interface ModalButtonWrapperProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function ModalButtonWrapper({
  children,
  ...otherProps
}: ModalButtonWrapperProps) {
  return <ButtonWrapper style={otherProps.style}>{children}</ButtonWrapper>;
}

//#region STYLES
const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
`;
//#endregion
